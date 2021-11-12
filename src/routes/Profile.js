import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default ({refreshUser, userObj}) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  }
  const getMyRweets = async() =>{
    const rweets = await dbService.collection("rweets").where("createrId", "==", userObj.uid).orderBy("createdAt").get();
    console.log(rweets.docs.map((doc) => doc.data()));
  }
  const onChange = (event) =>{
    const {target: {value}} = event;
    setNewDisplayName(value);
  };
  const onSubmit = async(event) => {
    event.preventDefault();
    if(userObj.displayName != newDisplayName){
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  useEffect(() => {
    getMyRweets();
  }, []);
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">   
        <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} autoFocus className="formInput" />
        <input type="submit" value="update Profile" className="formBtn"
          style={{marginTop: 10,}} />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};