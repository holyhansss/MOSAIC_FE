import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Typography, Grid } from "@mui/material";


export default function RatingDes() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Coin" value="1" />
            <Tab label="Token" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <Typography variant="h6"  sx={{ mb: 2 }}>코인 평가 기준</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>사업성: 기존에 존재하는 Dapp과의 차별성 및 시장성, 상품성을 분석하여 성장 가능성과 지속성을 평가합니다.</Typography>
            <Typography variant="body1" sx={{ mt: 1 }} >기술성: Dapp이 기술적 결함이 있는지 확인하는 절차로, Auditing 이력과 지원하는 블록체인을 평가합니다.</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>신뢰성: Dapp이 유저가 신뢰하고 사용 할 수 있는지를 검증하기 위해 탈중앙성과 Developer team을 평가합니다.</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>기타: Dapp의 활성화 정도를 평가합니다.</Typography>
        </TabPanel>
        <TabPanel value="2">
            <Typography variant="h6" sx={{ mb: 2 }} >토큰 평가 기준</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>확장성: 사용자 수와 거래건수가 늘어나도 유연하게 대응할 수 있는가를 파악합니다.</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>탈중앙성: 중앙집중화를 벗어나 분산된 소규모 단위로 자율적으로 운영되는 정도입니다.</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>보안성: 블록체인 내의 데이터를 권한이 없는 이용자가 사용할 수 없도록 하는지를 파악합니다.</Typography>
        </TabPanel>
      </TabContext>
    </Box>
    </Grid>
  );
}
