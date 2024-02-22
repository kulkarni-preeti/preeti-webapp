sudo chmod -R 755 /opt
sudo cp /tmp/webapp.zip /opt/
cd /opt || exit
sudo unzip webapp.zip -d /opt/webapp
sudo cp /tmp/.env /opt/webapp
cd /opt/webapp
npm install
npm test