#!/bin/bash

sudo chmod -R 755 /var
cd /var || exit
sudo -l
sudo mkdir -p logs
cd logs || exit
touch webapp.log