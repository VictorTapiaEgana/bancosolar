
# Aplicacion Fullstack con Handlebars y Postgress

 Aplicación web que consta de un mantendor de usuarios ( crear, editar, eliminar y lee), y un gestor de transferencias que permite mientras tengan saldo las cuentas girar dinero entre ellas, esto manejado desde un API RESTful con node conectado a un base de datos postgres.



![](https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white) ![](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white) ![](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white) ![](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black) ![](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white)![](https://img.shields.io/badge/Bulma-00D1B2.svg?style=for-the-badge&logo=Bulma&logoColor=white)

# Endpoints:
```
    / GET

    /usuario POST
    /usuarios GET
    /usuario PUT
    /usuario DELETE

    /transferencia POST
    /transferencias GET

```

### Estructura de Carpetas
```

└── 📁Banco Solar CA
    └── .env
    └── db._config.js
    └── 📁functions
        └── crearTransferencia.js
        └── crearusuario.js
        └── EditarCliente.js
        └── EliminarCliente.js
        └── transferencias.js
        └── usuarios.js
    └── package-lock.json
    └── package.json
    └── 📁pages
        └── index.html
        └── transferencias.html
        └── usuarios.html
    └── 📁public
        └── 📁css
            └── style.css
        └── 📁images
            └── logo.png
        └── 📁scripts
            └── script.js
            └── scriptTransferencias.js
    └── server.js

```


## Dependencias
```

  "dependencies": {
    "express": "^4.19.2",
    "pg": "^8.12.0"
  }

```

## instalacion

```
 git clone https://github.com/VictorTapiaEgana/bancosolar.git
 npm install
 npm start
```

## Script DASE DE DATOS:
```
CREATE DATABASE bancosolar
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```

## Script de la TABLAS ( trasnferencias - usuarios ):
```
CREATE TABLE IF NOT EXISTS public.transferencias
(
    id integer NOT NULL DEFAULT nextval('transferencias_id_seq'::regclass),
    emisor integer,
    receptor integer,
    monto double precision,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT transferencias_pkey PRIMARY KEY (id),
    CONSTRAINT transferencias_emisor_fkey FOREIGN KEY (emisor)
        REFERENCES public.usuarios (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT transferencias_receptor_fkey FOREIGN KEY (receptor)
        REFERENCES public.usuarios (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

``` 
```
CREATE TABLE IF NOT EXISTS public.usuarios
(
    id integer NOT NULL DEFAULT nextval('usuarios_id_seq'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default",
    balance double precision,
    genero character varying(20) COLLATE pg_catalog."default",
    fecha_creacion date DEFAULT CURRENT_DATE,
    CONSTRAINT usuarios_pkey PRIMARY KEY (id),
    CONSTRAINT usuarios_balance_check CHECK (balance >= 0::double precision)
)

```

## Definir un arcvhivo .ENV con las siguientes constantes:
```
SERVER_PORT=3010
DB_NAME='bancosolar'
DB_USER='postgres'
DB_PASS= TU CONTRASEÑA
DB_PORT=5432
DB_HOST='localhost'

```

## Listado de transferencias realizadas

![](https://raw.githubusercontent.com/VictorTapiaEgana/bancosolar/master/github/transferencias.png)

## Creacion de cliente y saldo inicial

![](https://raw.githubusercontent.com/VictorTapiaEgana/bancosolar/master/github/usuarios.png)

## Eliminar registro

![](https://raw.githubusercontent.com/VictorTapiaEgana/bancosolar/master/github/eliminar.png)




