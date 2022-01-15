import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from "@mui/material";
import {
    Chart,
    PieSeries,
    Title,
    Legend
  } from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import ArrowBackIcon from "@mui/icons-material/ArrowBackOutlined";
import { StatisticsEntry } from "../../../../accessors/types";
import { observer } from "mobx-react";
import styles from "./statistics-dialog.module.scss";

interface StatisticsDialogProps {
    chartData: StatisticsEntry[];
    statisticsOpen: boolean;
    onClose: () => void;
}

const StatisticsDialog = ({ chartData, statisticsOpen, onClose }: StatisticsDialogProps) => {

    const computeTotalSum = () => {
        let sum = 0;
        chartData.forEach(({ totalSum }) => sum += totalSum);
        return sum;
    }

    return (
        <Dialog open={statisticsOpen} onClose={onClose} fullScreen>
            <DialogTitle>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="back"
                    onClick={onClose} >
                    <ArrowBackIcon />
                </IconButton>
                Statistics
            </DialogTitle>
            <DialogContent>
            <Chart data={chartData}>
                <PieSeries valueField="totalSum" argumentField="listName" />
                <Title text="Total sum for every list" />
                <Animation />
                <Legend />
            </Chart>
            <Typography variant="h6" component="div" className={styles.totalExpenses}>
                {`Total expenses from all lists: ${computeTotalSum()}`}
            </Typography>
            </DialogContent>
        </Dialog>
    );
}

export default observer(StatisticsDialog);