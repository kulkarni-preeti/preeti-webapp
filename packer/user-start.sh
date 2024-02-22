#!/bin/bash
sudo systemctl daemon-reload
sudo systemctl enable httpd
sudo systemctl start httpd
sudo systemctl enable csye6225
sudo systemctl start csye6225
sudo systemctl status csye6225