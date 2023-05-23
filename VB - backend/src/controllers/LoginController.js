const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models')

const LoginController = {
  loginEJS: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
    
    if (user && bcrypt.compareSync(req.body.password, user.password)) { 
        const token = jwt.sign({ id: user.id, email: user.password }, 'segredo') 
    
        res.status(200).json({ token })

    } else res.status(400).json({ errors: "Usuário ou Senha incorretos!" })
  } catch (error){
    res.status(400).json({ error })
  }
  }

}
module.exports = LoginController