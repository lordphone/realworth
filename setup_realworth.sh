#!/bin/bash

# Exit if command fails
set -e

# Check if DOMAIN_OR_IP is set
if [ -z "$DOMAIN_OR_IP" ]; then
    echo "DOMAIN_OR_IP is not set"
    exit 1
fi

# Variables
ANGULAR_PROJECT_DIR="/home/ec2-user/realworth/frontend"
DOTNET_PROJECT_DIR="/home/ec2-user/realworth/backend"
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
    server_name $DOMAIN_OR_IP;

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

[Install]
WantedBy=multi-user.target
EOT

# reload systemd and start service
sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE_NAME"
sudo systemctl start "$SERVICE_NAME"

# remember to update firewall setting in ec2 instance

echo "Deployment completed successfully"