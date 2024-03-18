#!/bin/bash

cd /var || exit
sudo mkdir -p logs
cd logs || exit
touch webapp.log