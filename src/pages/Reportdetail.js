import React from 'react';
import Comment from '../component/Comment';
import Reportcard from '../component/Reportcard';
import { Grid, Container,Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import Reportacord from '../component/Reportacord';

function Reportdetail({Title}) {
    // sessionStorage.getItem({Title})
    return (
        <div>
            <Container maxWidth="md" >
                <Grid container spacing={1}>
                    <Reportcard />
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

export default Reportdetail;