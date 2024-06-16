# GameScope

GameScope, plataforma web interactiva capaz de facilitar a los usuarios la búsqueda, análisis y comparación de videojuegos. Asimismo, también integra un módulo de reseñas y calificaciones para incentivar la participación de la comunidad y proveer feedback de calidad.

## Requisitos

- PHP 8.2 o superior
- Composer
- Node.js 14 o superior
- Angular CLI
- MySQL o cualquier base de datos compatible con Laravel

## Instalación

### Clonar el repositorio

Primero, clona el repositorio desde GitHub:

```bash
git clone https://github.com/albbmg/GameScope.git
```

### Configurar el backend (Laravel)

1. Instalar las dependencias de PHP usando Composer:

```bash
composer install
```

2. Crear un archivo .env a partir del ejemplo y configurar las variables de entorno:

```bash
cp .env.example .env
```

Edita el archivo .env para configurar la conexión a la base de datos, simplemente se debería de modificar usuario y contraseña en caso de ser necesario: 

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gamescope_db
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

3. Generar la clave de la aplicación

```bash
php artisan key:generate
```

4. Ejecutar las migraciones y seeders para preparar la base de datos con los datos de prueba: 

```bash
php artisan migrate --seed
```

5. Iniciar el servidor de desarrollo de Laravel

```bash
php artisan serve
```
### Configurar el frontend (Angular)

1. En caso de no tener Angukar CLI instalado globalmente, instalarlo:

```bash
npm install -g @angular/cli
```

2. Instalar las dependencias de Node.js utilizando npm:

```bash
npm install
```

3. Iniciar el servidor de desarrollo de Angular:

```bash
ng serve
```

## Estructura del proyecto

### Backend (Laravel)

- Migraciones: Definen la estructura de las tablas de la base de datos.
- Seeders: Poblan la base de datos con datos iniciales.
- Factories: Generan datos ficticios para pruebas.
- Controladores: Manejan las solicitudes HTTP y devuelven respuestas adecuadas.
- Modelos: Representan las entidades de la base de datos y sus relaciones.

### Frontend (Angular)
- Componentes: Definen la estructura y lógica de la interfaz de usuario.
- Servicios: Gestionan la lógica de negocio y las operaciones de datos.
- Rutas: Configuran la navegación de la aplicación.
- Guards: Protegen rutas para asegurar que solo los usuarios autorizados puedan acceder a ciertas áreas.