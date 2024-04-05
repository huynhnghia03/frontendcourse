
const routes = {
    root: '/',
    Learning: '/Learning/:slug',
    profile: '/@/:nickname',
    setting: '/setting/persional',
    Security: '/setting/Security',
    Notification: '/setting/Notification',
    pathLearning: '/Learning-paths',
    study: '/courses',
    introduceTopics: '/courses/:slug',
    manageCourses: '/admin/manage-courses',
    manageUsers: '/admin/manage-users',
    manageNewFeed: '/admin/manage-newFeed',
    Contact: '/contact',
    Introduce: '/Introduce',
    Login: '/Login',
    Register: '/Register',
    Discuss: '/disscus',
    DiscussDetail: '/disscus/:slug',
    OverBoarding: '/OverBoarding',
    BackEnd: '/Learning-paths/BackEnd',
    FrontEnd: '/Learning-paths/FrontEnd',
    English: '/Learning-paths/English',
    MyOnwCourse: '/MyCourse',
    DetailCourses: '/admin/manage-courses/:slug',
    ManageTopics: '/admin/manage-topics',
    NotFound: '/not-found',
    chatBox: '/chatBox',
    NewBlog: '/newPost',
    EditNewBlog: '/post/:id/blog',
    MyBlog: '/me/posts/:type',
    MyLoveBlog: '/me/bookMark/blogs'
}

export default routes