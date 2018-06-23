import { h, Component } from 'preact';
import style from './style.less';

export default class TextBox extends Component {
	render() {
		return (
			<div>
				<textarea class={style.textarea}>opa</textarea>
			</div>
		);
	}
}
