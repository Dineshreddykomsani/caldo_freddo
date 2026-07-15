# Caldo Freddo Backend

Production-oriented Django REST Framework backend for the Caldo Freddo React frontend.

## Stack

- Python 3.13+
- Django
- Django REST Framework
- PostgreSQL
- python-decouple
- django-cors-headers

## Setup

Create and activate a virtual environment, then install dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

Update `backend/.env` with real PostgreSQL credentials:

```env
SECRET_KEY=replace-with-a-secure-secret-key
DEBUG=False
ALLOWED_HOSTS=api.example.com,www.example.com
CORS_ALLOWED_ORIGINS=https://www.example.com
DB_NAME=caldo_freddo
DB_USER=caldo_freddo_user
DB_PASSWORD=replace-with-a-strong-password
DB_HOST=localhost
DB_PORT=5432
```

Run migrations and create an admin user:

```powershell
cd backend
..\.venv\Scripts\python.exe manage.py migrate
..\.venv\Scripts\python.exe manage.py createsuperuser
```

Start the API server for local development:

```powershell
..\.venv\Scripts\python.exe manage.py runserver
```

## API Endpoints

- `GET /api/company/`
- `GET /api/services/`
- `GET /api/products/`
- `GET /api/industries/`
- `GET /api/testimonials/`
- `GET /api/partners/`
- `POST /api/callback/`
- `POST /api/quote/`
- `POST /api/contact/`

Successful responses use this shape:

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

Validation errors use this shape:

```json
{
  "success": false,
  "message": "Request validation failed.",
  "errors": {}
}
```

## Example Requests

```powershell
Invoke-RestMethod -Method Get -Uri http://127.0.0.1:8000/api/services/
```

```powershell
Invoke-RestMethod `
  -Method Post `
  -Uri http://127.0.0.1:8000/api/callback/ `
  -ContentType "application/json" `
  -Body '{"full_name":"Jane Doe","phone":"+919876543210","email":"jane@example.com","service":"Cold Storage","message":"Please call me back."}'
```

```powershell
Invoke-RestMethod `
  -Method Post `
  -Uri http://127.0.0.1:8000/api/quote/ `
  -ContentType "application/json" `
  -Body '{"full_name":"Jane Doe","company_name":"Example Foods","email":"jane@example.com","phone":"+919876543210","service":"Cold Room","project_details":"Need a quote for a cold room installation."}'
```

```powershell
Invoke-RestMethod `
  -Method Post `
  -Uri http://127.0.0.1:8000/api/contact/ `
  -ContentType "application/json" `
  -Body '{"name":"Jane Doe","company":"Example Foods","email":"jane@example.com","phone":"+971 50 000 0000","product":"Rack Armour","query":"Please contact me about warehouse barrier requirements."}'
```

## Email

Lead notification emails use the Resend API. Configure these in `backend/.env`:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
DEFAULT_FROM_EMAIL=
OWNER_EMAIL=owner@example.com
```

Lead submissions are saved before email is attempted. If Resend fails, the API returns an error and logs the delivery failure.

## Production Notes

- Keep `DEBUG=False` in production.
- Set `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, and `CORS_ALLOWED_ORIGINS` to explicit domains.
- Use a strong `SECRET_KEY` from environment configuration.
- Serve the React frontend separately; this backend renders no public HTML templates.
- Django Admin is the only authentication surface included.
