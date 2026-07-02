# Backend Integration Guide for HarvestAI Africa Frontend

## 1. Base URL and environment

The frontend expects the API to be reachable at:

- Development: `/api`
- Configured client base URL: [src/environments/environment.ts](src/environments/environment.ts)
- Local proxy target: [proxy.conf.json](proxy.conf.json)

By default, the frontend will call the backend through the Angular dev proxy at:

- `http://localhost:4200/api/...`
- which is proxied to `http://localhost:5000/...`

If your backend runs on another port or host, update both files accordingly.

## 2. Authentication endpoints

The frontend currently expects these endpoints:

### Endpoint table

| Method | Path | Purpose | Request body | Response |
| --- | --- | --- | --- | --- |
| POST | /api/auth/login | Sign in a farmer | `{ email, password }` | `{ accessToken, user }` |
| POST | /api/auth/register | Create a new farmer account | `{ name, email, password, phone?, country?, province?, language? }` | `{ accessToken, user }` |
| GET | /api/auth/me | Fetch the current authenticated user | None | `{ user }` |

### POST /api/auth/login
Request body:
```json
{
  "email": "farmer@example.com",
  "password": "secret123"
}
```

Expected response:
```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": "user-123",
    "name": "Test Farmer",
    "email": "farmer@example.com",
    "role": "farmer",
    "country": "South Africa",
    "province": "Limpopo",
    "language": "en",
    "onboardingComplete": false
  }
}
```

### POST /api/auth/register
Request body:
```json
{
  "name": "Test Farmer",
  "email": "farmer@example.com",
  "password": "secret123",
  "phone": "+27123456789",
  "country": "South Africa",
  "province": "Limpopo",
  "language": "en"
}
```

Expected response:
```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": "user-123",
    "name": "Test Farmer",
    "email": "farmer@example.com",
    "role": "farmer",
    "country": "South Africa",
    "province": "Limpopo",
    "language": "en",
    "onboardingComplete": false
  }
}
```

### Authentication header

Once the user logs in, the frontend stores the token in local storage as `harvestai-token` and sends it automatically as:

```http
Authorization: Bearer <token>
```

## 3. Expected user model

The frontend expects a user object shaped like this:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | yes | Unique identifier |
| name | string | yes | Full display name |
| email | string | yes | Unique email |
| phone | string | no | Optional phone number |
| avatar | string | no | Optional avatar URL |
| role | string | yes | `farmer`, `admin`, or `expert` |
| country | string | yes | Country name |
| province | string | yes | Province or region |
| language | string | yes | Locale code such as `en` |
| onboardingComplete | boolean | yes | Whether onboarding was completed |

Example:
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "avatar": "string",
  "role": "farmer | admin | expert",
  "country": "string",
  "province": "string",
  "language": "string",
  "onboardingComplete": true
}
```

## 4. Error handling contract

The frontend expects backend errors to return a readable message.

Recommended error format:
```json
{
  "message": "Invalid email or password."
}
```

If the backend returns an HTTP error, the frontend will surface the message from `error.error.message` or `error.message`.

## 5. Recommended backend features to build next

The frontend already has UI screens for the following areas. The backend should eventually support these endpoints and data models:

### Feature endpoint table

| Area | Endpoint examples | Notes |
| --- | --- | --- |
| Auth and profile | `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me`, `PUT /api/auth/profile` | Core login and session support |
| Dashboard and farm data | `GET /api/farms/me`, `GET /api/farms/:id`, `GET /api/dashboard/summary`, `GET /api/notifications` | Farm summary and user activity |
| Crop and advisory | `POST /api/ai/chat`, `POST /api/disease-detection/analyze`, `GET /api/weather/current`, `GET /api/weather/forecast`, `GET /api/crop-advisor/recommendations`, `GET /api/yield-forecast` | AI and advisory features |
| Market and marketplace | `GET /api/market-prices`, `GET /api/marketplace/listings` | Pricing and buyer/seller data |
| Planner and analytics | `GET /api/planner/tasks`, `POST /api/planner/tasks`, `PUT /api/planner/tasks/:id`, `GET /api/analytics/summary` | Farm operations and performance |

## 6. Suggested response conventions

Use consistent JSON responses:

### Success
```json
{
  "success": true,
  "data": { }
}
```

### Error
```json
{
  "success": false,
  "message": "Something went wrong"
}
```

## 7. Recommended implementation notes

- Use JWT-based auth.
- Return `accessToken` on login/register.
- Store the token securely on the client side and send it via `Authorization` header.
- Support CORS for the frontend origin (`http://localhost:4200` in development).
- Use consistent camelCase field names in JSON where possible to match the frontend models.
- Keep the API versioned if possible, for example `/api/v1/...`.

## 8. Frontend integration points already wired

The frontend is already prepared to consume API calls from:

- [src/app/core/services/auth.service.ts](src/app/core/services/auth.service.ts)
- [src/app/core/services/api.service.ts](src/app/core/services/api.service.ts)
- [src/app/core/interceptors/auth.interceptor.ts](src/app/core/interceptors/auth.interceptor.ts)

## 9. Minimum milestone for first integration

The first backend milestone should include:

1. Login endpoint
2. Register endpoint
3. JWT auth middleware
4. Current user profile endpoint
5. CORS support for local development


