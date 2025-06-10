# syntax=docker/dockerfile:1

# Stage 1: Install Composer dependenciesAdd commentMore actions
FROM composer:2.8.9 AS deps

WORKDIR /app

# Install system dependencies for ext-mongodb (Alpine-based)
RUN apk add --no-cache --update \
    openssl-dev \
    pkgconf \
    php84-dev \
    autoconf \
    make \
    gcc \
    musl-dev \
    && pecl install mongodb-1.21.0 \
    && echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/mongodb.ini

# Copy composer files
COPY composer.json composer.lock ./

# Install dependencies without running scripts
RUN --mount=type=cache,target=/tmp/cache \
    composer install --no-dev --no-interaction --optimize-autoloader --no-scripts

# Stage 2: Build PHP-FPM runtime
FROM php:8.4-fpm-alpine3.20 AS php

# Install dependencies and PHP extensions
RUN apk add --no-cache \
    libzip-dev \
    unzip \
    openssl-dev \
    pkgconfig \
    autoconf \
    g++ \
    make \
    nginx\
    && pecl install mongodb-1.21.0 \
    && docker-php-ext-enable mongodb \
    && docker-php-ext-install -j$(nproc) pdo_mysql zip bcmath pcntl \
    && apk del autoconf g++ make

# Use production PHP configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Copy Composer dependencies
COPY --from=deps /app/vendor /var/www/html/vendor

# Copy Laravel application
COPY ./ /var/www/html

RUN mkdir -p /var/run && \
    echo "listen = 127.0.0.1:9000" >> /usr/local/etc/php-fpm.d/zz-docker.conf && \
    echo "listen.owner = www-data" >> /usr/local/etc/php-fpm.d/zz-docker.conf && \
    echo "listen.group = www-data" >> /usr/local/etc/php-fpm.d/zz-docker.conf && \
    echo "listen.mode = 0660" >> /usr/local/etc/php-fpm.d/zz-docker.conf

RUN mkdir -p /var/run/php-fpm && chown nginx:nginx /var/run/php-fpm

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache /var/run


# Switch to non-privileged user
USER www-data

# Stage 3: Set up Nginx
FROM nginx:alpine AS nginx

RUN apk add --no-cache netcat-openbsd

# Create directory for PHP-FPM socket
RUN mkdir -p /var/run/php-fpm && \
    chown nginx:nginx /var/run/php-fpm

# Copy Nginx configuration
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy Laravel public directory
COPY --from=php /var/www/html/public /var/www/html/public

CMD ["sh", "-c", "php-fpm -F & nginx -g 'daemon off;'"]

# Expose port 80
EXPOSE 80