import React, { useEffect, useState } from "react";
import { useRef } from "react";
import classNames from "classnames/bind";
// eslint-disable-next-line
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi'
import InputEmoji from 'react-input-emoji'
import styles from './chatBoxBody.module.scss'
timeago.register('vi', vi);
const cx = classNames.bind(styles)
const ChatBoxBody = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
    // const [userData, setUserData] = useState(null);
    // const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    //   // fetching data for header
    //   useEffect(() => {
    //     const userId = chat?.members?.find((id) => id !== currentUser);
    //     const getUserData = async () => {
    //       try {
    //         const { data } = await getUser(userId);
    //         setUserData(data);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     };

    //     if (chat !== null) getUserData();
    //   }, [chat, currentUser]);

    //   // fetch messages
    //   useEffect(() => {
    //     const fetchMessages = async () => {
    //       try {
    //         const { data } = await getMessages(chat._id);
    //         setMessages(data);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     };

    //     if (chat !== null) fetchMessages();
    //   }, [chat]);


    // Always scroll to last Message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [])



    //   // Send Message
    //   const handleSend = async(e)=> {
    //     e.preventDefault()
    //     const message = {
    //       senderId : currentUser,
    //       text: newMessage,
    //       chatId: chat._id,
    //   }
    //   const receiverId = chat.members.find((id)=>id!==currentUser);
    //   // send message to socket server
    //   setSendMessage({...message, receiverId})
    //   // send message to database
    //   try {
    //     const { data } = await addMessage(message);
    //     setMessages([...messages, data]);
    //     setNewMessage("");
    //   }
    //   catch
    //   {
    //     console.log("error")
    //   }
    // }

    // // Receive Message from parent component
    // useEffect(()=> {
    //   console.log("Message Arrived: ", receivedMessage)
    //   if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    //     setMessages([...messages, receivedMessage]);
    //   }

    // },[receivedMessage])



    const scroll = useRef();
    const imageRef = useRef();
    return (
        <>
            <div className={cx("ChatBox-container")}>
                {chat ? (
                    <>
                        {/* chat-header */}
                        <div className={cx("chat-header")}>
                            <div className={cx("follower")}>
                                <div className={cx('info')}>
                                    <img
                                        src={
                                            'https://bootdey.com/img/Content/avatar/avatar7.png'
                                        }
                                        alt="Profile"
                                        className={cx("followerImage")}

                                    />
                                    <div className={cx("name")} >
                                        <span>
                                            nghia
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr
                                style={{
                                    width: "95%",
                                    border: "0.1px solid #ececec",
                                    marginTop: "20px",
                                }}
                            />
                        </div>
                        {/* chat-body */}
                        <div className={cx("chat-body")} >
                            {[{
                                senderId: "646f642863a8c57fded3d2bc",
                                text: "hello ban",
                                createdAt: "2023-05-25T13:35:36.358Z"
                            },
                            {
                                senderId: "646f642863a8c57fded3d2b4",
                                text: "hello ban",
                                createdAt: "2023-05-25T13:35:36.358Z"
                            }].map((message) => (
                                <>
                                    <div ref={scroll}
                                        className={cx("message",
                                            message.senderId === currentUser
                                                ? "own"
                                                : ""
                                        )}
                                    >
                                        <span>{message.text}</span>
                                        <span>
                                            <TimeAgo
                                                datetime={message.createdAt}
                                                locale='vi'
                                            />
                                        </span>
                                    </div>
                                </>
                            ))}
                        </div>
                        {/* chat-sender */}
                        <div className={cx("chat-sender")}>
                            <div onClick={() => imageRef.current.click()}>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div className={cx("send-button", "button")} >Send</div>
                            <input
                                type="file"
                                name=""
                                id=""
                                style={{ display: "none" }}
                                ref={imageRef}
                            />
                        </div>
                    </>
                ) : (
                    <span className={cx("chatbox-empty-message")}>
                        Tap on a chat to start conversation...
                    </span>
                )}
            </div>
        </>
    );
};

export default ChatBoxBody;