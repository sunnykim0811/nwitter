import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { useState } from "react";
import { ref, deleteObject} from "firebase/storage";


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
    console.log(nweetObj.id, newNweet);
    console.log(nweetObj);
    await updateDoc(doc(dbService, "nweets", nweetObj.id), { text: newNweet });
    setEditing(false);

  };

  return (
    <div>
      {editing ? (
        <>       
          <form onSubmit={onSubmit}> 
            <input onChange={onChange} value={newNweet} required/>
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}> Cancel</button>
        </>
      ) : (
        <>
          <h4> {nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="attachment" />}
          
          {isOwner && (
          <>
            <button onClick={onDeleteClick}> Delete Nweet</button>
            <button onClick={toggleEditing}> Edit Button</button>
          </>
          )}
        </>
      )}
    </div>
  )};

export default Nweet;