
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
import muffin from "./assests/particlesImages/muffin.png";
import muffins from "./assests/particlesImages/muffins.png";
import krapfen from "./assests/particlesImages/krapfen.png";
import cupcake from "./assests/particlesImages/cupcake.png";
import donuts from "./assests/particlesImages/donuts.png";
import banana from "./assests/particlesImages/banane.png";
import pizza1 from "./assests/particlesImages/pizza.png";
import pizza2 from "./assests/particlesImages/pizza2.png";
import fruits from "./assests/particlesImages/fruits-and-vegetables.png";
import grapes from "./assests/particlesImages/grapes.png";
import hamburger from "./assests/particlesImages/hamburger.png";
import vegetable from "./assests/particlesImages/vegetable.png";
import carrot from "./assests/particlesImages/carrot.png";

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
              zIndex: 1
            },
            detectRetina: true,
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push"
                },
                onDiv: {
                  elementId: "repulse-div",
                  enable: false,
                  mode: "repulse"
                },
                onHover: {
                  enable: false,
                  mode: "bubble",
                  parallax: {
                    enable: false,
                    force: 60,
                    smooth: 10
                  }
                },
                resize: true
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.9,
                  size: 2
                },
                connect: {
                  distance: 80,
                  lineLinked: {
                    opacity: 0.5
                  },
                  radius: 60
                },
                grab: {
                  distance: 400,
                  lineLinked: {
                    opacity: 1
                  }
                },
                push: {
                  quantity: 2
                },
                remove: {
                  quantity: 2
                },
                repulse: {
                  distance: 200,
                  duration: 0.4
                }
              }
            },
            particles: {
              color: {
                value: "#ffffff"
              },
              lineLinked: {
                blink: false,
                color: "#000",
                consent: false,
                distance: 150,
                enable: false,
                opacity: 0.4,
                width: 1
              },
              move: {
                attract: {
                  enable: false,
                  rotate: {
                    x: 600,
                    y: 1200
                  }
                },
                bounce: false,
                direction: "none",
                enable: true,
                outMode: "out",
                random: false,
                speed: 2,
                straight: false
              },
              number: {
               
                
                value: particles
              },
              opacity: {
                animation: {
                  enable: true,
                  minimumValue: 0.2,
                  speed: 1,
                  sync: false
                },
                random: true,
                value: 1
              },
              rotate: {
                animation: {
                  enable: true,
                  speed: 5,
                  sync: false
                },
                direction: "random",
                random: true,
                value: 0
              },
              shape: {
                character: {
                  fill: false,
                  font: "Verdana",
                  style: "",
                  value: "*",
                  weight: "400"
                },
                image: [
                  {
                    src: muffin,
                    width: 70,
                    height: 70
                  },
                  {
                    src: muffins,
                    width: 70,
                    height: 70
                  },
                  
                  {
                    src: krapfen,
                    width: 70,
                    height: 70
                  },
                  {
                    src: cupcake,
                    width: 70,
                    height: 70
                  },
                 
                  {
                    src: donuts,
                    width: 70,
                    height: 70
                  },  {
                    src: banana,
                    width: 70,
                    height: 70
                  },  {
                    src: pizza1,
                    width: 70,
                    height: 70
                  },  {
                    src: pizza2,
                    width: 70,
                    height: 70
                  },  {
                    src: hamburger,
                    width: 70,
                    height: 70
                  }
                  ,  {
                    src: vegetable,
                    width: 70,
                    height: 70
                  }
                  ,  {
                    src: grapes,
                    width: 70,
                    height: 70
                  }
                  ,  {
                    src: carrot,
                    width: 70,
                    height: 70
                  },  {
                    src: fruits,
                    width: 70,
                    height: 70
                  }
                  
                ],
                polygon: {
                  sides: 5
                },
                stroke: {
                  color: "#000000",
                  width: 0
                },
                type: "image"
              },
              size: {
                
                animation: {
                  enable: false,
                  minimumValue: 0.1,
                  speed: 40,
                  sync: false
                },
                random: true,
                value: 30
              }
            },
            polygon: {
              draw: {
                enable: false,
                lineColor: "#ffffff",
                lineWidth: 0.5
              },
              move: {
                radius: 10
              },
              scale: 1,
              url: ""
            },
            background: {
              image: "",
              position: "50% 50%",
              repeat: "no-repeat",
              size: "cover"
            }
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
