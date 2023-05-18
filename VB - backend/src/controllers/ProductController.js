const { validationResult } = require('express-validator')
/* const products = require('../database/products.json') */
const { Product, TypeBeer } = require('../models')
/* const menos = document.getElementById("minus");
const mais = document.getElementById("plus");
const quantidadeInput = document.getElementById("quant"); */

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

const ProductController = {
   productView: async (req, res) => {
	try {

    const products = await Product.findAll()
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
  createproduct: (req, res) => {
    res.render('product-create-form')
  },

  createEJS: async (req, res) => {
    let image = ''

    const errors = validationResult(req)
    if (!errors.isEmpty())
        res.status(400).json({ error: errors.mapped() })

    try {
      if (req.files[0] !== undefined) {
        image = req.files[0].filename
      } else {
        image = 'default-image.png'
      }
      
      let newProduct = {

        ...req.body,
        image: image,
    
      }
      console.log(req.body)

      await Product.create(newProduct) // cria o registro no banco de dados

      res.status(201).json({ msg: 'Produto Criado com Sucesso' })
    } catch (error) {
      res.status(400).json({ error })
    } 
  },
  // Update product
  updateEJS: async (req, res) => {
    const { id } = req.params
    let image = ''
    
    try {
      const productToEdit = await Product.findByPk(id)
    
      if (productToEdit != undefined) {
          if (req.files[0] !== undefined) {
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