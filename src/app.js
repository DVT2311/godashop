const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
// const route = require('./routes');
const adminRoutes = require('../src/routes/admin');
const clientRoutes = require('../src/routes/client');

const app = express();

// Cấu hình thư mục public để phục vụ các tệp tĩnh
app.use('/users', express.static(path.join(__dirname, 'public/users')));
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));


//parse dữ liệu
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());


// Thiết lập Handlebars làm template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    eq: (a, b) => a === b
  },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/app/views'));


// Sử dụng routes
adminRoutes(app);
clientRoutes(app);

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
