FROM --platform=linux/amd64 node:16 as build-react
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build:prod

FROM nginx:stable-alpine
COPY --from=build-react /app/webpack/build /web
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
