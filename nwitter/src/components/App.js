import AppRouter from "components/Router";
import {useState, useEffect} from "react";
import {authService} from "fbase";
import { updateProfile } from "firebase/auth";

function App() {
  
  const [init, setInit] =useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
    if(user) {
      
      setUserObj({
        uid: user.uid,
        displayName: user.displayName,
        updateProfile: (args) => updateProfile(user, args)
      });}

    else{setUserObj(false);}
    setInit(true);});
  },[]);

  // console.log(authService.currentUser);

  const refreshUser = () => {
    const user = authService.currentUser;
    if (user) {
      setUserObj({
        uid: user.uid,
        displayName: user.displayName,
        updateProfile: (args) => updateProfile(user, args),
      });
    } else {
      setUserObj(null);
    }
  };

  return (
    <>
       {init? (<AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser}/>):( "Initializing...")}
      <footer> &copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
