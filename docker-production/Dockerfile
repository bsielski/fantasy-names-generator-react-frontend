FROM node:9.11.1-alpine
WORKDIR /home/node
COPY package.json /home/node
RUN ["npm", "install"]
COPY public/ /home/node/public/
COPY src/ /home/node/src/
CMD ["npm", "run", "build"]
