


let l = [0,1,2,3,4,5]

let test = [10,9,8,7,6,5]

l.sort(function(a,b){
  return test[a] - test[b]
})

console.log(l);