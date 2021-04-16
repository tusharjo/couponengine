FROM node:lts-alpine as build-deps
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
COPY --from=build-deps /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

