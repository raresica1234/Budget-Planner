import React, { useContext, useEffect } from "react";
import {
	Tabs,
	Tab,
	Box,
	AppBar,
	Toolbar,
	Typography,
	TextField,
	Button
} from "@mui/material";
import Logo from "../../../assets/logo.svg";
import styles from "./main.module.scss";
import { MainViewContext } from "./main-store";
import { observer } from "mobx-react";
import { TabPanel, tabProps } from "./tabs";
import AddListButton from "../list-view/add-list-button";
import ListsView from "../list-view/list/components/lists-view";
import { CreatedListsViewContext } from "../list-view/list/created-lists-view-store";
import {SharedListsViewContext} from "../list-view/list/shared-lists-view-store";
import EditListDialog from "../list-view/edit-list-dialog";
import { UpdateListButtonContext } from "../list-view/update-list-button/update-list-button-store";
import LogoutButton from "../../accounts/logout";
import StatisticsDialog from "./statistics-dialog";

const MainPage = () => {
	const {
		tabNumber,
		searchKeyword,
		statisticsData,
		statisticsIsOpen,
		setTabNumber,
		setSearchKeyword,
		populateAndOpenStatistics,
		closeStatistics,
		initialize
	} = useContext(MainViewContext);

	const { list, closeDialog } = useContext(UpdateListButtonContext);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabNumber(newValue);
	};

	useEffect(() => {
		initialize();
	}, [initialize]);

	const onStatisticsClick = () => { populateAndOpenStatistics(); };

	return <>
		<Box className={styles.mainContainer}>
			<AppBar
				position="static"
				className={styles.appBar}
			>
				<Toolbar className={styles.toolbarContainer}>
					<Typography variant="h6" component="div" className={styles.appTitle}>
						Budget Planner
					</Typography>
					
					<TextField
						className={styles.searchBar}
						label="Search"
						variant="filled"
						value={searchKeyword}
						onChange={e => setSearchKeyword(e.target.value)} />
					<div className={styles.statisticsLogoPack}>
						<Button onClick={onStatisticsClick}>Statistics</Button>
						<LogoutButton/>
						<img className={styles.logo} alt="Logo" src={Logo} />
					</div>
				</Toolbar>
			</AppBar>

			<Box className={styles.tabsBar}>
				<Tabs
					value={tabNumber}
					onChange={handleChange}
					aria-label="tab changer"
					variant="fullWidth">
					<Tab className={styles.tab} label="Your lists" {...tabProps(0)} />
					<Tab className={styles.tab} label="Shared lists" {...tabProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={tabNumber} index={0}>
				<ListsView listsViewContext={CreatedListsViewContext} showEdit />
			</TabPanel>
			<TabPanel value={tabNumber} index={1}>
				<ListsView listsViewContext={SharedListsViewContext}/>
			</TabPanel>
		</Box>
		<StatisticsDialog
			chartData={statisticsData}
			statisticsOpen={statisticsIsOpen}
			onClose={closeStatistics}
		/>
        <AddListButton className={styles.addButton} />
		<EditListDialog list={list} onClose={closeDialog} />
	</>;
}

export default observer(MainPage);