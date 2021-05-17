import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from "./Chat";
import SideBar from "./SideBar";
import Pusher from 'pusher-js';
import axios from './axios';
function App() {
  const [messages,setMessages] = useState([]);

  // for fetching
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  },[]);

  // use effect --- rus a piece of code when web components is triggered and will only gets executed "ONCE"
  useEffect(() => {
    const pusher = new Pusher('1972b69432943edc1125', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    // clean up function in pusher you will not get Unsubscribe and subscribe
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  },[messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        {/* for side bar in left */}
        <SideBar />
        {/* fro chat in middle */}
        <Chat messages={messages}/>
      </div>
      {/* <h1>Welcome DARPAN Chachpara</h1> */}
    </div>
  );
}

export default App;
