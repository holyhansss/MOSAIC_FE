import { createConnection } from 'mysql';
import {getDataFromCoinpaprica} from './coinpapricaAllCoins.js';



const InitializeCategoryDb = async () => {
  const data_to_insert_to_db = await getDataFromCoinpaprica();
  let insert_to_db = [];  
  for (let i=0; i<data_to_insert_to_db.length; i++){
    for (let j=0; j<data_to_insert_to_db[i].list.length; j++){
      insert_to_db.push(
        [
          data_to_insert_to_db[i].list[j].Symbol, 
          data_to_insert_to_db[i].list[j]["Name"],
          data_to_insert_to_db[i].list[j]["Sector"],
          data_to_insert_to_db[i].list[j]["DACS Rank"]
        ]
      ); 
    }
  }
  
  insert_category_coins("dummy", insert_to_db);
}
InitializeCategoryDb();

var connection = createConnection({
    host: "localhost",
    user: "root",
    password: "Password1!",
    database : 'crypto_daily_price'
  });
  

  const insert_category_coins = (tableName, valuesList) => {
    connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO " + tableName + " VALUES ?";
      
      connection.query(sql, [valuesList], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    });
  }