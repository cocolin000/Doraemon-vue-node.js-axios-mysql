# 你好

> **请务必 将项目内的地址改为自己的地址，不然无法正常运行**

## 项目结构

```
└─doraemon					//根目录
    ├─dist					//前端页面
    │  ├─public				//静态资源文件
    │  └─src				
    │      ├─assets			//静态资源
    │      │  ├─font		//字体
    │      │  ├─img			//图片
    │      │  ├─utils		//工具类
    │      │  └─video		//视频
    │      ├─components     //组件
    │      ├─router			//理由配置
    │      ├─store			//状态管理
    │      │  └─module
    │      └─views			//组件页面
    │          └─pages
    │  ├─css				//css样式
    │  ├─fonts				//字体
    │  ├─img				//本地图片
    │  └─js					//JavaScript代码
    └─server				//后端服务器
        ├─db				//数据库
        ├─media				//媒体文件夹
        │  ├─font			//字体
        │  ├─img			//图片
        │  │  ├─banner		//轮播图
        │  │  ├─film		//动漫封面
        │  │  ├─person		//角色图
        │  │  └─wonderful	//精彩图
        │  └─video			//视频
        └─utils				//工具类
```



## 如何运行项目

分别进入dist和server目录初始化项目

> npm install

运行项目

> npm run serve //前端
>
> node app.js //后端

## 使用的工具及版本

- vue 3.0
- nodejs 16.20
- axios
- mysql 5.7

# 项目演示地址

http://124.71.107.26