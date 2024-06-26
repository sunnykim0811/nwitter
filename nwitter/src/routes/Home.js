import {useState, useEffect, useRef} from "react";
import {addDoc, onSnapshot, collection, query, orderBy} from "firebase/firestore"
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";
import {v4 as uuidv4} from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";




const Home =({userObj})=>{
  
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const formRef = useRef();
  const fileInput = useRef(); 

  useEffect(() => {
    onSnapshot(query(collection(dbService, "nweets"), orderBy("createdAt", "desc")), (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(newArray);
    });
  }, []);



  const onSubmit=async(event)=>{
    event.preventDefault();

    let attachmentUrl = "";
    if (attachment !== "") {
        const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(attachmentRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(response.ref);
    }

    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    });
    setNweet("");
    setAttachment("");
    fileInput.current.value = "";
 
  };

  const onChange=async(event)=>{
  
    const {target:{value}}=event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {target:{files}} = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);}
      const {currentTarget:{result}} = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachement =() =>{
    setAttachment("");
    formRef.current.reset(); 
  };

  return(
    <>
      <form ref={formRef} onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's in your mind?" maxLength={120}/>
        <input type="file" accept="image/*" ref={fileInput} onChange={onFileChange} />
        <input type="submit" value="Nweet"/>
        {attachment &&(
          <div>
            <img src={attachment} width="50px" height="50px"/>
            <button onClick={onClearAttachement}> Clear </button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet)=>(
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid}/>

        ))}
      </div>
    </>
  );

};

export default Home;
