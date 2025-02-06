import requests
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/nave-general")
async def get_starships():
    url = "https://swapi.py4e.com/api/starships/"
    response = requests.get(url)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error al obtener datos de SWAPI")

    data = response.json()
    
    ships_data = [
        {
            "nombre": ship["name"],
            "modelo": ship["model"],
            "costo": ship["cost_in_credits"],
            "velocidad": ship["max_atmosphering_speed"]
        } for ship in data.get("results", [])
    ]
    
    return ships_data
