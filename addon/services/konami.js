import $ from 'jquery';
import Ember from 'ember';

export default Ember.Service.extend({
	stack: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
	callbacks: [],

	init() {
		this._super(...arguments);
		this.setup();
	},

	setup() {
		let currentStack = this.stack.slice();
		$(window).off('keyup.konami');
		$(window).on('keyup.konami', event => {
			const keyCode = currentStack.shift();

			if (event.keyCode === keyCode) {
				if (currentStack.length === 0) {
					this.runCallbacks();
					if (this.autoOn) {
						this.setup();
					}
				}
			} else {
				currentStack = this.stack.slice();
			}
		});
	},

	runCallbacks() {
		this.callbacks.forEach((callback) => { callback(); })
	},

	register(callback) {
		if (this.callbacks.indexOf(callback) < 0) {
			this.callbacks.push(callback);
		}
	}

	unregister(callback) {
		const index = this.callbacks.indexOf(callback);
		if (index > -1) {
			this.callbacks.splice(index, 1);
		}
	}
});
