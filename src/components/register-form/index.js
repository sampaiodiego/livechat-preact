import { h, Component } from 'preact';
import style from './style.less';

export default class RegisterForm extends Component {
	render() {
		return (
			<div class={style.register}>
				<div class="error error-color error-background">
					<span>error</span>
				</div>

				<p class="welcome">
					welcome
				</p>
				<form id="livechat-registration">
					<input type="text" name="name" id="guestName" placeholder="Name" />
					<input type="email" name="email" id="guestEmail" placeholder="Email" />

					<select v-if="showDepartments" name="department">
						<option value="">Select_a_department</option>
					</select>
					<button type="submit" id="btnEntrar" class="button">Start_Chat</button>
				</form>
			</div>
		);
	}
}
