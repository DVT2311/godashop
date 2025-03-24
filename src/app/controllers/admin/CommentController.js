

const db = require('../../models');

let show_list_comment = async (req, res) => {
    let getListComment = await db.comment.findAll({
        raw: true
    });
    res.render('admin/comment/show_list_comment', {
        data: getListComment,
        username: req.session.user.username,
        layout: 'admin'
    })
}

let delete_comment = async (req, res) => {
    let getId = req.query.id;
    try {
        await db.comment.destroy({
            where: {
                id: getId
            }
        })

        let getListComment = await db.comment.findAll({
            raw: true
        });
        res.render('admin/comment/show_list_comment', {
            data: getListComment,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (e) {
        return res.status(500).send(e);
    }
}

module.exports = {
    show_list_comment,
    delete_comment
};
