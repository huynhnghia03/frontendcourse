
import classNames from 'classnames/bind'
import styles from './VideoItem.module.scss'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)
function VideoItem({ data }) {
    return (
        <Link target='_blank' className={cx('wrapper')} to={"https://youtu.be/" + data.videoID} >
            <div className={cx('avatar')}>
                <img src={data.image} alt={data.name} />
            </div>
            <span>{data.name}</span>
        </Link>
    )
}
export default VideoItem