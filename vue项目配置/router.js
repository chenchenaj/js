// https://www.bilibili.com/video/BV14z411i7JY?p=2 路由进阶
// 动态路由
需要携带参数的路由
// 嵌套路由
含有children的路由
// 命名路由
/**
 * 在vue中跳转
 * <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
 * router.push({ name: 'user', params: { userId: 123 }})
 */
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})

// 命名视图【同时 (同级) 展示多个视图，而不是嵌套展示】，且是 components ，有s
/**
 *  在vue中写
    <router-view class="view one"></router-view>
    <router-view class="view two" name="email"></router-view>
    <router-view class="view three" name="tel"></router-view>
 */
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      components: {
        default: () => import('@/views/child.vue'),
        email: () => import('@/views/email.vue'),
        tel: () => import('@/views/tel.vue')
      }
    }
  ]
})
