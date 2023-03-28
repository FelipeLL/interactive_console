const Task = require("./task");

class Tasks {

    _list = {};

    constructor() {
        this._list = {};
    }

	createTask(desc = '') {
		const task = new Task(desc);
		this._list[task.id] = task;
	}

	loadTasksFromArray(tasks = []) {
		tasks.forEach(task => {
			this._list[task.id] = task;
		});

	}

	fullList() {
		console.log('');
		Object.keys(this._list).forEach((key, index) => {
			const task = this._list[key];
			console.log(`${index + 1}`.green, `${task.desc} :: ${task.completeIn !== null ? 'Completada'.green : 'Pendiente'.red}`)
		});
	}

	get listArr() {
		const list = [];
		Object.keys(this._list).forEach(key => {
			const task = this._list[key];
			list.push(task);
		});
		return list;
	}

}

module.exports = Tasks;

