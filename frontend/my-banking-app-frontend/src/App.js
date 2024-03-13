import './App.css';
import {Route,Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';

import CustomerHome from './components/CustomerHome';

function App() {
  return (
    <div className="App">
  
     <Routes>
      <Route path='/' element={<IndexPage/>} ></Route>
      <Route path='/customerHome' element={<CustomerHome/>} ></Route>
      
     </Routes>
    </div>
  );
}

export default App;
