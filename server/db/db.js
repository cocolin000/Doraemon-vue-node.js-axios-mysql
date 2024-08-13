// 增删改查
// 导入所需的模块 加密 解密 创建密匙
<<<<<<< HEAD
const { encryptText, decryptText, createSecretKey } = require('../utils/passwordUtils');
// 加密密钥（必须是 32 个字符）
const secretKey = "a1c1c2841e31df25d2bfa3f24e6ce05a";
=======
const { encryptText, decryptText, createSecretKey } = require('../utils/passwordUtils.js');
// 加密密钥（必须是 32 个字符）
const secretKey = "11111111111111111111111111111111";
>>>>>>> 4519c79dfb85893d0565eabc8fe3a368b8e02c58

// mysql 连接池配置文件
const mysql = require('mysql');
//引入数据库配置文件
const $sdConfig = require('./dbconfig.js');
//sql语句封装
const sql = require('./sql.js');
//使用连接池，避免开太多的线程
const pool = mysql.createPool($sdConfig);
const json = require('./json.js');
const { query } = require('express');
const code = {
    result: "select",
    data: '',
    msg: '',
    uid: '',
}
/**
 * @description 新增一条数据
 * @param {str} table 数据库表的名称
 * @param {obj} req 插入的数据
 * @param {obj} res 接口函数中的res对象
 * @param {obj} next 接口函数中的next对象
 */
let dbAdd = (table, req, res, next) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            let paramValue = paramList(req);
            connection.query(sql[table].insert, [...paramValue], (err, result) => {
                if (err) {
                    reject(err)
                }
                code.data = result
                json(res, code, err)
                //resolve(result)
                connection.release();
            });
        });
    })
};



// 删除
let dbDelete = (table, req, res, next) => {
    let paramValue = paramList(req);
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql[table].delete, [...paramValue], (err, result) => {
                if (err) {
                    reject(err)
                }
                code.data = result
                json(res, code, err)
                //resolve(result)
                connection.release();
            });
        });
    })
};

//修改
let dbUpdate = (table, req, res, next) => {
    let paramValue = paramList(req);
    // console.log(paramValue)
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql[table].update, [...paramValue], (err, result) => {
                if (err) {
                    reject(err)
                }
                code.data = result
                json(res, code, err)
                //resolve(result)
                connection.release();
            });
        });
    })
};

//查询
let dbQueryById = (table, req, res, next) => {
    let paramValue = paramList(req);
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql[table].queryById, [...paramValue], (err, result) => {
                if (err) {
                    reject(err)
                }
                code.data = result
                json(res, code, err)
                //resolve(result)
                connection.release();
            });
        });
    })
};

//all
let dbQueryAll = (table, req, res, next) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql[table].queryAll, (err, result) => {
                if (err) {
                    reject(err)
                }
                code.data = result
                json(res, code, err)
                //resolve(result)
                connection.release();
            });
        });
    })
};


function addComment(table, req, res, next) {
    let paramValue = paramList(req);
    // console.log(paramValue)
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql[table].insert, [...paramValue], (err, result) => {
                if (err) {
                    reject(err)
                }
                code.data = result
                json(res, code, err)
                //resolve(result)
                connection.release();
            });
        });
    })
}

/**
 * @description 获取一个媒体文件
 * @param {str} table 数据库表的名称
 * @param {obj} req 查询的条件
 * @param {obj} res 接口函数中的res对象
 * @param {obj} next 接口函数中的next对象
 */
let dbMedia = (table, req, res, next) => {
    let Q = { query: sql[table].query };
    code.result = "select"
    if (req.url.includes("person") || req.url.includes("film")) {
        Q.query = sql[table].queryP
    }
    req.size = Number(req.size);
    let paramValue = paramList(req);
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(Q.query, [...paramValue], (err, result) => {
                if (err) {
                    reject(err)
                }
                code.data = result
                json(res, code, err)
                //resolve(result)
                connection.release();
            });
        });
    })
};

/**
 * @description 用户登录操作
 * @param {str} table 数据库表的名称
 * @param {obj} req 用户的账号密码
 * @param {obj} res 接口函数中的res对象
 * @param {obj} next 接口函数中的next对象
 */
let dbUser = async (table, req, res, next) => {
    // 加密密码
    req.pwd = encryptText(req.pwd, secretKey);
    try {
        if (req.state == 1) {
            // 登录操作
            delete req.state;
            code.result = "select";
            const userData = await dbGetUser(table, req, res, next);
            if (userData.length > 0) {
                // 数据库中存在用户数据
                if (req.pwd === userData[0].pwd) {
                    // 密码匹配，登录成功
                    delete userData[0].pwd;
                    code.msg = "登录成功";
                    code.data = userData[0];
                } else {
                    // 密码错误
                    code.msg = "密码错误";
                }
            } else {
                // 用户不存在
                code.msg = "用户名或密码错误";
            }
        } else {
            // 注册操作
            delete req.state;
            code.result = "add";
            const insertedData = await dbAddUser(table, req, res, next);

            code.data = { uid: insertedData.insertId || code.uid, name: req.name };
        }
        json(res, code, code.msg);
    } catch (error) {
        // 处理错误
        json(res, null, error);
    }
};
// 通过name查询
let dbGetUser = (table, req, res, next) => {
    // let paramValue = paramList(req)
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql[table].query, req.name, (err, result) => {
                if (err) {
                    reject(err);
                }
                if(!result)
                return ''
                resolve(result)
                connection.release();
            });
        });
    });
}
//注册用户
let dbAddUser = async (table, req, res, next) => {
    // 查找是否有相同用户名
    const user = await dbGetUser(table, req, res, next)
    if (user != "") {
        code.msg = "用户名已存在"
        code.uid = user[0].uid
        return ''
    }
    //数据校验
    if (typeof req == 'string') {
        code.msg = "数据上传异常"
        return ''
    }

    let paramValue = paramList(req)
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql[table].insert, [...paramValue], (err, result) => {
                if (err) {
                    reject(err)
                }
                code.msg = "注册成功";
                resolve(result)
                connection.release();
            });
        });
    });
}

const dbQueryUser =  (table, req, res, next) => {
    // let paramValue = paramList(req)
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql[table].queryAll, Number(req.pagesize), (err, result) => {
                if (err) {
                    reject(err);
                }
                if(!result)
                return ''
                code.data =result;
                json(res,code,"获取成功")
                connection.release();
            });
        });
    });
}
/**
 * @description 遍历数据的值
 * @param {obj} obj 包含参数的对象
 * */
let paramList = (obj) => {
    let paramArr = [];
    for (let key in obj) {
        if (obj[key]) {
            paramArr.push(obj[key]);
        }
    }
    return paramArr;
};

module.exports = {
    dbAdd,
    dbDelete,
    dbUpdate,
    dbQueryById,
    dbQueryAll,
    dbMedia,
    dbUser,
    dbQueryUser,
    addComment,
}
