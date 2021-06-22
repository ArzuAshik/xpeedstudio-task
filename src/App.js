import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from "./components/Table";
 
 

function App() {  
  return (
    <div className="app">
      <Table />
      <ToastContainer />
    </div>
  );
}

export default App;
