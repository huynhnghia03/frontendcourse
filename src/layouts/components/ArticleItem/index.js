
import classNames from 'classnames/bind'
import styles from './ArticleItem.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)
function ArticleItem({ data }) {
    return (
        <Link className={cx('wrapper')} to={"/disscus/" + data.slug}>
            <div className={cx('avatar')}>
                {data.image ?
                    <img src={process.env.REACT_APP_BACKEND_URL + '/' + data.image} alt={data.Title} /> :
                    data.user?.provider ? <img src={data.user?.avatar} alt={data?.Title} /> :
                        data.user?.avatar ? (<img src={process.env.REACT_APP_BACKEND_URL + '/user/' + data.user?.nickname + '/' + data.user?.avatar} alt={data.user?.Username} />) : (

                            <img src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={data.user?.Username} />
                        )
                }
            </div>
            <span>{data.Title}</span>
        </Link>
    )
}
export default ArticleItem