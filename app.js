require('colors');
const { inquirerMenu, pauseStep, readInput, listTasksToDelete, confirmDeleteTask, ListChecklist } = require('./helpers/inquirer');
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
			case '3':
				tasks.listCompletedOrPending(true);
				break;
			case '4':
				tasks.listCompletedOrPending(false);
				break;
			case '5':	
				const ids = await ListChecklist(tasks.listArr);
				tasks.toggleCompleted(ids);
				break;
			case '6':
				const id = await listTasksToDelete(tasks.listArr);

				if (id === '0') {
					continue;
				}

				const confirm = await confirmDeleteTask('¿Estás seguro?');
				if (confirm) {
					tasks.deleteTask(id);
					console.log('Tarea borrada correctamente'.green);
				}
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