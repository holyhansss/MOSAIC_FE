import fetch from "node-fetch";
import axios from "axios";
import { insert_category_coins } from "./queries.js";

const initialize_category_db = async () => {
  const data_to_insert_to_db = await getDataFromCoinpaprica();
  let insert_to_db = [];  
  
  for (let i=0; i<data_to_insert_to_db.length; i++){
    for (let j=0; j<data_to_insert_to_db[i].list.length; j++){
      insert_to_db.push(
        [
          data_to_insert_to_db[i].list[j].Symbol, 
          data_to_insert_to_db[i].list[j]["Name"],
          data_to_insert_to_db[i].list[j].id,
          data_to_insert_to_db[i].list[j]["Sector"],
          data_to_insert_to_db[i].list[j]["DACS Rank"]
        ]
      ); 
    }
  }
  // console.log('valuesList: ', insert_to_db);
  // console.log("data to insert list: ", data_to_insert_to_db[0].list);
  insert_category_coins("categories_coins_list", insert_to_db);
}

let coinSectorList =  [
  {sector: 'Currency', list : []},
  {sector: 'Smart Contract Platform', list : []},
  {sector: 'Computing', list : [] },
  {sector: 'DeFi', list : [] },
  {sector: 'Culture & Entertainment', list : [] },
  {sector: 'Digitization', list : [] }
]


const coindesk_coins_list = [
  {
    "DACS Rank": 1,
    "Symbol": "BTC",
    "Name": "Bitcoin",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 1
  },
  {
    "DACS Rank": 2,
    "Symbol": "ETH",
    "Name": "Ethereum",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 3,
    "Symbol": "USDT",
    "Name": "Tether",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 2
  },
  {
    "DACS Rank": 4,
    "Symbol": "BNB",
    "Name": "BNB",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 5,
    "Symbol": "USDC",
    "Name": "USD Coin",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 3
  },
  {
    "DACS Rank": 6,
    "Symbol": "SOL",
    "Name": "Solana",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 7,
    "Symbol": "XRP",
    "Name": "XRP",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 4
  },
  {
    "DACS Rank": 8,
    "Symbol": "ADA",
    "Name": "Cardano",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 9,
    "Symbol": "LUNA",
    "Name": "Terra",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 10,
    "Symbol": "AVAX",
    "Name": "Avalanche",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 11,
    "Symbol": "DOT",
    "Name": "Polkadot",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 12,
    "Symbol": "DOGE",
    "Name": "Dogecoin",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 5
  },
  {
    "DACS Rank": 13,
    "Symbol": "BUSD",
    "Name": "Binance USD",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 6
  },
  {
    "DACS Rank": 14,
    "Symbol": "UST",
    "Name": "TerraUSD",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 7
  },
  {
    "DACS Rank": 15,
    "Symbol": "SHIB",
    "Name": "SHIBA INU",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 8
  },
  {
    "DACS Rank": 16,
    "Symbol": "MATIC",
    "Name": "Polygon",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 17,
    "Symbol": "CRO",
    "Name": "Cronos",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 9
  },
  {
    "DACS Rank": 18,
    "Symbol": "DAI",
    "Name": "Dai",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 10
  },
  {
    "DACS Rank": 19,
    "Symbol": "NEAR",
    "Name": "NEAR Protocol",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 20,
    "Symbol": "LTC",
    "Name": "Litecoin",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 11
  },
  {
    "DACS Rank": 21,
    "Symbol": "ATOM",
    "Name": "Cosmos",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 22,
    "Symbol": "LINK",
    "Name": "Chainlink",
    "Sector": "Computing",
    "Industry Group": "Oracle",
    "Industry": "Oracle",
    "FIELD7": null
  },
  {
    "DACS Rank": 23,
    "Symbol": "UNI",
    "Name": "Uniswap",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 24,
    "Symbol": "TRX",
    "Name": "TRON",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 25,
    "Symbol": "BCH",
    "Name": "Bitcoin Cash",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 12
  },
  {
    "DACS Rank": 26,
    "Symbol": "FTT",
    "Name": "FTX Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 13
  },
  {
    "DACS Rank": 27,
    "Symbol": "ETC",
    "Name": "Ethereum Classic",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 28,
    "Symbol": "ALGO",
    "Name": "Algorand",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 29,
    "Symbol": "WAVES",
    "Name": "Waves",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 30,
    "Symbol": "XLM",
    "Name": "Stellar",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 31,
    "Symbol": "LEO",
    "Name": "UNUS SED LEO",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 14
  },
  {
    "DACS Rank": 32,
    "Symbol": "VET",
    "Name": "Vechain",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 15
  },
  {
    "DACS Rank": 33,
    "Symbol": "MANA",
    "Name": "Decentraland",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "VR Real Estate",
    "FIELD7": null
  },
  {
    "DACS Rank": 34,
    "Symbol": "HBAR",
    "Name": "Hedera",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 35,
    "Symbol": "ICP",
    "Name": "Internet Computer",
    "Sector": "Computing",
    "Industry Group": "IoT",
    "Industry": "IoT",
    "FIELD7": null
  },
  {
    "DACS Rank": 36,
    "Symbol": "FIL",
    "Name": "Filecoin",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 37,
    "Symbol": "THETA",
    "Name": "Theta Network",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Broadcast",
    "FIELD7": null
  },
  {
    "DACS Rank": 38,
    "Symbol": "EGLD",
    "Name": "Elrond",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 39,
    "Symbol": "SAND",
    "Name": "The Sandbox",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Metaverse (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 40,
    "Symbol": "AXS",
    "Name": "Axie Infinity",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 41,
    "Symbol": "XMR",
    "Name": "Monero",
    "Sector": "Currency",
    "Industry Group": "Private",
    "Industry": "Private",
    "FIELD7": 16
  },
  {
    "DACS Rank": 42,
    "Symbol": "RUNE",
    "Name": "THORChain",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 43,
    "Symbol": "FTM",
    "Name": "Fantom",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 44,
    "Symbol": "APE",
    "Name": "ApeCoin",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Metaverse (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 45,
    "Symbol": "XTZ",
    "Name": "Tezos",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 46,
    "Symbol": "KLAY",
    "Name": "Klaytn",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 47,
    "Symbol": "AAVE",
    "Name": "Aave",
    "Sector": "DeFi",
    "Industry Group": "Credit Platform",
    "Industry": "Credit Platform (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 48,
    "Symbol": "EOS",
    "Name": "EOS",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 49,
    "Symbol": "HNT",
    "Name": "Helium",
    "Sector": "Computing",
    "Industry Group": "IoT",
    "Industry": "IoT",
    "FIELD7": null
  },
  {
    "DACS Rank": 50,
    "Symbol": "ZEC",
    "Name": "Zcash",
    "Sector": "Currency",
    "Industry Group": "Private",
    "Industry": "Private",
    "FIELD7": 17
  },
  {
    "DACS Rank": 51,
    "Symbol": "CAKE",
    "Name": "PancakeSwap",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 52,
    "Symbol": "FLOW",
    "Name": "Flow",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 53,
    "Symbol": "MIOTA",
    "Name": "IOTA",
    "Sector": "Computing",
    "Industry Group": "IoT",
    "Industry": "IoT",
    "FIELD7": null
  },
  {
    "DACS Rank": 54,
    "Symbol": "ZIL",
    "Name": "Zilliqa",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 55,
    "Symbol": "GRT",
    "Name": "The Graph",
    "Sector": "Computing",
    "Industry Group": "Oracle",
    "Industry": "Oracle",
    "FIELD7": null
  },
  {
    "DACS Rank": 56,
    "Symbol": "MKR",
    "Name": "Maker",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 57,
    "Symbol": "BTT",
    "Name": "BitTorrent",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 58,
    "Symbol": "ONE",
    "Name": "Harmony",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 59,
    "Symbol": "NEO",
    "Name": "Neo",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 60,
    "Symbol": "STX",
    "Name": "Stacks",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 61,
    "Symbol": "BSV",
    "Name": "Bitcoin SV",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 18
  },
  {
    "DACS Rank": 62,
    "Symbol": "GALA",
    "Name": "Gala",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 63,
    "Symbol": "XEC",
    "Name": "eCash",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent (Other)",
    "FIELD7": 19
  },
  {
    "DACS Rank": 64,
    "Symbol": "CHZ",
    "Name": "Chiliz",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 65,
    "Symbol": "QNT",
    "Name": "Quant",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 20
  },
  {
    "DACS Rank": 66,
    "Symbol": "KCS",
    "Name": "KuCoin Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 21
  },
  {
    "DACS Rank": 67,
    "Symbol": "CVX",
    "Name": "Convex Finance",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 68,
    "Symbol": "KSM",
    "Name": "Kusama",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 69,
    "Symbol": "ENJ",
    "Name": "Enjin Coin",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Metaverse (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 70,
    "Symbol": "LRC",
    "Name": "Loopring",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 71,
    "Symbol": "GMT",
    "Name": "STEPN",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 72,
    "Symbol": "HT",
    "Name": "Huobi Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 22
  },
  {
    "DACS Rank": 73,
    "Symbol": "CELO",
    "Name": "Celo",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 74,
    "Symbol": "DASH",
    "Name": "Dash",
    "Sector": "Currency",
    "Industry Group": "Private",
    "Industry": "Private",
    "FIELD7": 23
  },
  {
    "DACS Rank": 75,
    "Symbol": "TUSD",
    "Name": "TrueUSD",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 24
  },
  {
    "DACS Rank": 76,
    "Symbol": "NEXO",
    "Name": "Nexo",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 25
  },
  {
    "DACS Rank": 77,
    "Symbol": "BAT",
    "Name": "Basic Attention Token",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 78,
    "Symbol": "OKB",
    "Name": "OKB",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 26
  },
  {
    "DACS Rank": 79,
    "Symbol": "CRV",
    "Name": "Curve DAO Token",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 80,
    "Symbol": "AR",
    "Name": "Arweave",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 81,
    "Symbol": "MINA",
    "Name": "Mina",
    "Sector": "Currency",
    "Industry Group": "Private",
    "Industry": "Private",
    "FIELD7": 27
  },
  {
    "DACS Rank": 82,
    "Symbol": "HOT",
    "Name": "Holo",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 83,
    "Symbol": "AMP",
    "Name": "Amp",
    "Sector": "DeFi",
    "Industry Group": "Credit Platform",
    "Industry": "Credit Platform (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 84,
    "Symbol": "TFUEL",
    "Name": "Theta Fuel",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 28
  },
  {
    "DACS Rank": 85,
    "Symbol": "KDA",
    "Name": "Kadena",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 86,
    "Symbol": "XEM",
    "Name": "NEM",
    "Sector": "Computing",
    "Industry Group": "IoT",
    "Industry": "IoT",
    "FIELD7": null
  },
  {
    "DACS Rank": 87,
    "Symbol": "COMP",
    "Name": "Compound",
    "Sector": "DeFi",
    "Industry Group": "Credit Platform",
    "Industry": "Credit Platform (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 88,
    "Symbol": "ROSE",
    "Name": "Oasis Network",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 89,
    "Symbol": "USDP",
    "Name": "Pax Dollar",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 29
  },
  {
    "DACS Rank": 90,
    "Symbol": "IOTX",
    "Name": "IoTeX",
    "Sector": "Computing",
    "Industry Group": "IoT",
    "Industry": "IoT",
    "FIELD7": null
  },
  {
    "DACS Rank": 91,
    "Symbol": "USDN",
    "Name": "Neutrino USD",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent (Other)",
    "FIELD7": 30
  },
  {
    "DACS Rank": 92,
    "Symbol": "DCR",
    "Name": "Decred",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 93,
    "Symbol": "SCRT",
    "Name": "Secret",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 94,
    "Symbol": "QTUM",
    "Name": "Qtum",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 95,
    "Symbol": "BORA",
    "Name": "BORA",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 96,
    "Symbol": "YFI",
    "Name": "yearn.finance",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 97,
    "Symbol": "XYM",
    "Name": "Symbol",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 31
  },
  {
    "DACS Rank": 98,
    "Symbol": "IOST",
    "Name": "IOST",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 99,
    "Symbol": "SKL",
    "Name": "SKALE Network",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 100,
    "Symbol": "CEL",
    "Name": "Celsius",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 32
  },
  {
    "DACS Rank": 101,
    "Symbol": "SNX",
    "Name": "Synthetix",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 102,
    "Symbol": "GNO",
    "Name": "Gnosis",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "DAO (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 103,
    "Symbol": "OMG",
    "Name": "OMG Network",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 104,
    "Symbol": "ANKR",
    "Name": "Ankr",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 105,
    "Symbol": "ICX",
    "Name": "ICON",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 106,
    "Symbol": "KAVA",
    "Name": "Kava",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 107,
    "Symbol": "SXP",
    "Name": "Swipe",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 108,
    "Symbol": "BTG",
    "Name": "Bitcoin Gold",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 33
  },
  {
    "DACS Rank": 109,
    "Symbol": "1INCH",
    "Name": "1inch Network",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "Exchanges (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 110,
    "Symbol": "RVN",
    "Name": "Ravencoin",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 34
  },
  {
    "DACS Rank": 111,
    "Symbol": "AUDIO",
    "Name": "Audius",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Broadcast",
    "FIELD7": null
  },
  {
    "DACS Rank": 112,
    "Symbol": "XDC",
    "Name": "XDC Network",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 35
  },
  {
    "DACS Rank": 113,
    "Symbol": "ANC",
    "Name": "Anchor Protocol",
    "Sector": "DeFi",
    "Industry Group": "Credit Platform",
    "Industry": "Lending / Borrowing",
    "FIELD7": null
  },
  {
    "DACS Rank": 114,
    "Symbol": "BNT",
    "Name": "Bancor",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 115,
    "Symbol": "WAXP",
    "Name": "WAX",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 116,
    "Symbol": "RNDR",
    "Name": "Render Token",
    "Sector": "Computing",
    "Industry Group": "Private Computing",
    "Industry": "Private Computing",
    "FIELD7": null
  },
  {
    "DACS Rank": 117,
    "Symbol": "ZRX",
    "Name": "0x",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 118,
    "Symbol": "WOO",
    "Name": "WOO Network",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 36
  },
  {
    "DACS Rank": 119,
    "Symbol": "GLMR",
    "Name": "Moonbeam",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 120,
    "Symbol": "JST",
    "Name": "JUST",
    "Sector": "DeFi",
    "Industry Group": "Credit Platform",
    "Industry": "Credit Platform (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 121,
    "Symbol": "PAXG",
    "Name": "PAX Gold",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 122,
    "Symbol": "SC",
    "Name": "Siacoin",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 123,
    "Symbol": "ZEN",
    "Name": "Horizen",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 124,
    "Symbol": "LPT",
    "Name": "Livepeer",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Broadcast",
    "FIELD7": null
  },
  {
    "DACS Rank": 125,
    "Symbol": "KNC",
    "Name": "Kyber Network Crystal",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 126,
    "Symbol": "ONT",
    "Name": "Ontology",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 127,
    "Symbol": "SUSHI",
    "Name": "SushiSwap",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 128,
    "Symbol": "VLX",
    "Name": "Velas",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 129,
    "Symbol": "IMX",
    "Name": "Immutable X",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Art",
    "Industry": "Art",
    "FIELD7": null
  },
  {
    "DACS Rank": 130,
    "Symbol": "GLM",
    "Name": "Golem",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 131,
    "Symbol": "RLY",
    "Name": "Rally",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 132,
    "Symbol": "ELON",
    "Name": "Dogelon Mars",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 37
  },
  {
    "DACS Rank": 133,
    "Symbol": "GT",
    "Name": "GateToken",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 134,
    "Symbol": "NFT",
    "Name": "APENFT",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Art",
    "Industry": "Art",
    "FIELD7": null
  },
  {
    "DACS Rank": 135,
    "Symbol": "STORJ",
    "Name": "Storj",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 136,
    "Symbol": "CELR",
    "Name": "Celer Network",
    "Sector": "DeFi",
    "Industry Group": "Atomic Swaps",
    "Industry": "Atomic Swaps",
    "FIELD7": null
  },
  {
    "DACS Rank": 137,
    "Symbol": "UMA",
    "Name": "UMA",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 138,
    "Symbol": "VGX",
    "Name": "Voyager Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 38
  },
  {
    "DACS Rank": 139,
    "Symbol": "REN",
    "Name": "Ren",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 140,
    "Symbol": "DGB",
    "Name": "DigiByte",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 141,
    "Symbol": "REV",
    "Name": "Revain",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 142,
    "Symbol": "HIVE",
    "Name": "Hive",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 143,
    "Symbol": "TEL",
    "Name": "Telcoin",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 39
  },
  {
    "DACS Rank": 144,
    "Symbol": "POLY",
    "Name": "Polymath",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 40
  },
  {
    "DACS Rank": 145,
    "Symbol": "CHSB",
    "Name": "SwissBorg",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 41
  },
  {
    "DACS Rank": 146,
    "Symbol": "SRM",
    "Name": "Serum",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "Exchanges (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 147,
    "Symbol": "KEEP",
    "Name": "Keep Network",
    "Sector": "Computing",
    "Industry Group": "Private Computing",
    "Industry": "Private Computing",
    "FIELD7": null
  },
  {
    "DACS Rank": 148,
    "Symbol": "PLA",
    "Name": "PlayDapp",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 149,
    "Symbol": "FEI",
    "Name": "Fei USD",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 42
  },
  {
    "DACS Rank": 150,
    "Symbol": "TWT",
    "Name": "Trust Wallet Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 43
  },
  {
    "DACS Rank": 151,
    "Symbol": "SYS",
    "Name": "Syscoin",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 152,
    "Symbol": "FLUX",
    "Name": "Flux",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 153,
    "Symbol": "ILV",
    "Name": "Illuvium",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 154,
    "Symbol": "DYDX",
    "Name": "dYdX",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "CLOB",
    "FIELD7": null
  },
  {
    "DACS Rank": 155,
    "Symbol": "SPELL",
    "Name": "Spell Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 44
  },
  {
    "DACS Rank": 156,
    "Symbol": "OCEAN",
    "Name": "Ocean Protocol",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 157,
    "Symbol": "CSPR",
    "Name": "Casper",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 158,
    "Symbol": "CKB",
    "Name": "Nervos Network",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 159,
    "Symbol": "PERP",
    "Name": "Perpetual Protocol",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 160,
    "Symbol": "ENS",
    "Name": "Ethereum Name Service",
    "Sector": "Digitization",
    "Industry Group": "Digitization",
    "Industry": "Digitization",
    "FIELD7": null
  },
  {
    "DACS Rank": 161,
    "Symbol": "FXS",
    "Name": "Frax Share",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 45
  },
  {
    "DACS Rank": 162,
    "Symbol": "WIN",
    "Name": "WINkLink",
    "Sector": "Computing",
    "Industry Group": "Oracle",
    "Industry": "Oracle",
    "FIELD7": null
  },
  {
    "DACS Rank": 163,
    "Symbol": "UOS",
    "Name": "Ultra",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Metaverse (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 164,
    "Symbol": "FET",
    "Name": "Fetch.ai",
    "Sector": "Computing",
    "Industry Group": "IoT",
    "Industry": "IoT",
    "FIELD7": null
  },
  {
    "DACS Rank": 165,
    "Symbol": "YGG",
    "Name": "Yield Guild Games",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 166,
    "Symbol": "XNO",
    "Name": "Nano",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 46
  },
  {
    "DACS Rank": 167,
    "Symbol": "XPRT",
    "Name": "Persistence",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 168,
    "Symbol": "LSK",
    "Name": "Lisk",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 169,
    "Symbol": "CEEK",
    "Name": "CEEK VR",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Art",
    "Industry": "Art",
    "FIELD7": null
  },
  {
    "DACS Rank": 170,
    "Symbol": "DENT",
    "Name": "Dent",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 171,
    "Symbol": "NU",
    "Name": "NuCypher",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 172,
    "Symbol": "C98",
    "Name": "Coin98",
    "Sector": "DeFi",
    "Industry Group": "Atomic Swaps",
    "Industry": "Atomic Swaps",
    "FIELD7": null
  },
  {
    "DACS Rank": 173,
    "Symbol": "RSR",
    "Name": "Reserve Rights",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 47
  },
  {
    "DACS Rank": 174,
    "Symbol": "RAY",
    "Name": "Raydium",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 175,
    "Symbol": "PYR",
    "Name": "Vulcan Forged PYR",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 176,
    "Symbol": "BTRST",
    "Name": "Braintrust",
    "Sector": "Digitization",
    "Industry Group": "Digitization",
    "Industry": "Digitization",
    "FIELD7": null
  },
  {
    "DACS Rank": 177,
    "Symbol": "CFX",
    "Name": "Conflux",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 48
  },
  {
    "DACS Rank": 178,
    "Symbol": "BAKE",
    "Name": "BakerySwap",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 179,
    "Symbol": "XDB",
    "Name": "DigitalBits",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 49
  },
  {
    "DACS Rank": 180,
    "Symbol": "CHR",
    "Name": "Chromia",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 181,
    "Symbol": "POWR",
    "Name": "Powerledger",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 50
  },
  {
    "DACS Rank": 182,
    "Symbol": "INJ",
    "Name": "Injective",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "Exchanges (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 183,
    "Symbol": "COTI",
    "Name": "COTI",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 51
  },
  {
    "DACS Rank": 184,
    "Symbol": "MED",
    "Name": "MediBloc",
    "Sector": "Digitization",
    "Industry Group": "Digitization",
    "Industry": "Digitization",
    "FIELD7": null
  },
  {
    "DACS Rank": 185,
    "Symbol": "MXC",
    "Name": "MXC",
    "Sector": "Computing",
    "Industry Group": "IoT",
    "Industry": "IoT",
    "FIELD7": null
  },
  {
    "DACS Rank": 186,
    "Symbol": "XYO",
    "Name": "XYO",
    "Sector": "Computing",
    "Industry Group": "Oracle",
    "Industry": "Oracle",
    "FIELD7": null
  },
  {
    "DACS Rank": 187,
    "Symbol": "SNT",
    "Name": "Status",
    "Sector": "Computing",
    "Industry Group": "IoT",
    "Industry": "IoT",
    "FIELD7": null
  },
  {
    "DACS Rank": 188,
    "Symbol": "ORBS",
    "Name": "Orbs",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 52
  },
  {
    "DACS Rank": 189,
    "Symbol": "JOE",
    "Name": "JOE",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 190,
    "Symbol": "TRIBE",
    "Name": "Tribe",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "DAO (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 191,
    "Symbol": "REQ",
    "Name": "Request",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 53
  },
  {
    "DACS Rank": 192,
    "Symbol": "PUNDIX",
    "Name": "Pundi X",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 54
  },
  {
    "DACS Rank": 193,
    "Symbol": "ARDR",
    "Name": "Ardor",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 194,
    "Symbol": "XCH",
    "Name": "Chia",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 195,
    "Symbol": "HEX",
    "Name": "HEX",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 196,
    "Symbol": "FRAX",
    "Name": "Frax",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 55
  },
  {
    "DACS Rank": 197,
    "Symbol": "TON",
    "Name": "Toncoin",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 198,
    "Symbol": "OSMO",
    "Name": "Osmosis",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 199,
    "Symbol": "DFI",
    "Name": "DeFiChain",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 200,
    "Symbol": "CBG",
    "Name": "Chainbing",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 201,
    "Symbol": "LN",
    "Name": "LINK",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 56
  },
  {
    "DACS Rank": 202,
    "Symbol": "BIT",
    "Name": "BitDAO",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 203,
    "Symbol": "NXM",
    "Name": "NXM",
    "Sector": "DeFi",
    "Industry Group": "Insurance",
    "Industry": "Insurance",
    "FIELD7": null
  },
  {
    "DACS Rank": 204,
    "Symbol": "LUSD",
    "Name": "Liquity USD",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent (Other)",
    "FIELD7": 57
  },
  {
    "DACS Rank": 205,
    "Symbol": "RACA",
    "Name": "Radio Caca",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 206,
    "Symbol": "YOUC",
    "Name": "yOUcash",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 207,
    "Symbol": "CCXX",
    "Name": "Counos X",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 58
  },
  {
    "DACS Rank": 208,
    "Symbol": "WEMIX",
    "Name": "WEMIX",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 209,
    "Symbol": "TTT",
    "Name": "The Transfer Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent (Other)",
    "FIELD7": 59
  },
  {
    "DACS Rank": 210,
    "Symbol": "ARRR",
    "Name": "Pirate Chain",
    "Sector": "Currency",
    "Industry Group": "Private",
    "Industry": "Private",
    "FIELD7": 60
  },
  {
    "DACS Rank": 211,
    "Symbol": "XWC",
    "Name": "WhiteCoin",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 212,
    "Symbol": "SAFE",
    "Name": "Safe",
    "Sector": "Currency",
    "Industry Group": "Private",
    "Industry": "Private",
    "FIELD7": 61
  },
  {
    "DACS Rank": 213,
    "Symbol": "METIS",
    "Name": "MetisDAO",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 214,
    "Symbol": "HUSD",
    "Name": "HUSD",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 62
  },
  {
    "DACS Rank": 215,
    "Symbol": "KOK",
    "Name": "KOK",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 216,
    "Symbol": "DESO",
    "Name": "Decentralized Social",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 217,
    "Symbol": "LDO",
    "Name": "Lido DAO",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 218,
    "Symbol": "MOB",
    "Name": "MobileCoin",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 63
  },
  {
    "DACS Rank": 219,
    "Symbol": "ASTR",
    "Name": "Astar",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 220,
    "Symbol": "SAPP",
    "Name": "Sapphire",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 64
  },
  {
    "DACS Rank": 221,
    "Symbol": "RPL",
    "Name": "Rocket Pool",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 222,
    "Symbol": "VVS",
    "Name": "VVS Finance",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 223,
    "Symbol": "SAFEMOON",
    "Name": "SafeMoon",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 65
  },
  {
    "DACS Rank": 224,
    "Symbol": "ICHI",
    "Name": "ICHI",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 225,
    "Symbol": "HUM",
    "Name": "Humanscape",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 66
  },
  {
    "DACS Rank": 226,
    "Symbol": "BEST",
    "Name": "Bitpanda Ecosystem Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 67
  },
  {
    "DACS Rank": 227,
    "Symbol": "FRTS",
    "Name": "Fruits",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 68
  },
  {
    "DACS Rank": 228,
    "Symbol": "EVER",
    "Name": "Everscale",
    "Sector": "Computing",
    "Industry Group": "Private Computing",
    "Industry": "Private Computing",
    "FIELD7": null
  },
  {
    "DACS Rank": 229,
    "Symbol": "MVL",
    "Name": "MVL",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 69
  },
  {
    "DACS Rank": 230,
    "Symbol": "HERO",
    "Name": "Metahero",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Metaverse (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 231,
    "Symbol": "MX",
    "Name": "MX Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 70
  },
  {
    "DACS Rank": 232,
    "Symbol": "CTSI",
    "Name": "Cartesi",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 233,
    "Symbol": "MOVR",
    "Name": "Moonriver",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 234,
    "Symbol": "WRX",
    "Name": "WazirX",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 71
  },
  {
    "DACS Rank": 235,
    "Symbol": "TRAC",
    "Name": "OriginTrail",
    "Sector": "Computing",
    "Industry Group": "Oracle",
    "Industry": "Oracle",
    "FIELD7": null
  },
  {
    "DACS Rank": 236,
    "Symbol": "CVC",
    "Name": "Civic",
    "Sector": "Digitization",
    "Industry Group": "Digitization",
    "Industry": "Digitization",
    "FIELD7": null
  },
  {
    "DACS Rank": 237,
    "Symbol": "GUSD",
    "Name": "Gemini Dollar",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 72
  },
  {
    "DACS Rank": 238,
    "Symbol": "UFO",
    "Name": "UFO Gaming",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 239,
    "Symbol": "DAG",
    "Name": "Constellation",
    "Sector": "Computing",
    "Industry Group": "IoT",
    "Industry": "IoT",
    "FIELD7": null
  },
  {
    "DACS Rank": 240,
    "Symbol": "ORC",
    "Name": "Orbit Chain",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 241,
    "Symbol": "OGN",
    "Name": "Origin Protocol",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 242,
    "Symbol": "FX",
    "Name": "Function X",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "Exchanges (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 243,
    "Symbol": "MDX",
    "Name": "Mdex",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 244,
    "Symbol": "BOBA",
    "Name": "Boba Network",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 245,
    "Symbol": "VTHO",
    "Name": "VeThor Token",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 246,
    "Symbol": "ALICE",
    "Name": "My Neighbor Alice",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "VR Real Estate",
    "FIELD7": null
  },
  {
    "DACS Rank": 247,
    "Symbol": "ANY",
    "Name": "Anyswap",
    "Sector": "DeFi",
    "Industry Group": "Atomic Swaps",
    "Industry": "Atomic Swaps",
    "FIELD7": null
  },
  {
    "DACS Rank": 248,
    "Symbol": "ELF",
    "Name": "aelf",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 249,
    "Symbol": "MPL",
    "Name": "Maple",
    "Sector": "DeFi",
    "Industry Group": "Credit Platform",
    "Industry": "Lending / Borrowing",
    "FIELD7": null
  },
  {
    "DACS Rank": 250,
    "Symbol": "LYXe",
    "Name": "LUKSO",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 251,
    "Symbol": "XVG",
    "Name": "Verge",
    "Sector": "Currency",
    "Industry Group": "Private",
    "Industry": "Private",
    "FIELD7": 73
  },
  {
    "DACS Rank": 252,
    "Symbol": "MBOX",
    "Name": "MOBOX",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 253,
    "Symbol": "STMX",
    "Name": "StormX",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 74
  },
  {
    "DACS Rank": 254,
    "Symbol": "REEF",
    "Name": "Reef Chain",
    "Sector": "DeFi",
    "Industry Group": "Atomic Swaps",
    "Industry": "Atomic Swaps",
    "FIELD7": null
  },
  {
    "DACS Rank": 255,
    "Symbol": "AURORA",
    "Name": "Aurora",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 256,
    "Symbol": "TLOS",
    "Name": "Telos",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 257,
    "Symbol": "ANT",
    "Name": "Aragon",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "DAO Builder",
    "FIELD7": null
  },
  {
    "DACS Rank": 258,
    "Symbol": "XAUT",
    "Name": "Tether Gold",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 259,
    "Symbol": "DUSK",
    "Name": "Dusk Network",
    "Sector": "Computing",
    "Industry Group": "Private Computing",
    "Industry": "Private Computing",
    "FIELD7": null
  },
  {
    "DACS Rank": 260,
    "Symbol": "XHV",
    "Name": "Haven Protocol",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 261,
    "Symbol": "API3",
    "Name": "API3",
    "Sector": "Computing",
    "Industry Group": "Oracle",
    "Industry": "Oracle",
    "FIELD7": null
  },
  {
    "DACS Rank": 262,
    "Symbol": "BLOK",
    "Name": "Bloktopia",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 263,
    "Symbol": "ALPHA",
    "Name": "Alpha Finance Lab",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 264,
    "Symbol": "NKN",
    "Name": "NKN",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 265,
    "Symbol": "RGT",
    "Name": "Rari Governance Token",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 266,
    "Symbol": "OXT",
    "Name": "Orchid",
    "Sector": "Computing",
    "Industry Group": "Private Computing",
    "Industry": "Private Computing",
    "FIELD7": null
  },
  {
    "DACS Rank": 267,
    "Symbol": "SSV",
    "Name": "ssv.network",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 75
  },
  {
    "DACS Rank": 268,
    "Symbol": "SURE",
    "Name": "inSure DeFi",
    "Sector": "DeFi",
    "Industry Group": "Insurance",
    "Industry": "Insurance",
    "FIELD7": null
  },
  {
    "DACS Rank": 269,
    "Symbol": "MAID",
    "Name": "MaidSafeCoin",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 270,
    "Symbol": "NMR",
    "Name": "Numeraire",
    "Sector": "DeFi",
    "Industry Group": "Asset Management",
    "Industry": "Asset Management",
    "FIELD7": null
  },
  {
    "DACS Rank": 271,
    "Symbol": "STRAX",
    "Name": "Stratis",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 76
  },
  {
    "DACS Rank": 272,
    "Symbol": "BFC",
    "Name": "Bifrost",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 273,
    "Symbol": "UBT",
    "Name": "Unibright",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 77
  },
  {
    "DACS Rank": 274,
    "Symbol": "SOS",
    "Name": "OpenDAO",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 275,
    "Symbol": "BICO",
    "Name": "Biconomy",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 276,
    "Symbol": "EWT",
    "Name": "Energy Web Token",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 78
  },
  {
    "DACS Rank": 277,
    "Symbol": "RLC",
    "Name": "iExec RLC",
    "Sector": "Computing",
    "Industry Group": "Private Computing",
    "Industry": "Private Computing",
    "FIELD7": null
  },
  {
    "DACS Rank": 278,
    "Symbol": "ACH",
    "Name": "Alchemy Pay",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 79
  },
  {
    "DACS Rank": 279,
    "Symbol": "DIVI",
    "Name": "Divi",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 80
  },
  {
    "DACS Rank": 280,
    "Symbol": "REP",
    "Name": "Augur",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 281,
    "Symbol": "MASK",
    "Name": "Mask Network",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 282,
    "Symbol": "DAO",
    "Name": "DAO Maker",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "DAO (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 283,
    "Symbol": "BAND",
    "Name": "Band Protocol",
    "Sector": "Computing",
    "Industry Group": "Oracle",
    "Industry": "Oracle",
    "FIELD7": null
  },
  {
    "DACS Rank": 284,
    "Symbol": "SUN",
    "Name": "SUN",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 285,
    "Symbol": "STPT",
    "Name": "Standard Tokenization Protocol",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 286,
    "Symbol": "BETA",
    "Name": "Beta Finance",
    "Sector": "DeFi",
    "Industry Group": "Credit Platform",
    "Industry": "Lending / Borrowing",
    "FIELD7": null
  },
  {
    "DACS Rank": 287,
    "Symbol": "JASMY",
    "Name": "JasmyCoin",
    "Sector": "Computing",
    "Industry Group": "IoT",
    "Industry": "IoT",
    "FIELD7": null
  },
  {
    "DACS Rank": 288,
    "Symbol": "STARL",
    "Name": "Starlink",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 289,
    "Symbol": "MBL",
    "Name": "MovieBloc",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Broadcast",
    "FIELD7": null
  },
  {
    "DACS Rank": 290,
    "Symbol": "MNGO",
    "Name": "Mango Markets",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "CLOB",
    "FIELD7": null
  },
  {
    "DACS Rank": 291,
    "Symbol": "RAD",
    "Name": "Radicle",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 292,
    "Symbol": "XSGD",
    "Name": "XSGD",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 81
  },
  {
    "DACS Rank": 293,
    "Symbol": "QKC",
    "Name": "QuarkChain",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 294,
    "Symbol": "META",
    "Name": "Metadium",
    "Sector": "Digitization",
    "Industry Group": "Digitization",
    "Industry": "Digitization",
    "FIELD7": null
  },
  {
    "DACS Rank": 295,
    "Symbol": "ARK",
    "Name": "Ark",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 296,
    "Symbol": "STEEM",
    "Name": "Steem",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 297,
    "Symbol": "USDX",
    "Name": "USDX",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 82
  },
  {
    "DACS Rank": 298,
    "Symbol": "SPA",
    "Name": "Sperax",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 299,
    "Symbol": "KAI",
    "Name": "KardiaChain",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 300,
    "Symbol": "BSW",
    "Name": "Biswap",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 301,
    "Symbol": "SSX",
    "Name": "SOMESING",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Media (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 302,
    "Symbol": "LAT",
    "Name": "PlatON",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 303,
    "Symbol": "PROM",
    "Name": "Prometeus",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 304,
    "Symbol": "DG",
    "Name": "Decentral Games",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 305,
    "Symbol": "POLS",
    "Name": "Polkastarter",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "DAO Builder",
    "FIELD7": null
  },
  {
    "DACS Rank": 306,
    "Symbol": "DAWN",
    "Name": "Dawn Protocol",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 307,
    "Symbol": "ASD",
    "Name": "ASD",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 83
  },
  {
    "DACS Rank": 308,
    "Symbol": "IQ",
    "Name": "Everipedia",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 309,
    "Symbol": "ERG",
    "Name": "Ergo",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 310,
    "Symbol": "QRDO",
    "Name": "Qredo",
    "Sector": "DeFi",
    "Industry Group": "Atomic Swaps",
    "Industry": "Atomic Swaps",
    "FIELD7": null
  },
  {
    "DACS Rank": 311,
    "Symbol": "AGLD",
    "Name": "Adventure Gold",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 312,
    "Symbol": "AKT",
    "Name": "Akash Network",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 313,
    "Symbol": "DERO",
    "Name": "Dero",
    "Sector": "Currency",
    "Industry Group": "Private",
    "Industry": "Private",
    "FIELD7": 84
  },
  {
    "DACS Rank": 314,
    "Symbol": "XVS",
    "Name": "Venus",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent (Other)",
    "FIELD7": 85
  },
  {
    "DACS Rank": 315,
    "Symbol": "RMRK",
    "Name": "RMRK",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Art",
    "Industry": "Art",
    "FIELD7": null
  },
  {
    "DACS Rank": 316,
    "Symbol": "OUSD",
    "Name": "Origin Dollar",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 86
  },
  {
    "DACS Rank": 317,
    "Symbol": "ALCX",
    "Name": "Alchemix",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 318,
    "Symbol": "EPS",
    "Name": "Ellipsis",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "Exchanges (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 319,
    "Symbol": "TOMO",
    "Name": "TomoChain",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 320,
    "Symbol": "VR",
    "Name": "Victoria VR",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "VR Real Estate",
    "FIELD7": null
  },
  {
    "DACS Rank": 321,
    "Symbol": "ABBC",
    "Name": "ABBC Coin",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 87
  },
  {
    "DACS Rank": 322,
    "Symbol": "THG",
    "Name": "Thetan Arena",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 323,
    "Symbol": "AVINOC",
    "Name": "AVINOC",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 88
  },
  {
    "DACS Rank": 324,
    "Symbol": "ORN",
    "Name": "Orion Protocol",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 325,
    "Symbol": "HXRO",
    "Name": "Hxro",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 326,
    "Symbol": "SUSD",
    "Name": "sUSD",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 327,
    "Symbol": "EURS",
    "Name": "STASIS EURO",
    "Sector": "Computing",
    "Industry Group": "IoT",
    "Industry": "IoT",
    "FIELD7": null
  },
  {
    "DACS Rank": 328,
    "Symbol": "XPR",
    "Name": "Proton",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 329,
    "Symbol": "STRK",
    "Name": "Strike",
    "Sector": "DeFi",
    "Industry Group": "Credit Platform",
    "Industry": "Lending / Borrowing",
    "FIELD7": null
  },
  {
    "DACS Rank": 330,
    "Symbol": "AGIX",
    "Name": "SingularityNET",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 89
  },
  {
    "DACS Rank": 331,
    "Symbol": "MTL",
    "Name": "Metal",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 90
  },
  {
    "DACS Rank": 332,
    "Symbol": "WILD",
    "Name": "Wilder World",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 333,
    "Symbol": "HTR",
    "Name": "Hathor",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 91
  },
  {
    "DACS Rank": 334,
    "Symbol": "SNL",
    "Name": "Sport and Leisure",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 335,
    "Symbol": "NSBT",
    "Name": "Neutrino Token",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 336,
    "Symbol": "RIF",
    "Name": "RSK Infrastructure Framework",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 337,
    "Symbol": "MWC",
    "Name": "MimbleWimbleCoin",
    "Sector": "Currency",
    "Industry Group": "Private",
    "Industry": "Private",
    "FIELD7": 92
  },
  {
    "DACS Rank": 338,
    "Symbol": "GHST",
    "Name": "Aavegotchi",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 339,
    "Symbol": "CENNZ",
    "Name": "Centrality",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 340,
    "Symbol": "BADGER",
    "Name": "Badger DAO",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "DAO (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 341,
    "Symbol": "TRU",
    "Name": "TrueFi",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 342,
    "Symbol": "BNX",
    "Name": "BinaryX",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 343,
    "Symbol": "DAR",
    "Name": "Mines of Dalarnia",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 344,
    "Symbol": "HUNT",
    "Name": "HUNT",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Broadcast",
    "FIELD7": null
  },
  {
    "DACS Rank": 345,
    "Symbol": "MIR",
    "Name": "Mirror Protocol",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 346,
    "Symbol": "SFUND",
    "Name": "Seedify.fund",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 347,
    "Symbol": "AIOZ",
    "Name": "AIOZ Network",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Broadcast",
    "FIELD7": null
  },
  {
    "DACS Rank": 348,
    "Symbol": "FUN",
    "Name": "FUNToken",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 349,
    "Symbol": "MLN",
    "Name": "Enzyme",
    "Sector": "DeFi",
    "Industry Group": "Asset Management",
    "Industry": "Asset Management",
    "FIELD7": null
  },
  {
    "DACS Rank": 350,
    "Symbol": "YOOSHI",
    "Name": "YooShi",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 351,
    "Symbol": "BIFI",
    "Name": "Beefy Finance",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 352,
    "Symbol": "ALT",
    "Name": "Alitas",
    "Sector": "Computing",
    "Industry Group": "Private Computing",
    "Industry": "Private Computing",
    "FIELD7": null
  },
  {
    "DACS Rank": 353,
    "Symbol": "SOUL",
    "Name": "Phantasma",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 354,
    "Symbol": "DKA",
    "Name": "dKargo",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 93
  },
  {
    "DACS Rank": 355,
    "Symbol": "UTK",
    "Name": "Utrust",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 94
  },
  {
    "DACS Rank": 356,
    "Symbol": "DEP",
    "Name": "DEAPcoin",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 357,
    "Symbol": "DVI",
    "Name": "Dvision Network",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 358,
    "Symbol": "ADS",
    "Name": "Adshares",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 359,
    "Symbol": "PRO",
    "Name": "Propy",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 360,
    "Symbol": "DVF",
    "Name": "DeversiFi",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "CLOB",
    "FIELD7": null
  },
  {
    "DACS Rank": 361,
    "Symbol": "VRA",
    "Name": "Verasity",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Broadcast",
    "FIELD7": null
  },
  {
    "DACS Rank": 362,
    "Symbol": "STAKE",
    "Name": "STAKE",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 95
  },
  {
    "DACS Rank": 363,
    "Symbol": "DPI",
    "Name": "DeFi Pulse Index",
    "Sector": "DeFi",
    "Industry Group": "Asset Management",
    "Industry": "Asset Management",
    "FIELD7": null
  },
  {
    "DACS Rank": 364,
    "Symbol": "HOO",
    "Name": "Hoo Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 96
  },
  {
    "DACS Rank": 365,
    "Symbol": "GXC",
    "Name": "GXChain",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 366,
    "Symbol": "SFP",
    "Name": "SafePal",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 97
  },
  {
    "DACS Rank": 367,
    "Symbol": "MC",
    "Name": "Merit Circle",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 368,
    "Symbol": "TLM",
    "Name": "Alien Worlds",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 369,
    "Symbol": "CRTS",
    "Name": "Cratos",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "DAO (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 370,
    "Symbol": "ETN",
    "Name": "Electroneum",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 98
  },
  {
    "DACS Rank": 371,
    "Symbol": "LOOM",
    "Name": "Loom Network",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 372,
    "Symbol": "CTK",
    "Name": "CertiK",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 99
  },
  {
    "DACS Rank": 373,
    "Symbol": "BCD",
    "Name": "Bitcoin Diamond",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent (Other)",
    "FIELD7": 100
  },
  {
    "DACS Rank": 374,
    "Symbol": "BAL",
    "Name": "Balancer",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 375,
    "Symbol": "SLP",
    "Name": "Smooth Love Potion",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 101
  },
  {
    "DACS Rank": 376,
    "Symbol": "RBTC",
    "Name": "RSK Smart Bitcoin",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 377,
    "Symbol": "KLV",
    "Name": "Klever",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 102
  },
  {
    "DACS Rank": 378,
    "Symbol": "EXRD",
    "Name": "e-Radix",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 379,
    "Symbol": "ARPA",
    "Name": "ARPA Chain",
    "Sector": "Computing",
    "Industry Group": "Private Computing",
    "Industry": "Private Computing",
    "FIELD7": null
  },
  {
    "DACS Rank": 380,
    "Symbol": "NOIA",
    "Name": "Syntropy",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 381,
    "Symbol": "DPR",
    "Name": "Deeper Network",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 382,
    "Symbol": "GTC",
    "Name": "Gitcoin",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent (Other)",
    "FIELD7": 103
  },
  {
    "DACS Rank": 383,
    "Symbol": "IDEX",
    "Name": "IDEX",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "Exchanges (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 384,
    "Symbol": "AERGO",
    "Name": "Aergo",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 104
  },
  {
    "DACS Rank": 385,
    "Symbol": "CLV",
    "Name": "Clover Finance",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 386,
    "Symbol": "CFG",
    "Name": "Centrifuge",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 387,
    "Symbol": "WAN",
    "Name": "Wanchain",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 388,
    "Symbol": "VRSC",
    "Name": "VerusCoin",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 389,
    "Symbol": "MFT",
    "Name": "Hifi Finance",
    "Sector": "DeFi",
    "Industry Group": "Credit Platform",
    "Industry": "Lending / Borrowing",
    "FIELD7": null
  },
  {
    "DACS Rank": 390,
    "Symbol": "EFI",
    "Name": "Efinity Token",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 391,
    "Symbol": "KP3R",
    "Name": "Keep3rV1",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 105
  },
  {
    "DACS Rank": 392,
    "Symbol": "TKO",
    "Name": "Toko Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 106
  },
  {
    "DACS Rank": 393,
    "Symbol": "ACA",
    "Name": "Acala Token",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 394,
    "Symbol": "CQT",
    "Name": "Covalent",
    "Sector": "Computing",
    "Industry Group": "Oracle",
    "Industry": "Oracle",
    "FIELD7": null
  },
  {
    "DACS Rank": 395,
    "Symbol": "LOKA",
    "Name": "League of Kingdoms Arena",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 396,
    "Symbol": "CRE",
    "Name": "Carry",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 397,
    "Symbol": "VOXEL",
    "Name": "Voxies",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 398,
    "Symbol": "EGG",
    "Name": "Nestree",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 107
  },
  {
    "DACS Rank": 399,
    "Symbol": "FWT",
    "Name": "Freeway Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 108
  },
  {
    "DACS Rank": 400,
    "Symbol": "LCX",
    "Name": "LCX",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 109
  },
  {
    "DACS Rank": 401,
    "Symbol": "TVK",
    "Name": "Terra Virtua Kolect",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 402,
    "Symbol": "TT",
    "Name": "ThunderCore",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 403,
    "Symbol": "HI",
    "Name": "HI",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 110
  },
  {
    "DACS Rank": 404,
    "Symbol": "LINA",
    "Name": "Linear",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 405,
    "Symbol": "BZRX",
    "Name": "bZx Protocol",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 406,
    "Symbol": "AURY",
    "Name": "Aurory",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 407,
    "Symbol": "WNCG",
    "Name": "Wrapped NCG (Nine Chronicles Gold)",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 408,
    "Symbol": "YFII",
    "Name": "DFI.Money",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 409,
    "Symbol": "AQT",
    "Name": "Alpha Quark Token",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Art",
    "Industry": "Art",
    "FIELD7": null
  },
  {
    "DACS Rank": 410,
    "Symbol": "IRIS",
    "Name": "IRISnet",
    "Sector": "Computing",
    "Industry Group": "Oracle",
    "Industry": "Oracle",
    "FIELD7": null
  },
  {
    "DACS Rank": 411,
    "Symbol": "ATA",
    "Name": "Automata Network",
    "Sector": "Computing",
    "Industry Group": "Private Computing",
    "Industry": "Private Computing",
    "FIELD7": null
  },
  {
    "DACS Rank": 412,
    "Symbol": "EROWAN",
    "Name": "SifChain",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 111
  },
  {
    "DACS Rank": 413,
    "Symbol": "AVA",
    "Name": "Travala.com",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 112
  },
  {
    "DACS Rank": 414,
    "Symbol": "FOX",
    "Name": "Shapeshift FOX Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 113
  },
  {
    "DACS Rank": 415,
    "Symbol": "ZB",
    "Name": "ZB Token",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 114
  },
  {
    "DACS Rank": 416,
    "Symbol": "BTS",
    "Name": "BitShares",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 417,
    "Symbol": "CRA",
    "Name": "Crabada",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 418,
    "Symbol": "KILT",
    "Name": "KILT Protocol",
    "Sector": "Digitization",
    "Industry Group": "Digitization",
    "Industry": "Digitization",
    "FIELD7": null
  },
  {
    "DACS Rank": 419,
    "Symbol": "RBN",
    "Name": "Ribbon Finance",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 420,
    "Symbol": "SWAP",
    "Name": "TrustSwap",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 115
  },
  {
    "DACS Rank": 421,
    "Symbol": "COVAL",
    "Name": "Circuits of Value",
    "Sector": "DeFi",
    "Industry Group": "Asset Management",
    "Industry": "Asset Management",
    "FIELD7": null
  },
  {
    "DACS Rank": 422,
    "Symbol": "HIGH",
    "Name": "Highstreet",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "VR Real Estate",
    "FIELD7": null
  },
  {
    "DACS Rank": 423,
    "Symbol": "RFOX",
    "Name": "RedFOX Labs",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 116
  },
  {
    "DACS Rank": 424,
    "Symbol": "FIDA",
    "Name": "Bonfida",
    "Sector": "DeFi",
    "Industry Group": "Asset Management",
    "Industry": "Asset Management",
    "FIELD7": null
  },
  {
    "DACS Rank": 425,
    "Symbol": "FORTH",
    "Name": "Ampleforth Governance Token",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 426,
    "Symbol": "CBK",
    "Name": "Cobak Token",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 117
  },
  {
    "DACS Rank": 427,
    "Symbol": "LTO",
    "Name": "LTO Network",
    "Sector": "Digitization",
    "Industry Group": "Digitization",
    "Industry": "Digitization",
    "FIELD7": null
  },
  {
    "DACS Rank": 428,
    "Symbol": "VXV",
    "Name": "Vectorspace AI",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 429,
    "Symbol": "AMPL",
    "Name": "Ampleforth",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 118
  },
  {
    "DACS Rank": 430,
    "Symbol": "MOC",
    "Name": "Moss Coin",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Metaverse (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 431,
    "Symbol": "ROOK",
    "Name": "KeeperDAO",
    "Sector": "DeFi",
    "Industry Group": "Credit Platform",
    "Industry": "Lending / Borrowing",
    "FIELD7": null
  },
  {
    "DACS Rank": 432,
    "Symbol": "TROY",
    "Name": "TROY",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "Exchanges (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 433,
    "Symbol": "CUSD",
    "Name": "Celo Dollar",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 119
  },
  {
    "DACS Rank": 434,
    "Symbol": "ALPINE",
    "Name": "Alpine F1 Team Fan Token",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 435,
    "Symbol": "UQC",
    "Name": "Uquid Coin",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 120
  },
  {
    "DACS Rank": 436,
    "Symbol": "BOSON",
    "Name": "Boson Protocol",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 121
  },
  {
    "DACS Rank": 437,
    "Symbol": "MLK",
    "Name": "MiL.k",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 122
  },
  {
    "DACS Rank": 438,
    "Symbol": "XCAD",
    "Name": "XCAD Network",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 439,
    "Symbol": "KMD",
    "Name": "Komodo",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Multi-Chain / Parachain",
    "Industry": "Multi-Chain / Parachain",
    "FIELD7": null
  },
  {
    "DACS Rank": 440,
    "Symbol": "PHA",
    "Name": "Phala Network",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 441,
    "Symbol": "ERN",
    "Name": "Ethernity Chain",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Art",
    "Industry": "Art",
    "FIELD7": null
  },
  {
    "DACS Rank": 442,
    "Symbol": "FLM",
    "Name": "Flamingo Finance",
    "Sector": "DeFi",
    "Industry Group": "Atomic Swaps",
    "Industry": "Atomic Swaps",
    "FIELD7": null
  },
  {
    "DACS Rank": 443,
    "Symbol": "GMT",
    "Name": "GMT Token",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 444,
    "Symbol": "DERC",
    "Name": "DeRace",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 445,
    "Symbol": "HNS",
    "Name": "Handshake",
    "Sector": "Digitization",
    "Industry Group": "Digitization",
    "Industry": "Digitization",
    "FIELD7": null
  },
  {
    "DACS Rank": 446,
    "Symbol": "DDX",
    "Name": "DerivaDAO",
    "Sector": "DeFi",
    "Industry Group": "DAO",
    "Industry": "Active DAO",
    "FIELD7": null
  },
  {
    "DACS Rank": 447,
    "Symbol": "PEAK",
    "Name": "PEAKDEFI",
    "Sector": "DeFi",
    "Industry Group": "Asset Management",
    "Industry": "Asset Management",
    "FIELD7": null
  },
  {
    "DACS Rank": 448,
    "Symbol": "BNANA",
    "Name": "Chimpion",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 123
  },
  {
    "DACS Rank": 449,
    "Symbol": "HYDRA",
    "Name": "Hydra",
    "Sector": "Smart Contract Platform",
    "Industry Group": "Single Chain",
    "Industry": "Single Chain",
    "FIELD7": null
  },
  {
    "DACS Rank": 450,
    "Symbol": "PRE",
    "Name": "Presearch",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 451,
    "Symbol": "EUM",
    "Name": "Elitium",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 124
  },
  {
    "DACS Rank": 452,
    "Symbol": "COS",
    "Name": "Contentos",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Broadcast",
    "FIELD7": null
  },
  {
    "DACS Rank": 453,
    "Symbol": "FARM",
    "Name": "Harvest Finance",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 454,
    "Symbol": "ONUS",
    "Name": "ONUS",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 125
  },
  {
    "DACS Rank": 455,
    "Symbol": "DIA",
    "Name": "DIA",
    "Sector": "Computing",
    "Industry Group": "Oracle",
    "Industry": "Oracle",
    "FIELD7": null
  },
  {
    "DACS Rank": 456,
    "Symbol": "QUICK",
    "Name": "QuickSwap",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 457,
    "Symbol": "SAMO",
    "Name": "Samoyedcoin",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 126
  },
  {
    "DACS Rank": 458,
    "Symbol": "CUDOS",
    "Name": "CUDOS",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 459,
    "Symbol": "GF",
    "Name": "GuildFi",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Metaverse (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 460,
    "Symbol": "UPP",
    "Name": "Sentinel Protocol",
    "Sector": "Computing",
    "Industry Group": "Private Computing",
    "Industry": "Private Computing",
    "FIELD7": null
  },
  {
    "DACS Rank": 461,
    "Symbol": "KIN",
    "Name": "Kin",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 127
  },
  {
    "DACS Rank": 462,
    "Symbol": "SPS",
    "Name": "Splintershards",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 463,
    "Symbol": "SOV",
    "Name": "Sovryn",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "CLOB",
    "FIELD7": null
  },
  {
    "DACS Rank": 464,
    "Symbol": "GRID",
    "Name": "Grid+",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent CeFi Currency",
    "FIELD7": 128
  },
  {
    "DACS Rank": 465,
    "Symbol": "ATLAS",
    "Name": "Star Atlas",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "Gaming",
    "FIELD7": null
  },
  {
    "DACS Rank": 466,
    "Symbol": "FCT",
    "Name": "FirmaChain",
    "Sector": "Digitization",
    "Industry Group": "Digitization",
    "Industry": "Digitization",
    "FIELD7": null
  },
  {
    "DACS Rank": 467,
    "Symbol": "BZZ",
    "Name": "Swarm",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 468,
    "Symbol": "SOLO",
    "Name": "Sologenic",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 469,
    "Symbol": "MNW",
    "Name": "Morpheus.Network",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 129
  },
  {
    "DACS Rank": 470,
    "Symbol": "RAI",
    "Name": "Rai Reflex Index",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 130
  },
  {
    "DACS Rank": 471,
    "Symbol": "TITAN",
    "Name": "TitanSwap",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "Exchanges (Other)",
    "FIELD7": null
  },
  {
    "DACS Rank": 472,
    "Symbol": "CUBE",
    "Name": "Somnium Space Cubes",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Metaverse",
    "Industry": "VR Real Estate",
    "FIELD7": null
  },
  {
    "DACS Rank": 473,
    "Symbol": "RARI",
    "Name": "Rarible",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Art",
    "Industry": "Art",
    "FIELD7": null
  },
  {
    "DACS Rank": 474,
    "Symbol": "VEGA",
    "Name": "Vega Protocol",
    "Sector": "DeFi",
    "Industry Group": "Derivatives",
    "Industry": "Derivatives",
    "FIELD7": null
  },
  {
    "DACS Rank": 475,
    "Symbol": "ALPACA",
    "Name": "Alpaca Finance",
    "Sector": "DeFi",
    "Industry Group": "Credit Platform",
    "Industry": "Lending / Borrowing",
    "FIELD7": null
  },
  {
    "DACS Rank": 476,
    "Symbol": "RFR",
    "Name": "Refereum",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Broadcast",
    "FIELD7": null
  },
  {
    "DACS Rank": 477,
    "Symbol": "ELA",
    "Name": "Elastos",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 478,
    "Symbol": "CORE",
    "Name": "cVault.finance",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 479,
    "Symbol": "CHESS",
    "Name": "Tranchess",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 480,
    "Symbol": "DAD",
    "Name": "DAD",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Broadcast",
    "FIELD7": null
  },
  {
    "DACS Rank": 481,
    "Symbol": "RARE",
    "Name": "SuperRare",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Art",
    "Industry": "Art",
    "FIELD7": null
  },
  {
    "DACS Rank": 482,
    "Symbol": "NCT",
    "Name": "PolySwarm",
    "Sector": "Computing",
    "Industry Group": "Private Computing",
    "Industry": "Private Computing",
    "FIELD7": null
  },
  {
    "DACS Rank": 483,
    "Symbol": "XMON",
    "Name": "XMON",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Art",
    "Industry": "Art",
    "FIELD7": null
  },
  {
    "DACS Rank": 484,
    "Symbol": "BIOT",
    "Name": "Bio Passport",
    "Sector": "Digitization",
    "Industry Group": "Digitization",
    "Industry": "Digitization",
    "FIELD7": null
  },
  {
    "DACS Rank": 485,
    "Symbol": "DATA",
    "Name": "Streamr",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 486,
    "Symbol": "GTN",
    "Name": "GlitzKoin",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 131
  },
  {
    "DACS Rank": 487,
    "Symbol": "BLZ",
    "Name": "Bluzelle",
    "Sector": "Computing",
    "Industry Group": "Shared Storage",
    "Industry": "Shared Storage",
    "FIELD7": null
  },
  {
    "DACS Rank": 488,
    "Symbol": "ALEPH",
    "Name": "Aleph.im",
    "Sector": "Computing",
    "Industry Group": "Shared Network",
    "Industry": "Shared Network",
    "FIELD7": null
  },
  {
    "DACS Rank": 489,
    "Symbol": "RISE",
    "Name": "EverRise",
    "Sector": "DeFi",
    "Industry Group": "Atomic Swaps",
    "Industry": "Atomic Swaps",
    "FIELD7": null
  },
  {
    "DACS Rank": 490,
    "Symbol": "SWP",
    "Name": "Kava Swap",
    "Sector": "DeFi",
    "Industry Group": "Exchanges",
    "Industry": "AMM",
    "FIELD7": null
  },
  {
    "DACS Rank": 491,
    "Symbol": "GRS",
    "Name": "Groestlcoin",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 132
  },
  {
    "DACS Rank": 492,
    "Symbol": "MAPS",
    "Name": "MAPS",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "BaaS (Other)",
    "FIELD7": 133
  },
  {
    "DACS Rank": 493,
    "Symbol": "LIT",
    "Name": "Litentry",
    "Sector": "Digitization",
    "Industry Group": "Digitization",
    "Industry": "Digitization",
    "FIELD7": null
  },
  {
    "DACS Rank": 494,
    "Symbol": "ASM",
    "Name": "Assemble Protocol",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Supply Chain / Commerce",
    "FIELD7": 134
  },
  {
    "DACS Rank": 495,
    "Symbol": "QUACK",
    "Name": "RichQUACK.com",
    "Sector": "Currency",
    "Industry Group": "Transparent",
    "Industry": "Transparent DeFi Currency",
    "FIELD7": 135
  },
  {
    "DACS Rank": 496,
    "Symbol": "TPT",
    "Name": "TokenPocket",
    "Sector": "Currency",
    "Industry Group": "BaaS",
    "Industry": "Payments",
    "FIELD7": 136
  },
  {
    "DACS Rank": 497,
    "Symbol": "AKRO",
    "Name": "Akropolis",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 498,
    "Symbol": "BEL",
    "Name": "Bella Protocol",
    "Sector": "DeFi",
    "Industry Group": "Yield",
    "Industry": "Yield",
    "FIELD7": null
  },
  {
    "DACS Rank": 499,
    "Symbol": "ADX",
    "Name": "Ambire AdEx",
    "Sector": "Culture & Entertainment",
    "Industry Group": "Media",
    "Industry": "Social",
    "FIELD7": null
  },
  {
    "DACS Rank": 500,
    "Symbol": "TRB",
    "Name": "Tellor",
    "Sector": "Computing",
    "Industry Group": "Oracle",
    "Industry": "Oracle",
    "FIELD7": null
  }
 ]

//  //
// fetch('coindesk_categories.json')
//   .then(response => response.json())
//   .then(jsonResponse => console.log(jsonResponse)) 


// const getData=()=>{
//   fetch('coindesk_categories.json',{
//         headers : { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         }
//       }
//       )
//       .then(function(response){
//           console.log(response)
//           return response.json();
//         })
//         .then(function(myJson) {
//             console.log(myJson);
//           });
//     }

// getData()
// //


const options = {
  method: 'GET',
  url: 'https://api.coinpaprika.com/v1/tickers',
  params: {},
  headers: {}
};


const getDataFromCoinpaprica = async () => {
  let la;  
  await axios.request(options)
    .then(
      async function (response) {  
        la = await sortCoindeskList(response.data);  
        // console.log("This is la: ", la);
        return la;
      }
    )
    .catch(
          function(error){
            console.log(error);
          }
      )
    
    return la;
}



export async function sortCoindeskList  (current_coin_marketcap_list) {

  let dataSorted = [];
  
  for (let i=0; i < coindesk_coins_list.length; i++) {
    for (let j=0; j < current_coin_marketcap_list.length; j++) {
      // for (let j=0; j < 10; j++) {
      if (coindesk_coins_list[i].Symbol == current_coin_marketcap_list[j].symbol){
        coindesk_coins_list[i]["DACS Rank"] = current_coin_marketcap_list[j].rank;
        dataSorted.push(coindesk_coins_list[i]);
        break;
      }
    }
  }  

  dataSorted.sort((a, b) => a["DACS Rank"] - b["DACS Rank"]);

  let isAllFull = 0;
  for (let i = 0; i < dataSorted.length; i++) {
    for (let j = 0; j < coinSectorList.length; j++) {
      if (dataSorted[i].Sector == coinSectorList[j].sector){
        if (coinSectorList[j].list.length < 10) {
          coinSectorList[j].list.push(dataSorted[i]);
          isAllFull ++;
        }        
        break;
      }   
    }
    if (isAllFull >= 60) {       
      break;
    }
  }
  
  return coinSectorList;
}



initialize_category_db()