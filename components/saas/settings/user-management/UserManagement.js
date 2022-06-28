import GenericElement from '../../../shared/core/GenericElement';
import CreateNewUser from './CreateNewUser';
import ActionsDropdown from './ActionsDropdown';
import UsersTable from './UsersTable';

export default class UserManagement extends GenericElement {
	constructor() {
		super();
		this.usersTable = new UsersTable();
		this.createNewUser = new CreateNewUser();
		this.actionsDropdown = new ActionsDropdown();
	}

	async validateUser({ userDetails }) {
		await this.usersTable.validateUser({ userDetails });
	}

	async createUsers({ usersDetails }) {
		for (let userDetails of usersDetails) {
			await this.actionsDropdown.openCreateUser();
			await this.createNewUser.submit({ userDetails });
			await this.validateUser({ userDetails });
		}
	}
}
