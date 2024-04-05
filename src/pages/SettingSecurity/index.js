import { NavLink } from 'react-router-dom';
import classNames from "classnames/bind";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useReducer, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { matches, isAlpha, isEmpty } from "validator"
import { auth, providerFacebook, providerGoogle } from '../../config/firebase';
import { G } from '../../assets/image'
import { dataRouteProfiles, navLinkStyle } from '../SettingPersonal/data';
import Button from '../../layouts/components/Button';
import { updateUser } from '../../API/userRequest';
import styles from './Security.module.scss'
import { checkPhone, interactiveWithOauth } from '../../API/authRequest';
import { useDebounce } from '../../hooks';
import reducer, { initialState } from './reduce';
import {
    setYoutubeURL,
    setLinkURl,
    setInstargamURL,
    setTwitterURL,
    setGoogle,
    setFacebook,
    setPhone,
    setValuePhone,
    setOTP,
    setMessgaeError,
    setTime
} from './action'
import {
    YOUTUBE_URL,
    LINKIN_URL,
    INSTARGAM_URL,
    TWITTER_URL,
    PHONE,
    FRESHPHONE,
    COMFIRMPHONE,
    CAPCHA
} from './constance'



const cx = classNames.bind(styles)
function Setting() {
    const [mediaLinks, dispatch] = useReducer(reducer, initialState)
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const debounce = useDebounce(mediaLinks.valuePhone, 500)

    const handleLinkWithAouth02 = async (datas, methob, type) => {
        try {
            const { data } = await interactiveWithOauth(datas, methob, type)
            if (data.success === 1) {
                toast(data.message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                localStorage.setItem('currentUser', JSON.stringify(data.data))
                if (methob === "google") {
                    dispatch(setGoogle(data.data.oauths))
                } else if (methob === "facebook") {
                    dispatch(setFacebook(data.data.oauths))
                } else {
                    dispatch(setPhone(data.data.oauths))
                    dispatch(setValuePhone(""))
                    dispatch({ type: COMFIRMPHONE, payload: false })
                    dispatch({ type: PHONE, payload: false })
                    dispatch({ type: FRESHPHONE, payload: false })
                    dispatch(setTime(0))
                }

            } else if (data.success === "err") {
                toast(data.message, {
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
    const connectWithGoogle = async () => {
        const getData = await signInWithPopup(auth, providerGoogle)
        const datas = {
            displayName: getData.user.displayName
            , email: getData.user.email, photoURL: getData.user.photoURL
            , provider: getData.providerId

        }
        handleLinkWithAouth02(datas, "google", "Linked")
    }

    const cancelWithGoogle = async () => {
        const data = { email: mediaLinks.google.email }
        handleLinkWithAouth02(data, "google", "canceled")
    }
    const connectWithFaceBook = async () => {
        const getData = await signInWithPopup(auth, providerFacebook)
        const datas = {
            displayName: getData.user.displayName
            , email: getData.user.email, photoURL: getData.user.photoURL
            , provider: getData.providerId

        }
        handleLinkWithAouth02(datas, "facebook", "Linked")
    }
    const cancelWithFacebook = async () => {
        const data = { email: mediaLinks.facebook.email }
        handleLinkWithAouth02(data, "facebook", "canceled")
    }

    useEffect(() => {
        const checkPhoneNumber = async (debounce) => {
            try {
                if (!debounce.trim()) {
                    return
                }
                const { data } = await checkPhone(debounce)
                if (data.success === 1) {
                    return
                } else {
                    dispatch(setMessgaeError(data.message))
                }
            }
            catch {
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
        checkPhoneNumber(debounce)



    }, [debounce])

    useEffect(() => {
        if (mediaLinks.time === 0) {
            // Stop the timer when time reaches 0
            return;
        }

        const timerId = setTimeout(() => {
            dispatch(setTime(mediaLinks.time - 1)) // Decrease time by 1 after 1 second
        }, 1000);

        // Cleanup function to clear the timer when the component unmounts or when time reaches 0
        return () => {
            clearTimeout(timerId);
        };
    }, [mediaLinks.time])

    const generateRecapcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
                dispatch({ type: CAPCHA, payload: false })
                toast("Đã gửi mã OTP đến số điện thoại của bạn", {
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
        });
    }
    const requestOTP = async () => {
        generateRecapcha()
        const appVerifier = window.recaptchaVerifier
        signInWithPhoneNumber(auth, mediaLinks.valuePhone, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult
                dispatch({ type: COMFIRMPHONE, payload: true })
                dispatch({ type: FRESHPHONE, payload: true })
                dispatch(setTime(60))
                dispatch({ type: CAPCHA, payload: true })
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                toast.error("Lỗi! OTP không được gửi", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            });
    }
    const requestAgainOTP = async () => {
        generateRecapcha()
        const appVerifier = window.recaptchaVerifier
        signInWithPhoneNumber(auth, mediaLinks.valuePhone, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult
                dispatch(setTime(60))
                dispatch({ type: CAPCHA, payload: true })
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                toast.error("Lỗi! OTP không được gửi", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            });
    }
    const confirmOTP = () => {
        let confirmationResult = window.confirmationResult
        confirmationResult.confirm(mediaLinks.otp).then((result) => {
            const datas = {
                provider: result.providerId,
                phoneNumber: result.user.phoneNumber
            }
            handleLinkWithAouth02(datas, "phone", "Linked")
        }).catch(() => {
            toast.error("Lỗi! Vui lòng kiểm tra lại mã OTP", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        })
    }

    const cancelWithPhone = async () => {
        const data = { phoneNumber: mediaLinks.numberPhone.phoneNumber }
        handleLinkWithAouth02(data, "phone", "canceled")
    }

    const updateDataUser = async (nickname, datas) => {
        try {
            const { data } = await updateUser(nickname, datas)
            if (data.success === 1) {
                toast("Thay đổi thành công", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                localStorage.setItem('currentUser', JSON.stringify(data.data))
                dispatch(setYoutubeURL(data?.data?.youtube_url))

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

    const handleSaveYoutube = async () => {
        if (matches(mediaLinks.valueYoutube, "https://www.youtube.com/") && JSON.stringify(mediaLinks.valueYoutube).length > 24) {
            const datas = {
                youtube_url: mediaLinks.valueYoutube
            }
            updateDataUser(user.nickname, datas)
            dispatch({ type: YOUTUBE_URL })
        } else {
            toast.warn("Linh youtube không hợp lệ", {
                position: "bottom-right",
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
    const handleSaveLinkIn = async () => {
        if (matches(mediaLinks.valueLinkin, "https://www.linkedin.com/") && JSON.stringify(mediaLinks.valueLinkin).length > 25) {
            const datas = {
                LinkIn_url: mediaLinks.valueLinkin
            }
            updateDataUser(user.nickname, datas)
            dispatch({ type: LINKIN_URL })
        }
        else {
            toast.warn("Linh linkin không hợp lệ", {
                position: "bottom-right",
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
    const handleSaveInstargam = async () => {
        if (matches(mediaLinks.valueInstagram, "https://www.instagram.com/") && JSON.stringify(mediaLinks.valueInstagram).length > 26) {


            const datas = {
                instagram_url: mediaLinks.valueInstagram
            }
            updateDataUser(user.nickname, datas)
            dispatch({ type: INSTARGAM_URL })
        } else {
            toast.warn("Linh instagram không hợp lệ", {
                position: "bottom-right",
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
    const handleSaveTwitter = async () => {
        if (matches(mediaLinks.valueTwitter, "https://twitter.com/") && JSON.stringify(mediaLinks.valueTwitter).length > 20) {
            const datas = {
                twitter_url: mediaLinks.valueTwitter
            }
            updateDataUser(user.nickname, datas)
            dispatch({ type: TWITTER_URL })
        } else {
            toast.warn("Linh twitter không hợp lệ", {
                position: "bottom-right",
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

    return (<><div className={cx('setting-wrapper')}>
        <div className={cx('setting-side-left')}>
            <h1 className={cx('setting-heading')}>Cài Đặt</h1>
            <ul className={cx('setting-list')}>
                {dataRouteProfiles.map((val, index) =>
                    <li key={index}>
                        <NavLink style={navLinkStyle} to={val.route}  >
                            <FontAwesomeIcon icon={val.icon} className={cx('setting-icon')} />
                            <span>{val.discp}</span>
                        </NavLink>
                    </li>)}
            </ul>
        </div>
        <div className={cx('setting-side-right')}>
            <section className='row'>
                <section className=' col col-sm-12 col-md-12 col-lg-12'>
                    <div className={cx('setting-content')}>
                        <div className={cx('groupfield-wrapper')}>
                            <h2 className={cx('field-heading')}>Liên kết tài khoản đăng nhập</h2>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Liên kết Google</h3>
                                    <div className={cx('field-description')}>
                                        {user?.provider === "google.com" ? <div className={cx("description", "fix_display")}>
                                            <div><img className={cx('image-avatar')} src={user?.avatar} alt={user?.email} /></div>
                                            <span>{user?.email}</span>
                                        </div> : mediaLinks.google ?
                                            <div className={cx("description", "fix_display")}>
                                                <div><img className={cx('image-avatar')} src={mediaLinks.google.photoURL} alt={mediaLinks.google.email} /></div>
                                                <span>{mediaLinks.google.email}</span>
                                            </div> :
                                            <div className={cx("description")}>
                                                <p>Chưa liên kết Google</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {user?.provider === "google.com" ? " " :
                                    <div className={cx('field-bnt')}>
                                        {mediaLinks.google ? <button onClick={cancelWithGoogle} className={cx('field-button')}><img className={cx('google')} src={G} alt='logo' /> Hủy liên kết</button> :
                                            <button onClick={connectWithGoogle} className={cx('field-button')}><img className={cx('google')} src={G} alt='logo' />  Liên kết Google</button>}
                                    </div>}
                            </div>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Liên kết Facebook</h3>
                                    <div className={cx('photo-content')}>
                                        {user?.provider === "facebook.com" ? <div className={cx("description", "fix_display")}>
                                            <div><img className={cx('image-avatar')} src={user?.avatar} alt={user?.email} /></div>
                                            <span>{user?.email}</span>
                                        </div> : mediaLinks.facebook ? <div className={cx("description", "fix_display")}>
                                            <div><img className={cx('image-avatar')} src={mediaLinks.facebook.photoURL} alt={mediaLinks.facebook.email} /></div>
                                            <span>{mediaLinks.facebook.email}</span>
                                        </div> :
                                            <div className={cx("description")}>
                                                <p>Chưa liên kết Facebook</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {user?.provider === "facebook.com" ? " " :
                                    <div className={cx('field-bnt')}>
                                        {mediaLinks.facebook ? <button onClick={cancelWithFacebook} className={cx('field-button')}><FontAwesomeIcon className={cx('facebook')} icon={faFacebook} />  Hủy liên kết</button> :
                                            <button onClick={connectWithFaceBook} className={cx('field-button')}><FontAwesomeIcon className={cx('facebook')} icon={faFacebook} />  Liên kết Facebook</button>}
                                    </div>}
                            </div>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Liên kết số điện thoại</h3>
                                    {!mediaLinks.phone ? <>
                                        {mediaLinks.numberPhone ? <div className={cx("description")}>
                                            <span>Số điện thoại: {mediaLinks.numberPhone.phoneNumber}</span>
                                        </div> :
                                            <div className={cx("description")}>
                                                <p>Chưa liên kết số điện thoại</p>
                                            </div>
                                        }</> : <>
                                        <div className={cx("description", "inputPhone")}>
                                            <div className={cx('wrapper-inputphone')}>
                                                <PhoneInput
                                                    defaultCountry='VN'
                                                    value={mediaLinks.valuePhone || ""}
                                                    onChange={(e) => dispatch(setValuePhone(e))}
                                                />
                                            </div>
                                            <div className={cx('field-bnt')}>
                                                {mediaLinks.refreshPhone ?
                                                    <Button primary onClick={requestAgainOTP} disable={!(JSON.stringify(mediaLinks.valuePhone).length - 4 >= 10 && JSON.stringify(mediaLinks.valuePhone).length - 4 <= 11 && (mediaLinks.time === 0)) && !(mediaLinks.errorMessage === " ")} disabled={!(JSON.stringify(mediaLinks.valuePhone).length - 4 >= 10 && JSON.stringify(mediaLinks.valuePhone).length - 4 <= 11 && (mediaLinks.time === 0)) && !(mediaLinks.errorMessage === " ")}> {mediaLinks.time === 0 ? "Gửi lại" : "Gửi lại " + mediaLinks.time}</Button> :
                                                    <Button primary onClick={requestOTP} disable={!(JSON.stringify(mediaLinks.valuePhone).length - 4 >= 10 && JSON.stringify(mediaLinks.valuePhone).length - 4 <= 11) && !(mediaLinks.errorMessage === " ")} disabled={!(JSON.stringify(mediaLinks.valuePhone).length - 4 >= 10 && JSON.stringify(mediaLinks.valuePhone).length - 4 <= 11) && !(mediaLinks.errorMessage === " ")}>Gửi mã </Button>}
                                                <Button normal onClick={() => {
                                                    dispatch({ type: PHONE, payload: false })
                                                    dispatch(setValuePhone(""))
                                                }}>Hủy</Button>
                                            </div>

                                        </div>
                                        {mediaLinks.capcha ? <div id="recaptcha-container" style={{ display: "none" }}></div> : ""}
                                        <span className={cx('error-messgae')}>{mediaLinks.errorMessage}</span>
                                        {mediaLinks.confirmPhone ?
                                            <div className={cx("description", "inputPhone")}>
                                                <div className={cx('wrapper-inputphone')}>
                                                    <input className={cx('inputConfirm')} type='text' onChange={(e) => dispatch(setOTP(e.target.value))} />
                                                </div>

                                                <div className={cx('field-bnt')}>
                                                    <Button primary onClick={confirmOTP} disable={!(JSON.stringify(mediaLinks.otp).length - 2 === 6) || isEmpty(mediaLinks.otp) || isAlpha(mediaLinks.otp)} disabled={!(JSON.stringify(mediaLinks.otp).length - 2 === 6) || isEmpty(mediaLinks.otp) || isAlpha(mediaLinks.otp)}>Xác nhận</Button>
                                                </div>

                                            </div> : " "}</>}
                                </div>
                                {user?.provider === "phone" ? "" :
                                    !mediaLinks.phone ? mediaLinks.numberPhone ? <div className={cx('field-bnt')}>
                                        <button onClick={cancelWithPhone} className={cx('field-button')}><FontAwesomeIcon className={cx('phone')} icon={faPhone} />  Hủy liên kết</button>
                                    </div> :
                                        <div className={cx('field-bnt')}>
                                            <button className={cx('field-button')} onClick={() => dispatch({ type: PHONE, payload: true })}><FontAwesomeIcon className={cx('phone')} icon={faPhone} />  Liên kết số điện thoại</button>
                                        </div> : ""
                                }
                            </div>
                        </div>
                        <div className={cx('groupfield-wrapper')}>
                            <h2 className={cx('field-heading')}>Mạng xã hội</h2>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Youtube</h3>
                                    <div className={cx('field-description')}>
                                        <input type='text'
                                            className={cx("field-input-content")}
                                            placeholder='https://www.youtube.com/hoclaptrinhLE'
                                            value={mediaLinks.valueYoutube}
                                            onChange={(e) => dispatch(setYoutubeURL(e.target.value))}
                                            maxLength='50'
                                            disabled={!mediaLinks.youtube}
                                        />
                                    </div>
                                </div>
                                {!mediaLinks.youtube ?
                                    <div className={cx('field-bnt')}>
                                        <button className={cx('field-button')} onClick={() => dispatch({ type: YOUTUBE_URL })}>Chỉnh sửa</button>
                                    </div> :
                                    <div className={cx('field-bnt')}>
                                        <Button normal onClick={() => {
                                            dispatch({ type: YOUTUBE_URL })
                                            dispatch(setYoutubeURL(user?.youtube_url))
                                        }
                                        }>Hủy</Button>
                                        <Button primary onClick={handleSaveYoutube}>Lưu</Button>
                                    </div>}

                            </div>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>LinkedIn</h3>
                                    <div className={cx('field-description')}>
                                        <input
                                            type='text'
                                            className={cx("field-input-content")}
                                            placeholder='https://www.linkedin.com/hoclaptrinhLE'
                                            value={mediaLinks.valueLinkin}
                                            onChange={(e) => dispatch(setLinkURl(e.target.value))}
                                            maxLength='50'
                                            disabled={!mediaLinks.linkin} />

                                    </div>

                                </div>
                                {!mediaLinks.linkin ?
                                    <div className={cx('field-bnt')}>
                                        <button className={cx('field-button')} onClick={() => dispatch({ type: LINKIN_URL })}>Chỉnh sửa</button>
                                    </div> :
                                    <div className={cx('field-bnt')}>
                                        <Button normal onClick={() => {
                                            dispatch({ type: LINKIN_URL })
                                            dispatch(setLinkURl(user?.LinkIn_url))
                                        }} >Hủy</Button>
                                        <Button primary onClick={handleSaveLinkIn}>Lưu</Button>
                                    </div>}
                            </div>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Instagram</h3>
                                    <div className={cx('field-description')}>
                                        <input
                                            type='text'
                                            className={cx("field-input-content")}
                                            placeholder='https://www.instagram.com/hoclaptrinhLE'
                                            value={mediaLinks.valueInstagram}
                                            onChange={(e) => dispatch(setInstargamURL(e.target.value))}
                                            maxLength='50'
                                            disabled={!mediaLinks.instagram} />

                                    </div>

                                </div>
                                {!mediaLinks.instagram ?
                                    <div className={cx('field-bnt')}>
                                        <button className={cx('field-button')} onClick={() => dispatch({ type: INSTARGAM_URL })}>Chỉnh sửa</button>
                                    </div> :
                                    <div className={cx('field-bnt')}>
                                        <Button normal onClick={() => {
                                            dispatch({ type: INSTARGAM_URL })
                                            dispatch(setInstargamURL(user?.instagram_url))
                                        }}>Hủy</Button>
                                        <Button primary onClick={handleSaveInstargam}>Lưu</Button>
                                    </div>}
                            </div>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Twitter</h3>
                                    <div className={cx('field-description')}>
                                        <input
                                            type='text'
                                            className={cx("field-input-content")}
                                            placeholder='https://twitter.com/hoclaptrinhLE'
                                            value={mediaLinks.valueTwitter}
                                            onChange={(e) => dispatch(setTwitterURL(e.target.value))}
                                            maxLength='50'
                                            disabled={!mediaLinks.twitter} />

                                    </div>

                                </div>
                                {!mediaLinks.twitter ?
                                    <div className={cx('field-bnt')}>
                                        <button className={cx('field-button')} onClick={() => dispatch({ type: TWITTER_URL })}>Chỉnh sửa</button>
                                    </div> :
                                    <div className={cx('field-bnt')}>
                                        <Button normal onClick={() => {
                                            dispatch({ type: TWITTER_URL })
                                            dispatch(setTwitterURL(user?.twitter_url))
                                        }}>Hủy</Button>
                                        <Button primary onClick={handleSaveTwitter}>Lưu</Button>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    </div>
        <ToastContainer /></>
    )
}
export default Setting