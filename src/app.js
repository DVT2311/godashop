const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const route = require('./routes');
const db = require('./config/db'); // Import kết nối

const app = express();

// Cấu hình thư mục public để phục vụ các tệp tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// console.log(path.join(__dirname, 'public'))

// Thiết lập Handlebars làm template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Kết nối database


//Kết nối routes
route(app);

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
