const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const { User } = require('../models')

const formularioController = {

cadastro: (req, res) => {
    res.render('formulario', { })
  },
  createEJS: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        res.render('formulario', { errors: errors.mapped() }) 

    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })

      if (!user) {
          let newUser = {
            ...req.body
          }


          const hash = bcrypt.hashSync(newUser.password, 10) 
          newUser.password = hash 

          await User.create(newUser) 

          res.redirect('/home')
      } else res.render('formulario', { errors: [{ msg: "Usuário já cadastrado!" }] })
    } catch (error) {
      res.status(400).json({ error })
    }
  }
}
module.exports = formularioController