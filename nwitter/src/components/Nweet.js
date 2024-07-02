import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { useState } from "react";
import { ref, deleteObject} from "firebase/storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";


const Nweet=({nweetObj, isOwner})=>{

  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick= async()=>{
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok){
     await deleteDoc(doc(dbService, "nweets", nweetObj.id));

     if (nweetObj.attachmentUrl !== "") {
      const storageRef = ref(storageService, nweetObj.attachmentUrl);
      await deleteObject(storageRef);
    }
    }
  };

  const toggleEditing = () => setEditing((prev)=>!prev);

  const onChange=(event)=>{
    const {target: {value}}= event;
    setNewNweet(value);
  };

  const onSubmit =async(event)=>{
    event.preventDefault();
    // console.log(nweetObj.id, newNweet);
    // console.log(nweetObj);
    await updateDoc(doc(dbService, "nweets", nweetObj.id), { text: newNweet });
    setEditing(false);

  };

  return (
    <div className="nweet">
      {editing ? (
        <>       
          <form onSubmit={onSubmit} className="container nweetEdit"> 
            <input onChange={onChange} value={newNweet} required placeholder="Edit your nweet" autoFocus className="formInput"/>
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn"> Cancel</button>
        </>
      ) : (
        <>
          <h4> {nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="attachment" />}
          
          {isOwner && (
         
          <div className="nweet__action">
            <span onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <span onClick={toggleEditing}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </span>
          </div>
          
          
          )}
        </>
      )}
    </div>
  )};

export default Nweet;