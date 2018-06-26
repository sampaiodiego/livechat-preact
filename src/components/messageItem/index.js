import { h, Component } from 'preact';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<div class={`${ style.messageItem }${ this.props.own ? ` ${style.own}` : '' }`}>
				{this.props.msg}
			</div>
		);
	}
}
