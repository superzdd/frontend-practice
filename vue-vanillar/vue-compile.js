/**
 * VDOM对象
 */
class VueDOMCompile {
    /**
     * VDOM，将DOM元素放到缓存中先编译（替换某些文档内容），再还给DOM渲染
     * @param {string} domElement - html中绑定的Vue容器ID，注意需要前面加#
     * @param {*} vm - Vue实例
     */
    constructor(domElement, vm) {
        let self = this;
        this.dom = document.querySelector(domElement);
        if (!this.dom) {
            console.log(
                `Vue Compile ERROR!! Can not get element, funcion quit`
            );
            return;
        }

        this.vm = vm;
        this.vDom = this.load(self.dom);
        this.vDomCompile(self.vDom, self.vm);
    }

    load(dom) {
        let fragment = document.createDocumentFragment();
        while (dom.firstChild) {
            // 为什么是循环firstChild?因为在后续append操作中，fragment会从el中抢走child
            fragment.append(dom.firstChild);
        }

        return fragment;
    }

    renderDOM() {
        this.dom.appendChild(this.vDom); // 将VDom渲染到DOM上
    }

    vDomCompile(vDom, vm) {
        if (vDom.nodeType === 3) {
            this.compileText(vDom, vm);
        }

        if (vDom.nodeType === 1 && vDom.nodeName === 'INPUT') {
            this.compileInput(vDom, vm);
        }

        vDom.childNodes.forEach((vNode) => this.vDomCompile(vNode, vm));
    }

    compileText(vNode, vm) {
        const originNodeValue = vNode.nodeValue;
        const pattern = /\{\{\s*(\S+)\s*\}\}/; // 匹配 {{ 字符串 }}，替换为$data中的数据
        const result_regex = pattern.exec(originNodeValue);

        if (!result_regex) return;

        const key = result_regex[1];
        const arrProp = key.split('.');

        let dataVal = arrProp.reduce(
            (val, currentProp) => val[currentProp],
            vm.$data
        );

        vNode.nodeValue = originNodeValue.replace(pattern, dataVal);

        // 创建订阅者
        vm.$notifyManager.newSub(key, (newVal) => {
            vNode.nodeValue = originNodeValue.replace(pattern, newVal);
        });
    }

    compileInput(vNode, vm) {
        const attr = vNode.attributes;

        if (!attr.hasOwnProperty('v-model')) return;

        let originNodeValue = attr['v-model'].nodeValue;

        vNode.value = originNodeValue
            .split('.')
            .reduce((val, currentProp) => val[currentProp], vm.$data);

        // 创建订阅者
        vm.$notifyManager.newSub(originNodeValue, (newVal) => {
            vNode.value = newVal;
        });

        // 添加监听器，监听input的change事件
        vNode.addEventListener('input', (e) => {
            const array = originNodeValue.split('.');
            const lastProp = array.pop();
            array.reduce((val, currentProp) => val[currentProp], vm.$data)[
                lastProp
            ] = e.target.value;
        });
    }
}
