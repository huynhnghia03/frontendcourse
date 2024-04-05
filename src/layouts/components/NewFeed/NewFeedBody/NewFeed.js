import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import parse from "html-react-parser";
//eslint-disable-next-line
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
//eslint-disable-next-line
import vi from 'timeago.js/lib/lang/vi';
import Configroutes from '../../../../config/routes'
import styles from '../NewFeed.module.scss'
// import { robot } from '../../../../assets/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { getAllNewFeed } from "../../../../API/adminRequest"
import { useState } from "react"

const cx = classNames.bind(styles)
timeago.register('vi', vi)

function NewFeed() {
    const [newFeeds, setNewFeeds] = useState()
    const getDataNewFeeds = async () => {
        try {
            const { data } = await getAllNewFeed()
            if (data) {
                setNewFeeds([...data.data])
            }

        }
        catch {
            toast.error("Lỗi server", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }


    useEffect(() => {
        getDataNewFeeds()
        // eslint-disable-next-line
    }, [])


    return (<><div className={cx('new-feeds-list')}>
        {newFeeds?.map((val) =>
            <div className={cx('new-feed-item')}>
                <h2 className={cx('new-feed-title')}>
                    <span style={{ color: "#f05123", marginRight: '6px' }}>#</span>
                    {val.title}</h2>
                <p className={cx('new-feed-time')}>
                    {/* {format(val.createdAt, 'vi', register('vi', vi))} */}
                    <TimeAgo
                        datetime={val.createdAt}
                        locale='vi'
                    /></p>
                <div className={cx('new-feed-wrapper', 'new-feed-content')}>
                    {parse(val.content)}
                </div>
                <p className={cx('author')}>
                    Đăng bởi
                    <Link className={cx('name')} to={Configroutes.profile}>
                        {val.user.Username}
                        <FontAwesomeIcon className={cx('icon')} icon={faCheck} />
                    </Link>
                </p>
            </div>
        )}

    </div>
        <ToastContainer /></>
    )
}

export default NewFeed