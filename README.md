# lrc-decoder
> 歌词解析模块 decode lrc to json

## [ USAGE ]

### Output json file

1. put lrc file in the 'input' folder
ex: /input/test.lrc

2. run command with your file name:
```bash
  // example
  node index.js test
```

3. you can find output file 'test-lrc.json' in the 'output' folder

### Use as modules

```javascript
// import modules
import decoder from './decoder';
// get your lrc content(string)
const lrc = '[00:04.64]Lorem ipsum dolor sit amet';
// output
const ouputJson = decoder(lrc)
```