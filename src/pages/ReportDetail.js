import React from 'react';
import Comment from '../components/Comment/Comment';
import Reportcard from '../components/Report/Reportcard';
import { Grid, Container,Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

function ReportDetail() {
    const location = useLocation();
    const title = location.state.title
    const writer = location.state.writer
    const date = moment(location.state.date).format('YYYY.MM.DD')
    return ( 
        <div>
            <Container maxWidth="md" >
                <Grid container spacing={1}>
                    <Reportcard title={title} writer={writer} date={date} />
                    {/* <Reportacord /> */}
                    <Grid item xs={4} ml={90}>
                        <VisibilityIcon />
                        <IconButton>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton>
                            <ShareIcon />
                        </IconButton>
                    </Grid> 

                    <Grid item xs={12}>
                        <Comment />
                    </Grid>
                </Grid>
            </Container>
        </div>




    )
};

export default ReportDetail;
