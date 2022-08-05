import mysql from 'mysql2/promise';
import {MY_HOST, MY_USERNAME, MY_PASSWORD, MY_DATABASE} from "./querySecureInfo.js"

//// dailyPrice QUERY LIST

//Create categories coins list
export const create_categories_coins_list = async () => {
  let sql = "CREATE TABLE categories_coins_list (CoinSymbol varchar(10), CoinName varchar(50), CoinPapricaID varchar(50), Category varchar(30), CoinRank int, CONSTRAINT PRIMARY KEY (CoinSymbol) )"
  const connection = await mysql.createConnection
    ({
        host: MY_HOST,
        user: MY_USERNAME,
        password: MY_PASSWORD,
        database : MY_DATABASE,
    });
  const [rows, fields] = await connection.execute(sql);
  console.log("end query create_categories_coins_list()");
  return rows;
}


//Insert data to table
export const insert_to_db_table = async (tableName, valuesList) => {
  let sql = 'INSERT INTO `' + tableName + '` VALUES ?';
  
  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});
  const [rows, fields] = await connection.query(sql, [valuesList]);
  console.log("end query insert_to_db_table()");
  return rows;
}

//Retrieve all coins from all categories
export const get_all_coinID_all_categories = async () => {
  let sql = "SELECT CoinSymbol, CoinPapricaID FROM categories_coins_list";
  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});
  const [rows, fields] = await connection.execute(sql);
  console.log(rows);
  console.log("end query get_all_coins_all_categories()");
  return rows;
}

export const get_coins_specific_category = async (thisCategory) => {
  let sql = "SELECT CoinSymbol, CoinPapricaID FROM categories_coins_list where Category = '"+thisCategory+"' ";
  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});
  const [rows, fields] = await connection.execute(sql);
  console.log("end query get_all_coins_all_categories()");
  return rows;
}

//find table by name
export const does_table_exist = async (tableName) => {
  let sql = "SELECT EXISTS( \
              SELECT * FROM information_schema.tables \
              where table_name = '" + tableName + "' \
            );"
  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});
  const [rows, fields] = await connection.execute(sql);
  //retrieving result of query that is in json form
  //does this really have to be this way..?
  let firstKey=Object.keys(rows[0])[0];
  let firstValueOfQueryResult= rows[0][firstKey];

  console.log("end query does_table_exist()");
  return firstValueOfQueryResult;
}

//Create table and insert data when coin table does NOT already exist
//! may have to amend incoming date format
export const create_coin_table = async (tableName) => {

  let sql = "CREATE TABLE `" + tableName + "` (Date DATE, PriceInDollar DECIMAL(20, 6), CONSTRAINT PRIMARY KEY (Date))"
  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});
  const [rows, fields] = await connection.execute(sql);
  console.log("end query create_coin_table()");
  return rows;
}

//get data from startDate to endDate
let startDate = '';
let endDate = '';

const get_prices_start_to_end = async (tableName, valuesList, startDate, endDate) => {
  let sql = "SELECT * FROM `" + tableName + "` WHERE date_column BETWEEN `"+ startDate + "` AND `" + endDate + "`";
    const connection = await mysql.createConnection
    ({
      host: MY_HOST,
      user: MY_USERNAME,
      password: MY_PASSWORD,
      database : MY_DATABASE,
  });
    const [rows, fields] = await connection.query(sql, [valuesList]);
    console.log("end query get_prices_start_to_end()");
    return rows;
}

export const create_temporary_tables_for_category = async () => {
  let sql = "CREATE TEMPORARY TABLE categories_coins_list (CoinSymbol varchar(10), CoinName varchar(50), CoinPapricaID varchar(50), Category varchar(30), CoinRank int, CONSTRAINT PRIMARY KEY (CoinSymbol))"
  const connection = await mysql.createConnection
    ({
        host: MY_HOST,
        user: MY_USERNAME,
        password: MY_PASSWORD,
        database : MY_DATABASE,
    });
  const [rows, fields] = await connection.execute(sql);
  console.log("end query create_categories_coins_list()");
  return rows;
}

export const fill_daterange_column = async (tableName, columnName, startDate, endDate) => {
  
  let subSql = 
  "\
    select gen_date from \
    (select adddate('1970-01-01',t4*10000 + t3*1000 + t2*100 + t1*10 + t0) gen_date from \
    (select 0 t0 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0, \
    (select 0 t1 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1, \
    (select 0 t2 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2, \
    (select 0 t3 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3, \
    (select 0 t4 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v \
    where gen_date between '" + startDate + "' and '" + endDate + "' order by gen_date asc \
  "
  
  let sql = 
  "\
  insert into `"+tableName+"` (`"+columnName+"`)\
    " + subSql

  // on duplicate key \
  // update `"+tableName+"` set `"+tableName+"`."+columnName+" = "+subSql+" \
  // "




// "  insert into `Smart Contract Platform_prices` (`Date`)        \
//   select gen_date from     (select adddate('1970-01-01',t4*10000 + t3*1000 + t2*100 + t1*10 + t0) gen_date from     
//   (select 0 t0 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,     
//   (select 0 t1 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,     
//   (select 0 t2 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,     
//   (select 0 t3 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,     
//   (select 0 t4 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v     
//   where gen_date between '2021-07-21' and '2022-07-20' order by gen_date asc     ;

// on duplicate key   

// update `Smart Contract Platform_prices` 
// set `Smart Contract Platform_prices`.Date =     
// (select gen_date from     (select adddate('1970-01-01',t4*10000 + t3*1000 + t2*100 + t1*10 + t0) gen_date from     (select 0 t0 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,     (select 0 t1 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,     (select 0 t2 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,     (select 0 t3 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,     (select 0 t4 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v     where gen_date between '2021-07-21' and '2022-07-20' order by gen_date asc 
//  ) ;"



  const connection = await mysql.createConnection
    ({
        host: MY_HOST,
        user: MY_USERNAME,
        password: MY_PASSWORD,
        database : MY_DATABASE,
    });
    console.log(sql);
  const [rows, fields] = await connection.execute(sql);
  console.log("end query fill_daterange_column()");
}

export const create_category_history = async (categoryName, startDate, endDate) => {
  const tableName = categoryName + "_prices"
  let categoryCoins = []
  let findSymbolOfCategoryCoinsSQL = "select CoinSymbol from categories_coins_list where Category = '" + categoryName + "' "
  let sqlCreate = "CREATE TABLE IF NOT EXISTS `" + tableName + "` (Date DATE" 
    
  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});

  const [categoryCoinsRows, categoryCoinsFields] = await connection.execute(findSymbolOfCategoryCoinsSQL);

  for (let i=0; i<categoryCoinsRows.length; i++) {
    sqlCreate = sqlCreate +", " + categoryCoinsRows[i].CoinSymbol;
    sqlCreate = sqlCreate + " DECIMAL(20, 6) "
  }
  sqlCreate = sqlCreate + ", CONSTRAINT PRIMARY KEY (Date))"

  console.log(sqlCreate);
  await connection.execute(sqlCreate);

  await fill_daterange_column(tableName, "Date", startDate, endDate)
  
  for (let i=0; i<categoryCoinsRows.length; i++) {
    categoryCoins.push(categoryCoinsRows[i].CoinSymbol);
    const coinHistoryTable = categoryCoinsRows[i].CoinSymbol + "_1yr_history";

    let sqlInsert = 
      "update `" + tableName + "` as C \
      set \
      `" + categoryCoinsRows[i].CoinSymbol + 
      "` = ( \
      select PriceInDollar \
      from `" + coinHistoryTable + "` \
      where C.Date = `" + coinHistoryTable + "`.Date \
      )"
    
    console.log(sqlInsert);

    await connection.execute(sqlInsert);
  }
  return_calculated_prices(tableName, categoryCoins);
  console.log("end query create_category_history()");
}

export const return_calculated_prices = async (tableName, coinList) => {
  let sql = "select DATE_FORMAT(date, '%Y-%m-%d') as date , round( ";
  let categoryNameToReturn = tableName.slice(0, -7)
  const coinNum = coinList.length
  for (let i=0; i<coinNum; i++) {
    if (i==0) {
      sql = sql + "IFNULL ((`"+coinList[i]+"` * 100 / (select `"+coinList[i]+"` from `"+tableName+"` LIMIT 0,1) / "+coinNum+"), 0)";
    } else {
      sql = sql + " + IFNULL ((`"+coinList[i]+"` * 100 / (select `"+coinList[i]+"` from `"+tableName+"` LIMIT 0,1) / "+coinNum+"), 0)";
    }
  }
  sql = sql + ", 1) as `"+ categoryNameToReturn+"` from `" + tableName +"`"; 

  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});
  const [rows, fields] = await connection.execute(sql);
  console.log("end query return_calculated_prices()");
  return rows;
}

