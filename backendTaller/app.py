import json
from multiprocessing.sharedctypes import Value
from operator import index
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pandas as pd
import numpy as np
import json


if not os.path.exists("./userid-profile.tsv"):
    raise ValueError("El archivo de userid-profile.tsv no fue encontrado en el path")
else:
    print("El archivo de usuarios ha sido cargado")

usuarios= pd.read_csv("./userid-profile.tsv", sep="\t", names=["id", "gender", "age", "country", "registered"], header=0)

print(usuarios)



if not os.path.exists("./userid-timestamp-artid-artname-traid-traname.tsv"):
    raise ValueError("El archivo de userid-timestamp-artid-artname-traid-traname.tsv no fue encontrado en el path")
else:
    print("El archivo de datos ha sido cargado")

datos= pd.read_csv("./userid-timestamp-artid-artname-traid-traname.tsv", sep="\t", nrows=2000000, names=["userid", "timestamp", "artid", "artname", "traid", "traname"])

print(datos)


app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_from_root():
    return jsonify(message = "Hello from Root")



@app.route("/find_usuario/<id>", methods= ["POST", "GET"])
def get_usuario_df(id):
    print(request.json)

    usuario = usuarios.loc[usuarios["id"]==id]
    print(usuario)

    return usuario.to_json(orient="records")


@app.route("/create_usuario", methods= ["POST"])
def create_usuario_df():
    print(request.json)

    global usuarios
    data = pd.DataFrame(data=request.json, index=[0])
    result = pd.concat([usuarios, data], ignore_index=True)
    usuarios = result
    print(usuarios)
    return request.json




@app.route("/find_artists_by_user/<id>", methods=["POST", "GET"])
def get_artists_by_user(id):
    print(request.json)

    artistas = datos.loc[datos["userid"]==id,["artname"]].drop_duplicates().count()
    print(artistas)

    return artistas.to_json(orient="records")



@app.route("/get_recomendaciones/<id>", methods=["POST", "GET"])
def get_recomendaciones(id):
    print(request.json)

    artistas = datos.loc[datos["userid"]==id]
    print(artistas)

    return artistas.to_json(orient="records")