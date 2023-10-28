import React, { useEffect, useState } from "react";
import "../../App.css";
import { Button, TextField } from "@mui/material";
import Firebase from "firebase/compat/app";
import Title from "../Title/Title";
import "./Einkaufsliste.css";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  remove,
} from "firebase/database";
import validator from "validator";
import CustomDialog from "../Dialog/Dialog";
import henkel from "../../assests/Henkel2Fertig.png";

const Einkaufsliste = () => {
  const [newItem, setNewItem] = useState("");
  const [newItemBeschreibung, setNewItemBeschreibung] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [itemError, setItemError] = useState(false);
  const db = getDatabase();
  const itemListRef = ref(db, Firebase.auth().currentUser?.uid);
  const [itemList, setItemList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>({});

  const trailingActions = (id: any) => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {
          handleDelete(id);
        }}
      >
        <div className="ActionContent" style={{ backgroundColor: "red" }}>
          <div className="ItemColumnCentered">
            <span className="icon">
              <DeleteIcon />
            </span>
            Delete
          </div>
        </div>
      </SwipeAction>
    </TrailingActions>
  );
  useEffect(() => {
    return onValue(itemListRef, (snapshot) => {
      const data = snapshot.val();
      const itemList = [];
      for (let id in data) {
        itemList.push({ id, ...data[id] });
      }
      setItemList(itemList);
    });
  }, []);

  const handleDelete = async (id: any) => {
    await remove(ref(db, Firebase.auth().currentUser?.uid + "/" + id));
  };
  const handleAdd = async (event: any) => {
    event.preventDefault();
    setItemError(false);

    if (validator.isEmpty(newItem)) {
      setErrorMessage("Bitte gib ein Produkt ein");
      setItemError(true);
      return;
    }

    const newItemRef = await push(itemListRef);
    await set(newItemRef, {
      name: newItem,
      beschreibung: newItemBeschreibung,
    });
    setNewItem("");
    setNewItemBeschreibung("");
  };

  function handleOnItemClick(item: any) {
    setCurrentItem(item);
    setOpen(true);
  }

  return (
    <>
      <CustomDialog
        open={open}
        item={currentItem}
        close={() => setOpen(false)}
      ></CustomDialog>
      <div className="main-container">
        <div className="einkaufsliste-header">
          <Title classes="title inner" title="Mein Einkaufskorb" />
          <img className="inner image" src={henkel} alt="" />
        </div>

        <div className="einkaufsliste-container">
          <form className="newItem-form" onSubmit={handleAdd}>
            <div className="newItem-form_group">
              <TextField
                autoComplete="none"
                autoCapitalize="sentences"
                id="newItem"
                label="Produkt"
                variant="filled"
                value={newItem}
                error={itemError}
                helperText={itemError && errorMessage}
                onChange={(e) => setNewItem(e.target.value)}
                style={{
                  width: "50%",
                
                  textAlign: "center",
                }}
                inputProps={{ style: { textAlign: "center" } }}
              />
              <TextField
                id="newItem"
                label="Beschreibung"
                autoCapitalize="sentences"
                autoComplete="none"
                variant="filled"
                value={newItemBeschreibung}
                onChange={(e) => setNewItemBeschreibung(e.target.value)}
                style={{ width: "50%",  }}
                inputProps={{ style: { textAlign: "center" } }}
              />
              <Button type="submit" id="newItem-button">
                Hinzufügen
              </Button>
            </div>
          </form>
          <SwipeableList threshold={0.2} destructiveCallbackDelay={200}>
            {itemList
              .sort((a, b) => {
                if (a.name.toUpperCase() < b.name.toUpperCase()) {
                  return -1;
                }
                if (a.name.toUpperCase() > b.name.toUpperCase()) {
                  return 1;
                }
                return 0;
              })
              .map((item) => (
                <SwipeableListItem
                  onClick={() => {
                    handleOnItemClick(item);
                  }}
                  key={item.id}
                  trailingActions={trailingActions(item.id)}
                  maxSwipe={1}
                >
                  <div className="item-container">
                    <div className="item-name">{item.name}</div>
                    <div className="item-beschreibung">
                      {item.beschreibung === ""
                        ? "Keine Beschreibung"
                        : item.beschreibung}
                    </div>
                  </div>
                </SwipeableListItem>
              ))}
          </SwipeableList>
        </div>
      </div>
    </>
  );
};

export default Einkaufsliste;
