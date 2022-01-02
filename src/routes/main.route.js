const express = require("express");
const { RootController } = require("../controllers/main.controller");
const router = express.Router();

router.get('/', RootController);

module.exports = router;