
const express = require('express')

const router = express.Router()

const RentalModel = require('../models/rental')


router.post('/', async function (req, res) {
    console.log(req.body, ' body of the request')
    try {
        const createdRental = await RentalModel.create(req.body)
        res.status(201).json(createdRental)

    } catch(err) {
        console.log(err)
        res.status(500).json({err: err.message})
    }
    
})


module.exports = router