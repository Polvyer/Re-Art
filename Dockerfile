# Production Build

# Stage 1: Build react client
FROM node:10.16-alpine as client

# Working directory be app
WORKDIR /usr/app/react-frontend/

COPY react-frontend/package*.json ./

# Install dependencies
RUN npm install --silent

# copy local files to app folder
COPY react-frontend/ ./

RUN npm build

# Stage 2: Build Server

FROM node:10.16-alpine

WORKDIR /usr/src/app/
COPY --from=client /usr/app/react-frontend/build/ ./react-frontend/build/

WORKDIR /usr/src/app/node-backend/
COPY node-backend/package*.json ./
RUN npm ci --only=production
COPY node-backend/ ./

EXPOSE 5000

CMD ["npm", "start"]