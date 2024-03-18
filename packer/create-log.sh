#!/bin/bash

if [ "$(id -u)" != "0" ]; then
    echo "This script must be run with sudo." 1>&2
    exit 1
fi

sudo chmod -R 755 /var

sudo mkdir -p /var/logs
sudo chmod -R 755 /var/logs

cd /var/logs || exit

sudo touch webapp.log
sudo chmod 644 webapp.log
