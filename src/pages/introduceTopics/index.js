import classNames from "classnames/bind";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faFilm, faClock, faBatteryFull, faPlus, faCirclePlay, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './introduceTopics.module.scss'
import Button from "../../layouts/components/Button";
import { getTrackListCourse, registedTopic } from "../../API/courses_TopicsRequest";
import ConfigRoutes from "../../config/routes"

const cx = classNames.bind(styles)

function IntroduceTopic() {
    const [showListCourse, setShowListCourse] = useState(true)
    const [disButton, setDisButton] = useState(true)
    const [courses, setCourses] = useState([])
    // const topics = JSON.parse(localStorage.getItem('AllCourses'))
    const [amountOfCourse, setAmountOfCourse] = useState(0)
    const [topic, setTopic] = useState({})
    const navigate = useNavigate()
    const { slug } = useParams()


    useEffect(() => {
        const getcourseDetail = async (sl) => {
            try {
                const { data } = await getTrackListCourse(sl)
                if (data) {
                    if (!data.courses.is_resgister) {
                        setCourses([...data.courses.courses])
                        setTopic({ ...data.courses })
                        setAmountOfCourse([...data.courses.courses].length)
                    }
                    else {
                        navigate({
                            pathname: '/Learning/' + sl
                        })
                    }
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
        if (slug) {
            getcourseDetail(slug)
        }
        // }
        // eslint-disable-next-line
    }, [slug])

    const hanldeReigisterTopic = async (id) => {
        try {
            setDisButton(false)
            const { data } = await registedTopic(id)
            if (data.success === 1) {
                toast.success("Đăng ký thành công", {
                    position: "top-center",
                    autoClose: 900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setTimeout(() => {
                    navigate({
                        pathname: '/Learning/' + slug
                    })
                }, 1000)

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

                    <section className={cx('col', 'col-c-12', 'col-m-12', 'col-l-8')}>
                        <div className={cx('discuss-contain')}>
                            <h1 className={cx('discuss-heading')}>{topic.name}</h1>
                            <p className={cx('discuss-text')}>{topic.description}</p>
                        </div>

                        <div className={cx('box-wrapper')}>
                            <div className={cx('headersticky')}>
                                <div className={cx('headerBlock')}>
                                    <h2 className={cx('discuss-heading')}>Nội Dung khóa học</h2>
                                </div>
                                <div className={cx('subHeader')}>
                                    <ul>
                                        <li><strong>{amountOfCourse}</strong> bài học</li>
                                        <li className={cx('dot')}>．</li>
                                        <li>Thời gian: <strong>10 giờ 20 phút </strong></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cx('ciriculum_PanelofCourse')}>
                                <div className={cx('ciriculum_PanelGroup')}>
                                    <div>
                                        <div className={cx('ciriculum_Panel')}>
                                            <div className={cx('ciriculum_PanelHeading')}>
                                                {showListCourse ? <h5 className={cx('ciriculum_PenalTitle')} onClick={() => setShowListCourse(false)}>
                                                    <div className={cx('ciriculum_PenalHeadLine')}>
                                                        <FontAwesomeIcon icon={faMinus} />
                                                        <span>Nội dung</span>
                                                    </div>
                                                </h5> :
                                                    <h5 className={cx('ciriculum_PenalTitle')} onClick={() => setShowListCourse(true)}>
                                                        <div className={cx('ciriculum_PenalHeadLine')}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                            <span>Nội dung</span>
                                                        </div>
                                                    </h5>}

                                            </div>
                                            <div className={cx('ciriculum_PanelCollasap', showListCourse ? "ciriculum_PanelCollasapIn" : '')}>
                                                <div className={cx('ciriculum_PanelBody')}>
                                                    <div >
                                                        {courses.map((val, index) =>
                                                            <div key={val._id} className={cx('ciriculum_lessonItem')}>
                                                                <span className={cx('ciriculum_floatlef', 'ciriculum_iconLink')}><FontAwesomeIcon className={cx('ciriculum_icon', 'ciriculum_video')} icon={faCirclePlay} />
                                                                    <div className={cx('ciriculum_lessonName')}>{index + 1}. {val.name}</div></span>
                                                                <span className={cx('ciriculum_lessonTime')}>01:34</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </section>
                    <section className={cx('col', 'col-c-12', 'col-m-12', 'col-l-4')}>
                        <div className={cx('content-left')}>
                            <div className={cx('imgPreview')}>
                                <div className={cx('bg')} style={{
                                    backgroundImage: `url(	${topic.image}
)`}}></div>
                            </div>
                            <h5>Miễn Phí</h5>
                            {!localStorage.getItem('token') ?
                                <Button primary to={ConfigRoutes.Login}>Đăng ký ngay</Button> :
                                <Button primary onClick={() => hanldeReigisterTopic(topic._id)} disable={disButton}>Đăng ký ngay</Button>
                            }
                            <ul className={cx('participation', 'listOfTech')}>
                                <li><FontAwesomeIcon className={cx('icon')} icon={faGaugeHigh} /><span>Trình độ cơ bản</span></li>
                                <li><FontAwesomeIcon className={cx('icon')} icon={faFilm} /><span>Tổng số <strong>{amountOfCourse} </strong>bài</span></li>
                                <li><FontAwesomeIcon className={cx('icon')} icon={faClock} /><span>Thời lượng <strong>10 giờ 21 phút</strong></span></li>
                                <li><FontAwesomeIcon className={cx('icon')} icon={faBatteryFull} /><span>Học mọi lúc mọi nơi</span></li>
                            </ul>


                        </div>
                    </section>
                </section>
            </div>
        </section>
        <ToastContainer />
    </>
    )

}
export default IntroduceTopic