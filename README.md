## This is a small web app query API job search from [https://duunitori.fi](https://duunitori.fi)

## Demo app here
[Let's start hunting jobs](https://polar-beach-12473.herokuapp.com/)

## How to start
- First you need install project's dependencies
`npm install`

- To build front end
`npm run build`

- Back end built
 In order to query from API, you will need an API_DUUNI environment variable  
`[API_DUUNI] npm run start`

## Front end side
- React
- ES6
- Babel
- SASS

## Back end
- Nodejs
- Express Library server

## Containerize with docker 
- See the Dockerfile as shown in the same level directory
- then build the docker image from Dockerfile:
`docker build . -t duunitori-app`
- In order to get API working in the backend server, API_DUUNI env variable is needed and for security reason I only put the key in heroku deployment.
- run the app and map to localhost:3000
`docker run -p 3000:3000 duunitori-app`
- You should see the app at your localhost:3000
