const { where } = require('sequelize');
const db = require('../../models');

let logout = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error("Lỗi khi xóa session:", err);
                return res.status(500).json({ message: "Đăng xuất thất bại" });
            }
            res.clearCookie('connect.sid'); // Xóa cookie session
            return res.redirect('/admin'); // Chuyển hướng về trang đăng nhập
        });
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    logout,
};
