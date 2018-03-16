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
//resolve作用主要是pending => resolved
Promise.prototype.resolve = function(value) {
    if (!this.state == 'pending') return;

    this.state = 'fulfilled';
    this.value = value;

}
//reject作用主要是pending => rejected
Promise.prototype.reject = function(value) {
    if (!this.state == 'pending') return;

    this.state = 'rejected';
    this.value = value;
}
//fulfilled,rejected的执行需要异步，then方法需要返回一个新的promise
Promise.prototype.then = function(fulfilled, rejected) {
    if (typeof fulfilled !== 'function' && this.state === 'fulfilled' ||
        typeof rejected !== 'function' && this.state === 'rejected') {
        return this;
    }

    var self = this;
    var promsie = new this.constructor();
    if(fulfilled && typeof fulfilled == 'function' && this.state == 'fulfilled') {
        setTimeout(() => {
            try {
                let result = fulfilled(self.value);
                if (result && typeof result.then == 'function') {
                    
                }
                promise.resolve(result)
            } catch (error) {
                promise.reject(error)
            }
        }, 0);
    }
    if (rejected && typeof rejected == 'function' && this.state == 'rejected') {
        setTimeout(() => {
            try {
                let result = rejected(self.value);
                promise.resolve(result)
            } catch (error) {
                promise.reject(error)
            }
        }, 0);
    }
    return promise
}

var promise = new Promise((resolve,reject)=> {
    console.log(2);
    resolve('haha')
})

promise.then(res => {
    console.log(res)
    return '31'
}).then(res => console.log(res))