import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddItem extends Components

{
    state =
        {
            name: ''
        };

    handleChange = (e) => {
        this.setState({ name: e.target.value });
    };

    handleSubmit = () => {
        axios.post('/api/items', { naem: this.state.name })
            .then(() => this.props.histtory.push('/'))
            .catch(error => console.log(error));
    };

    render() {
        return (
            <div>
                <h1>Add Item</h1>
                <Form>
                    <Form.Fields>
                        <label>Name</label>
                        <input placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
                    </Form.Fields>
                    <button primary onClick={this.handleSubmit}>Add</button>
                </Form>
            </div>
        )
    }
}
export default withRouter(AddItem);