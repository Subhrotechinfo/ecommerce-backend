FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./tsconfig.json
COPY turbo.json ./turbo.json


COPY services/products ./services/products
COPY libs ./libs
COPY apps ./apps
COPY packages ./packages

RUN npm install -g pnpm turbo

RUN pnpm install

RUN pnpm run build --filter=products 

FROM node:alpine AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json tsconfig.json
COPY turbo.json turbo.json
COPY packages ./packages
RUN npm install -g pnpm 

RUN pnpm install --prod

COPY --from=development /usr/src/app/services/products/dist ./dist

CMD ["node", "dist/src/main"]