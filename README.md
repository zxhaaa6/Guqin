# guqin
A guqin learning club

## Setup
```
$ git clone git@github.com:zxhaaa6/guqin.git
$ cd guqin
```
Add .env file into guqin/. Add the following content into the .env file.
```
NODE_ENV=development

MONGODB_ROOT_USER=root
MONGODB_ROOT_PASS=rootpass
MONGODB_DB_NAME=guqin
```
If you are a developer, please contact me to get the config.ts file for your local developing.

Setup the local environment

1. Install Mongodb --version >= 4.0
2. Install Redis --version >= 4.0.10
3. Install Node.js --version >= 8.9.4
```
$ yarn install
$ yarn start
```

Or setup the docker environment

Install Docker --version >= 18

```
$ ./docker/script.sh
$ docker-compose -p kuaizu build
$ docker-compose -p kuaizu up -d
```
For initialize database, run following script:
```
$ npm run initdb
```