const fs = require('fs');
const path = require('path');
const decoder = require('./decoder');
const lrcName = process.argv[2];

function errorHandler(e) {
  throw new Error(`\n
    准备工作：歌词源文件存放在input目录下，如input\\song.lrc
    用法：在当前目录下运行 node index.js song
    输出：在output目录下可以生成song-lrc.js
  `);
  if (e) {
    console.warn(e);
  }
}

// detect name
if (!lrcName) { errorHandler(); }

try {
  const ori = path.resolve(__dirname, './input/' + lrcName + '.lrc');
  const dst = path.resolve(__dirname, './output/' + lrcName + '-lrc.json');  
  const lrc = fs.readFileSync(ori, 'utf8');
  const res = decoder(lrc);  
  const content = JSON.stringify(res, null, 2);
  fs.writeFileSync(dst, content);
  console.info(`
    [Success] 歌词生成成功！
    已保存在${dst}.
  `)
} catch (e) {
  errorHandler(e);
}
