from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# Modelo de datos para validación
class ShipUpdate(BaseModel):
    nombre: str
    modelo: str
    costo: str
    velocidad: str
    capacidad_personal: str
    capacidad_pasajeros: str
    pilotos_asignados: list

# Simulación de base de datos en memoria
ships_db = {}

@router.put("/actualizar-nave/{nombre}")
async def update_starship(nombre: str, ship: ShipUpdate):
    ships_db[nombre] = ship.dict()
    return {"mensaje": "Nave actualizada correctamente", "data": ships_db[nombre]}
