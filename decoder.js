//
// 歌词解析
// -------
//
// 输入: 读取标准lrc格式的文本。
// 输出: 返回包含data数据的对象。
// {
//   data: [
//     {
//       time: {number} 时间戳
//       text: {string} 歌词
//     }
//   ]
// }
//
// 注1: 目前只支持单一时间点
// 注2: 非歌词部分会全部略过
//
// Usage:
// const fs = require('fs');
// const decoder = require('./decoder');
// const lrc = fs.readFileSync('./song.lrc', 'utf8');
// const res = decoder(lrc);
// ....
module.exports = function (lrc) {
  const data = [];
  const lines = lrc.match(/[^\n]+/g);
  lines.forEach(l => {
    const res = l.match(/\[\d\d:\d\d.\d{1,3}\]/g);
    if (!res || !res.length) {
      return;
    }

    // 暂支持单一个时间点
    // [01:02.03]
    const str = res[0].substring(1, res[0].length - 1);
    // 01, 02, 03 => (01 * 60 + 02) * 1000 + 03
    let time = 0;
    str.match(/\d{1,3}/g).forEach((val, index) => {
      if (index === 0) {
        time += parseInt(val, 10) * 60 * 1000;
      } else if (index === 1) {
        time += parseInt(val, 10) * 1000;
      } else {
        time += parseInt(val, 10);
      }
    })

    // 歌词
    const text = l.replace(res[0], '');

    data.push({
      time,
      text
    })
  })

  data.sort((a, b) => a.time - b.time);

  // output
  return {
    data
  };
}
