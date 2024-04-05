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
    SET_ERROR
} from './constance'

export const setYoutubeURL = payload => {
    return {
        type: SET_YOUTUBE_URL,
        payload
    }
}
export const setLinkURl = payload => {
    return {
        type: SET_LINKIN_URL,
        payload
    }
}
export const setInstargamURL = payload => {
    return {
        type: SET_INSTARGAM_URL,
        payload
    }
}
export const setTwitterURL = payload => {
    return {
        type: SET_TWITTER_URL,
        payload
    }
}
export const setGoogle = payload => {
    return {
        type: SET_GOOGLE,
        payload
    }
}
export const setFacebook = payload => {
    return {
        type: SET_FACEBOOK,
        payload
    }
}

export const setPhone = payload => {
    return {
        type: SET_PHONE,
        payload
    }
}

export const setValuePhone = payload => {

    if (!payload) {
        return {
            type: SET_PHONE_VALUE,
            payload: ""
        }
    }
    return {
        type: SET_PHONE_VALUE,
        payload
    }
}
export const setOTP = payload => {

    if (!payload) {
        return {
            type: SET_OTP,
            payload: ""
        }
    }
    return {
        type: SET_OTP,
        payload: payload.trim()
    }
}
export const setMessgaeError = payload => {
    return {
        type: SET_ERROR,
        payload
    }
}
export const setTime = payload => {
    return {
        type: SET_TIME,
        payload
    }
}