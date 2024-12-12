const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('godashop_backup', 'root', '123', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql', // hoặc 'postgres', 'sqlite', 'mssql'
  define: {
    timestamps: false, // Tắt `timestamps` mặc định cho tất cả các mô hình
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối cơ sở dữ liệu thành công!');
  } catch (error) {
    console.error('Không thể kết nối cơ sở dữ liệu:', error);
  }
})();

module.exports = sequelize;
