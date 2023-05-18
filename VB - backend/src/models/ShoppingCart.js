module.exports = (sequelize, DataType) => {

    const ShoppingCart = sequelize.define('ShoppingCart', {  
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
  
      },
      id_account: DataType.INTEGER,
      status: DataType.INTEGER,
      total_price: DataType.DECIMAL(10, 2),
      delivery:  DataType.DATE
    }, {
      timestamps: false,
      tableName: 'shopping_cart'
    });
    ShoppingCart.associate = (models) => {
      ShoppingCart.belongsTo(models.Account, { foreignKey: 'id_account', as: 'account' })
      ShoppingCart.belongsToMany(models.Product, { foreignKey: 'id_product', as: 'orderItem', through: models.OrderItem})
    };
    return ShoppingCart
  }