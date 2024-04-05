
import classNames from 'classnames/bind'
import styles from './CourseItem.module.scss'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)
function CourseItem({ data }) {
    return (
        <Link className={cx('wrapper')} to={"/courses/" + data.slug}>
            <div className={cx('avatar')}>
                <img src={data.image} alt={data.name} />
            </div>
            <span>{data.name}</span>
        </Link>
    )
}
export default CourseItem