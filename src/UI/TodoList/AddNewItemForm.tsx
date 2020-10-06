import React, {ChangeEvent, KeyboardEvent} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {AddOutlined} from '@material-ui/icons'
import {DeleteOutlined} from '@material-ui/icons';


type StateType = {
    error: boolean
    title: string
}

type OwnPropsType = {
    addItem: (title: string) => void
}

class AddNewItemForm extends React.Component<OwnPropsType, StateType> {

    state: StateType = {
        error: false,
        title: ''
    }

    onAddItemClick = () => {

        let newText = this.state.title;
        this.setState({title: ''})

        if (newText === '') {
            this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addItem(newText);
        }
    }

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    };

    onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemClick()
        }
    };

    render = () => {
        let classNameInput = this.state.error ? 'error' : '';
        return (
            <div className="todoList-newTaskForm">
                {/*<input*/}
                {/*    type="text"*/}
                {/*    className={classNameInput}*/}
                {/*    onChange={this.onTitleChanged}*/}
                {/*    value={this.state.title}*/}
                {/*    onKeyPress={this.onKeyPress}*/}
                {/*    placeholder="New item name"/>*/}
                <TextField
                    type="text"
                    variant="outlined"
                    helperText={this.state.error ? "Empty name.":''}
                    error={this.state.error}
                    onChange={this.onTitleChanged}
                    value={this.state.title}
                    onKeyPress={this.onKeyPress}
                    label={"New item name"} />
                <IconButton aria-label="add"
                            onClick={this.onAddItemClick}>
                    <AddOutlined color="primary"/>
                </IconButton>
                {/*<Button variant={'contained'} color={'primary'} size={'small'}*/}
                {/*        onClick={this.onAddItemClick}>Add</Button>*/}


            </div>
        );
    }
}

export default AddNewItemForm;

