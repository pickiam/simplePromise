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

    setTimeout(() => {
        if (!this.onfulfilled) return;
        console.log(5)
        this.onfulfilled();
    }, 0);

}
//reject作用主要是pending => rejected
Promise.prototype.reject = function(value) {
    if (!this.state == 'pending') return;

    this.state = 'rejected';
    this.value = value;
    setTimeout(() => {
        if (!this.onrejected) return;
        this.onrejected();
    }, 0);
}
//fulfilled,rejected的执行需要异步，then方法需要返回一个新的promise
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
                    if (result && result.then == 'function') {
                        result.then(resolve,reject)
                    } else {
                        resolve(result)
                    }
                  
                } catch (error) {
                    reject(error)
                }
            }
            if (that.state === 'pending') {
                that.onfulfilled = onfulfilled;
            } else {
                onfulfilled()
            }
           
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

var promise = new Promise((resolve,reject)=> {
    console.log(2);
    resolve('haha')
})

promise.then(res => {
    return 3
}).then(res => console.log(res))