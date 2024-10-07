import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class EditItem extends Compoonent {
    state = {
        id: this.props.match.params.id,
        name: '',
        showModal: false,
    };

    componentDidMount() {
        axios.get(`https://your-api-url/api/items/${this.state.id}`)

            .then(response => {
                this.setState({ name: response.data.name });
            })

            .catch(error => {
                console.error('There was an error fetching the item', error);
            });
    }

    handleChange = (e) => {
        this.setState({ name: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://your-api-url/api/items/${this.state.id}`, { name: this.state.name })
            .then(response => {
                this.setState({ showModal: true })
            })

            .catch(error => {
                console.error('There was an error updating the item')
            });
    }

    closeModal = () => {
        this.setState({ showMOdal: false });
        this.props.history.push('/');
    }

    render() {
        return (
            <div>

                <h2>Edit Item</h2>
                <Form onSubmit={this.handleSubmit}>

                    <Form.Field>

                        <Label>Name</Label>
                        <input
                            placeholder="Item Name"
                            Value={this.state.name}
                            onChange={this.handleChange} />

                    </Form.Field>

                    <Button type="submit" primary>Save</Button>
                    <Button as={link} to="/" secondary>Cancel</Button>

                </Form>

                <Modal open={this.state.showModal} onClose={this.closeModal}>

                    <Modal.Header>Success</Modal.Header>
                    <Modal.Content>
                        <p>Item has been updated successfully!</p>
                    </Modal.Content>
                    <Modal.Action>

                        <Button onClick={this.closeModal} positive>OK</Button>

                    </Modal.Action>

                </Modal>

            </div>
        );
    }
}
export default EditItem;