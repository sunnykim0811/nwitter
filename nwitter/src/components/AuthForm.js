import {useState} from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {authService} from "fbase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange =(event)=>{
    console.log(event.target.name);

    const {target:{name, value}} = event;
    
    if (name==="email"){
      setEmail(value);
    } else if (name ==="password"){
      setPassword(value);
    }
  
  };
  const onSubmit= async (event)=>{
    event.preventDefault();
    try{
      let data;
     
      if (newAccount){
        data = await createUserWithEmailAndPassword(authService, email, password);
       } else {
        data = await signInWithEmailAndPassword(authService, email, password);
       }
     
    } catch(error){
      setError(error.message);
    }

  };

const toggleAccount =()=> setNewAccount((prev)=> !prev);

  return(
    <>
      <form onSubmit={onSubmit}>
      <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
      <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
      <input type="submit" value={newAccount? "Create Account": "Log In"} />
      {error}
      </form>
   
      <span onClick={toggleAccount}>
        {newAccount? "Sing In": "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;