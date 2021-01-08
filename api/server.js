const express = require('express');
const server = express();

server.use(express.json());

server.get('', (req, res) => {
    res.send(`
        <h1>Welcome to Sam G's Node Auth 2 Project</h1>
        <h2>m v p</h2>
        <p>Use Node.js, Express and Knex to build an API that provides <em>Authentication</em> functionality using SQLite to store <em>User</em> information.</p>

        <p>The user schema should include: <strong>username</strong>, <strong>password</strong> and <strong>department</strong>. The <strong>department</strong> should be a string used to group the users. No need for a <strong>departments</strong> table or setting up relationships.</p>
    
        <p>Use <strong>JSON Web Tokens</strong> to keep users authenticated across requests.</p>

        <h2>e n d p o i n t s</h2>
        <ul>
            <li>
                <h3>POST /api/register</h3>
                <p>Creates a <strong>user</strong> using the information sent inside the <strong>body</strong> of the request. <strong>Hash the password</strong> before saving the user to the database.</p>
            </li>
            <li>
                <h3>POST /api/login</h3>
                <p>Use the credentials sent inside the <strong>body</strong> to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'</p>
            </li>
            <li>
                <h3>GET /api/users</h3>
                <p>If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'</p>
            </li>
        </lu>
    `)
})

server.get('/api/users', (req, res) => {
    try {
        console.log('hello')
    } catch (error) {
        res.status(500).json({
            message: 'server error - GET /users'
        })
    }
})

server.post('/api/register', (req, res) => {
    const {body} =  req;
    try {
        console.log('hello')
    } catch (error) {
        res.status(500).json({
            message: 'server error - POST /register'
        })
    }
})

server.post('/api/login', (req, res) => {
    try {
        console.log('hello')
    } catch (error) {
        res.status(500).json({
            message: 'server error - POST /login'
        })
    }
})



module.exports = server;