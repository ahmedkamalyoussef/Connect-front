import './App.css';
import Store from './Redux/Store';
import { Provider } from 'react-redux';
import Login from './Components/Auth/Login';
import ErrorPage from './Components/Error/ErrorPage';
import ProtectedRouter from './Components/ProtectedRouts/ProtectedRouter';
import Home from './Components/Home/Home';
import { ForgetPassword, Otp, Register, ResetPassword } from './Components/Import/Index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {AppLayout,Auth,JustFirst} from "./Layouts/Index";
import Profile from './Components/Profile/Profile';
import CustomerSetting from './Components/Settings/Customer/CustomerSetting';
import FreelancerSettings from './Components/Settings/Freelancer/FreelancerSettings';

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
            { index: true, element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "profile", element: <Profile/>},
            { path: "customersettings", element: <CustomerSetting/>},
            { path: "freelancersettings", element: <FreelancerSettings/>},
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
