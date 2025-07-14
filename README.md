# Bienvenido al coding-interview-backend-level-3 - Parte I

## Descripción
Eres el Senior Developer de tu equipo en El Dorado, y te han dado la responsabilidad de desarrollar un nuevo feature que nos pide el equipo de producto:

> API REST que permita realizar operaciones CRUD sobre una entidad de tipo `Item`.
>
> La entidad tiene 3 campos: `id`, `name` y `price`.
>
>

# Requisitos:
- Si el servicio se reinicia, los datos no se pueden perder.
- Tienes que implementar tu codigo como si estuvieses haciendo un servicio para El Dorado listo para produccion.
- Completar la implementación de toda la funcionalidad de forma tal de que los tests e2e pasen exitosamente.


### Que puedes hacer: 
- ✅ Modificar el código fuente y agregar nuevas clases, métodos, campos, etc.
- ✅ Cambiar dependencias, agregar nuevas, etc.
- ✅ Modificar la estructura del proyecto (/src/** es todo tuyo)
- ✅ Elegir una base de datos
- ✅ Elegir un framework web
- ✅ Crear tests
- ✅ Cambiar la definición del .devContainer


### Que **no** puedes hacer:
- ❌ No puedes modificar el archivo original /e2e/index.test.ts (pero puedes crear otros test si lo deseas)
- ❌ El proyecto debe usar Typescript 
- ❌ Estresarte 🤗


## Cómo ejecutar el proyecto

### Prerrequisitos
- Node.js >= 18.0.0
- npm >= 8.0.0

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/gabrielerrvzla/coding-interview-backend-level-3.git
cd coding-interview-backend-level-3

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Configurar la base de datos
npx prisma generate
npx prisma db push
```

### Desarrollo
```bash
# Ejecutar en modo desarrollo con hot reload
npm run dev
```

### Tests
```bash
# Ejecutar todos los tests (unitarios + E2E)
npm test

# Ejecutar solo tests E2E
npm run test:e2e

# Ejecutar solo tests unitarios
npm run test:unit

# Ejecutar tests en modo watch
npm run test:watch
```

### Producción
```bash
# Construir el proyecto
npm run build

# Ejecutar en producción
npm start
```

### Estructura del proyecto
```
src/
├── controllers/     # Controladores HTTP
├── services/        # Lógica de negocio
├── repositories/    # Acceso a datos
├── models/          # Modelos de datos
├── schemas/         # Validaciones Joi
├── routes/          # Definición de rutas
├── lib/             # Utilidades y configuración
└── index.ts         # Punto de entrada
```

### API Endpoints
- `GET /ping` - Health check
- `GET /items` - Listar todos los items
- `GET /items/:id` - Obtener item por ID
- `POST /items` - Crear nuevo item
- `PUT /items/:id` - Actualizar item
- `DELETE /items/:id` - Eliminar item