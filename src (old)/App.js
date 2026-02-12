import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import RequireAuth from "./components/Auth/RequireAuth";
import Home from "./components/pages/Home";
import Layout from "./components/Layout";
import Register from "./components/Login/Register";
import Landing from './components/Login/Landing';
import NotFound from "./components/NotFound";


function App() {

  return (

    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/landing' element={<Landing />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        {/* protected routes*/}
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />}></Route>

        </Route>
      </Route>
    </Routes>
  );
}

export default App;

