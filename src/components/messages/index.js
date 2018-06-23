import { h, Component } from 'preact';
import style from './style.less';

import MessageItem from '../messageItem';

export default class Messages extends Component {
	constructor() {
		super();

		this.state = {
			messages: [
				{
					body: 'You can send messages above.',
					own: true
				}
			]
		};
	}

	componentDidMount() {
		this.props.client.subscribe('/dido');

		this.props.client.on('message', (topic, payload) => {
			const { messages } = this.state;
			messages.push({ body: payload.toString() });
			this.setState({ messages });
		});
	}

	render() {
		return (
			<div class={style.messages}>
				{this.state.messages.map((msg) => <MessageItem {...msg} />) }
			</div>
		);
	}
}
