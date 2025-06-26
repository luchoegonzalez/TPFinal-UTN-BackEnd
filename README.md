# 🛠️ Trabajo Práctico Final UTN: Implementación de Búsqueda

Este proyecto es una mejora sobre una aplicación CRUD previamente desarrollada con MongoDB, Express, React y Node.js, perteneciente al repositorio: https://github.com/GabrielAlberini/app-utn-final .  
La nueva funcionalidad incorporada permite **buscar productos por nombre** desde el frontend, consultando a la base de datos de forma parcial e insensible a mayúsculas.

---

## 🚀 Tecnologías utilizadas

- **Frontend:**
  - React + Vite
  - Fetch API
- **Backend:**
  - Node.js + Express
  - MongoDB + Mongoose
  - TypeScript

---

## 🧑‍💻 Funcionalidad Agregada: Búsqueda por Nombre

- Se agregó un **input de búsqueda** en la vista principal del frontend (`Home`).
- Al escribir, se realiza una consulta al backend para buscar productos cuyo nombre **coincida parcial o completamente** con el texto ingresado.
- La búsqueda es **insensible a mayúsculas**.
- Si no hay coincidencias, se muestra un mensaje indicando que no se encontraron productos.
- Se agregó variable de entorno en el frontend para acceder a la API del backend.

---

## ▶️ Instrucciones para ejecutar el proyecto

### 📦 Backend

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/luchoegonzalez/TPFinal-UTN-BackEnd.git
   cd backend
   ```

2. Instalá dependencias:
   ```bash
   npm install
   ```

3. Creá un archivo `.env` siguiendo de referencia este ejemplo:
   ```bash
   PORT=1234
   URI_DB=mongodb://localhost:27017/nombredb
   JWT_SECRET=clavesecreta
   ```

4. Iniciá el servidor:
   ```bash
   npm run dev
   ```

### 💻 Frontend

1. Ir a la carpeta del frontend:
   ```bash
   cd frontend
   ```

2. Instalá dependencias:
   ```bash
   npm install
   ```

3. Creá un archivo `.env` siguiendo de referencia este ejemplo:
   ```bash
   VITE_API_URL=http://localhost:1234/api
   ```
El programa encontrara automaticamente el /auth y /products.

4. Iniciá la app:
   ```bash
   npm run dev
   ```

---

## 🔍 Ejemplo de uso

1. Abrí la aplicación en el navegador.
2. Regístrate, inicia sesión y cargá algunos productos desde el Dashboard. Ejemplos:
   - `"Maceta de barro"`
   - `"Juego de sábanas"`
   - `"Pelota saltarina"`
3. En el input de búsqueda, escribí parte del nombre de un producto, por ejemplo:
   - `"maceta"` → devuelve `"Maceta de barro"`
   - `"juego"` → devuelve `"Juego de sábanas"`
   - `"ta"` → devuelve `"Maceta de barro"`, `"Pelota saltarina"`
   - `"a"` → devuelve todos los productos que contengan la letra "a"
4. Si no hay resultados, se muestra un mensaje informativo.

---

> 💡 Autor: Luciano González  
> Trabajo Practico Final – Curso de Backend Developer – UTN