module.exports = (sequelize, DataType) => {
    const Account = sequelize.define('Account', {  
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: DataType.INTEGER,
        tel: DataType.STRING(11),
        Cpf: DataType.STRING (11),
        cep: DataType.STRING(8),
        end: DataType.STRING(500),
        num: DataType.INTEGER,
        comp: DataType.STRING(100),
        cidade: DataType.STRING(100),
        foto_perfil: DataType.STRING(500),
    }, {
        timestamps: false,
        tableName: 'account'
    });
    Account.associate = (models) => {
        Account.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' })
        Account.hasMany(models.ShoppingCart, { foreignKey: 'id_account', as: 'ShoppingCart'})
      };

    return Account
}