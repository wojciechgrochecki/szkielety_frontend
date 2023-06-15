import './App.css';
import RegistrationForm from './components/Register/RegistrationForm';
import LoginForm from './components/Login/LoginForm';
import PromotionAddForm from './components/AddPromotion'
import { Route, Routes } from 'react-router-dom';
import PromotionList from './components/PromotionsPage/PromotionList';
import ProtectedRoute from './hooks/ProtectedRoute/ProtectedRoute'
import { UserProvider } from './hooks/auth';
import EditPromotion from './components/EditPromotion'
import SinglePromotion from './components/PromotionsPage/SinglePromotion';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/addPromotion" element={<PromotionAddForm />} />
          <Route path="/" element={<PromotionList />} />
          <Route path="/singlePromotion/:id" element={<SinglePromotion />} />
          <Route path="/editPromotion/:id" element={<EditPromotion />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
