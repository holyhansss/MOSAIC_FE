import axios from "axios";


export const getHistoricalData = async (coin_id, start_date, time_interval) => {
  const options = {
    method: 'GET',
    url: 'https://api.coinpaprika.com/v1/tickers/'+ coin_id +'/historical?start='+ start_date +'&interval='+time_interval,
    params: {},
    headers: {}
  };

  let result;

  await axios.request(options).then(function (response) {
    result = response.data
  }).catch(function (error) {
    console.error(error);
  });

  return result;
}


const time_interval = '1d';
const start_date = '2022-01-01'
const coin_id = 'eth-ethereum'

getHistoricalData(coin_id, start_date, time_interval);

// curl --request GET \
// --url 'https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2022-01-01&interval=1d'

