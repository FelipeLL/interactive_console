const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            }
            ,
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            }
            ,
            {
                value: '0',
                name: `${'0.'.red} Salir`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.log('==========================='.green)
    console.log('   Seleccione una opción   '.green)
    console.log('===========================\n'.green)

    const answer = await inquirer.prompt(menuOpts);

    return answer.option;
}

const pauseStep = async () => {
    const question = {
        type: 'input',
        name: 'option',
        message: `Presione ${'ENTER'.green} para continuar`
    }

    const answer = await inquirer.prompt(question)
    return answer
}

const readInput = async (message) => {
	const question = {
		type: 'input',
		name: 'desc',
		message,
		validate(value) {
			if (value.length === 0) {
				return 'Por favor ingrese un valor';
			}
			return true;
		}
	}
	const answer = await inquirer.prompt(question);
	return answer.desc;
}

module.exports = {
    inquirerMenu,
    pauseStep,
	readInput,
}