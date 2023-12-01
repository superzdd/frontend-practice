/**
 * 发布订阅管理器
 */
class NotifyManager {
    /**
     * 发布订阅管理器
     * @param {Vue} vm - vue对象实例
     */
    constructor(vm) {
        this.vm = vm;
        this.publishers = [];
    }

    /**
     * 发布者通知订阅者更新数据
     * @param {string} key - data数据名，类似与a.b.c
     * @param {Object} newVal - 新数据值
     */
    notifyByKey(key, newVal) {
        this.publishers.forEach((pub) => {
            if (pub.key === key) {
                pub.notify(newVal);
            }
        });
    }

    /**
     * 获取/新建发布者
     * @param {string} key - data数据名，类似与a.b.c
     * @returns {Publisher}
     */
    newPublisher(key) {
        const publisher = this.getPublisher(key);
        if (publisher) return publisher;

        let newPublisher = new Publisher(key);
        this.publishers.push(newPublisher);

        return newPublisher;
    }

    /**
     * 获取发布者
     * @param {string} key - data数据名，类似与a.b.c
     * @returns
     */
    getPublisher(key) {
        const publisher = this.publishers.find((pub) => pub.key === key);
        return publisher ? publisher : null;
    }

    /**
     * 新建订阅者
     * @param {string} key - data数据名，类似与a.b.c
     * @param {function} callback - data更新的回调函数
     */
    newSub(key, callback) {
        const sub = new Subscriber(key, callback);
        const publisher = this.newPublisher(key);
        publisher.addSub(sub);
    }
}

/**
 * Publisher
 * 发布者：
 * 对于$data里的一个数据进行监听，只要触发set方法，该发布者会将这个变化通知给所有订阅者
 */
class Publisher {
    constructor(key) {
        this.key = key;
        this.subscribers = [];
    }

    addSub(sub) {
        // if (key != this.key) return;
        this.subscribers.push(sub);
    }

    notify(newVal) {
        // if (key != this.key) return;
        this.subscribers.forEach((sub) => sub.update(newVal));
    }
}

/**
 * 订阅者
 */
class Subscriber {
    constructor(key, callback) {
        this.key = key;
        this.callback = callback;
    }

    update(newVal) {
        this.callback(newVal);
    }
}
