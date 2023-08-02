import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';

const StateList = (props) => {
  const stateList = props.stateList
  return (
    <>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      State wise Data
    </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell align="right">New Cases</TableCell>
            <TableCell align="right">Recoveries</TableCell>
            <TableCell align="right">Death</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stateList.map((row) => (
            <TableRow
              key={row.state}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.state}
              </TableCell>
              <TableCell align="right">{row.newcase}</TableCell>
              <TableCell align="right">{row.recoveries}</TableCell>
              <TableCell align="right">{row.death}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default StateList;
