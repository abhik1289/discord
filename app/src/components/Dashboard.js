import React, { useEffect, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai';
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/authSlice';
import Cookies from 'js-cookie';
import { FaUsers } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';

import FriendItem from './FriendItem';
import { connectWithSocketServer, getDirectChatHistory, sendDirectMesage } from '../realTimeCommunication/communication';
import { setFriend } from '../redux/features/friendsSlice';
import { setchosenChatDetails } from '../redux/features/chartSlice';
import DUMMY_MESSAGES from './Message';
import MessageItem from './MessageItem';
import { setopenRoom } from '../redux/features/roomSlice';
import MessageArea from './MessageArea';
import * as socketConnection from '../realTimeCommunication/communication';
export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    connectWithSocketServer(user);

  }, [])
  const [email, setemail] = useState();
  const [visable, setvisable] = useState(false);

  const dispatch = useDispatch();
  const pendingFriend = useSelector((state) => state?.friend?.pendingFriendInvites);
  let friends = useSelector((state) => state?.friend?.friends);


  let onlineUsers = useSelector((state) => state?.friend?.onlineFriend);
  const handleLogOut = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          const res = await fetch("/api/auth/logout", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.status === 200) {
            Cookies.remove("auth")
            dispatch(logout());
          }
        }
      });
  }
  const handleInviteFriendReq = async () => {

    try {
      const res = await fetch("/api/auth/friendInvitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email
        })
      });
      const data = await res.json();
      const message = data.message;
      console.log(data);
      if (res.status === 200) {
        alert(message)
      } else {
        alert(message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const DUMMY_friends = [
    {
      id: 1,
      name: "Jhon Wood",
      online: true,
    },
    {
      id: 2,
      name: "Willam Wood",
      online: false,
    },
    {
      id: 3,
      online: false,
      name: "Jhon Tomas",
    }
  ];
  const handleReject = async (id) => {
    try {
      const res = await fetch("/api/auth/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id
        })
      });
    } catch (error) {
      console.log(error);
    }
  }
  const handleAccept = async (id) => {
    try {
      const res = await fetch("/api/auth/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id
        })
      });
      const data = await res.json();
      const { } = data;
      if (res.status === 200) {
        dispatch(setFriend(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
  const checkOnlineUser = (friends = [], onlineUsers = []) => {
    friends.forEach((user) => {
      let isUserOnline = onlineUsers.find((data) => data.userId === user.id);
      console.log("online user is", isUserOnline);
      // console.log("modified is", user.isOnline = true);
      // console.log(newData);
    })
    return friends;
  }
  const HandlesetChartdetails = (id, name) => {
    let data = { id, name }
    dispatch(setchosenChatDetails({ info: data, type: "DIRECT" }))
  }
  const chatDetails = useSelector((state) => state.chart);

  const handleRoom = () => {
    dispatch(setopenRoom({
      isUserRoomCreator: true,
      isUserInRoom: true
    }));
    socketConnection.createNewRoom()
  }
  //const converArray = pendingFriend ? JSON.parse(pendingFriend) : [];
  return (
    <>
      <section className='flex main_wrapper '>
        <div className="left w-3/12">
          <div className="side_bar w-full h-[100vh] bg-slate-500 flex">
            <div className="left_part w-[80px] relative h-full flex flex-col items-center pt-5 r bg-slate-900">
              <div className="icon_bx w-[60px] rounded-md h-[60px] bg-blue-500 flex justify-center items-center text-white">
                <FaUsers className='text-3xl' />
              </div>
              <div className="icon_bx w-[60px] my-3 rounded-md h-[60px] bg-blue-500 flex justify-center items-center text-white" onClick={handleRoom}>
                <AiOutlinePlus className='text-3xl' />
              </div>
            </div>
            <div className="right w-full px-2 py-3">
              <button onClick={() => setvisable(true)} className='outline-none w-full bg-blue-700 py-2 text-white rounded-md'>Invite Friend</button>
              <div className="invitation_list w-full bg-slate-400 rounded-md h-[40vh] mt-3 p-2">
                <div className="header_bx text-xl">
                  Your Friend List
                </div>
                <div className="friend_list mt-3">
                  {
                    friends.map((item, index) => {

                      return <FriendItem
                        onPress={() => HandlesetChartdetails(item.id, item.username)}
                        key={index}
                        name={item.username}
                        online={item.online}

                      />
                    })
                  }
                </div>
              </div>
              <div className="pending_invation w-full h-[20vh] p-2 bg-slate-400 rounded-md my-2">
                <div className="header_bx text-xl">
                  Pending Friends
                </div>
                <div className="friend_list">

                  {
                    pendingFriend.map((item, index) => {

                      return <div key={index} className='my-1 flex justify-between cursor-pointer items-center hover:bg-slate-300 p-1 rounded-md transition-all'>
                        <div className="left flex items-center gap-2">
                          <div className="icon w-[40px] h-[40px] bg-slate-700 rounded-full flex items-center justify-center font-bold text-yellow-400">
                            {item.senderId.username && item.senderId.username[0]}
                          </div>
                          <div className="name">
                            {item.senderId.username}
                          </div>
                        </div>
                        <div className='accerpt_reject flex'>
                          <button className='w-[25px] h-[25px] ml-2
               bg-green-400 rounded-full' onClick={() => handleAccept(item._id)}>A</button>
                          <button className='w-[25px] h-[25px] ml-2
               bg-red-400 rounded-full' onClick={() => handleReject(item._id)}>R</button>
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right w-9/12 ">
          <div className="header h-[70px] bg-slate-400 flex justify-between items-center px-4">
            <div className="left">
              {chatDetails.chosenChatDetails && <div className="profile_info flex">
                <div className="profile">
                  <div className="icon w-[40px] h-[40px] bg-slate-700 rounded-full flex items-center justify-center font-bold text-yellow-400">
                    {chatDetails?.chosenChatDetails?.name[0]}
                  </div>
                </div>
                <div className="details pl-3 my-auto">
                  {chatDetails?.chosenChatDetails?.name}
                </div>
              </div>}
            </div>
            <div className="right">
              <div className="lft_wrapper w-8/12">
                <div className="right w-[40px] h-[40px] flex justify-center items-center cursor-pointer bg-white rounded-full"
                  onClick={handleLogOut}
                >
                  <AiOutlineLogout />
                </div>
              </div>
            </div>
          </div>
          <div className="left relative">
            
            <section className="body_area">
          { chatDetails.chosenChatDetails &&   <MessageArea chatDetails={chatDetails} />}
              {visable && <div className="dialog_box_area fixed top-0 left-0 z-40 w-screen h-screen bg-[#00000059] flex justify-center items-center">
                <div className="main_wrapper p-4 w-[400px] h-[200px] bg-white rounded-md">
                  <div className="title text-xl font-semibold">
                    Invite your friend
                  </div>
                  <div className="input_area">
                    <label>
                      Email
                    </label>
                    <input className='border outline-none w-full
 px-2 py-1 my-1 rounded-md focus:border-blue-800' type="text" onChange={(e) => setemail(e.target.value)} name="" id="" />
                    <button onClick={handleInviteFriendReq} className='btn px-3 py-2 bg-blue-500 text-white
               rounded-md'>Send</button>
                    <button onClick={() => setvisable((state) => false)} className='btn ml-3 px-3 py-2 bg-red-500 text-white
               rounded-md'>close</button>
                  </div>
                </div>
              </div>}
            </section>
          </div>

        </div>

      </section>
      <div className="room_area fixed right-0 bottom-[60px] w-[300px] h-[300px] bg-slate-400">
              <div className="body w-full h-full bg-red-300"></div>
              <div className="bottomPart h-[70px] w-full bg-black text-white flex justify-between items-center">
                <button>Camera</button>
                <button>Mic</button>
                <button>Close</button>
                <button>Video</button>
                <button>Expand</button>

              </div>
            </div>
    </>
  )
}
