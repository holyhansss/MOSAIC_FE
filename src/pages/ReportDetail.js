import * as React from 'react';
import {Box, Tab} from '@mui/material';
import {TabList, TabPanel, TabContext} from '@mui/lab';

//components
import Header from '../components/Header/Header';
import ReportContents from '../components/Report/ReportContents';
import Winner from '../components/Report/Winner';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <Header />
    <p />
      <TabContext value={value}>
        <Box sx={{  borderColor: 'divider' }} ml={76}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
          </TabList>
        </Box>
        <p/>
        <TabPanel value="1"><ReportContents /></TabPanel>
        <TabPanel value="2"><Winner /></TabPanel>
      </TabContext>

    </div>

  );
}
