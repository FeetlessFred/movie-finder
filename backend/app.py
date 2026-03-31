from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
TMDB_API_KEY = os.environ.get("TMDB_API_KEY", "b5318b6f00f1bac7037e6d65a17e52ff")
TMDB_BASE_URL = "https://api.themoviedb.org/3"

@app.route("/movies/<int:page>")
def get_movies(page):
    url = f"{TMDB_BASE_URL}/movie/popular?api_key={TMDB_API_KEY}&language=en-US&page={page}"
    response = requests.get(url)
    return jsonify(response.json())

@app.route("/movie/<int:movie_id>")
def get_movie(movie_id):
    url = f"{TMDB_BASE_URL}/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US"
    response = requests.get(url)
    return jsonify(response.json())

@app.route("/providers/<int:movie_id>")
def get_providers(movie_id):
    url = f"{TMDB_BASE_URL}/movie/{movie_id}/watch/providers?api_key={TMDB_API_KEY}"
    response = requests.get(url)
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
