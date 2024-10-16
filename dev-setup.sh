#!/bin/bash

# Update and upgrade the system
sudo dnf update -y
sudo dnf upgrade -y

# Install essential development tools
sudo dnf git -y

# Install Node.js and npm
sudo dnf install nodejs -y

# Install .NET SDK
sudo dnf install dotnet-sdk-8.0 -y

# set environment variables from .secrets file
source .secrets
export DB_HOST=$DB_HOST
export DB_USER=$DB_USER
export DB_PASS=$DB_PASS
export DB_NAME=$DB_NAME
export DOMAIN_OR_IP=$DOMAIN_OR_IP

# go to backend folder
cd backend

# Restore NuGet packages
dotnet restore

# Build the project
dotnet build

# run the project
dotnet run