const PORT = 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoURL = require('./config/db');
const cors = require('cors');

//Db Connection
mongoose.connect(mongoURL, {useNewUrlParser : true, useUnifiedTopology : true}).then(()=> {
    console.log("Veritabanına başarıyla bağlanıldı!");
}).catch(err => {
    console.log(err);
})

//Routerler
const homeRouter = require('./routers/main');

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());
app.use(homeRouter);

app.listen(PORT, () => console.log(`Server ${PORT} adresinde başlatıldı!`));