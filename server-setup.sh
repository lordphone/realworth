#!/bin/bash

# Exit if command fails
set -e

# set environment variables from .secrets file
source .secrets
export DB_HOST=$DB_HOST
export DB_USER=$DB_USER
export DB_PASS=$DB_PASS
export DB_NAME=$DB_NAME
export DOMAIN_OR_IP=$DOMAIN_OR_IP

# Check if DOMAIN_OR_IP is set
if [ -z "$DOMAIN_OR_IP" ]; then
    echo "DOMAIN_OR_IP is not set"
    exit 1
fi

# Variables
ANGULAR_PROJECT_DIR="./frontend"
DOTNET_PROJECT_DIR="../backend"
FRONTEND_BUILD_DIR="/var/www/realworth"
BACKEND_PUBLISH_DIR="/var/www/realworth-backend"
DOTNET_APP_DLL="realworth.dll"
SERVICE_NAME="kestrel-realworth"

# update system packages
sudo dnf update -y

# install .NET
sudo dnf install dotnet-sdk-8.0 -y

# install Node.js
sudo dnf install -y nodejs

# install Nginx
sudo dnf install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# build angular frontend
cd "$ANGULAR_PROJECT_DIR"
npm install
sudo rm -rf dist
ng build --configuration production

# deploy angular frontend
sudo rm -rf "$FRONTEND_BUILD_DIR"
sudo mkdir -p "$FRONTEND_BUILD_DIR"
sudo cp -r dist/* "$FRONTEND_BUILD_DIR"
sudo chown -R nginx:nginx "$FRONTEND_BUILD_DIR"
sudo chmod -R 755 "$FRONTEND_BUILD_DIR"

# publish dotnet backend
cd "$DOTNET_PROJECT_DIR"
dotnet restore
rm -rf Migrations
dotnet ef migrations add InitialCreate
# dotnet ef database update
sudo rm -rf "$BACKEND_PUBLISH_DIR"
sudo mkdir -p "$BACKEND_PUBLISH_DIR"
sudo dotnet publish -c Release -o "$BACKEND_PUBLISH_DIR"
sudo chown -R nginx:nginx "$BACKEND_PUBLISH_DIR"
sudo chmod -R 755 "$BACKEND_PUBLISH_DIR"

# configure nginx
NGINX_CONFIG_FILE="/etc/nginx/conf.d/realworth.conf"
sudo tee "$NGINX_CONFIG_FILE" > /dev/null <<EOT
server {
    listen 80;
    server_name real-worth.org www.real-worth.org;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name real-worth.org www.real-worth.org;

    # SSL Certificate Files
    ssl_certificate /etc/letsencrypt/live/real-worth.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/real-worth.org/privkey.pem;

     # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload" always;
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;

    # serve angular frontend
    location / {
        root $FRONTEND_BUILD_DIR;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html =404;
    }

    # proxy requests to .NET backend
    location /api {
        proxy_pass         http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
    }
}
EOT

# test and reload nginx
sudo nginx -t
sudo systemctl reload nginx

# create systemd service
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME.service"
sudo tee "$SERVICE_FILE" > /dev/null <<EOT
[Unit]
Description=Realworth .NET Web App

[Service]
WorkingDirectory=$BACKEND_PUBLISH_DIR
ExecStart=/usr/bin/dotnet $BACKEND_PUBLISH_DIR/$DOTNET_APP_DLL
Restart=always
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=dotnet-realworth
User=ec2-user
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DB_HOST=$DB_HOST
Environment=DB_USER=$DB_USER
Environment=DB_PASS=$DB_PASS
Environment=DB_NAME=$DB_NAME

[Install]
WantedBy=multi-user.target
EOT

# reload systemd and start service
sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE_NAME"
sudo systemctl start "$SERVICE_NAME"

# remember to update firewall setting in ec2 instance

echo "Deployment completed successfully"