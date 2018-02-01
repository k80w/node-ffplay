const spawn = require('child_process').spawn;
const util = require('util');
const EventEmitter = require('events').EventEmitter;

function FFplay(file, opts) {
	// Get custom options or fallback to defaults
	opts = opts || ['-nodisp', '-autoexit'];
	opts.unshift(file);

	// Spawn process
	this.proc = spawn('ffplay', opts, {stdio: 'ignore'});

	// I wrote this code two years ago and I'm not sure what it does.
	// It's probably necessary. Who knows. I was 13.
	this.ef = function () {
		this.proc.kill();
	}.bind(this);

	process.on('exit', this.ef);

	this.proc.on('exit', () => {
		if (this.running) {
			this.running = false;
			process.removeListener('exit', this.ef);
			if (!this.manualStop) {
				setImmediate(() => {
					this.emit('stopped');
				});
			}
		}
	});
	this.running = true;
}

util.inherits(FFplay, EventEmitter);

FFplay.prototype.paused = false;
FFplay.prototype.running = false;

FFplay.prototype.pause = function () {
	if (!this.paused) {
		this.proc.kill('SIGSTOP');
		this.paused = true;
		this.emit('paused');
	}
};
FFplay.prototype.resume = function () {
	if (this.paused) {
		this.proc.kill('SIGCONT');
		this.paused = false;
		this.emit('resumed');
	}
};

FFplay.prototype.stop = function () {
	this.manualStop = true;
	this.proc.kill('SIGKILL');
};

module.exports = FFplay;
