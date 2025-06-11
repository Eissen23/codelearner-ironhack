FROM richarvey/nginx-php-fpm:3.1.6

COPY . .

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

RUN apk update && apk add --no-cache \
    unzip \
    pkgconf \
    openssl-dev \
    php82-dev \
    autoconf \
    g++ \
    make \
    libbson-dev \
    && pecl install mongodb-1.21.0 \
    && docker-php-ext-enable mongodb \
    && docker-php-ext-install -j$(nproc) bcmath pcntl \
    && apk del php82-dev autoconf g++ make libbson-dev \
    && rm -rf /var/cache/apk/*
    
CMD ["/start.sh"]