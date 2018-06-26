import { h, Component } from 'preact';
import axios from 'axios';

import mqtt from '../lib/browserMqtt';

import Header from './header';
import RegisterForm from './register-form';
import MessagesContainer from './messagesContainer';
import RoomsList from './roomsList';

export default class App extends Component {
	constructor() {
		super();

		const userId = this.userId = localStorage.getItem('rocketchat-userId');
		const authToken = this.authToken = localStorage.getItem('rocketchat-authToken');
		const jwt = this.jwt = localStorage.getItem('rocketchat-jwt');
		const baseURL = this.server = localStorage.getItem('rocketchat-server');

		this.state = {
			loggedIn: !!authToken,
			screen: authToken ? 'list' : 'login'
		};

		if (userId) {
			this.setCredentials({
				userId,
				authToken,
				jwt,
				baseURL
			});
		}
	}

	setCredentials({ baseURL, userId, authToken, jwt }, store = false) {
		if (store) {
			localStorage.setItem('rocketchat-userId', userId);
			localStorage.setItem('rocketchat-authToken', authToken);
			localStorage.setItem('rocketchat-jwt', jwt);
			localStorage.setItem('rocketchat-server', baseURL);
			axios.defaults.baseURL = baseURL;
		}

		axios.defaults.headers.common['X-User-Id'] = userId;
		axios.defaults.headers.common['X-Auth-Token'] = authToken;
		axios.defaults.headers.common['Content-Type'] = 'application/json';
		axios.defaults.baseURL = baseURL;

		this.setState({
			screen: 'list'
		});
	}

	setRoom(roomId) {
		this.client = mqtt.connect(`ws://${ this.server.replace(/^https?:\/\//, '').replace(/:[0-9]+$/g, '') }:8090`, {
			username: this.jwt,
			password: ''
		});
		this.setState({
			screen: 'room',
			roomId
		});
	}

	sendMessage(msg) {
		axios.post('/api/v1/chat.sendMessage', {
			message: {
				rid: this.state.roomId,
				msg
			}
		});
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		let body;
		switch (this.state.screen) {
			case 'login':
				body = (<RegisterForm axios={axios} setCredentials={this.setCredentials.bind(this)} />);
				break;
			case 'list':
				body = (<RoomsList axios={axios} setRoom={this.setRoom.bind(this)} />);
				break;
			case 'room':
				body = (<MessagesContainer client={this.client} roomId={this.state.roomId} userId={this.userId} sendMessage={this.sendMessage.bind(this)} />);
		}
		return (
			<div id="app">
				<Header />
				{ body }
			</div>
		);
	}
}
