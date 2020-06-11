const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    from: {type: String, required: true}, //от кого сформирована ссылка
    to: {type: String, required: true, unique: true}, //куда ведет ссылка, ссылка уникальная будет
    code: {type: String, required: true, unique: true}, //для взаимодействия с кодом
    date: {type: Date, default: Date.now}, //дата создания ссылки, дефолт - текущее время. но не вызываем дэйт.нау, а передаем как референс
    clicks: {type: Number, default: 0}, //количество кликов по ссылке
    ownner: {type: Types.ObjectId, ref: 'User'} //пользователь создавший ссылку, реф до коллекции (модели) Юзер
});

module.exports = model('Link', schema);