import './App.css';
import Store from './Redux/Store';
import { Provider } from 'react-redux';
import Login from './Components/Auth/Login';
import ErrorPage from './Components/Error/ErrorPage';
import ProtectedRouter from './Components/ProtectedRouts/ProtectedRouter';
import Home from './Components/Home/Home';
import { ForgetPassword, Otp, Register, ResetPassword } from './Components/Import/Index';
import Settings from './Components/Settings/Settings';
import Info from './Components/Settings/Info/Info';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {AppLayout,Auth,JustFirst} from "./Layouts/Index";
import Profile from './Components/Profile/Profile';

const routers = createBrowserRouter([
  {
    path: "/",
    element: <JustFirst/>,
    children: [
      { index: true, element: < Login/> },
      { path: "signin", element: <Login /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <AppLayout />
      </ProtectedRouter>
    ),
    children: [
           {path: "home", element: <Home />, },
            { index: true, element: <Home /> },
            { path: "profile", element: <Profile/>},
            { path: "profileAccount/:id", element: <Profile /> },
            { path: "setting", element: <Settings/>, children: [
              { index: true, element: <Info/> },]},
          ],
      },
      { path: "*", element: <ErrorPage /> },
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "login", element: <Login/> },
      { path: "verify-otp", element: <Otp /> },
      { path: "register", element: <Register /> },
      { path: "resetpass", element: <ForgetPassword/> },
      { path: "changepass", element: <ResetPassword/> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);


function App() {
  return (
    <Provider store={Store}>
    <RouterProvider router={routers} />
    </Provider>
  );
}

export default App;
