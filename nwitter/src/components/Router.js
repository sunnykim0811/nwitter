
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
          <Route path="/" element={
            <div style={{maxWidth: 890, width:"100%", margin: "0 auth", marginTop:80, display: "flex", justifyContent: "center"}}>
              <Home userObj={userObj}/>
            </div>
          }/>
          <Route path="/profile" element={
            <div style={{maxWidth: 890, width:"100%", margin: "0 auth", marginTop:80, display: "flex", justifyContent: "center"}}>
              <Profile userObj ={userObj} refreshUser={refreshUser} />
            </div>
          }/>
        </>
          ):(
             <Route path="/" element={<Auth />} />)
        }
          
      </Routes>
    </Router>
  );
};

export default AppRrouter;
