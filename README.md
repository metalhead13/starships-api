API de Naves Estelares de Star Wars para los Andes no usar en producción.
Desarrollado por:@metalhead13 > para : UAndes
La API de Naves Estelares de Star Wars es una aplicación basada en FastAPI que proporciona información sobre naves estelares y pilotos del universo de Star Wars.

Esta API funciona como un envoltorio alrededor de la API de Star Wars (SWAPI), ofreciendo endpoints para recuperar información general y específica sobre naves estelares, así como detalles sobre los pilotos. También incluye funcionalidad para actualizar la información de las naves en una base de datos en memoria.

La API está diseñada para ser fácil de usar e integrar, lo que la hace perfecta para desarrolladores que deseen incorporar datos de Star Wars en sus aplicaciones o para fans que quieran explorar el vasto universo de naves estelares y sus pilotos.

### Estructura del Repositorio

```
.
├── starships-api
│   ├── app
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── routes
│   │   │   ├── __init__.py
│   │   │   ├── pilots.py
│   │   │   ├── ships.py
│   │   │   └── update.py
│   │   ├── services
│   │   │   ├── __init__.py
│   │   │   └── swapi.py
│   │   └── tests
│   │       ├── __init__.py
│   │       ├── test_pilots.py
│   │       └── test_ships.py
│   └── README.md
└── starships.json
```

### Archivos Clave:

- `starships-api/app/main.py`: Punto de entrada principal para la aplicación FastAPI.
- `starships-api/app/routes/`: Directorio que contiene los manejadores de rutas para diferentes endpoints.
- `starships-api/app/services/swapi.py`: Servicio para interactuar con la API de Star Wars.
- `starships.json`: Datos JSON de ejemplo para naves estelares (no se utiliza en la API real).

### Instrucciones de Uso

#### Instalación

1. Asegúrate de tener Python 3.7+ instalado.
2. Clona el repositorio:
   ```bash
   git clone <repository-url>
   cd starships-api
   ```
3. Instala las dependencias necesarias:
   ```bash
   pip install fastapi requests uvicorn
   ```

#### Ejecución de la API

Para iniciar el servidor de la API, ejecuta el siguiente comando desde el directorio `starships-api`:

```bash
uvicorn app.main:app --reload
```

La API estará disponible en `http://localhost:8000`.

### Endpoints de la API

- **Endpoint raíz:**

  - `GET /`: Devuelve un mensaje indicando que la API está funcionando.

- **Endpoints de naves estelares:**

  - `GET /api/nave-general`: Recupera una lista de todas las naves estelares con información básica.
  - `GET /api/nave-especifica/{id}`: Recupera información detallada sobre una nave estelar específica.

- **Endpoint de pilotos:**

  - `GET /api/piloto/{id}`: Recupera información sobre un piloto específico.

- **Endpoint de actualización:**
  - `PUT /api/actualizar-nave/{nombre}`: Actualiza la información de una nave estelar específica en la base de datos en memoria.

### Ejemplo de Uso

Para recuperar información sobre una nave estelar específica:

```python
import requests

response = requests.get("http://localhost:8000/api/nave-especifica/10")
print(response.json())
```

Esto devolverá información sobre el Halcón Milenario (ID 10).

### Manejo de Errores

La API utiliza códigos de estado HTTP estándar para indicar el éxito o fracaso de las solicitudes. En caso de errores, se devuelven códigos de estado apropiados (por ejemplo, 404 para no encontrado, 500 para errores del servidor) junto con mensajes de error.

### Pruebas

Para ejecutar las pruebas, navega al directorio `starships-api` y ejecuta:

```bash
python -m pytest app/tests
```

### Flujo de Datos

La API de Naves Estelares de Star Wars actúa como intermediario entre el cliente y la API de Star Wars (SWAPI). Aquí hay una descripción general del flujo de datos:

1. El cliente envía una solicitud a uno de los endpoints de la API.
2. La aplicación FastAPI recibe la solicitud y la dirige al manejador correspondiente.
3. El manejador realiza una solicitud a la SWAPI para obtener los datos requeridos.
4. La SWAPI responde con la información solicitada.
5. El manejador procesa la respuesta de la SWAPI, extrayendo y formateando los datos relevantes.
6. Los datos procesados se envían de vuelta al cliente como una respuesta JSON.

Para el endpoint de actualización, el flujo es ligeramente diferente:

1. El cliente envía una solicitud PUT con los datos de la nave estelar.
2. El manejador de actualización recibe la solicitud y valida los datos.
3. Los datos se almacenan en una base de datos en memoria (simulada con un diccionario de Python).
4. Se envía un mensaje de éxito y los datos actualizados de vuelta al cliente.

```
Cliente <-> Aplicación FastAPI <-> SWAPI
         ^
         |
    Base de Datos en Memoria
    (para actualizaciones)
```

**Nota:** La base de datos en memoria no es persistente y se reiniciará cuando el servidor se reinicie.
