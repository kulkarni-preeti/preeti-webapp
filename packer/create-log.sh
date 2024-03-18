#!/bin/bash

sudo chmod -R 777 /var
cd /var || exit
sudo -l
sudo mkdir -p logs
cd logs || exit
touch webapp.log