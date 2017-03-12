'use strict';

var express = require('express');
var controllers = require('./controllers');

var router = express.Router();

router.route('/').get(controllers.renderIndex);
router.route('/character/:name').get(controllers.renderCharacter);
router.route('/characters').get(controllers.getCharacters);
router.route('/planetresidents').get(controllers.getResidents);

module.exports = router;