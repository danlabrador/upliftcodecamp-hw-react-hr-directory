import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateLayout from './pages/private/PrivateLayout';
import Employees from './pages/private/Employees';
import { AddEmployee } from './pages/private/AddEmployee';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Employees />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
