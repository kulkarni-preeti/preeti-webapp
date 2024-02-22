#!/bin/bash

curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo dnf install nodejs -y

sudo dnf install httpd -y
sudo dnf install -y unzip 
