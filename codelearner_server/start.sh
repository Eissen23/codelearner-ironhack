#!/bin/sh

# Set PHP-FPM path
PHP_FPM=/usr/sbin/php-fpm

# Create log directory
mkdir -p /tmp/logs

# Test PHP-FPM configuration
$PHP_FPM -t >> /tmp/logs/php-fpm-test.log 2>&1

# Log running processes
ps aux | grep php-fpm >> /tmp/logs/process.log 2>&1

# Start PHP-FPM and Nginx
$PHP_FPM --nodaemonize &
sleep 5 # Give PHP-FPM more time to start

# Verify PHP-FPM is running
if ! ps aux | grep -v grep | grep php-fpm > /dev/null; then
    echo "PHP-FPM failed to start" >&2
    exit 1
fi

# Start Nginx in foreground
nginx -g 'daemon off;'