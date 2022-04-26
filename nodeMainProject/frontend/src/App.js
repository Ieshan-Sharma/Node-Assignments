import './App.css';
import { Signup } from './components/Signup';
import { Signin} from './components/Signin';
import { Routes, Route} from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { AddBook } from './components/AddBook';


function App() {

  return (
    <div className="App">
        <Routes>
        <Route exact path="/" element={<Signin/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addbook" element={<AddBook />} />

      </Routes>
    </div>
  );
}

export default App;
