import { h, Component } from 'preact';
import style from './style.less';

export default class RegisterForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			server: '',
			username: '',
			password: ''
		};

		this.onServerChange = this.onServerChange.bind(this);
		this.onUsernameChange = this.onUsernameChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onServerChange(event) {
		this.setState({ server: event.target.value });
	}

	onUsernameChange(event) {
		this.setState({ username: event.target.value });
	}

	onPasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();

		const { server, username, password } = this.state;

		const baseURL = server.replace(/\/$/, '');

		this.props.axios({
			method: 'post',
			url: `${ baseURL }/api/v1/login`,
			data: {
				username,
				password
			}
		}).then((response) => {
			const { data, status } = response.data;

			if (status !== 'success') {
				throw response.data.error;
			}

			if (!data.jwt) {
				throw 'server incompatible';
			}

			const { userId, authToken, jwt } = data;

			this.props.setCredentials({ baseURL, userId, authToken, jwt }, true);
		}).catch(error => console.error(error));
	}

	render() {
		return (
			<div class={style.register}>
				<form onSubmit={this.handleSubmit}>
					<input type="text" class={style.input} name="server" placeholder="Server: http://localhost:3000/" value={this.state.server} onChange={this.onServerChange} />
					<input type="text" class={style.input} name="username" placeholder="Username" value={this.state.username} onChange={this.onUsernameChange}  />
					<input type="password" class={style.input} name="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange}  />

					<button type="submit" class="button">Login</button>
				</form>
			</div>
		);
	}
}
