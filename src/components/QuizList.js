import {useEffect, useState} from "react";
import {fetchURI, token} from "../utils/constants";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import QuizShowDialog from "./QuizShowDialog";

export default function QuizList() {
    const [quizData, setQuizData] = useState([])
    const [actionRedraw, setActionRedraw] = useState()
    const [openDialog, setOpenDialog] = useState(false)
    const [currentTitle, setCurrentTitle] = useState("")
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(null)
    const [currentQuizID, setCurrentQuizID] = useState(null)

    useEffect(() => {
        const axios = require('axios').default
        axios.get(fetchURI.quiz, {
            headers: {
                "X-Access-Token": token
            }
        })
            .then((response) => {
                setQuizData(response.data)
            }).catch((err) => {
            console.log(err);
        })
    }, [actionRedraw])


    const clickView = (data) => {
        const axios = require('axios').default
        axios.get(fetchURI.quiz + data.id.toString(), {
            headers: {
                "X-Access-Token": token
            }
        })
            .then((response) => {
                    setCurrentTitle(response.data.title)
                    setCurrentQuestionNumber(response.data.questions.length)
                    setCurrentQuizID(response.data.id)
                    setOpenDialog(true)


                }
            ).catch((err) => {
            console.log(err);
        })

    }

    const clickDelete = (id) => {
        const axios = require('axios').default
        axios.delete(fetchURI.quiz + id.toString(), {
            headers: {
                "X-Access-Token": token
            }
        })
            .then(() => {
                    setActionRedraw(id)
                }
            ).catch((err) => {
            console.log(err);
        })
    }

    return (
        <Box m={2} sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 3
        }}>
            {quizData.map((data) => (
                <Card key={data.id} sx={{border: 1, borderColor: "gray"}}>
                    <CardContent>
                        <Typography sx={{fontSize: 16}} color="black" gutterBottom>
                            {data.title}
                        </Typography>
                    </CardContent>

                    <Box sx={{display: "flex"}}>
                        <CardActions>
                            <Button size="small" sx={{color: "teal"}} onClick={() => clickView(data)}>View</Button>
                        </CardActions>
                        <CardActions>
                            <Button size="small" sx={{color: "teal"}}
                                    onClick={() => clickDelete(data.id)}>Delete</Button>
                        </CardActions>
                    </Box>
                </Card>)
            )}

            <QuizShowDialog openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            quizTitle={currentTitle}
                            quizQuestionNumber={currentQuestionNumber}
                            quizID={currentQuizID}/>
        </Box>
    )
}