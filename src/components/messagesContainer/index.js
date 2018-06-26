import { h, Component } from 'preact';
import style from './style.less';

import Footer from '../footer';
import MessageItem from '../messageItem';

export default class MessagesContainer extends Component {
	constructor() {
		super();

		this.state = {
			messages: []
		};
	}

	componentDidMount() {
		this.props.client.subscribe(`room-messages/${ this.props.roomId }`);

		this.props.client.on('message', (topic, payload) => {
			const { messages } = this.state;

			const [ newMsg ] = JSON.parse(payload.toString());

			// console.log('newMsg ->', newMsg);

			newMsg.own = newMsg.u._id === this.props.userId;

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
			<div class={style.container}>
				<div class={style.messages} ref={el => { this.list = el; }}>
					{this.state.messages.map((msg) => <MessageItem {...msg} />) }
				</div>
				<Footer client={this.props.client} userId={this.props.userId} sendMessage={this.props.sendMessage} />
			</div>
		);
	}
}
