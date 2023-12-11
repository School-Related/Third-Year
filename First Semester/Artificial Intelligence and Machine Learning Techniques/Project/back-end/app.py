from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# import routers
from routes.basic import router as basic_router
from routes.trainer import router as trainer_router

app = FastAPI()

# include routers
app.include_router(basic_router)
app.include_router(trainer_router)

# Cors stuff
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}