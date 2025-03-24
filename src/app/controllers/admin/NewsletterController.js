

const db = require('../../models');

const show_list_newsletter = async (req, res, next) => {
    let getAllNewsletter = await db.newsletter.findAll(
        {
            raw: true
        }
    )
    res.render('admin/newsletter/show_list_newsletter', {
        data: getAllNewsletter,
        username: req.session.user.username,
        layout: 'admin'
    })
}

let delete_newsletter = async (req, res) => {
    try {
        let data = req.params;
        await db.newsletter.destroy(
            {
                where: {
                    email: data.email
                }
            }
        )
        console.log('delete thanh cong ')
        res.redirect('/admin/newsletter')
    } catch (error) {
        return res.status(500).json(error);
    }
}

const sendMail = async (req, res, next) => {
    let getAllNewsletter = await db.newsletter.findAll(
        {
            raw: true
        }
    )
    console.log(getAllNewsletter)
    res.render('admin/newsletter/sendMail', {
        data: getAllNewsletter,
        username: req.session.user.username,
        layout: 'admin'
    })
}

module.exports = {
    show_list_newsletter,
    delete_newsletter,
    sendMail
};
