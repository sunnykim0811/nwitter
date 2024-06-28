
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "routes/Navigation";
import Profile from "routes/Profile";

const AppRrouter=({isLoggedIn, userObj, refreshUser})=>{

  return(
    <Router>
       {isLoggedIn && <Navigation userObj ={userObj} />}
      <Routes>
       
        {isLoggedIn?(
          <>
           <Route path="/" element={<Home userObj={userObj}/>} />
           <Route path="/profile" element={<Profile userObj ={userObj} refreshUser={refreshUser} />} />
          </>
          ):(
             <Route path="/" element={<Auth />} />)
        }
          
      </Routes>
    </Router>
  );
};

export default AppRrouter;
