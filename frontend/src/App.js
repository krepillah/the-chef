import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import HeaderBlock from "./components/HeaderBlock";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Saved from "./pages/Saved";
import Notfound from "./pages/Notfound";
import Category from "./pages/Category";
import Recipe from "./pages/Recipe";
import Admin from "./pages/Admin"


export default function App() {
  const [catalog, setCatalog] = useState([]);
  return (
    <div className="App">
      <Router basename="/the-chef">
        <HeaderBlock catalog={catalog} setCatalog={setCatalog}/>
        <main>
            <Routes>
              <Route exact path="/" element={<Home catalog={catalog} setCatalog={setCatalog}/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/saved" element={<Saved/>}/>
              <Route path="/category/:name" element={<Category catalog={catalog}/>}/>
              <Route path="/meal/:id" element={<Recipe/>}/>
              <Route path="/admin" element={<Admin catalog={catalog}/>}/>
              <Route path="*" element={<Notfound/>}/>
            </Routes>
        </main>
        <Footer/>
      </Router>
    </div>
  );
}
