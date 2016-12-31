FROM nginx:1.10.2-alpine
MAINTAINER Andre Shen 

RUN mkdir -p /var/www/html
WORKDIR /var/www/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./www/ ./
