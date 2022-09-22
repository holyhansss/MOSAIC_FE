import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function CryptoTable() {
  const columns = [
    { field: "id", headerName: "순위" },
    { field: "name", headerName: "이름" },
    { field: "rating", headerName: "등급" },
    {
      field: "marketPerformance",
      headerName: "MP",
    },
    { field: "criteria", headerName: "기준", width: 300 },
    { field: "tag", headerName: "태그", width: 300 },
    { field: "promising", headerName: "유망코인" },
  ];
  const rows = [
    {
      id: 1,
      name: "Ethereum",
      rating: "A-",
      marketPerformance: "C",
      criteria: "보안성: 26/30 , 확장성: 14/35, 탈중앙성: 27/35 ",
      tag: "#PoS #Smart Contract Platform #L2",
      promising: "O",
    },
    {
      id: 2,
      name: "Bitcoin",
      rating: "AA+",
      marketPerformance: "b",
      criteria: "보안성:85 , 확장성:65, 탈중앙성:15 ",
      tag: "#비트코인 #암호화폐",
      promising: "X",
    },
    {
      id: 3,
      name: "Solana",
      rating: "AA-",
      marketPerformance: "b",
      criteria: "보안성:45 , 확장성:23, 탈중앙성:75 ",
      tag: "#Solana #암호화폐",
      promising: "X",
    },
    {
      id: 4,
      name: "Cardano",
      rating: "BB+",
      marketPerformance: "A",
      criteria: "기술성:54 , 사업성:85",
      tag: "#암호화폐",
      promising: "X",
    },
    {
      id: 5,
      name: "Dogecoin",
      rating: "CC+",
      marketPerformance: "D",
      criteria: "보안성:36 , 확장성:58, 탈중앙성:75 ",
      tag: "#암호화폐",
      promising: "X",
    },
    {
      id: 6,
      name: "Tezos",
      rating: "BB+",
      marketPerformance: "B",
      criteria: "보안성:76 , 확장성:85, 탈중앙성:25 ",
      tag: "#암호화폐",
      promising: "O",
    },
    {
      id: 7,
      name: "Uniswap",
      rating: "BB+",
      marketPerformance: "S",
      criteria: "기술성:26 , 사업성:65",
      tag: "#암호화폐",
      promising: "X",
    },
    {
      id: 8,
      name: "The Graph",
      rating: "CC+",
      marketPerformance: "B",
      criteria: "보안성:36 , 확장성:45, 탈중앙성:23 ",
      tag: "#암호화폐",
      promising: "X",
    },
    {
      id: 9,
      name: "Maker",
      rating: "CC+",
      marketPerformance: "A",
      criteria: "보안성:78 , 확장성:75, 탈중앙성:95 ",
      tag: "#암호화폐",
      promising: "X",
    },
    {
      id: 10,
      name: "Lido DAO",
      rating: "CC-",
      marketPerformance: "D",
      criteria: "보안성:26 , 확장성:85, 탈중앙성:15 ",
      tag: "#암호화폐",
      promising: "O",
    },
    {
      id: 11,
      name: "AppCoin",
      rating: "BB+",
      marketPerformance: "A",
      criteria: "기술성:86 , 사업성:15",
      tag: "#암호화폐",
      promising: "X",
    },
    {
      id: 12,
      name: "Axie Infiniy",
      rating: "AA+",
      marketPerformance: "B",
      criteria: "보안성:86 , 확장성:85, 탈중앙성:96 ",
      tag: "#암호화폐",
      promising: "X",
    },
    {
      id: 13,
      name: "Enjin Coin",
      rating: "SS+",
      marketPerformance: "C",
      criteria: "보안성:76 , 확장성:15, 탈중앙성:35 ",
      tag: "#암호화폐",
      promising: "X",
    },

    {
      id: 14,
      name: "WAX",
      rating: "BB+",
      marketPerformance: "A",
      criteria: "보안성:76 , 확장성:65, 탈중앙성:85 ",
      tag: "#암호화폐",
      promising: "X",
    },

    {
      id: 15,
      name: "SushiSwap",
      rating: "BB+",
      marketPerformance: "E",
      criteria: "보안성:32 , 확장성:35, 탈중앙성:25 ",
      tag: "#암호화폐",
      promising: "X",
    },

    {
      id: 16,
      name: "Ultra",
      rating: "AA+",
      marketPerformance: "S",
      criteria: "기술성:86 , 사업성:73 ",
      tag: "#암호화폐",
      promising: "O",
    },

    {
      id: 17,
      name: "Reef",
      rating: "AA+",
      marketPerformnce: "C",
      criteria: "보안성:89 , 확장성:79, 탈중앙성:69 ",
      tag: "#암호화폐",
      promising: "O",
    },

    {
      id: 18,
      name: "Polkadot",
      rating: "BB+",
      marketPerformance: "B",
      criteria: "보안성:76 , 확장성:85, 탈중앙성:35 ",
      tag: "#암호화폐",
      promising: "X",
    },

    {
      id: 19,
      name: "Compound",
      rating: "AA+",
      marketPerformance: "C",
      criteria: "보안성:86 , 확장성:75, 탈중앙성:25 ",
      tag: "#암호화폐",
      promising: "X",
    },

    {
      id: 20,
      name: "Ankr",
      rating: "CC+",
      marketPerformance: "B",
      criteria: "기술성:78 , 사업성:15",
      tag: "#암호화폐",
      promising: "X",
    },
  ];

  return (
    <div style={{ width: "100%", marginBottom: "5rem" }}>
      <DataGrid
        autoHeight
        columns={columns}
        rows={rows}
        hideFooter
      />
    </div>
  );
}
