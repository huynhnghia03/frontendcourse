import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import styles from './Avatar.module.scss'
import Button from '../../Button'
import { useContext } from 'react'
import { StoreContext } from '../../../../store'
import ConfigRoutes from '../../../../config/routes'


const cx = classNames.bind(styles)

function Avatar({ children }) {

    const context = useContext(StoreContext)
    const handleLogout = () => {
        localStorage.removeItem('token')
        const data1 = { Username: null, email: null, admin: null, avatar: null }
        localStorage.setItem('currentUser', JSON.stringify(data1));
        window.location.href = '/login';
    }
    const user = JSON.parse(localStorage.getItem('currentUser'))


    return (
        <Tippy
            placement='bottom-end'
            interactive
            visible={context.avatar} onClickOutside={context.handleAvater}

            render={attrs => (
                <div className={cx('user')} tabIndex="-1" {...attrs}>
                    <div className={cx('wrapper')}>
                        <div className={cx('menu-user')}>
                            <div className={cx('avatar')}>
                                <div className={cx('avatar-child')}>
                                    {user?.provider ? <img src={user?.avatar} alt={user?.Username} /> :
                                        user?.avatar ? (<img src={process.env.REACT_APP_BACKEND_URL + '/user/' + user?.nickname + '/' + user?.avatar} alt={user?.Username} />) : (

                                            <img src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={user?.Username} />
                                        )}
                                </div>
                            </div>
                            <div className={cx('info')}>
                                <span className={cx('name')}>{user?.Username}</span>
                                <div className={cx('username')}>@{user.nickname}</div>
                            </div>
                        </div>
                        <hr />
                        <ul className={cx('details')} onClick={context.handleAvater}>
                            <li>
                                <Button className={cx('profile')} to={'/@/' + user.nickname}>Trang cá nhân</Button>
                            </li>

                        </ul>
                        <hr />
                        {user.admin && <>
                            <ul className={cx('details')} onClick={context.handleAvater}>
                                <li>
                                    <Button className={cx('profile')} to={ConfigRoutes.manageCourses}>Quản lý khóa học</Button>
                                </li>
                                <li>
                                    <Button className={cx('profile')} to={ConfigRoutes.manageUsers}>Quản lý user</Button>
                                </li>
                                <li>
                                    <Button className={cx('profile')} to={ConfigRoutes.manageNewFeed}>Quản lý bảng tin</Button>
                                </li>
                            </ul><hr /></>}
                        <ul className={cx('details')} onClick={context.handleAvater}>
                            <li>
                                <Button className={cx('profile')} to={ConfigRoutes.NewBlog}>Viết bài</Button>
                            </li>
                            <li>
                                <Button className={cx('profile')} to={'/me/posts/draft'}>Bài viết của tôi</Button>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('details')} onClick={context.handleAvater}>
                            <li>
                                <Button className={cx('profile')} to={ConfigRoutes.MyLoveBlog}>Bài viết đã lưu</Button>
                            </li>
                            <li>
                                <Button className={cx('profile')} to={ConfigRoutes.setting}>Cài đặt</Button>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('details')} onClick={context.handleAvater}>

                            <li>
                                <button className={cx('profile', 'bnt-logout')} onClick={handleLogout}>Đăng xuất</button>
                            </li>
                        </ul>


                    </div>
                </div>
            )}>

            {children}
        </Tippy>
    )
}
export default Avatar