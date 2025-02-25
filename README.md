# FreelanceHub

![FreelanceHub Logo](src/assets/logo-white.svg)

## 📌 Descripción

FreelanceHub es una plataforma integral para freelancers que permite gestionar proyectos, clientes, contratos, tareas y pagos, todo desde un solo lugar. Diseñada para optimizar el flujo de trabajo de profesionales independientes, esta aplicación centraliza toda la información necesaria para una gestión eficiente.

## ✨ Características principales

- **Gestión de proyectos**: Crea, edita y gestiona tus proyectos freelance
- **Gestión de clientes**: Mantén organizada la información de tus clientes
- **Seguimiento de tareas**: Controla el avance de tus tareas en cada proyecto
- **Gestión de contratos**: Genera y administra contratos para tus proyectos
- **Control de pagos**: Realiza un seguimiento de los pagos recibidos y pendientes
- **Estadísticas**: Visualiza el estado general de tu actividad freelance

## 🔧 Tecnologías utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario
- **Vite**: Herramienta de desarrollo rápida para aplicaciones web modernas
- **React Router**: Enrutamiento para aplicaciones React
- **Tailwind CSS**: Framework CSS para diseño rápido y responsive
- **Lucide Icons**: Conjunto de iconos modernos
- **API RESTful**: Comunicación con el backend a través de una API

## 🚀 Instalación y uso

### Prerrequisitos

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior) o yarn

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/FreelanceHub-front.git
   cd FreelanceHub-front
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre tu navegador y visita `http://localhost:5173`

### Construir para producción

```bash
npm run build
# o
yarn build
```

## 📁 Estructura del proyecto

El proyecto sigue una arquitectura basada en características (feature-based), lo que permite una mejor organización y escalabilidad:

```
src/
├── assets/           # Archivos estáticos (logos, imágenes)
├── components/       # Componentes reutilizables
│   ├── ui/           # Componentes de UI básicos
│   └── layout/       # Componentes de estructura
├── features/         # Características principales organizadas por dominio
│   ├── auth/         # Autenticación (login, registro, recuperación)
│   ├── clients/      # Gestión de clientes
│   ├── contracts/    # Gestión de contratos
│   ├── dashboard/    # Dashboard principal
│   ├── payments/     # Gestión de pagos
│   ├── profile/      # Perfil de usuario
│   ├── projects/     # Gestión de proyectos
│   └── tasks/        # Gestión de tareas
├── hooks/            # Hooks personalizados
├── lib/              # Utilidades y funciones auxiliares
├── services/         # Servicios de API y lógica de negocio
├── styles/           # Estilos globales y configuración de tema
└── utils/            # Funciones utilitarias
```

## 🔒 Autenticación

La aplicación utiliza un sistema de autenticación basado en localStorage para mantener la sesión del usuario. El flujo de autenticación incluye:

- **Inicio de sesión**: Mediante email y contraseña
- **Registro**: Creación de nueva cuenta de usuario
- **Recuperación de contraseña**: Proceso de tres pasos para restablecer la contraseña

## 🌐 API

La aplicación se comunica con un backend a través de una API RESTful. Los endpoints principales son:

- **Autenticación**: `/login`, `/agregar-usuario`
- **Proyectos**: `/get-proyectos/:userId`, `/get-proyecto/:projectId`, `/agregar-proyecto`, `/actualizar-proyecto/:projectId`
- **Clientes**: `/get-clientes/:userId`, `/get-cliente/:clientId`, `/agregar-cliente`
- **Tareas**: `/get-tareas/:projectId`, `/agregar-tarea`, `/actualizar-tarea/:taskId`
- **Pagos**: `/get-pagos/:projectId`, `/agregar-pago`
- **Contratos**: `/get-contrato/:projectId`, `/agregar-contrato`

## 🔄 Flujo de trabajo

1. El usuario inicia sesión o crea una cuenta
2. En el dashboard, puede visualizar estadísticas y proyectos recientes
3. Puede crear un nuevo proyecto seleccionando un cliente existente o creando uno nuevo
4. Para cada proyecto, puede gestionar tareas, contratos y pagos
5. El sistema proporciona una vista general del estado de todos los proyectos

## 🎨 Personalización del tema

El tema visual se puede personalizar a través del archivo `src/styles/theme.js`, que incluye:

- Paleta de colores
- Tipografía
- Bordes y sombras
- Animaciones
- Espaciado

## 📊 Dashboard

El dashboard principal proporciona información en tiempo real sobre:

- Número total de proyectos
- Número total de clientes
- Porcentaje de tareas completadas
- Pagos pendientes
- Proyectos recientes

## 👥 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama para tu función (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commits (`git commit -m 'Añade nueva funcionalidad'`)
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE.md)
