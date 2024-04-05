import classNames from "classnames/bind"
import styles from './ChatBox.module.scss'


import { useContext } from "react"
import { StoreContext } from "../../../store"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faHeadset } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)


function ChatBox() {
    const context = useContext(StoreContext)

    return (<div className={cx('wapper')} >

        <button onClick={() => context.setShowChatBox(true)} className={cx('button')}>
            <span className={cx('icon')}>
                <FontAwesomeIcon icon={faHeadset} />
            </span>
        </button>



    </div>)
}

export default ChatBox