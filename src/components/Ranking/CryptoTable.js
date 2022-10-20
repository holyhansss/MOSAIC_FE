import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function CryptoTable({ crypto }) {
  const navigate = useNavigate();

  const columns = [
    { field: "docid", headerName: "아이디", hide: true },
    { field: "id", headerName: "순위",  width:60},
    { field: "rate", headerName: "합산", hide: true},
    { field: "name", headerName: "이름", width: 170 },
    { field: "rating", headerName: "등급", width: 60 },
    { field: "criteria", headerName: "기준별 점수", width: 350 },
    { field: "tag", headerName: "태그", width: 350 },
    { field: "type", headerName: "타입", width: 60},
    {
      field: "promising",
      headerName: "유망코인",
      type: "boolean",
      renderCell: (params) => {
        if (params.row.promising == true) {
          return (
            <AssignmentIcon
              onClick={() => {
                navigate("/promising/" + params.row.docid, {
                  state: {
                    id: params.row.docid,
                  },
                });
              }}
            />
          );
        } else {
          return <CloseIcon fontSize="small" />;
        }
      },
    },
  ];

  let rows = [];
  crypto.map((rank, index) => {
    if (rank.type == "coin") {
      rows.push({
        docid: rank.id,
        name: rank.name,
        rating: rank.rating,
        id: index+1,
        tag: rank.hashtag,
        promising: rank.promising,
        criteria: `확장성: ${rank.scalability}　탈중앙성: ${rank.decentralization}　보안성: ${rank.security}　기타: ${rank.others}`,
        rate: rank.rate,
        type: rank.type,
      });
    } else {
      rows.push({
        docid: rank.id,
        name: rank.name,
        rating: rank.rating,
        id: index+1,
        tag: rank.hashtag,
        promising: rank.promising,
        criteria: `사업성: ${rank.business}　기술성: ${rank.technicality}　신뢰성: ${rank.reliability}`,
        rate: rank.rate,
        type: rank.type,
      });
    }
  });

  return (
    <div style={{ width: "100%", marginBottom: "5rem" }}>
      <DataGrid autoHeight MultipleColumnsSorting columns={columns} rows={rows} hideFooter />
    </div>
  );
}
