import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Footer from "./components/Footer";
import HeaderBlock from "./components/HeaderBlock";

import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Notfound from "./pages/Notfound";
import Category from "./pages/Category";


export default function App() {
  const [catalog, setCatalog] = useState([]);
  return (
    <div className="App">
      <Router>
        <HeaderBlock catalog={catalog} setCatalog={setCatalog}/>
        <main>
            <Routes>
              <Route exact path="/" element={<Home catalog={catalog} setCatalog={setCatalog}/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/contacts" element={<Contacts/>}/>
              <Route path="/category/:name" element={<Category catalog={catalog}/>}/>
              <Route element={<Notfound/>}/>
            </Routes>
        </main>
        <Footer/>
      </Router>

    </div>
  );
}
