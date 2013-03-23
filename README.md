Linory
======

Draw sketches and share them with your friends. Hosted at http://linory.com/.


Installation
============

1. git clone git@github.com:morria/linory.git /var/www/linory
2. yum install php54 php-amazon-sdk2 php54-gd
3. cp conf/linory.conf /etc/httpd/conf.d/linory.conf
4. Add your AWS credentails to /usr/share/pear/AWSSDKforPHP/config.inc.php
5. Add "include_path = '.:/usr/share/pear/AWSSDKforPHP'" to /etc/php.ini
6. sudo /etc/init.d/httpd restart
