#!/bin/bash

sudo chmod -R 755 /var
sudo mkdir -p /var/logs
sudo chmod -R 755 /var/logs

cd /var/logs || exit

sudo touch webapp.log
sudo chmod 644 webapp.log
