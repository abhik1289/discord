import React, { useState, useEffect } from 'react'
import MessageItem from './MessageItem'
import DUMMY_MESSAGES from './Message'
import { getDirectChatHistory, sendDirectMesage } from '../realTimeCommunication/communication'
import { useSelector } from 'react-redux'
export default function MessageArea({ chatDetails }) {
  useEffect(() => {
    getDirectChatHistory({
      recevierUserId: chatDetails.chosenChatDetails.id
    })
  }, [chatDetails.chosenChatDetails.id])
  const [text, settext] = useState("")
  let id = useSelector((state) => state?.auth?.user.id);
  const handleSendMessage = (even) => {
    if (text.length > 0) {
      sendDirectMesage({
        recevierUserId: chatDetails.chosenChatDetails.id,
        content: text,
        id: id
      });
      settext("");
    }
  }
  const messages = useSelector((state) => state?.chart?.message);
  const userInfo = useSelector((state) => state?.auth?.user);


  return (
    <>
      <div className="body_area px-3 w-full h-[80vh]">
        {messages.map((item, index) => <MessageItem
          key={index}
          content={item.content}
          //  author={item.authorid}
          sameAuthor={item.author === userInfo.id ? true : false}
        // date={item.date}
        // today={item.sameDay}
        />)}
      </div>
      <div className='input_area w-full bg-slate-700 px-3 py-2 relative overflow-y-scroll'>
        <input
          onChange={(e) => settext(e.target.value)}
          placeholder='Type a message'
          type="text" className="input_bx w-full px-2 py-2 outline-none rounded-md" />
        <button onClick={handleSendMessage} className='px-2 py-1 bg-green-600 absolute top-[50%] translate-y-[-50%] right-5 rounded-md text-black'>Send</button>
      </div>

    </>
  )
}
