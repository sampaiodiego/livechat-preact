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

			const newMsg = JSON.parse(payload.toString());

			newMsg.own = newMsg.userId === this.props.myId;

			messages.push(newMsg);

			this.setState({ messages });
		});
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	scrollToBottom() {
		const scrollHeight = this.list.scrollHeight;
		const height = this.list.clientHeight;
		const maxScrollTop = scrollHeight - height;
		this.list.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
	}

	render() {
		return (
			<div class={style.messages} ref={el => { this.list = el; }}>
				{this.state.messages.map((msg) => <MessageItem {...msg} />) }
			</div>
		);
	}
}
