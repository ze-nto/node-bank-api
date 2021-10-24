import express from 'express';
import { promises as fs } from 'fs';
import winston from 'winston';
import cors from 'cors';
import accountsRouter from './routes/account.routes.js'
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from '../doc.js';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

const { readFile, writeFile } = fs;
const { combine, timestamp, label, printf } = winston.format;

//GraphQL definitions
const schema = buildSchema(`
    type Account {
        id: Int
        name: String
        balance: Float
    }
    type Query {
        getAccounts: [Account]
        getAccount(id: Int): Account
    }
`);

const app = express();
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
app.use('/accounts', accountsRouter);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: null,
    graphiql: true 
}));

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