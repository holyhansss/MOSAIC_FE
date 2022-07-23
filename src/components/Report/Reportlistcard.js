import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Reportrecentcard({id, title, writer, date, likes}) {
    const navigate = useNavigate();
    const move = () => {
        // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다. (id, job을 넣어봤다)
        navigate('/reportDetail/' + title, {
          state: {
            id : id,
            title: title,
            writer: writer,
            date: date,
            likes : likes
          }
        });
      };

      return(
            <Card sx={{ width: 1, height: 250 }}>
                    <CardActionArea
                        onClick={move}
                        >
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

function Reportlistcard({id,title, date, writer, likes}) {
    const navigate = useNavigate();
    const move = () => {
        // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다. (id, job을 넣어봤다)
        navigate('/reportDetail' + title, {
          state: {
            id: id,
            title: title,
            writer: writer,
            date: date,
            likes : likes
          }
        });
      };
    return(
            <Card sx={{ width: 1, height: 180, margin:1 }}>
                <CardActionArea
                    onClick={move}
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