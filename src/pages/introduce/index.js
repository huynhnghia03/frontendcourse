import styles from './introduce.module.scss'
import classNames from "classnames/bind";
import { LE, robot } from '../../assets/image'
import Button from '../../layouts/components/Button';
import ConfigRoutes from '../../config/routes'
const cx = classNames.bind(styles)

function Introduce() {
    return <section className={cx('module-grid', 'module-fullwidth')} style={{ style: 'max-width: 1920px;' }}>

        <div className={cx('wrapper-content', 'text-content')}>
            <section className={cx('module-grid', 'module-wide')} style={{ maxWidth: '1100px' }}>
                <section className={cx('module-row')}>
                    <section className={cx('module-col', 'module-c-12', 'module-m-4', 'module-l-3', 'res-module')}>
                        <img className={cx('first-img')} src={LE} alt='Giới thiệu về LE' />
                    </section>
                    <section className={cx('module-col', 'module-c-12', 'module-m-4', 'module-l-3', 'res-module')}>
                        <div className={cx('intro-text')}>
                            <h1 className={cx('heading')}> BẠN CÓ BIẾT</h1>
                            <p>Với dự án này LE đã rất tâm quyết sẽ tạo ra một môi trường với tất cả các kiến thức, trải nghiệm mới mẽ, hữu ích để cho người dùng có thể tìm hiểu những kiến thức chưa biết hay là đã biết nhưng chưa tường tận.</p>
                            <p>Làm với hết khả năng của mình chia sẽ một cách cụ thể, chi tiết nhất giúp người cùng có thể tiếp thu một cách tốt nhất cho dù các khóa học là miễn phí hay mất phí</p>

                        </div>

                    </section>
                    <section className={cx('module-col', 'module-c-12', 'module-m-4', 'module-l-12')}>
                        <div className={cx('intro-textsecond')}>
                            <p>LE mong muốn trở thành một website đông thời là một tổ chức góp phần tạo nên việc tạo ra cộng đồng học lập trình nói riêng và là điểm bất đầu của nhiều dự án tốt hơn trong tương lai. Chúng tôi đang nỗ lực tạo ra các khóa học có nội dung chất lượng vượt trội, giúp học viên sau khi hoàn thành khóa học có thể trở thành những lập trình viên luôn được nhiều công ty săn đón.</p>


                        </div>

                    </section>

                </section>
            </section>

        </div>
        <section className={cx('module-grid', 'module-wide')} style={{ maxWidth: '1100px' }}>
            <section className={cx('module-row')}>
                <section className={cx('module-col', 'module-c-12', 'module-m-4', 'module-l-12')}>
                    <div className={cx('text-content', 'goal')}>
                        <h2 className={cx('heading')}>TẦM NHÌN</h2>
                        <p>Sẽ trở thành một tổ chức công nghệ giáo dục có vị thế vững vàng trên thị trường, với các sản phẩm hỗ trợ học lập trình chất lượng, thông minh và hiệu quả.
                            LE sẽ làm nên tên tuổi bởi chất lượng sản phẩm vượt trội và được cộng đồng tin tưởng chứ không phải vì tiếp thị tốt.</p>
                        <h2 className={cx('heading')}>GIÁ TRỊ CỐT LỖI</h2>
                        <p>
                            <strong>Sự tử tế:</strong> Tử tế trong với chỉnh bản thân LE và tử tế với tất cả người dùng là kim chỉ nam phấn đấu. Đã làm sản phẩm là phải chất lượng và chứng minh được hiệu quả, bất kể là sản phẩm miễn phí hay giá rẻ. Làm như chính cho bản thân mình, người thân, gia đình mình sử dụng.
                        </p>
                        <p>
                            <strong>Tư duy số:</strong> Sản phẩm làm ra không phải là để vừa lòng bản thân của LE hay bất kì thành viên nào. Sản phẩm làm ra với mục tiêu cao nhất là người học thấy dễ học, được truyền cảm hứng tự học, học tới bài học cuối cùng và người học có thể tự tay làm ra những dự án bằng kiến thức đã học.
                        </p>
                        <p>
                            <strong>Luôn đổi mới và không ngừng học:</strong> Học từ chính đối thủ của mình, học từ những công ty công nghệ giáo dục tốt trên thế giới và luôn luôn lắng nghe mọi góp ý từ phía học viên.
                        </p>
                        <p>
                            <strong>Tư duy bền vững:</strong> Có hai thứ đáng để đầu tư giúp mang lại thành quả tài chính tốt nhất trong dài hạn của một trang web,tổ chức hay công ty đó là nhân viên và khách hàng.
                        </p>

                    </div>

                </section>

            </section>
        </section>
        <div className={cx('what-recieve')}>
            <section className={cx('module-grid', 'module-wide')} style={{ maxWidth: '1100px' }}>
                <section className={cx('module-row')}>
                    <section className={cx('module-col', 'module-c-12', 'module-m-4', 'module-l-12')}>
                        <div className={cx('content')}>
                            <h3 className={cx('heading')}>BẠN SẼ NHẬN ĐƯỢC GÌ?</h3>
                            <div className={cx('grid', 'text-content')}>
                                <div className={cx('grid-item')}>
                                    <h4 className={cx('heading')}>1. Sự thành thạo</h4>
                                    Các bài học đi đôi với thực hành, làm bài kiểm tra ngay trên trang web và bạn luôn có sản phẩm thực tế sau mỗi khóa học.
                                </div>
                                <div className={cx('grid-item')}>
                                    <h4 className={cx('heading')}>2. Tính tự học</h4>
                                    Một con người chỉ thực sự trưởng thành trong sự nghiệp nếu họ biết cách tự thu nạp kiến thức mới cho chính mình.
                                </div>
                                <div className={cx('grid-item')}>
                                    <h4 className={cx('heading')}>3. Tiết kiệm thời gian</h4>
                                    Thay vì chật vật vài năm thì chỉ cần 4-6 tháng để có thể bắt đầu công việc đầu tiên với vị trí Intern tại công ty IT.
                                </div>
                                <div className={cx('grid-item')}>
                                    <h4 className={cx('heading')}>4. Làm điều quan trọng</h4>
                                    Chỉ học và làm những điều quan trọng để đạt được mục tiêu đi làm được trong thời gian ngắn nhất.
                                </div>
                            </div>


                        </div>

                    </section>

                </section>
            </section>
        </div>
        <section className={cx('module-grid', 'module-wide')} style={{ maxWidth: '1100px' }}>
            <div className={cx('content-final')}>
                <div className={cx('info')}>
                    <h2>Đăng ký lộ trình</h2>
                    <p>Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học nhé.</p>
                    <Button fomal target='_blank' to={ConfigRoutes.pathLearning}>Đăng ký ngay</Button>
                </div>
                <div className={cx('image')}>
                    <img src={robot} alt='robot' />
                </div>
            </div>
        </section>
    </section>
}
export default Introduce