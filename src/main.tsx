import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Providers} from "@src/Providers.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers/>
  </React.StrictMode>,
)
