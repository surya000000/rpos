#!/bin/sh

basedir=$(dirname "$0")

cd $basedir

java -jar "${basedir}/webswing-admin-server.war" -admin -j "${basedir}/jetty.properties"