import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

async function insertAccount(account){
    const data = JSON.parse(await readFile(global.fileName));
        
    account = { 
        id: data.nextId++, 
        name: account.name,
        balance: account.balance 
    }

    data.accounts.push(account);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    return account;
}


async function getAccounts(){
    const data = JSON.parse(await readFile(global.fileName));
    return data.accounts;
}

async function getAccountById(id){
    const accounts = await getAccounts();
    const account = accounts.find(
        account => account.id === parseInt(id));

    if (!account){
        throw new Error('Registro não encontrado');
    }
    
    return account;
}

async function deleteAccount(id){
    const data = JSON.parse( await readFile(global.fileName));
    data.accounts = data.accounts.filter(
        account => account.id !== parseInt(id));
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

async function updateAccount(account){
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex( item => item.id === account.id);

    if (index === -1){
        throw new Error('Registro não encontrado');
    }

    data.accounts[index].name = account.name,
    data.accounts[index].balance = account.balance
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    return data.accounts[index];
}



export default {
   insertAccount,
   getAccounts,
   getAccountById,
   deleteAccount, 
   updateAccount
}