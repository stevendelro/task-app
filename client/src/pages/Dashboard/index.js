import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MyAppBar from '../../components/MyAppbar';
import MyDrawer from '../../components/MyDrawer';
import TaskListDisplay from '../../components/TaskListDisplay/';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function ResponsiveDrawer(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
  let drawerWidth = 400;
  const classes = useStyles();
  const theme = useTheme();
  const isLargeScreenUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallScreenDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmallScreenDown = useMediaQuery(theme.breakpoints.down('xs'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () =>  setMobileOpen(!mobileOpen);
  if (isLargeScreenUp) drawerWidth = 500;
  if (isSmallScreenDown) drawerWidth = 330;
  if (isExtraSmallScreenDown) drawerWidth = 300;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MyAppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <MyDrawer
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TaskListDisplay />
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
