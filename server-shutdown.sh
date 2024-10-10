#!/bin/bash

# Exit if command fails
set -e

# Variables
FRONTEND_BUILD_DIR="/var/www/realworth"
BACKEND_PUBLISH_DIR="/var/www/realworth-backend"
SERVICE_NAME="kestrel-realworth"
NGINX_CONFIG_FILE="/etc/nginx/conf.d/realworth.conf"

# Stop the .NET backend service
sudo systemctl stop "$SERVICE_NAME"
sudo systemctl disable "$SERVICE_NAME"
sudo rm "/etc/systemd/system/$SERVICE_NAME.service"

# Stop Nginx
sudo systemctl stop nginx
sudo systemctl disable nginx

# Remove Nginx configuration
sudo rm "$NGINX_CONFIG_FILE"

# Clean up frontend files
sudo rm -rf "$FRONTEND_BUILD_DIR"

# Clean up backend files
sudo rm -rf "$BACKEND_PUBLISH_DIR"

# Reload systemd and Nginx to apply changes
sudo systemctl daemon-reload
sudo systemctl restart nginx

echo "Website hosting has been shut down and files have been cleaned."