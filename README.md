# BIBLIOTECA CAMPUS

Proyecto para gestionar los prestamos, reservas, usuarios y libros de una biblioteca.

# INSTALACIÓN

1. Clona este repositorio

```bash
git clone [link-repositorio]
```

2. Instala las dependencias

```bash
npm install
```

3. Ejecuta todos los query de la base de datos del archivo **db.sql**

4. Cambia tus variables de entorno

```env
MY_CONFIG={"hostname":"", "port":5020}
MY_CONNECTION={"host":"", "user":"","password":"","database":"", "port":3306}
JWT_PRIVATE_KEY="campus"
```

5. Ejecuta el programa

```bash
npm run dev
```

USO DE LOS ENDPOINTS

## Usuario

- **GET**: Trae todos los usuarios y su email

```text
http://127.10.16.15:5020/usuarios

```

## Reserva

- **GET**: Trae todas las reservas con su fecha y estado

```text
http://127.10.16.15:5020/reservas

```

## Prestamos

- **GET**: Trae todos los prestamos junto a los libros a los que pertenece

```text
http://127.10.16.15:5020/prestamos

```

- **GET**: Trae todos los prestamos juntos a los usuarios que los realizaron

```text
http://127.10.16.15:5020/prestamos/prestamos_usuarios

```

## Libros

- **GET**: Trae todos los libros con su autor y editorial

```text
http://127.10.16.15:5020/libros

```

- **GET**: Trae todos los libros disponibles junto a su autor y editorial

```text
http://127.10.16.15:5020/libros/disponibles

```

- **GET**: Trae todos los libros prestados

```text
http://127.10.16.15:5020/libros/prestados

```

- **GET**: Trae todos los libros relacionados a un autor especifico

```text
http://127.10.16.15:5020/libros/autor/:nom_autor/:ape_autor

```

- **GET**: Trae todos los libros relacionados a una categoria especifica

```text
http://127.10.16.15:5020/libros/categoria/:categoria

```

- **GET**: Trae todos los libros en prestamos de un usuario especifico

```text
http://127.10.16.15:5020/libros/prestamos/:nom_usuario/:ape_usuario

```

- **GET**: Trae todos los libros en reserva

```text
http://127.10.16.15:5020/libros/reserva

```

- **GET**: Trae todos los libros en segun su editorial

```text
http://127.10.16.15:5020/libros/editorial/:editorial

```

- **GET**: Trae todos los libros en según una palabra de su nombre

```text
http://127.10.16.15:5020/libros/tirulo/:nom_libro

```

## Autores

- **GET**: Trae todos los autores

```text
http://127.10.16.15:5020/autores

```

- **GET**: Trae todos los autores según su nacionalidad

```text
http://127.10.16.15:5020/autores/nacionalidad/:nac

```

## Categorias

- **GET**: Trae todos las categorias

```text
http://127.10.16.15:5020/categorias

```

## Editoriales

- **GET**: Trae todos las editoriales

```text
http://127.10.16.15:5020/editoriales

```

## Estado de Libros

- **GET**: Trae todos los estados posibles

```text
http://127.10.16.15:5020/estados_libros
```

# AUTOR

![Jean0405](https://github.com/Jean0405)
