import './App.css';
import io from 'socket.io-client'
import React, { useState } from 'react'
import { Chat } from './Chat';

const socket = io.connect("http://localhost:8000");
function App() {
  const [username, setusername] = useState()
  const [roomid, setroomid] = useState()
  const [enter, setenter] = useState(false)
  const JoinRoom = () => {
    if (username !== "" && roomid !== "") {
      socket.emit("join_room", roomid)
      setenter(true)
    }
    return (
      <div>App</div>
    )
  }


  return (
    <div className="App">
      {!enter ? <div className='chatlogin'>
        <h2>Join a chat</h2>
        <input onChange={(event) => setusername(event.target.value)} type="text" placeholder="John" /> <br />
        <input onChange={(event) => setroomid(event.target.value)} type="text" placeholder="Room id" /> <br />
        <button onClick={() => JoinRoom()}>Join a room</button>
        <div>

        </div>
      </div> : <Chat socket={socket} username={username} roomid={roomid} />}
    </div>
  );
}

export default App;
