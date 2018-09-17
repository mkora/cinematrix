# Movies n Series

Node.js, Express, Mongo, React

## Overview

a CRUD app with Express backend and React frontend of Movies n Series

## Notes

- Provides `mongodb` support

- Uses `morgan` as a HTTP request logger and `winston` as a logger for everything else

- Loads environment variables from `.env` file

- Fixture's data provided by [imdb](https://www.imdb.com)

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

  NOTE: Add `Accept: application/json` header
  
#### Movies

  ```
  GET /api/movies
  
  GET /api/movies/:id
  
  POST /api/movies/add
    BODY
      {
        "title": "movie name",
        "country": "country name",
        "year": "1999",
        "alsoknown": "other name",
        "imdb": "5.1",
        "duration": "190",
        "episodes": "1",
        "synopsis": "synopsis",
        "source": "http://imdb.com/url-something-here"
    }

  PUT /api/movies/:id/edit
    BODY
      {
        "title": "new movie name"
      }

  DELETE /api/movies/:id/remove
  ```

#### People

  ```
  GET /api/person

  GET /api/person/:id

  POST /api/person/add
    params

  PUT /api/person/:id/edit
    params

  DELETE /api/person/:id/remove
  ```

#### Cast

  ```
  POST /api/cast/:personId/add/:movieId

  DELETE /api/cast/:personId/remove/:movieId
  ```

#### Directors

  ```
  POST /api/directed/:personId/add/:movieId

  DELETE /api/directed/:personId/remove/:movieId
```

