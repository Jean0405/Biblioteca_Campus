import { Router } from "express";
import mysql from "mysql2/promise";

const EDITORIALES = Router();
let conn = undefined;

EDITORIALES.use((req, res, next) => {
  try {
    let CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

//TRAER EDITORIALES Y SU DIRECCIÓN
EDITORIALES.get("/", async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT nombre, direccion FROM editorial`
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER EDITORIALES", error: error.message });
  }
});

export default EDITORIALES;
