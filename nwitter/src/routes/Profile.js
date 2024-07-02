import {authService, dbService} from "fbase";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onSnapshot, query, collection, where, orderBy } from "firebase/firestore";
import Nweet from 'components/Nweet';
import { updateProfile } from "firebase/auth";



const Profile =({userObj, refreshUser})=>{
  const [nweets, setNweets] = useState([]); 
  const [newDisplayName, setNewDisplayName] = useState(() => {
    if (userObj && userObj.providerData && userObj.providerData[0] && userObj.providerData[0].providerId === 'github.com') {
      return userObj.reloadUserInfo && userObj.reloadUserInfo.screenName;
    } else if (userObj && userObj.providerData && userObj.providerData[0] && userObj.providerData[0].providerId === 'password') {
      return "유저님";
    } else {
      return userObj && userObj.displayName;
    }
  });

  const navigate = useNavigate();

  const onChange = (event) =>{
    const {target:{value}}=event;
    setNewDisplayName(value);
  };
 
  
  const onLogOutClick = async () => {
    await authService.signOut();
    navigate('/');
  };


  const getMyNweets = () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
  
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  };
  
  useEffect(() => {
    getMyNweets();
  }, []);


  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj && userObj.providerData && userObj.providerData[0] && userObj.providerData[0].providerId === 'github.com' ){
      if (userObj.reloadUserInfo && userObj.reloadUserInfo.screenName !== newDisplayName) {
        await updateProfile(authService.currentUser, {screenName: newDisplayName });
        refreshUser();
      }
    } else {
      if (userObj && userObj.displayName !== newDisplayName) {
        await updateProfile(authService.currentUser, { displayName: newDisplayName });
        await authService.currentUser.reload();
        refreshUser();
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input type="text" placeholder="프로필 이름 수정" onChange={onChange} value={newDisplayName} autoFocus className="formInput" />
        <input type="submit" value="Update Profile" className="formBtn" style={{marginTop:10}}/>
      </form>
      <span className="formBtn" style={{marginTop:20}} onClick={onLogOutClick}> Log Out </span>
      <div style={{marginTop:40}}>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <Nweet nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
           
                
              </div>
            ))}
          </div>
        </div>);
};



export default Profile;