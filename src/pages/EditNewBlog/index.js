import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { isEmpty } from 'validator'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MyEditorBlog from "../../layouts/components/Editor/Blogs";
import Button from '../../layouts/components/Button'
import styles from './editNewBlog.module.scss'
import ConfirmPublish from "../../layouts/components/confirmPublish";
import { getDetailBlogPrivate, updateBlog } from "../../API/blogRequest";
import { useDebounce } from "../../hooks";



const cx = classNames.bind(styles)



function NewBlog() {

    const [activePublish, setActivePublish] = useState(false)
    const [allowPost, setAllowPost] = useState(true)
    const [allowPublish, setAllowPublish] = useState(true)
    const [dataBlog, setDataBlog] = useState({})
    const [valueTitle, setValueTitle] = useState('')
    const [valueContent, setValueContent] = useState('')
    const { id } = useParams()
    const debounceTitle = useDebounce(valueTitle, 1000)
    const debounceContent = useDebounce(valueContent, 1000)
    const navigate = useNavigate()
    const handleKeyDown = (e) => {
        // Prevent Enter key from creating a new line
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
    console.log(debounceTitle)
    const handleInput = (e) => {
        const inputValue = e.target.textContent;
        // Limit the content to 160 characters
        if (inputValue.length <= 100) {
            setValueTitle(inputValue);

        } else {
            // Truncate the content if it exceeds 160 characters
            e.target.textContent = valueTitle;
            // e.preventDefault();

        }
    }
    useEffect(() => {

        if (debounceTitle === dataBlog.Title && debounceContent === dataBlog.content) {
            setAllowPublish(true)

        } else {
            setAllowPublish(false)
        }
        if (!isEmpty(debounceTitle) && !isEmpty(debounceContent)) {
            setAllowPost(false)

        } else {
            setAllowPost(true)
        }
        if ((debounceTitle !== dataBlog.Title || debounceContent !== dataBlog.content) && id) {
            handleEditBlog(debounceTitle, debounceContent, id)
        }
        // eslint-disable-next-line
    }, [debounceTitle, debounceContent, id])

    useEffect(() => {
        if (id) {
            getGetDataBlog(id)
        }
    }, [id])


    const getGetDataBlog = async (id) => {
        try {
            const { data } = await getDetailBlogPrivate(id)
            if (data.success === 1) {
                setDataBlog(data.data)
                setValueContent(data.data.content)
                setValueTitle(data.data.Title)
            }
        } catch {
            toast.error("Lỗi server", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })

        }

    }

    const handleEditBlog = async (title, content, id) => {
        try {
            if (!title.trim() && !content.trim()) {
                return
            } else {
                const datas = {
                    Title: title,
                    content: content,
                }

                const { data } = await updateBlog(id, datas)
                if (data.success === 1) {
                    setDataBlog(data.data)
                    setValueContent(data.data.content)
                    setValueTitle(data.data.Title)
                } else {
                    toast.warn(data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
            }
        } catch {
            toast.error("Lỗi server", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    const handleUpdate = async () => {
        try {

            const datas = {
                Title: debounceTitle,
                content: debounceContent,
            }

            const { data } = await updateBlog(id, datas)
            if (data.success === 1) {
                toast.update(toast.loading("Đang xử lý..."), { render: "Xuất bản thành công", type: "success", position: "top-center", isLoading: false, autoClose: 1500 });
                setTimeout(() => {
                    navigate({
                        pathname: '/disscus/' + data.data.slug + ''
                    })

                }, 2500)
            } else {
                toast.warn(data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }

        } catch {
            toast.error("Lỗi server", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    return <> <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1920px' }}>

        <div className={cx('wrapper-content')}>

            <div className={cx('content-top')} data-empty-text="Tiêu đề" suppressContentEditableWarning={true} contentEditable onKeyDown={handleKeyDown} onInput={handleInput}>{dataBlog.Title || ''}
            </div>

            <div className={cx('btn-top')}>
                {dataBlog.is_published ? <Button disable={allowPublish} disabled={allowPublish} primary onClick={handleUpdate}>Lưu và xuất bản</Button> :
                    <Button disable={allowPost} disabled={allowPost} primary onClick={() => setActivePublish(true)}>Đăng Bài</Button>
                }
            </div>
            <div className={cx('content-body')}>
                <MyEditorBlog setValueContent={setValueContent} valueContent={valueContent} activeImageInsert={true} valueOfContent={dataBlog.content} />
            </div>
        </div>
    </section>
        <ConfirmPublish activePublish={activePublish} setActivePublish={setActivePublish} valueTitle={debounceTitle} />
        <ToastContainer />
    </>
}
export default NewBlog