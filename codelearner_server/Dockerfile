# syntax=docker/dockerfile:1

# Stage 1: Build PHP-FPM runtime with dependencies
FROM php:8.4-fpm as php

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    libssl-dev \
    pkg-config \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN pecl install mongodb-1.21.0 \
    && docker-php-ext-enable mongodb \
    && docker-php-ext-install -j$(nproc) pdo_mysql zip bcmath pcntl

# Use production PHP configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Set working directory
WORKDIR /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy composer files first (for better caching)
COPY composer.json composer.lock ./

# Install Composer dependencies
RUN --mount=type=cache,target=/root/.composer/cache \
    composer install --no-dev --no-interaction --optimize-autoloader --no-scripts

# Copy Laravel application
COPY . .

# Run Laravel setup commands
RUN composer dump-autoload --optimize

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 755 /var/www/html/vendor

# Switch to non-privileged user
USER www-data

# Stage 2: Set up Nginx
FROM nginx:alpine as nginx

# Copy Nginx configuration
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy Laravel public directory
COPY --from=php /var/www/html/public /var/www/html/public

# Expose port 80
EXPOSE 80