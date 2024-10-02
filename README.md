# Animal Pics Galore!
Animal Pics Galore! is a convenient tool for storing and retrieving pictures of cats, dogs, or bears. Now you can download, store, and organize your animal pics in one place!

## Get the code!

Clone this repo:
```
git clone https://github.com/rogerj2020/animal-pics-galore.git
```

Change into the project root directory:
```
cd animal-pics-galore
```

## Installation

There are 2 options for running the Animal Pics Galore app:

1. Local Installation - Install in local Node.js environment.
2. Docker Container - Use docker compose, to build (and run) in a container.

### Local Installation

Install Dependencies:
```
npm install
```


### Docker Container

Build and start Docker Container:
```
docker-compose up -d
```

## Start the Server

If running locally, start the server first:
```
npm run start
```
*(The server is started automatically when running in Docker)*

Once the server is running (locally or in Docker), access the Web UI at:
```
http://localhost:3000/
```

## Usage

The Animal Pics Galore! app can be accessed via a built-in web UI or REST API.

### Fetching Pics using the Web UI:
1. Choose Animal Type.
2. Enter the number of pics to fetch.
3. Click `Fetch Pics!`

*(Currently, UI results are returned as JSON responses.)*

### Fetching Pics using the REST API:
1. Send a GET Request to the `/images` endpoint to retrieve all cached pics.
2. Send a GET Request to the `/images/latest` endpoint to retrieve the latest cached pic.
3. Send a GET Request to the `/images/download` endpoint with the following URL query parameters, to fetch more pics:
    * **animalType:** A numeric code indicating the type of animal to fetch pics for.
        - 0: Cat
        - 1: Dog
        - 2: Bear
    * **picCount**: The number of pics to fetch.

    Example:
    ```
    http://localhost:3000/images/download?animalType=0&picCount=2
    ```


## Author & License

Animal Pics Galore! was made by [Roger Jefferies](https://rogerj-cv-site.vercel.app/).

## Features

-  Fetch and review all of your warm and fuzzy animal pics!
-  Built with Node.js, Express, MongoDB, and Pug
-  Fully Containerized Solution
-  Web UI and REST API available
-  Compatible with all modern browsers

## Credits
- [Node.js](https://nodejs.org/)
- [Mongo DB](https://www.mongodb.com/)
- [Express](https://github.com/expressjs/express)
- [Pug](https://pugjs.org)
