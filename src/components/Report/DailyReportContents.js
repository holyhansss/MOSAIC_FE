import React, { useEffect, useState } from "react";
import { Grid, Container,} from "@mui/material";
import {doc, getDoc } from "firebase/firestore";
import { dbService } from "../../firebase.js";

import { DailyReportcard } from "./Reportcard.js";

function DailyReportcontents({ user, id, title, writer, date }) {

const [daily_contents, setDaily_contents] = useState(null);

  const getContents = async () => {
    const docRef = doc(dbService, "daily_report",id);
    const docSnap = await getDoc(docRef);
    setDaily_contents(docSnap.data())
  };

  useEffect(() => {
    getContents();
  }, []);


  return (
    <div>
      <Container maxWidth="sm">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {
              daily_contents == null ? (
                null
              ) : (
              <DailyReportcard
                id={id}
                title={title}
                writer={writer}
                date={date}
                daily={daily_contents}
              />
              )
            }
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default DailyReportcontents;
