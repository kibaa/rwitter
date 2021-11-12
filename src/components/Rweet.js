import { dbService, storageService } from "fbase";
import React from "react";
import { useState } from "react";

const Rweet = ({rweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newRweet, setNewRweet] = useState(rweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete the rweet?");
    if(ok){
      //delete
      await dbService.doc(`rweets/${rweetObj.id}`).delete();
      await storageService.refFromURL(rweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`rweets/${rweetObj.id}`).update({
      text: newRweet,
    })
    setEditing(false);
  };
  const onChange = (event) => {
    const { target: {value} } = event;
    setNewRweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  value={newRweet}
                  onChange={onChange} 
                  type="text" 
                  placeholder="Edit your rweet" 
                  required
                />
                <input type="submit" value="Update Rweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>  
          <h4>{rweetObj.text}</h4>
          {rweetObj.attachmentUrl && <img src={rweetObj.attachmentUrl} width="50px" height="50px" />}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Rweet</button>
              <button onClick={toggleEditing}>Edit Rweet</button>
            </>
          )}
    
        </>
      )}
    </div>
  );
};

export default Rweet;