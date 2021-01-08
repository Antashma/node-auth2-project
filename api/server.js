const express = require('express');
const server = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

const dbUser = require('./model.js');


server.use(express.json());

server.get('', (req, res) => {
    res.send({api: 'up'})
})

server.get('/api/users', async (req, res) => {
    try {
        const users = await dbUser.findUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: 'server error - GET /users'
        })
    }
})

server.post('/api/register', async (req, res) => {
    const reg =  req.body;
    if (!reg.username || !reg.password || !reg.department) {
        res.status(400).json({
            errorMsg: `Please check that all required fields (username, password, and department) are valid!`
        })
    } else {
        try {
            const hash = bcrypt.hashSync(reg.password, 10);
            reg.password = hash
            const registered = await dbUser.register(reg);
            res.status(201).json({
                message: 'User registered!',
                response: registered
            })
        } catch (error) {
            res.status(500).json({
                message: 'server error - POST /register'
            })
        }
    }
})

server.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).json({
            errorMsg: `Please check that username and password are valid!`
        })
    } else {
        try {
            const found_user = await dbUser.findUserByName(username)
            if (!found_user || found_user.password !== password) {
                res.status(400).json({
                    errorMsg: 'You shall not pass!'
                })
            } else {
                res.status(200).json({
                    message: 'User logged in!',
                })
            }
        } catch (error) {
            res.status(500).json({
                message: 'server error - POST /login'
            })
        }
    }
})

// -------------------- //
// WEB TOKEN GEN
// -------------------- //
function jwtGenerator(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      dept: user.department
    }
    const secret = secrets.jwt_secret;
    const options = {
      expiresIn: 60
    };
  
    return jwt.sign(payload, secret, options);
  } 


module.exports = server;