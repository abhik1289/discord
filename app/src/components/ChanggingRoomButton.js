import React from 'react'
import { store } from '../redux/store'
import { setopenRoom } from '../redux/features/roomSlice'
export default function ChanggingRoomButton() {
 store.dispatch(setopenRoom({
    isUserRoomCreator:true,
    isUserInRoom:true
 }))
}
