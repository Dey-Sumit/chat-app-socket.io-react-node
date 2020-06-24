const express = require('express');
const router = express.Router()

// accept get request
router.get('/', (req, res) => {
    console.log("got an get req");
    res.send("server is up and running")
})

module.exports = router;