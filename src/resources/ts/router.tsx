import React from 'react';
import {
  BrowserRouter,
  Routes, // v6からSwitchからRoutesに
  Route,
  Link
} from "react-router-dom";
import MedicineHeader from './pages/header';
import MedicineListPage from './pages/medicines';
import MedicineCreatePage from './pages/medicines/create';
import MedicineEditPage from './pages/medicines/edit';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        {<MedicineHeader />}
        <Routes>
          // v6からelementを用いた書き方に変更
          <Route path='/medicine' element={<MedicineListPage />} />
          <Route path='/medicine/create' element={<MedicineCreatePage />} />
          <Route path='/medicine/edit/:medicineId' element={<MedicineEditPage />} />
          <Route path='/calender' element={<h2>カレンダーページ</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;
