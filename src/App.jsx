import './App.css';
import Store from './Redux/Store';
import { Provider } from 'react-redux';
import Login from './Components/Auth/Login';
import ErrorPage from './Components/Error/ErrorPage';
import ProtectedRouter from './Components/ProtectedRouts/ProtectedRouter';
import MainPage from './Pages/MainPage';
import Home from './Components/Home/Home';
import { ForgetPassword, Otp, Profile, Register, ResetPassword } from './Components/Import/Index';
import Settings from './Components/Settings/Settings';
import Info from './Components/Settings/Info/Info';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {AppLayout,Auth,JustFirst} from "./Layouts/Index";

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
      {
        path: "/", element: <MainPage />, children: [
          { path: "home", element: <Home />, children: [
            { index: true, element: <Home /> },
          
          ]},
          { path: "profile/:id", element: <Profile/>},
          { path: "profileAccount/:id", element: <Profile /> },
          { path: "ProfileUser", element: <Profile/> },
          { path: "setting", element: <Settings/>, children: [
            { index: true, element: <Info/> },
          ]},
        ],
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
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
