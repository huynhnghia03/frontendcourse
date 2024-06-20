import classNames from "classnames/bind";
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless'
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
} from "react-share";
import { faEllipsis, faEnvelope, faFlag, faLink, faBookmark as BM, faHeart as heart } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { faBookmark, faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from 'react';
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from './disscussDetail.module.scss'
import NewFeedButton from '../../layouts/components/NewFeed/NFButton';
// import ChatBox from '../../layouts/components/ChatBox';
import { createReactBlog, getDetailBlog } from "../../API/blogRequest";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
//eslint-disable-next-line
import vi from 'timeago.js/lib/lang/vi';
import parse from "html-react-parser";
import { createLoveBlog } from "../../API/loveBlogRequest";
import { useContext } from "react";
import { StoreContext } from "../../store";
import CommentBlog from "../../layouts/components/proper/CommentBlog";

const cx = classNames.bind(styles)
timeago.register('vi', vi)
function DisscussDetail() {
    const navigate = useNavigate()
    const context = useContext(StoreContext)
    const [showOption, setShowOption] = useState(false)
    const [detailBlog, setDetailBlog] = useState([])
    const { slug } = useParams()

    useEffect(() => {
        navigate({
            pathname: '/disscus/' + slug + ''
        })
        const getDataBlogDetail = async (slug) => {
            try {
                const { data } = await getDetailBlog(slug)
                if (data.success === 1) {
                    setDetailBlog(data.data)
                } else {
                    toast.error(data.message, {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                }

            } catch {
                toast.error("Lỗi server", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }
        }
        getDataBlogDetail(slug)

        // eslint-disable-next-line
    }, [slug])
    const hanldeBookMark = async (id) => {
        try {
            const { data } = await createLoveBlog(id)
            if (data.createSuccess === 1) {
                const newBlog = {
                    ...detailBlog,
                    is_bookmark: true
                }
                setDetailBlog(newBlog)
                toast("Đã lưu bài viết", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                // getBlogs(type)
            }
            if (data.deleteSuccess === 1) {
                const newBlog = {
                    ...detailBlog,
                    is_bookmark: false
                }
                setDetailBlog(newBlog)
                toast("Đã xóa lưu bài viết", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                // getBlogs(type)
            }
        } catch {
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
    const hanldeReaction = async (id) => {
        try {
            const { data } = await createReactBlog(id)
            if (data.success === 1) {
                setDetailBlog(data.data)
            }

        } catch {
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

    return (<>
        <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1920px' }}>


            <div className={cx('profile-container')}>
                <section className={cx('module-row')}>
                    <section className={cx('col', 'col-c-12', 'col-m-12', 'col-l-4')}>

                        <div className={cx('aside')}>
                            <Link to=''>
                                <h6 className={cx('box-title')}>{detailBlog.user?.Username}</h6>
                            </Link>
                            <p className={cx('usertitle')}></p>
                            <hr />
                            <div className={cx('react-Wrapper')}>
                                {localStorage.getItem('token') ?
                                    detailBlog?.is_reacted ?
                                        <div className={cx('react-btn')} onClick={() => hanldeReaction(detailBlog._id)}>
                                            <FontAwesomeIcon icon={heart} style={{ color: "red" }} />
                                            <span>{detailBlog.reactions_count}</span>
                                        </div>
                                        :
                                        <div className={cx('react-btn')} onClick={() => hanldeReaction(detailBlog._id)}>
                                            <FontAwesomeIcon icon={faHeart} />
                                            <span>{detailBlog.reactions_count}</span>
                                        </div>
                                    :

                                    <div className={cx('react-btn')} onClick={() => navigate({
                                        pathname: "/Login"
                                    })}>
                                        <FontAwesomeIcon icon={faHeart} />
                                        <span>{detailBlog.reactions_count}</span>
                                    </div>
                                }
                                {localStorage.getItem('token') ?
                                    <div className={cx('react-btn')} onClick={context.handleCommentBlog}>
                                        <FontAwesomeIcon icon={faComment} />
                                        <span>{detailBlog.comments_count}</span>
                                    </div> :
                                    <div className={cx('react-btn')} onClick={() => navigate({
                                        pathname: "/Login"
                                    })}>
                                        <FontAwesomeIcon icon={faComment} />
                                        <span>{detailBlog.comments_count}</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                    <section className={cx('col', 'col-c-12', 'col-m-12', 'col-l-8')}>
                        <div>
                            <h1 className={cx('heading')}>{detailBlog?.Title} </h1>
                            <div className={cx('box-title')}>
                                <div className={cx('user')}>
                                    <Link to={'/@/' + detailBlog.user?.nickname + ''}> {detailBlog.user?.provider ? <img className={cx('discuss-image')} src={detailBlog.user?.avatar} alt={detailBlog.user?.Username} /> :
                                        detailBlog.user?.avatar ? (<img className={cx('discuss-image')} src={process.env.REACT_APP_BACKEND_URL + '/user/' + detailBlog.user?.nickname + '/' + detailBlog.user?.avatar} alt={detailBlog.user?.Username} />) : (
                                            <img className={cx('discuss-image')} src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={detailBlog.user?.Username} />

                                        )}
                                    </Link>

                                    <div className={cx('info-user')}>
                                        <Link to={''}><span className={cx('discuss-name')}>{detailBlog?.user?.Username}</span></Link>
                                        <span className={cx('time')}>
                                            <TimeAgo
                                                datetime={detailBlog?.createdAt}
                                                locale='vi'
                                            /></span>
                                    </div>
                                </div>
                                <div className={cx('action')}>
                                    {localStorage.getItem('token') ?
                                        detailBlog?.is_bookmark ?
                                            <div className={cx('toglebtn', 'optionbtn')} onClick={() => hanldeBookMark(detailBlog._id)}>
                                                <FontAwesomeIcon icon={BM} style={{ color: "#f47425" }} />
                                            </div> :
                                            <div className={cx('toglebtn', 'optionbtn')} onClick={() => hanldeBookMark(detailBlog._id)}>
                                                <FontAwesomeIcon icon={faBookmark} />
                                            </div>
                                        :
                                        <div className={cx('toglebtn', 'optionbtn')} onClick={() => navigate({
                                            pathname: "/Login"
                                        })}>
                                            <FontAwesomeIcon icon={faBookmark} />
                                        </div>
                                    }

                                    <Tippy
                                        interactive
                                        visible={showOption} onClickOutside={() => setShowOption(false)}
                                        placement='bottom-end'
                                        render={attrs => (
                                            <div tabIndex="-1" {...attrs}>
                                                <ul className={cx('tipy-option')}>
                                                    <li>
                                                        <FacebookShareButton url={process.env.REACT_APP_FRONTEND_URL + "/disscus/" + slug + ""}>

                                                            <FontAwesomeIcon icon={faFacebook} />
                                                            <span>Chia sẽ lên Facebook</span>
                                                        </FacebookShareButton>
                                                    </li>
                                                    <li>
                                                        <TwitterShareButton url={process.env.REACT_APP_FRONTEND_URL + "/disscus/" + slug + ""}>
                                                            <FontAwesomeIcon icon={faTwitter} />
                                                            <span>Chia sẽ lên Twitter</span>
                                                        </TwitterShareButton>
                                                    </li>
                                                    <li>
                                                        <EmailShareButton url={process.env.REACT_APP_FRONTEND_URL + "/disscus/" + slug + ""}>
                                                            <FontAwesomeIcon icon={faEnvelope} />
                                                            <span>Chia sẽ tới Email</span>
                                                        </EmailShareButton>
                                                    </li>
                                                    <li onClick={async () => {
                                                        await navigator.clipboard.writeText(process.env.REACT_APP_FRONTEND_URL + "/disscus/" + slug + "")
                                                        toast("Sao chép liên kết thành công", {
                                                            position: "top-center",
                                                            autoClose: 2000,
                                                            hideProgressBar: true,
                                                            closeOnClick: false,
                                                            pauseOnHover: false,
                                                            draggable: false,
                                                            progress: undefined,
                                                            theme: "dark",
                                                        });


                                                    }}>
                                                        <FontAwesomeIcon icon={faLink} />
                                                        <span>Sao chép liên kết</span>
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faFlag} />
                                                        <span>Báo cáo bài viết</span>
                                                    </li>
                                                </ul>

                                            </div>
                                        )}>
                                        <div className={cx('optionbtn')} onClick={() => setShowOption(true)}>
                                            <FontAwesomeIcon icon={faEllipsis} />
                                        </div>
                                    </Tippy>

                                </div>

                            </div>
                            <div className={cx('content-inner')}>

                                {parse('' + detailBlog.content + '')}

                            </div>
                            <div className={cx('Body-bottom')}>
                                <div className={cx('react-Wrapper')}>
                                    {localStorage.getItem('token') ?
                                        detailBlog?.is_reacted ?
                                            <div className={cx('react-btn')} onClick={() => hanldeReaction(detailBlog._id)}>
                                                <FontAwesomeIcon icon={heart} style={{ color: "red" }} />
                                                <span>{detailBlog.reactions_count}</span>
                                            </div>
                                            :
                                            <div className={cx('react-btn')} onClick={() => hanldeReaction(detailBlog._id)}>
                                                <FontAwesomeIcon icon={faHeart} />
                                                <span>{detailBlog.reactions_count}</span>
                                            </div>
                                        :

                                        <div className={cx('react-btn')} onClick={() => navigate({
                                            pathname: "/Login"
                                        })}>
                                            <FontAwesomeIcon icon={faHeart} />
                                            <span>{detailBlog.reactions_count}</span>
                                        </div>
                                    }

                                    {localStorage.getItem('token') ?
                                        <div className={cx('react-btn')} onClick={context.handleCommentBlog}>
                                            <FontAwesomeIcon icon={faComment} />
                                            <span>{detailBlog.comments_count}</span>
                                        </div> :
                                        <div className={cx('react-btn')} onClick={() => navigate({
                                            pathname: "/Login"
                                        })}>
                                            <FontAwesomeIcon icon={faComment} />
                                            <span>{detailBlog.comments_count}</span>
                                        </div>
                                    }
                                </div>
                                <div className={cx('same-Author')}>
                                    <h3 className={cx("heading-author")}>Bài đăng cùng tác giả</h3>
                                    <p className={cx("content-author")}>Tác giả chưa có bài đăng nào khác.

                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                </section>
            </div>
        </section>
        <NewFeedButton />
        {/* <ChatBox /> */}
        <ToastContainer />
        <CommentBlog detailData={detailBlog} />
    </>
    )

}
export default DisscussDetail