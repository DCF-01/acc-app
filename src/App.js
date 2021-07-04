import logo from './logo.svg';
import './App.css';
import React from 'react';
import reactDom from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import col from 'react-bootstrap/col';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			darkTheme: false
		};
	}
	render() {
		return (
			<div className="main-container">
				<Menu />
				<Workspace />
			</div>
		);
	}
}

// WORKSPACE COMPONENT ----------------------------------------------------------------------------
class Workspace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [
				{
					id: 0,
					text: 'hello',
					number: 32,
					isActive: false,
				},
				{
					id: 1,
					text: 'world',
					number: 45,
					isActive: false
				},
				{
					id: 3,
					text: 'there',
					number: 15,
					isActive: false
				},
				{
					id: 4,
					text: 'poq',
					number: 13,
					isActive: false
				}
			], 
			controlData: {
				id: 1,
				text: 'world',
				number: 45,
				isActive: false
			}
		}
		this.onItemClick = this.onItemClick.bind(this);
	}

	onItemClick(itemId){
		//find by id and set active to true
		let itemsArray = this.state.items;
		let item = itemsArray.find((i) => i.id === itemId);
		item.isActive = !item.isActive;
		
		this.setState(prevState => ({
			items: itemsArray,
			controlData: item
		}));
	}

	render() {
		const tableItems = this.state.items.map((item) => {
			return <SingleItem itemData={item} key={item.id} onItemClick={this.onItemClick} />
		});

		return (
			<div className="workspace-container">
				<div className="top-container">
					<ItemTable tableData={this.state.items} onItemClick={this.onItemClick} children={tableItems}/>
				</div>
				<div className="bottom-container">
					<ControlPanel onItemChange={this.state.controlData}/>
				</div>
			</div>
		);
	}
}


class ItemTable extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<Table striped bordered hover>
				<thead>
					<tr>
					<th>#</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Username</th>
					</tr>
				</thead>
				<tbody>
					{this.props.children}
				</tbody>
			</Table>
		);
	}
}

class SingleItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			itemId: this.props.itemData.id
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		this.props.onItemClick(this.state.itemId);
	}

	render() {
		return (
			<tr onClick={this.handleClick} className={'table-row-' + (this.props.itemData.isActive ? 'active' : 'inactive')}>
				<td>{this.props.itemData.number}</td>
				<td colSpan="2">{this.props.itemData.text}</td>
				<td>@twitter</td>
			</tr>
		);
	}

}


class ControlPanel extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<Form>
				<Form.Row>
					<Form.Group as={Col} controlId="formGridEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder={this.props.onItemChange.text}  />
					</Form.Group>

					<Form.Group as={Col} controlId="formGridPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
					</Form.Group>
				</Form.Row>

				<Form.Group controlId="formGridAddress1">
					<Form.Label>Address</Form.Label>
					<Form.Control placeholder="1234 Main St" />
				</Form.Group>

				<Form.Group controlId="formGridAddress2">
					<Form.Label>Address 2</Form.Label>
					<Form.Control placeholder="Apartment, studio, or floor" />
				</Form.Group>

				<Form.Row>
					<Form.Group as={Col} controlId="formGridCity">
					<Form.Label>City</Form.Label>
					<Form.Control />
					</Form.Group>

					<Form.Group as={Col} controlId="formGridState">
					<Form.Label>State</Form.Label>
					<Form.Control as="select" defaultValue="Choose...">
						<option>Choose...</option>
						<option>...</option>
					</Form.Control>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridZip">
					<Form.Label>Zip</Form.Label>
					<Form.Control />
					</Form.Group>
				</Form.Row>

				<Form.Group id="formGridCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		);
	}
}

// MENU COMPONENT ----------------------------------------------------------------------------
class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: true,
			testCountMax: 5
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState(prevState => ({
			isExpanded: !prevState.isExpanded
		}));
	}

	render() {
		const arr = [];
		let uid = 0;
		for (let i = 1; i < this.state.testCountMax; i++) {
			arr.push(<MenuItem textAttribute={`Link ${i}`} key={uid}/>);
			uid +=1;
		}
		if (this.state.isExpanded) {
			return (
				<div className="menu-container-expand">
					<Toggle onClick={this.handleClick} />
					{arr}
				</div>
			);
		}
		else {
			return (
				<div className="menu-container-shrink">
					<Toggle onClick={this.handleClick} />
					{arr}
				</div>
			);
		}
	}

}

class Toggle extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {
		return (
			<i className="fas fa-bars" onClick={this.props.onClick}></i>
		);
	}
}

class MenuItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<a className="menu-item" href="#" key={this.props.uid}>{this.props.textAttribute}</a>
		);
	}
}


export default App;
