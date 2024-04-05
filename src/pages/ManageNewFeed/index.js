import { useContext, useEffect, useState } from 'react';
import classNames from "classnames/bind";
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenFancy, faXmark, faPlus, faRefresh, faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';
// import { format as fm } from 'date-fns';

import ConfigRoutes from '../../config/routes'
import { logo } from '../../assets/image'
import styles from './ManageNewFeed.module.scss'
import { StoreContext } from '../../store';
import { addNewFeed, deleteNewFeed, editNewFeed, getAllNewFeed, getDetailNewFeed } from '../../API/adminRequest';

import EditorNewFeed from '../../layouts/components/Editor/newFeed'
import { Avatar } from '../../layouts/components/proper';

const cx = classNames.bind(styles)

function ManageNewFeed() {
    const context = useContext(StoreContext)
    const [searchPar] = useSearchParams()
    const [newFeeds, setNewFeeds] = useState([])
    const [newFeedDetail, setNewFeedDetail] = useState({})
    const [active, setactive] = useState('')
    const [title, setTitle] = useState('')
    const [is_published, setIsPublished] = useState(true)
    const [content, setContent] = useState('')
    const [published_at, setPublishedAt] = useState('')

    const location = useLocation()
    const navigate = useNavigate();



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

    const handleSetValueNewFeed = (val) => {
        setContent(val)
    }

    const handleSubmitEdit = async () => {
        try {

            const datas = {
                'title': title,
                'content': content,
                'is_published': is_published,
            }
            const { data } = await editNewFeed(searchPar.get('id'), datas)

            if (data.success === 1) {
                toast.success("Sửa khóa học thành công", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                onHandleRefresh()
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

    const onHandleRefresh = () => {
        setTitle('')
        setPublishedAt('')
        setContent('')

        setIsPublished(true)
        navigate({
            pathname: '/admin/manage-newFeed'
        })
    }
    async function handleOnlickId(id) {
        try {
            const { data } = await getDetailNewFeed(id)
            if (data) {
                setNewFeedDetail({ ...data.data })
                setTitle(data.data.title)
                setIsPublished(data.data.is_published)
                setContent(data.data.content)
                setPublishedAt(data.data.published_at)
                setactive("stepitem-active")
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
    const handleAddNewFeed = async () => {
        try {

            const datas = {
                'title': title,
                'content': content,
                'is_published': is_published,
                'published_at': (new Date(), 'yyyy-MM-dd HH:mm:ss')
            }
            const { data } = await addNewFeed(datas)
            if (data.success === 1) {
                toast.success("Thêm khóa học thành công", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                getDataNewFeeds()
                onHandleRefresh()
            } else {
                toast.warn("Lỗi! Vui lòng điền đầy đủ thông tin", {
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
    const handleDeleteNewFeed = async () => {
        try {

            const { data } = await deleteNewFeed(searchPar.get('id'))
            if (data.success === 1) {
                toast.success("Xóa khóa học thành công", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                getDataNewFeeds()
                onHandleRefresh()
            } else {
                toast.warn("Xóa khóa học thất bại", {
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

    return <> <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1920px' }}>

        <div className={cx('header-wapper')}>
            <Link className={cx('header-logo')} to={ConfigRoutes.root}>
                <img alt='logo' src={logo} />
            </Link>
            <div className={cx('header-course-title')}>LE ADMIN</div>
            <div className={cx('header-actions')}>
                <Avatar>
                    <button onClick={context.handleAvater} className={cx('action-bnt')}>
                        <img alt='logo' className={cx('header-icon')} src={logo} />
                        <span className={cx('header-label')}>Huynh nghia</span>
                    </button>
                </Avatar>
            </div>
        </div>
        {context.list && <> <div className={cx('track-wrapper')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <h1 className={cx('heading')}>Các khóa học</h1>
                    <button className={cx('track-close-btn')}>
                        <FontAwesomeIcon onClick={context.handleList} icon={faXmark} />
                    </button>
                </header>
                <div className={cx('body')}>
                    {newFeeds.map((crs, index) => <div key={crs._id} className={cx('trackitem-step-list', 'trackitem-open')}>
                        <div className={cx('stepitem-wrapper', searchPar.get('id') === crs._id ? active : '')}>
                            <div onClick={() => {
                                handleOnlickId(crs._id)
                                navigate({
                                    pathname: location.pathname,
                                    search: `?id=${crs._id}`,
                                })
                            }
                            } className={cx('stepitem-info')}>
                                <h3 className={cx('stepitem-title')}>{index + 1}.{crs.title}</h3>

                            </div>

                            {/* <div className={cx('stepitem-icon-box')}>
                                <FontAwesomeIcon className={cx('stepitem-state', 'stepitem-locked')} icon={faLock} />
                            </div> */}
                        </div>

                    </div>
                    )}
                </div>
            </div>


        </div>
            <div className={cx('track-overlay')}></div></>}

        <div className={cx('content-wrapper', context.list ? ('') : ('content-full'))}>
            <div className={cx('video-content', context.list ? ('') : ('video_fullWidth'))}>
                <div className={cx('content-top')}>
                    <form className={cx('form')}>
                        <div className={cx('child-form')}>
                            <div className={cx('form-1')}>
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>Title</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={title}
                                            placeholder='Nhập tiêu đề...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className={cx('form-2')}>
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>published_at</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={published_at}
                                            placeholder='Tự động cập nhập'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}

                                        />
                                    </div>
                                </div>
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>is_published</label>
                                    <div className={cx('input-wrapper')}>
                                        <select className={cx('inputs', 'inputss', 'fix-fontsize')} value={is_published} onChange={(e) => setIsPublished(e.target.value)}>
                                            <option value="true" > True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className={cx('textarea-input')}>
                            <label className={cx('label')}>Nội dung</label>
                            <div className={cx('input-wrapper')}>

                                <EditorNewFeed handleSetValueNewFeed={handleSetValueNewFeed} valueOfNewFeed={newFeedDetail?.content || ''} />
                            </div>
                        </div>

                    </form>

                </div>

            </div>



        </div>
        <div className={cx('actionBar-wrapper')}>
            <button onClick={onHandleRefresh} className={cx('actionBar-bnt', 'actionBar-refres')}>
                <FontAwesomeIcon icon={faRefresh} />
                <span>Refresh</span>
            </button>
            <button onClick={handleAddNewFeed} className={cx('actionBar-bnt', 'actionBar-success')}>
                <FontAwesomeIcon icon={faPlus} />
                <span>Thêm</span>
            </button>
            <button onClick={handleDeleteNewFeed} className={cx('actionBar-bnt', 'actionBar-primary')}>
                <FontAwesomeIcon icon={faTrash} />
                <span>Xóa</span>
            </button>
            <button onClick={handleSubmitEdit} className={cx('actionBar-bnt', 'actionBar-edit')}>
                <span>Sửa</span>
                <FontAwesomeIcon icon={faPenFancy} />
            </button>
            <div className={cx('toggle-wrapper')}>
                <button className={cx('toggle-btn')}>
                    {context.list ? (<FontAwesomeIcon onClick={context.handleList} icon={faArrowRight} />) : (<FontAwesomeIcon onClick={context.handleList} icon={faBars} />)

                    }
                </button>
            </div>

        </div>

    </section>
        <ToastContainer />
    </>
}
export default ManageNewFeed