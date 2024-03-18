#!/bin/bash
sudo groupadd -f csye6225
sudo useradd -m -g csye6225 -s /usr/sbin/nologin csye6225
sudo chown -R csye6225:csye6225 /opt
sudo chown -R csye6225:csye6225 /var/log
sudo cp /tmp/csye6225.service /lib/systemd/system/csye6225.service
