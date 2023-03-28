require('colors');
const { inquirerMenu, pauseStep, readInput } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveData');
const Tasks = require('./models/tasks');

const main = async () => {
    let opt = ''
	const tasks = new Tasks();

	const tasksDB = readDB();

	if (tasksDB) {
		tasks.loadTasksFromArray(tasksDB);
	}

    do {
        opt = await inquirerMenu();

		switch (opt) {
			case '1':
				const desc = await readInput('Descripción: ');
				tasks.createTask(desc);
				break;
			case '2':
				tasks.fullList();
				//console.log(tasks.listArr);
				break;
			
		}

		saveDB( tasks.listArr );

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