var express = require("express"),
  router = express.Router(),
  verifyToken = require('../../middleware/authJWT');
const { config } = require("./config");
const { getData, createData, updateData, deleteData, getOneData } = require("./controller");

router.get(config.urls.get, verifyToken, getData);

router.post(config.urls.create, verifyToken, createData);

router.get(config.urls.getOne, verifyToken, getOneData);

router.post(config.urls.update, verifyToken, updateData);

router.post(config.urls.delete, verifyToken, deleteData);

module.exports = router;