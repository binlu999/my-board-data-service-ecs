FROM amazonlinux:latest
RUN yum install -y aws-cli
RUN yum install -y gcc-c++ make
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y nodejs

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]