import { useState, useRef, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import UserAccount from './pages/UserAccount';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Create from './pages/Create';

// Components
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

// Containers
import SearchDataContainer from './containers/SearcDataContainer';

// Context providers
import UserContext, { UserContextProvider } from './context/UserContext';
import { DisplayContextProvider } from './context/ItemDisplayContext';
import Logout from './pages/Logout';
import { loginCheck } from './ts/auth/authComm';

function App() {
  const user = useContext(UserContext);

  useEffect(() => {
    loginCheck().then((x) => {
      if (x) {
        // eslint-disable-next-line react/destructuring-assignment
        user.setUserState(x.username, true, x.email);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App bg-wrap">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<SearchDataContainer />} />
          <Route
            path="/UserAccount"
            element={<UserAccount x="userAccount" />}
          />
          <Route path="/Register" element={<Register x="Register Page" />} />
          <Route path="/Login" element={<Login x="Login Page" />} />
          <Route path="/About" element={<About x="About Page" />} />
          <Route path="/Create" element={<Create x="Create page" />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/userAccount" element={<UserAccount x="s" />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
