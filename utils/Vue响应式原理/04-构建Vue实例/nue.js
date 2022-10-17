class Nue{
    constructor(options){
        debugger
        // 1.保存创建时候传递过来的数据
        if(this.isElement(options.el)){
            this.$el = options.el;
        }else{
            this.$el = document.querySelector(options.el)
        }
        this.$data = options.data
        // 2.根据指定的区域和数据去编译渲染界面
        if(this.$el){
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
    }
}