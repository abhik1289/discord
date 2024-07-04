import React from 'react'
import { store } from '../redux/store';
import { setMessage } from '../redux/features/chartSlice';

export default function updateDirectChatHistoryIfActive(data) {
    const { participants, messages } = data;
    const receverId = store.getState().chart.chosenChatDetails.id;
    const userId = store.getState().auth.user.id;
    if (receverId && userId) {
        const userInConversation = [receverId, userId];
        updateChatHistoryIsSameConversationActive({
            participants, userInConversation, messages
        })
    }
}
const updateChatHistoryIsSameConversationActive = ({ participants, userInConversation, messages }) => {
    const result = participants.every(function (participantsId) {
        return userInConversation.includes(participantsId)
    });
    if(result){
        messages.map((item,i)=>store.dispatch(setMessage(item))
        )
    }
}