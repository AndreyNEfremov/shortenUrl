const {Router} = require('express'); //роутер
const Link = require('../Models/Link'); //модель линка
const router = Router(); //константа роута

router.get('/:code', async (req, res) => {
    try {

        const  link = await Link.findOne({code: req.params.code});

        if (link) {
            link.clicks++;
            await link.save();
            return res.redirect(link.form)
        }

        res.status(404).json('Link is not found')

    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
});

module.exports = router;