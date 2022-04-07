from crypt import methods
import json
from multiprocessing.sharedctypes import Value
from operator import index
from urllib import response
from flask import Flask, jsonify, request
from flask_cors import CORS
from get_recommendations import *
import os
import pandas as pd
import numpy as np
import json


if not os.path.exists("dataset/userid-profile.tsv"):
    raise ValueError("El archivo de userid-profile.tsv no fue encontrado en el path")
else:
    print("El archivo de usuarios ha sido cargado")

usuarios= pd.read_csv("dataset/userid-profile.tsv", sep="\t", names=["id", "gender", "age", "country", "registered"], header=0)



if not os.path.exists("dataset/userid-timestamp-artid-artname-traid-traname.tsv"):
    raise ValueError("El archivo de userid-timestamp-artid-artname-traid-traname.tsv no fue encontrado en el path")
else:
    print("El archivo de datos ha sido cargado")

data_cols = ['user_id', 'timestamp', 'artist_id', 'artist_name', 'track_id', 'track_name']
songs = pd.read_csv('dataset/userid-timestamp-artid-artname-traid-traname.tsv', sep='\t', error_bad_lines=False, names = data_cols)

#songs = pd.read_csv('dataset/userid-timestamp-artid-artname-traid-traname.tsv', sep='\t', nrows=6000000, error_bad_lines=False, names = data_cols)

songs_id = pd.DataFrame(songs['track_name'].unique(), columns = ['track_name'])
songs_id['track_id'] = range(1, len(songs_id)+1)

artists_id = pd.DataFrame(songs['artist_name'].unique(), columns = ['artist_name'])
artists_id['artist_id'] = range(1, len(artists_id)+1)

songs = songs[['user_id', 'artist_name', 'track_name']]
songs = songs.merge(artists_id, on='artist_name', how='left')
songs = songs.merge(songs_id, on='track_name', how='left')
songs = songs[['user_id', 'artist_id', 'artist_name', 'track_id', 'track_name']]
print(songs)

intervals = {
        'intervalo 1': {'min':0, 'max':10, 'valor':0},
        'intervalo 2': {'min':10, 'max':None, 'valor':1}
}

model = load_model('best_model.pkl')
predictions, ratings_artists = initialize(model, intervals, songs)
print(ratings_artists)


app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_from_root():
    return jsonify(message = "Hello from Root")



@app.route("/find_usuario/<id>", methods= ["POST", "GET"])
def get_usuario_df(id):
    #print(request.json)

    usuario = usuarios.loc[usuarios["id"]==id]
    #print(usuario)

    return usuario.to_json(orient="records")


@app.route("/create_usuario", methods= ["POST"])
def create_usuario_df():
    #print(request.json)

    global usuarios
    data = pd.DataFrame(data=request.json, index=[0])
    result = pd.concat([usuarios, data], ignore_index=True)
    usuarios = result
    #print(usuarios)
    return request.json


@app.route("/add_preferencias", methods= ["POST"])
def add_preferencias_df():
    print(request.json)

    global songs
    data = pd.DataFrame(data=request.json)
    print(data)

    result = pd.concat([songs, data], ignore_index=True)
    songs = result
    print(songs)

    global ratings_artists
    ratings_artists = songs[['user_id', 'artist_id']].value_counts().to_frame().reset_index()
    ratings_artists.columns = ['user_id', 'artist_id', 'rating']
    ratings_artists = generate_intervals(ratings_artists, intervals)
    
    n_samples = 80
    ratings_artists = ratings_artists.groupby('user_id').sample(n=n_samples, random_state=1, replace=True).drop_duplicates()
    
    min_rating, max_rating = ratings_artists['rating'].min(), ratings_artists['rating'].max()
    reader = Reader(rating_scale=(min_rating, max_rating))
    ratings_artists_dataset = Dataset.load_from_df(ratings_artists[['user_id', 'artist_id', 'rating']], reader)
    
    rating_data = ratings_artists_dataset.build_full_trainset()
    test = rating_data.build_anti_testset()
    
    global predictions
    predictions = model.test(test)

    print(ratings_artists)

    
    return data.to_json()


@app.route("/get_artists", methods=["POST", "GET"])
def get_artists():
    #print(request.json)

    artistas = songs["artist_name"].value_counts().head(6000)
    artistas = artistas.to_frame().reset_index()
    artistas.columns = ['artist_name', 'count']
    artistas = artistas.sort_values(by=["artist_name"])
    print(artistas.merge(artists_id, how="inner", on="artist_name"))
    artistas = artistas.merge(artists_id, how="inner", on="artist_name")

    return artistas.to_json(orient="records")


@app.route("/find_artists_by_user/<id>", methods=["POST", "GET"])
def get_artists_by_user(id):
    #print(request.json)

    artistas = songs.loc[songs["user_id"]==id,["artist_name"]].drop_duplicates()

    return artistas.to_json(orient="records")



@app.route("/get_recomendaciones/<id>", methods=["POST", "GET"])
def get_recomendaciones(id):
    #print(request.json)

    recommendations = get_K_recommendations(uid=id, ratings=songs, items=artists_id, top_k=20, predictions=predictions)

    
    #print(recommendations)

    return recommendations.to_json(orient="records")


@app.route("/get_popular_artists", methods= ["POST", "GET"])
def get_popular_artists():
    populares = songs["artist_name"].value_counts().head(40)
    populares = populares.to_frame().reset_index()
    populares.columns = ['artist_name', 'count']
    populares = populares.sort_values(by=["artist_name"])
    return populares.to_json(orient="records")


if __name__ == '__main__':
    app.run(host='0.0.0.0')