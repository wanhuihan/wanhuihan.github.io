
### 安装
``` shell
npm install vue-router@4
```
### 引入
使用vue-router 需要创建路由配置文件，然后在项目入口文件注册进去即可。
``` js
// 第一步 创建router.js
import {createRouter, createWebHashHistory} from 'vue-router'

export default createRouter({
    history: createWebHashHistory()
    routes: [
        { 
            path: "/",
            name: "index",
            component: <Test />
        }
        ...
    ]
})

// 第二步 main.js 入口文件
import router from './router.js'
import {createApp} from 'vue'
var app = createApp({})
app.use(router)

```
