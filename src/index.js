import express from 'express';
import { promises as fs } from 'fs';
import winston from 'winston';
import cors from 'cors';
import accountsRouter from './routes/account.routes.js'
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from '../doc.js';


const { readFile, writeFile } = fs;
const app = express();
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.fileName = 'accounts.json';
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'my-bank-api.log'})
    ],
    format: combine(
        label({ label: 'my-bank-api' }),
        timestamp(),
        myFormat
    )
});

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


function authorize(...allowed){
    const isAllowed = role => allowed.indexOf(role) > -1;

    return (req, res, next) => {

        if(req.auth.user){
           
            //Nova Implemntação

            if(isAllowed(role)){
                next();
            } else{
                res.status(401).send('Role not allowed');
            }
        }else{
            res.status(403).send('User not found');
        }
    }
}


app.use('/accounts', authorize('admin', 'role1'), accountsRouter);


app.listen(3000, async () => {

    try{
        await readFile(global.fileName);
        console.log('Server running on http://localhost:3000')
    } catch (err){
        const initialJson = {
            nextId: 1,
            accounts: []
        }
        writeFile(global.fileName, JSON.stringify(initialJson)).then(
            logger.info('File created'),
            console.log('Server running on http://localhost:3000')
        ).catch( err => {
            logger.info(err);
        });
    }
});