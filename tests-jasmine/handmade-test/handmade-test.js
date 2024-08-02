import {formatCurrency} from '../../scripts/utils/money.js'



console.log('testSuite: format currency')

console.log('converts value from cents to dollars')
if (formatCurrency(1544) === '15.44'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log('rounds the number before converting')
if (formatCurrency(1544.5) === '15.45'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log('works with 0')
if (formatCurrency(0) === '0.00'){
  console.log('passed');
}else{
  console.log('failed');
}
