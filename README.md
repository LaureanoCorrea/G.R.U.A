# 📦 Proyecto E-commerce

Este es un proyecto de una aplicación de comercio electrónico desarrollada con **React Native** y **Expo**. La aplicación permite a los usuarios realizar compras en línea, agregar productos al carrito y gestionar su cuenta. Está diseñada para ejecutarse en dispositivos Android, iOS y web.

## 🚀 Comenzando

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### 📋 Requisitos previos

Asegúrate de tener instalados los siguientes programas:

- Node.js (versión 18 o superior)
- Expo CLI
- Un emulador de Android/iOS o un dispositivo físico con la app de **Expo Go** instalada

### 🔧 Instalación

1. Clona este repositorio:

   ```bash
   git clone <https://github.com/LaureanoCorrea/ecommerce.git>
   ```

2. Ve al directorio del proyecto:

   ```bash
   cd ecommerce
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```

5. Escanea el código QR en la terminal con **Expo Go** o inicia el proyecto en un emulador:

   - **Android:**
     ```bash
     npm run android
     ```
   - **iOS:**
     ```bash
     npm run ios
     ```
   - **Web:**
     ```bash
     npm run web
     ```

## 🛠️ Tecnologías utilizadas

### 📱 Frontend

- **React Native**: Framework para el desarrollo de aplicaciones móviles.
- **Expo**: Plataforma para desarrollar aplicaciones React Native.
- **React Navigation**: Navegación entre pantallas.
- **Redux Toolkit**: Manejo del estado global.

### 📂 Base de datos

- **SQLite** (usando el módulo `expo-sqlite`): Base de datos local para almacenar datos de sesión y carrito.

### 📦 Dependencias principales

| Paquete                         | Versión  | Descripción                                 |
| ------------------------------- | -------- | ------------------------------------------- |
| `expo`                          | ^52.0.26 | Plataforma para desarrollo con React Native |
| `react-native`                  | 0.76.6   | Framework para desarrollo móvil             |
| `@reduxjs/toolkit`              | ^2.5.0   | Herramientas avanzadas para Redux           |
| `react-redux`                   | ^9.2.0   | Conexión entre Redux y React                |
| `yup`                           | ^1.6.1   | Validación de formularios                   |
| `expo-sqlite`                   | ~15.0.6  | Módulo para manejar SQLite                  |
| `@react-navigation/native`      | ^7.0.14  | Navegación principal                        |
| `@react-navigation/bottom-tabs` | ^7.2.0   | Pestañas de navegación inferiores           |

## 🖥️ Estructura del proyecto

```
📂 ecommerce
├── 📂 assets             # Recursos como imágenes y fuentes
├── 📂 components         # Componentes reutilizables
├── 📂 features           # Slices y lógica de Redux Toolkit
├── 📂 globals            # Configuraciones globales (colores, estilos, etc.)
├── 📂 screens            # Pantallas principales de la aplicación
├── 📂 services           # Llamadas API y configuraciones
├── 📂 config             # Configuraciones adicionales (SQLite, etc.)
├── App.js                # Punto de entrada principal
└── package.json          # Archivo de configuración del proyecto
```

## ✨ Funcionalidades

- **Inicio de sesión y registro**: Autenticación de usuarios.
- **Gestión de carrito**: Agregar, editar y eliminar productos.
- **Navegación intuitiva**: Navegación entre pantallas mediante pestañas.
- **Persistencia local**: Almacenamiento de datos de sesión en SQLite.

## 📧 Contacto

Si tienes preguntas o problemas, no dudes en contactarme en: [loriensdesign@gmail.com](mailto:loriensdesign@gmail.com)
# G.R.U.A
