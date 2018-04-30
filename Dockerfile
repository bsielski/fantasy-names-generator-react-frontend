FROM node:9.5.0
RUN ["mkdir", "-p", "/usr/src/app"]
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN ["npm", "install"]
CMD ["npm", "start"]