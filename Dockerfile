FROM node:alpine3.18 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .



FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
RUN npm run build
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]