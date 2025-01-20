# FreelanceHub

A full-stack web application for comprehensive project management, developed as a graduation project for 4Geeks Academy bootcamp. FreelanceHub helps freelancers manage their projects, clients, tasks, and payments in one centralized platform.

## Features

- User authentication with JWT
- Client management system
- Project tracking and organization
- Task management with reminder system
- Payment tracking and verification
- Contract generation and management
- Email notification system
- Responsive design for all devices

## Tech Stack

### Backend

- Python Flask
- PostgreSQL
- JWT for authentication
- CORS for cross-origin resource sharing
- Cloudinary for file storage
- Flask-Mail for email notifications
- Schedule for task automation
- psycopg2 for database connectivity

### Frontend

- React.js
- Bootstrap 5.3
- React Router for navigation
- Vercel for deployment

## Database Schema

The application uses a PostgreSQL database with the following main tables:

- usuarios (Users)
- clientes (Clients)
- proyectos (Projects)
- tareas (Tasks)
- pagos (Payments)
- plantillas (Templates)
- contratos (Contracts)

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

3. Set up environment variables:
   Create a `.env` file in the backend directory with the following variables:

```
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MAIL_SERVER=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_DEFAULT_SENDER_NAME=
MAIL_DEFAULT_SENDER_EMAIL=
```

4. Install frontend dependencies:

```bash
cd frontend
npm install
```

5. Start the development servers:

Backend:

```bash
python index.py
```

Frontend:

```bash
npm run dev
```

## API Endpoints

### Users

- POST `/register-usuario` - Register new user
- POST `/login-usuario` - User login
- PATCH `/usuario/:id/update` - Update user profile
- PATCH `/usuario/:id/update-password` - Update password

### Projects

- GET `/proyectos/:user_id` - Get all projects for a user
- POST `/create-proyecto` - Create new project
- GET `/proyecto/:id` - Get specific project
- PATCH `/proyecto/:id` - Update project
- DELETE `/proyecto/:id` - Delete project

### Tasks

- GET `/tareas/:proyecto_id` - Get tasks for a project
- POST `/create-tarea` - Create new task
- GET `/tarea/:id` - Get specific task
- PATCH `/tarea/:id` - Update task
- DELETE `/tarea/:id` - Delete task

### Payments

- POST `/create-pago` - Create new payment
- GET `/pagos/:proyecto_id` - Get payments for a project
- PATCH `/pago/:id` - Update payment
- DELETE `/pago/:id` - Delete payment

## Deployment

The application is deployed using:

- Backend: Flask server
- Frontend: Vercel
- Database: PostgreSQL

## Contributors

- Team Lead & Back-end Developer: Max Ihnen
- Front-end Developer: Jeneydis Molina

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
