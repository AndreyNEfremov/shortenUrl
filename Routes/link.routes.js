const {Router} = require('express'); //роутер
const config = require('config');
const shortid = require('shortid');
const Link = require('../Models/Link');
const auth = require('../Middleware/auth.middleware');
const router = Router(); //константа роута


router.post(
    '/generate', auth, //генерируем короткий урл
    async (req, res) => {
        try {
            const baseUrl = config.get('baseUrl');
            const {from} = req.body;

            const code = shortid.generate();

            const existing = await Link.findOne({from});
            if (existing) {
                return res.json({link: existing})
            }

            const to = baseUrl + '/t/' + code;

            const link = new Link({
                code, to, from, owner: req.user.userId
            });

            await link.save();
            res.status(201).json({link})

        } catch (e) {
            res.status(500).json({message: 'Link post - Something went wrong, try again'})
        }
    });

router.get(
    '/', //получаем список всех ссылок
    auth,
    async (req, res) => {
        try {
            const links = await Link.find({owner: req.user.userId});
            res.json(links)
        } catch (e) {
            res.status(500).json({message: 'Links all - Something went wrong, try again'})
        }
    });

router.get(
    '/:id', auth, //получаем ссылку по айди
    async (req, res) => {
        try {
            const link = await Link.findById(req.params.id);
            res.json(link)
        } catch (e) {
            res.status(500).json({message: 'Link id - Something went wrong, try again'})
        }
    });

module.exports = router;