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

# go to backend folder
cd backend

# Restore NuGet packages
dotnet restore

# Build the project
dotnet build

# run the project
dotnet run