/** 
 * 通过toLocaleString 转化
 * @param { number } amount 金额数值
 * @param { number } decimal 小数点后保留位数
 * @param { string } symbol 货币单位
*/

/** 
 * 解决toFixed() 精度问题
*/
export const formatToFixed = (amount: number, decimal: number = 2) => {
  return ((parseFloat(amount.toString()) + Number.EPSILON) * Math.pow(10, decimal) / Math.pow(10, decimal)).toFixed(decimal);
  // return ((Math.round(parseFloat(amount) + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal);
}

export const formatFloat = (amount: number, decimal: number = 2) => {
  return parseFloat(formatToFixed(amount, decimal));
}

/** 返回千分位处理后的金额字符串 */
export const formatMoneyAmount = (amount: number, decimal: number = 2) => {
  return parseFloat(formatToFixed(amount, decimal)).toLocaleString('zh', { maximumFractionDigits: decimal, useGrouping: true });
}

/** 返回带有货币单位的金额字符串 */
export const formatMoneyAmountLocale = (amount: number, decimal: number = 2, symbol?: string) => {
  return `${symbol} ${ parseFloat(formatToFixed(amount, decimal)).toLocaleString('zh', { maximumFractionDigits: decimal, useGrouping: true }) }`; 
}

/** 返回带有单位的金额字符串 */
export const formatMoneyAmountLocaleConfig = (amount: number, decimal: number = 2) => {
  return amount.toLocaleString('zh', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: decimal,
    useGrouping: true, //是否使用千分位符
  });
}

/** 
 * 正则表达式解决金额千分位
 * @param { number } amount
 * @param { number } decimal
 * @param { string } symbol
 * 
*/
export const formatMoneyAmountRegExp = (amount: number, decimal: number = 2) => {
  return formatToFixed(amount, decimal).replace(/\B(?=(\d{3})+\b)/g, ',')
}

/** 返回带有货币单位的千分位金额 */
export const formatMoneyAmountWithSymbolRegExp = (amount: number, decimal: number = 2, symbol?: string) => {
  return formatToFixed(amount, decimal).replace(/\B(?=(\d{3})+\b)/g, ',').replace(/\^/, `${ symbol }`);
}


/**
 * new Intl 构造器的方法 NumberFormat
 * @param amount 
 * @param decimal 
 */
export const formatMoneyAmountIntl = (amount: number, symbol?: string) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency', // 货币形式
    currency: 'CNY', //人民币
    currencyDisplay: symbol || '' // 货币符号
  }).format(amount);
}

/** 美元 */
export const formatMoneyAmountIntlUSD = (amount: number, symbol?: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', // 货币形式
    currency: 'USD', //人民币
    currencyDisplay: symbol || 'symbol', // 货币符号
    useGrouping: true,
  }).format(amount);
}