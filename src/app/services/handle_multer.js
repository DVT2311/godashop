const multer = require("multer");
const path = require("path")

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/admin/images/')
    },
    filename: function (req, file, cb) {
        // Lấy ngày giờ hiện tại dưới dạng YYYYMMDD_HHmmss
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
        // Lấy phần mở rộng của file
        const ext = file.originalname.split('.').pop();
        // Lấy tên file không có phần mở rộng
        const fileNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");
        // Tạo tên file mới
        const newFileName = `${fileNameWithoutExt}_${timestamp}.${ext}`;
        cb(null, newFileName);
    }
});

// Bộ lọc để chỉ chấp nhận file ảnh
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ chấp nhận file ảnh (jpg, jpeg, png)!"), false);
    }
};

// Khởi tạo Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Giới hạn file 5MB
});

module.exports = upload;