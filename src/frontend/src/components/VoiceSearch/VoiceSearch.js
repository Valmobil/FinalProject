import React, { useEffect } from 'react'

const VoiceSearch = ({ voiceHandle, start }) => {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'ru-RU';
    recognition.addEventListener('result', (e) => listener(e));
    const listener = (e) => {
        const transcript = Array.from(e.results)
            .map(data => data[0])
            .map(data => data.transcript)
            .join('');
        if (e.results[0].isFinal){
            voiceHandle(transcript)
        }
    }

    useEffect(() => {
        if (start){
            recognition.start();
        } else recognition.stop();
    },[start])


    return(<></>)
}

export default VoiceSearch