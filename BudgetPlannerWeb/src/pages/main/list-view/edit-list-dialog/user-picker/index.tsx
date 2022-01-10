import {
    Autocomplete,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import classNames from "classnames";
import { EmailWithRole, UserRole } from "../../../../../accessors/types";
import CheckIcon from "@mui/icons-material/CheckOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import styles from "./user-picker.module.scss";
import { useContext, useEffect } from "react";
import { UserPickerContext } from "./user-picker-store";
import { observer } from "mobx-react";

interface Props {
    label?: string;
    className?: string;
    emailSuggestions?: string[];
    users?: EmailWithRole[];
    onAdd?: (user: EmailWithRole) => void;
    onRemove?: (user: EmailWithRole) => void;
}

const getRoleBasedOnType = (type: UserRole) => {
    switch (type) {
        case UserRole.OWNER:
            return "Owner";
        case UserRole.CONTRIBUTOR:
            return "Contributor";
        case UserRole.VISITOR:
            return "Visitor";
    }
}

const UserPicker = ({ label, className, emailSuggestions, users, onAdd, onRemove }: Props) => {
    const { user, setEmail, setRole, reset, validateUser } = useContext(UserPickerContext);

    useEffect(() => reset, [reset]);

    const handleAdd = () => {
        if (!validateUser(users ?? []))
            return;

        onAdd?.(user);
        reset();
    }

    return (
        <div className={classNames(styles.userPickerContainer, className)}>
            {label && (
                <Typography variant="subtitle2">{label}</Typography>
            )}
            <div className={styles.addControls}>
                <Autocomplete
                    className={styles.email}
                    freeSolo
                    inputValue={user.email}
                    onInputChange={(_, value) => setEmail(value)}
                    options={emailSuggestions ?? []}
                    renderInput={params => (
                        <TextField variant="standard" label="Email" {...params} />
                    )} />
                <FormControl fullWidth className={styles.role} variant="standard">
                    <InputLabel id="select-role-label">Role</InputLabel>
                    <Select
                        labelId="select-role-label"
                        label="Role"
                        value={user.type}
                        onChange={event => setRole(event.target.value as UserRole)}>
                        <MenuItem value={UserRole.CONTRIBUTOR}>Contributor</MenuItem>
                        <MenuItem value={UserRole.VISITOR}>Visitor</MenuItem>
                    </Select>
                </FormControl>
                <IconButton color="primary" onClick={handleAdd}>
                    <CheckIcon />
                </IconButton>
            </div>
            {users?.map((user, index) => <>
                <div key={index} className={styles.userRow}>
                    <Typography variant="subtitle1" className={styles.email}>{user.email}</Typography>
                    <Typography variant="subtitle1" className={styles.role}>
                        {getRoleBasedOnType(user.type)}
                    </Typography>
                    <IconButton color="primary" onClick={() => onRemove?.(user)}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </>)}
        </div>
    );
}

export default observer(UserPicker);