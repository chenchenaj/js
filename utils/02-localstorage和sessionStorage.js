getItem:
JSON.parse(sessionStorage.getItem('user') || '[]')

setItem:
sessionStorage.setItem('token_key', JSON.stringify(token))

removeItem:
sessionStorage.removeItem('token_key')

判断对象是否有值:
Object.keys(user).length > 0
JSON.stringify(this.errors) !== '{}'

判断数组是否有值:
arr.length > 0