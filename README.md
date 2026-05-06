# 🛒 E-Commerce Backend — Turborepo Microservices

A scalable, production-ready **NestJS microservices backend** for an e-commerce platform, orchestrated with [Turborepo](https://turbo.build/repo) for efficient monorepo management. Services communicate independently and are fully containerized with Docker.

---

## 📁 Project Structure

```
ecommerce-baseline/
├── apps/                        # (Reserved for future front-end apps)
├── libs/                        # Shared libraries & utilities
├── packages/                    # Shared packages (configs, types, etc.)
├── services/
│   ├── auth-service/            # Authentication & authorization microservice
│   └── products/                # Product catalog microservice
├── .dockerignore
├── .env                         # Environment variables (local)
├── .env.example                 # Environment variable template
├── .gitignore
├── .npmrc
├── docker-compose.yaml          # Root-level multi-service orchestration
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml          # PNPM workspace config
├── tsconfig.json                # Base TypeScript config
├── tsconfig.copy.json
└── turbo.json                   # Turborepo pipeline config
```

---

## 🧩 Services

### 🔐 Auth Service (`services/auth-service`)

Handles all authentication and authorization concerns for the platform.

**Responsibilities:**

- User registration and login
- JWT token generation and validation
- Password hashing and verification
- Session/token management

### 📦 Products Service (`services/products`)

Manages the product catalog for the e-commerce platform.

**Responsibilities:**

- CRUD operations for products
- Product listing and filtering
- Inventory/stock management
- Category management

---

## 🛠️ Tech Stack

| Layer            | Technology                                         |
| ---------------- | -------------------------------------------------- |
| Runtime          | [Node.js](https://nodejs.org/)                     |
| Framework        | [NestJS](https://nestjs.com/)                      |
| Language         | TypeScript                                         |
| Database         | [MongoDB](https://www.mongodb.com/)                |
| Monorepo         | [Turborepo](https://turbo.build/repo)              |
| Package Manager  | [PNPM](https://pnpm.io/)                           |
| Containerization | [Docker](https://www.docker.com/) & Docker Compose |

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `>= 18.x`
- [PNPM](https://pnpm.io/) `>= 8.x`
- [Docker](https://www.docker.com/) & Docker Compose
- [MongoDB](https://www.mongodb.com/) (or use the Docker Compose setup)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/ecommerce-baseline.git
cd ecommerce-baseline
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration values (MongoDB URI, JWT secrets, ports, etc.).

### 4. Run with Docker Compose (Recommended)

Spin up all services and MongoDB with a single command:

```bash
docker-compose up --build
```

This starts:

- `auth-service`
- `products` service
- MongoDB instance

### 5. Run in Development Mode (without Docker)

Start all services in parallel using Turborepo:

```bash
pnpm dev
```

Or run a specific service:

```bash
# Auth service only
pnpm --filter auth-service dev

# Products service only
pnpm --filter products dev
```

---

## 🏗️ Build

Build all services:

```bash
pnpm build
```

Build a specific service:

```bash
pnpm --filter auth-service build
```

---

## 🧪 Testing

Run tests across all services:

```bash
pnpm test
```

Run tests for a specific service:

```bash
pnpm --filter auth-service test
```

---

## 🐳 Docker

Each service contains its own `Dockerfile`. The root `docker-compose.yaml` orchestrates all services together.

### Build Individual Service Image

```bash
# Auth service
docker build -t auth-service ./services/auth-service

# Products service
docker build -t products-service ./services/products
```

### Start All Services

```bash
docker-compose up --build
```

### Stop All Services

```bash
docker-compose down
```

### Stop and Remove Volumes (resets DB)

```bash
docker-compose down -v
```

---

## 🌍 Environment Variables

Copy `.env.example` to `.env` and fill in the values. Key variables include:

| Variable                | Description                   |
| ----------------------- | ----------------------------- |
| `MONGODB_URI`           | MongoDB connection string     |
| `JWT_SECRET`            | Secret key for JWT signing    |
| `JWT_EXPIRES_IN`        | JWT token expiry duration     |
| `AUTH_SERVICE_PORT`     | Port for the auth service     |
| `PRODUCTS_SERVICE_PORT` | Port for the products service |

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore`.

---

## 📡 API Overview

### Auth Service Endpoints

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| `POST` | `/auth/register` | Register a new user      |
| `POST` | `/auth/login`    | Login and receive JWT    |
| `GET`  | `/auth/profile`  | Get current user profile |

### Products Service Endpoints

| Method   | Endpoint        | Description          |
| -------- | --------------- | -------------------- |
| `GET`    | `/products`     | List all products    |
| `GET`    | `/products/:id` | Get a single product |
| `POST`   | `/products`     | Create a new product |
| `PATCH`  | `/products/:id` | Update a product     |
| `DELETE` | `/products/:id` | Delete a product     |

> Update these endpoints to match your actual route definitions.

---

## 🔄 Turborepo Pipelines

Defined in `turbo.json`, the pipelines enable smart caching and parallel execution:

```json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev": { "cache": false, "persistent": true },
    "test": { "dependsOn": ["build"] },
    "lint": {}
  }
}
```

---

## 📦 Adding a New Service

1. Create a new NestJS app under `services/`:
   ```bash
   nest new services/my-new-service
   ```
2. Add it to `pnpm-workspace.yaml` if not auto-detected.
3. Add a `Dockerfile` inside the new service.
4. Add the service to `docker-compose.yaml`.
5. Add any shared packages to `libs/` or `packages/` as needed.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
