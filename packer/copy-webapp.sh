#!/bin/bash

sudo setenforce 0
sudo chmod -R 755 /opt
sudo cp /tmp/webapp.zip /opt/
cd /opt || exit
sudo unzip webapp.zip -d /opt/webapp
sudo cp /tmp/.env /opt/webapp
cd /opt/webapp
sudo npm install
sudo npm test