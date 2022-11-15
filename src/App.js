import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import TitanicForm from './pages/titanicform/TitanicForm';


const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/titanicform' element={<TitanicForm />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App;
