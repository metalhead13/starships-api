from fastapi import FastAPI
from app.routes import ships, pilots, update

app = FastAPI(title="Star Wars API")

# Include routes
app.include_router(ships.router, prefix="/api")
app.include_router(pilots.router, prefix="/api")
app.include_router(update.router, prefix="/api")

@app.get("/")
async def root():
    return {"mensaje": "API de Star Wars funcionando"}