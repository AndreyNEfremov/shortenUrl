const {Router} = require('express'); //роутер
const bcrypt = require('bcryptjs'); //хэширование пароля
const config = require('config'); //подключение дефолт.жсок в конфиге с секретной фразой
const jwt = require('jsonwebtoken'); //авторизация юзера чезе токен
const {check, validationResult} = require('express-validator'); //подключение валидатора
const User = require('../Models/User'); //подключение модели пользователя
const router = Router(); //константа роута

// /api/auth/register страница
router.post(
    '/register',
    [ //массив миддлвэйров
        check('email', 'Wrong email').isEmail(), //валидация имэйла
        check('password', 'Minimal password length is 6 characters').isLength({min: 6}) //валидация пароля
    ],
    async (req, res) => {
        try {
            console.log('Body:', req.body)
            const errors = validationResult(req); //проверка результата валидации

            if (!errors.isEmpty()) {
                return res.status(400).json({ //если в валидации есть ошибки - возвращаем на фронтэнд
                    errors: errors.array(),
                    message: 'Invalid registration data'
                })
            }

            const {email, password} = req.body; //из тела запроса получаем поля почты и пароля

            const candidate = await User.findOne({email: email}); //делаем проверку есть ли уже пользователь перед регистрацией, ждем инфы от Юзер есть ли имэйл
            if (candidate) {
                res.status(400).json({message: 'The user existed'})
            }

            const hashedPassword = await bcrypt.hash(password, 12); //хэшируем пароль, 12 - сила хэша как я понял
            const user = new User({email, password: hashedPassword}); //новый пользователь с хэшироанным паролем
            await user.save(); //сохраняем пользователя
            res.status(201).json({message: 'The user is created'}) //при статусе 201 (создан) выводим сообщение


        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'})
        }
    });

// /api/auth/login страница
router.post(
    '/login',
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(), //приведение и проверка имэйла
        check('password', 'Enter password').exists() //проверка на введение пароля
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req); //проверка результата валидации
            if (!errors.isEmpty()) {
                return res.status(400).json({ //если в валидации есть ошибки - возвращаем на фронтэнд
                    errors: errors.array(),
                    message: 'Invalid login data'
                })
            }

            const {email, password} = req.body; //из тела запроса получаем поля почты и пароля

            const user = await User.findOne({email}); // ищем пользователя в базе по имэйлу
            if (!user) {
                return res.status(400).json({message: 'User is not found'}) //если пользователя нет то сообщаем
            }

            const isMatch = await bcrypt.compare(password, user.password); //проверка на соответствие введенного пароля
            if (!isMatch) {
                return res.status(400).json({message: 'Login or password is incorrect'})
            }

            const token = jwt.sign(
                {userId: user.id}, //данные, которые будут зашифрованы в этом токене. можно добавить мэйл, логин и другое
                config.get('jwtSecret'), //секретную фразу передаём из настроек
                {expiresIn: '1h'} //время жизни токена
            )

            res.json({token, userId: user.id}) //ответ 200, успешная авторизация

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'})
        }
    });

module.exports = router;