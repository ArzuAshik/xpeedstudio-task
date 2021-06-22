import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetForm from './components/GetForm';
import NotFound from './components/NotFound';
import Table from "./components/Table";
 
 

function App() {  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Table} />
        <Route exact path="/get-form" component={GetForm} />
        <Route exact path="*" component={NotFound} />
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
