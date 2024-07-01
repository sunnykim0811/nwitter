import { ref, uploadString, getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from "uuid";
import { dbService, storageService } from "fbase";
import {useRef, useState} from "react";
import {addDoc, collection} from "firebase/firestore";

const NweetFactory=({userObj})=>{

  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const formRef = useRef();
  const fileInput = useRef(); 

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
  )
}

export default NweetFactory;