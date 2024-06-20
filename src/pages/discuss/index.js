import classNames from "classnames/bind";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless'
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
} from "react-share";
//eslint-disable-next-line
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
//eslint-disable-next-line
import vi from 'timeago.js/lib/lang/vi';
import Randomstring from "randomstring";
import { faEllipsis, faEnvelope, faFlag, faLink, faAngleDoubleLeft, faAngleDoubleRight, faBookmark as BM } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './Disscuss.module.scss'
import NewFeedButton from '../../layouts/components/NewFeed/NFButton';
// import ChatBox from '../../layouts/components/ChatBox';
import { getAllBlogs } from "../../API/blogRequest";
import { createLoveBlog } from "../../API/loveBlogRequest";


const cx = classNames.bind(styles)
//eslint-disable-next-line
timeago.register('vi', vi)
function Disscuss() {
    const [windowSize, setWindowSize] = useState('')
    const [clickID, setClickID] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [blogs, setBlogs] = useState([])
    const [links, setLinks] = useState([])
    const [showOption, setShowOption] = useState(false)
    const navigate = useNavigate()
    const [searchPar] = useSearchParams()

    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize({
                width: window.innerWidth,
            });
        };

        // Add an event listener for the 'resize' event
        window.addEventListener('resize', updateWindowSize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateWindowSize);
        };


    }, [])

    useEffect(() => {
        navigate({
            pathname: '/disscus',
            search: '?id=' + currentPage + ''
        })
        const getBlogs = async (currentPage) => {
            const { data } = await getAllBlogs(currentPage)
            if (data) {
                setBlogs(data.data)
                setTotalPage(data.totalPage)
                setLinks(data.links)
            }
        }
        getBlogs(currentPage)


        // eslint-disable-next-line
    }, [currentPage])
    const hanldeBookMark = async (id) => {
        try {
            const { data } = await createLoveBlog(id)
            if (data.createSuccess === 1) {
                const newBlogs = blogs.map((blog) => {
                    if (blog._id === id) {
                        blog.is_bookmark = true
                    }
                    return blog
                })
                setBlogs(newBlogs)
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
                const newBlogs = blogs.map((blog) => {
                    if (blog._id === id) {
                        blog.is_bookmark = false
                    }
                    return blog
                })
                setBlogs(newBlogs)
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

    return (<>
        <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1920px' }}>
            <div className={cx('discuss-contain')}>
                <h2 className={cx('discuss-heading')}>Bài viết nổi bật</h2>

                <p className={cx('discuss-text')}>Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.</p>

            </div>

            <div className={cx('profile-container')}>
                <section className={cx('module-row')}>

                    <section className={cx('col', 'col-c-12', 'col-m-12', 'col-l-8')}>
                        {blogs?.length > 0 ? <>
                            {
                                blogs?.map((blog) =>
                                    <div key={blog._id} className={cx('box-wrapper')}>
                                        <div className={cx('box-title')}>
                                            <div>
                                                {blog.user.provider ? <img className={cx('discuss-image')} src={blog.user.avatar} alt={blog.user.Username} /> :
                                                    blog.user.avatar ? (<img className={cx('discuss-image')} src={process.env.REACT_APP_BACKEND_URL + '/user/' + blog.user.nickname + '/' + blog.user.avatar} alt={blog.user.Username} />) : (
                                                        <img className={cx('discuss-image')} src='https://files.fullstack.edu.vn/f8-prod/user_photos/323800/6464902b20c91.jpg' alt={blog.user.nickname} />

                                                    )}

                                                <span className={cx('discuss-name')}>{blog.user.Username}</span>
                                            </div>
                                            <div className={cx('action')}>
                                                {localStorage.getItem('token') ?
                                                    blog.is_bookmark ?
                                                        <div className={cx('toglebtn', 'optionbtn')} onClick={() => hanldeBookMark(blog._id)}>
                                                            <FontAwesomeIcon icon={BM} style={{ color: "#f47425" }} />
                                                        </div> :
                                                        <div className={cx('toglebtn', 'optionbtn')} onClick={() => hanldeBookMark(blog._id)}>
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
                                                    visible={showOption && clickID === blog._id} onClickOutside={() => setShowOption(false)}
                                                    placement='bottom-end'
                                                    render={attrs => (
                                                        <div tabIndex="-1" {...attrs}>
                                                            <ul className={cx('tipy-option')}>
                                                                <li>
                                                                    <FacebookShareButton url={process.env.REACT_APP_FRONTEND_URL + "/disscus/" + blog.slug + ""}>

                                                                        <FontAwesomeIcon icon={faFacebook} />
                                                                        <span>Chia sẽ lên Facebook</span>
                                                                    </FacebookShareButton>
                                                                </li>
                                                                <li>
                                                                    <TwitterShareButton url={process.env.REACT_APP_FRONTEND_URL + "/disscus/" + blog.slug + ""}>
                                                                        <FontAwesomeIcon icon={faTwitter} />
                                                                        <span>Chia sẽ lên Twitter</span>
                                                                    </TwitterShareButton>
                                                                </li>
                                                                <li>
                                                                    <EmailShareButton url={process.env.REACT_APP_FRONTEND_URL + "/disscus/" + blog.slug + ""}>
                                                                        <FontAwesomeIcon icon={faEnvelope} />
                                                                        <span>Chia sẽ tới Email</span>
                                                                    </EmailShareButton>
                                                                </li>
                                                                <li onClick={async () => {
                                                                    await navigator.clipboard.writeText(process.env.REACT_APP_FRONTEND_URL + "/disscus/" + blog.slug + "")
                                                                    console.log('ok')
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
                                                    <div className={cx('optionbtn')} onClick={() => {
                                                        setShowOption(true)
                                                        setClickID(blog._id)
                                                    }}>
                                                        <FontAwesomeIcon icon={faEllipsis} />
                                                    </div>
                                                </Tippy>

                                            </div>
                                        </div>
                                        <div className={cx('profile-inner')}>
                                            <div className={cx('info')}>
                                                <Link to={"/disscus/" + blog.slug + ""}>
                                                    <h3 className={cx('info-title')}>{blog.Title}</h3></Link>
                                                <p className={cx('info-desc')}>{blog.meta_description}</p>
                                                <div className={cx('discuss-info')}>
                                                    {blog.Tag.length > 0 ?
                                                        blog.Tag.map((tag) => <span key={tag + Randomstring.generate(7)} className={cx('discuss-tags')}>{tag.name}</span>)
                                                        : ""
                                                    }
                                                    <span>
                                                        <TimeAgo
                                                            datetime={blog.createdAt}
                                                            locale='vi'
                                                        /></span>

                                                </div>
                                            </div>
                                            {blog.image ?
                                                <div className={cx('profile-thumb')}>
                                                    <Link><img src={process.env.REACT_APP_BACKEND_URL + '/' + blog.image} className={cx('thumb-img')} alt={blog.Title} /></Link>
                                                </div> : ""}
                                        </div>
                                    </div>)}
                            <div className={cx('pagination-wrapper')}>
                                <div className={cx('pagination-content')}>
                                    <button disabled={currentPage === 1 ? true : false} className={cx('pagination-page', currentPage === 1 ? 'disabled' : '')} onClick={() => setCurrentPage(currentPage - 1)}>
                                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                                    </button>
                                    {links?.map((num, index) => <div key={index} className={cx('pagination-page', windowSize.width <= 1020 && num > 5 ? 'hiddened' : '', parseInt(searchPar.get('id')) === num + 1 ? 'active' : '')} onClick={() => setCurrentPage(num + 1)}>
                                        {num + 1}
                                    </div>)}

                                    <button disabled={currentPage === totalPage ? true : false} className={cx('pagination-page', currentPage === totalPage ? 'disabled' : '')} onClick={() => setCurrentPage(currentPage + 1)}>
                                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                                    </button>
                                </div>
                            </div></>

                            : <div className={cx('box-wrapper')}>
                                <h6 className={cx('box-title')}>CHƯA CÓ BẤT KỲ BÀI VIẾT NÀO</h6>

                                {/* <ul className={cx('participation', 'listOfTech')}>
                                    <li>FrontEnd/BackEnd</li>
                                    <li>MobileApp/Devops</li>
                                    <li>UI/UX/Design</li>
                                    <li>Other</li>
                                </ul> */}

                            </div>}
                    </section>

                    <section className={cx('col', 'col-c-12', 'col-m-12', 'col-l-4')}>
                        <div className={cx('content-left')}>

                            <div className={cx('box-wrapper')}>
                                <h6 className={cx('box-title')}>CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT</h6>
                                {blogs?.length > 0 ?
                                    <ul className={cx('participation', 'listOfTech')}>
                                        <li>FrontEnd/BackEnd</li>
                                        <li>MobileApp/Devops</li>
                                        <li>UI/UX/Design</li>
                                        <li>Other</li>
                                    </ul>
                                    : <ul className={cx('participation', 'listOfTech')}>
                                        <li>Chưa có bất kỳ đề xuất nào</li>
                                    </ul>}
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </section>
        <NewFeedButton />
        {/* <ChatBox /> */}
        <ToastContainer />
    </>
    )

}
export default Disscuss