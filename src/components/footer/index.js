import { h, Component } from 'preact';
import style from './style.less';

export default class Footer extends Component {
	constructor() {
		super();

		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	sendMessage() {
		this.props.sendMessage(this.state.value);
		this.setState({ value: '' });
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	render() {
		return (
			<div class={style.footer}>
				<div class={style.textContainer}>
					<textarea class={style.textarea} onChange={this.handleChange} value={this.state.value} />
					<button onClick={this.sendMessage}>Send</button>
				</div>

				<div class={style.poweredBy}>
					Powered by
					<a href="https://rocket.chat" target="_blank">
						<img class="logo" src="/assets/logo-dark.svg?v=1" />
					</a>
				</div>
			</div>
		);
	}
}
