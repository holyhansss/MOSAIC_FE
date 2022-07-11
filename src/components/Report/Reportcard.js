import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReportAcord from './ReportAcord';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Reportcard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 860 }}>
      <CardHeader
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={
          <Typography variant="h2" gutterBottom component="div">
          7월 1주차 모자익 리포트
      </Typography>
        }
        subheader="2022.07.01 Mosaic"
      />
      <CardMedia
        component="img"
        height="500"
        image="https://cdn.dribbble.com/users/6882852/screenshots/15667389/media/05682979755d010953d3a3ebca245455.png?compress=1&resize=400x300"
        alt="Paella dish"
      />
      <CardContent>
        <ReportAcord />
        {/* <Typography variant="h6" gutterBottom component="div">
            거시경제
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="div">
            암호화폐 전문 헤지펀드 3AC, 6 억 7000 만 달러 디폴트(채무 불이행)선언
            <br />
            러시아, 외화표시 국채 디폴트
            <br />
            라가르드 ECB 총재 "필요시 금리 인상 속도 높일 것"
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
            크립토 규제/정책
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="div">
            EU 집행위원회에서 암호화폐 규제 프레임워크(MiCA) 도입 찬성
            <br />
            모로코 중앙은행, 글로벌 금융기관들과 협업하여 규제 방안 구축 본격화
            <br />
            젠슬러 SEC 의장 ‘하나의 규제 기준’ 강조하며 美 암호화폐 시장 강화 우려 표해.
        </Typography> */}
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>러시아, 외화표시 국채 디폴트</Typography>
          <Typography paragraph>
          러시아가 104년 만에 처음으로 외화 표시 국채에 대해 이자를 지급하지 못해 채무불이행 즉 디폴트에 빠졌다. 러시아는 달러와 유로화로 된 약 1억 달러 규모의 외화표시 국채 이자를 투자자들에게 현지 시각 27 일까지 지급했어야 했지만 이를 이행하지 못했다. 이번 디폴트는 미국 등 서방이 러시아의 국제 결제 통로를 막으면서 발생했다. 결국 미국계 국제신용평가업체 무디스가 27 일(현지시간) 늦은 밤 러시아의 디폴트를 선언했다. 
          s러시아의 티폴트가 국제 금융시장에 미칠 영향은 미미할 것이라고 외신들은 보고 있다. 이미 예상됐던 것이며, 러시아는 이미 국제금융결제시스템 ‘스위프트’에서 제외돼 국제 금융시장에 미치는 영향이 제한적일 것이기 때문이다.
          </Typography>
          <Typography paragraph>EU 집행위원회에서 암호화폐 규제 프레임워크(MiCA) 도입 찬성</Typography>
          <Typography paragraph>
          6 월 30 일, 유럽연합 집행위원회와 유럽연합(EU) 의원, 회원국들은 암호화폐 시장 규제에 관한 회의를 열었다. 이에 Markets in Crypto-Assets(MiCA)라는 새로운 규제안을 발표하고, 암호화폐 시장에 대한 포괄적인 규제 틀을 만드는 첫번째 시도였다. 해당 규제에서는 지난 5 월 있었던 루나(테라) 사태를 언급하며, 소비자 보호를 위해 스테이블 코인의 경우 충분한 유동성 지급 준비를 확보하기 위해, 
          일일 거래량이 200 만 유로를 넘지 않도록 제한하기로 결정했다.
          </Typography>
          <Typography paragraph>모로코 중앙은행, 글로벌 금융기관들과 협업하여 규제 방안 구축 본격화</Typography>
          <Typography paragraph>
          모로코 중앙은행인 뱅크알마그립(BAM)이 비트코인과 암호화폐 시장을 공식 규제할 채비를 하고 있다. 
          해당 규제는 암호화폐의 전면적 금지가 아니라 자금세탁과 테러방지 자금조달과 
          싸우기 위한 움직임이 될 것으로 보인다. 모로코는 조세피난처로 많은 암호화폐 기업들이 모로코에 본사를 두고 있다. 
          모로코는 2017 년 일찍이 비트코인 거래를 금지했지만, 시장의 기하급수적 성장으로 인해 규제를 풀었고
          2021 년에는 아프리카 내 암호화폐 거래량 순위에서 4 위를 차지했다.
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Reportcard;