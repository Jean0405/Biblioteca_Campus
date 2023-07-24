import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { Autor } from "../controller/autorDTO.js";

const proxyAutor =
  ("/:nac",
  async (req, res, next) => {
    try {
      req.body = plainToInstance(Autor, req.params, {
        excludeExtraneousValues: true,
      });
      next();
    } catch (err) {
      res.status(err.status).send(err.message);
    }
  });

export default proxyAutor;
