import { Expose, Transform } from "class-transformer";

export class LibroAutor {

  @Expose({ name: "categoria" })
  @Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚ\s]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` } }, { toClassOnly: true })
  categoria: string;

  @Expose({ name: "nom_autor" })
  @Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` } }, { toClassOnly: true })
  nom_autor: string;

  @Expose({ name: "ape_autor" })
  @Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` } }, { toClassOnly: true })
  ape_autor: string;

  @Expose({ name: "nom_usuario" })
  @Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` } }, { toClassOnly: true })
  nom_usuario: string;

  @Expose({ name: "ape_usuario" })
  @Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` } }, { toClassOnly: true })
  ape_usuario: string;

  @Expose({ name: "editorial" })
  @Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` } }, { toClassOnly: true })
  editorial: string;

  @Expose({ name: "nom_libro" })
  @Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` } }, { toClassOnly: true })
  nom_libro: string;

  constructor(
    nom_autor: string = "",
    categoria:string = "",
    nom_usuario:string = "",
    ape_usuario:string = "",
    ape_autor:string = "",
    editorial:string = "",
    nom_libro:string = ""
  ) {
    this.nom_autor = nom_autor;
    this.categoria = categoria;
    this.nom_usuario = nom_usuario;
    this.ape_usuario = ape_usuario;
    this.ape_autor = ape_autor;
    this.editorial = editorial;
    this.nom_libro = nom_libro;
  }
}