import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function CryptoTable({crypto}) {
  const columns = [
    { field: "id", headerName: "순위" },
    { field: "name", headerName: "이름" },
    { field: "rating", headerName: "등급" },
    { field: "criteria", headerName: "기준", width: 300 },
    { field: "tag", headerName: "태그", width: 300 },
    { field: "promising", headerName: "유망코인" },
  ];
  
  let rows=[];
  crypto.map((rank, index) => {
    if (rank.type == 'coin') {
      rows.push(
        {
          id: index+1,
          name: rank.name,
          rating: rank.rating,
          tag: rank.hashtag,
          promising: rank.promising,
          criteria: '확장성 : '+ rank.scalability +' 보안성 : '+ rank.security+ ' 탈중앙성 : '+ rank.decentralization ,

        }
      )
    } else {
      rows.push(
        {
          id: index+1,
          name: rank.name,
          rating: rank.rating,
          tag: rank.hashtag,
          promising: rank.promising,
          criteria: '안전성 : '+ rank.reliability +' 기술성 : '+ rank.technicality+ ' 사업성 : '+ rank.business,

        }
      )
    }
  } 
  );


  return (
    <div style={{ width: "100%", marginBottom: "5rem" }}>
      <DataGrid autoHeight columns={columns} rows={rows} hideFooter />
    </div>
  );
}
