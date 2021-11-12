import { dbService, storageService } from "fbase";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  value={newRweet}
                  onChange={onChange} 
                  type="text" 
                  placeholder="Edit your rweet" 
                  required
                />
                <input type="submit" value="Update Rweet"  className="formBtn" />
              </form>
              <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
            </>
          )}
        </>
      ) : (
        <>  
          <h4>{rweetObj.text}</h4>
          {rweetObj.attachmentUrl && <img src={rweetObj.attachmentUrl} />}
          {isOwner && (
            // <>
            //   <button onClick={onDeleteClick}>Delete Rweet</button>
            //   <button onClick={toggleEditing}>Edit Rweet</button>
            // </>
            <div className="nweet__actions">
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
  );
};

export default Rweet;