# get ubuntu
FROM ubuntu:18.04

# set current working dir
WORKDIR /usr/src/app

# update apt-get curl
RUN apt-get update

# install curl
RUN apt-get install -y curl

# install node
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash 
RUN  apt install -y nodejs

# copy git 
COPY . .

# install all dependencies
RUN npm cache clean --force && npm install

# build front-end
RUN npm run build

# env
ENV API_DUUNI=23sfs

# expose port
EXPOSE 3000

# build back-end
CMD ["npm", "run", "start"]

