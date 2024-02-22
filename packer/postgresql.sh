#!/bin/bash
sudo yum update -y
sudo dnf install -y postgresql-server
sudo postgresql-setup initdb
sudo systemctl enable postgresql
sudo systemctl start postgresql
sudo -u postgres psql -c "CREATE USER preetikulk WITH PASSWORD 'password';"
sudo -u postgres psql -c "CREATE DATABASE cloudusers;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE cloudusers to preetikulk;"
sudo sed -i "s/ident/md5/g" /var/lib/pgsql/data/pg_hba.conf
sudo systemctl restart postgresql