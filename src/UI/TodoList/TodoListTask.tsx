import React, {ChangeEvent} from 'react'
import {TaskType} from '../../types/entities';
import {DeleteOutlined} from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import {IconButton, Checkbox, Box, Paper, Select, MenuItem, TextField} from '@material-ui/core';

type OwnPropsType = {
    deleteTask: (taskId: string) => void
    changeTitle: (task: TaskType, memoryTitle: string) => void
    changeStatus: (task: TaskType, status: number) => void
    changePriority: (task: TaskType, value: any) => void
    task: TaskType
}

type StateType = {
    editMode: boolean,
    memoryTitle: string,
    hover: number
}


const labels: { [index: string]: string } = {
    1: 'low',
    2: 'middle',
    3: 'hi',
    4: 'urgently',
    5: 'later',
};

class TodoListTask extends React.Component <OwnPropsType, StateType> {

    state: StateType = {
        editMode: false,
        memoryTitle: '',
        hover: -1
    }

    onIsDoneChanged = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? 2 : 0
        this.props.changeStatus(this.props.task, status)
    }

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            memoryTitle: e.currentTarget.value
        })
    }

    onClickClose = () => {
        this.props.deleteTask(this.props.task.id)
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
            memoryTitle: this.props.task.title
        })
    }

    deActivateEditMode = () => {
        this.props.changeTitle(this.props.task, this.state.memoryTitle)
        this.setState({
            editMode: false
        })
    }


    onPriorityChangedRating = (event: ChangeEvent<{}>, newValue: number | null) => {
        debugger
        let a = newValue? newValue - 1 : null
        this.props.changePriority(this.props.task, a)
    }


    render = () => {
        let statusTasks = this.props.task.status
        let classForIsDone = statusTasks === 2 ? 'done' : 'todoList-task';
        let styleIsDone = statusTasks === 2 ? {opacity: 0.5} : {};

        return (
            <Paper style={{marginTop: '10px'}}>

                <div className={classForIsDone} style={{display: 'flex', alignItems: 'center', ...styleIsDone}}>

                    <Checkbox
                        onChange={this.onIsDoneChanged}
                        checked={statusTasks === 2}
                        color="primary"
                    />


                    <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, width: '170px'}}>{
                        this.state.editMode
                            ?

                            <TextField size={'small'}
                                       style={{width: '170px'}}
                                       onBlur={this.deActivateEditMode}
                                       onChange={this.onTitleChanged}
                                       value={this.state.memoryTitle}
                                       autoFocus={true}/>
                            : <span onClick={this.activateEditMode}
                                    style={{wordBreak: 'break-word'}}>-{this.props.task.title}, </span>
                    }

                        <div style={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Rating
                                id={this.props.task.id}
                                value={this.props.task.priority + 1}
                                precision={1}
                                onChange={this.onPriorityChangedRating}
                                onChangeActive={(event, newHover) => {
                                    this.setState({hover: newHover})
                                }}
                            />
                            {this.props.task.priority + 1 !== null && <Box
                                ml={2}>{labels[this.state.hover !== -1 ? this.state.hover : this.props.task.priority + 1]}</Box>}
                        </div>
                    </div>
                    <IconButton onClick={this.onClickClose} className="deleterTask">
                        <DeleteOutlined/>
                    </IconButton>
                </div>
            </Paper>
        );
    }
}

export default TodoListTask;

