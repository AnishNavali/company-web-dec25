/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { X, Mic, VolumeX, Volume2, Send, Play, Pause, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    ChatBubble,
    ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import { Switch } from "@/components/ui/switch"
import { AIVoiceInput } from "@/components/ui/ai-voice-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { callSarvamSTT } from "@/services/api/stt-api";
import { generateResponse } from "@/services/utils/chatHelpers";

interface Message {
    id: number;
    content: string;
    sender?: string;
    timestamp: Date;
    chatType: string;
}

const EDCSChatBot = ({ headerTitle = "Equilibrate.AI" }) => {
    const [chatInput, setChatInput] = useState<string>('')
    const [showRecorder, setShowRecorder] = useState<boolean>(false);
    const [chatArray, setChatArray] = useState<string[]>([])
    const [chatString, setChatString] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ttsAudioUrl, setTtsAudioUrl] = useState<string | null>(null);
    const [kannadaOption, setKannadaOption] = useState<boolean>(false);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            content: "Hi there! I'm your personal AI assistant. How can I help you today?",
            timestamp: new Date(),
            chatType: "",
        },
    ])

    useEffect(() => {
        if (ttsAudioUrl && audioEnabled && audioRef.current) {
            const audio = audioRef.current;
            audio.src = ttsAudioUrl;
            audio.onplay = () => setIsPlaying(true);
            audio.onpause = () => setIsPlaying(false);
            audio.onended = () => setIsPlaying(false);
            audio.play().catch(error => console.error("Audio playback failed:", error));
        }
    }, [ttsAudioUrl, audioEnabled]);

    // ... (Your existing handler functions: handleSTT, generateResponseForVoice, etc. remain unchanged)
    const handleStart = () => { };

    const handleSTT = async (audioBlob: Blob) => {
        try {
            const text = await callSarvamSTT(audioBlob, kannadaOption);
            if (text) {
                setMessages(prev => [
                    ...prev,
                    { id: Date.now(), content: text, sender: "user", timestamp: new Date(), chatType: "" }
                ]);
                const newChatString = chatString + `,user:${text}`;
                setChatString(newChatString);
                await generateResponseForVoice(text, newChatString);
            }
        } catch (error) { console.error("Error in STT:", error); }
    };

    const generateResponseForVoice = async (userMessage: string, newChatString: string) => {
        await generateResponse(userMessage, newChatString, setIsLoading, setMessages, setChatArray, setChatString, chatArray, audioEnabled, kannadaOption, setTtsAudioUrl);
    };

    const handleStop = async ({ audioBlob }: { audioBlob: Blob | null }) => {
        if (audioBlob && audioBlob.size > 0) {
            const processedBlob = new Blob([await audioBlob.arrayBuffer()], { type: "audio/wav" });
            await handleSTT(processedBlob);
        } else { console.error("Recording Failed: Empty audio blob"); }
    };

    const handleChat = (userInput?: string) => {
        const userMessage = (userInput === undefined ? chatInput : userInput).trim();
        if (userMessage === '') return;
        const newChatString = chatString + `,user:${userMessage}`;
        setChatInput("");
        setMessages(prev => [
            ...prev,
            { id: Date.now(), content: userMessage, sender: "user", timestamp: new Date(), chatType: "" }
        ]);
        setChatString(newChatString);
        setTimeout(() => generateResponse(userMessage, newChatString, setIsLoading, setMessages, setChatArray, setChatString, chatArray, audioEnabled, kannadaOption, setTtsAudioUrl), 600);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey && window.innerWidth > 800) {
            event.preventDefault();
            handleChat(chatInput);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleChat(chatInput);
    };

    const toggleAudioPlayback = () => {
        if (audioRef.current) {
            if (isPlaying) { audioRef.current.pause(); } 
            else { audioRef.current.play().catch(error => console.error("Playback failed:", error)); }
        }
    };

    return (
        <div className="w-full">
            {ttsAudioUrl && <audio ref={audioRef} src={ttsAudioUrl} className="hidden" />}
            <ExpandableChat size="lg" position="bottom-right">
                
                {/* --- Professional Header --- */}
                <ExpandableChatHeader className="relative flex flex-col justify-center !pb-2 border-b">
                    <div className="flex items-center justify-between w-full">
                        {/* Left Controls */}
                        <div className="flex items-center justify-start space-x-1">
                            <Switch id="audio-switch" checked={audioEnabled} onCheckedChange={setAudioEnabled} />
                            {audioEnabled ? <Volume2 className="h-5 w-5 text-foreground" /> : <VolumeX className="h-5 w-5 text-muted-foreground" />}
                             {audioEnabled && ttsAudioUrl && (
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleAudioPlayback} title={isPlaying ? "Pause" : "Play"}>
                                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                                </Button>
                            )}
                        </div>
                        
                        {/* Center Title and Status */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <h2 className="text-lg font-bold">{headerTitle}</h2>
                            {/* <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <p className="text-xs text-muted-foreground">Online</p>
                            </div> */}
                        </div>

                        {/* Right Spacer (close button is handled internally) */}
                        <div className="w-16"></div>
                    </div>
                </ExpandableChatHeader>

                <ExpandableChatBody className="bg-muted/10">
                    <ChatMessageList>
                        {messages.map((message) => {
                            const isUser = message.sender === "user";
                            return (
                                <div key={message.id} className={`flex items-end gap-2 my-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={isUser ? "" : "/bot-avatar.png"} />
                                        <AvatarFallback className={isUser ? 'bg-primary/20' : 'bg-secondary'}>
                                            {isUser ? <User size={18} /> : <Bot size={18}/>}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Bubble and Timestamp */}
                                    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                                        <ChatBubble variant={isUser ? "sent" : "received"}>
                                            <ChatBubbleMessage variant={isUser ? "sent" : "received"}>
                                                <span>{message.content}</span>
                                            </ChatBubbleMessage>
                                        </ChatBubble>
                                        <div className="text-xs text-muted-foreground px-2 mt-1">
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {isLoading && (
                            <div className="flex items-end gap-2 my-4 flex-row">
                                <Avatar className="h-8 w-8"><AvatarFallback className="bg-secondary"><Bot size={18}/></AvatarFallback></Avatar>
                                <ChatBubble variant="received"><ChatBubbleMessage isLoading /></ChatBubble>
                            </div>
                        )}
                    </ChatMessageList>
                </ExpandableChatBody>
                
                {/* --- Polished Footer and Voice Input --- */}
                {showRecorder ? (
                    <div className="border-t bg-background py-3 px-4 flex items-center">
                        <AIVoiceInput onStart={handleStart} onStop={handleStop} />
                        <Button variant="ghost" size="icon" onClick={() => setShowRecorder(false)} className="ml-2" title="Cancel">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                ) : (
                    <ExpandableChatFooter className="border-t bg-background">
                        <form onSubmit={handleSubmit} className="relative w-full">
                            <ChatInput
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                className="pr-28" // Make space for buttons
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                                <Button type="button" variant="ghost" size="icon" onClick={() => setShowRecorder(true)} title="Use Voice">
                                    <Mic className="size-5 hover:text-primary transition-colors" />
                                </Button>
                                <Button type="submit" size="sm" className="ml-1">
                                    <Send className="size-4" />
                                </Button>
                            </div>
                        </form>
                    </ExpandableChatFooter>
                )}
            </ExpandableChat>
        </div>
    )
}

export default EDCSChatBot;
