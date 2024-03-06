// accounts.js
import fs from 'fs/promises';
import path from 'path';

const accountsFilePath = path.resolve('accounts.json');

async function getAccountInformation() {
    try {
        const accountsData = await fs.readFile(accountsFilePath, 'utf-8');
        const accounts = JSON.parse(accountsData);
        return accounts;
    } catch (error) {
        // If the file doesn't exist or there is an error reading it, return an empty array
        return [];
    }
}

async function storeAccountInformation(answers) {
    let accounts = [];
    try {
        const existingAccountsData = await fs.readFile(accountsFilePath, 'utf-8');
        accounts = JSON.parse(existingAccountsData);
        accounts.push(answers);
        await fs.writeFile(accountsFilePath, JSON.stringify(accounts, null, 2));
    } catch (error) {
        console.log(error);
        // If the file doesn't exist, no need to handle the error here
    }
}

export { getAccountInformation, storeAccountInformation };
