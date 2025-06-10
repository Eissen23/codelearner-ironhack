#!/bin/sh
# Test PHP-FPM configuration
php-fpm -t >> /tmp/php-fpm-test.log 2>&1
# Check if port 9000 is listening
netstat -tulnp 2>/tmp/netstat-error.log | grep 9000 >> /tmp/netstat.log 2>&1
# Log running processes
ps aux | grep php-fpm >> /tmp/process.log 2>&1
# Start PHP-FPM and Nginx
php-fpm -F &
sleep 2 # Ensure PHP-FPM starts before Nginx
nginx -g 'daemon off;'