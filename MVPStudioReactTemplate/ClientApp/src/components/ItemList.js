import React, { Component } from 'react';
import { Button, Table, Modal } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ItemList extends Component
{
    state =
        {
            items: [],
            deleteItemId: null,
            deleteModalOpen: false,
        };

    componentDidMount()
    {
        this.fetchItems();
    }

    fetchItems = () => {
        axious.get('/api/items')
            .then(response => this.setState({ items: response.data }))
            .catch(error => console.log(error));
    };


    openDeleteModal = (id) => this.state({ deleteModalOpen: true, deleteItemId: id });
    closeDeleteModal = () => this.setState({ deleteModalOpen: false, deleteItem: null });

    handleDelete = () => {
        axios.delete('/api/item/${this.state.deleteItemId}')
            .then(() => {
                this.fetchItems();
                this.closeDeleteModal();;
            })
            .catch(error => console.log(error));
    };

    render()
    {
        return (
            <div>
                <h1>Item List</h1>
                <button as={link} to="/add-item" primary>Add New Item</button>
                <Table celled>

                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.items.map(item => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>{item.name}</Table.Cell>

                                <Table.Cell>
                                    <Button as={link} to={'/edit-item/${item.id}'} primary>Edit</Button>
                                    <Button color="red" onClick={() => this.openDeleteModal(item, id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )) }
                    </Table.Body>
                </Table>

                <Modal
                    open={this.state.deleteModalOpen}
                    onClose={this.closeDeleteModal}
                    size="small"
                >

                    <Modal.Header>Delete Item</Modal.Header>
                    <Modal.Content>
                    <p>Are you sure you want to delete this item?</p>
                    </Modal.Content>

                    <Modal.Action>
                        <Button negative onClick={this.closeDeleteModal}>No</Button>
                        <Button positive onClick={this.handleDelete}>Yes</Button>
                    </Modal.Action>

                </Modal>

            </div>
        )
    }
}