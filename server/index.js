const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const requests = require('./routes/api/requests');
const calendars = require('./routes/api/calendars');
const cvdb = require('./routes/api/cvdb');
const app = express();
const cors = require('./node_modules/cors/lib')


console.log()
app.use(cors())
let db = require('./config/keys_dev.js').mongoURI;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



mongoose
    .connect(db, 
      { useNewUrlParser: true ,useUnifiedTopology: true}
      )
    .then(() => {
      console.log('Connected to MongoDB')
    
    })
    .catch(err => console.log(err))

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    
    app.use('/routes/api/users', users);
    app.use('/routes/api/requests', requests);
    app.use('/routes/api/calendars', calendars);
    app.use('/routes/api/cvdb', cvdb);

    // Handling 404
app.use((req, res) => {
	res.status(404).send({ err: 'We can not find what you are looking for' });
});



const port = process.env.PORT || 3333
app.listen(port, () => console.log(`Server up and running on port ${port}`));
