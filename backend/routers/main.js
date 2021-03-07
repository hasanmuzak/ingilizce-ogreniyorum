const express = require('express');
const router = express.Router();
const kelimeModel = require('../models/kelime_model');

router.route('/').get((req,res,next) => {
   kelimeModel.find({}).then(veri => {
       if (!veri) {         
            console.log('Veri Bulunamadı.');
        }
        else{
            res.send(veri);
        }
   }).catch(err => {
       console.log(err);
       res.sendStatus(503).send({data : 'Kayıt bulunamadı!'});
   })
});

router.route('/ekle').post((req,res,next) => {
    const {kelime, telaffuz, turkce_anlam, ingilizce_anlam, ornek_cumle1, ornek_cumle2, es_anlam} = req.body;
    
    kelimeModel.findOne({kelime}, (err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            if (data) {
                res.status(503).send({data : 'Bu kelime zaten mevcut!'});
            }
            else{
                const yeni_kelime = new kelimeModel({
                    kelime,
                    telaffuz,
                    turkce_anlam,
                    ingilizce_anlam,
                    ornek_cumle1,
                    ornek_cumle2,
                    es_anlam
                });
                yeni_kelime.save().then(() => {
                    res.send({data : 'Kelime basariyla eklendi!'});
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    })
 });


module.exports = router;