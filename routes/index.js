const router = require('express').Router()
const { Player, User } = require('../models')
const bcrypt = require('bcryptjs')
const { encode, decode } = require('../helpers/jwt')

router.post('/register', async(req,res) => {
  try {
    const { email, password } = req.body
    const newUser = await User.create({ email, password })

    res.status(201).json({ message: `${newUser.email} register successfully` })
  } catch (error) {
    res.status(500).json({ message: "internal server error", error })
  }
})

router.post('/login', async(req,res) => {
  try {
    const { email, password } = req.body
    if(!email || !password) {
      throw { name: "invalid_login" }
    }

    const user = await User.findOne({ where: { email }})
    if(!user) {
      throw { name: "invalid_login" }
    }

    if(!bcrypt.compareSync(password, user.password)) {
      throw { name: "invalid_login" }
    }

    const access_token = encode({ id: user.id })
    res.status(200).json({ access_token })
  } catch (error) {
    console.log(error)
    if(error.name == 'invalid_login') {
      res.status(401).json({ message: "invalid email/password" })
    } else {
      res.status(500).json({ message: "internal server error", error})
    }
  }
})

router.use(async (req,res,next) => {
  try {
    const access_token = req.headers.access_token
    if(!access_token) throw { name: "invalid_token" }

    const payload = decode(access_token)
    const user = await User.findByPk(payload.id)
    if(!user) throw { name: "invalid_token" }

    req.currentUser = { id: user.id }
    next()
  } catch (error) {
    if(error.name == 'invalid_token') {
      res.status(401).json({ message: "invalid token unathorized", error })
    } else {
      res.status(500).json({ message: "internal server error", error})
    }
  }
})

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