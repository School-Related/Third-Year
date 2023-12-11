from fastapi import APIRouter

router = APIRouter(
    prefix="/test",
    tags=["Test"]
)

@router.get("/")
def index():
    return {"message": "Hello"}