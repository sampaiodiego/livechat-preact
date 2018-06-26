import { h, Component } from 'preact';
import style from './style.less';

export default class RoomsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			subscriptions: []
		};
	}

	componentDidMount() {
		this.props.axios.get('/api/v1/subscriptions.get')
			.then(response => {
				const { update, success } = response.data;

				if (!success) {
					throw response.data.error;
				}

				this.setState({
					subscriptions: update
				});
			})
			.catch(error => console.error(error));
	}

	handleClick(sub, event) {
		event.preventDefault();

		this.props.setRoom(sub.rid);
	}

	render() {
		return (
			<div class={style.register}>
				<ul>
					{ this.state.subscriptions.map(sub => ( <li><a onClick={(e) => this.handleClick(sub, e)} href="#">{ sub.name }</a></li>))}
				</ul>
			</div>
		);
	}
}
