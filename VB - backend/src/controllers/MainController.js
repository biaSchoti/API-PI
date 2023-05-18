const { Op } = require('sequelize')
const { Product } = require('../models')
/* const products = require('../database/products.json') */
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

const MainController = {
    index: async (req, res) => {
      try {       
       res.status(200).json(index)

      } catch (error) {
        res.status(400).json({ error })
      }
  },

search: async (req, res) => {
  let search = req.query.keywords

  try {
    const productsToSearch = await Product.findAll({
      where: {
        name: {
          [Op.substring]: search
        }
      }
    })

    res.render('results', {
      products: productsToSearch,
      search,
      toThousand,
    })
  } catch (error) {
    res.status(400).json({ error })
  }
  }, 
  age: (req, res) => {
    if (req.body.age === 'Sim') {
        res.render('index')
    } else res.send('Você não pode acessar o site')
  },
  validacao: (req, res) => {
    res.status(200).json(validacao)
  },
  aboutus: (req, res) => {
    res.render('sobrenos', { })
  },
  contact: (req, res) => {
    res.render('contact', { })
  },
  terms: (req, res) => {
    res.render('terms', { })
  },
  privacy: (req, res) => {
    res.render('privacy', { })
  },
  blog: (req, res) => {
    res.render('blog', { })
  },
}
module.exports = MainController