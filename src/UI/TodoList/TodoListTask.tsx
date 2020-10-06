import React, {ChangeEvent, ReactNode} from 'react'
import {TaskType} from '../../types/entities';
import {DeleteOutlined} from '@material-ui/icons';
import {
    FormControlLabel,
    IconButton,
    Checkbox,
    Box,
    Paper,
    Select,
    MenuItem,
    Input,
    TextField
} from '@material-ui/core';
import {zhCN} from '@material-ui/core/locale';

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
    editPriorityMode: boolean
}

class TodoListTask extends React.Component <OwnPropsType, StateType> {

    state: StateType = {
        editMode: false,
        memoryTitle: '',
        editPriorityMode: false
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

    // onPriorityChanged = (event:ChangeEvent<HTMLSelectElement>) => {
    //     let value = event.currentTarget.value;
    //     debugger
    //     this.props.changePriority(this.props.task, value)
    // }


    onPriorityChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
        // setAge(event.target.value as string);
        let value = event.target.value;
        debugger
        this.props.changePriority(this.props.task, value)
    }


    render = () => {
        let statusTasks = this.props.task.status
        let classForIsDone = statusTasks === 2 ? 'done' : 'todoList-task';
        let styleIsDone = statusTasks === 2 ? {opacity: 0.5} : {};
        let priora;
        switch (this.props.task.priority) {
            case 0:
                priora = 'low'
                break
            case 1:
                priora = 'middle'
                break
            case 2:
                priora = 'hi'
                break
            case 3:
                priora = 'urgently'
                break
            case 4:
                priora = 'later'
                break
            default:
                priora = 'smth strange'
        }

        return (
            <Paper style={{marginTop:'10px'}}>

                {/*<div className="taskContainer">*/}
                <div className={classForIsDone} style={{display: 'flex', alignItems: 'center', ...styleIsDone}}>
                    {/*<input type="checkbox" onChange={this.onIsDoneChanged} checked={statusTasks === 2}/>*/}

                    <Checkbox
                        onChange={this.onIsDoneChanged}
                        checked={statusTasks === 2}
                        color="primary"
                    />


                    <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, width: '170px'}}>{
                        this.state.editMode
                            ?
                            // <input onBlur={this.deActivateEditMode}
                            //          onChange={this.onTitleChanged}
                            //          value={this.state.memoryTitle}
                            //          autoFocus={true}/>
                            <TextField size={'small'}
                                       style={{width: '170px'}}
                                       onBlur={this.deActivateEditMode}
                                       onChange={this.onTitleChanged}
                                       value={this.state.memoryTitle}
                                       autoFocus={true}/>
                            : <span onClick={this.activateEditMode}
                                    style={{wordBreak: 'break-word'}}>-{this.props.task.title}, </span>
                    }

                        <span>priority:
                            {
                                this.state.editPriorityMode
                                    ?
                                    <Select
                                        autoFocus={true}
                                        value={this.props.task.priority}
                                        onBlur={() => this.setState({editPriorityMode: false})}
                                        onChange={this.onPriorityChanged}
                                    >
                                        <MenuItem value={0}>low</MenuItem>
                                        <MenuItem value={1}>middle</MenuItem>
                                        <MenuItem value={2}>hi</MenuItem>
                                        <MenuItem value={3}>urgently</MenuItem>
                                        <MenuItem value={4}>later</MenuItem>
                                    </Select>

                                    : <span onClick={() => this.setState({editPriorityMode: true})}>
                                        {priora}
                                    </span>
                            }
                        </span>
                    </div>
                    <IconButton onClick={this.onClickClose} className="deleterTask">
                        <DeleteOutlined/>
                    </IconButton>
                </div>
                {/*<button className="deleterTask" onClick={this.onClickClose}>x</button>*/}

                {/*</div>*/}
            </Paper>
        );
    }
}

export default TodoListTask;

