import { Context, useContext, useEffect } from "react";
import { Box, AppBar, Typography, Toolbar, IconButton, Paper, List, ListItem, ListItemText, LinearProgress } from "@mui/material";
import { Item as ItemModel } from "../../../accessors/types";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./items.module.scss";
import { useLocation, useParams } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import { ItemsViewContext } from "./items-view-store";
import { observer } from "mobx-react";

const ItemsView = () => {
    const { isLoading, items, sum, fetchListDetails } = useContext(ItemsViewContext);
    const { listName } = useLocation().state;
    const { id } = useLocation().state;

    useEffect(() => {
        fetchListDetails(id);
    }, [fetchListDetails])

    return (
        <Box className={styles.mainContainer}>
            <AppBar className={styles.appBar}>
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
            <Box className={styles.titleBar}>
                <Typography variant="h6" component="div" className={styles.listTitle}>
                    {listName}
                </Typography>
            </Box>

            <Paper elevation={0}>
                {isLoading && (
                    <LinearProgress />
                )}
                <List>
                    {items.map((item: ItemModel) => (
                        <li>
                            <ListItem>
                                <ListItemText primary={item.name} secondary={item.price} />
                                <ListItemText primary={"Created at: " + new Date(item.createdAt).toLocaleString('en-GB')} secondary={"Updated at: " + new Date(item.updatedAt).toLocaleString('en-GB')} className={styles.rightSideItem} />
                            </ListItem>
                        </li>
                    ))}
                </List>
            </Paper>

            <Box className={styles.sumBar}>
                <Typography variant="h6" component="div" className={styles.listTitle}>
                    Cost of all items: {sum}
                </Typography>
            </Box>
        </Box>
    )
};

export default observer(ItemsView);