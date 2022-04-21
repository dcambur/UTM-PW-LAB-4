import './App.css';
import Navigation from "./components/Navigation";
import {Route, Routes, Navigate} from "react-router-dom"
import Register from "./components/Register";
import Login from "./components/Login";
import Landing from "./components/Landing";
import {useSelector} from "react-redux";
import {routes, pathRoot} from './utils/constants'
import Copyright from "./components/Copyright";
import React from "react";
import QuizCreate from "./components/QuizCreate";
import QuizList from "./components/QuizList";
import QuizStart from "./components/QuizStart";
import Player from "./components/Player";

function App() {
    const user = useSelector(state => state.user);

    const navigateTo = (navigationPath, componentToRender) => {
        return <Navigate to={navigationPath}>{componentToRender}</Navigate>
    }

    return (
        <div className={"app"}>
            <Navigation/>
            <Routes>
                <Route path={pathRoot}
                       element={navigateTo(routes.landing, <Landing/>)}/>
                <Route path={routes.register}
                       element={(user.isLogged) ?
                           navigateTo(routes.landing, <Landing/>) : <Register/>}/>
                <Route path={routes.login}
                       element={(user.isLogged) ?
                           navigateTo(routes.landing, <Landing/>) : <Login/>}/>
                <Route path={routes.landing}
                       element={(user.isLogged) ?
                           <Landing/> : navigateTo(routes.login, <Login/>)}/>}/>
                <Route path={routes.quiz.create}
                       element={(user.isLogged) ?
                           <QuizCreate/> : navigateTo(routes.login, <Login/>)}/>}/>
                <Route path={routes.quiz.list}
                       element={(user.isLogged) ?
                           <QuizList/> : navigateTo(routes.login, <Login/>)}/>}/>
                <Route path={routes.quiz.start}
                       element={(user.isLogged) ?
                           <QuizStart/> : navigateTo(routes.login, <Login/>)}/>}/>

            </Routes>
            <Player src={"/camellia.mp3"}/>
            <Copyright sx={{mt: 3, mb: 4}}/>
        </div>
    );
}

export default App;
