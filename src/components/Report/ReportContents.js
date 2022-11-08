import React, { useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import { getDocs, collection } from "firebase/firestore";
import { dbService } from "../../firebase.js";

//components
import {Reportcard} from "./Reportcard.js";

function ReportContents({ user, id, title, writer, date }) {
  const [marcro, setMarcro] = useState([]);
  const [insights, setInsights] = useState([]);

  const getContents = async () => {

    const macroeconomic = collection(
      dbService,
      "weekly_report",
      id,
      "macroeconomic"
    );
    const insight = collection(dbService, "weekly_report", id, "insight");
    const querySnasphot = await getDocs(macroeconomic);
    const querySnasphotS = await getDocs(insight);


    querySnasphot.forEach((collection) => {
      const macroObj = {
        title: collection.data().title,
        content: collection.data().content,
      };
      setMarcro((prev) => [macroObj, ...prev]);
    });

    querySnasphotS.forEach((collection) => {
      const insiObj = {
        includedDoc: collection.data().includedDoc,
        content: collection.data().content,
      };
      setInsights((prev) => [insiObj, ...prev]);
    });
  };

  useEffect(() => {
    getContents();
  }, []);
  return (
    <div>
      <Container maxWidth="sm">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Reportcard
              id={id}
              title={title}
              writer={writer}
              date={date}
              mac={marcro}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ReportContents;
