// @ts-nocheck
const VUE_DEBUG = true;

class Vue {
    /**
     * 实例化一个Vue对象
     * @param {Ojbect} instance - Vue参数json, {el:'#app',data:{}}
     */
    constructor(instance) {
        let self = this;
        this.$data = instance.data;
        this.$notifyManager = new NotifyManager(self); // 发布订阅管理器

        // 进行数据双向绑定：不论dom端还是代码端触发的修改，都会通知到另一端
        // 其实最终是单向的，是data-dom
        // 1. 实现 data -> dom
        // 2. 实现 dom  -> data

        this.dataBinding(this.$data, self); // data -> dom

        // dom -> data
        // Compile(instance.el, self);
        this.vDOM = new VueDOMCompile(instance.el, self);
        this.vDOM.renderDOM();

        console.log(`${strDash()} Vue init Success ${strDash()}`);

        if (VUE_DEBUG) {
            window.$vueIns = this;
            console.log(`Vue: Type in window.$vueIns to get more about Vue`);
        }
    }

    /**
     * Vue数据劫持
     * @param {Object} data_instance - vue.$data数据
     * @param {Vue} vm - Vue实例
     * @param {string} parentKey - Key属性链，比如a.b.c
     * @returns
     */
    dataBinding(data_instance, vm, parentKey = '') {
        // 递归返回出口，如果data_instance不是Object类型的，比如一些基础类型，那不用做绑定了。
        // 这个data_instance的父级会做好绑定的
        if (!isObject(data_instance)) return;

        // 遍历data_instance，将其中每个属性（包括子属性）都进行数据绑定
        Object.keys(data_instance).forEach((key) => {
            let val = data_instance[key]; // 将数据值封装到内部变量进行存储
            let fullKey = parentKey + (parentKey === '' ? '' : '.') + key; // 拼装key属性链

            vm.dataBinding(data_instance[key], vm, fullKey); // 调用自身进行递归

            // 在Vue3中，切换为了Proxy
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

                    // 这句话是实现 data -> dom的关键，通知所有页面dom节点进行修改
                    vm.$notifyManager.notifyByKey(fullKey, new_val); // 发布者通知所有监听节点修改实例

                    // 在改写变量后，为以防新对象是一个object类型，所以在这个地方，要将对象重新dataBinding操作
                    vm.dataBinding(val, vm, fullKey);
                },
            });
        });
    }
}

/**
 * 虚拟DOM页面渲染，将页面中所有的标签先放入缓存中编译，编译完成后再释放给HTML
 * @param {string} element - html中绑定的Vue容器ID，注意需要前面加#
 * @param {Vue} vm - Vue实例
 * @returns
 */
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

        if (node.nodeType === 3) {
            const result_regex = pattern.exec(originNodeValue);
            if (result_regex) {
                const arrProp = result_regex[1].split('.');

                let dataVal = arrProp.reduce(
                    (val, currentProp) => val[currentProp],
                    vm.$data
                );

                node.nodeValue = originNodeValue.replace(pattern, dataVal);

                // 创建订阅者
                vm.$notifyManager.newSub(result_regex[1], (newVal) => {
                    node.nodeValue = originNodeValue.replace(pattern, newVal);
                });

                console.log(
                    `fragment_compile node: ${originNodeValue}, val in data: ${dataVal}`
                );
            }
        }

        if (node.nodeType === 1 && node.nodeName === 'INPUT') {
            const attr = node.attributes;
            console.log(`${strDoubleDash()} INPUT ${strDoubleDash()}`);
            // console.log(attr);

            if (attr.hasOwnProperty('v-model')) {
                let originNodeValue = attr['v-model'].nodeValue;

                let valueFromData = originNodeValue
                    .split('.')
                    .reduce((val, currentProp) => val[currentProp], vm.$data);

                // attr['v-model'].nodeValue = valueFromData;
                node.value = valueFromData;

                // 创建订阅者
                vm.$notifyManager.newSub(originNodeValue, (newVal) => {
                    // attr['v-model'].nodeValue = newVal;
                    node.value = newVal;
                });

                node.addEventListener('input', (e) => {
                    const name = node.nodeValue;
                    console.log(name);

                    let count = 0;
                    let array = originNodeValue.split('.');
                    array.reduce((val, currentProp) => {
                        count++;
                        if (count == array.length) {
                            val[currentProp] = e.target.value;
                        }
                        return val[currentProp];
                    }, vm.$data);
                });
            }
        }

        node.childNodes.forEach((node) => fragment_compile(node));
    }
}
