#!/bin/sh

basedir=$(dirname "$0")

cd $basedir

java -jar "${basedir}/webswing-server.war" -j "${basedir}/jetty.properties"
