const { where } = require('sequelize');
const db = require('../../models');
const bcrypt = require('bcrypt');

let login = async (req, res) => {
    try {
        res.render('admin/login/login',
            {
                layout: false
            }
        )
        // return res.send('page login');
    } catch (error) {
        res.status(500).json(error);
    }
}

let check_login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username)
        console.log(password)
        let getUserName = await db.staff.findOne({
            where: {
                username: username,
            },
            raw: true
        })
        if (!getUserName) {
            return res.status(500).json('Tai khoan nay khong ton tai!')
        }
        console.log(getUserName)
        console.log(getUserName.password)

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, getUserName.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(401).json({ message: 'Mật khẩu không chính xác!' });
        }

        // Lưu thông tin vào session
        req.session.user = { username: getUserName.name };
        req.session.save(err => {
            if (err) {
                console.error('Lưu session thất bại:', err);
            } else {
                console.log('Session đã được lưu!');
                console.log("Session sau khi đăng nhập:", req.session.user); // Kiểm tra session
                // Chuyển hướng sang trang dashboard
                res.redirect('/admin/dashboard');
            }
        });

    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    login,
    check_login,
};
