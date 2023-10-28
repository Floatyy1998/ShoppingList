import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import { useCallback, useEffect, useState } from "react";
import Firebase from "firebase/compat/app";
import { Button } from "@mui/material";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";
import Einkaufsliste from "./components/Einkaufsliste/Einkaufsliste";
import Donut from "./assests/particlesImages/Donut.png";
import Donut2 from "./assests/particlesImages/Donut2.png";
import Donut3 from "./assests/particlesImages/Donut3.png";
import Brokkoli from "./assests/particlesImages/Brokkoli.png";
import Pizza from "./assests/particlesImages/Pizza.png";
import Cherry from "./assests/particlesImages/Cherry.png";
import Burger from "./assests/particlesImages/Burger.png";

function App() {
  const [login, setLogin] = useState("");
  const [particles, setParticles] = useState(80);

  useEffect(() => {
    if (window.innerWidth < 950) {
      setParticles(15);
    }
  }, []);
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);
  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );

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
          fullScreen: {
            enable: true,
            zIndex: 1,
          },
          detectRetina: true,
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onDiv: {
                elementId: "repulse-div",
                enable: false,
                mode: "repulse",
              },
              onHover: {
                enable: false,
                mode: "bubble",
                parallax: {
                  enable: false,
                  force: 60,
                  smooth: 10,
                },
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.9,
                size: 2,
              },
              connect: {
                distance: 80,
                lineLinked: {
                  opacity: 0.5,
                },
                radius: 60,
              },
              grab: {
                distance: 400,
                lineLinked: {
                  opacity: 1,
                },
              },
              push: {
                quantity: 2,
              },
              remove: {
                quantity: 2,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            lineLinked: {
              blink: false,
              color: "#000",
              consent: false,
              distance: 150,
              enable: false,
              opacity: 0.4,
              width: 1,
            },
            move: {
              
              bounce: false,
              direction: "none",
              enable: true,
              outMode: "out",
              random: true,
              speed: 2,
              straight: false,
             
            },
            number: {
              value: particles,
            },
            opacity: {
              animation: {
                enable: false,
                minimumValue: 0.8,
                speed: 1,
                sync: false,
              },
              random: false,
              value: 0.5,
            },
            rotate: {
              animation: {
                enable: true,
                speed: 5,
                sync: false,
              },
              direction: "random",
              random: true,
              value: 0,
            },
            shape: {
              character: {
                fill: false,
                font: "Verdana",
                style: "",
                value: "*",
                weight: "400",
              },
              image: [
                {
                  src: Donut,
                  width: 70,
                  height: 70,
                },
                {
                  src: Donut2,
                  width: 70,
                  height: 70,
                },

                {
                  src: Donut3,
                  width: 70,
                  height: 70,
                },
                {
                  src: Cherry,
                  width: 70,
                  height: 70,
                },

                {
                  src: Brokkoli,
                  width: 70,
                  height: 70,
                },
                {
                  src: Burger,
                  width: 70,
                  height: 60,
                },
                {
                  src: Pizza,
                  width: 70,
                  height: 30,
                },
              ],
              polygon: {
                sides: 5,
              },
              stroke: {
                color: "#000000",
                width: 0,
              },
              type: "image",
            },
            size: {
              random: true,
              value: 60,
            },
          },
          polygon: {
            draw: {
              enable: false,
              lineColor: "#ffffff",
              lineWidth: 0.5,
            },
            move: {
              radius: 10,
            },
            scale: 1,
            url: "",
          },
          background: {
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
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
