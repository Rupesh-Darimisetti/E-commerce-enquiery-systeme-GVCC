import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { initalDBSetup } from '../db/db.js';

initalDBSetup()

const userConroller = {

    register: async (req, res) => {
        const { username, name, password, register } = req.body;
        const selectUserQuery = `SELECT * FROM user WHERE username=${username}`

        const dbUser = await db.get(selectUserQuery);
        if (dbUser !== undefined) {
            res.status(400);
            res.send('User already exists');
        }
        if (password.length < 6) {
            res.status(400)
            res.send('Password is too short')
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const createUserQuery = `
    INSERT INTO 
        user ( username,name,password,gender)
    VALUES
        (
            '${username}',
            '${name}',
            '${hashedPassword}',
            '${gender}'
        )
    `
        await db.run(createUserQuery)
        res.send('User created successfully')
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        const selectUserQuery = `SLECT * FROM user WHERE username='${username}'`
        const dbUser = await db.get(selectUserQuery);
        if (dbUser === undefined) {
            req.status(400)
            response.send('Invalid user')
        } else {
            const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
            if (!isPasswordMatched) {
                res.status(400);
                res.send('Invalid password')
            }
            const jwtToken = jwt.sign(username, 'MY_SCRET_TOKEN')
            response.send(jwtToken)
        }
    }
}

export const authenticationCode = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers['authorization']
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(' ')[1]
    }
    if (jwtToken === undefined) {
        response.status(400)
        response.send('Invalid JWT Token')
    }
    jwt.verify(jwtToken, process.env.SECERET_TOKEN, async (error, payload) => {
        if (error) {
            response.status(401)
            response.send('Invalud JWT Token')
        }
        request.username = payload
        next()
    })
}

export default { userConroller, authenticationCode }