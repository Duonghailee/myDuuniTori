# get ubuntu
FROM node:10-alpine as build-stage

# set current working dir
WORKDIR /usr/src/app

# # install curl
# RUN apt-get update && apt-get install -y curl

# # install node
# RUN curl -sL https://deb.nodesource.com/setup_14.x | bash 
# RUN apt-get update && apt-get install -y build-essential nodejs

# copy git 
COPY . .

# install all dependenciess
RUN npm install

# build front-end
# CMD ["npm", "run", "frontend"]

RUN npm run frontend

FROM node:10-alpine

COPY --from=build-stage /usr/src/app .

# expose port
EXPOSE 3000
ARG API_DUUNI='weneedapikey'

# build back-end
ENV API_DUUNI=${API_KEY}
CMD ${API_DUUNI} npm run backend

# # run dev env
# CMD ["npm", "run", "watch"]

