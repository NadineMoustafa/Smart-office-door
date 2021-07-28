FROM node:10-alpine

COPY  . ./app
WORKDIR /app
RUN npm install
RUN unset HOST
EXPOSE 3000
CMD [ "npm","start" ]
