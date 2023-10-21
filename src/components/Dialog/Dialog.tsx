import React, { useEffect, useState } from "react";
import Firebase from "firebase/compat/app";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,

  TextField,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { getDatabase, ref, update } from "firebase/database";
import validator from "validator";


const CustomDialog = (props: any) => {
  const [newItem, setNewItem] = useState("");
  const [newItemBeschreibung, setNewItemBeschreibung] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [itemError, setItemError] = useState(false);
  const handleChange = () => {
  setItemError(false);

    if (validator.isEmpty(newItem)) {
      setErrorMessage("Bitte gib ein Produkt ein");
      setItemError(true);
      return;
    }
    const db = getDatabase();
    update(ref(db, Firebase.auth().currentUser?.uid + "/" + props.item.id), {
        name: newItem,
        beschreibung: newItemBeschreibung,
        });
    props.close();
  };

  useEffect(() => {
    setItemError(false);
    setNewItem(props.item.name);
    setNewItemBeschreibung(props.item.beschreibung);
  }, [props.item]);

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
       
      >
        <DialogTitle
          style={{
            textAlign: "center",
           
            color: "#fff",
            paddingBottom: "0",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
          id="alert-dialog-title"
        >
          <CloseRoundedIcon
            onClick={(_) => props.close()}
            className="closeDialog"
            style={{
              position: "absolute",
              top: "1vh",
              right: "1vh",
              borderRadius: "10px",
              width: "2rem",
              height: "auto",
             
              color: "red",
            }}
          />
          <p
            id="dialog-title"
            style={{
              margin: "auto",
              textAlign: "center",
             
              width: "90%",
            }}
          >
           {props.item.name} ändern
          </p>
        </DialogTitle>
        <DialogContent
          id="alert-dialog-description"
          style={{  }}
        >
          <form className="newItem-form" onSubmit={handleChange}>
            <div className="newItem-form_group">
              <TextField
              autoComplete="off"
                id="newItem"
                label="Produkt"
                variant="filled"
                value={newItem}
                error={itemError}
               
                helperText={itemError && errorMessage}
                onChange={(e) => setNewItem(e.target.value)}
                style={{ width: "50%", marginBottom: "2%" }}
              />
              <TextField
              autoComplete="off"
                id="newItem"
                label="Beschreibung"
                variant="filled"
                value={newItemBeschreibung}
                onChange={(e) => setNewItemBeschreibung(e.target.value)}
                style={{ width: "50%", marginBottom: "2%" }}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions
          style={{
            color: "#00fed7",
           
            justifyContent: "space-around",
            padding: "3%",
          }}
          id="dialog-footer"
        >
          <Button onClick={()=>{handleChange()}} id="newItem-button">
            Ändern
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CustomDialog;
