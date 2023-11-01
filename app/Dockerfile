# We are starting from an alpine image with Python 3 installed
FROM node:alpine as app
WORKDIR /code
COPY ./app .
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g
COPY . .
# start app
CMD ["npm", "start"]