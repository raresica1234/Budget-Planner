import React, { useContext } from "react";
import { AddListContext } from "./add-list-store";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { observer } from "mobx-react";
import SuccessDialog from "../SuccessDialog";
import ErrorDialog from "../ErrorDialog";
import { AddListDialog } from "../AddListDialog";

interface AddListButtonProps {
    className: string;
}

const AddListButton  = (props: AddListButtonProps) => {
    const {
        isOpen,
        serverError,
        addListCalled,
        setIsOpen,
        setName,
        flushOperationResults,
        submitList
    } = useContext(AddListContext);

    return (
        <div className={props.className}>
            <Fab color="primary" aria-label="add" onClick={_ => setIsOpen(true)}>
                <AddIcon />
            </Fab>
            
            <AddListDialog
            isOpen={isOpen}
            onChangeListName={setName}
            onSubmit={submitList}
            onClose={() => setIsOpen(false)}
            />

            <ErrorDialog
            isOpen={addListCalled && !!serverError}
            message={serverError}
            onClose={flushOperationResults}
            />

            <SuccessDialog 
            isOpen={addListCalled && !serverError} 
            onClose={flushOperationResults}
            />
        </div>
    )
}

export default observer(AddListButton);