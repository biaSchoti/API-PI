const { validationResult } = require('express-validator')
const { Product, TypeBeer } = require('../models')
const { Op } = require('sequelize')

const ProductController = {
   productView: async (req, res) => {
    let search = ''

    if (req.query.keywords)
    search = req.query.keywords
	
    try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.substring]: search
        }
      }
    })

    res.status(200).json(products)

	} catch (error){
    res.status(400).json({ error })
  }
},

	detailEJS: async (req, res) => {
		let id = req.params.id
		try { 
      const product = await Product.findOne({
        where: {
          id: id
        },
        include: {
          model: TypeBeer,
          as: 'typeBeer',
          require: true
        }
      })

		res.status(200).json(product)
	} catch (error){
    res.status(400).json({ error })
  }
},
  createEJS: async (req, res) => {
    let image = ''

    const errors = validationResult(req)
    if (!errors.isEmpty())
        res.status(400).json({ error: errors.mapped() })

    try {
      if (req.files && req.files[0]) {
        image = req.files[0].filename
      } else {
        image = 'default-image.png'
      }
      
      let newProduct = {

        ...req.body,
        image: image,
    
      }

      console.log(req.body)

      await Product.create(newProduct)

      res.status(201).json({ msg: 'Produto Criado com Sucesso' })

    } catch (error) {
      res.status(400).json({ error: "Algo está errado, verifique os dados" })
    } 
  },
  // Update product
  updateEJS: async (req, res) => {
    const { id } = req.params
    let image = ''
    
    try {
      const productToEdit = await Product.findByPk(id)
    
      if (productToEdit != undefined) {
          if (req.files && req.files[0]) {
              image = req.files[0].filename
          } else {
              image = productToEdit.image
          }

          let product = {
            ...req.body,
            image: image
          }

          await Product.update(
            product,
            {
              where: {
                id: id
              }
            }
          ) // atualiza o registro no banco de dados

          res.status(201).json({ msg: 'Produto alterado com Sucesso' })
      } else return res.status(400).json({ error: 'Produto não encontrado.' })

    } catch (error) {
      res.status(400).json({ error })
    }
  },
  // Delete product
  deleteEJS: async (req, res) => {
    const { id } = req.params

    try {
      await Product.destroy({
        where: {
          id: id
        }
      }) // remove o registro do banco de dados

      res.status(201).json({ msg: 'Produto deletado com Sucesso' })
    } catch (error) {
      res.status(400).json({ error })
    }
  },
}

module.exports = ProductController