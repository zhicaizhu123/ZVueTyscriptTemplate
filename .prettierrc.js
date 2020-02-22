module.exports = {
  trailingComma: 'all', // 对象最后一个元素后面尾随逗号
  printWidth: 100, // 每行不能超过100个字符换行
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed', // 对象key必须是才添加引号
  tailingComma: 'all',
  bracketSpacing: true, // 对象左右必须空格隔开
  jsxSingleQuote: true, // jsx闭合元素不需要双元素
  jsxBracketSameLine: false, // 将>多行JSX元素的放在最后一行的末尾，而不是一个放在下一行（不适用于自闭元素
  arrowParens: 'avoid', // 箭头函数只有一个参数不需要括号
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: false, // 不要缩进Vue文件中的脚本和样式标签
  endOfLine: 'auto',
}
