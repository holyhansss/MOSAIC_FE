import React, { useEffect, useState } from 'react';
import { Grid, Container} from '@mui/material';
import { getDocs, collection} from 'firebase/firestore';
import { dbService } from '../../firebase.js';

//components
import Reportcard from './Reportcard.js';


function ReportContents({user, id, title, writer, date}) {

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
            const investObj = {
                title : collection.data().title,
                content : collection.data().content,
            };
            setInvestments(prev => [investObj, ...prev]);
        });

        querySnaphot.forEach((collection)=> {
            const poliObj = {
                title : collection.data().title,
                content : collection.data().content,
            };
            setPolicies(prev => [poliObj, ...prev]);
        });

        querySnasphot.forEach((collection)=> {
            const macroObj = {
                title : collection.data().title,
                content : collection.data().content,
            };
            setMarcro(prev => [macroObj, ...prev]);
        });
    };

    useEffect(() => { getContents() }, []);

    return ( 
        <div>
            <p />
            <Container maxWidth="md" >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <Reportcard id={id} title={title} writer={writer} date={date} inve={investments} poli={policies} mac={marcro}/>
                </Grid>
                </Grid>
            </Container>
        </div>
    )
};

export default ReportContents;
