import Home from './component/Home'
import Login from './component/Login'
import Signup from './component/Signup'
import Profile from './component/Profile';
import UserAuthContext from './context/UserAuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from './component/Layout';
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Login />}></Route>
    <Route path='/Signup' element={<Signup />}></Route>
    <Route path='/home' element={<Home />}></Route>
    <Route path='/profile' element={<Profile />}></Route>
    {/* <Route index element={<Login></Login>}></Route> */}
  </Route>
));
function App() {
  return (
      <UserAuthContext>
    <RouterProvider router={router} >
    </RouterProvider>
      </UserAuthContext>
  );
}

export default App;