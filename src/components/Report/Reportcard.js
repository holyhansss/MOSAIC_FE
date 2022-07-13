import * as React from 'react';
import { Grid, Container, Paper} from '@mui/material';
import Typography from '@mui/material/Typography';
import { Inventory2TwoTone } from '@mui/icons-material';



//components
// import ReportAcord from './ReportAcord';



function Reportcard({title, writer, date, inve, poli, mac}) {


  return (
    <Container maxWidth="md">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Typography variant="h3" align='center'>
              {title}
            </Typography>
            <p/>
            <Typography variant="caption" display="block" align="center" gutterBottom>
              {date}
            </Typography>
            <p/>            
            
            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', m: 1 }}>
              거시경제
            </Typography>

            <p/>            
            <div>
            {inve.map((invem, index) =>(
              <div key={index}>
                <p/>
              <Typography variant="h6" align="center" gutterBottom component="div">
                {invem.title}
              </Typography>
              <p/>
              <Typography variant="body1" align="center" gutterBottom component="div">
                {invem.content}
              </Typography>
              <p/>
              </div>
            ))}
            </div>

            <p/>
            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', m: 1 }}>
              크립토 규제/정책
            </Typography>

            <p/>
            <div>
            {poli.map((polic, index) =>(
              <div key={index}>
                <p/>
              <Typography variant="h6" align="center" gutterBottom component="div">
                {polic.title}
              </Typography>
              <p/>
              <Typography variant="body1" align="center" gutterBottom component="div">
                {polic.content}
              </Typography>
              <p/>
              </div>
            ))}
            </div>
            <p/>

            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', m: 1 }}>
              크립토 기술/투자 이슈
            </Typography>

            <p/>
            <div>
            {mac.map((ma, index) =>(
              <div key={index}>
                <p/>
              <Typography variant="h6" align="center" gutterBottom component="div">
                {ma.title}
              </Typography>
              <p/>
              <Typography variant="body1" align="center" gutterBottom component="div">
                {ma.content}
              </Typography>
              <p/>
              </div>
            ))}
            </div>
            <p/>

            <Typography variant="subtitle1" align="center" gutterBottom component="div" sx={{textDecoration: 'underline'}}>
              Credit
            </Typography>
            <Typography variant="subtitle2" align="center" gutterBottom component="div" sx={{ fontWeight: 'bold', m: 1 }}>
              {writer}
            </Typography>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Reportcard;