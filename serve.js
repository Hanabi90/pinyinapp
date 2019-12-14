// const express = require('express')
// const app = express()

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(3000, () => console.log('Example app listening on port 3000!'))

var request = require('request');
    var url="https://aip.baidubce.com/rpc/2.0/nlp/v1/lexer?charset=UTF-8&access_token=24.b277fbcd3b5e17d6ecad50d687b21d3d.2592000.1578838446.282335-18017265";
    var requestData={
        "text":"宝贝是个小流氓"
    };
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "Content-Type": "application/json",
        },
        body: requestData
    }, function(error, response, body) {
        console.log(body)
        // if (!error &amp;&amp; response.statusCode == 200) {
        //     console.log(body) // 请求成功的处理逻辑
        // }
    }); 
// const baike = require('baidu-baike')
// const query = '三体'
// baike(query)
//   .then(res => console.log(JSON.stringify(res)))
//   .catch(err => console.error(err))