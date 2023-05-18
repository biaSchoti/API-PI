module.exports = (sequelize, DataType) => {
    const User = sequelize.define('User', {  
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dt_nasc: DataType.DATE,
        name: DataType.STRING(250),
        email: DataType.STRING(250),
        password: DataType.STRING(100),
    }, {
        timestamps: false,
        tableName: 'user'
    });
    User.associate = (models) => {
        User.hasOne(models.Account, { foreignKey: 'id_user', as: 'user' })
      };

    return User
}