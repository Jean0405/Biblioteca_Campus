import { Router } from "express";
import mysql from "mysql2/promise";

const RESERVAS = Router();
let conn = undefined;

RESERVAS.use((req, res, next) => {
  try {
    let CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

//TRAER RESERVAS CON SU FECHA RESERVAS Y ESTADO
RESERVAS.get("/", async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT id_reserva, fecha_reserva, estado FROM reserva`
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER RESERVAS", error: error.message });
  }
});

export default RESERVAS;
