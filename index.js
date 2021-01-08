const server = require('./api/server.js')
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
    console.log(`
        *** ｌｉｓｔｅｎｉｎｇ░ｏｎ░ｐｏｒｔ ${PORT} ***
    `)
})