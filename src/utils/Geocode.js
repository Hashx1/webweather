const request=require('postman-request')

const Geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?&limit=1&access_token=pk.eyJ1IjoiYWVvdWxzIiwiYSI6ImNra2ZpZWYyNTBpajMybm43bGxoM3Buam4ifQ.baNlhpvZXh3jxF_d2FDDZg'
    
    request({url:url,json:true},(error,response)=>{
   
    if(error)
    {callback('Network service unavailable')
    // console.log(response.body.features[0].center)
    }
    else if(response.body.features.length==0)
    {
        callback('Incorrect input')
    }
    else
        {
         const lat=response.body.features[0].center[1]
        const long=response.body.features[0].center[0]
     callback(undefined,{lat:lat,long:long,loc:address})
    
        }
    })
}

module.exports=Geocode