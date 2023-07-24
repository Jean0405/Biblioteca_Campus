import { Expose, Transform } from "class-transformer";

export class Autor {

  @Expose({ name: "nac" })
  @Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚ\s]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` } }, { toClassOnly: true })
  nac: string;

  constructor(

    nac:string = ""
  ) {
    this.nac = nac;
  }
}