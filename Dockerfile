FROM node:8.11.3-alpine

WORKDIR /app
COPY ["package.json", "yarn.lock", "/app/"]
RUN yarn install

ADD . /app
RUN yarn build

EXPOSE 3000
CMD ["node", "dist/main.js"]