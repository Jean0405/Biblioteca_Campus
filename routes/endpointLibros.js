import { Router } from "express";
import mysql from "mysql2/promise";
import proxyLibroAutor from "../middleware/proxyLibroAutor.js";

const LIBROS = Router();
let conn = undefined;

LIBROS.use((req, res, next) => {
  try {
    let CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

//TRAER LIBROS CON SU AUTOR Y EDITORIAL
LIBROS.get("/", async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT
      libro.titulo,
      autor.nombre AS autor,
      editorial.nombre AS editorial
  FROM libro
      INNER JOIN autor ON libro.id_autor = autor.id_autor
      INNER JOIN editorial ON libro.id_editorial = editorial.id_editorial`
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER LIBROS", error: error.message });
  }
});

//TRAER LIBROS DISPONIBLES CON SU AUTOR Y TITULO
LIBROS.get("/disponibles", async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT
      libro.id_libro,
      libro.titulo AS libro,
      autor.nombre AS autor,
      estado_libro.nombre AS estado
      FROM libro
      INNER JOIN autor ON libro.id_autor = autor.id_autor
      INNER JOIN estado_libro ON libro.id_estado = estado_libro.id_estado
      WHERE estado_libro.nombre = "Disponible"
      `
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER LIBROS", error: error.message });
  }
});

//TRAER LIBROS PRESTADOS CON SU AUTOR Y TITULO
LIBROS.get("/prestados", async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT
      libro.titulo AS libro,
      prestamo.estado,
      prestamo.fecha_devolucion
  FROM prestamo
      INNER JOIN libro ON prestamo.id_libro = libro.id_libro
  WHERE
      prestamo.estado = "Prestado"
      `
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER LIBROS", error: error.message });
  }
});

//TRAER LIBROS ESCRITOS POR UN AUTOR ESPECIFICO
LIBROS.get(
  "/autor/:nom_autor/:ape_autor",
  proxyLibroAutor,
  async (req, res) => {
    const { nom_autor, ape_autor } = req.body;
    try {
      const [rows, fields] = await conn.execute(
        `SELECT
      libro.titulo,
      libro.anio_publicacion,
      libro.isbn,
      libro.num_paginas,
      autor.nombre AS nombre_autor,
      autor.apellido AS apellido_autor
  FROM libro
      INNER JOIN autor ON libro.id_autor = autor.id_autor
  WHERE autor.nombre = ? OR autor.apellido = ?`,
        [nom_autor, ape_autor]
      );
      res.send(rows);
    } catch (error) {
      res
        .status(500)
        .json({ message: "ERROR AL TRAER LIBROS", error: error.message });
    }
  }
);

//TRAER LIBROS DE CIERTA CATEGORIA
LIBROS.get("/categoria/:categoria", proxyLibroAutor, async (req, res) => {
  const { categoria } = req.body;
  try {
    const [rows, fields] = await conn.execute(
      `SELECT 
      libro.titulo AS libro,
      categoria.nombre AS categoria
      FROM libro
      INNER JOIN categoria ON libro.id_categoria = categoria.id_categoria
      WHERE categoria.nombre = ?`,
      [categoria]
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER LIBROS", error: error.message });
  }
});

//TRAER LOS PRESTAMOS REALIZADOS POR UN USUARIO ESPECIFICO
LIBROS.get(
  "/prestamos/:nom_usuario/:ape_usuario",
  proxyLibroAutor,
  async (req, res) => {
    const { nom_usuario, ape_usuario } = req.body;
    try {
      const [rows, fields] = await conn.execute(
        `SELECT
      usuario.nombre AS usuario,
      libro.titulo AS libro,
      prestamo.estado AS estado
      FROM prestamo
      INNER JOIN usuario ON prestamo.id_usuario = usuario.id_usuario
      INNER JOIN libro ON prestamo.id_libro = libro.id_libro
      WHERE usuario.nombre = ? OR usuario.apellido = ?
      `,
        [nom_usuario, ape_usuario]
      );
      res.send(rows);
    } catch (error) {
      res
        .status(500)
        .json({ message: "ERROR AL TRAER LIBROS", error: error.message });
    }
  }
);

//TRAER LOS LIBROS CON MÁS DE 500 PÁGINAS
LIBROS.get("/paginas", proxyLibroAutor, async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT libro.titulo AS libro, autor.nombre AS nombre_autor,autor.apellido AS apellido_autor, num_paginas FROM libro 
      INNER JOIN autor ON libro.id_autor = autor.id_autor
      WHERE num_paginas > 500
      `
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER LIBROS", error: error.message });
  }
});

//TRAER LOS LIBROS PRESTADOS A UN USUARIO ESPECIFICO
LIBROS.get(
  "/prestados/:nom_usuario/:ape_usuario",
  proxyLibroAutor,
  async (req, res) => {
    const { nom_usuario, ape_usuario } = req.body;
    try {
      const [rows, fields] = await conn.execute(
        `SELECT
      usuario.nombre AS nombre_usuario,
      usuario.apellido AS apellido_usuario,
      libro.titulo AS libro,
      prestamo.estado AS estado
      FROM prestamo
      INNER JOIN usuario ON prestamo.id_usuario = usuario.id_usuario
      INNER JOIN libro ON prestamo.id_libro = libro.id_libro
      WHERE prestamo.estado = "Prestado" AND usuario.nombre = ? OR usuario.apellido = ?
      `,
        [nom_usuario, ape_usuario]
      );
      res.send(rows);
    } catch (error) {
      res
        .status(500)
        .json({ message: "ERROR AL TRAER LIBROS", error: error.message });
    }
  }
);

//TRAER LOS LIBROS PRESTADOS A UN USUARIO ESPECIFICO
LIBROS.get("/reserva", proxyLibroAutor, async (req, res) => {
  try {
    const [rows, fields] = await conn.execute(
      `SELECT 
      libro.titulo,
      reserva.estado AS estado_reserva
      FROM reserva
      INNER JOIN libro ON reserva.id_libro = libro.id_libro
      `
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER LIBROS", error: error.message });
  }
});

//TRAER LOS LIBROS DE UNA EDITORIAL ESPECIFICA
LIBROS.get("/editorial/:editorial", proxyLibroAutor, async (req, res) => {
  const { editorial } = req.body;
  try {
    const [rows, fields] = await conn.execute(
      `SELECT 
      libro.titulo AS libro,
      editorial.nombre AS editorial
      FROM libro
      INNER JOIN editorial ON libro.id_editorial = editorial.id_editorial
      WHERE editorial.nombre = ?
      `,
      [editorial]
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER LIBROS", error: error.message });
  }
});

//TRAER LOS LIBROS CON TITULO QUE CONTENGAN CIERTA PALABRA
LIBROS.get("/titulo/:nom_libro", proxyLibroAutor, async (req, res) => {
  const { nom_libro } = req.body;
  try {
    const [rows, fields] = await conn.execute(
      `SELECT libro.* FROM libro WHERE titulo LIKE "%${nom_libro}%"
      `
    );
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR AL TRAER LIBROS", error: error.message });
  }
});

export default LIBROS;
