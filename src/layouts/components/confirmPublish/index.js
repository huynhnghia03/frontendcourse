
import classNames from "classnames/bind"
import styles from './confirmPublish.module.scss'
import { LE } from '../../../assets/image'
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useReducer, useRef, memo } from "react";
import Button from "../Button";
import { updateSavePublishedBlog } from "../../../API/blogRequest";
import { useNavigate, useParams } from "react-router-dom";
const cx = classNames.bind(styles)

//intial 
const initial = {
    error: false,
    tag: '',
    tags: []
}
// action
const TAG = 'tag'
const ERROR = 'error'
const SET_TAG = 'set_tag'
const DELETE_TAG = 'delete_tag'

const setValueTag = payload => {
    return {
        type: TAG,
        payload
    }
}
const setTag = payload => {
    return {
        type: SET_TAG,
        payload
    }
}
const deleteTag = payload => {
    return {
        type: DELETE_TAG,
        payload
    }
}

//reducer
const reducer = (state, action) => {
    switch (action.type) {
        case TAG:
            return { ...state, tag: action.payload }
        case ERROR:
            return { ...state, error: action.payload }
        case SET_TAG:
            return { ...state, tags: [...state.tags, action.payload] }
        case DELETE_TAG:
            const newTags = [...state.tags]
            newTags.splice(action.payload, 1)
            return { ...state, tags: [...newTags] }
        default:
            throw new Error("Invalid case")
    }
}


function ConfirmPublish({ activePublish, setActivePublish, valueTitle }) {
    const [contentTitle, setContentTitle] = useState('')
    const [contentDescription, setContentDescription] = useState('')
    const [file, setFile] = useState('')
    const [interTag, dispatch] = useReducer(reducer, initial)
    const { error, tag, tags } = interTag
    const navigate = useNavigate()
    const { id } = useParams()
    // const [tags, setTags] = useState([])
    // const [tag, setTag] = useState([])
    console.log(tags, valueTitle)
    const fileInputRef = useRef()


    const handleKeyDown = (e) => {
        // Prevent Enter key from creating a new line
        console.log('render1', e.key)
        if (e.key === 'Enter') {
            e.preventDefault();
        }

    };
    const handleKeyDownTag = (e) => {
        // Prevent Enter key from creating a new line
        if (e.key === ',' || e.key === 'Enter') {
            e.preventDefault()
            const checkSame = tags.find((val) => val === tag)
            console.log(checkSame)
            if (tag && !checkSame) {
                dispatch(setTag(tag))
                dispatch(setValueTag(''))
            } else if (checkSame) {
                dispatch({ type: ERROR, payload: true })
            }

        }
    };
    const handleInput = (e, cal, value, number) => {
        const inputValue = e.target.textContent;
        // Limit the content to 160 characters
        if (inputValue.length <= number) {
            cal(inputValue);
        } else {
            // Truncate the content if it exceeds 160 characters
            e.target.textContent = value;
            // e.preventDefault();

        }
    }
    const handleInputTag = (e) => {
        // console.log(e.target.value)
        console.log('render4')
        dispatch(setValueTag(e.target.value))
        dispatch({ type: ERROR, payload: false })
    }

    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file.preview)
        }
    }, [file])
    useEffect(() => {
        if (valueTitle) {
            setContentTitle(valueTitle)
        }
    }, [valueTitle])
    const handlePreviewImage = (e) => {
        const input = e.target
        const selectedFile = input.files[0]
        console.log('render3', selectedFile)
        if (!selectedFile) {
            setFile('')
            return
        }
        input.value = ""
        selectedFile.preview = URL.createObjectURL(selectedFile)
        setFile(selectedFile)
    }

    const handlePublisedBlog = async (id) => {
        try {
            const newTags = tags.map((val) => ({ name: val }))
            let format = new FormData()
            format.append("image", file)
            format.append('Title', contentTitle)
            format.append('meta_description', contentDescription)
            format.append('Tag', JSON.stringify(newTags))
            const { data } = await updateSavePublishedBlog(id, format)
            if (data.success === 1) {
                //do something else
                toast.update(toast.loading("Đang xử lý..."), { render: "Xuất bản thành công", type: "success", position: "top-center", isLoading: false, autoClose: 1500 });
                setTimeout(() => {
                    navigate({
                        pathname: '/disscus/' + data.data.slug + ''
                    })

                }, 2500)
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

    return activePublish ? <><div>
        <div className={cx("wrapper")}>
            <div className={cx("overlay")}>
                <img className={cx('logo')} src={LE} alt="LE" />
            </div>
            <section className={cx('module-grid', 'module-wide')} style={{
                maxWidth
                    : '1280px'
            }}>
                <div className={cx('back-wrapper')}></div>
                <button onClick={() => setActivePublish(false)} className={cx('logout-bnt')}>
                    <span><FontAwesomeIcon icon={faXmark} /></span>

                </button>
                <div className={cx('container')}>
                    <div className={cx('wellcome-wrapper')}>
                        <div className={cx('wellcome-main')}>
                            <div className={cx('wellcome-left')}>
                                <h3>Xem trước</h3>

                                <div role="button" tabIndex="0" onClick={() => {
                                    if (fileInputRef.current) {
                                        fileInputRef.current.click()
                                    }
                                }} className={cx('previewImage')} style={file ? { backgroundImage: "url(" + file.preview + ")" } : {}} >
                                    <input type="file" ref={fileInputRef} accept="image/*" tabIndex='-1' onChange={handlePreviewImage} style={{ display: "none" }} />
                                    <p>Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút hơn với độc giả.</p>
                                    <span>Nhấn vào để tải ảnh lên</span>
                                </div>
                                <div className={cx('Title')} data-empty-text="Tiêu đề hiển thị" suppressContentEditableWarning={true} contentEditable='true' onKeyDown={handleKeyDown} onInput={(e) => handleInput(e, setContentTitle, contentTitle, 100)}>{valueTitle}</div>
                                <div className={cx('description')} data-empty-text="Mô tả nội dung hiển thị" suppressContentEditableWarning={true} contentEditable onKeyDown={handleKeyDown} onInput={(e) => handleInput(e, setContentDescription, contentDescription, 160)}></div>
                                <p><strong>Lưu ý:</strong> Chỉnh sửa tại đây sẽ thay đổi cách bài viết được hiển thị tại trang chủ, tin nổi bật - Chứ không ảnh hưởng tới nội dung bài viết của bạn.</p>
                            </div>
                            <div className={cx('wellcome-right')}>
                                <div className={cx('select-tag')}>
                                    <span className={cx('tutorial')}>Thêm thẻ để độc giả biết bài viết của bạn nói về điều gì. (Tối đa 5 thẻ)</span>
                                    <div className={cx('wrapperInput-tag', error ? 'showerror' : "")}>
                                        {tags?.length > 0 ? tags.map((val, ind) => <div key={'tag' + val} className={cx('tag')}>
                                            <span>{val}</span>
                                            <button onClick={() => dispatch(deleteTag(ind))}>🗙</button>
                                        </div>) : ""}

                                        <input className={cx('input-tag')} disabled={tags.length === 5} value={tag} onKeyDown={handleKeyDownTag} onInput={handleInputTag} placeholder="Ví dụ: Front-end, ReactJS, UI, UX" />
                                    </div>
                                    {error ? <div className={cx('error')}>Bạn đã thêm thẻ này rồi</div> : ""}
                                </div>
                                <div className={cx('wellcome-button-wrapper')}>
                                    <Button onClick={() => handlePublisedBlog(id)} primary>Đăng bài ngay</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div><ToastContainer /></> : ""

}

export default memo(ConfirmPublish)