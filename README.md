# 🛒 E-Commerce Backend — Turborepo Microservices

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white)
![Helm](https://img.shields.io/badge/Helm-0F1689?logo=helm&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?logo=googlecloud&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-FF4438?logo=redis&logoColor=white)
![Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?logo=apachekafka&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)
![GitHub last commit](https://img.shields.io/github/last-commit/Subhrotechinfo/ecommerce-backend)
![GitHub stars](https://img.shields.io/github/stars/Subhrotechinfo/ecommerce-backend?style=social)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A scalable, production-ready **NestJS microservices backend** for an e-commerce platform, orchestrated with [Turborepo](https://turbo.build/repo) for efficient monorepo management. Services communicate independently and are fully containerized with Docker, deployed to **Google Kubernetes Engine (GKE)** via **Google Cloud Build** with images stored in **Google Artifact Registry**.

---

## 📁 Project Structure

```
ecommerce-baseline/
├── apps/                            # (Reserved for future front-end apps)
├── libs/                            # Shared libraries & utilities
├── k8s/
│   └── ecommerce/                   # Kubernetes manifests for all services
├── packages/                        # Shared packages (configs, types, etc.)
├── services/
│   ├── auth-service/                # Authentication & authorization microservice
│   ├── notification-service/        # Notification delivery microservice
│   ├── orders-service/              # Order management microservice
│   ├── payments-service/            # Payment processing microservice
│   └── products/                    # Product catalog microservice
├── .dockerignore
├── .env                             # Environment variables (local)
├── .env.example                     # Environment variable template
├── .gitignore
├── .npmrc
├── cloudbuild.yaml                  # Google Cloud Build CI/CD pipeline
├── docker-compose.yaml              # Root-level multi-service orchestration
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml              # PNPM workspace config
├── tsconfig.json                    # Base TypeScript config
└── turbo.json                       # Turborepo pipeline config
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

### 🔔 Notification Service (`services/notification-service`)

Manages outbound email notifications via SMTP using [Google OAuth2](https://developers.google.com/identity/protocols/oauth2) for secure, token-based authentication.

**Responsibilities:**

- Email delivery via SMTP with Google OAuth2 authentication
- OAuth2 access token retrieval using a refresh token
- Event-driven notification triggers
- Notification templates and rendering
- Delivery status tracking

### 📋 Orders Service (`services/orders-service`)

Manages the full order lifecycle for the e-commerce platform.

**Responsibilities:**

- Order creation and management
- Order status tracking and updates
- Cart and checkout processing
- Order history and reporting

### 💳 Payments Service (`services/payments-service`)

Handles payment processing and financial transactions via the [Stripe](https://stripe.com/) payment gateway.

**Responsibilities:**

- Payment charge creation and processing via Stripe
- Stripe webhook handling and event verification
- Transaction history and reconciliation
- Refund and dispute management

### 📦 Products Service (`services/products`)

Manages the product catalog for the e-commerce platform.

**Responsibilities:**

- CRUD operations for products
- Product listing and filtering
- Inventory/stock management
- Category management

---

## 🛠️ Tech Stack

| Layer            | Technology                                                                         |
| ---------------- | ---------------------------------------------------------------------------------- |
| Runtime          | [Node.js](https://nodejs.org/)                                                     |
| Framework        | [NestJS](https://nestjs.com/)                                                      |
| Language         | TypeScript                                                                         |
| Database         | [MongoDB](https://www.mongodb.com/)                                                |
| Monorepo         | [Turborepo](https://turbo.build/repo)                                              |
| Package Manager  | [PNPM](https://pnpm.io/)                                                           |
| Containerization | [Docker](https://www.docker.com/) & Docker Compose                                 |
| Orchestration    | [Kubernetes (GKE)](https://cloud.google.com/kubernetes-engine)                     |
| CI/CD            | [Google Cloud Build](https://cloud.google.com/build)                               |
| Image Registry   | [Google Artifact Registry](https://cloud.google.com/artifact-registry)             |
| Payment Gateway  | [Stripe](https://stripe.com/)                                                      |
| Email Delivery   | SMTP with [Google OAuth2](https://developers.google.com/identity/protocols/oauth2) |

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `>= 18.x`
- [PNPM](https://pnpm.io/) `>= 8.x`
- [Docker](https://www.docker.com/) & Docker Compose
- [MongoDB](https://www.mongodb.com/) (or use the Docker Compose setup)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) (for Kubernetes deployments)
- [Google Cloud SDK (`gcloud`)](https://cloud.google.com/sdk/docs/install) (for GKE & Cloud Build)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Subhrotechinfo/ecommerce-backend.git
cd ecommerce-backend
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
- `notification-service`
- `orders-service`
- `payments-service`
- `products` service
- MongoDB instance

### 5. Run in Development Mode (without Docker)

Start all services in parallel using Turborepo:

```bash
pnpm dev
```

Or run a specific service:

```bash
pnpm --filter auth-service dev
pnpm --filter notification-service dev
pnpm --filter orders-service dev
pnpm --filter payments-service dev
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
pnpm --filter orders-service build
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
pnpm --filter payments-service test
```

---

## 🐳 Docker

Each service contains its own `Dockerfile`. The root `docker-compose.yaml` orchestrates all services together.

### Build Individual Service Image

```bash
docker build -t auth-service ./services/auth-service
docker build -t notification-service ./services/notification-service
docker build -t orders-service ./services/orders-service
docker build -t payments-service ./services/payments-service
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

## ☁️ Google Cloud Build — CI/CD Automation

This project uses **Google Cloud Build** to automate building and pushing Docker images on every commit to the `main` branch. The pipeline is defined in [`cloudbuild.yaml`](./cloudbuild.yaml) at the root of the repository.

### How It Works

1. A push to `main` triggers a Cloud Build trigger (configured in GCP Console).
2. Cloud Build builds a Docker image for each microservice using its respective `Dockerfile`.
3. Each image is tagged and pushed to **Google Artifact Registry** in the `asia-south1` region under the `ecommerce-499513` project.

### Cloud Build Pipeline (`cloudbuild.yaml`)

```yaml
steps:
  # Auth Service
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "build",
        "-t",
        "asia-south1-docker.pkg.dev/ecommerce-499513/auth-service/production",
        "-f",
        "services/auth-service/Dockerfile",
        ".",
      ]
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "push",
        "asia-south1-docker.pkg.dev/ecommerce-499513/auth-service/production",
      ]

  # Notification Service
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "build",
        "-t",
        "asia-south1-docker.pkg.dev/ecommerce-499513/notification-service/production",
        "-f",
        "services/notification-service/Dockerfile",
        ".",
      ]
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "push",
        "asia-south1-docker.pkg.dev/ecommerce-499513/notification-service/production",
      ]

  # Orders Service
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "build",
        "-t",
        "asia-south1-docker.pkg.dev/ecommerce-499513/orders-service/production",
        "-f",
        "services/orders-service/Dockerfile",
        ".",
      ]
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "push",
        "asia-south1-docker.pkg.dev/ecommerce-499513/orders-service/production",
      ]

  # Payments Service
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "build",
        "-t",
        "asia-south1-docker.pkg.dev/ecommerce-499513/payments-service/production",
        "-f",
        "services/payments-service/Dockerfile",
        ".",
      ]
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "push",
        "asia-south1-docker.pkg.dev/ecommerce-499513/payments-service/production",
      ]

  # Products Service
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "build",
        "-t",
        "asia-south1-docker.pkg.dev/ecommerce-499513/products/production",
        "-f",
        "services/products/Dockerfile",
        ".",
      ]
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "push",
        "asia-south1-docker.pkg.dev/ecommerce-499513/products/production",
      ]

options:
  logging: CLOUD_LOGGING_ONLY
```

### Setting Up Cloud Build Trigger

1. Navigate to **Cloud Build → Triggers** in the [GCP Console](https://console.cloud.google.com/cloud-build/triggers).
2. Click **Create Trigger** and connect your GitHub repository.
3. Set the trigger to fire on pushes to the `main` branch.
4. Point it to `cloudbuild.yaml` as the build configuration file.
5. Ensure the Cloud Build service account has the **Artifact Registry Writer** IAM role.

### Authenticate Docker with Artifact Registry (local pushes)

```bash
gcloud auth configure-docker asia-south1-docker.pkg.dev
```

---

## 🗃️ Google Artifact Registry — Image Storage

All Docker images are stored in **Google Artifact Registry** in the `asia-south1` region.

### Image Registry URLs

| Service              | Registry Path                                                                  |
| -------------------- | ------------------------------------------------------------------------------ |
| Auth Service         | `asia-south1-docker.pkg.dev/ecommerce-499513/auth-service/productions`         |
| Notification Service | `asia-south1-docker.pkg.dev/ecommerce-499513/notification-service/productions` |
| Orders Service       | `asia-south1-docker.pkg.dev/ecommerce-499513/orders-service/productions`       |
| Payments Service     | `asia-south1-docker.pkg.dev/ecommerce-499513/payments-service/productions`     |
| Products Service     | `asia-south1-docker.pkg.dev/ecommerce-499513/products/productions`             |

### Pull an Image Manually

```bash
# Authenticate first
gcloud auth configure-docker asia-south1-docker.pkg.dev

# Pull a specific image
docker pull asia-south1-docker.pkg.dev/ecommerce-499513/auth-service/production:latest
```

---

## ☸️ Kubernetes (GKE) Deployment

All Kubernetes manifests live in the `k8s/ecommerce/` directory. Each microservice has its own `Deployment` and `Service` manifest.

### Prerequisites

```bash
# Install kubectl
gcloud components install kubectl

# Authenticate and get GKE cluster credentials
gcloud container clusters get-credentials <CLUSTER_NAME> \
  --region asia-south1 \
  --project ecommerce-499513
```

### Directory Structure

```
k8s/
└── ecommerce/
    ├── auth-service/
    │   ├── deployment.yaml
    │   └── service.yaml
    ├── notification-service/
    │   ├── deployment.yaml
    │   └── service.yaml
    ├── orders-service/
    │   ├── deployment.yaml
    │   └── service.yaml
    ├── payments-service/
    │   ├── deployment.yaml
    │   └── service.yaml
    └── products/
        ├── deployment.yaml
        └── service.yaml
```

### Deploy All Services

Apply all manifests in the `k8s/ecommerce/` directory:

```bash
kubectl apply -f k8s/ecommerce/
```

### Deploy a Specific Service

```bash
kubectl apply -f k8s/ecommerce/auth-service/
kubectl apply -f k8s/ecommerce/orders-service/
```

### Check Deployment Status

```bash
# List all pods
kubectl get pods

# List all services
kubectl get services

# Describe a specific deployment
kubectl describe deployment auth-service

# View logs for a specific pod
kubectl logs -f deployment/auth-service
```

### Rolling Update (after a new image push)

When Cloud Build pushes a new image to Artifact Registry, trigger a rolling update:

```bash
kubectl rollout restart deployment/auth-service
kubectl rollout restart deployment/orders-service
kubectl rollout restart deployment/payments-service
kubectl rollout restart deployment/notification-service
kubectl rollout restart deployment/products-service
```

### Scale a Deployment

```bash
# Scale auth-service to 3 replicas
kubectl scale deployment auth-service --replicas=3
```

### Delete All Resources

```bash
kubectl delete -f k8s/ecommerce/
```

### Example Deployment Manifest

Below is an example `deployment.yaml` for the Auth Service. Other services follow the same pattern:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-service
  labels:
    app: auth-service
spec:
  replicas: 2
  selector:
    matchLabels:
      app: auth-service
  template:
    metadata:
      labels:
        app: auth-service
    spec:
      containers:
        - name: auth-service
          image: asia-south1-docker.pkg.dev/ecommerce-499513/auth-service/production:latest
          ports:
            - containerPort: 3001
          envFrom:
            - secretRef:
                name: ecommerce-secrets
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: auth-service
spec:
  selector:
    app: auth-service
  ports:
    - protocol: TCP
      port: 3001
      targetPort: 3001
  type: ClusterIP
```

### Managing Secrets in Kubernetes

Store sensitive environment variables (JWT secrets, Stripe keys, etc.) as Kubernetes Secrets:

```bash
kubectl create secret generic ecommerce-secrets \
  --from-env-file=.env
```

Reference the secret in your deployment manifests using `envFrom.secretRef`.

---

## 🏗️ Full CI/CD Flow

```
GitHub Push (main branch)
        │
        ▼
Google Cloud Build (cloudbuild.yaml)
        │
        ├── Build Docker images for all 5 services
        │
        └── Push images to Google Artifact Registry
                  (asia-south1-docker.pkg.dev/ecommerce-499513/...)
                        │
                        ▼
              kubectl rollout restart
                        │
                        ▼
          Google Kubernetes Engine (GKE)
              Pods pull latest images
              and serve traffic
```

---

## 🌍 Environment Variables

Copy `.env.example` to `.env` and fill in the values. Key variables include:

### General

| Variable      | Description                                       |
| ------------- | ------------------------------------------------- |
| `NODE_ENV`    | Runtime environment (`development`, `production`) |
| `MONGODB_URI` | MongoDB connection string                         |

### Auth Service

| Variable                | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `AUTH_SERVICE_APP_NAME` | Display name for the auth service              |
| `AUTH_SERVICE_APP_PORT` | HTTP port for the auth service                 |
| `AUTH_SERVICE_TCP_PORT` | TCP port for inter-service communication       |
| `AUTH_HOST`             | Hostname used by other services to reach auth  |
| `JWT_SECRET`            | Secret key for JWT signing                     |
| `JWT_EXPIRES_IN`        | JWT token expiry duration (e.g. `3600s`, `7d`) |

### Products Service

| Variable                   | Description                           |
| -------------------------- | ------------------------------------- |
| `PRODUCT_SERVICE_APP_NAME` | Display name for the products service |
| `PRODUCT_SERVICE_APP_PORT` | HTTP port for the products service    |

### Orders Service

| Variable                  | Description                              |
| ------------------------- | ---------------------------------------- |
| `ORDERS_SERVICE_APP_NAME` | Display name for the orders service      |
| `ORDERS_SERVICE_APP_PORT` | HTTP port for the orders service         |
| `ORDERS_TCP_PORT`         | TCP port for inter-service communication |

### Payments Service

| Variable                    | Description                                       |
| --------------------------- | ------------------------------------------------- |
| `PAYMENTS_SERVICE_APP_NAME` | Display name for the payments service             |
| `PAYMENTS_SERVICE_APP_PORT` | HTTP port for the payments service                |
| `PAYMENTS_HOST`             | Hostname used by other services to reach payments |
| `PAYMENTS_TCP_PORT`         | TCP port for inter-service communication          |
| `STRIPE_SECRET_KEY`         | Stripe secret API key                             |

### Notification Service

| Variable                        | Description                                            |
| ------------------------------- | ------------------------------------------------------ |
| `NOTIFICATION_SERVICE_APP_NAME` | Display name for the notification service              |
| `NOTIFICATION_SERVICE_APP_PORT` | HTTP port for the notification service                 |
| `NOTIFICATION_HOST`             | Hostname used by other services to reach notifications |
| `NOTIFICATION_TCP_PORT`         | TCP port for inter-service communication               |
| `SMTP_USER`                     | Gmail address used as the SMTP sender                  |
| `GOOGLE_OAUTH_CLIENT_ID`        | Google OAuth2 client ID for SMTP authentication        |
| `GOOGLE_OAUTH_CLIENT_SECRET`    | Google OAuth2 client secret for SMTP authentication    |
| `GOOGLE_OAUTH_REFRESH_TOKEN`    | OAuth2 refresh token to obtain SMTP access tokens      |

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore`.

---

## 📡 API Overview

### Auth Service Endpoints

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| `POST` | `/auth/register` | Register a new user      |
| `POST` | `/auth/login`    | Login and receive JWT    |
| `GET`  | `/auth/profile`  | Get current user profile |

### Notification Service Endpoints

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| `POST` | `/notifications/send` | Trigger a notification    |
| `GET`  | `/notifications`      | List notifications        |
| `GET`  | `/notifications/:id`  | Get a single notification |

### Orders Service Endpoints

| Method   | Endpoint      | Description            |
| -------- | ------------- | ---------------------- |
| `GET`    | `/orders`     | List all orders        |
| `GET`    | `/orders/:id` | Get a single order     |
| `POST`   | `/orders`     | Create a new order     |
| `PATCH`  | `/orders/:id` | Update an order        |
| `DELETE` | `/orders/:id` | Cancel/delete an order |

### Payments Service Endpoints

| Method | Endpoint            | Description                        |
| ------ | ------------------- | ---------------------------------- |
| `POST` | `/payments/charge`  | Create a new Stripe charge         |
| `POST` | `/payments/webhook` | Receive and verify Stripe webhooks |
| `GET`  | `/payments`         | List payment transactions          |
| `GET`  | `/payments/:id`     | Get a single transaction           |

### Products Service Endpoints

| Method   | Endpoint        | Description          |
| -------- | --------------- | -------------------- |
| `GET`    | `/products`     | List all products    |
| `GET`    | `/products/:id` | Get a single product |
| `POST`   | `/products`     | Create a new product |
| `PATCH`  | `/products/:id` | Update a product     |
| `DELETE` | `/products/:id` | Delete a product     |

---

## 🔄 Turborepo Pipelines

Defined in `turbo.json`, the pipelines enable smart caching and parallel task execution across all services.

| Task          | Command            | Description                                                                      |
| ------------- | ------------------ | -------------------------------------------------------------------------------- |
| `build`       | `pnpm build`       | Compiles all services; outputs to `dist/`. Depends on upstream builds (`^build`) |
| `dev`         | `pnpm dev`         | Runs all services in watch mode. No cache, persistent process                    |
| `start:dev`   | `pnpm start:dev`   | Starts services in dev mode; watches `.env*` files for changes                   |
| `test`        | `pnpm test`        | Runs tests after build; outputs coverage to `coverage/`                          |
| `lint`        | `pnpm lint`        | Lints all packages; respects upstream lint order (`^lint`)                       |
| `check-types` | `pnpm check-types` | TypeScript type-checking across all services                                     |

### Global Dependencies

Turborepo treats the following as global — any change to them invalidates the cache for **all** tasks:

- `.env` — shared environment config
- `tsconfig.json` — root TypeScript configuration

---

## 📦 Adding a New Service

1. Create a new NestJS app under `services/`:

```bash
nest new services/my-new-service
```

2. Add it to `pnpm-workspace.yaml` if not auto-detected.
3. Add a `Dockerfile` inside the new service.
4. Add the service to `docker-compose.yaml`.
5. Add build and push steps for the new service to `cloudbuild.yaml`.
6. Create `k8s/ecommerce/my-new-service/deployment.yaml` and `service.yaml`.
7. Add any shared packages to `libs/` or `packages/` as needed.

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

---

<p align="center">
  Made with ❤️ by <strong>Subhro Chatterjee </strong>
</p>

<p align="center">
  <a href="https://github.com/Subhrotechinfo">
    <img src="https://img.shields.io/badge/Author-Subhrotechinfo-blue?style=flat-square&logo=github" alt="Author Badge"/>
  </a>
</p>
