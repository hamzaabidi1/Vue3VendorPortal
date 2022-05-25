FROM node:lts-alpine as build-npm-stage
LABEL maintainer="Abidi hamza"
WORKDIR ./
COPY package*.json ./
RUN npm install
COPY public ./public
COPY src ./src
COPY .env.production ./

RUN npm run build

# Run env
FROM nginx:stable-alpine
COPY --from=build-npm-stage ./dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]