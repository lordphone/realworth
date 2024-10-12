#!/bin/bash

# Exit if any command fails
set -e

# Source the .secrets file to import variables
source ./.secrets

# Check if required variables are set
if [ -z "$DB_HOST" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASS" ] || [ -z "$DB_NAME" ]; then
    echo "Error: One or more required environment variables are not set."
    exit 1
fi

# Connect to the MySQL database
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME"