import {useState, useEffect} from "react";
import { onSnapshot, collection, query, orderBy} from "firebase/firestore"
import { dbService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home =({userObj})=>{

  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapshot(query(collection(dbService, "nweets"), orderBy("createdAt", "desc")), (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(newArray);
    });
  }, []);


  return(
    <div className="container">
     <NweetFactory userObj={userObj}/>
      <div style={{marginTop:30}}>
        {nweets.map((nweet)=>(
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid}/>

        ))}
      </div>
    </div>
  );

};

export default Home;
