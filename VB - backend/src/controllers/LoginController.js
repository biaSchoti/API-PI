const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models')

const LoginController = {
  login: (req, res) => {
      res.render('login')
  },
  perfil: (req, res) => {
    res.render('minha-conta')
  },
  loginEJS: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
    
    if (user && bcrypt.compareSync(req.body.password, user.password)) { // compara a senha recebida no body com a senha gravada no banco de dados
        const token = jwt.sign({ id: user.id, email: user.password }, 'segredo') // gera o token do usuário com JWT
        res.cookie('token', token, { maxAge: 2592000000 }) // expira em 30 dias

        res.redirect('/login/minha-conta')
    } else res.render('login', { errors: [{ msg: "Usuário ou Senha incorretos!" }] })
  } catch (error){
    res.status(400).json({ error })
  }
  }

}
module.exports = LoginController