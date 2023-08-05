let head= document.getElementsByClassName('head')[0]
let btn= document.getElementById('getstarted')
let span= document.getElementsByClassName('iper')[0]
async function getip(){
    try{
       let temp= await fetch('https://api.ipify.org?format=json')
    let a=  await temp.json()
    console.log(a)
    localStorage.setItem('ip',a.ip)
    span.innerText=`${a.ip}`  
    }
    catch(error){
        console.log('Error:',error)
    }
   
}
btn.addEventListener('click',()=>{
    location.href='./info/index.html'
})
