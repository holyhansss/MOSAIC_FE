import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Box} from '@mui/material';
import ReportDetail from '../../pages/ReportDetail';


function Reportrecentcard({title, writer}) {
    // sessionStorage.setItem('title', title)
    return(
            <Card sx={{ width: 1, height: 250 }}>
                    <CardActionArea
                        href="/reportdetail"
                        onClick={()=>console.log({title})} >
                        <CardMedia
                            component="img"
                            height="170"
                            image="https://cdn.dribbble.com/users/30229/screenshots/17690501/media/4bdd09efb22a073c1f89fc60a8ec59b4.png?compress=1&resize=400x300"
                            alt="green iguana"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {writer}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

        
    )
};



export {Reportrecentcard};

function Reportlistcard({title, date, writer}) {
    
    return(
            <Card sx={{ width: 1, height: 180, margin:1 }}>
                <CardActionArea
                    href="/reportdetail"
                    // onClick={() => console.log("CardActionArea clicked")}
                    >
                    <CardMedia
                    component="img"
                    height="80"
                    image="https://cdn.dribbble.com/users/6882852/screenshots/15667389/media/05682979755d010953d3a3ebca245455.png?compress=1&resize=400x300"
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {writer}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        )
};



export {Reportlistcard};