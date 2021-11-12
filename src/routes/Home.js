import Rweet from "components/Rweet";
import RweetFactory from "components/RweetFactory";
import { dbService, storageService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";


const Home = ({userObj}) => {
  
 
  const [rweets, setRweets] = useState([]);
  
  useEffect(() => {
    dbService.collection("rweets").onSnapshot((snapshot) => {
      const rweetArray = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(),
      }));
      setRweets(rweetArray);
    })
  }, []);
  
  return (
    <div className="container">
        <RweetFactory userObj={userObj} />
        <div style={{ marginTop: 30 }}>
          {rweets.map((rweet) => (
            <Rweet key={rweet.id} rweetObj={rweet} isOwner={rweet.createrId === userObj.uid} />
          ))}
        </div>
    </div>
  );
};
  

export default Home;