import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/contacts" component={Contacts}/>
              <Route component={Notfound}/>
            </Switch>
        </main>
        <Footer/>
      </Router>

    </div>
  );
}
