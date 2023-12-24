import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import ChatFaceData from '../Services/ChatFaceData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {

    const [chatFaceData, setChatFaceData] = useState([]);
    const [selectedChatFace, setSelectedChatFace] = useState([]);
    const navgitaion = useNavigation();
    useEffect(() => {
        setChatFaceData(ChatFaceData)
        checkFaceId();

    }, [])

    const checkFaceId = async () => {
        const id = await AsyncStorage.getItem('chatFaceId');
        id ? setSelectedChatFace(ChatFaceData[id]) : setSelectedChatFace(ChatFaceData[0])
    }
    return (
        <View style={{ alignItems: 'center', paddingTop: 90, backgroundColor: '#fff', flex: 1, justifyContent: 'center' }}>
            <Text style={[{ color: selectedChatFace?.primary }, { fontSize: 30, }]}>Xin chào,</Text>
            <Text style={[{ color: selectedChatFace?.primary }, { fontSize: 30, fontWeight: 'bold' }]}>Tôi là {selectedChatFace.name}</Text>
            <Image source={require('../Assets/chatface.png')}
                style={{ height: 150, width: 150, marginTop: 20 }} />
            <Text style={{ marginTop: 30, fontSize: 25 }}>Tôi có thể giúp gì cho bạn?</Text>

            <TouchableOpacity style={[{ backgroundColor: selectedChatFace.primary }
                , {
                    marginTop: 40, padding: 17, width: Dimensions.get('screen').width * 0.6,
                borderRadius: 100, alignItems: 'center'
            }]}
                onPress={() => navgitaion.navigate('chat')}>
                <Text style={{ fontSize: 16, color: '#fff' }}>Chat Ngay!!</Text>
            </TouchableOpacity>
        </View>
    )
}