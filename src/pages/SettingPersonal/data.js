import ConfigRoutes from '../../config/routes'
import { faShield, faUser } from '@fortawesome/free-solid-svg-icons';

export const navLinkStyle = ({ isActive }) => {
    return {
        backgroundColor: isActive ? ("rgb(255 215 140)") : "",
        color: isActive ? ("rgb(0,0,0)") : "",
    }
}

export const dataRouteProfiles = [
    {
        route: ConfigRoutes.setting,
        icon: faUser,
        discp: 'Cài đặt tài khoản'
    },
    {
        route: ConfigRoutes.Security,
        icon: faShield,
        discp: 'Đăng nhập và bảo mật'
    }

]