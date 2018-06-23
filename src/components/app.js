import { h, Component } from 'preact';
import mqtt from '../lib/browserMqtt';

// import { Router } from 'preact-router';

import Header from './header';
// import RegisterForm from './register-form';
import Messages from './messages';
import Footer from './footer';
// import Home from './home';
// import Profile from './profile';

export default class App extends Component {
	constructor() {
		super();

		this.client = mqtt.connect('ws://test.mosquitto.org:8080');
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	componentDidMount() {

	}

	render() {
		return (
			<div id="app">
				<Header />
				<Messages client={this.client} />
				<Footer client={this.client} />
			</div>
		);
	}
}
