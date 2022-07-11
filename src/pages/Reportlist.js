import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {Container, Grid, Box} from '@mui/material';
import { getDocs, query, where, collection, orderBy } from 'firebase/firestore';
import { dbService } from '../firebase.js';
import {Reportlistcard, Reportrecentcard} from '../components/Report/Reportlistcard.js';


function ReportList() {
    // let recent = reports[0].title
    const [reports, setReports] = useState([]);
    const [invest, setInvest] = [useState([])];

    const getReports = async() => {
        const q = query(collection(dbService, "weekly_report"),orderBy("date"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());

            const reportObj = {
                title : doc.data().title,
                date : doc.data().date,
                writer : doc.data().writer,
                // invest : doc.c,
            };
            setReports(prev => [reportObj, ...prev]);
        });
    };
    let result = reports[0];
    console.log(reports)
    useEffect(() => { getReports() }, []);


    

    return(
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom component="div">
                        최신리포트
                    </Typography>
                </Grid>
                <Grid item xs={12}>

                    <div>
                        {/* { result !== "undefined" ?
                        // console.log(result?.writer)
                        <Reportrecentcard title={result?.title} writer={result?.writer} />
                    : console.log("no")} */}

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
                                <Reportlistcard title={report.title} date={report.date} writer={report.writer}/>
                            </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>

        

        
    )
};


export default ReportList;

