import React from 'react'

export default function FriendItem({ online, name, asked, onPress }) {
  return (
    <div onClick={onPress} className='my-1 flex justify-between cursor-pointer items-center hover:bg-slate-300 p-1 rounded-md transition-all'>
      <div className="left flex items-center gap-2">
        <div className="icon w-[40px] h-[40px] bg-slate-700 rounded-full flex items-center justify-center font-bold text-yellow-400">
          {name && name[0]}
        </div>
        <div className="name">
          {name}
        </div>
      </div>
      {asked ? <div className='accerpt_reject flex'>
        <button className='w-[20px] h-[20px] ml-2
 bg-green-400 rounded-full'>A</button>
        <button className='w-[20px] h-[20px] ml-2
 bg-red-400 rounded-full'>R</button>
      </div> : <div className="online_wrapper">
        {online && <div className="online_indicator w-[15px] rounded-full h-[15px] bg-green-600">
        </div>}
      </div>}
    </div>
  )
}
