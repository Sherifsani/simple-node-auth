const express = require('express')
const {getAllUsers, getUserById} = require('../controllers/users-controller')

const router = express.Router()

router.get("/get", getAllUsers)

module.exports = router