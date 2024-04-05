import classNames from "classnames/bind"
import styles from './NewFeed.module.scss'
import { useContext } from "react";
import { StoreContext } from '../../../store'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faBullhorn } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)


function NewFeedButton() {
    const context = useContext(StoreContext)
    return (<div className={cx('wapper')}>
        <button onClick={context.handleShow} className={cx('button')}>
            <span className={cx('icon')}>
                <FontAwesomeIcon icon={faBullhorn} />
            </span>
        </button>
    </div>)
}

export default NewFeedButton