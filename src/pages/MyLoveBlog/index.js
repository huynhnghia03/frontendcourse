import classNames from "classnames/bind";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless'
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
//eslint-disable-next-line
import vi from 'timeago.js/lib/lang/vi';
import { faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './MyLoveBlog.module.scss'
import { MyBlog } from "../../assets/image";
import ConfigRoutes from '../../config/routes'
import { createLoveBlog, getLoveBlogs } from "../../API/loveBlogRequest";


const cx = classNames.bind(styles)
//eslint-disable-next-line
timeago.register('vi', vi)
function MyLoveBlogs() {
    const [clickID, setClickID] = useState('')
    const [blogs, setBlogs] = useState([])
    const [showOption, setShowOption] = useState(false)


    const getALlLoveBlogs = async () => {
        try {
            const { data } = await getLoveBlogs()
            if (data.success === 1) {
                setBlogs([...data.data])
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
    useEffect(() => {
        getALlLoveBlogs()
    }, [])

    const hanldeDeleteBookMark = async (id) => {
        try {
            const { data } = await createLoveBlog(id)
            if (data.deleteSuccess === 1) {
                const newBlogs = blogs.filter((blog) => blog.blogID !== id)
                console.log(newBlogs)
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
                <h2 className={cx('discuss-heading')}>Bài viết của tôi</h2>

            </div>

            <div className={cx('profile-container')}>
                <section className={cx('module-row')}>

                    <section className={cx('col', 'col-c-12', 'col-m-12', 'col-l-8')}>
                        <div>
                            <ul className={cx('heading-tap')}>
                                <li className={cx('active')}>Bài Viết</li>
                            </ul>
                            <div className={cx('divider')}></div>
                        </div>
                        {blogs?.length > 0 ?
                            blogs?.map((blog) =>
                                <div key={blog._id} className={cx('box-wrapper')}>
                                    <div className={cx('box-title')}>
                                        <Link to={"/disscus/" + blog.listBlog?.slug + ""}>
                                            <h2 className={cx('info-title')}>{blog.listBlog?.Title}</h2></Link>
                                        {/* {type === 'published' ? <><Link to={"/disscus/" + blog.slug + ""}>
                                            <h3 className={cx('info-title')}>{blog.Title}</h3></Link>
                                        </> :
                                            <Link className={cx('time-edit')} to={"/post/" + blog._id + "/blog"}>
                                                <span>Chỉnh sửa {format(blog.updatedAt, 'vi')}</span>
                                            </Link>} */}

                                        <div className={cx('action')}>
                                            <Tippy
                                                interactive
                                                visible={showOption && clickID === blog._id} onClickOutside={() => setShowOption(false)}
                                                placement='bottom-end'
                                                render={attrs => (
                                                    <div tabIndex="-1" {...attrs}>
                                                        <ul className={cx('tipy-option')}>

                                                            <li onClick={() => hanldeDeleteBookMark(blog.blogID)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                                <span>Xóa khỏi mục lưu</span>
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
                                    <div className={cx('author')}>
                                        <Link to={"/disscus/" + blog.listBlog?.slug + ""} style={{ marginRight: "35px", color: " #029e74" }}>Đã lưu <TimeAgo
                                            datetime={blog.createdAt}
                                            locale='vi'
                                        /></Link>
                                        <span>Tác giả <strong>{blog.listBlog?.user?.Username}</strong></span>
                                    </div>

                                </div>
                            ) : <div className={cx('noResult')}>
                                <p>Chưa có bài viết nào được lưu</p>
                                <p>
                                    Bạn có thể nhấn vào đây để <Link to={ConfigRoutes.Discuss}>xem các bài viết nổi bật.</Link>
                                </p>
                            </div>}


                    </section>

                    <section className={cx('col', 'col-c-12', 'col-m-12', 'col-l-4')}>
                        <div className={cx('content-left')}>


                            <img className={cx('myblog')} src={MyBlog} alt="myblog" />

                        </div>
                    </section>
                </section>
            </div>
        </section>
        <ToastContainer />
    </>
    )

}
export default MyLoveBlogs