function Promise(resolver) {
    if (resolver && typeof resolver !== 'function') throw new TypeError(`resolver must be a function`);

    this.state = 'pending';
    this.value = void 0;

    try {
        resolver(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
        this.reject.call(this, error);
    }
}

Promise.prototype.resolve = function(value) {
    if (!this.state == 'pending') return;

    this.state = 'fulfilled';
    this.value = value;

}

Promise.prototype.reject = function(value) {
    if (!this.state == 'pending') return;

    this.state = 'rejected';
    this.value = value;
}

Promise.prototype.then = function(fulfilled, rejected) {

    if (typeof fulfilled !== 'function' && this.state === 'fulfilled' ||
        typeof rejected !== 'function' && this.state === 'rejected') {
        return this;
    }

    var self = this;
    return new Promise((resolve, reject) => {
        if (fulfilled && typeof fulfilled == 'function') {
            var onfulfilled = function() {
                try {
                    var result = fulfilled(self.value);
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            }
            onfulfilled()
        }

        if (rejected && typeof rejected == 'function') {
            var onrejected = function() {
                try {
                    var result = rejected(self.value);
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            }
            onrejected()
        }
    })
}