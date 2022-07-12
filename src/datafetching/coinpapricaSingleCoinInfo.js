import axios from "axios";

const time_interval = '1d';
const start_date = '2022-01-01'
const coin_id = 'eth-ethereum'

const options = {
  method: 'GET',
  url: 'https://api.coinpaprika.com/v1/tickers/'+ coin_id +'/historical?start='+ start_date +'&interval='+time_interval,
  params: {},
  headers: {}
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
	console.error(error);
});


// curl --request GET \
// --url 'https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2022-01-01&interval=1d'

