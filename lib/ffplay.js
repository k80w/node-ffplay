var spawn = require("child_process").spawn,
	util = require("util"),
	EventEmitter = require("events").EventEmitter;

function FFplay(file, opts) {
	opts = opts || ["-nodisp", "-autoexit"];
	opts.unshift(file);
	this.proc = spawn("ffplay",opts,{stdio:"ignore"});
	this.ef = function() {
		this.proc.kill();
	}.bind(this);
	process.on("exit",this.ef);
	this.proc.on("exit",function() {
		if(this.running) {
			this.running=false;
			process.removeListener("exit",this.ef);
			if(!this.manualStop) {
				setImmediate(function() { this.emit("stopped"); }.bind(this));
			}
		}
	}.bind(this));
	this.running = true;
}

util.inherits(FFplay,EventEmitter);

FFplay.prototype.paused = false;
FFplay.prototype.running = false;

FFplay.prototype.pause = function() {
	if(!this.paused) {
		this.proc.kill("SIGSTOP");
		this.paused = true;
		this.emit("paused");
	}
};
FFplay.prototype.resume = function() {
	if(this.paused) {
		this.proc.kill("SIGCONT");
		this.paused = false;
		this.emit("resumed");
	}
};

FFplay.prototype.stop = function() {
	this.manualStop = true;
	this.proc.kill("SIGKILL");
};

module.exports = FFplay;
