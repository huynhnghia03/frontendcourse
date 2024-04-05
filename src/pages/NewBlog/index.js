import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './newBlog.module.scss'
// import './newBlog.css'
import MyEditorBlog from "../../layouts/components/Editor/Blogs";
import Button from '../../layouts/components/Button'
import { createBlog } from "../../API/blogRequest";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks";
import { StoreContext } from "../../store";

const cx = classNames.bind(styles)



function NewBlog() {
    const [valueTitle, setValueTitle] = useState('')
    const [valueContent, setValueContent] = useState('')
    const navigate = useNavigate()
    const context = useContext(StoreContext)
    const debounceTitle = useDebounce(valueTitle, 1000)
    const debounceContent = useDebounce(valueContent, 1000)
    console.log(debounceContent, debounceTitle)
    const handleKeyDown = (e) => {
        // Prevent Enter key from creating a new line
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
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
        handleCreateBlog(debounceTitle, debounceContent)
        // eslint-disable-next-line
    }, [debounceTitle, debounceContent])

    const handleCreateBlog = async (title, content) => {
        try {
            if (!title.trim() && !content.trim()) {
                return
            } else {
                const datas = {
                    Title: title,
                    content: content,
                }
                context.setSaveInfoBlog({ ...datas })
                const { data } = await createBlog(datas)
                if (data.success === 1) {
                    navigate({
                        pathname: '/post/' + data.data._id + '/blog'
                    })
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

    return <> <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1920px' }}>

        <div className={cx('wrapper-content')}>

            <div className={cx('content-top')} data-empty-text="Tiêu đề" contentEditable onKeyDown={handleKeyDown} onInput={handleInput}>
            </div>

            <div className={cx('btn-top')}>
                <Button disable={true} disabled={true} primary>Đăng Bài</Button>
            </div>
            <div className={cx('content-body')}>
                <MyEditorBlog valueContent={valueContent} setValueContent={setValueContent} />
            </div>
        </div>
    </section>
        <ToastContainer />
    </>
}
export default NewBlog