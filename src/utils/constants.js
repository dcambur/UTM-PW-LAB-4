export const pathRoot = "/"

export const routes = {
    login: pathRoot + "login",
    register: pathRoot + "register",
    landing: pathRoot + "landing",
    quiz: {
        list: pathRoot + "quiz/list",
        about: pathRoot + "quiz/about",
        start: pathRoot + "quiz/start",
        create: pathRoot + "quiz/create"
    }
}
export const token = "0c65824dc9e9afdf9877f8f6d4caca5c3dd7d6f2f991f6986ac8e405798b3ddf"

export const fetchDomain = "https://pure-caverns-82881.herokuapp.com/api/v54/"
export const fetchURI = {
    user: fetchDomain + "users/",
    quiz: fetchDomain + "quizzes/"
}

export const landing = {
    title: "Welcome To The Brain.org!",
    body:
        `
            This is a simple frontend quiz application.
            Tech stack mainly consists of
            React, Redux and MaterialUI.
            Application implements simple CRUD to handle quiz
            creation/deletion and auth via redux-persist
        `
}
