# Caldo Freddo

Decoupled monorepo for the Caldo Freddo website and API.

## Architecture

- `frontend/`: React + Vite single-page app.
- `backend/`: Django REST Framework API.
- Data flow: React consumes JSON over HTTP from Django REST endpoints.
- Database: PostgreSQL.

The frontend and backend remain independent deployable applications. Do not convert React views into Django templates or merge the projects.

## Local Development

Backend:

```powershell
cd backend
..\.venv\Scripts\python.exe manage.py migrate
..\.venv\Scripts\python.exe manage.py runserver
```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://127.0.0.1:8000/api`

## Environment

Frontend uses `VITE_API_BASE_URL` from `frontend/.env`.

Backend uses `backend/.env` for Django, PostgreSQL, allowed hosts, CORS, and CSRF origins.
