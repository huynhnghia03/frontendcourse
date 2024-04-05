// import React from "react";
// import { useEffect } from "react";
import classNames from "classnames/bind";
import styles from './conversation.module.scss'

const cx = classNames.bind(styles)

const Conversation = ({ data, currentUser, online }) => {

    // const [userData, setUserData] = useState(null)

    //   useEffect(()=> {

    //     const userId = data.members.find((id)=>id!==currentUser)
    //     const getUserData = async ()=> {
    //       try
    //       {
    //           const {data} =await getUser(userId)
    //          setUserData(data)
    //          dispatch({type:"SAVE_USER", data:data})
    //       }
    //       catch(error)
    //       {
    //         console.log(error)
    //       }
    //     }

    //     getUserData();
    //   }, [])
    return (
        <>
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            <div className={cx("conversation")}>
                <div className={cx('content-inner')}>
                    {online && <div className={cx("online-dot")}></div>}
                    <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        alt="Profile"
                        className={cx("followerImage")}
                        style={{ width: "50px", height: "50px", borderRadius: '999px' }}
                    />
                    <div className={cx("name")} >
                        <span>nghia</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>

            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />

        </>
    );
};

export default Conversation;