import AppRouter from "components/Router";
import {useState, useEffect} from "react";
import {authService} from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] =useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
    if(user) {
      setIsLoggedIn(user);
      setUserObj(user);}

    else{setIsLoggedIn(false);}
    setInit(true);});
  },[]);

  console.log(authService.currentUser);

  return (
    <>
       {init? (<AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>):( "Initializing...")}
      <footer> &copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
