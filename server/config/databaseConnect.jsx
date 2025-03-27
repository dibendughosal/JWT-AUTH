const { default: mongoose } = require('mongoose');

cosnt mongoose  = require('mongoose');

const MongoDB_url = process.env.MONGODB_URL || "mongodb://localhost:27017/my_database" ; 

const databaseConnect = () => {
    mongoose.connect(MongoDB_url)
    .then((conn)=> {
        console.log(`Connected to DB: ${conn.connection.host} successfully`)
    })
    .catch ( (err) => {
        console.log(err.message);
    })
}

module.exports = databaseConnect; 
