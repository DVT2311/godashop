var DataTypes = require("sequelize").DataTypes;
var _action = require("./action");
var _brand = require("./brand");
var _category = require("./category");
var _comment = require("./comment");
var _customer = require("./customer");
var _district = require("./district");
var _image_item = require("./image_item");
var _newsletter = require("./newsletter");
var _order = require("./order");
var _order_item = require("./order_item");
var _product = require("./product");
var _province = require("./province");
var _role = require("./role");
var _role_action = require("./role_action");
var _staff = require("./staff");
var _status = require("./status");
var _transport = require("./transport");
var _ward = require("./ward");

function initModels(sequelize) {
  var action = _action(sequelize, DataTypes);
  var brand = _brand(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var district = _district(sequelize, DataTypes);
  var image_item = _image_item(sequelize, DataTypes);
  var newsletter = _newsletter(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var order_item = _order_item(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var province = _province(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var role_action = _role_action(sequelize, DataTypes);
  var staff = _staff(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);
  var transport = _transport(sequelize, DataTypes);
  var ward = _ward(sequelize, DataTypes);

  // console.log("✅ Models loaded:");
  // console.log({
  //   action,
  //   brand,
  //   category,
  //   comment,
  //   customer,
  //   district,
  //   image_item,
  //   newsletter,
  //   order,
  //   order_item,
  //   product,
  //   province,
  //   role,
  //   role_action,
  //   staff,
  //   status,
  //   transport,
  //   ward,
  // });

  action.belongsToMany(role, { as: 'role_id_roles', through: role_action, foreignKey: "action_id", otherKey: "role_id" });
  order.belongsToMany(product, { as: 'product_id_products', through: order_item, foreignKey: "order_id", otherKey: "product_id" });
  product.belongsToMany(order, { as: 'order_id_orders', through: order_item, foreignKey: "product_id", otherKey: "order_id" });
  role.belongsToMany(action, { as: 'action_id_actions', through: role_action, foreignKey: "role_id", otherKey: "action_id" });
  role_action.belongsTo(action, { as: "action", foreignKey: "action_id" });
  action.hasMany(role_action, { as: "role_actions", foreignKey: "action_id" });
  product.belongsTo(brand, { as: "brand", foreignKey: "brand_id" });
  brand.hasMany(product, { as: "products", foreignKey: "brand_id" });
  product.belongsTo(category, { as: "category", foreignKey: "category_id" });
  category.hasMany(product, { as: "products", foreignKey: "category_id" });
  order.belongsTo(customer, { as: "customer", foreignKey: "customer_id" });
  customer.hasMany(order, { as: "orders", foreignKey: "customer_id" });
  ward.belongsTo(district, { as: "district", foreignKey: "district_id" });
  district.hasMany(ward, { as: "wards", foreignKey: "district_id" });
  order_item.belongsTo(order, { as: "order", foreignKey: "order_id" });
  order.hasMany(order_item, { as: "order_items", foreignKey: "order_id" });
  comment.belongsTo(product, { as: "product", foreignKey: "product_id" });
  product.hasMany(comment, { as: "comments", foreignKey: "product_id" });
  image_item.belongsTo(product, { as: "product", foreignKey: "product_id" });
  product.hasMany(image_item, { as: "image_items", foreignKey: "product_id" });
  order_item.belongsTo(product, { as: "product", foreignKey: "product_id" });
  product.hasMany(order_item, { as: "order_items", foreignKey: "product_id" });
  district.belongsTo(province, { as: "province", foreignKey: "province_id" });
  province.hasMany(district, { as: "districts", foreignKey: "province_id" });
  transport.belongsTo(province, { as: "province", foreignKey: "province_id" });
  province.hasMany(transport, { as: "transports", foreignKey: "province_id" });
  role_action.belongsTo(role, { as: "role", foreignKey: "role_id" });
  role.hasMany(role_action, { as: "role_actions", foreignKey: "role_id" });
  staff.belongsTo(role, { as: "role", foreignKey: "role_id" });
  role.hasMany(staff, { as: "staffs", foreignKey: "role_id" });
  order.belongsTo(staff, { as: "staff", foreignKey: "staff_id" });
  staff.hasMany(order, { as: "orders", foreignKey: "staff_id" });
  order.belongsTo(status, { as: "order_status", foreignKey: "order_status_id" });
  status.hasMany(order, { as: "orders", foreignKey: "order_status_id" });
  customer.belongsTo(ward, { as: "ward", foreignKey: "ward_id" });
  ward.hasMany(customer, { as: "customers", foreignKey: "ward_id" });
  order.belongsTo(ward, { as: "shipping_ward", foreignKey: "shipping_ward_id" });
  ward.hasMany(order, { as: "orders", foreignKey: "shipping_ward_id" });

  return {
    action,
    brand,
    category,
    comment,
    customer,
    district,
    image_item,
    newsletter,
    order,
    order_item,
    product,
    province,
    role,
    role_action,
    staff,
    status,
    transport,
    ward,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
