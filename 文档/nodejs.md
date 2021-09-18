nodejs

实现简单的爬虫

需要初始化项目`npm init -y`

然后npm install `request`和`cheerio`包

```js
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

function getMovies(url) {
    var movieArr = []

    return new Promise((resolve, reject) => {
        request(url, function (err, response, body) {
            //获取HTML document对象  即body参数
            const $ = cheerio.load(body)

            var item = $('.movie-list dd') // 找到的是Node节点的数组
            item.map(function (i, val) {
                var movieObj = {}

                //电影链接
                movieObj.movieLink = $(val).find('.movie-item').children('a').attr('href')
                //电影图片
                movieObj.moviePoster = $(val).find('.movie-poster').children('img').last().attr('data-src')
                //电影 名字
                movieObj.movieTitle = $(val).find('.movie-item-title').children('a').text()
                //电影评分
                movieObj.movieDetail = $(val).find('.channel-detail-orange  i.integer').text()

                //把抓取到的内容 放到数组里面去
                movieArr.push(movieObj)
            })

            //说明 数据获取完毕
            if (movieArr.length >0){
                resolve(movieArr)
            }
        })
    })
}

//获取正在热映电影数据
getMovies('https://maoyan.com/films?showType=1')
    .then((data) => {
        console.log(data)
        // 将数据写入txt中
        fs.writeFile("1.txt", JSON.stringify(data), function(err) { // 将数据写入文件中
            if(err) {
                return console.log(err);
            }
            console.log("File saved successfully!");
        });
    })
```

可以听过F5配置launch.json这个文件对js文件实行debugger

```json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "auto-testing",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\job.js",
        }
    ]
}
```

