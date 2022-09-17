import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

function CryptoTable() {


    const rows = [
        {
          랭킹: 1,
          이름: '이더리움',
          등급: 'AA+',
          Market_Performance: "C",
          기준: "보안성:56 , 확장성:75, 탈중앙성:25 ",
          태그: "#이더리움 #암호화폐",
          유망코인: "X", 
        },
      ];
  return (
    <div style={{ height: 250, width: '100%' }}>
        <DataGrid
        columns={[{ field: '랭킹' },{ field: '이름', width: 200 }, { field: '등급' },{ field: 'Market Perfomance' , width: 200},{field: "기준"},{field: "태그"},{field: "유망코인"} ]}
        rows={rows}
        />
    </div>
      
  );
}

export default CryptoTable;