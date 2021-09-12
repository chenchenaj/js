/**
 * Storage封装
 */
const STORAGE_KEY = 'mall';
export default {
  // 存储值  module_name模块名
  setItem (key, value, module_name) { // 两个值设置同级别的内容{"user":{"name":"ux","age":18}}；三个值：设置某一模块下的内容{"user":{"name":"ux","abc":{"aa":1}}}；
    // 先将模块内容取出
    if (module_name) {
      let val = this.getItem(module_name);
      val[key] = value;
      this.setItem(module_name, val);
    } else {
      let val = this.getStorage();
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },

  // 获取某一个模块下面的属性user下面的userName
  getItem (key, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      if (val) return val[key];
    }
    return this.getStorage()[key];
  },

  getStorage () {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
  },

  // 删除某一模块下的值：两个值：删除同级下的属性值【删除age】；{"user":{"name":"ux","abc":{"aa":1}}}；三个值【删除abc下的aa】：删除同级下某一个模块的内容{"user":{"name":"ux","age":18,"abc":{}}}
  clear (key, module_name) {
    let val = this.getStorage();
    if (module_name) {
      if (!val[module_name]) return;
      delete val[module_name][key];
    } else {
      delete val[key];
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  }
}