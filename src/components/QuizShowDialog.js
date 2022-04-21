import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {createSearchParams, useNavigate} from "react-router-dom";
import {routes} from "../utils/constants";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function QuizShowDialog(props) {
    const [openDialog, setOpenDialog] = [props.openDialog, props.setOpenDialog]
    const navigate = useNavigate()
    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleStartQuiz = (quizID) => {
        navigate({
            pathname: routes.quiz.start,
            search: `?${createSearchParams({id: quizID})}`
        })
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="ShowQuizDialog"
                open={openDialog}
            >
                <BootstrapDialogTitle id="ShowQuizDialogTitle" onClose={handleClose}>
                    {props.quizTitle}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography>
                        Total number of questions in the current
                        quiz: {props.quizQuestionNumber}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleStartQuiz(props.quizID)}>
                        Start
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}