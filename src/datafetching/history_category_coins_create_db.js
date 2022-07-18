import axios from "axios";
import { create_coin_table, does_table_exist, get_all_coinID_all_categories } from "./queries.js";

const saveAllNonExistingCoinPricesOfAllCategoriesFor1Year = async () => {
  const allCategoryCoinsList = await get_all_coinID_all_categories();
  
  for (let i=50; i<allCategoryCoinsList.length; i++) {


    const thisCoinSymbol = allCategoryCoinsList[i].CoinSymbol;

    const tableName = thisCoinSymbol + '_1yr_history'
    const doesTableExist = await does_table_exist(tableName);
    
    if (doesTableExist == 0) {
      // await create_coin_table(tableName);
      const time_interval = '1d';
      const start_date = getPreviousYearDate();
      
      const thisCoinSymbolAndName = allCategoryCoinsList[i].CoinSymbolAndName;
      const thisCoinHistoricalData = await getHistoricalData(thisCoinSymbolAndName, start_date, time_interval);
      if (thisCoinHistoricalData == null || thisCoinHistoricalData.length == undefined){
        nullHistoricalDataError(thisCoinSymbolAndName);
        continue;
        
      }

      let historicalDataToInsert = [];  
      
      for (let j=0; j<thisCoinHistoricalData.length; j++){
        historicalDataToInsert.push(
          [ 
            thisCoinHistoricalData[j].timestamp.slice(0, 10),
            thisCoinHistoricalData[j].price 
          ] 
        )    
      }       
      console.log(historicalDataToInsert);
    } else if (doesTableExist == 1){
      console.log("table for " + thisCoinSymbol + " already exists");
    } else {
      console.error("!invalid value for doesTableExist");
    }
  }
  // console.log(doesTableExist);
}

const getPreviousYearDate = () => {
  const d = new Date();
  const prevYear = d.getUTCFullYear() - 1;
  const month = d.getMonth() + 1;
  const nextDay = d.getUTCDate() + 1;

  const returnPreviousYearDate = prevYear + '-' + '0' +  month + '-' + nextDay;
  console.log(returnPreviousYearDate);
  console.log( typeof returnPreviousYearDate );
  return returnPreviousYearDate;
}

const getHistoricalData = async (coin_id, start_date, time_interval) => {
  console.log('https://api.coinpaprika.com/v1/tickers/'+ coin_id +'/historical?start='+ start_date +'&interval='+time_interval);

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

const nullHistoricalDataError = (thisCoinSymbolAndName) => {
  console.error("Historical Data for the coin ", thisCoinSymbolAndName, " is broken");
}


// const time_interval = '1d';
// const start_date = '2021-07-17'
// const coin_id = 'eth-ethereum'

// getHistoricalData(coin_id, start_date, time_interval)

saveAllNonExistingCoinPricesOfAllCategoriesFor1Year();
// getPreviousYearDate()


