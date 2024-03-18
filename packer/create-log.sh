#!/bin/bash

cd /var || exit
sudo -l
sudo mkdir -p logs
cd logs || exit
touch webapp.log