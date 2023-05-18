module.exports = (sequelize, DataType) => {

  const Product = sequelize.define('Product', {  
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true

    },
    name: DataType.STRING(100),
    price: DataType.DECIMAL(10, 2),
    description: DataType.STRING(1000),
    image: DataType.STRING(500),
    id_type: DataType.INTEGER
  }, {
    timestamps: false,
    tableName: 'product'
  });
  Product.associate = (models) => {
    Product.belongsTo(models.TypeBeer, { foreignKey: 'id_type', as: 'typeBeer' })
    Product.belongsToMany(models.ShoppingCart, { foreignKey: 'id_cart', as: 'order', through: models.OrderItem})
  };
  return Product
}

  