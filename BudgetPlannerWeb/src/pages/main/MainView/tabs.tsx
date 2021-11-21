import { PropsWithChildren } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type TabPanelProps = PropsWithChildren<{
    index: number;
    value: number;
}>;

export const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export const tabProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
});
