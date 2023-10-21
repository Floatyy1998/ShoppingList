
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import { useCallback, useEffect, useState } from "react";
import Firebase from "firebase/compat/app";
import  { Button } from "@mui/material";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";
import Einkaufsliste from "./components/Einkaufsliste/Einkaufsliste";


function App() {
  const [login, setLogin] = useState("");
  const [particles, setParticles] = useState(80);

  useEffect(() => {
   

    if (window.innerWidth < 950) {
      setParticles(30);
    }
    
  }, []);
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);
  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );

  useEffect(() => {
    console.log(login === "");
  }, [login]);

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
  };

  Firebase.initializeApp(firebaseConfig);
  Firebase.auth().onAuthStateChanged((user) => {
    setLogin(user?.email ?? "");
  });
  return (
    <div className="App">
      <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 60,

            particles: {
              color: {
                value: ["#074a40", "#027362", "#25897a", "#00fed7", "#00b4a0"],
              },
              links: {
                color: "#00fed7",
                distance: 200,
                enable: false,
                opacity: 1,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 3,
                straight: false,
              },
              number: {
                value: particles,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: 40,
                random: true,
                anim: {
                  enable: true,
                  speed: 10,
                  size_min: 0.1,
                  sync: true,
                },
              },
            },
            detectRetina: true,
          }}
        />
      {login !== "" ? (
        <Einkaufsliste />
      ) : (
        <Login setLogin={(e: React.SetStateAction<string>) => setLogin(e)} />
      )}
    </div>
  );
}

export default App;
