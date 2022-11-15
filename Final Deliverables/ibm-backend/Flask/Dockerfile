FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y build-essential \
    wget \
    python3 \
    python3-pip \
    make \
    gcc \
    libc6-dev

WORKDIR /usr/src/app

RUN pip install redis
RUN pip install resume-parser
RUN pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-2.3.1/en_core_web_sm-2.3.1.tar.gz
RUN pip install importlib-metadata==3.2.0

RUN python3 -m nltk.downloader stopwords
RUN python3 -m nltk.downloader punkt
RUN python3 -m nltk.downloader averaged_perceptron_tagger
RUN python3 -m nltk.downloader universal_tagset
RUN python3 -m nltk.downloader wordnet
RUN python3 -m nltk.downloader brown
RUN python3 -m nltk.downloader maxent_ne_chunker

COPY . .

ENV DEBIAN_FRONTEND noninteractive
RUN  apt-get install -y openjdk-8-jdk

ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64


CMD [ "python3", "./script.py" ]