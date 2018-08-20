# Movies n Series

Node.js, Express, Mongo, React

## Overview

a CRUD app with Express backend and React frontend of Movies n Series

## Notes

- Provides `mongodb` support

- Uses `morgan` as a HTTP request logger and `winston` as a logger for everything else

- Loads environment variables from `.env` file

## Quick Start

1. Install dependencies

  ```
  npm i
  ```

2. Run the server

  - Run the server & the client

  ```
  npm start
  ```

  - Run the dev server (uses nodemon):

  ```
  npm run devserver
  ```

  - Run the create-react-app server

  ```
  npm run client
  ```

  - Run the api server

  ```
  npm run server
  ```

  - Browse at http://localhost:3000

  - NOTE: to change default proxy value (http://localhost:3030) modify `client/package.json`

3. Run scripts

  ```
  # Run build
  npm run build
  # Run tests
  npm test
  ```

## API Endpoints

  NOTE: Use GET method to retrieve data

  NOTE: Add `Accept: application/json` header

  - Call `/api/index` to retrieve a greeting
  
    For example, `/api/index`
