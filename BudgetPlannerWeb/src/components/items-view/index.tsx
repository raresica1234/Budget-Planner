import { Box, AppBar, Typography, Toolbar, IconButton, Paper , List, ListItem, ListItemText} from "@mui/material";
import { Item as ItemModel } from "../../accessors/types";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./items.module.scss";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const items = [{
    id: "1",
    name: "Test1",
    price: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
}, {
    id: "2",
    name: "Test2",
    price: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
}, {
    id: "3",
    name: "Test3",
    price: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
}, {
    id: "4",
    name: "Test4",
    price: 99,
    createdAt: new Date(),
    updatedAt: new Date(),
}];


const ItemsView = () => {

    const { listName } = useLocation().state;

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
                <List>
                    {items.map((item: ItemModel) => (
                        <li>
                        <ListItem>
                            <ListItemText primary={item.name} secondary={item.price}/>
                            <ListItemText primary={Date()} className={styles.rightSideItem}/>
                        </ListItem>
                    </li>
                    ))}
                </List>
            </Paper>

            <Box className={styles.sumBar}>
                <Typography variant="h6" component="div" className={styles.listTitle}>
                    Cost of all items: 999
                </Typography>
			</Box>
        </Box>
    )
};

export default ItemsView;