/**
 * Created by Walker on 2020/05/06.
 * 消息请求响应
 */

// 封装接送模块
const json = function (res, result, err) {
  // console.log(result)
  let  response = {
      code: "200",
      msg: "",
      data: null
  };

  if (err === "用户名已存在") {
      response.code = "300";
      response.msg = "操作失败:" + err;
  } else if (result && result.result === "add") {
      response.msg = result.msg;
      response.data = result.data;
  } else if (result && result.result === "delete") {
      response.msg = "删除成功";
  } else if (result && result.result === "update") {
      response.msg = "更改成功";
  } else if (result && result.result === "select") {
      response.msg = result.msg;
      response.data = result.data;
  } else if (result && result.result === "selectall") {
      response.msg = "全部查找成功";
      response.data = result.data;
  } else {
      response = result;
  }

  res.json(response);
};

module.exports = json;