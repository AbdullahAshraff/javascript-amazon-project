import {formatCurrency} from '../../scripts/utils/money.js'


describe('test suite: format currency', ()=>{
  
  it('converts cents to dollars', ()=>{
    expect(formatCurrency(2394)).toEqual('23.94');
  })

  it('works with zero', ()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  })

  it('rounds well when converting', ()=>{
    expect(formatCurrency(2394.5)).toEqual('23.95');
  })
})
