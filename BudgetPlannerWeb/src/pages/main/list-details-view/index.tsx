import { useContext, useEffect } from "react";
import {
    Box,
    AppBar,
    Typography,
    Toolbar,
    Paper,
    List,
    ListItem,
    ListItemText,
    LinearProgress,
    IconButton
} from "@mui/material";
import { Item } from "../../../accessors/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBackOutlined";
import styles from "./list-details.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import { ListDetailsViewContext } from "./list-details-view-store";
import { observer } from "mobx-react";
import AddItemButton from "../item-view/add-item-button";
import EditItemDialog from "../item-view/edit-item-dialog";
import { UpdateItemContext } from "../item-view/update-item-store";
import LogoutButton from "../../accounts/logout";

const ListDetailsView = () => {
    const {
        isLoading,
        listName,
        items,
        sum,
        isVisitor,
        fetchListDetails,
        reset
    } = useContext(ListDetailsViewContext);
    const { openDialog, closeDialog, item } = useContext(UpdateItemContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchListDetails(id || "");
        return reset;
    }, [fetchListDetails, id, reset]);

    const handleItemClick = ({ id, name, price }: Item) =>
        openDialog({ id, listId: "", name, price });

    return (
        <Box className={styles.mainContainer}>
            <AppBar className={styles.appBar}>
                <Toolbar className={styles.toolbarContainer}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={styles.menuIconButton}
                        onClick={() => navigate("/")} >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" className={styles.appTitle}>
                        {listName}
                    </Typography>
                    <div className={styles.logoutLogoPack}>
                        <LogoutButton className={styles.logoutButton} />
                        <img className={styles.logo} alt="Logo" src={Logo} />
                    </div>
                </Toolbar>
            </AppBar>
            <Paper elevation={0} className={styles.itemList} square>
                {isLoading && (
                    <LinearProgress />
                )}
                <List>
                    {items.map(item => (
                        <li key={item.id}>
                            <ListItem
                                style={{ cursor: "pointer" }}
                                onClick={() => isVisitor || handleItemClick(item)}>
                                <ListItemText primary={item.name} secondary={item.price} secondaryTypographyProps={{
                                    classes: {
                                        root: styles.secondaryText
                                    }
                                }} />
                                <ListItemText
                                    primary={`Created at: ${item.createdAt.toLocaleString()}`}
                                    secondary={`Updated at: ${item.updatedAt.toLocaleString()}`}
                                    secondaryTypographyProps={{
                                        classes: {
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
            {!isVisitor && (
                <AddItemButton className={styles.addButton} listId={id || ""} />
            )}
            <EditItemDialog
                listId={id || ""}
                onClose={closeDialog}
                item={item} />
        </Box>
    )
};

export default observer(ListDetailsView);
