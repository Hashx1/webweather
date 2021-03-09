

const Webf=document.querySelector('#f1')
const v=document.querySelector('#f2')
const vwarn=document.querySelector('#f3')
const voutput=document.querySelector('#f4')

Webf.addEventListener('submit',(e)=>{
    e.preventDefault()
      vwarn.textContent='Loading...'
    if((v.value).trim()=='')
    return vwarn.textContent='Enter a valid input'
    fetch('/weather?address='+v.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
            return     vwarn.textContent=data.error
            }
            vwarn.textContent='Location: '+data.loc 
            voutput.textContent='Forcast: '+data.forecast
            console.log(data.forecast)
            console.log(data.loc)
        })
    })
})