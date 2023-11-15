
# We are starting from an alpine image with NodeJS
FROM node:current-alpine as app
WORKDIR /code
COPY . .
# add `/app/node_modules/.bin` to $PATH
ENV PATH /code/node_modules/.bin:$PATH
# install app dependencies
COPY /app/package.json ./

RUN npm install
RUN npm install react-scripts@5.0.1

# start app
CMD ["npm", "start"]

FROM node:current-alpine as backend
WORKDIR /code/backend
COPY /backend/package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]