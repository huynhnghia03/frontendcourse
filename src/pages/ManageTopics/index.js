import { useContext, useEffect, useState } from 'react';
import classNames from "classnames/bind";
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars, faTrash, faPenFancy, faXmark, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import ConfigRoutes from '../../config/routes'
import { logo } from '../../assets/image'
import styles from './ManageTopics.module.scss'
import { StoreContext } from '../../store';
import { addTopicAdmin, deleteTopicAdmin, editTopicAdmin, getAllTopicsAdmin, getDetailTopicAdmin } from '../../API/adminRequest';
import Avatar from '../../layouts/components/proper/Avatar';

const cx = classNames.bind(styles)

function Learning() {
    const context = useContext(StoreContext)
    const [searchPar] = useSearchParams()
    const [course, setCourse] = useState([])
    const [courseDetail, setCourseDetail] = useState({})
    const [active, setactive] = useState('')
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [level, setLevel] = useState('')

    const location = useLocation()
    const navigate = useNavigate();
    // const {  } = useParams()

    const getDataTopics = async () => {
        try {
            const { data } = await getAllTopicsAdmin()
            if (data) {
                setCourse([...data.data])
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
        getDataTopics()
        // eslint-disable-next-line
    }, [])



    const handleSubmitEdit = async () => {
        try {
            const datas = {
                name: name,
                description: description,
                subject: subject,
                level: level,
                image: image
            }
            const { data } = await editTopicAdmin(searchPar.get('id'), datas)

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
        setName('')
        setLevel('')
        setImage('')
        setDescription('')
        setSubject('')
        navigate({
            pathname: '/admin/manage-topics'
        })
    }
    async function handleOnlickId(id) {
        try {
            const { data } = await getDetailTopicAdmin(id)
            if (data) {
                setCourseDetail({ ...data.data })
                setName(data.data.name)
                setSubject(data.data.subject)
                setDescription(data.data.description)
                setImage(data.data.image)
                setLevel(data.data.level)
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
    const handleAddCourse = async () => {
        try {
            const datas = {
                name: name,
                description: description,
                subject: subject,
                level: level,
                image: image
            }
            const { data } = await addTopicAdmin(datas)
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
                getDataTopics()
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
    const handleDeleteCourse = async () => {
        try {

            const { data } = await deleteTopicAdmin(searchPar.get('id'))
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
                getDataTopics()
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
                    {course.map((crs, index) => <div key={crs._id} className={cx('trackitem-step-list', 'trackitem-open')}>
                        <div className={cx('stepitem-wrapper', searchPar.get('id') === crs._id ? active : '')}>
                            <div onClick={() => {
                                handleOnlickId(crs._id)
                                navigate({
                                    pathname: location.pathname,
                                    search: `?id=${crs._id}`,
                                })
                            }
                            } className={cx('stepitem-info')}>
                                <h3 className={cx('stepitem-title')}>{index + 1}.{crs.name}</h3>

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
                                    <label className={cx('label')}>Tên</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={name}
                                            placeholder='Nhập tên...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>Loại khóa học</label>
                                    <div className={cx('input-wrapper')}>
                                        <select className={cx('inputs', 'inputss', 'fix-fontsize')} value={subject} onChange={(e) => setSubject(e.target.value)}>
                                            <option value="">-- Chọn loại khóa học --</option>
                                            <option value="English" >Tiếng anh</option>
                                            <option value="LT">Lập trình</option>
                                        </select>

                                        {/* <input
                                            type='text'
                                            value={videoID}
                                            placeholder='Nhập videoID trên youtube...'
                                            className={cx('inputs', 'inputss')}
                                            // onBlur={onBlurEmail}
                                            onChange={(e) => SetvideoID(e.target.value)}
                                        /> */}
                                    </div>

                                </div>
                            </div>
                            <div className={cx('form-2')}>
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>Cấp độ</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={level}
                                            placeholder='Nhập cấp độ...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            // onBlur={onBlurPhone}
                                            onChange={(e) => setLevel(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>Ảnh</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={image}
                                            placeholder='Nhập link ảnh...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            // onBlur={onBlurPhone}
                                            onChange={(e) => setImage(e.target.value)}
                                        // disabled={searchPar.get('id') ? false : true}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('textarea-input')}>
                            <label className={cx('label')}>Nội dung</label>
                            <div className={cx('input-wrapper')}>
                                <textarea
                                    placeholder='Nhập nội dung...'
                                    value={description}
                                    className={cx('module-testarea', 'fix-fontsize')}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                    </form>

                </div>

            </div>
            <div className={cx('video-wrapper')}>
                <div className={cx('learning-center')}>
                    <div className={cx('videoplayer-wrapper')}>
                        <div className={cx('videoplayer-player')} style={{ width: '100%', height: '100%', }}>
                            <div style={{ width: '100%', height: '100%', backgroundSize: ' cover', backgroundPosition: 'center center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url("${courseDetail.image}")` }}>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div className={cx('actionBar-wrapper')}>
            <button onClick={onHandleRefresh} className={cx('actionBar-bnt', 'actionBar-refres')}>
                <FontAwesomeIcon icon={faRefresh} />
                <span>Refresh</span>
            </button>
            <button onClick={handleAddCourse} className={cx('actionBar-bnt', 'actionBar-success')}>
                <FontAwesomeIcon icon={faPlus} />
                <span>Thêm</span>
            </button>
            <button onClick={handleDeleteCourse} className={cx('actionBar-bnt', 'actionBar-primary')}>
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
export default Learning