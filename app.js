console.clear();
import express from "express";
import dotenv from "dotenv";
import AUTORES from "./routes/endpointAutores.js";
import CATEGORIAS from "./routes/endpointCategorias.js";
import EDITORIALES from "./routes/endpointEditoriales.js";
import ESTADOS_LIBROS from "./routes/endpointEstados_libros.js";
import LIBROS from "./routes/endpointLibros.js";
import PRESTAMOS from "./routes/endpointPrestamos.js";
import RESERVAS from "./routes/endpointReservas.js";
import USUARIOS from "./routes/endpointUsuarios.js";

dotenv.config();
const CONFIG = JSON.parse(process.env.MY_CONFIG);
const appExpress = express();

appExpress.use(express.json());

appExpress.use("/autores", AUTORES);
appExpress.use("/categorias", CATEGORIAS);
appExpress.use("/editoriales", EDITORIALES);
appExpress.use("/estados_libros", ESTADOS_LIBROS);
appExpress.use("/libros", LIBROS);
appExpress.use("/prestamos", PRESTAMOS);
appExpress.use("/reservas", RESERVAS);
appExpress.use("/usuarios", USUARIOS);

appExpress.listen(CONFIG, () => {
  console.log(`http://${CONFIG.hostname}:${CONFIG.port}`);
});
