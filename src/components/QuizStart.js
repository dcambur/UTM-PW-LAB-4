import CssBaseline from "@mui/material/CssBaseline";
import React, {useEffect, useState} from "react";
import {Box, Container, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate, useSearchParams} from "react-router-dom";
import {fetchURI, routes, token} from "../utils/constants";
import QuizStartSelect from "./QuizStartSelect";
import {useSelector, useDispatch} from "react-redux";
import {clearAnswers} from "../store/slices/answerSlice";


export default function QuizStart() {
    const [quizData, setQuizData] = useState(null)
    const [searchParams] = useSearchParams()
    const answers = useSelector((state) => state.answers)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const axios = require('axios').default
        axios.get(fetchURI.quiz + searchParams.get("id"), {
            headers: {
                "X-Access-Token": token
            }
        })
            .then((response) => {
                setQuizData(response.data)
            }).catch((err) => {
            console.log(err);
        })
    }, [searchParams])

    const handleQuestionDelete = (e) => {
        const axios = require('axios').default
        axios.delete(fetchURI.quiz + quizData.id.toString(), {
            headers: {
                "X-Access-Token": token
            }
        })
            .then(() => {
                dispatch(clearAnswers())
                navigate(routes.quiz.list)
                }
            ).catch((err) => {
            console.log(err);
        })

    }


    if (quizData === null) {
        return <>Still loading...</>;
    } else {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box component={"form"}
                     sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         marginTop: 6
                     }}
                >
                    <Box sx={{
                        display: "flex", flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        mt: 1
                    }}>
                        {quizData.questions.map((data) => <QuizStartSelect quizID={quizData.id} key={data.id}
                                                                           data={data}/>)}
                    </Box>
                    <Button variant="contained"
                            type={"submit"}
                            form={"selectForm"}
                            sx={{bgcolor: "teal"}}
                            size={"small"}
                            onClick={handleQuestionDelete}>
                        Delete Quiz
                    </Button>
                    <Box sx={{display: "flex", flexDirection: "row", gap:16}}>
                        <Typography>Correct Answers: {answers.correctAnswers}</Typography>
                        <Typography>Bad Answers: {answers.badAnswers}</Typography>
                    </Box>
                </Box>
            </Container>)
    }
}