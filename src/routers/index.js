const router = require('express').Router()
const auth = require("./auth.routes.js")

router.use(auth)

module.exports = router