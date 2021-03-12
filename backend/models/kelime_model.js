const mongoose = require('mongoose');

const kelimeSchema = new mongoose.Schema({
    kelime : {
        type : String,
        maxLength : 50,
        unique : true
    },
    tip : {
        type : String
    },
    telaffuz : {
        type : String
    },
    turkce_anlam : {
        type : String
    },
    ingilizce_anlam : {
        type : String
    },
    es_anlam : {
        type : String
    },
    ornek_cumle1 : {
        type : String
    },
    ornek_cumle2 : {
        type : String
    },
    ingiliz_telaffuz : {
        type : String
    },
    amerikan_telaffuz : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

const KelimeModeli = mongoose.model('KelimeModeli', kelimeSchema);
module.exports = KelimeModeli;