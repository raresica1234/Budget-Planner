import React, { useContext } from "react";
import { AddListContext } from "./addlist-store";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { observer } from "mobx-react";
import { SuccessDialog } from "../SuccessDialog";
import { ErrorDialog } from "../ErrorDialog";
import { AddListDialog } from "../AddListDialog";

const AddListButton  = () => {
    const {
        isOpen,
        serverError,
        addedSuccessfully,
        addListCalled,
        setIsOpen,
        setInput,
        flushOperationResults,
        submitList
    } = useContext(AddListContext);

    return (
        <div>
            <Fab color="primary" aria-label="add" onClick={_ => setIsOpen(true)}>
                <AddIcon />
            </Fab>
            
            <AddListDialog
            isOpen={isOpen}
            changeListNameFunction={setInput}
            onSubmitFunction={submitList}
            changeIsOpenFunction={setIsOpen}
            />

            <ErrorDialog
            isOpen={addListCalled && !addedSuccessfully && serverError.length > 0}
            message={serverError}
            onCloseFunction={flushOperationResults}
            />

            <SuccessDialog 
                isOpen={addListCalled && addedSuccessfully} 
                onCloseFunction={flushOperationResults}
            />
        </div>
    )
}

export default observer(AddListButton);