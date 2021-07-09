# get ubuntu
FROM node:10

# set current working dir
WORKDIR /usr/src/app

# # install curl
# RUN apt-get update && apt-get install -y curl

# # install node
# RUN curl -sL https://deb.nodesource.com/setup_14.x | bash 
# RUN apt-get update && apt-get install -y build-essential nodejs

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
ARG API_KEY='weneedapikey'

# build back-end
ENV API_DUUNI=${API_KEY}
CMD ["npm", "run", "backend"]

# # run dev env
# CMD ["npm", "run", "watch"]

