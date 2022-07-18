import React, { useEffect, useState } from 'react';
import { Grid, Container} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { getDocs, collection } from 'firebase/firestore';
import { dbService } from '../../firebase.js';
//componens
import Comment from '../Comment/Comment.js';
import Reportcard from './Reportcard.js';

function ReportContents() {
    const location = useLocation();
    const id = location.state.id;
    const title = location.state.title;
    const writer = location.state.writer;
    const date = moment(location.state.date).format('YYYY.MM.DD');
    
    const [investments, setInvestments] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [marcro, setMarcro] = useState([]);

    const getContents = async() => {
        const invest = collection(dbService,'weekly_report', id,'investment');
        const policy = collection(dbService,'weekly_report', id,'policy');
        const macroeconomic = collection(dbService,'weekly_report', id,'macroeconomic');
        const querySnapShot = await getDocs(invest);
        const querySnaphot = await getDocs(policy);
        const querySnasphot = await getDocs(macroeconomic);

        querySnapShot.forEach((collection)=> {
            // console.log(collection.id)
            const investObj = {
                title : collection.data().title,
                content : collection.data().content,
            };
            setInvestments(prev => [investObj, ...prev]);
        });

        querySnaphot.forEach((collection)=> {
            // console.log(collection.id)
            const poliObj = {
                title : collection.data().title,
                content : collection.data().content,
            };
            setPolicies(prev => [poliObj, ...prev]);
        });

        querySnasphot.forEach((collection)=> {
            // console.log(collection.id)
            const macroObj = {
                title : collection.data().title,
                content : collection.data().content,
            };
            setMarcro(prev => [macroObj, ...prev]);
        });
    };

    // console.log(investments);
    // console.log(policies);
    // console.log(marcro);
    useEffect(() => { getContents() }, []);

    return ( 
        <div>
            <p />
            <Container maxWidth="md" >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <Reportcard id={id} title={title} writer={writer} date={date} inve={investments} poli={policies} mac={marcro}/>
                </Grid>
                    <Grid item xs={4}>
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

export default ReportContents;
