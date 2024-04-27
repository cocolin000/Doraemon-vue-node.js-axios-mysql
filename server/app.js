const fs = require('fs');
// 引入 js-shortid 
const shortid = require('js-shortid');
//配置参数
const inst = shortid.inst({
    salts: 4,
    initTime: Date.now()
})
// 引入db
const db = require('./db/db');
// 引入path
let path = require('path')
// 引入express
const express = require('express');

// 创建web服务器
const app = express();


// 设置静态资源文件夹
app.use('/media', express.static(path.join(__dirname, 'media')));
// 解析客户端请求的body中的内容，内部使用 JSON/url/文件上传 处理
const bodyParser = require('body-parser');
const e = require('express');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//设置CORS域跨域访问
app.all('*', function (req, res, next) {
    const allowedOrigins = ['http://localhost:8080',"http://192.168.251.219:8080","*"];
    const allowedMethods = ['GET', 'POST'];
    const allowedHeaders = ['Content-Type', 'Authorization'];

    // const origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

//服务器被访问
app.use((req, res, next) => {
    console.log(req.url,req.id,req.method, "访问");
    next();
});

// 通过app.listen 进行服务器配置，接受两个配置参数，端口号，启动成功的回执函数
app.listen(8989, () => {
    console.log('listening successfully http://localhost:8989');
});

//设置响应接口
app.get('/', (req, res) => {
    res.send('<div>'+req.ip + "----" + inst.gen() + '</div>')
});
//添加
app.post('/add', async (req, res, next) => {
    await db.dbAdd("user", req.body, res, next)
})
//删除
app.post('/delete', async (req, res, next) => {
    await db.dbDelete("user", req.body, res, next)
})
//修改
app.post('/update', async (req, res, next) => {
    await db.dbUpdate("user", req.body, res, next)
})
//查询一个
app.post('/queryById', async (req, res, next) => {
    await db.dbQueryById("user", req.body, res, next)
})
//查询所有
app.get("/queryAll", async (req, res, next) => {
    await db.dbQueryAll("test", "", res, next)
});

//   获取媒体文件
app.post("/media", async (req, res, next) => {
    await db.dbMedia("media", req.body, res, next)
})

// req数据参数
/* 
    req.body{
        name:"",
        pwd:"",
        state:"",查询还是添加
    }
*/
// 密码验证登录
app.post("/login", async (req, res, next) => {
   await db.dbUser("user", req.body, res, next);
})

app.post('/queryUall',async (req, res, next) => {
    console.log(req.body);
    await db.dbQueryUser("user", req.body, res, next);
 })
 
 
 //上传文件
  const multer = require('multer');
//  ceshi
// 配置 Multer 中间件
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'uploads/');
    },
    filename: function (req, file, cb) {
     let fileOriginalName = Buffer.from(file.originalname, 'latin1').toString('utf-8');
        cb(null, fileOriginalName);
    }
});

const upload = multer({ storage: storage });

// 处理文件上传的路由
app.post('/upload', upload.single('file'), (req, res) => {
	if (!req.file) {
        return res.status(400).send('未选择文件');
    }

    res.send('文件上传成功');
});


app.get('/fpath',async (req,res)=>{
	res.send(JSON.stringify(await getAllFiles(__dirname+'/media'), null, 2))
});
// 递归地获取文件夹内的所有文件，返回树状结构的路径
async function getAllFiles(folderPath) {
    try {
        const files = await fs.promises.readdir(folderPath); // 使用异步方法读取文件夹内容

        let result = {
            path: folderPath,
            type: 'folder',
            children: []
        };

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            try {
                const stats = await fs.promises.stat(filePath); // 使用异步方法获取文件/文件夹信息

                if (stats.isFile()) {
                    result.children.push({
                        path: filePath,
                        type: 'file'
                    });
                } else if (stats.isDirectory()) {
                    const nestedFiles = await getAllFiles(filePath); // 递归调用该函数
                    result.children.push(nestedFiles); // 将递归结果添加到子文件夹列表中
                }
            } catch (error) {
                console.error(`Error while getting file stats for ${filePath}:`, error);
            }
        }

        return result;
    } catch (error) {
        console.error(`Error while reading folder ${folderPath}:`, error);
        return null;
    }
}
