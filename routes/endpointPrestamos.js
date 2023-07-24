import { Router } from "express";
import mysql from "mysql2/promise";

const PRESTAMOS = Router();
let conn = undefined;

PRESTAMOS.use((req, res, next) => {
  try {
    let CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

//TRAER PRESTAMOS CON SU FECHA PRESTAMOS, FECHA DEVOLUCIÓN Y EL ESTADO
PRESTAMOS.get("/", async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT 
      libro.titulo AS libro,
      prestamo.fecha_prestamo AS prestamo,
      prestamo.fecha_devolucion AS devolucion,
      prestamo.estado
      FROM prestamo
      INNER JOIN libro ON prestamo.id_libro = libro.id_libro;
      `
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER PRESTAMOS", error: error.message });
  }
});

//TRAER PRESTAMOS CON FECHA PRESTAMO Y EL USUARIO QUE LO REALIZO
PRESTAMOS.get("/prestamos_usuarios", async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT 
      prestamo.estado AS estado_prestamo,
      usuario.nombre AS nom_usuario,
      usuario.apellido AS ape_usuario
      FROM prestamo
      INNER JOIN usuario ON prestamo.id_usuario = usuario.id_usuario
      `
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER PRESTAMOS", error: error.message });
  }
});
export default PRESTAMOS;
