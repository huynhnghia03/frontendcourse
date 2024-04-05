import classNames from 'classnames/bind'
import styles from './Bell.module.scss'
import Tippy from '@tippyjs/react/headless'
import { useState } from 'react'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const cx = classNames.bind(styles)

function Bell() {
    const [bell, setBell] = useState(false);
    const showBell = () => setBell(true);
    const hideBell = () => setBell(false);
    return (
        <Tippy
            interactive
            visible={bell} onClickOutside={hideBell}
            placement='bottom-end'
            render={attrs => (
                <div className={cx('bell')} tabIndex="-1" {...attrs}>
                    <div className={cx('bell-heading')}>
                        <h6>THÔNG BÁO</h6>
                    </div>
                    <div className={cx('bell-content')}>
                        <p>Chưa có thông báo nào</p>
                    </div>

                </div>
            )}>
            <div onClick={!bell ? showBell : hideBell} className={cx('bell-icon')} >
                <FontAwesomeIcon icon={faBell} />
            </div>
        </Tippy>
    )
}
export default Bell