import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {Container, Grid, Box} from '@mui/material';
import { getDocs, query, collection, orderBy } from 'firebase/firestore';
import { dbService } from '../firebase.js';

//components
import {Reportlistcard, Reportrecentcard} from '../components/Report/Reportlistcard.js';


function ReportList() {
    const [reports, setReports] = useState([]);

    const getReports = async() => {
        const q = query(collection(dbService, "weekly_report"), orderBy("date"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docs) => {
            const reportObj = {
                id : docs.id,
                title : docs.data().title,
                date : docs.data().date,
                writer : docs.data().writer,
            };
            setReports(prev => [reportObj, ...prev])
            
        });
    };
    let result = reports[0];
    useEffect(() => { getReports() }, []);

    return(
        <div>
        <p />
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom component="div">
                        최신리포트
                    </Typography>
                </Grid>
                <Grid item xs={12}>

                    <div>
                        { result !== undefined ?
                        <Reportrecentcard id={result.id} title={result.title} writer={result.writer} date={result.date}/>
                    : null}

                    </div>                
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom component="div">
                        주간리포트
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 20 }}>
                            {reports.slice(1).map((report,index) => (
                            <Grid item xs={2} sm={4} md={4} key={index} >
                                <Reportlistcard id={report.id} title={report.title} date={report.date} writer={report.writer}/>
                            </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </div>

        

        
    )
};


export default ReportList;

