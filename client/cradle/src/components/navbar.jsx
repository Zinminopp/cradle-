import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  useTheme
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Menu as MenuIcon,   Home as HomeIcon, FiberNew as NewsIcon } from '@mui/icons-material';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from '../state';
import UserImage from './userImage';



const Navbar = () =>{

    const [anchorEl, setAnchorEl] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleProfileMenuClose = () => {
        setAnchorEl(null);
      };


      const toggleDrawer = (open) => (event) => {
        if (
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setIsDrawerOpen(open);
      };
      
      const theme = useTheme();


      const drawerList = (
        <List style={{ width:200 }}>
          <ListItem button onClick={() => navigate("/home")} style={{'&:hover':{backgroundColor: theme.palette.primary}}}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" style={{ fontWeight: 'bold' }}/>
          </ListItem>
          <ListItem button onClick={() => navigate("/news")} >
            <ListItemIcon>
              <NewsIcon  />
            </ListItemIcon>
            <ListItemText primary="News" />
          </ListItem>
        </List>
      );



      return (
        <ThemeProvider theme={theme}>
          <AppBar position="static" backgroundColor = "D1CEBD">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                <img src={logo} alt="Logo" style={{ height: '80px', width: '80px' }}/>
              </Typography>
              <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                <UserImage image={user.profilePicture} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={() => {navigate(`/profile/${user._id}`);}}>Profile</MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)} style={{ width: 250 }}>
            {drawerList}
          </Drawer>
        </ThemeProvider>
      );
    };
    
export default Navbar;
