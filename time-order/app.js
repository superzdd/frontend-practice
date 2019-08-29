function test () {
    console.log('start')
     setTimeout(() => {
         console.log('children2')
         Promise.resolve().then(() => {console.log('children2-1')})
     }, 0)
     setTimeout(() => {
         console.log('children3')
         Promise.resolve().then(() => {console.log('children3-1')})
     }, 0)
     Promise.resolve().then(() => {console.log('children1')})
     console.log('end') 
 }
 
 test()
// 这里有一点很重要，就是node版本在11以下和11以上（包含11）的输出不一样
// 下面这个输出，node版本为10.15.3
 /**
  * 
start
end
children1
children2
children3
children2-1
children3-1
  */