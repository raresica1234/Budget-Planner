import { useContext } from "react";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { AuthenticateContext } from "../../../infrastructure";

interface LogoutButtonProps {
    className?: string;
}

const LogoutButton = ({ className }: LogoutButtonProps) => {
    const { reset } = useContext(AuthenticateContext);

    const navigate = useNavigate();

    const onClickNext = () => { reset(); navigate("/"); }

    return <Button onClick={onClickNext} className={className}><LogoutIcon /></Button>
}

export default observer(LogoutButton);