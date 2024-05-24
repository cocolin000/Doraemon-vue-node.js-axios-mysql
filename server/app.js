const doraemon = ` _       __     __                             ______           ____                                            
| |     / /__  / /________  ____ ___  ___     /_  __/___       / __ \\____  _________ ____  ____ ___  ____  ____ 
| | /| / / _ \\/ / ___/ __ \\/ __ \`__ \\/ _ \\     / / / __ \\     / / / / __ \\/ ___/ __ \`/ _ \\/ __ \`__ \\/ __ \\/ __ \\
| |/ |/ /  __/ / /__/ /_/ / / / / / /  __/    / / / /_/ /    / /_/ / /_/ / /  / /_/ /  __/ / / / / / /_/ / / / /
|__/|__/\\___/_/\\___/\\____/_/ /_/ /_/\\___/    /_/  \\____/    /_____/\\____/_/   \\__,_/\\___/_/ /_/ /_/\\____/_/ /_/                                                                                                                 
`

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

const words = ['垃圾','恶心','逼','草','尼玛','你妈','大爷']
//添加自定义敏感词汇

function hasBadWord(comment) {
    for (let word of words) {
        if (comment.includes(word)) {
            console.log("存在铭感词汇！")
            return true;
        }
    }
    return false;
}

// 清除评论中的敏感词汇
function cleanBadWord(comment) {
    let cleanedComment = comment;
    return new Promise((resolve, reject) => {
    for (let word of words) {
        cleanedComment = cleanedComment.replace(new RegExp(word, 'g'), '*'.repeat(word.length));
    }
    resolve(cleanedComment);
    })
}

// 创建web服务器
const app = express();


const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = [];

wss.on('connection', function connection(ws) {
  console.log('连接成功');

  // 将连接ws的客户机信息保存
  clients.push(ws);

  // 接收来自客户端的消息并广播出去
  ws.on('message', function incoming(message) {
    // console.log('客户端: %s', message);
    // 广播
    clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // 当客户端断开连接时移除其信息
  ws.on('close', function close() {
    console.log('连接断开');

    // 移除客户端
    clients.splice(clients.indexOf(ws), 1);
  });

  // 返回数据
  ws.send("hello world!");
});

server.listen(8989, function listening() {
  console.log('Server started on port 8989');
});


// 设置静态资源文件夹
app.use('/media', express.static(path.join(__dirname, 'media')));
// 解析客户端请求的body中的内容，内部使用 JSON/url/文件上传 处理
const bodyParser = require('body-parser');
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
// app.listen(8989, () => {
//     console.log('listening successfully http://localhost:8989');
// });

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
    await db.dbQueryAll("comments", "", res, next)
});
// 添加评论
app.post('/addComment', async (req, res, next) => {
        // if(hasBadWord(req.body.comment)){
        //  req.body.comment = await cleanBadWord(req.body.comment)
        // }
    await db.addComment("comments",req.body,res, next);

})

//   获取媒体文件
app.post("/media", async (req, res, next) => {
    await db.dbMedia("media", req.body, res, next)
})

/* 
app.get("/media/img/:filename", (req, res, next) => {
    const options = {
        root: __dirname + "/media/img/",
        headers:{
            'Cache-Control': 'public, max-age=' + 31536000,
            'Expires': new Date(Date.now() + 31536000000).toUTCString(),
        }
    };
    const filename = req.params.filename;
    console.log('图片',filename)
    res.sendFile(filename, options, function(err) {
        console.log("sdf")
        if (err) {
            console.error(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', filename);
        }
    });
}) */
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
    // console.log(req.body);
    await db.dbQueryUser("user", req.body, res, next);
 })
 
 
 //上传文件
  const multer = require('multer');
const { promises } = require('dns');
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
