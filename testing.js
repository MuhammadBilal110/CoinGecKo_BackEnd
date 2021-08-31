const rp = require('request-promise');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const request = require('request');
//const Binance = require('binance-api-node');
//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

const schedule = require('node-schedule')
//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
// var func = async() => {
//   let data = await CoinGeckoClient.coins.list();
//   console.log(data);
// };

//import Binance from 'binance-api-node'

// const client = Binance()

// const Binance = require('node-binance-api');

// const binance = new Binance().options({
//   APIKEY: 'AqBniIBnAYRVII5wguvGCCo7w1zxCSmKMIJqIxBpVYYlY9SXwpmhKJ3owIUUmVDy',
//   APISECRET: 'Mf1WttC9jM3IJ01qbA9AxvQP4nf5ZELCNcySdTLFamPSMypaMsbO0ooGDI97ZE1d'
// });
// console.log(binance.futuresPrices());

//client.time().then(time => console.log(time))



// const options = {
//   method: 'GET',
//   url: 'https://api.coinranking.com/v2/coin/price',
//   headers: {
//     'x-access-token': 'coinranking9a3632aab31743c29351c0dfe7dc4f05304ce3960cfcaac6'
//   }
// };

// request(options, (error, response) => {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });


app.get('/nfts', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://api.coinranking.com/v2/nfts',
      headers: {
        'x-access-token': 'coinranking9a3632aab31743c29351c0dfe7dc4f05304ce3960cfcaac6',
        'limit':'10'
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

// require('axios')
//   .get("https://api.nomics.com/v1/currencies/ticker?key=your-key-here&ids=BTC,ETH,XRP&interval=1d,30d&convert=EUR&per-page=100&page=1")
//   .then(response => console.log(response))



var btc = 0;
schedule.scheduleJob('*/1 * * * * *', () => {

  console.log(btc)
  btc++
})


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


const sdk = require('api')('@opensea/v1.0#10ly3a2fkr6dkwq4');

sdk['retrieving-bundles']({limit: '20', offset: '0'})
  .then(res => console.log(res))
  .catch(err => console.error(err));

  app.get('/NFT', async (req, res) => {

    try{

      sdk['retrieving-bundles']({limit: '20', offset: '0'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
  res.send(res);

    }

    catch (error) {
      res.status(500)
    }


  })