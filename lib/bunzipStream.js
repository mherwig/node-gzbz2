var Transform = require('stream').Transform, util = require('util');
var gzbz2 = require('./gzbz2.node');

module.exports = Decompress;

function Decompress(opts) {
    if (!(this instanceof Decompress)) {
        return new Decompress(opts);
    }

    Transform.call(this);
    this.small = (opts && opts.small) || false;
}

util.inherits(Decompress, Transform);

Decompress.prototype._transform = function(chunk, outputFn, callback) {
    if (!this.bz) {
        this.bz = new gzbz2.Bunzip();
        this.bz.init({ small: this.small });
    }

    var out = this.bz.inflate(chunk);

    if (out.length) {
        outputFn(out);
    }

    callback();
};

Decompress.prototype.close = function() {
    if (this.bz) {
        this.bz.end();
        this.bz = null;
    }

    Transform.prototype.close.call(this);
};

