FROM node:10-alpine


COPY  . ./app
WORKDIR /app
RUN npm install

EXPOSE 3333
CMD [ "npm", "start" ]