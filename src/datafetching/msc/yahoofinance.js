
import axios from "axios";

var options = {
  method: 'GET',
  url: 'https://yfapi.net/v8/finance/chart/AAPL',
  params: {modules: 'defaultKeyStatistics,assetProfile'},
  headers: {
    'x-api-key': 'Po7geRQve253LlkNAqKpo6QU9XkDes9n48FFfYfT'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data.chart.result);
}).catch(function (error) {
	console.error(error);
});