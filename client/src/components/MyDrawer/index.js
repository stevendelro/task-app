import React from 'react';
import NewTaskForm from './NewTaskForm';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

function MyDrawer({ mobileOpen, handleDrawerToggle, drawerWidth, window }) {
  const useStyles = makeStyles(theme => ({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
  }));
  const container =
  window !== undefined ? () => window().document.body : undefined;
  const theme = useTheme();
  const classes = useStyles();

  return (
    <article className={classes.drawer}>
    {/* Extra Small Screens */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
          <NewTaskForm />
        </Drawer>
      </Hidden>
      {/* Large screens */}
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open>
          <NewTaskForm />
        </Drawer>
      </Hidden>
    </article>
  );
}

export default MyDrawer;
