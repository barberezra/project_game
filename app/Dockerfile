# We are starting from an alpine image with NodeJS
FROM node:current-alpine as app
WORKDIR /code
COPY . .
# add `/app/node_modules/.bin` to $PATH
ENV PATH /code/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts@5.0.1

WORKDIR /code/backend
COPY ./backend .
ENV PATH /code/backend/node_modules/.bin:$PATH
COPY /backend/package.json ./
COPY /backend/package-lock.json ./
RUN npm install

WORKDIR /code
EXPOSE 7555

CMD ["ash", "run_processes.sh"]