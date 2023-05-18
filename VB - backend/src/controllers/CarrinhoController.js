
const products = require('../database/products.json')

const CarrinhoController = {
    carrinho: (req, res) => {
        res.render('carrinho', { })
    },
    removeItem: function(){},
    getItem: function(){},
    addItem: function(req, res){
       res.send('Item Adicionado')
    }, 
 };
 

 
 module.exports = CarrinhoController