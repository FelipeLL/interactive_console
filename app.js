require('colors');
const { showMenu, pause } = require('./helpers/messages.js');

const main = async () => {
    let opt = ''
    do {
        opt = await showMenu();

        if (opt !== '0') {
            await pause();
        }

        if (opt === '0') {
            console.log('\nHas salido de la aplicación\n'.magenta);
        }

    } while (opt !== '0');
}

main();