const router = require('express').Router()
const { Player } = require('../models')

router.get('/players', async(req,res) => {
  try {
    const players = await Player.findAll()

    res.status(200).json(players)
  } catch (error) {
    res.status(500).json({ message: "internal server error", error })
  }
})

router.post('/players', async(req,res) => {
  try {
    const { name, rank, nationality, imageUrl } = req.body
    const newPlayer = await Player.create({ name, rank, nationality, imageUrl })

    res.status(201).json({ message: 'ok', newPlayer })
  } catch (error) {
    if(error.name == 'SequelizeValidationError') {
      res.status(400).json({ errors: error.errors.map(er => er.message )})
    } else {
      res.status(500).json({ message: "internal server error", error })
    }
  }
})

router.delete('/players/:id', async(req,res) => {
  try {
    const { id } = req.params
    const affectedRows = await Player.destroy({
      where: { id }
    })

    if(!affectedRows) throw { name: 'notFound' }

    res.status(200).json({ message: `data with id ${id} successfully deleted` })
  } catch (error) {
    if(error.name == 'notFound') {
      res.status(404).json({ message: "data not found" })
    } else {
      res.status(500).json({ message: "internal server error", error })
    }
  }
})

module.exports = router