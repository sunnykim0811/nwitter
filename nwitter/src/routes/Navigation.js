import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";


const Navigation =({userObj} )=>{
  return (
    <nav>
      <ul style={{ display: "flex", justifyContent:"center", marginTop : 50}}>
        <li>
          <Link to ="/" style={{marginRight:10}}> Home</Link>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x"/>
        </li>
        <li>
        <Link to="/profile" style={{marginLeft: 10, display:"flex", flexDirection:"column", alignItems:"center", fontSize:12}}>
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x"/>
          <span style={{marginTop:10}}/>
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