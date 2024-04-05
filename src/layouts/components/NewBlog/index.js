import classNames from "classnames/bind"
import styles from './NewBlog.module.scss'
import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom"
// import Configroutes from '../../../../config/routes'

// import { robot } from '../../../assets/image'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCheck } from "@fortawesome/free-solid-svg-icons"

import { StoreContext } from '../../../store'
// import DraftEditor from "../Editor/BraftEditor";
import { isEmpty } from 'validator'
import Loading from "../Loading";
import DraftEditor from "../Editor/Blogs";
const cx = classNames.bind(styles)

function NewBlog() {
    const context = useContext(StoreContext)
    const [title, setTitle] = useState('')
    const [tag, setTag] = useState('')
    const [validateMsg, setValidateMsg] = useState({})
    const [check, setCheck] = useState(false)

    useEffect(() => {
        const ValidatAll = () => {
            const msg = {}
            if (isEmpty(title)) {
                msg.title = 'Vui lòng nhập email'
            }
            if (isEmpty(context.getBlog)) {
                msg.content = 'Vui lòng nhập mật khẩu'
            }
            setValidateMsg({ ...validateMsg, ...msg })
            if (Object.keys(msg).length > 0) { return false }
            return true
        }
        setCheck(ValidatAll())
        // eslint-disable-next-line
    }, [title, context.getBlog])

    const handleSentBlog = (e) => {
        setTimeout(() => {
            context.setLoading(false)
        }, 3000)
        context.setLoading(true)
        setTitle('')
        context.setGetBlog('')
        setTag('')
    }

    return (context.newBlog && <div>
        <div className={cx('modal', 'fade-in', 'medium')}>
            <div onClick={() => {
                context.setNewBlog(false)
            }} className={cx('close')}>&times;</div>
            <div className={cx('content')}>
                <header className={cx('header')}>
                    <h2 className={cx('heading')}>Tạo Bài Viết Mới</h2>
                </header>
                <div className={cx('new-feeds-list')}>
                    <div className={cx('new-feed-item')}>
                        <h4 className={cx('new-feed-title')}>Tiêu đề</h4>
                        <input type="text" placeholder="Nhập tiêu đề bài viết của bạn" className={cx('input-blog')} value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className={cx('new-feed-wrapper', 'new-feed-content')}>
                            <p className={cx('new-feed-title')}>Nội dung</p>
                            {/* <DraftEditor mesage="" /> */}
                            <DraftEditor />

                        </div>
                        <h4 className={cx('new-feed-title', 'fix-margin')}>Thẻ</h4>
                        <input type="text" placeholder="Tag" className={cx('input-blog')}
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                        <div className={cx('bnt-actions')}>
                            <button type="button" onClick={() => {
                                context.setNewBlog(false)
                            }} className={cx('btn-cancel')}>Hủy Bỏ</button>
                            {check ? (<button onClick={handleSentBlog} className={cx('btn-post')}>Đăng Bài</button>) : (<button disabled className={cx('btn-post', 'disable')}>Đăng Bài</button>)}
                            {/* <button onClick={handleSentBlog} disabled className={cx('btn-post')}>Đăng Bài</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={cx('overlay', 'fade-in', 'close-when-click')} onClick={() => {
            context.setNewBlog(false)
        }}></div>
        <Loading />
    </div>)
}

export default NewBlog