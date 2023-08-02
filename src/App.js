import "./App.css";
import StateList from "./components/StateList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { fetchStates } from "./services/stateAPIService";
import { useEffect, useState } from "react";
import AllOverData from "./components/AllOverData";
import BarChart from "./components/BarChart";


function createData(state, newcase, recoveries, death) {
  newcase = !newcase || isNaN(newcase) ? 0 : parseInt(newcase);
  recoveries = !recoveries || isNaN(recoveries) ? 0 : parseFloat(recoveries);
  death = !death || isNaN(death) ? 0 : parseInt(death);
  return { state, newcase, recoveries, death };
}

function App() {
  const [stateList, setStateList] = useState([]);
  const [overAllData, setOverAllData] = useState([]);

  useEffect(() => {
    //check whether state list has data or not
      (async () => {
        let response = await fetchStates();
        const getSateWiseData = (rawData) => {
          let formattedData = {};
          rawData.data.forEach((eachData) => {
            const { update } = eachData;
            const updateStr = update.replace(/[\n]/gm, " ");

            const inArr1 = updateStr.split("in");
            let key = "";

            inArr1.forEach((eachIn, index) => {
              if (index === 2) return;

              if (index === 0) {
                key = inArr1[1].trim().split(" ")[0];
              }

              if (inArr1.length > 2 && index === 1) {
                key = inArr1[2].trim().split(" ")[0];
              }

              const hasDeaths = eachIn.includes("death");
              const hasNewCases = eachIn.includes("new case");
              const hasRecoveries = eachIn.includes("recoverie");

              if (hasDeaths) {
                const deathArr = eachIn.split("death");
                const deathCount = deathArr[0].split(" ");
                const death = deathCount[deathCount.length - 2].replace(
                  /[\n]/gm,
                  " "
                );
                const updatedDeath = formattedData[`${key}`]?.death || 0;
                formattedData[`${key}`] = formattedData[`${key}`]
                  ? { ...formattedData[`${key}`], death: updatedDeath + death }
                  : { death: death ? parseInt(death) : 0 };
              }

              if (hasNewCases) {
                const newCaseArr = eachIn
                  .replace(/\n/g, " ")
                  .split("recoverie");
                const newCaseCount = newCaseArr[0].split(" ");
                const updatedNew_cases =
                  formattedData[`${key}`]?.new_cases || 0;

                formattedData[`${key}`] = formattedData[`${key}`]
                  ? {
                      ...formattedData[`${key}`],
                      new_cases:
                        updatedNew_cases +
                        (newCaseCount[0] ? parseInt(newCaseCount[0]) : 0),
                    }
                  : {
                      new_cases: newCaseCount[0]
                        ? parseInt(newCaseCount[0])
                        : 0,
                    };
              }

              if (hasRecoveries) {
                const newRecoveriesArr = eachIn
                  .replace(/\n/g, " ")
                  .split("recoverie");
                const newRecoveriesCount = newRecoveriesArr[0].split(" ");
                formattedData[`${key}`] = formattedData[`${key}`]
                  ? {
                      ...formattedData[`${key}`],
                      recoveries: newRecoveriesCount[0],
                    }
                  : {
                      recoveries: newRecoveriesCount[0]
                        ? parseInt(newRecoveriesCount[0])
                        : 0,
                    };
              }
            });
          });
          return formattedData;
        };

        const getOverAllData = (formattedData) => {
          const values = Object.values(formattedData);
          const overAll = values.reduce(
            (overAll, data) => {
              const { death, recoveries, new_cases } = data;
              return {
                death: overAll.death + (death ? parseInt(death) : 0),
                recoveries:
                  overAll.recoveries + (recoveries ? parseInt(recoveries) : 0),
                new_cases:
                  overAll.new_cases + (new_cases ? parseInt(new_cases) : 0),
              };
            },
            {
              death: 0,
              recoveries: 0,
              new_cases: 0,
            }
          );
          return overAll;
        };

        // get state wise data
        const stateWiseData = getSateWiseData(response);
        const stateWiseDataOutput = [];

        for (const state in stateWiseData) {
          const { new_cases, recoveries, death } = stateWiseData[state];
          stateWiseDataOutput.push(
            createData(state, new_cases, recoveries, death)
          );
        }

        // set overall data
        setOverAllData(getOverAllData(stateWiseData));

        //set the state list data
        setStateList(stateWiseDataOutput);
      })();

  }, []);

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
        </Toolbar>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 300,
                  }}
                >
                  <BarChart barData={overAllData}/>
                </Paper>
              </Grid>
                <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 300,
                  }}
                ><AllOverData overAllData={overAllData}/></Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <StateList stateList={stateList} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
