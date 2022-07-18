import { request } from "axios";

const options = {
  method: 'GET',
  url: 'https://seeking-alpha.p.rapidapi.com/market/get-realtime-prices',
  params: {symbols: 'SP500'},
  headers: {
    'X-RapidAPI-Key': 'b84b108571mshdeb8948b9d3a49dp16b1f3jsn0a90f79be589',
    'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com'
  }
};

request(options).then(function (response) {
    console.log(response.data.data[0].attributes.last);

   
}).catch(function (error) {
	console.error(error);
});