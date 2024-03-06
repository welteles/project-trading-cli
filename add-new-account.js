// add-new-account.js

import { storeAccountInformation } from './accounts.js';
import inquirer from 'inquirer';

const exchanges = [
    'Binance',
];

async function promptForAccountInformation() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'account_name',
            message: 'Enter account name:'
        },
        {
            type: 'list',
            name: 'exchange',
            message: 'Select an exchange:',
            choices: exchanges
        },
        {
            type: 'input',
            name: 'token',
            message: 'Enter token:'
        }
    ]);
}


async function addNewAccount() {
    try {
        const answers = await promptForAccountInformation();
        await storeAccountInformation(answers);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

export { addNewAccount };
