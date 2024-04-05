import { Link } from 'react-router-dom'
import classNames from "classnames/bind"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faUser } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isEmpty, isEmail, isStrongPassword } from 'validator'
import { signInWithPopup } from "firebase/auth"
import Configroutes from '../../config/routes'
import styles from './Login.module.scss'
import { LE } from '../../assets/image'
import { StoreContext } from '../../store'
import Button from '../../layouts/components/Button'
import ForgetPassWord from '../ForgetPassWord'
import { LoginMedthod, LoginOauth } from '../../API/authRequest'
import { auth, providerFacebook, providerGithub, providerGoogle } from '../../config/firebase'

const cx = classNames.bind(styles)

function Login() {
    const [state, setState] = useState(true)
    const [forget, setForget] = useState(false)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [validateMsg, setValidateMsg] = useState({})
    const [errMessageOauth, setErrMessageOauth] = useState('')
    const context = useContext(StoreContext)
    const handleState = () => {
        setState(false)
    }
    const msg = {}
    const ValidatAll = () => {
        if (isEmpty(email)) {
            msg.email = 'Vui lòng nhập email'
        }
        if (isEmpty(pass)) {
            msg.pass = 'Vui lòng nhập mật khẩu'
        } else if (!isStrongPassword(pass)) {
            msg.pass = 'Tối thiểu 8 chữ:ABcd123@'
        }

        setValidateMsg({ ...validateMsg, ...msg })
        if (Object.keys(msg).length > 0) { return false }
        return true
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        validateMsg.email = ''
        setValidateMsg({ ...msg, ...validateMsg })
    }
    const onChangePass = (e) => {
        setPass(e.target.value)
        validateMsg.pass = ''
        setValidateMsg({ ...validateMsg })
    }
    const onBlurEmail = () => {

        if (isEmpty(email)) {
            validateMsg.email = 'Vui lòng nhập email'
        } else if (!isEmail(email)) {
            validateMsg.email = 'Email không đúng cú pháp'
        }

        setValidateMsg({ ...msg, ...validateMsg })
    }
    const onBlurPass = () => {
        if (isEmpty(pass)) {
            validateMsg.pass = 'Vui lòng nhập mật khẩu'
        } else if (!isStrongPassword(pass)) {
            validateMsg.pass = 'Tối thiểu 8 chữ:ABcd123@'
        }

        setValidateMsg({ ...validateMsg })
    }
    const hanldSubmit = async (e) => {
        const isValid = ValidatAll()
        if (!isValid) {
            e.preventDefault()
            return
        }
        else {
            try {
                e.preventDefault()
                const datas = {
                    email,
                    pass
                }
                const { data } = await LoginMedthod(datas)
                if (data.success === 1) {
                    setTimeout(() => {
                        context.setLoading(false)
                        window.location.href = '/'
                    }, 3000)
                    localStorage.setItem('token', data.acesstoken)
                    localStorage.setItem('currentUser', JSON.stringify(data.rest))
                    context.setLoading(true)
                } else if (data.err === 1) {
                    validateMsg.email = data.message
                    setValidateMsg({ ...validateMsg, ...msg })
                } else if (data.err === 0) {
                    validateMsg.pass = data.message
                    setValidateMsg({ ...validateMsg, ...msg })
                }
                else {
                    alert()
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
            }
            catch {
                const data = { Username: null, email: null, admin: null, avatar: null }
                localStorage.setItem('currentUser', JSON.stringify(data))
                toast.error('Lối sever', {
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
    }

    const handleLoginWithAouth02 = async (datas, method) => {
        try {
            const { data } = await LoginOauth(datas, method)
            switch (data.success) {
                case true:
                    if (data.is_Login === true) {
                        setTimeout(() => {
                            context.setLoading(false)
                            window.location.href = '/'
                        }, 3000)
                        localStorage.setItem('token', data.acesstoken)
                        localStorage.setItem('currentUser', JSON.stringify(data.rest))
                        context.setLoading(true)
                    } else {
                        setTimeout(() => {
                            window.location.href = '/OverBoarding'
                        }, 500)
                        localStorage.setItem('token', data.acesstoken)
                        localStorage.setItem('currentUser', JSON.stringify(data.rest))
                    }
                    break
                case "err":
                    setErrMessageOauth(data.message)
                    break
                default:
                    break
            }

        } catch {
            const data = { Username: null, email: null, admin: null, avatar: null }
            localStorage.setItem('currentUser', JSON.stringify(data))
            toast.error('Lối sever', {
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
    const signInGoogle = async () => {
        try {
            const getData = await signInWithPopup(auth, providerGoogle)
            if (getData) {
                const datas = {
                    displayName: getData.user.displayName
                    , email: getData.user.providerData[0].email, photoURL: getData.user.photoURL
                    , providerId: getData.providerId

                }

                handleLoginWithAouth02(datas, "google")
            }
        } catch (error) {
            return
        }
    }
    const signInFaceBook = async () => {
        try {
            const getData = await signInWithPopup(auth, providerFacebook)
            if (getData) {
                const datas = {
                    displayName: getData.user.displayName
                    , email: getData.user.email, photoURL: getData.user.photoURL
                    , provider: getData.providerId

                }
                console.log(getData.user.providerData[0].email)
                handleLoginWithAouth02(datas, "facebook")
            }
        } catch (error) {
            return
        }
    }
    const signInGitHub = async () => {
        try {
            const getData = await signInWithPopup(auth, providerGithub.getScopes('email'))

            const datas = {
                screenName: getData._tokenResponse
                    .screenName
                , email: getData._tokenResponse
                    .email, photoUrl: getData.user.photoURL
                , providerId: getData.providerId

            }
            console.log(getData.user)
            handleLoginWithAouth02(datas, "github")
        } catch (error) {
            return
        }
    }
    return (<>
        <div className={cx('wrapper', 'hasBg')} >
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {!state &&
                        (<div className={cx('backbnt')} onClick={() => setState(true)}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </div>)
                    }

                    {forget ? (<>
                        {forget &&
                            (<div className={cx('backbnt')} onClick={() => setForget(false)}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </div>)
                        }
                        <ForgetPassWord />

                    </>
                    ) : (<><div className={cx('header')}>
                        <Link to={Configroutes.root}>
                            <img className={cx('logo')} src={LE} alt='logo' />
                        </Link>
                        <h1 className={cx('title')}>Đăng nhập vào LE
                        </h1>
                    </div>
                        <div className={cx('body')}>
                            {state ? (<div className={cx('main-step')} onClick={() => setErrMessageOauth('')}>
                                <div className={cx('sigin-button')} onClick={handleState}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    <span className={cx('text')}>Sử dụng email</span>
                                </div>

                                <div className={cx('sigin-button')} onClick={signInGoogle}>
                                    <img className={cx('icon')} src='https://accounts.fullstack.edu.vn/assets/images/signin/google-18px.svg' alt='Google' />
                                    <span className={cx('text')}>Tiếp tục với Google</span>
                                </div>

                                <div className={cx('sigin-button')} onClick={signInFaceBook}>
                                    <img className={cx('icon')} src='https://accounts.fullstack.edu.vn/assets/images/signin/facebook-18px.svg' alt='Facebook' />
                                    <span className={cx('text')}>Tiếp tục với FaceBook</span>
                                </div>

                                <div className={cx('sigin-button')} onClick={signInGitHub}>
                                    <img className={cx('icon')} src='https://accounts.fullstack.edu.vn/assets/images/signin/github-18px.svg' alt='Github' />
                                    <span className={cx('text')}>Tiếp tục với GitHub</span>
                                </div>
                                <p className={cx('noAccount')}>
                                    Bạn chưa có tài khoản?
                                    <Link to={Configroutes.Register}>Đăng ký</Link>
                                </p>
                                <span className={cx('message')} style={{ fontSize: '2rem', fontWeight: '700' }}>{errMessageOauth}</span>
                            </div>) : (
                                <form><div className={cx('formBody')}>
                                    <div className={cx('form-content')}>
                                        <div className={cx('input-content')}>
                                            <div className={cx('labelGroup')}>
                                                <label className={cx('label')}>Email</label>
                                            </div>
                                            <div className={cx('inputGroup')}>
                                                <input
                                                    placeholder='Nhập email'
                                                    name='email'
                                                    type='email'
                                                    autoComplete='email'
                                                    onBlur={onBlurEmail}
                                                    onChange={onChangeEmail}
                                                />
                                            </div>
                                            <span className={cx('message')}>{validateMsg.email}</span>

                                        </div>

                                    </div>
                                    <div className={cx('form-content')}>
                                        <div className={cx('input-content')}>
                                            <div className={cx('labelGroup')}>
                                                <label className={cx('label')}>Mật khẩu</label>
                                            </div>
                                            <div className={cx('inputGroup')}>
                                                <input
                                                    placeholder='Nhập mật khẩu'
                                                    name='password'
                                                    type='password'
                                                    autoComplete='current-password'
                                                    onBlur={onBlurPass}
                                                    onChange={onChangePass}
                                                />
                                            </div>
                                            <span className={cx('message')} >{validateMsg.pass}</span>

                                        </div>

                                    </div>
                                    <Button primary onClick={hanldSubmit} className={cx('sumbnt')}>
                                        <div className={cx('inner', 'module-inner')}><span className={cx('module-text')}>Đăng nhập</span></div>
                                    </Button>
                                    <p className={cx('noAccount')}>
                                        Bạn chưa có tài khoản?
                                        <Link to={Configroutes.Register}>Đăng ký</Link>
                                    </p>
                                    <p className={cx('forget-pass')} onClick={() => setForget(true)}>Quên mật khẩu?</p>

                                </div></form>)}
                        </div>
                    </>
                    )}

                </div>
                <div className={cx('about')}>
                    <Link target='_blank' to={Configroutes.Introduce}>Giới thiệu về LE</Link>
                    <span>|</span>
                    <Link target='_blank' to={Configroutes.Contact}>Liên hệ</Link>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>

    )
}
export default Login