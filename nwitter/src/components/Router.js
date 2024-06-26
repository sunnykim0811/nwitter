
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "routes/Navigation";
import Profile from "routes/Profile";

const AppRrouter=({isLoggedIn, userObj})=>{

  return(
    <Router>
       {isLoggedIn && <Navigation />}
      <Routes>
       
        {isLoggedIn?(
          <>
           <Route path="/" element={<Home userObj={userObj}/>} />
           <Route path="/profile" element={<Profile />} />
          </>
          ):(
             <Route path="/" element={<Auth />} />)
        }
          
      </Routes>
    </Router>
  );
};

export default AppRrouter;
