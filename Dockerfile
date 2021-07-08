# get ubuntu
FROM ubuntu:18.04

# set current working dir
WORKDIR /usr/src/app

# install curl
RUN apt-get update && apt-get install -y curl

# install node
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash 
RUN apt-get update && apt-get install -y build-essential nodejs

# check that we have npm install
RUN npm -v

# copy git 
COPY . .

# install all dependenciess
RUN npm install

# build front-end
# CMD ["npm", "run", "frontend"]
RUN npm run frontend

# expose port
EXPOSE 3000

# build back-end
CMD ["npm", "run", "backend"]

# # run dev env
# CMD ["npm", "run", "watch"]

