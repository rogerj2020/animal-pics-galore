var express = require('express');
var request = require('request').defaults({ encoding: null });
const AnimalType = require('../animalType.js')

var router = express.Router();

function getAnimalImageUrl(animalType){
  let imageFetchUrl = null;
  switch (animalType) {
    case AnimalType.CAT:
      imageFetchUrl = "https://cataas.com/cat";
      break;
    case AnimalType.DOG:
      imageFetchUrl = "https://place.dog/300/200";
      break;
    case AnimalType.BEAR:
      imageFetchUrl = "https://placebear.com/g/400/300";
      break;
  }
  return imageFetchUrl;
}

function downloadImage(url) {
  return new Promise((resolve, reject) => {
      request({url: url, uri: url, encoding: null}, (error, response, body) => {
          if (error) reject(error);
          if (response.statusCode != 200) {
              reject('Invalid status code <' + response.statusCode + '>');
          }
          resolve(body);
      });
  });
}

/* Load all images */
router.get('/', async (req, res, next) => {
  var db = await require('../db/conn.js').getDb();
  let collection = await db.collection("animal_pics_galore");
  let results = await collection.aggregate([
    { "$project": { "_id": 1, "fetchDate": 1, "type": 1, "image": 1 } },
    { "$sort": { "fetchDate": -1 } }
  ]).toArray();
  res.send(results).status(200);
});

// Load the latest image
router.get("/latest", async (req, res) => {
  var db = await require('../db/conn.js').getDb();
  let collection = await db.collection("animal_pics_galore");
  let results = await collection.aggregate([
    { "$project": { "_id": 1, "fetchDate": 1, "type": 1, "image": 1 } },
    { "$sort": { "fetchDate": -1 } },
    { "$limit": 1 }
  ]).toArray();
  res.send(results).status(200);
});

// Fetches images from external sources
router.get("/download", async (req, res) => {
  let results = {images: [], status: {code: 0, message: ""}};
  res.setHeader('Content-Type', 'application/json');
  let animalType = req.query['animalType'];
  let animalTypeName = Object.keys(AnimalType)[Object.values(AnimalType).indexOf(parseInt(animalType))];
  let imageFetchUrl = getAnimalImageUrl(parseInt(animalType));
  
  if(!imageFetchUrl){
    results.status.code = 400;
    results.status.message = `Bad Request - Invalid Animal Type: ${animalType}`;
    res.send(JSON.stringify(results)).status(400);
    return;
  }

  
  let imageCount = req.query['picCount'];

  try{
    for(var i=0; i < imageCount; i++){
      const data = await downloadImage(imageFetchUrl);
      const base64Data = Buffer.from(data, 'binary').toString('base64');
      var db = await require('../db/conn.js').getDb();
      let collection = await db.collection("animal_pics_galore");
      let newImageDocument = {
        "fetchDate": new Date(),
        "type": "Cat",
        "image": base64Data
      }
      results.images.push(newImageDocument);
      await collection.insertOne(newImageDocument);
    }
    results.status.message = "Success";
    res.send(JSON.stringify(results)).status(200);
  } catch (e) {
    console.error('ERROR:');
    console.error(e);
    results.status.code = 500;
    results.status.message = `Internal Server Error: ${e}`;
    res.send(JSON.stringify(results)).status(500);
  }
});

module.exports = router;
