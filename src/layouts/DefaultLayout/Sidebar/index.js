import classNames from "classnames/bind"
import styles from './Sidebar.module.scss'
import { menuItems, navLinkStyle } from "./menuItems"
import Tippy from '@tippyjs/react/headless'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)


function Sidebar() {

    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const handleHidden = () => setShow(false)
    const handleShow = () => {
        setShow(!show)
    }

    return <div className={cx('wrapper-sidebar')}>
        <div className={cx('wrapper')}>
            <div>
                <Tippy
                    interactive
                    visible={show} onClickOutside={handleHidden}
                    placement='bottom-end'
                    render={attrs => (
                        <div onClick={() => {
                            setShow(!show)
                            navigate({
                                pathname: '/newPost'
                            })
                        }} className={cx('bell', show ? ('') : ('closing'))} tabIndex="-1"{...attrs} >
                            <button>
                                <em className={cx('icon')}><FontAwesomeIcon icon={faPencil} /></em>
                                <span className={cx('text-icon')}>Viết Bài</span>
                            </button>
                        </div>
                    )}>
                    <div onClick={handleShow} className={cx('Button-wrapper', show ? ('bnt-open') : (''))}>
                        <FontAwesomeIcon className={cx('bnt-plus')} icon={faPlus} />
                    </div>
                </Tippy>

            </div>
            <nav>
                <ul className={cx('side-list')} >
                    {
                        menuItems.map((item, index) => (
                            <li key={index}>
                                <NavLink style={navLinkStyle} to={item.path} className={cx('sidebar-item')} >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>

        </div>
    </div>
}

export default Sidebar