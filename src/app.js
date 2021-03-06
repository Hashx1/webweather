const express=require('express')
const path=require('path')
const app=express()
const publicDirectoryPath = path.join(__dirname, '../public')
const Viewpath=path.join(__dirname,'../views')
const partialpath=path.join(__dirname,'../views/partials')
const hbs=require('hbs')
const Geocode=require('./utils/Geocode')
app.set('view engine', 'hbs');
hbs.registerPartials(partialpath)
const request=require('postman-request')
const forecast = require('./utils/forecast.js')
//Path for the partial also needs to be registered
const port=process.env.PORT||3000
app.set('views',Viewpath)
//Set up view path so that we can use views in different folder
// app.use(express.static(Indexhtml))
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather forecast",
        Detail:'Use this app to forcast the weather!',
        Name:'NightCode' 
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        Questions:'Is it normal for my cpu to spontaneously combust when i load this website ?  No and yes, if you are protected then this should not be happening.',
        question2:'Does jet fuel melt steal beams? *Sigh* Yes jet fuel can definitely melt steal beams.',
        question3:'Is illuminati real? What even is my life, yes illuminati is real and the earth is flat.',
        question4:'The website is not loading properly for me? Try reloading usually outdate browser is cause of the delays',
        Name:'NightCode' 
    })
})

app.get('/about',(req,res)=>{
    res.render('about',
        {title:'About me',
          Name:'NightCode'  }
     );
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            Error:"Incorrect address has been provided"
        })
    }
    Geocode(req.query.address,(error,{lat,long,loc}={})=>{
        if (error)
        return res.send({error})

        forecast(lat,long,(error,data)=>
        {
            if(error)
            return res.send({error})
            else
            return res.send({
                forecast:data,
                loc,
                address:req.query.address
        }
        )
        })
    })
 
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        info1:"Help Article not found, please click on the help icon for more info"
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:"Invalid search"
        })
    }
    res.send({
        product:[req.query]
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        info1:"Error 404 Page not found",
         Name:'NightCode'
    })
})

app.listen(port,()=>{
    console.log('app started')
})