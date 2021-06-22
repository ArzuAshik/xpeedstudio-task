import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetForm from './components/GetForm';
import Navbar from "./components/Navbar";
import NotFound from './components/NotFound';
import Table from "./components/Table";
import UpdateForm from './components/UpdateForm';
import "./style.css";
 
 
// export const ListContext = createContext();

function App() {
  const [list, setList] = useState([]);
  return (
    <Router>
      <Navbar />
        <Switch>
          <Route exact path="/" >
            <Table setList={setList} />
          </Route>
          <Route exact path="/get-form" component={GetForm} />
          <Route exact path="/update-form/:id" >
            <UpdateForm list={list} />
          </Route>
          <Route exact path="*" component={NotFound} />
        </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
