import { View, Text, Image } from 'react-native'
import React from 'react'
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import GlobalApi from '../Services/GlobalApi';
import { FontAwesome } from '@expo/vector-icons';
import ChatFaceData from '../Services/ChatFaceData';
import AsyncStorage from '@react-native-async-storage/async-storage';

CHAT_BOT_FACE = 'https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png'
export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatFaceColor, setChatFaceColor] = useState();

  useEffect(() => {
    checkFaceId();
    CHAT_BOT_FACE = require('../Assets/chat.png');
    setMessages([
      {
        _id: 1,
        text: 'Xin chào, Tôi là AH Study Chatbot Tôi có thể giúp gì cho bạn?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: CHAT_BOT_FACE,
        },
      },
    ])
  }, [])

  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem('chatFaceId');
    CHAT_BOT_FACE = require('../Assets/chat.png');
    setChatFaceColor('#2A87FF');
  }

  const onSend = useCallback((messages = []) => {

    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, [])

  const getBardResp = (msg) => {
    setLoading(true)
    GlobalApi.getBardApi(msg).then(resp => {
      if (resp.data.choices[0].message.content) {
        setLoading(false)
        const chatAIResp = {
          _id: Math.random() * (9999999 - 1),
          text: resp.data.choices[0].message.content,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: CHAT_BOT_FACE,

          }
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))
        console.log(resp.data.choices[0].message.content)
      }
      else {
        setLoading(false)
        const chatAIResp = {
          _id: Math.random() * (9999999 - 1),
          text: "Xin lỗi, Tôi chưa thể giúp bạn trả lời câu hỏi này!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: CHAT_BOT_FACE,

          }
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))
      }
    },
      error => {

      })
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2A87FF',

          }, left: {
            backgroundColor: '#DCE7FF',
          }

        }}
        textStyle={{
          right: {
            // fontSize:20,
            padding: 2
          },
          left: {
            color: '#000',
            padding: 2
          }
        }}
      />
    )
  }

  const renderInputToolbar = (props) => {
    //Add the extra styles via containerStyle
    return <InputToolbar {...props}
      containerStyle={{
        padding: 3,

        backgroundColor: '#fff',
        color: '#000',
      }}

      textInputStyle={{ color: "#000" }}
    />
  }

  const renderSend = (props) => {
    return (
      <Send
        {...props}
      >
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <FontAwesome name="send" size={24} color="cyan" resizeMode={'center'} />

        </View>
      </Send>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <GiftedChat
        messages={messages}
        isTyping={loading}
        multiline={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,

        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
      />


    </View>
  )
}