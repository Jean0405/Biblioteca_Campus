import { Router } from "express";
import mysql from "mysql2/promise";

const CATEGORIAS = Router();
let conn = undefined;

CATEGORIAS.use((req, res, next) => {
  try {
    let CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

//TRAER CATEGORIAS DISPONIBLES
CATEGORIAS.get("/", async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(`SELECT * FROM categoria`);
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER CATEGORIAS", error: error.message });
  }
});

export default CATEGORIAS;
