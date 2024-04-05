import classNames from "classnames/bind";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless'
// eslint-disable-next-line
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
//eslint-disable-next-line
import vi from 'timeago.js/lib/lang/vi';
import { faEdit, faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './MyBlogs.module.scss'
import { deleteBlog, getOwnBlogs } from "../../API/blogRequest";
import { MyBlog } from "../../assets/image";


const cx = classNames.bind(styles)
//eslint-disable-next-line
timeago.register('vi', vi)
function MyBlogs() {
    const [clickID, setClickID] = useState('')
    const [blogs, setBlogs] = useState([])
    const [showOption, setShowOption] = useState(false)
    const navigate = useNavigate()
    const { type } = useParams()

    const getBlogs = async (draft) => {
        try {
            const { data } = await getOwnBlogs()
            if (data.success === 1) {
                setBlogs(data[draft])
            } else {
                toast.error(data.message, {
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

        if (type === 'draft') {
            getBlogs('draft')
        } else {
            getBlogs('published')
        }
        // eslint-disable-next-line
    }, [type])

    const hanldeDeleteBlog = async (id) => {
        try {
            const { data } = await deleteBlog(id)
            if (data.success === 1) {
                toast.success("Xóa thành công", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                getBlogs(type)
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
                                <li onClick={() => navigate({
                                    pathname: '/me/posts/draft'
                                })} className={cx(type === 'draft' ? 'active' : '')}>Bản nháp</li>
                                <li onClick={() => navigate({
                                    pathname: '/me/posts/published'
                                })} className={cx(type === 'published' ? 'active' : '')}>Đã xuất bản</li>
                            </ul>
                            <div className={cx('divider')}></div>
                        </div>
                        {blogs.length > 0 ?
                            blogs?.map((blog) =>
                                <div key={blog._id} className={cx('box-wrapper')}>
                                    <div className={cx('box-title')}>
                                        {type === 'published' ? <><Link to={"/disscus/" + blog.slug + ""}>
                                            <h3 className={cx('info-title')}>{blog.Title}</h3></Link>
                                        </> :
                                            <Link className={cx('time-edit')} to={"/post/" + blog._id + "/blog"}>
                                                <span>
                                                    <TimeAgo
                                                        datetime={blog.updatedAt}
                                                        locale='vi'
                                                    /></span>
                                            </Link>}

                                        <div className={cx('action')}>
                                            <Tippy
                                                interactive
                                                visible={showOption && clickID === blog._id} onClickOutside={() => setShowOption(false)}
                                                placement='bottom-end'
                                                render={attrs => (
                                                    <div tabIndex="-1" {...attrs}>
                                                        <ul className={cx('tipy-option')}>
                                                            <li onClick={() => navigate({
                                                                pathname: "/post/" + blog._id + "/blog"
                                                            })}>
                                                                <FontAwesomeIcon icon={faEdit} />
                                                                <span>Chỉnh sửa</span>
                                                            </li>
                                                            <li onClick={() => hanldeDeleteBlog(blog._id)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                                <span>Xóa</span>
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
                                    {type === 'published' ? <span>Xuất bản <TimeAgo
                                        datetime={blog.createdAt}
                                        locale='vi'
                                    /></span> : ""
                                    }

                                </div>
                            ) : <div className={cx('noResult')}>
                                <p>Chưa có {type === 'published' ? "xuất bản" : "bản nháp"} nào</p>
                                <p>
                                    Bạn có thể <Link>viết bài mới </Link> hoặc <Link>đọc bài viết </Link> khác trên LE nhé.
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
export default MyBlogs