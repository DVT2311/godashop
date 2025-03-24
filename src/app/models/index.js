const path = require('path');
const Sequelize = require('sequelize');
const fs = require('fs');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // Lấy môi trường từ biến môi trường
const config = require('../../config/config.json')[env]; // Đọc config tương ứng môi trường
const db = {};

let sequelize;

// Kiểm tra nếu sử dụng biến môi trường
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach((modelName) => {
  // console.log(`🔄 Checking associations for: ${modelName}`);
  if (db[modelName].associate) {
    db[modelName].associate(db);
    // console.log(`✅ Associated: ${modelName}`);
  }
  // else {
  //   console.log(`⚠️ No associate() method in: ${modelName}`);
  // }
});
// console.log("Loaded Models:", Object.keys(db));


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
// sequelize.sync({ alter: true }); // Cập nhật bảng mà không mất dữ liệu




// const fs = require("fs");
// const path = require("path");
// const { Sequelize } = require("sequelize");
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "../../../config/config.json")[env];

// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs.readdirSync(__dirname)
//   .filter((file) => file !== basename && file.endsWith(".js"))
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
