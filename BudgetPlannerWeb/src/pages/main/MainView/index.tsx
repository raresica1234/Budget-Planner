import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
	Tabs,
	Tab,
	Box,
	AppBar,
	Toolbar,
	Typography,
	IconButton
} from "@mui/material";
import Logo from "../../../assets/logo.svg";
import styles from "./main.module.scss";
import { TabNumberContext } from "./main-store";
import { observer } from "mobx-react";
import { TabPanel, tabProps } from "./tabs";
import ListsView from "../../../components/ListsView";

const lists = [{
	id: "1",
	name: "Test1",
	createdAt: new Date(),
	updatedAt: new Date(),
}, {
	id: "2",
	name: "Test2",
	createdAt: new Date(),
	updatedAt: new Date(),
}, {
	id: "3",
	name: "Test3",
	createdAt: new Date(),
	updatedAt: new Date(),
}, {
	id: "4",
	name: "Test4",
	createdAt: new Date(),
	updatedAt: new Date(),
}];

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
					<img className={styles.logo} alt="Logo" src={Logo} />
				</Toolbar>
			</AppBar>

			<Box className={styles.tabsBar}>
				<Tabs value={tabNumber} onChange={handleChange} aria-label="tab changer">
					<Tab className={styles.tab} label="Your lists" {...tabProps(0)} />
					<Tab className={styles.tab} label="Shared lists" {...tabProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={tabNumber} index={0}>
				<ListsView lists={lists} />
			</TabPanel>
			<TabPanel value={tabNumber} index={1}>
				Shared lists component here
			</TabPanel>
		</Box>
	);
}

export default observer(MainPage);