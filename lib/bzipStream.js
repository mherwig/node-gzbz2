var Transform = require('stream').Transform, util = require('util');
var gzbz2 = require('./gzbz2.node');

module.exports = Compress;

function Compress(opts) {
    if (!(this instanceof Compress)) {
        return new Compress(opts);
    }

    Transform.call(this);
    this.level = (opts && opts.level) || 9;
    this.workFactor = (opts && opts.level) || 30;
}

util.inherits(Compress, Transform);

Compress.prototype._transform = function(chunk, outputFn, callback) {
    if (!this.bz) {
        this.bz = new gzbz2.Bzip();
        this.bz.init({ level: this.level, workfactor: this.workFactor });
    }

    var out = this.bz.deflate(chunk);

    if (out.length) {
        outputFn(out);
    }

    callback();
};

Compress.prototype._flush = function(outputFn, callback) {
    if (!this.bz) {
        callback();
        return;
    }

    var out = this.bz.end();
    this.bz = null;

    if (out.length) {
        outputFn(out);
    }

    callback();
};

Compress.prototype.close = function() {
    if (this.bz) {
        this.bz.end();
        this.bz = null;
    }

    Transform.prototype.close.call(this);
};


