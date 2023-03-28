# Floreant POS

Complete Restaurant POS Management System
Clone of updated and some bug fix version of https://github.com/PatGoup/FloreantPOS

Runs on apache derby database from docker. Need to install database as requirement.


### Requirements
Requirement define as tested in these installed machine. Might work on version downgrade or upgrade of some packages.

- openjdk-11-jdk
- maven 3.6.0
- docker 20.10.14+
- Running in a web required webswing version 1.4

# Project Setup Instruction

### Running in self machine

Install openjdk-11-jdk
- `apt-get install openjdk-11-jdk wget -y`

Set JAVA_HOME variable
- `JAVA_HOME="/usr/lib/jvm/java-1.11.0-openjdk-amd64"`

Install maven 3.6.0
- `wget https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.6.0/apache-maven-3.6.0-bin.tar.gz`
-  `tar xf apache-maven-3.6.0-bin.tar.gz`
- `PATH="${PATH}:${MAVEN_DIR}/apache-maven-3.6.0/bin"` (MAVEN_DIR refers to maven unzip directory)

Package
- `mvn package -X -Dmaven.buildNumber.skip -f "/pom.xml"`

Webswing config
- [Webswing Config](github.com/surya000000/rpos/blob/master/floreantpos/webswing/webswing.config#L27)

### Running Dockerfile
- `docker build . -t pos_system`
- `docker run -p 8080:8080 pos_system`


Copyright (c) 2021-present
