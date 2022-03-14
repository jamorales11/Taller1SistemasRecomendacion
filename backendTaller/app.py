import json
from multiprocessing.sharedctypes import Value
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pandas as pd
import numpy as np
import json

users = {"001": "Julio", "002": "Maria"}

if not os.path.exists("./userid-profile.tsv"):
    raise ValueError("El archivo de userid-profile.tsv no fue encontrado en el path")
else:
    print("El archivo de usuarios ha sido cargado")

usuarios= pd.read_csv("./userid-profile.tsv", sep="\t")

print(usuarios)



if not os.path.exists("./userid-timestamp-artid-artname-traid-traname.tsv"):
    raise ValueError("El archivo de userid-timestamp-artid-artname-traid-traname.tsv no fue encontrado en el path")
else:
    print("El archivo de datos ha sido cargado")

datos= pd.read_csv("./userid-timestamp-artid-artname-traid-traname.tsv", sep="\t", nrows=2000000)

print(datos)


app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_from_root():
    return jsonify(message = "Hello from Root")


@app.route("/find_user", methods= ["POST", "GET"])
def get_user():
    print(request.json)
    data = request.json
    id = data["user"]

    return {"user":users[id]}


@app.route("/find_usuario", methods= ["POST", "GET"])
def get_usuario_df():
    print(request.json)
    data = request.json
    id = data["user"]

    usuario = usuarios.loc[usuarios["#id"]==id]
    print(usuario)

    return usuario.to_json(orient="records")



@app.route("/find_artists_by_user", methods=["POST", "GET"])
def get_artists_by_user():
    print(request.json)
    data = request.json
    id = data["user"]

    artistas = datos.loc[datos["user_000001"]==id,["Deep Dish"]]
    print(artistas)

    return artistas.to_json(orient="records")



@app.route("/get_recomendaciones", methods=["POST", "GET"])
def get_recomendaciones():
    print(request.json)
    data = request.json
    id = data["user"]

    artistas = datos.loc[datos["user_000001"]==id]
    print(artistas)

    return artistas.to_json(orient="records")