# syntax=docker/dockerfile:1

# Stage 1: Install Composer dependencies
FROM composer:lts AS deps

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
    mongo-c-driver-dev \
    libbson-dev \
    && pecl install mongodb-1.21.0 \
    && echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/mongodb.ini

# Copy composer files
COPY composer.json composer.lock ./

# Install dependencies without running scripts
RUN --mount=type=cache,target=/tmp/cache \
    composer install --no-dev --no-interaction --optimize-autoloader --no-scripts

# Stage 2: Build PHP-FPM runtime
FROM php:8.4-fpm AS php

# Install dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    libssl-dev \
    pkg-config \
    libmongoc-dev \
    libbson-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-enable mongodb \
    && docker-php-ext-install -j$(nproc) pdo_mysql zip bcmath pcntl


# Copy MongoDB extension from deps stage
COPY --from=deps /usr/local/lib/php/extensions /usr/local/lib/php/extensions
COPY --from=deps /usr/local/etc/php/conf.d/mongodb.ini /usr/local/etc/php/conf.d/mongodb.ini

# Use production PHP configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Copy Composer dependencies
COPY --from=deps /app/vendor /var/www/html/vendor

# Copy Laravel application
COPY ./ /var/www/html

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Switch to non-privileged user
USER www-data

# Stage 3: Set up Nginx
FROM nginx:alpine as nginx

# Copy Nginx configuration
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy Laravel public directory
COPY --from=php /var/www/html/public /var/www/html/public

# Expose port 80
EXPOSE 80