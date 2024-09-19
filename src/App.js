import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Notfound from "./pages/Notfound";


export default function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <main>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/contacts" element={<Contacts/>}/>
              <Route element={<Notfound/>}/>
            </Routes>
        </main>
        <Footer/>
      </Router>

    </div>
  );
}
