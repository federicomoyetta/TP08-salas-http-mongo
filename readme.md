# TP-08 — Sistema de Reservas de Salas con Express y MongoDB

## Descripción

Aplicación web desarrollada con Node.js, Express, EJS, MongoDB Atlas y Mongoose para gestionar reservas de salas.

El proyecto permite crear, listar y consultar reservas mediante una interfaz web y una API REST que intercambia información en formato JSON.

Las reservas se almacenan de forma persistente en MongoDB.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- EJS
- express-ejs-layouts
- Morgan
- JavaScript (CommonJS)
- Postman para las pruebas de la API
- ESLint y Prettier

## Estructura del proyecto

```text
tp-08-salas-mongodb/
├── public/
├── scripts/
├── src/
│   ├── config/
│   │   ├── entorno.js
│   │   └── base-datos.js
│   ├── controladores/
│   │   └── reservas.js
│   ├── middleware/
│   │   ├── errores.js
│   │   ├── reservas.js
│   │   └── solicitudes.js
│   ├── modelos/
│   │   └── reserva.js
│   ├── rutas/
│   │   ├── reservas.js
│   │   └── reservas-api.js
│   ├── servicios/
│   │   └── reservas-mongo.js
│   ├── app.js
│   └── index.js
├── views/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

## Requisitos previos

- Node.js compatible con la opción `--env-file` (Node.js 20.6 o superior).
- npm.
- Acceso a una base de datos MongoDB Atlas.
- Visual Studio Code u otro editor de código.
- Postman para probar la API REST.

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/federicomoyetta/TP08-salas-http-mongo.git
```

Ingresar a la carpeta del proyecto:

```bash
cd TP08-salas-http-mongo
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto, tomando como referencia `.env.example`.

Ejemplo:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USUARIO:CONTRASENA@CLUSTER.mongodb.net/reservas_salas_u8?retryWrites=true&w=majority
```

Reemplazar los valores de ejemplo por las credenciales y la dirección correspondientes a MongoDB Atlas.

**Importante:** el archivo `.env` contiene información sensible y no debe subirse al repositorio de GitHub.

### 4. Iniciar la aplicación

```bash
npm start
```

El script de inicio utiliza:

```bash
node --env-file=.env src/index.js
```

Si la conexión se establece correctamente, la terminal muestra:

```text
Conexión a MongoDB establecida.
Servidor iniciado en http://localhost:3000
```

Abrir en el navegador:

http://localhost:3000

## Funcionalidades de la aplicación web

La aplicación permite:

- Visualizar la página principal.
- Consultar el listado de reservas.
- Crear nuevas reservas mediante un formulario.
- Consultar el detalle de una reserva.
- Validar los datos ingresados.
- Almacenar las reservas en MongoDB.

### Rutas web

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Página principal |
| GET | `/reservas` | Listado de reservas |
| GET | `/reservas/nueva` | Formulario de nueva reserva |
| POST | `/reservas` | Crear una reserva |
| GET | `/reservas/:id` | Consultar detalle de una reserva |

## API REST

La aplicación dispone de una API REST para consultar y crear reservas mediante solicitudes HTTP.

### Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/reservas` | Obtener todas las reservas |
| GET | `/api/reservas/:id` | Obtener una reserva por ID |
| POST | `/api/reservas` | Crear una nueva reserva |

### Ejemplo de solicitud POST

**URL:**

```text
http://localhost:3000/api/reservas
```

**Body (raw / JSON):**

```json
{
  "estudiante": "Prueba Postman",
  "email": "postman@gmail.com",
  "sala": "Sala Sur",
  "fecha": "2026-11-03",
  "turno": "Tarde",
  "personas": 3
}
```

Si los datos son correctos, la API crea la reserva y responde con el código HTTP `201 Created`.

## Validaciones

Antes de guardar una reserva se verifican las siguientes condiciones:

| Campo | Validación |
|---|---|
| Estudiante | Obligatorio |
| Email | Obligatorio y debe contener `@` |
| Sala | Sala Norte, Sala Sur o Sala Multimedia |
| Fecha | Obligatoria |
| Turno | Mañana, Tarde o Noche |
| Personas | Número entero entre 1 y 6 |

Si la API recibe datos inválidos, responde con `400 Bad Request` e informa los errores mediante JSON.

Ejemplo:

```json
{
  "errores": [
    "El email debe contener @.",
    "La cantidad de personas debe ser un número entero entre 1 y 6."
  ]
}
```

## Pruebas realizadas con Postman

Se realizaron las siguientes pruebas:

| Prueba | Resultado |
|---|---|
| GET de todas las reservas | 200 OK |
| GET de una reserva existente | 200 OK |
| GET de una reserva inexistente | 404 Not Found |
| POST con datos válidos | 201 Created |
| POST con datos inválidos | 400 Bad Request |

También se verificó el funcionamiento de la interfaz web y la persistencia de los datos después de detener y reiniciar el servidor.

## Persistencia de datos

Las reservas se almacenan en MongoDB Atlas utilizando Mongoose.

A diferencia del almacenamiento temporal mediante arreglos de JavaScript, los datos permanecen guardados después de reiniciar la aplicación.

Cada reserva posee un identificador único `_id` generado por MongoDB.

## Comprobación del código

El proyecto dispone de scripts para comprobar y aplicar el formato del código.

Verificar formato y reglas de ESLint:

```bash
npm run check
```

Aplicar formato con Prettier:

```bash
npm run format
```

## Seguridad y entrega

Antes de publicar o entregar el proyecto, verificar que:

- El archivo `.env` esté excluido mediante `.gitignore`.
- No se incluyan contraseñas ni credenciales de MongoDB Atlas.
- No se suba la carpeta `node_modules`.
- Se incluyan `package.json` y `package-lock.json`.
- El archivo `.env.example` contenga valores de ejemplo sin credenciales reales.
- El proyecto pueda iniciarse utilizando `npm install` y `npm start`.

## Conclusión

El TP-08 permite integrar los conocimientos de Node.js, Express, EJS, MongoDB y Mongoose para desarrollar una aplicación web con persistencia de datos.

También permite practicar la creación de una API REST, el uso de métodos HTTP, las validaciones del servidor, el manejo de códigos de estado y las pruebas de endpoints mediante Postman.

Las pruebas realizadas confirmaron el funcionamiento de las principales operaciones implementadas.