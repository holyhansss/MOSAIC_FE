import { createConnection } from 'mysql';
import {getDataFromCoinpaprica} from './coinpapricaAllCoins.js';



const doInsert = async () => {
    const data_to_insert_to_db = await getDataFromCoinpaprica();
    console.log(data_to_insert_to_db)

    let insert_to_db = [[],[]];

}
doInsert();
// let index = 0;
// for (let i = 0; i<data_to_insert_to_db.length; i++) {
//      for (let j = 0; j <data_to_insert_to_db[i].list.length; j++) {
//         insert_to_db[index][0] = data_to_insert_to_db[i].list[j].Symbol;
//         insert_to_db[index][1] = data_to_insert_to_db[i].list[j].Name;
//         insert_to_db[index][2] = data_to_insert_to_db[i].list[j].Sector[0];
//         insert_to_db[index][3] = data_to_insert_to_db[i].list[j]["DACS Rank"];
//     }
// }

// console.log("Test log")
// for (let i=0; i<4; i++){
//     for (let j=0; j<4; j++){
//         console.log(insert_to_db[i][j]);
//     }
// }


var connection = createConnection({
    host: "localhost",
    user: "root",
    password: "Password1!",
    database : 'MOSAIC'
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