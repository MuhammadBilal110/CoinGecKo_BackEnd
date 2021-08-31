const mongoose = require("mongoose");
const express = require("express");
const app = express();
const request = require('request');
const bodyParser = require("body-parser");
const schedule = require('node-schedule')
require('./Model/User');
require('./Model/candies');
require('./Model/Portfolio')
require('./Model/coins')
app.use(bodyParser.json());
const rp = require('request-promise');
const { response } = require("express");
// app.use(express.urlencoded({extended: true}));
// app.use(express.json()) // To parse the incoming requests with JSON payloads

const UserX = mongoose.model("USERS")
const candyx = mongoose.model("candies")
const Portfoliox = mongoose.model("Portfolio")
const coinsx = mongoose.model("coins")
//const coins=mongoose.model("coins")

app.get('/con/api', async (req, res) => {

    try {
        const requestOptions = {
            method: 'GET',
            uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
            qs: {
                'start': '1',
                'limit': '500',
               // 'category': 'all',
                'convert': 'USD'
            },
            headers: {
                'Accepts': 'application/json',
                'X-CMC_PRO_API_KEY': '7d52b1b7-ac75-4483-98f3-c3eac8c9670f'

            },
            json: true,
            gzip: true
        };
        rp(requestOptions).then(response => {
            console.log('API call response:', response);
            res.send(response)
        }).catch((err) => {
            console.log('API call error:', err.message);
        });

    }
    catch (error) {
        res.status(500)
    }
})


var btc = 0;
schedule.scheduleJob('*/1 * * * * *', () => {

    console.log(btc)
    btc++
})


app.get('/coinlinks/api', async (req, res) => {

    try {
        const requestOptions = {
            method: 'GET',
            uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
            qs: {
                'id': '1,2,3,4,5,6,7'
               
            },
            headers: {
                'Accepts': 'application/json',
                'X-CMC_PRO_API_KEY': '7d52b1b7-ac75-4483-98f3-c3eac8c9670f'

            },
            json: true,
            gzip: true
        };
        rp(requestOptions).then(response => {
            //console.log('API call response:', response);
            res.send(response)
        }).catch((err) => {
            console.log('API call error:', err.message);
        });

    }
    catch (error) {
        res.status(500)
    }
})


// app.post('/candies/api', async (req, res) => {
//     try {
//         const candies = new candy();
//         candies.Totalcandies="100";
//         candies.day1=false;
//         candies.day2=false;
//         candies.day3=true;
//         candies.day4=false;
//         candies.day5=false;
//         candies.day6=false;
//         candies.day7=false;
//         await user.save();
//         res.send(user);

//     }
//     catch (error) {
//         res.status(500)
//     }
// })
// app.put('/apiPut/:putid', async (req, res) => {
//     try {
//         const user = await UserX.findByIdAndUpdate({
//             _id:req.params.putid
//         },req.body,{
//             new:true
//         });

//         res.send(user)
//     }
//     catch (error) {
//         res.status(500)

//     }
// })



// app.get('/api/:getid', async (req, res) => {
//     try {
//         const user = await UserX.find({_id:req.params.getid})
//         res.send(user)
//     }
//     catch (error) {
//         res.status(500)
//     }
// })



// app.get('/api', async (req, res) => {
//     try {
//         const user = await UserX.find({})
//         res.send(user)
//     }
//     catch (error) {
//         res.status(500)
//     }
// })

app.get('/Login/api', async (req, res) => {
    try {
        const user = await UserX.findOne({ $and: [{ Email: req.body.Email }, { Password: req.body.Password }] })
        if (!user) {
            res.status(404).json({ error: 'email and password not found' })
        }
        else {
            res.status(202).json({ postMessage: 'email and password is authetic' })
        }
    }
    catch (error) {
        res.status(500)
    }
})

app.post('/candy/api', async (req, res) => {
    try {

        

        let date_ob = new Date();
        const candy = await candyx.findOne({Email:req.body.Email});
        
        if(!candy){
            res.status(404).json({psotMassage:'user not found'});
        }
        else{
            if(req.body.candytype=="10"){
                candy.day1=false;
                candy.Totalcandies+=10;
                candy.Date_time=date_ob.getDate();
            }
            else if(req.body.candytype=="20"){
                candy.day2=false;
                candy.Totalcandies+=20;
                candy.Date_time=date_ob.getDate();
            }
            else if(req.body.candytype=="30"){
                candy.day3=false;
                candy.Totalcandies+=30;
                candy.Date_time=date_ob.getDate();
            }
            else if(req.body.candytype=="40"){
                candy.day4=false;
                candy.Totalcandies+=40;
                candy.Date_time=date_ob.getDate();
            }
            else if(req.body.candytype=="50"){
                candy.day5=false;
                candy.Totalcandies+=50;
                candy.Date_time=date_ob.getDate();
            }
            else if(req.body.candytype=="60"){
                candy.day6=false;
                candy.Totalcandies+=60;
                candy.Date_time=date_ob.getDate();
            }
            else if(req.body.candytype=="70"){
                candy.day7=false;
                candy.Totalcandies+=70;
                candy.Date_time=date_ob.getDate();
            }


        }


        await candy.save();
        res.send(candy);

    }
    catch (error) {
        res.status(500)
    }
})

app.post('/SignUp/api', async (req, res) => {
    try {
        const user = new UserX();  
        const candy=new candyx();
        user.Username = req.body.Username;
        user.Display_Name = req.body.Display_Name;
        user.Email = req.body.Email;
        user.Password = req.body.Password;


        candy.Email=req.body.Email;
        candy.day1=true;
        candy.day2=true;
        candy.day3=true;
        candy.day4=true;
        candy.day5=true;
        candy.day6=true;
        candy.day7=true;
        await candy.save();
        await user.save();
        res.send(user);
       // res.send(candy);
    }
    catch (error) {
        res.status(500)
    }
})
//portfolio api
app.post('/port/api', async (req, res) => {
    try {
        const port = new Portfoliox();  
        port.Pname=req.body.Pname;
        await port.save();
        res.send(port);
       // res.send(candy);
    }
    catch (error) {
        res.status(500)
    }
})
//coin listing api
app.post('/CoinRegister/api', async (req, res) => {
    try {
        const user = new UserX();
        user.Username = req.body.Username;
        user.Display_Name = req.body.Display_Name;
        user.Email = req.body.Email;
        user.Password = req.body.Password;

        await user.save();
        res.send(user);

    }
    catch (error) {
        res.status(500)
    }
})




//--------------------------------------------------------






mongoose.connect("mongodb+srv://bilal110:Bilal123@cluster0.p2nsi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(() => {
        console.log('Connected to MongoDB');
        server = app.listen(3000, () => {
            console.log("Listening to port: 3000");
        });
    });






    app.get('/coinranknft', async (req, res) => {
        try {
          const options = {
            method: 'GET',
            url: 'https://api.coinranking.com/v2/nfts?orderBy=price',
            headers: {
              'x-access-token': 'coinranking9a3632aab31743c29351c0dfe7dc4f05304ce3960cfcaac6'
            }
          };
          request(options, (error, response) => {
            if (error) throw new Error(error);
            console.log(response.body);
            res.send(response.body)
          });
      
        }
        catch (error) {
          res.status(500)
        }
      })







  app.get('/nomicsex', async (req, res) => {
    try {
        require('axios')
        .get("https://api.nomics.com/v1/exchanges/ticker?key=your-key-here&ids=binance,gdax&interval=1d,30d&convert=EUR&per-page=100&page=1")
        .then(response => console.log(response))
      
  
    }
    catch (error) {
      res.status(500)
    }
  })



///coins Portfolio
  app.post("/:PortfolioId/coin", async (req,res)=>{
      
    const port = await Portfoliox.findOne({_id: req.params.PortfolioId});
    const coin= new coinsx({

    P_id : port._id,
    coinname:req.body.coinname,
    PPC:req.body.PPC,
    qunatity:req.body.qunatity,
    date:req.body.date,
    BS:req.body.BS

    });
    await coin.save();

    res.send(coin);
  
      
});

app.post("/:USERSId/port",async(req,res)=>{

    const User=await  UserX.findOne({_id:req.params.USERSId});
    const port=new Portfoliox({

        U_id:User._id,
        Pname:req.body.Pname
       
    })
    await port.save();
    res.send(port);

})


// app.get("/:order_id/order_penalities", async (req,res)=>{
//     const op = await Order_penalities.findOne({order_id: req.params.order_id}).populate("order_id");
//     res.send(op);
// });



app.get("/:P_id/port", async (req,res)=>{
    const op = await coinsx.find({P_id: req.params.P_id});
    res.send(op);
});


app.get('/codex', async (req, res) => {
    try{
  const options = {
    method: 'GET',
    url: 'https://coincodex.com/apps/coincodex/cache/all_coins.json',
    headers: {
      'x-access-token': ''
    }
  };
  request(options, (error, response) => {
    if (error) throw new Error(error);
    console.log(response.body);
    res.send(response.body)
  });
    }
    catch (error) {
      res.status(500)
    }
  })
  



  

app.get('/Recetlyadded', async (req, res) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://api.coinranking.com/v2/coins',
        qs:{

          'orderBy':'listedAt'

        },
        headers: {
          // 'x-access-token': 'coinranking9a3632aab31743c29351c0dfe7dc4f05304ce3960cfcaac6',
        }
      };

      request(options, (error, response) => {
        if (error) throw new Error(error);
        console.log(response);  
        res.send(response);
      });
  
    }
    catch (error) {
      res.status(500)
    }
  })




//   var post;

// // Call the API
// fetch('https://api.coinranking.com/v2/nfts').then(function (response) {
// 	if (response.ok) {
// 		return response.json();
// 	} else {
// 		return Promise.reject(response);
// 	}
// }).then(function (data) {

// 	// Store the post data to a variable
// 	post = data;

// 	// Fetch another API
// 	return fetch('https://jsonplaceholder.typicode.com/users/' + data.userId);

// }).then(function (response) {
// 	if (response.ok) {
// 		return response.json();
// 	} else {
// 		return Promise.reject(response);
// 	}
// }).then(function (userData) {
// 	console.log(post, userData);
// }).catch(function (error) {
// 	console.warn(error);
// });


app.get('/nfts', async (req, res) => {
const requestOptions = {
    method: 'GET',
    uri: 'https://api.coinranking.com/v2/nfts',
    qs: {
      
    },
    headers: {
        'Accepts': 'application/json',
        'x-access-token': 'coinranking9a3632aab31743c29351c0dfe7dc4f05304ce3960cfcaac6'
    },
    json: true,
    gzip: true
  };
  
  rp(requestOptions).then(response => {
   
   
        res.send(response.data)

  }).catch((err) => {
    console.log('API call error:', err.message);
  });

})





app.get('/coin/:uuid', async (req, res) => {

  var y= req.params.uuid
  console.log(y);
  var x='https://api.coinranking.com/v2/coin/'+ y
  console.log(x);

  try {   
    const options = {
      method:
       'GET',
      url: x,
      headers: {
        'x-access-token': 'coinranking9a3632aab31743c29351c0dfe7dc4f05304ce3960cfcaac6'
      }
    };
    request(options, (error, response) => {
      console.log(options.url);
      if (error) throw new Error(error);
      console.log(response.body);
      res.send(response.body)
    });
    res.send(response.body)
  }
  catch (error) {
      res.status(500)
  }
})


app.get('/nftsonly', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      uri: 'https://api.coinranking.com/v2/nfts',
      qs:{
        'limit':'100'
        

      },
      headers: {
        'Accepts': 'application/json',
        'x-access-token': 'coinranking9a3632aab31743c29351c0dfe7dc4f05304ce3960cfcaac6',
      }
    };

    request(options, (error, response) => {
      if (error) throw new Error(error);
      console.log(response);  
      res.send(response);
    });

  }
  catch (error) {
    res.status(500)
  }
})

//============================================================================================================

app.get('/CRcoins/:Num1', async (req, res) => {
  let Num=req.params.Num1
      
  const requestOptions = {
      method: 'GET',
      uri: 'https://api.coinranking.com/v2/coins',
      qs: {
       
        
      },
      headers: {
          'Accepts': 'application/json',
          'x-access-token': 'coinranking9a3632aab31743c29351c0dfe7dc4f05304ce3960cfcaac6'
      },
      json: true,
      
    };
    var x;
    rp(requestOptions).then(response => {
               x=response        
  
    }).catch((err) => {
      console.log('API call error:', err.message);
    });
//-------------------------
const requestOptions1 = {
  method: 'GET',
  uri: 'https://api.coinranking.com/v2/nfts',
  qs: {
    'offset':'100',
    'limit':'100'
  }, 
  headers: {
      'Accepts': 'application/json',
      'x-access-token': 'coinranking9a3632aab31743c29351c0dfe7dc4f05304ce3960cfcaac6'
  },
  json: true,
};

rp(requestOptions1).then(response1 => {
  let x1=[];
  for (key in response1.data.nfts){
    for (i in x.data.coins){
      console.log(response1.data.nfts[key]);
      if (response1.data.nfts[key].dappName==x.data.coins[i].name)
      {
          x1.push(x.data.coins[i])
          
      }
    }
  }

      res.send(x1);

}).catch((err) => {
  console.log('API call error:', err.message);
});
  
  })



  app.get('/Ex', async (req, res) => {
    try {
        const requestOptions = {
            method: 'GET',
            url: 'https://api.coinranking.com/v2/exchange/-zdvbieRdZ',
            qs: {
              
              'limit':'100'
              
            },
            headers: {
              'Accepts': 'application/json',
                'x-access-token': 'coinranking9a3632aab31743c29351c0dfe7dc4f05304ce3960cfcaac6'
            },
            json: true,
        };
        rp(requestOptions).then(response => { 
            res.send(response)
        }).catch((err) => {
            console.log('API call error:', err.message);
        });

    }
    catch (error) {
        res.status(500)
    }
})
  


