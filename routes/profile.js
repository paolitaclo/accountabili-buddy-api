
const express = require('express');

const router = express.Router();

router.route('/profile')
  .get(require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => res.send({ user: req.user })
  );

module.exports = router;
