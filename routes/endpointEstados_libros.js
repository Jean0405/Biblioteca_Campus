import { Router } from "express";
import mysql from "mysql2/promise";

const ESTADOS_LIBROS = Router();
let conn = undefined;

ESTADOS_LIBROS.use((req, res, next) => {
  try {
    let CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

//TRAER ESTADOS_LIBROS Y SU DESCRIPCIÓN
ESTADOS_LIBROS.get("/", async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT nombre, descripcion FROM estado_libro`
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER ESTADOS_LIBROS", error: error.message });
  }
});

export default ESTADOS_LIBROS;
