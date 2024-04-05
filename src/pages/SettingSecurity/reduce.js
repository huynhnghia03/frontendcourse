import {
    SET_TIME,
    SET_YOUTUBE_URL,
    SET_LINKIN_URL,
    SET_INSTARGAM_URL,
    SET_TWITTER_URL,
    SET_PHONE,
    SET_PHONE_VALUE,
    SET_OTP,
    SET_GOOGLE,
    SET_FACEBOOK,
    SET_ERROR,
    YOUTUBE_URL,
    LINKIN_URL,
    INSTARGAM_URL,
    TWITTER_URL,
    PHONE,
    FRESHPHONE,
    COMFIRMPHONE,
    CAPCHA
} from './constance'
//inital
export const initialState = {
    youtube: false,
    linkin: false,
    instagram: false,
    twitter: false,
    phone: false,
    confirmPhone: false,
    refreshPhone: false,
    capcha: false,
    time: 0,
    // valueYoutube: "nghia",
    valueYoutube: JSON.parse(localStorage.getItem('currentUser'))?.youtube_url,
    valueLinkin: JSON.parse(localStorage.getItem('currentUser'))?.LinkIn_url,
    valueInstagram: JSON.parse(localStorage.getItem('currentUser'))?.instagram_url,
    valueTwitter: JSON.parse(localStorage.getItem('currentUser'))?.twitter_url,
    valuePhone: "",
    otp: "",
    errorMessage: "",
    google: JSON.parse(localStorage.getItem('currentUser'))?.oauths?.find((val) => val.provider === "google.com") || null,
    facebook: JSON.parse(localStorage.getItem('currentUser'))?.oauths?.find((val) => val.provider === "facebook.com") || null,
    numberPhone: JSON.parse(localStorage.getItem('currentUser'))?.oauths?.find((val) => val.provider === "phone") || null
}


//reducer
const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case YOUTUBE_URL:
            return { ...state, youtube: !state.youtube }
        case LINKIN_URL:
            return { ...state, linkin: !state.linkin }
        case INSTARGAM_URL:
            return { ...state, instagram: !state.instagram }
        case TWITTER_URL:
            return { ...state, twitter: !state.twitter }
        case PHONE:
            return { ...state, capcha: true, phone: action.payload }
        case FRESHPHONE:
            return { ...state, refreshPhone: action.payload }
        case COMFIRMPHONE:
            return { ...state, confirmPhone: action.payload }
        case CAPCHA:
            return { ...state, capcha: action.payload }
        case SET_TIME:
            return { ...state, time: action.payload }
        case SET_YOUTUBE_URL:
            return { ...state, valueYoutube: action.payload }
        case SET_LINKIN_URL:
            return { ...state, valueLinkin: action.payload }
        case SET_INSTARGAM_URL:
            return { ...state, valueInstagram: action.payload }
        case SET_TWITTER_URL:
            return { ...state, valueTwitter: action.payload }
        case SET_PHONE_VALUE:
            return { ...state, valuePhone: action.payload || "" }
        case SET_OTP:
            return { ...state, otp: action.payload || "" }
        case SET_GOOGLE:
            return { ...state, google: action.payload.find((val) => val.provider === "google.com") }
        case SET_FACEBOOK:
            return { ...state, facebook: action.payload.find((val) => val.provider === "facebook.com") }
        case SET_PHONE:
            return { ...state, numberPhone: action.payload.find((val) => val.provider === "phone") }
        case SET_ERROR:
            return { ...state, errorMessage: action.payload }
        default:
            throw new Error('Invalid action')
    }
}
export default reducer