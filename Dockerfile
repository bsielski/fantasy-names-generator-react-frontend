FROM node:9.5.0
COPY package.json /usr/src/app/
WORKDIR /usr/src/app
RUN yarn
CMD ["yarn", "start"]
