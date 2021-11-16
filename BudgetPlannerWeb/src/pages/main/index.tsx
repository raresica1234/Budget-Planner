import React, { PropsWithChildren, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../assets/logo.svg";
import styles from "./main.module.scss";
import { TabNumberContext } from "./main-store";
import { observer } from "mobx-react";
import { TabPanel, tabProps } from "./tabs";


const MainPage = () => {
  const {
    tabNumber,
    setTabNumber,
  } = useContext(TabNumberContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };

  return (
    <Box className={styles.mainContainer}>

      <AppBar
       position="static"
       className={styles.appBar}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className={styles.menuIconButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className={styles.appTitle}>
            Budget Planner
          </Typography>
          <img className={styles.logo} alt="Logo" src={Logo}/>
        </Toolbar>
      </AppBar>

      <Box className={styles.tabsBar}>
        <Tabs value={tabNumber} onChange={handleChange} aria-label="tab changer">
          <Tab className={styles.tab} label="Your lists" {...tabProps(0)} />
          <Tab className={styles.tab} label="Shared lists" {...tabProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabNumber} index={0}>
        User lists component here
      </TabPanel>
      <TabPanel value={tabNumber} index={1}>
        Shared lists component here
      </TabPanel>

    </Box>
  );
}

export default observer(MainPage);