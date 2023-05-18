module.exports = (sequelize, DataType) => {

    const TypeBeer = sequelize.define('TypeBeer', {  
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
  
      },
      name: DataType.STRING(100),

    }, {
      timestamps: false,
      tableName: 'type_beer'
    });
    TypeBeer.associate = (models) => {
      TypeBeer.hasMany(models.Product, { foreignKey: 'id_type', as: 'product' })
    };
    return TypeBeer
  }