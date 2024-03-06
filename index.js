// index.js

import inquirer from 'inquirer';
import { getAccountInformation } from './accounts.js';
import { addNewAccount } from './add-new-account.js';

async function selectAccount(accounts) {
    const accountChoices = accounts.map(account => ({
        name: `${account.account_name} - ${account.exchange}`,
        value: account,
    }));

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedAccount',
            message: 'Select an account:',
            choices: accountChoices,
        },
    ]);

    return answer.selectedAccount;
}

async function main() {
    try {
        console.log('Welcome to Trading cli');
        const accounts = await getAccountInformation();

        if (accounts.length === 0) {
            // If there are no accounts, call the addNewAccount function from add-new-account.js
            await addNewAccount();
        } else {
            const selectedAccount = await selectAccount(accounts);

            console.log('Selected Account Information:');
            console.log(`Account Name: ${selectedAccount.account_name}`);
            console.log(`Exchange: ${selectedAccount.exchange}`);
            console.log(`Token: ${selectedAccount.token}`);
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Start the script
main();
