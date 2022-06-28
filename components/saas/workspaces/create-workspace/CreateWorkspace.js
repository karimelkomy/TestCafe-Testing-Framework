import GenericElement from '../../../shared/core/GenericElement';
import WorkspaceDetails from './WorkspaceDetails';
import AddLocation from './AddLocation';
import AddUsers from './AddUsers/AddUsers';
import WorkspaceSuccess from './WorkspaceSuccess';

export default class CreateWorkspace extends GenericElement {
	constructor() {
		super();
		this.workspaceDetails = new WorkspaceDetails();
		this.addLocation = new AddLocation();
		this.addUsers = new AddUsers();
		this.workspaceSuccess = new WorkspaceSuccess();
	}

	async submit({ workspaceDetails, usersDetails }) {
		await this.workspaceDetails.submitWorkspace({ workspaceDetails });
		await this.addLocation.submitLocation({ workspaceDetails });
		await this.addUsers.submitUser({ usersDetails });
		await this.addUsers.clickContinueButton();
		await this.workspaceSuccess.submit();
	}
}
