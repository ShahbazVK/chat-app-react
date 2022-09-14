import React, { useEffect, useState, useRef } from 'react'
export const Chat = (props) => {
    const { socket, username, roomid } = props
    const [message, setmessage] = useState("")
    const [messageslist, setmessageslist] = useState([])
    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                roomid,
                username,
                message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData)
            setmessageslist((old) => [...old, messageData])
            setmessage('')
        }
    }


    useEffect(() => {
        console.log("first")
        socket.on("receive_message", (data) => {
            console.log(data);
            setmessageslist((old) => [...old, data])
            console.log("second")

        })
        console.log("third")
    }, [socket])



    return (
        <div className='chat'>
            <div className='chatheading'>
                <p>{`Live chat`}</p>
            </div>
            <div className='chatmessagescontainer'>
                {messageslist.map((element, key) => {
                    return (
                        <div className={`${username === element.username ? "you" : "me"}`}>
                            <p>{element.message}<br /><strong style={{ borderTop: "1px solid black" }}>{element.username} {element.time}</strong></p><br />
                        </div>
                    )
                })}
            </div>
            <input value={message} onChange={(event) => setmessage(event.target.value)} onKeyDown={(event) => event.key === "Enter" ? sendMessage() : ""} placeholder='Type a message' type="text" /><br />
            <button onClick={() => sendMessage()} >Send</button>
        </div>
    )
}
