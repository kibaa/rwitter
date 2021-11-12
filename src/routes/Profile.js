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
    <>
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} />
      <input type="submit" value="update Profile" />
    </form>
    <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};