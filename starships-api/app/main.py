from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import ships, pilots, update

app = FastAPI(title="Star Wars API")

# Configure CORS
origins = ["*"]  # Ajsutar para producción
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(ships.router, prefix="/api")
app.include_router(pilots.router, prefix="/api")
app.include_router(update.router, prefix="/api")

@app.get("/")
async def root():
    return {"mensaje": "La API esta funcional mi señoro Oscuro"}