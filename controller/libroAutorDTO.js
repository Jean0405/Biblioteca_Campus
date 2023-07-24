var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
export class LibroAutor {
    constructor(nom_autor = "", categoria = "", nom_usuario = "", ape_usuario = "", ape_autor = "", editorial = "", nom_libro = "") {
        this.nom_autor = nom_autor;
        this.categoria = categoria;
        this.nom_usuario = nom_usuario;
        this.ape_usuario = ape_usuario;
        this.ape_autor = ape_autor;
        this.editorial = editorial;
        this.nom_libro = nom_libro;
    }
}
__decorate([
    Expose({ name: "categoria" }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚ\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], LibroAutor.prototype, "categoria", void 0);
__decorate([
    Expose({ name: "nom_autor" }),
    Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], LibroAutor.prototype, "nom_autor", void 0);
__decorate([
    Expose({ name: "ape_autor" }),
    Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], LibroAutor.prototype, "ape_autor", void 0);
__decorate([
    Expose({ name: "nom_usuario" }),
    Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], LibroAutor.prototype, "nom_usuario", void 0);
__decorate([
    Expose({ name: "ape_usuario" }),
    Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], LibroAutor.prototype, "ape_usuario", void 0);
__decorate([
    Expose({ name: "editorial" }),
    Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], LibroAutor.prototype, "editorial", void 0);
__decorate([
    Expose({ name: "nom_libro" }),
    Transform(({ value }) => { if (/^[a-z-A-Z-ÿ áéíóúÁÉÍÓÚ\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error, el dato ${value} no cumple con lo requerido` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], LibroAutor.prototype, "nom_libro", void 0);
