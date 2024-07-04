import React from 'react'

export default function MessageItem({ content, sameAuthor, author, date, sameDay }) {
    return (
      <div className={`main_wrapper ${sameAuthor?"flex justify-start":"justify-end"}`}>
          <div className={`message_wrapper w-[250px] ${sameAuthor ? "bg-green-600 " : "bg-slate-800 text-white "} my-2 px-3 py-1 rounded-md`}>
            {content}
        </div>
      </div>
    )
}
