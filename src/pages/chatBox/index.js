import { Link } from 'react-router-dom';
import classNames from "classnames/bind";
import { UilSearch, UilSetting, UilHome, UilBell } from '@iconscout/react-unicons'
// import {  useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './chatBox.module.scss'
import { logo } from '../../assets/image';
// import Conversation from '../../layouts/components/ChatBox/conversation';
// import { faComment, faHome } from '@fortawesome/free-solid-svg-icons';
// import ChatBoxBody from '../../layouts/components/ChatBox/ChatBoxbody';
// import { io } from "socket.io-client";

const cx = classNames.bind(styles)

const ChatBox = () => {
    //   const socket = useRef();
    // const user = JSON.parse(localStorage.getItem('currentUser'))
    // const [chats, setChats] = useState([]);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    // const [currentChat, setCurrentChat] = useState(null);
    // const [sendMessage, setSendMessage] = useState(null);
    // const [receivedMessage, setReceivedMessage] = useState(null);
    // Get the chat in chat section
    //   useEffect(() => {
    //     const getChats = async () => {
    //       try {
    //         const { data } = await userChats(user._id);
    //         setChats(data);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     };
    //     getChats();
    //   }, [user._id]);

    //   // Connect to Socket.io
    //   useEffect(() => {
    //     socket.current = io("ws://localhost:8800");
    //     socket.current.emit("new-user-add", user._id);
    //     socket.current.on("get-users", (users) => {
    //       setOnlineUsers(users);
    //     });
    //   }, [user]);

    //   // Send Message to socket server
    //   useEffect(() => {
    //     if (sendMessage!==null) {
    //       socket.current.emit("send-message", sendMessage);}
    //   }, [sendMessage]);


    //   // Get the message from socket server
    //   useEffect(() => {
    //     socket.current.on("recieve-message", (data) => {
    //       console.log(data)
    //       setReceivedMessage(data);
    //     }

    //     );
    //   }, []);


    // const checkOnlineStatus = (chat) => {
    //     const chatMember = chat.members.find((member) => member !== user._id);
    //     const online = onlineUsers.find((user) => user.userId === chatMember);
    //     return online ? true : false;
    // };

    return (
        <div className={cx("Chat")}>
            {/* Left Side */}
            <div className={cx("Left-side-chat")}>
                <div className={cx("LogoSearch")}>
                    <Link to={'/'}>
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className={cx("Search")}>
                        <input type="text" placeholder="#Explore" />
                        <div className={cx("s-icon")}>
                            <UilSearch />
                        </div>
                    </div>
                </div>
                <div className={cx("Chat-container")}>
                    <h2>Chats</h2>
                    <div className={cx("Chat-list")}>
                        {/* <Conversation
                            data={true}
                            currentUser={user._id}
                            online={true}
                        /> */}
                        {/* {chats?.map((chat) => (
                            <div
                                onClick={() => {
                                    setCurrentChat(chat);
                                }}
                            >

                            </div>
                        ))} */}
                    </div>
                </div>
            </div>

            {/* Right Side */}

            <div className={cx("Right-side-chat")}>
                <div style={{ width: "30rem", alignSelf: "flex-end", marginRight: '20px' }}>
                    <div className={cx("navIcons")}>

                        <Link to={'/'}>
                            <UilHome width={30} height={30} />
                        </Link>
                        <UilSetting width={30} height={30} />

                        <UilBell width={30} height={30} />

                    </div>
                </div>
                {/* <ChatBoxBody
                    chat={true}
                    currentUser={user._id}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                /> */}
            </div>
        </div>
    );
};

export default ChatBox;