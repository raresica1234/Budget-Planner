import { useContext, useEffect } from "react";
import {
    Box,
    AppBar,
    Typography,
    Toolbar,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText,
    LinearProgress
} from "@mui/material";
import { Item } from "../../../accessors/types";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./list-details.module.scss";
import { useParams } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import { ListDetailsViewContext } from "./list-details-view-store";
import { observer } from "mobx-react";
import AddItemButton from "../item-view/add-item-button";
import EditItemDialog from "../item-view/edit-item-dialog";
import { UpdateItemContext } from "../item-view/update-item-store";

const ListDetailsView = () => {
    const {
        isLoading,
        listName,
        items,
        sum,
        fetchListDetails,
        reset
    } = useContext(ListDetailsViewContext);
    const { openDialog, closeDialog, item } = useContext(UpdateItemContext);
    const { id } = useParams();

    useEffect(() => {
        fetchListDetails(id || "");
        return reset;
    }, [fetchListDetails, id, reset]);

    const handleItemClick = ({ id, name, price }: Item) =>
        openDialog({ id, listId: "", name, price });

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

            <Paper elevation={0} className={styles.itemList} square>
                {isLoading && (
                    <LinearProgress />
                )}
                <List>
                    {items.map(item => (
                        <li key={item.id}>
                            <ListItem
                                style={{ cursor: "pointer" }}
                                onClick={() => handleItemClick(item)}>
                                <ListItemText primary={item.name} secondary={item.price} secondaryTypographyProps={{
                                    classes:{
                                        root: styles.secondaryText
                                    }
                                }} />
                                <ListItemText
                                    primary={`Created at: ${item.createdAt.toLocaleString()}`}
                                    secondary={`Updated at: ${item.updatedAt.toLocaleString()}`}
                                    secondaryTypographyProps={{
                                        classes:{
                                            root: styles.secondaryText
                                        }
                                    }} 
                                    className={styles.rightSideItem}
                                />
                            </ListItem>
                        </li>
                    ))}
                </List>
            </Paper>

            <Box className={styles.sumBar}>
                <Typography variant="h6" component="div" className={styles.listTitle}>
                    Total: {sum}
                </Typography>
            </Box>
            <AddItemButton className={styles.addButton} listId={id || ""} />
            <EditItemDialog
                listId={id || ""}
                onClose={closeDialog}
                item={item} />
        </Box>
    )
};

export default observer(ListDetailsView);
