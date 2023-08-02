import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DangerousIcon from "@mui/icons-material/Dangerous";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

const AllOverData = (props) => {
  const overAllData = props.overAllData;

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        All Over Data
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DangerousIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={overAllData.death} secondary="Death" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SelfImprovementIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={overAllData.recoveries}
            secondary="Recoveries"
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <NewReleasesIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={overAllData.new_cases} secondary="New Cases" />
        </ListItem>
      </List>
    </>
  );
};

export default AllOverData;
