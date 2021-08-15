//normal function that returns promsise with resolve and reject
const  foo=(x)=> {
    return new Promise((resolve, reject)=>{
      //usually this is api call and if we get 404?
      if (x<5){  
        resolve('smaller then five')
      }else{
        reject('bigger than five')
      }
    })
  }


  async function foo5(val) {
    if (val < 5) {
      throw new Error('foo5 error < 5')
    } else {
      return 'smaller then five';
    }
  }



  async function callFoo() {
    let v = await foo5(50);
    if (v === 'whatever') {
  
    } else {
      
    }
    return v;
  }
  
  callFoo()
    .catch(err => console.log(err));