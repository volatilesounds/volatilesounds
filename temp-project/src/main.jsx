//setup here: https://www.youtube.com/watch?v=d63N4g8p_wI&t=202s

import React from "react";
import { createRoot } from "react-dom/client";  // 👈 new import in React 18
import App from "./App";
import './index.css'

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
