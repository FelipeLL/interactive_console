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

	deleteTask(id) {
		if (this._list[id]) {
			delete this._list[id];
		}
	}

	toggleCompleted(ids = []) {
		ids.forEach(id => {
			const task = this._list[id];
			if (!task.completeIn) {
				task.completeIn = new Date().toISOString();
			}
		});

		this.listArr.forEach(task => {
			if(!ids.includes(task.id)){
				this._list[task.id].completeIn = null;
			}
		});
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

	listCompletedOrPending(completed = true) {
		let counter = 0;
		
		console.log('');

		Object.keys(this._list).forEach((key) => {
			const task = this._list[key];
			if (completed && task.completeIn !== null) {
				counter++;
				console.log(`${counter}`.green, `${task.desc} :: ${task.completeIn}`);
			}else if(!completed && task.completeIn === null){
				counter++;
				console.log(`${counter}`.green, `${task.desc} :: ${'Pendiente'.red}`);
			}
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

