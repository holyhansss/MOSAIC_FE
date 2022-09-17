import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function Ranking() {
  const rows = [
    {
      id: 1,
      name: "이더리움",
      rating: "AA+",
      marketPerformance: "C",
      criteria: "보안성:56 , 확장성:75, 탈중앙성:25 ",
      tag: "#이더리움 #암호화폐",
      promising: "X",
    },
  ];

  return (
    <div style={{ height: 250, width: "100%" }}>
      <DataGrid
        columns={[
          { field: "id", headerName: "순위" },
          { field: "name", headerName: "이름", width: 200 },
          { field: "rating", headerName: "등급" },
          {
            field: "marketPerformance",
            headerName: "Market Performance",
            width: 200,
          },
          { field: "criteria", headerName: "기준", width: 200 },
          { field: "tag", headerName: "태그", width: 200 },
          { field: "promising", headerName: "유망코인" },
        ]}
        rows={rows}
      />
    </div>
  );
}
