import {Box, Button, FormControl, Typography} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";
import {fetchURI, token} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {badAnswersInc, correctAnswerInc} from "../store/slices/answerSlice";

export default function QuizStartSelect(props) {
    const [disableForm, setDisableForm] = useState(false)
    const [currentChoice, setCurrentChoice] = useState('')
    const userID = useSelector((state) => state.user.id)
    const dispatcher = useDispatch()

    const handleConfirm = (e) => {
        const axios = require('axios').default
        axios.post(fetchURI.quiz + props.quizID + "/submit", {
            data: {
                question_id: props.data.id,
                answer: currentChoice,
                user_id: userID
            }
        }, {
            headers: {
                "X-Access-Token": token
            }
        })
            .then((response) => {
                if (response.data.correct) {
                    dispatcher(correctAnswerInc())
                }
                if (!response.data.correct) {
                    dispatcher(badAnswersInc())
                }
            }).catch((e) => {
            console.log(e)
        })
        setDisableForm(true)
        e.preventDefault()
    }
    return (
        <FormControl noValidate
                     sx={{width: "100%"}}>
            <Typography
                margin="normal"
                required
                sx={{mb: 1}}
            >{props.data.question}
            </Typography>
            <Box sx={{display: "flex", flexDirection: "row"}}>
                <Select
                    labelId="answerLabel"
                    id="answerLabel"
                    variant={"outlined"}
                    defaultValue={""}
                    value={currentChoice}
                    onChange={(e, obj) => {setCurrentChoice(obj.props.value)}}
                    sx={{width: "85%"}}
                    disabled={disableForm}
                >
                    {props.data.answers.map((answer) =>
                        <MenuItem
                            key={answer + Date.toLocaleString()}
                            value={answer}>{answer}
                        </MenuItem>)}
                </Select>
                <Button sx={{color: "teal"}} onClick={handleConfirm} disabled={disableForm}>Confirm</Button>
            </Box>
        </FormControl>)
}