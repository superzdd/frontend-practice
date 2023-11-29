// @ts-nocheck
let VUE_DEBUG = true;

let GlobalTempSubscriber = null;

class Vue {
    constructor(instance) {
        let self = this;
        this.$data = instance.data;
        this.$publishers = [];
        dataBinding(this.$data, self); // 双向绑定(数据劫持)，使用set,get进行
        Compile(instance.el, self);

        console.log(`${strDash()} Vue init Success ${strDash()}`);

        if (VUE_DEBUG) {
            window.$vueIns = this;
            console.log(`Vue: Type in window.$vueIns to get more about Vue`);
        }
    }

    addPublisher(publisher) {
        this.$publishers.push(publisher);
    }

    addSubByKey(key, sub) {
        this.$publishers.forEach((pub) => {
            pub.addSub(key, sub);
        });
    }

    notifyByKey(key) {
        this.$publishers.forEach((pub) => {
            pub.notify(key);
        });
    }
}

// 虚拟DOM页面渲染
function Compile(element, vm) {
    vm.$el = document.querySelector(element);
    const fragment = document.createDocumentFragment();
    console.log(`${strDash()} Vue Compile ${strDash()}`);

    if (!vm.$el) {
        console.log(`Vue Compile ERROR!! Can not get element, funcion quit`);
        return;
    }

    console.log(vm.$el.childNodes);

    if (VUE_DEBUG) {
        window.$el = vm.$el;
        console.log(`Vue Compile: Type in window.$el to get more information`);
    }

    let child;
    while ((child = vm.$el.firstChild)) {
        // 为什么是循环firstChild?因为在后续append操作中，fragment会从$el中抢走child
        fragment.append(child);
        console.log(
            `fragment add child success,${vm.$el.childNodes.length} remains`
        );
    }

    fragment_compile(fragment); // 阻止VDom
    vm.$el.appendChild(fragment); // 将VDom渲染到DOM上

    console.log(`Vue Compile render finished!`);

    function fragment_compile(node) {
        const pattern = /\{\{\s*(\S+)\s*\}\}/; // 匹配 {{ 字符串 }}，替换为$data中的数据
        const originNodeValue = node.nodeValue;

        if (node.nodeType != 3) {
            node.childNodes.forEach((node) => fragment_compile(node));
            return;
        }

        const result_regex = pattern.exec(originNodeValue);
        if (result_regex) {
            const arrProp = result_regex[1].split('.');

            let dataVal = arrProp.reduce(
                (val, currentProp) => val[currentProp],
                vm.$data
            );

            node.nodeValue = originNodeValue.replace(pattern, dataVal);

            // 创建订阅者
            new Subscriber(vm, result_regex[1], (newVal) => {
                node.nodeValue = originNodeValue.replace(dataVal, newVal);
            });

            console.log(
                `fragment_compile node: ${originNodeValue}, val in data: ${dataVal}`
            );
        }
    }
}

// Vue类
function dataBinding(data_instance, vm, parentKey = '') {
    // 递归返回出口，如果data_instance不是Object类型的，比如一些基础类型，那不用做绑定了。
    // 这个data_instance的父级会做好绑定的
    if (!isObject(data_instance)) return;

    // 遍历data_instance，将其中每个属性（包括子属性）都进行数据绑定
    Object.keys(data_instance).forEach((key) => {
        let val = data_instance[key]; // value init
        let parentKey = parentKey ? parentKey + '.' + key : ''; // parent key init
        const publisher = new Publisher(parentKey, vm);
        dataBinding(data_instance[key], vm, parentKey);
        Object.defineProperty(data_instance, key, {
            enumerable: true, // 是否可枚举，默认为 false
            configurable: true, // 是否可配置，默认为 false
            get: function () {
                console.log(`[GET] data: ${key}, val: ${val}`);
                return val;
            },
            set: function (new_val) {
                console.log(`[SET] data: ${key}, val: ${new_val}`);
                val = new_val;

                publisher.notify(); // 发布者通知所有监听节点修改实例
                dataBinding(val, vm, parentKey); // 在改写变量后，为以防新对象是一个object类型，所以在这个地方，要将对象重新dataBinding操作
            },
        });
    });
}

// 发布订阅模式

/**
 * Publisher
 * 对于$data里的每一个数据，只要产生set,那就有一个新的发布者
 * 该发布者负责监听其data的变化，一旦变化，需要通知所有监听其变化的订阅者
 */
class Publisher {
    constructor(key, vm) {
        this.key = key;
        this.subscribers = [];
        this.vm = vm;
        this.vm.addPublisher(this);
    }

    addSub(key, sub) {
        if (key != this.key) return;
        this.subscribers.push(sub);
    }

    notify(key) {
        if (key != this.key) return;
        this.subscribers.forEach((sub) => sub.update());
    }
}

// 订阅者
class Subscriber {
    constructor(vm, key, callback) {
        this.vm = vm;
        this.key = key;
        this.callback = callback;

        // 临时属性 - 触发getter
        console.log(
            `${strDoubleDash()} Subscriber 触发 getter ${strDoubleDash()}`
        );

        key.split('.').reduce((total, current) => total[current], vm.$data);

        GlobalTempSubscriber = this;
    }

    update() {
        this.callback();
    }
}
