
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

async function createAccount(req, res, next) {
    try{
        let account = req.body;

        if(!account.name || account.balance == null){
            throw new Error('Name e Balance são obrigatórios')
        }

        const data = JSON.parse(await readFile(global.fileName));
        
        account = { 
            id: data.nextId++, 
            name: account.name,
            balance: account.balance 
        }
        data.accounts.push(account);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(account);

        logger.info(`POST /accounts - ${JSON.stringify(account)}`)

    } catch(err){
        next(err);
    }

}


async function getAccounts(req, res, next){

        try{
            const data = JSON.parse(await readFile(global.fileName));
            delete data.nextId 
            res.send(data.accounts);
    
            logger.info(`GET /accounts`)
    
        } catch( err ){
            next(err);
        }
}

async function getAccount(req, res, next){
    try{

        const data = JSON.parse( await readFile(global.fileName));
        const account = data.accounts.find(
            account => account.id === parseInt(req.params.id));
        res.send(account);
        logger.info(`GET /accounts/:id`)

    } catch( err ){
        next(err);
    }
}
async function deleteAccount(req, res, next){
    try{

        const data = JSON.parse( await readFile(global.fileName));
        data.accounts = data.accounts.filter(
            account => account.id !== parseInt(req.params.id));

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.end();
        logger.info(`DELETE /accounts/:id - ${req.params.id}`)

    } catch( err ){
        next(err);
    }
}
async function updateAccount(req, res, next){
    try{
        const account = req.body;

        if (!account.id || !account.name || account.balance == null){
            throw new Error('ID, Name e Balance são obrigatórios');
        }

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex( item => item.id === account.id);

        if (index === -1){
            throw new Error('Registro não encontrado');
        }

        data.accounts[index].name = account.name,
        data.accounts[index].balance = account.balance
    
        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(account);
        logger.info(`PUT /accounts - ${JSON.stringify(account)}`)

    
    } catch( err ){
        next(err);
    }
}

async function updateBalance(req, res, next){
    try{
    
        const account = req.body;
        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex( item => item.id === account.id);

        if (!account.id || account.balance == null){
            throw new Error('ID e Balance são obrigatórios');
        }

        if (index === -1){
            throw new Error('Registro não encontrado');
        }

        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(data.accounts[index]);
        logger.info(`PATCH /accounts/updateBalance - ${JSON.stringify(account)}`)

    
    } catch(err){
        next(err);
    }
}


export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance
}