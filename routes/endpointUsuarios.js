import { Router } from "express";
import mysql from "mysql2/promise";

const USUARIOS = Router();
let conn = undefined;

USUARIOS.use((req, res, next) => {
  try {
    let CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

//TRAER USUARIOS CON SU CORREO ELECTRONICO
USUARIOS.get("/", async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT id_usuario, nombre, email FROM usuario`
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER USUARIOS", error: error.message });
  }
});

export default USUARIOS;
