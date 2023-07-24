import { Router } from "express";
import mysql from "mysql2/promise";
import proxyAutor from "../middleware/proxyAutor.js";

const AUTORES = Router();
let conn = undefined;

AUTORES.use((req, res, next) => {
  try {
    let CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

//TRAER AUTORES Y SU NACIONALIDAD
AUTORES.get("/", async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT nombre, apellido, nacionalidad FROM autor`
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER AUTORES", error: error.message });
  }
});

//TRAER AUTORES DE NACIONALIDAD ESPAÑOLA
AUTORES.get("/nacionalidad/:nac", proxyAutor, async (req, res) => {
  const { nac } = req.body;
  const Nac = nac.charAt(0).toUpperCase() + nac.slice(1);
  console.log(Nac);
  try {
    const [rows, fields] = await conn.execute(
      `SELECT * FROM autor WHERE nacionalidad = ?`,
      [Nac]
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER AUTORES", error: error.message });
  }
});

export default AUTORES;
