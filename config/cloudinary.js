const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "deavhufn6",
  api_key: "933924185845239",
  api_secret: "k8utWkNqeD-zWqlxAncMllUmCIY",
});

module.exports = cloudinary;