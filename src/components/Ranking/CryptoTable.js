import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Typography, IconButton, Tooltip, Button } from "@mui/material";
import { purple } from "@mui/material/colors";
//Responsive Web
import { Pc, Mobile } from "../Responsive/Responsive";
export default function CryptoTable({ crypto }) {
  const navigate = useNavigate();

  const columns = [
    { field: "docid", headerName: "아이디", hide: true, sortable: false },
    { field: "id", headerName: "순위",  width:100, sortable: false},
    { field: "rate", headerName: "합산", hide: true, sortable: false},
    { field: "name", headerName: "이름", width: 200, sortable: false },
    { field: "rating", headerName: "등급", width: 100, sortable: false, 
    renderCell: (params) => {
      // console.log(rate);
      // console.log(params.row.rating);
      let rate = params.row.criteria;
      let rank = params.row.rating;
      return (
        <div>
          <Tooltip title={rate} disableInteractive>
            <Button sx={{ color: purple[600]}}>
              {rank}
            </Button>
          </Tooltip>
        </div>
        
      )
    }  },
    { field: "criteria", headerName: "기준별 점수", hide: true, sortable: false },
    { field: "tag", headerName: "태그", width: 500, sortable: false,
    renderCell: (params) => {
      const chipTag = params.row.tag.split(" ")
        return (
          <Stack direction="row" spacing={0.5}>
            {
              chipTag.map((chip, idx) => <Chip key={idx} label={chip} size="small" />)
            }
          </Stack>
        )
    } 
  },
    { field: "type", headerName: "타입", width: 120, sortable: false},
    {
      field: "promising",
      headerName: "유망코인",
      type: "boolean",
      width: 120, 
      sortable: false,
      renderCell: (params) => {
        if (params.row.promising == true) {
          return (
            <IconButton onClick={() => {
              navigate("/promising/" + params.row.docid, {
                state: {
                  id: params.row.docid,
                },
              });
            }}>
              <AssignmentIcon />
            </IconButton>
          );
        } else {
          return (
            <Typography> </Typography>
          );
        }
      },
    },
  ];

  const columns2 = [
    { field: "docid", headerName: "아이디", hide: true, sortable: false },
    { field: "id", headerName: "순위",  width:100, sortable: false},
    { field: "rate", headerName: "합산", hide: true, sortable: false},
    { field: "name", headerName: "이름", width: 200, sortable: false },
    { field: "rating", headerName: "등급", width: 150, sortable: false, 
    renderCell: (params) => {
      // console.log(rate);
      // console.log(params.row.rating);
      let rate = params.row.criteria;
      let rank = params.row.rating;
      return (
        <div>
          <Tooltip title={rate} disableInteractive>
            <Button sx={{ color: purple[600]}}>
              {rank}
            </Button>
          </Tooltip>
        </div>
        
      )
    }  },

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
        criteria: `확장성: ${Math.round((rank.scalability/25)*100)}　탈중앙성: ${Math.round((rank.decentralization/25)*100)}　보안성: ${Math.round((rank.security/25)*100)}　기타: ${Math.round((rank.others/25)*100)}`,
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
        criteria: `사업성: ${Math.round((rank.business/40)*100)}　기술성: ${Math.round((rank.technicality/20)*100)}　신뢰성: ${Math.round((rank.reliability/40)*100)}`,
        rate: rank.rate,
        type: rank.type,
      });
    }
  });

  let rows2 = [];
  crypto.map((rank, index) => {
    if (rank.type == "coin") {
      rows2.push({
        docid: rank.id,
        name: rank.name,
        rating: rank.rating,
        id: index+1,
        tag: rank.hashtag,
        promising: rank.promising,
        criteria: `확장성: ${Math.round((rank.scalability/25)*100)}　탈중앙성: ${Math.round((rank.decentralization/25)*100)}　보안성: ${Math.round((rank.security/25)*100)}　기타: ${Math.round((rank.others/25)*100)}`,
        rate: rank.rate,
        type: rank.type,
      });
    } else {
      rows2.push({
        docid: rank.id,
        name: rank.name,
        rating: rank.rating,
        id: index+1,
        tag: rank.hashtag,
        promising: rank.promising,
        criteria: `사업성: ${Math.round((rank.business/40)*100)}　기술성: ${Math.round((rank.technicality/20)*100)}　신뢰성: ${Math.round((rank.reliability/40)*100)}`,
        rate: rank.rate,
        type: rank.type,
      });
    }
  });


  return (
    <>
    <Pc>
    <div style={{ width: "100%", marginBottom: "5rem" }}>
      <DataGrid autoHeight MultipleColumnsSorting columns={columns} rows={rows} hideFooter />
    </div>
    </Pc>
    <Mobile>
    <div style={{ width: "100%", marginBottom: "5rem" }}>
      <DataGrid autoHeight MultipleColumnsSorting columns={columns2} rows={rows2} hideFooter />
    </div>
    </Mobile>
    </>
  );
}
