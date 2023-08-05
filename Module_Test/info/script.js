let lat=document.getElementsByClassName('lat')[0]
let long=document.getElementsByClassName('long')[0]
let city=document.getElementsByClassName('city')[0]
let org=document.getElementsByClassName('org')[0]
let region=document.getElementsByClassName('region')[0]
let hostname=document.getElementsByClassName('hostname')[0]
let t=document.getElementsByClassName('top')[0]
let section1= document.getElementById('s1')
let section2= document.getElementById('s2')
let section3= document.getElementById('s3')
let section4= document.getElementById('s4')
let timezone=document.getElementsByClassName('timezone')[0]
let dateandtime= document.getElementsByClassName('dateandtime')[0]
let pincode= document.getElementsByClassName('pincode')[0]
let recmes= document.getElementsByClassName('recmes')[0]
let postalcont= document.getElementsByClassName('postalcont')[0]
let postaloffices=[]
let input=document.getElementsByTagName('input')[0]
let span=document.getElementsByClassName('iper')[0]
if(!localStorage.getItem('ip')){
    location.href='../index.html'
}
 async function  getdata(){
    try{
      let temp= await fetch(`https://ipinfo.io/${localStorage.getItem('ip')}?token=5bf5603e34b155`)
    let a= await temp.json()
    console.log(a)
    populategendata(a)  
    }
    catch(error){
        console.log('Error:',error)
    }
}
function populategendata(obj){
span.innerText=`${localStorage.getItem('ip')}`    
let split=obj.loc.split(',')    
lat.innerText=`Lat: ${split[0]}`
long.innerText=`Long: ${split[1]}`
city.innerText=`City: ${obj.city}`
region.innerText=`Region: ${obj.region}`
org.innerText=`Organisation: ${obj.org}`
hostname.innerText=`HostName: ${obj.hostname}`
addembed(split,obj)
}
function addembed(split,obj){
let temp = document.createElement('iframe')
temp.src=`https://maps.google.com/maps?q=${split[0]},${split[1]}&output=embed`
section2.append(temp)
getpostoffice(split,obj)
}
async function getpostoffice(split,obj){
    try{
        let temp=await fetch(`https://api.postalpincode.in/pincode/${obj.postal}`)
        let a = await temp.json()
        console.log(a)
        populatepost(split,obj,a[0])
    }
    catch(error){
        console.log('Error:',error)
        postalcont.innerText='No records found'
    }
}
function populatepost(split,obj1,obj2){
timezone.innerText=`Time Zone: ${obj1.timezone}`
dateandtime.innerText=`Date and Time: ${new Date().toLocaleString("en-US", { timeZone: `${obj1.timezone}` })}`
pincode.innerText=`Pincode: ${obj1.postal}`
recmes.innerText=`Message: ${obj2.Message}`
postaloffices=JSON.parse(JSON.stringify(obj2.PostOffice))
finalpopulate(postaloffices)
}
function finalpopulate(arr){
    postalcont.innerHTML=``
for(let i=0;i<arr.length;i++){
    let temp=document.createElement('div')
    temp.className='postalcard'
    temp.innerHTML=`
    <div>Name : ${arr[i].Name}</div>
    <div>Branch Type : ${arr[i].BranchType}</div>
    <div>Delivery Status : ${arr[i].DeliveryStatus}</div>
    <div>District : ${arr[i].District}</div>
    <div>Divison : ${arr[i].Division}</div>
    `
    postalcont.append(temp)
}
}

input.addEventListener('input',()=>{
    let val= input.value.toUpperCase().trim()
    let res= postaloffices.filter(element=>{
        return element.Name.toUpperCase().includes(val) || element.BranchType.toUpperCase().includes(val)
    })
    finalpopulate(res)
})