from fastapi import APIRouter, HTTPException
import requests


# Definición del router friking que falta en el main.py
router = APIRouter()
@router.get("/piloto/{id}")
async def get_pilot(id: int):
    url = f"https://swapi.py4e.com/api/people/{id}/"
    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Piloto no encontrado")

    pilot = response.json()

    # Obtener especie y planeta de origen
    species = requests.get(pilot["species"][0]).json() if pilot["species"] else {}
    homeworld = requests.get(pilot["homeworld"]).json() if pilot["homeworld"] else {}

    return {
        "nombre": pilot["name"],
        "altura": pilot["height"],
        "genero": pilot["gender"],
        "peso": pilot["mass"],
        "año_nacimiento": pilot["birth_year"],
        "nombre_especie": species.get("name", "Desconocida"),
        "nombre_planeta_origen": homeworld.get("name", "Desconocido")
    }
