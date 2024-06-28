import {Link} from "react-router-dom";


const Navigation =({userObj} )=>{
  return (
    <nav>
      <ul>
        <li>
          <Link to ="/"> Home</Link>
        </li>
        <li>
        <Link to="/profile">
          {userObj && userObj.providerData && userObj.providerData[0] && userObj.providerData[0].providerId === 'github.com' 
            ? userObj.reloadUserInfo && userObj.reloadUserInfo.screenName 
            : userObj && userObj.providerData && userObj.providerData[0] && userObj.providerData[0].providerId === 'password' 
              ? "유저님" 
              : userObj && userObj.displayName
          }의 Profile
        </Link>
        </li>
      </ul>
    </nav>
  );
};



export default Navigation;