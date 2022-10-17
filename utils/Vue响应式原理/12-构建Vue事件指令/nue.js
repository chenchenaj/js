let CompilerUtil = {
    getValue(vm, value){
        return value.split('.').reduce((data, curr) => {
            // 第一次执行： data = $data, curr=time
            // 第二次执行： data=time， curr = h
            return data[curr.trim()]
        }, vm.$data)
    },
    setValue(vm, value, newValue, index, arr){
        return value.split('.').reduce((data, curr) => {
            if(index === arr.length - 1){
                data[curr] = newValue
            }
            return data[curr.trim()]
        }, vm.$data)
    },
    getContent(vm, value){
        let reg = /\{\{(.+?)\}\}/gi
        return value.replace(reg, (...args) => {
            return this.getValue(vm, args[1])
        })
    },
    model: function(node, value, vm){
        // 第二步：在第一次渲染的时候，就给所有的属性添加观察者
        new Watcher(vm, value, (newValue, oldValue)=>{
            node.value = newValue
        })
        node.value = this.getValue(vm, value)

        node.addEventListener('input', (e)=>{
            this.setValue(vm, value, e.target.value)
        })
    },
    html: function(node, value, vm){
        node.innerHTML = this.getValue(vm, value)
    },
    text: function(node, value, vm){
        node.innerText = this.getValue(vm, value)
    },
    content: function(node, value, vm){
        node.textContent = this.getContent(vm, value)
    },
    on: function(node, value, vm, type){
        node.addEventListener(type, (e)=>{
            vm.$methods[value].call(vm, e)
        })
    }
}
class Nue{
    constructor(options){
        // 1.保存创建时候传递过来的数据
        if(this.isElement(options.el)){
            this.$el = options.el;
        }else{
            this.$el = document.querySelector(options.el)
        }
        this.$data = options.data
        this.$methods = options.methods
        // 2.根据指定的区域和数据去编译渲染界面
        if(this.$el){
            // 第一步：给data绑定setter和getter，监听数据的变化
            new Observer(this.$data)
            new Complier(this)
        }
    }
    // 判断是否是一个元素
    isElement(node){
        return node.nodeType === 1
    }
}

class Complier{
    constructor(vm){
        this.vm = vm
        // 1. 将网页上的元素放到内存中
        let fragment = this.node2fragment(this.vm.$el)
        // 2. 利用指定的数据编译内存中的元素
        this.buildTemplate(fragment)
        // 3. 将编译好的内容重新渲染到网页上
        this.vm.$el.appendChild(fragment)
    }
    node2fragment(){
        // 1. 创建一个空的文档碎片对象
        let fragment = document.createDocumentFragment()
        // 2. 编译循取到每一个元素
        let node = app.firstChild;
        while(node){
            // 注意点：只要将元素添加到文档碎片对象中，那么这个元素就会自动从网页上消失
            fragment.appendChild(node)
            node = app.firstChild
        }
        return fragment
    }
    buildTemplate(fragment){
        let nodeList = [...fragment.childNodes]
        nodeList.forEach(node => {
            // 需要判断当前遍历到的节点是一个元素还是一个文本
            // 如果是一个元素，我们需要判断有没有v-model属性
            // 如果是一个文本，我们需要判断有没有{{}}的内容
            if(this.vm.isElement(node)){
                // 是一个元素
                this.buildElement(node)
                // 处理子元素(处理后代)
                this.buildTemplate(node)
            }else{
                // 不是一个元素
                this.buildText(node)
            }
        })
    }
    buildElement(node){
        let attrs = [...node.attributes]
        attrs.forEach(attr => {
            let {name, value} = attr; // => v-model="name" / name: v-model / value: name
            if(name.startsWith('v-')){
                let [directiveName, directiveType] = name.split(':')
                let [_, directive] = directiveName.split('-')
                CompilerUtil[directive](node, value, this.vm, directiveType)
            }
        })
    }
    buildText(node){
        let content = node.textContent;
        let reg = /\{\{.+?\}\}/gi;
        if(reg.test(content)){
            CompilerUtil['content'](node, content, this.vm)
        }
    }
}

class Observer{
    // 只要将需要监听的那个对象传递给Observer这个类，这个类就可以快速的给传入的对象所有属性都添加get/set方法
    constructor(data){
        this.observer(data)
    }
    observer(obj){
        if(obj && typeof obj === 'object'){
            for(let key in obj){
                this.defineReactive(obj, key, obj[key])
            }
        }
    }

    // obj: 需要操作的对象
    // key： 需要新增get/set方法属性
    // value：需要姓曾get/set方法属性的取值
    defineReactive(obj, key, value){
        // ！！！如果属性的取值又是一个对象，那么也需要给这个对象的所有属性添加get/set方法
        this.observer(value)
        // 第三步：将当前属性的所有观察者对象都放到当前属性的发布订阅对象中管理
        let dep = new Dep() // 创建属于当前属性的发布订阅对象
        Object.defineProperty(obj, key, {
            get(){
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue){
                if(value !== newValue){
                    // !!!属性赋值了一个对象，该对象修改属性值
                    value = newValue
                    console.log('监听到数据的变化，需要去更新UI')
                }
            }
        })
    }
}
// 想要实现数据变化之后更新UI界面，我们可以使用发布订阅模式来实现
// 先定义一个观察者类，再定义一个发布订阅类，然后再通过发布订阅的类来管理观察者类
// 订阅发布类
class Dep{
    constructor(){
        // 这个数组就是专门用于管理某个属性所有的观察者对象的
        this.subs = []
    }
    // 订阅观察的方法
    addSub(watcher){
        this.subs.push(watcher)
    }
    // 发布订阅的方法
    notify(){
        this.subs.forEach(item => item.update())
    }
}
// 观察者类
class Watcher{
    constructor(vm, attr, cb){
        this.vm = vm;
        this.attr = attr
        this.cb = cb
        // 在创建观察者对象的时候就去获取当前的旧值
        this.oldValue = this.getOldValue()
    }
    getOldValue(){
        Dep.target = this
        let val =  CompilerUtil.getValue(this.vm, this.attr)
        Dep.target = null
        return val
    }
    // 定义一个更新的方法，用于判断新值和旧值是否相同
    update(){
        let newValue = CompilerUtil.getValue(this.vm, this.attr)
        if(this.oldValue !== newValue){
            this.cb(newValue, this.oldValue)
        }
    }
}
