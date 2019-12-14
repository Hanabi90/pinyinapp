
const Koa = require('koa');
const request = require('request')
const app = new Koa();
const baike = require('baidu-baike')
var cors = require('koa2-cors');
app.use(cors());
app.use(async(ctx,next)=>{
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Cache-Control', 'no-cache');
    await next();
    if(ctx.url === '/' && ctx.method === 'GET'){
        //显示表单页面
        let html = `
            <h1> KOA2 request post</h1>
            <form method='post' action='/'>
                <p>username:  <input name="username"/></p>
                <p>age:  <input name="age"/></p>
                <p>website:  <input name="website"/></p>
                <input type="submit" />
            </form>
        `;
        ctx.body = html;
    }else if(ctx.url === '/' && ctx.method === 'POST'){
       let postData = await parsePostData(ctx);
       let result = parseQueryStr(postData)
       var requestData=result
       console.log(JSON.parse(postData).text)
        ctx.body = await requesPost({"text":JSON.parse(postData).text})
    }else{
        ctx.body = '<h1>404!</h1>'
    }
});

function requesPost(requestData){
    return new Promise((resolve, reject)=>{
        var url = "https://aip.baidubce.com/rpc/2.0/nlp/v1/lexer?charset=UTF-8&access_token=24.b277fbcd3b5e17d6ecad50d687b21d3d.2592000.1578838446.282335-18017265";
        var option ={
            url: url,
            method: "POST",   //指定请求方法类型：GET, POST
            json: true,
            timeout: 30000,  // 设置请求超时，单位是毫秒  
            headers: {
                "content-type": "application/json",
            },
            body: requestData    // 进行GET请求时，此处的参数一定是qs,请注意，如果是POST请求，参数是form
        }
        request(option, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)   // 返回response的内容
            }else{
                reject(error);   // 返回错误信息
            }
        });
    });
};
// const baike = require('baidu-baike')
const query = '美女'
baike(query)
  .then(res => console.log(JSON.stringify(res)))
  .catch(err => console.error(err))
function parsePostData(ctx){
    return  new Promise((resolve,reject)=>{
        try {
            let postdata = '';
            ctx.req.addListener('data',(data)=>{
                postdata += data;
            });
            ctx.req.on("end",function(){
                resolve(postdata);
            })
        } catch (error) {
            reject(error);
        }
    });
}

function parseQueryStr(queryStr){
    let queryData = {};
    let queryList = queryStr.split('&');
    console.log(queryList.entries())
    for(let [index,queryStr] of queryList.entries()){
        let itemArr = queryStr.split("=");
        queryData[itemArr[0]] = decodeURIComponent(itemArr[1]); //转码
    }
    return queryData;
}

app.listen(3000,()=>{
    console.log("app starting ...")
});