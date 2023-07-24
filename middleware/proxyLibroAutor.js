import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { LibroAutor } from "../controller/libroAutorDTO.js";

const proxyLibroAutor =
  ("/:nom_autor/:ape_autor/:nom_usuario/:ape_usuario/:categoria/:editorial/:nom_libro",
  async (req, res, next) => {
    try {
      req.body = plainToInstance(LibroAutor, req.params, {
        excludeExtraneousValues: true,
      });
      next();
    } catch (err) {
      res.status(err.status).send(err.message);
    }
  });

export default proxyLibroAutor;
