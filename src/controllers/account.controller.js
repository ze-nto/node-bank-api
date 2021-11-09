
import AccountService from '../services/account.service.js'


async function createAccount(req, res, next) {
    try{
        let account = req.body;

        if(!account.name || account.balance == null){
            throw new Error('Name e Balance são obrigatórios')
        }

        account = await AccountService.createAccount(account);
        res.send(account);

        logger.info(`POST /accounts - ${JSON.stringify(account)}`)

    } catch(err){
        next(err);
    }

}


async function getAccounts(req, res, next){
        try{
            let data = await AccountService.getAccounts();
            res.send(data);
    
            logger.info(`GET /accounts - user: ${req.auth.user}` )
    
        } catch( err ){
            next(err);
        }
}

async function getAccount(req, res, next){
    try{
        res.send( await AccountService.getAccount(req.params.id));
        logger.info(`GET /accounts/:id`)

    } catch( err ){
        next(err);
    }
}
async function deleteAccount(req, res, next){
    try{
        await AccountService.deleteAccount(req.params.id)
        res.end();
        logger.info(`DELETE /accounts/:id - ${req.params.id}`)

    } catch( err ){
        next(err);
    }
}
async function updateAccount(req, res, next){
    try{
        let account = req.body;

        if (!account.id || !account.name || account.balance == null){
            throw new Error('ID, Name e Balance são obrigatórios');
        }

        account = await AccountService.updateAccount(account);

        res.send(account);
        logger.info(`PUT /accounts - ${JSON.stringify(account)}`)

    
    } catch( err ){
        next(err);
    }
}

async function updateBalance(req, res, next){
    try{
    
        let account = req.body;
       
        if (!account.id || account.balance == null){
            throw new Error('ID e Balance são obrigatórios');
        }
       
        account = await AccountService.updateBalance(account)
        
        res.send(account);
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