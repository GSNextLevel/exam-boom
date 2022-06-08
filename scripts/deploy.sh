#!/usr/bin/env bash

echo "> Build 파일 복사"
echo "> sudo cp -rf /home/ec2-user/deploy/build/* /usr/share/nginx/html/ "
sudo cp -rf /home/ec2-user/deploy/build/* /usr/share/nginx/html/

echo "Nginx 재기동"
echo "> sudo service nginx restart"
sudo service nginx restart