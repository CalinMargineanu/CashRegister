function checkCashRegister(price, cash, cid) {
  const currency = [
  { name: "ONE HUNDRED", val: 100 },
  { name: "TWENTY", val: 20 },
  { name: "TEN", val: 10 },
  { name: "FIVE", val: 5 },
  { name: "ONE", val: 1 },
  { name: "QUARTER", val: 0.25 },
  { name: "DIME", val: 0.1 },
  { name: "NICKEL", val: 0.05 },
  { name: "PENNY", val: 0.01 }]

  const output = {
    status: null, 
    change: []
  }

  let change = cash - price
  const cashRegister = cid.reduce((obj, curr) => {
    obj.total += curr[1]
    obj[curr[0]] = curr[1]
    return obj
  }, 
  {
    total: 0
  })

  console.log(cashRegister)

  if (cashRegister.total === change) {
    output.status = 'CLOSED'
    output.change = cid
    return output
  }
  if (cashRegister.total < change) {
    output.status = 'INSUFFICIENT_FUNDS'
    return output
  }

  const change_arr = currency.reduce((arr, curr) => {
    let value = 0
    while (cashRegister[curr.name] > 0 && change >= curr.val) {
      change -= curr.val
      cashRegister[curr.name] -= curr.val
      value += curr.val
      change = Math.round(change * 100) / 100
    }
    if (value > 0) {
      arr.push([curr.name, value])
    }
    return arr
  }, [])

  if (change_arr.length < 1 || change > 0) {
    output.status = 'INSUFFICIENT_FUNDS'
    return output
  }

  output.status = 'OPEN'
  output.change = change_arr

  return output;
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
