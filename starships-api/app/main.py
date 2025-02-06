from fastapi import FastAPI

app = FastAPI(title="Star Wars API")

@app.get("/")
async def root():
    return {"mensaje": "API de Star Wars funcionando"}

# Ejecutar con: uvicorn app.main:app --reload

3