import { ref, uploadString, getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from "uuid";
import { dbService, storageService } from "fbase";
import {useRef, useState} from "react";
import {addDoc, collection} from "firebase/firestore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

const NweetFactory=({userObj})=>{

  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const formRef = useRef();
  const fileInput = useRef(); 
  

  const onSubmit=async(event)=>{
    event.preventDefault();
    if (nweet === "") {
      return;
    }

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
      if (Boolean(theFile)){
        reader.readAsDataURL(theFile);
      }
    };
  
    const onClearAttachement =() =>{
      setAttachment("");
      formRef.current.reset(); 
    };

  return(
    <form ref={formRef} onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input className="factoryInput__input" value={nweet} onChange={onChange} type="text" placeholder="What's in your mind?" maxLength={120}/>
    {/* <input value={nweet} onChange={onChange} type="text" placeholder="What's in your mind?" maxLength={120}/> */}
    {/* <input type="file" accept="image/*" ref={fileInput} onChange={onFileChange} /> */}
    <input type="submit" value="&rarr;" className="factoryInput__arrow"  accept="image/*" ref={fileInput} onChange={onFileChange}/>
    </div>
    <label htmlFor="attach-file" className="factoryInput__label">
      <span>Add photos</span>
      <FontAwesomeIcon icon={faPlus}/>
    </label>
    <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity: 0}}/>
    {attachment &&(
      <div className="factoryForm__attachment">
          <img src={attachment} style={{backgroundImage: attachment}}/>
        <div className="factoryForm__clear" onClick={onClearAttachement}>
          <span>Remove</span>
          <FontAwesomeIcon icon={faTimes}/>
          {/* <button onClick={onClearAttachement}> Clear </button> */}
        </div>
     </div>
    )}
  </form>
  )
}

export default NweetFactory;