import React, {ChangeEvent} from 'react';
import {TextField} from '@material-ui/core';

type OwnPropsType = {
    title: string
    id: string
    changeTodoTitle: (id: string, memoryTitle: string) => void
}

class TodoListTitle extends React.Component <OwnPropsType> {

    state = {
        editMode: false,
        memoryTitle: '',
        editPriorityMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
            memoryTitle: this.props.title
        })
    }

    deActivateEditMode = () => {
        // debugger
        this.props.changeTodoTitle(this.props.id, this.state.memoryTitle)
        this.setState({
            editMode: false
        })
    }
    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            memoryTitle: e.currentTarget.value
        })
    }

    render = () => {
        return (
            <>

                {
                    this.state.editMode
                        ?
                        // <input onBlur={this.deActivateEditMode}
                        //          onChange={this.onTitleChanged}
                        //          value={this.state.memoryTitle}
                        //          autoFocus={true}/>
                        <TextField
                            onBlur={this.deActivateEditMode}
                            onChange={this.onTitleChanged}
                            value={this.state.memoryTitle}
                            autoFocus={true}/>
                        : <h3 onClick={this.activateEditMode} className="todoList-header_title">{this.props.title}</h3>
                }
            </>

        );
    }
}

export default TodoListTitle;
