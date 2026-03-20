import mysql.connector
import os
import hashlib
import jwt

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

class User(BaseModel):
    nom: str
    prenom: str
    email: str
    date_naissance: str | None = None
    pays: str | None = None
    ville: str | None = None
    code_postal: str | None = None

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/users")
async def get_users():
    conn = mysql.connector.connect(
        database=os.getenv("MYSQL_DATABASE"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_ROOT_PASSWORD"),
        port=3306,
        host=os.getenv("MYSQL_HOST")
    )

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM utilisateur")
    records = cursor.fetchall()

    cursor.close()
    conn.close()

    return {"utilisateurs": records}

@app.post("/users")
async def create_user(user: User):
    conn = mysql.connector.connect(
        database=os.getenv("MYSQL_DATABASE"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_ROOT_PASSWORD"),
        port=3306,
        host=os.getenv("MYSQL_HOST")
    )

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM utilisateur WHERE email = %s", (user.email,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        raise HTTPException(status_code=400, detail="User already exists")

    sql_query = """
                INSERT INTO utilisateur (nom, prenom, email, date_naissance, pays, ville, code_postal)
                VALUES (%s, %s, %s, %s, %s, %s, %s) \
                """

    values = (
        user.nom,
        user.prenom,
        user.email,
        user.date_naissance,
        user.pays,
        user.ville,
        user.code_postal
    )

    cursor.execute(sql_query, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "User created successfully"}