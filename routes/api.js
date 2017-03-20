const express = require('express');
const router = express.Router();

router.get('/ninjas', (req, res) => {
  res.send({'type' : 'GET'});
})

router.post('/ninjas', (req, res) => {
  var item = req.body;
  console.log(item);
  res.send({
    type : 'POST',
    name : item.name,
    rank : item.rank
  });
})

module.exports = router;
