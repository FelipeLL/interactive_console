require('colors');
const { inquirerMenu, pauseStep } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

const main = async () => {
    let opt = ''
    do {
        opt = await inquirerMenu();
        if (opt !== '0') {
            console.log('\n')
            await pauseStep();
        }

        if (opt === '0') {
            console.log('\nHas salido de la aplicación\n'.magenta);
        }

    } while (opt !== '0');
}

main();