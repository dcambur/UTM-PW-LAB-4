import React, {useState} from "react";
import {axios} from "axios";
import {fetchURI, routes, token} from "../utils/constants";

import QuizCreateForm from "./QuizCreateForm";
import {Box, Button, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {questionClear} from "../store/slices/quizSlice";
import {useNavigate} from "react-router-dom";

export default function QuizCreate() {
    const navigate = useNavigate()
    const dispatcher = useDispatch()
    const [questionCounter, setQuestionCounter] = useState(1)
    const questions = useSelector((state) => state.questions)
    const [title, setTitle] = useState('')

    const handleQuestionAdd = (e) => {
        setQuestionCounter((prevState => prevState + 1))
        e.preventDefault()
    }

    const handleSubmitClick = (e) => {
        const axios = require('axios').default
        axios.post(fetchURI.quiz, {
            data: questions
        }, {
            headers: {
                "X-Access-Token": token
            }})
            .then(() => {
                dispatcher(questionClear())
                navigate(routes.quiz.list)
            }).catch(() => {
            navigate(routes.quiz.list)

        })
        e.preventDefault()

    }

    const titleChangeHandler = (e) => {
        setTitle(e.target.value)
    }

    return (
        <Box sx={{
            display: "flex",
            gap: 2,
            marginTop: 6,
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
        }}>
            <Typography component="h1" variant="h5" sx={{mr: 8}}>Create Quiz</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "no-wrap",
                mr: 7,
            }}>
                <TextField
                    margin="normal"
                    required
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    onChange={titleChangeHandler}
                    autoFocus
                    sx={{width: 338}}
                />
            </Box>
            { [...Array(questionCounter)].map((e, i) => <QuizCreateForm key={i} title={title}/> )}
            <Box sx={{
                display: "flex", flexWrap: "wrap", gap: 1,
                mr: 4
            }}>
                <Button
                    variant="contained"
                    sx={{bgcolor: "teal"}}
                    onClick={handleQuestionAdd}
                >
                    Add Question
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{bgcolor: "teal"}}
                    onClick={handleSubmitClick}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    )

}