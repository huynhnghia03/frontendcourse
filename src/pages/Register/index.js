import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithPopup } from "firebase/auth"
import { isEmpty, isEmail, isStrongPassword } from 'validator'
import Configroutes from '../../config/routes'
import { LE } from '../../assets/image'
import styles from './Register.module.scss'
import Button from '../../layouts/components/Button';
import { StoreContext } from '../../store';
import { RegisterMedthod, LoginOauth } from '../../API/authRequest';
import { auth, providerFacebook, providerGithub, providerGoogle } from '../../config/firebase';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles)

function Register() {
    const context = useContext(StoreContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [rePass, setRePass] = useState('')
    const [disButton, setDisButton] = useState(false)
    const [errMessageOauth, setErrMessageOauth] = useState('')
    const [validateMsg, setValidateMsg] = useState({})
    const [state, setState] = useState(true)
    const handleState = () => {
        setState(false)
    }
    const msg = {}
    const ValidatAll = () => {
        if (isEmpty(name)) {
            msg.name = 'Vui lòng nhập tên'
        }
        if (isEmpty(email)) {
            msg.email = 'Vui lòng nhập email'
        }
        if (isEmpty(pass)) {
            msg.pass = 'Vui lòng nhập mật khẩu'
        } else if (!isStrongPassword(pass)) {
            validateMsg.pass = 'Tối thiểu 8 chữ:ABcd123@'
        }

        if (isEmpty(rePass)) {
            msg.rePass = 'Vui lòng nhập mật khẩu'
        } else if (rePass !== pass) {
            msg.rePass = 'Mật khẩu không khớp'
        }
        setValidateMsg({ ...msg, ...validateMsg })

        if (Object.keys(msg).length > 0) { return false }
        return true
    }
    const onChangeName = (e) => {
        setName(e.target.value)
        validateMsg.name = ''
        setValidateMsg({ ...msg, ...validateMsg })
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        validateMsg.email = ''
        setValidateMsg({ ...msg, ...validateMsg })
    }
    const onChangePass = (e) => {
        setPass(e.target.value)
        validateMsg.pass = ''
        setValidateMsg({ ...msg, ...validateMsg })
    }
    const onChangeRePass = (e) => {
        setRePass(e.target.value)
        validateMsg.rePass = ''
        setValidateMsg({ ...msg, ...validateMsg })
    }
    const onBlurName = () => {
        if (isEmpty(name)) {
            validateMsg.name = 'Vui lòng nhập tên'
        }
        setValidateMsg({ ...msg, ...validateMsg })
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

        setValidateMsg({ ...msg, ...validateMsg })
    }
    const onBlurPrePass = () => {

        if (isEmpty(rePass)) {
            validateMsg.rePass = 'Vui lòng nhập mật khẩu'
        } else if (rePass !== pass) {
            validateMsg.rePass = 'Mật khẩu không khớp'
        }
        setValidateMsg({ ...msg, ...validateMsg })
    }
    const hanldSubmit = async (e) => {
        const isValid = ValidatAll()
        if (!isValid || Object.keys(msg).length > 0) {
            e.preventDefault()
        }
        else {
            try {
                e.preventDefault()
                setDisButton(true)
                const datas = {
                    name,
                    email,
                    pass
                }
                const { data } = await RegisterMedthod(datas)
                console.log(data)
                if (data.success === 1) {
                    toast.success("Đăng ký tài khoản thành công", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        window.location.href = '/OverBoarding'
                    }, 2500)
                    localStorage.setItem('token', data.acesstoken)
                    localStorage.setItem('currentUser', JSON.stringify(data.rest))
                } else if (data.err === 1) {
                    validateMsg.email = data.message
                    setValidateMsg({ ...validateMsg, ...msg })
                } else if (data.err === 0) {
                    validateMsg.pass = data.message
                    setValidateMsg({ ...validateMsg, ...msg })
                }
                else {
                    toast.error(data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
            catch {
                const data = { Username: null, email: null, admin: null, avatar: null }
                localStorage.setItem('currentUser', JSON.stringify(data));
                toast.error('Lối sever', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
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
            localStorage.setItem('currentUser', JSON.stringify(data));
            toast.error('Lối sever', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }
    const signInGoogle = async () => {
        const getData = await signInWithPopup(auth, providerGoogle)
        const datas = {
            displayName: getData.user.displayName
            , email: getData.user.email, photoURL: getData.user.photoURL
            , providerId: getData.providerId

        }
        handleLoginWithAouth02(datas, "google")
    }
    const signInFaceBook = async () => {
        const getData = await signInWithPopup(auth, providerFacebook)
        const datas = {
            displayName: getData.user.displayName
            , email: getData.user.email, photoURL: getData.user.photoURL
            , provider: getData.providerId

        }
        handleLoginWithAouth02(datas, "facebook")
    }
    const signInGitHub = async () => {
        const getData = await signInWithPopup(auth, providerGithub)
        const datas = {
            screenName: getData._tokenResponse
                .screenName
            , email: getData._tokenResponse
                .email, photoUrl: getData.user.photoURL
            , providerId: getData.providerId

        }
        handleLoginWithAouth02(datas, "github")
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
                    <div className={cx('header')}>
                        <Link to={Configroutes.root}>
                            <img className={cx('logo')} src={LE} alt='logo' />
                        </Link>
                        <h1 className={cx('title')}>Đăng ký tài khoản LE
                        </h1>
                    </div>
                    <div className={cx('body')}>
                        {state ? (<div className={cx('main-step')}>
                            <div className={cx('sigin-button')} onClick={handleState}>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                <span className={cx('text')}>Sử dụng email</span>
                            </div>

                            <div className={cx('sigin-button')} onClick={signInGoogle}>
                                <FontAwesomeIcon className={cx('icon')} icon={faGoogle} />
                                <span className={cx('text')}>Tiếp tục với Google</span>
                            </div>

                            <div className={cx('sigin-button')} onClick={signInFaceBook}>
                                <FontAwesomeIcon className={cx('icon')} icon={faFacebook} />
                                <span className={cx('text')}>Tiếp tục với FaceBook</span>
                            </div>

                            <div className={cx('sigin-button')} onClick={signInGitHub}>
                                <FontAwesomeIcon className={cx('icon')} icon={faGithub} />
                                <span className={cx('text')}>Tiếp tục với GitHub</span>
                            </div>
                        </div>) : (<form>
                            <div className={cx('formBody')} id='form' >

                                <div className={cx('form-content')} id='form-content'>
                                    <div className={cx('input-content')}>
                                        <div className={cx('labelGroup')}>
                                            <label className={cx('label')}>Họ và tên</label>
                                        </div>
                                        <div className={cx('inputGroup')}>

                                            <input
                                                placeholder='Nhập họ và tên'
                                                name='fullname'
                                                id='fullname'
                                                type='text'
                                                onBlur={onBlurName}
                                                onChange={onChangeName}

                                            />

                                        </div>
                                        <span className={cx('message')} id='form-error'>{validateMsg.name}</span>

                                    </div>

                                </div>
                                <div className={cx('form-contentR')}>
                                    <div className={cx('input-content')}>
                                        <div className={cx('labelGroup')}>
                                            <label className={cx('label')}>Email</label>

                                        </div>
                                        <div className={cx('inputGroup')}>
                                            <input
                                                placeholder='Nhập email'
                                                name='email'
                                                id='email'
                                                type='email'
                                                autoComplete='email'
                                                onBlur={onBlurEmail}
                                                onChange={onChangeEmail}
                                            // onInput={handleInput}
                                            />

                                        </div>
                                        <span className={cx('message')} id='form-error'>{validateMsg.email}</span>


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
                                                id='password'
                                                type='password'
                                                autoComplete='new-password'
                                                onBlur={onBlurPass}
                                                onChange={onChangePass}
                                            />

                                        </div>
                                        <span className={cx('message')} id='form-error'>{validateMsg.pass}</span>

                                    </div>

                                </div>
                                <div className={cx('form-contentR')}>
                                    <div className={cx('input-content')}>
                                        <div className={cx('labelGroup')}>
                                            <label className={cx('label')}> Xác nhận mật khẩu</label>

                                        </div>
                                        <div className={cx('inputGroup')}>

                                            <input
                                                placeholder='Nhập lại mật khẩu'
                                                name='new-password'
                                                id='new-password'
                                                type='password'
                                                autoComplete='new-password'
                                                onBlur={onBlurPrePass}
                                                onChange={onChangeRePass}
                                            />

                                        </div>
                                        <span className={cx('message')} id='form-error'>{validateMsg.rePass}</span>

                                    </div>

                                </div>
                                <Button primary onClick={hanldSubmit} className={cx('sumbnt')} disable={disButton} id='bnt-submit'>
                                    <div className={cx('inner', 'module-inner')}><span className={cx('module-text')}>Đăng ký</span></div>
                                </Button>
                            </div>
                        </form>)}
                        <p className={cx('noAccount')}>
                            Bạn đã có tài khoản?
                            <Link to={Configroutes.Login}>Đăng nhập</Link>
                        </p>
                        <span className={cx('message')} style={{ fontSize: '2rem', fontWeight: '700' }}>{errMessageOauth}</span>
                    </div>
                </div>
                <div className={cx('about')}>
                    <Link target='_blank' to={Configroutes.Introduce}>Giới thiệu về LE</Link>
                    <span>|</span>
                    <Link target='_blank' to={Configroutes.Contact}>Liên hệ</Link>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>)
}
export default Register