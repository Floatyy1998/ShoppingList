import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import validator from "validator";
import "./Login.css";
import Title from "../Title/Title";

const Login = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [register, setRegister] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setMailError(false);
    setPasswordError(false);
    if (!validator.isEmail(email)) {
      setErrorMessage("Bitte gib eine valide Email ein");
      setMailError(true);
      return;
    } else if (validator.isEmpty(password)) {
      setErrorMessage("Bitte gib ein passwort ein");
      setPasswordError(true);
      return;
    }

    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setErrorMessage("Email oder Passwort ist falsch");
          setMailError(true);
          break;
        default:
          setErrorMessage("Ein Fehler ist aufgetreten");
          setMailError(true);
          break;
      }
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setMailError(false);
    setPasswordError(false);
    if (!validator.isEmail(email)) {
      setErrorMessage("Bitte gib eine valide Email ein");
      setMailError(true);
      return;
    } else if (validator.isEmpty(password)) {
      setErrorMessage("Bitte gib ein passwort ein");
      setPasswordError(true);
      return;
    }

    try {
      await Firebase.auth().createUserWithEmailAndPassword(email, password);
      handleLogin(e);
    } catch (error: any) {
      setErrorMessage("Fehler beim Registrieren");
      setMailError(true);
    }
  };

  return (
    <>
      <div className="main-container">
        {register ? (
          <>
            <Title title="Registrieren" />
            <form className="login-form" onSubmit={handleRegister}>
              <div className="form_group">
                <TextField
                  id="username"
                  autoCapitalize="none"
                  label="Email"
                  variant="filled"
                  value={email}
                  error={mailError}
                  helperText={mailError && errorMessage}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{marginBottom:"10%"}}
                />
                <TextField
                  id="password"
                  autoCapitalize="none"
                  type="password"
                  label="Passwort"
                  variant="filled"
                  error={passwordError}
                  helperText={passwordError && errorMessage}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{marginBottom:"10%"}}
                />

                <Button type="submit" variant="outlined" id="login-button">
                  Registrieren
                </Button>
                <div id="registerHint" onClick={() => setRegister(false)}>
                  Bereits ein Konto? Hier Anmelden
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            <Title title="Einloggen" />
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form_group">
                <TextField
                  id="username"
                  label="Email"
                  variant="filled"
                  value={email}
                  error={mailError}
                  helperText={mailError && errorMessage}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{marginBottom:"10%"}}
                 />
                <TextField
                  id="password"
                  type="password"
                  label="Passwort"
                  variant="filled"
                  error={passwordError}
                  helperText={passwordError && errorMessage}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{marginBottom:"10%"}}
                 
                />

                <Button type="submit" variant="outlined" id="login-button">
                  Login
                </Button>
                <div id="registerHint" onClick={() => setRegister(true)}>
                  Noch kein Konto? Hier Registrieren
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
