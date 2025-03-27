require('dotenv').config();
const PORT = process.env.PORT || 2525;

const app = require('./app.js');

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})