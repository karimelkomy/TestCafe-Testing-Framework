import CreateWorkspace from '../../components/saas/workspaces/create-workspace/CreateWorkspace';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';
import WorkspacesList from '../../components/saas/workspaces/WorkspacesList';
import EditWorkspace from '../../components/saas/workspaces/edit-workspace/EditWorkspace';

export default class WorkspacePage {
	constructor() {
		this.modulesSideBar = new ModulesSideBar();
		this.workspacesList = new WorkspacesList();
		this.createWorkspace = new CreateWorkspace();
		this.editWorkspace = new EditWorkspace();
	}

	async submitWorkspace({ workspacesDetails, usersDetails }) {
		for (let workspaceDetails of workspacesDetails) {
			await this.modulesSideBar.clickWorkspaceLink();
			await this.workspacesList.clickCreateWorkspaceButton();
			await this.createWorkspace.submit({ workspaceDetails, usersDetails });
		}
	}

	async editWorkspacesApprovalWorkflow({ workspacesDetails, approvalWorkflowsDetails }) {
		for (let workspaceDetails of workspacesDetails) {
			await this.modulesSideBar.clickWorkspaceLink();
			await this.workspacesList.clickEditWorkspaceButton({ workspaceDetails });
			await this.editWorkspace.editApprovalWorkflow({ approvalWorkflowsDetails });
		}
	}

	async editWorkspaceUsers({ workspacesDetails, usersDetails }) {
		for (let workspaceDetails of workspacesDetails) {
			await this.modulesSideBar.clickWorkspaceLink();
			await this.workspacesList.clickEditWorkspaceButton({ workspaceDetails });
			await this.editWorkspace.editUsers({ usersDetails });
		}
	}
}
