#!/bin/bash

cd /var || exit
mkdir -p logs
cd logs || exit
touch webapp.log