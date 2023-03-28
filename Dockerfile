# Uses latest version of ubuntu
FROM ubuntu:latest

# SET env variable SOURCE_DIR
ENV SOURCE_DIR $HOME/floreantpos

# Creates working directory floreantpos
WORKDIR $SOURCE_DIR

# Copy floreantpos to work directory
COPY ./floreantpos $SOURCE_DIR

RUN apt-get update

# Install open jdk 11
RUN apt-get install openjdk-11-jdk wget -y

# SET JAVA_HOME since webswing needs this
ENV JAVA_HOME="/usr/lib/jvm/java-1.11.0-openjdk-amd64"

# Install maven 3.6.0
RUN wget https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.6.0/apache-maven-3.6.0-bin.tar.gz
RUN tar xf apache-maven-3.6.0-bin.tar.gz
ENV PATH="${PATH}:${SOURCE_DIR}/apache-maven-3.6.0/bin"

# package app with maven as pom.xml
RUN mvn package -X -Dmaven.buildNumber.skip -f "$SOURCE_DIR/pom.xml"

# Checks logo and insert Needs to replace as per restaurant
# RUN if [ -z $CUSTOM_LOGO ]; then cp $CUSTOM_LOGO $SOURCE_DIR/config/logo.png; fi

# For webswing dependencies https://www.webswing.org/docs/21.1/start/install.html
RUN apt-get install xvfb libxext6 libxi6 libxrender1 libxtst6 libpangoft2-1.0-0 unzip -y

# unzip and force to replace jar file if present
RUN unzip -o ./target/floreantpos-*.zip -d ./target

# EXPOSE 8080

# RUN $SOURCE_DIR/webswing/webswing.sh run
