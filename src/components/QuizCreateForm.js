import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {Box, Chip, Fab, FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch} from "react-redux";
import {questionAdd, titleAdd} from "../store/slices/quizSlice";
import Button from "@mui/material/Button";

export default function QuizCreateForm(title) {
    const dispatcher = useDispatch()
    const [question, setQuestion] = useState('')
    const [possibleAnswersID, setPossibleAnswersID] = useState(0)
    const [possibleChoice, setPossibleChoice] = useState('')
    const [quizPossibleAnswers, setQuizPossibleAnswers] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [blockAnswer, setBlockAnswer] = useState(true)
    const [blockPossibleAnswers, setBlockPossibleAnswers] = useState(false)
    const [blockQuestion, setBlockQuestion] = useState(false)
    const [blockConfirm, setBlockConfirm] = useState(false)
    useEffect(
        () => {
            if (quizPossibleAnswers.length < 1) {
                setBlockAnswer(true)
            } else {
                setBlockAnswer(false)
            }

        },
        [quizPossibleAnswers])

    const handleChoiceAdd = (question) => {
        setQuizPossibleAnswers((prevState) => [...prevState, {
            question: question,
            id: possibleAnswersID
        }])
        setPossibleAnswersID((prevState => prevState + 1))
    }

    const handlePossibleChoiceChange = (e) => {
        setPossibleChoice(e.target.value)
    }
    const handleDelete = (id) => {
        setQuizPossibleAnswers((prevState) => prevState.filter(function (value) {
            return value.id !== id
        }))
    }

    const handleCorrectAnswerChange = (e) => {
        setCorrectAnswer(e.target.value)
    }

    const questionChangeHandler = (e) => {
        setQuestion(e.target.value)
    }

    const handleQuestionConfirm = (e) => {
        const getPossibleAnswersValue = () => {
            const list = []
            for (let quiEle in quizPossibleAnswers) {
                list.push(quizPossibleAnswers[quiEle].question)
            }
            return list
        }

        const getQuestions = () => {
            return {
                question: question,
                answers: getPossibleAnswersValue(),
                correct_answer: correctAnswer
            }
        }
        dispatcher(titleAdd(title.title))
        dispatcher(questionAdd(getQuestions()))
        setBlockAnswer(true)
        setBlockQuestion(true)
        setBlockPossibleAnswers(true)
        setBlockConfirm(true)
        setQuizPossibleAnswers([])
        e.preventDefault()
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box component={"form"}
                 sx={{
                     display: 'flex',
                     flexDirection: 'column',
                 }}
            >
                <TextField
                    margin="normal"
                    required
                    id="question"
                    label="Question"
                    name="question"
                    autoComplete="question"
                    disabled={blockQuestion}
                    onChange={questionChangeHandler}
                    autoFocus
                    sx={{width: "85%"}}
                />
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "no-wrap",
                    alignItems: "center",
                    gap: 1
                }}>
                    <TextField
                        margin="normal"
                        required
                        value={possibleChoice}
                        onChange={handlePossibleChoiceChange}
                        id="possibleAnswer"
                        label="Possible Answer"
                        name="possibleAnswer"
                        autoComplete="possibleAnswer"
                        autoFocus
                        sx={{width: "85%"}}
                        disabled={blockPossibleAnswers}
                    />
                    <Fab size={"small"} color={"primary"} onClick={() => handleChoiceAdd(possibleChoice)}>
                        <AddIcon/>
                    </Fab>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexBasis: "auto",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: 1
                }}>
                    {quizPossibleAnswers.map((answer) =>
                        <Chip key={answer.id} label={answer.question} variant="outlined"
                              onDelete={() => handleDelete(answer.id)}/>)}
                </Box>
                <Box sx={{display: "flex", flexDirection: "row", marginTop: 2}}>
                    <FormControl sx={{width: "85%"}}>
                        <InputLabel id="answerLabel">Answer</InputLabel>
                        <Select
                            labelId="answerLabel"
                            id="answerLabel"
                            label="Answer"
                            value={correctAnswer}
                            onChange={handleCorrectAnswerChange}
                            defaultValue={""}
                            disabled={blockAnswer}
                        >
                            {quizPossibleAnswers.map((answers) =>
                                <MenuItem key={answers.id}
                                          value={answers.question}>{answers.question}
                                </MenuItem>)}
                        </Select>
                    </FormControl>
                    <Button variant="contained"
                            sx={{bgcolor: "teal"}}
                            size={"small"}
                            onClick={handleQuestionConfirm}
                            disabled={blockConfirm}>
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}