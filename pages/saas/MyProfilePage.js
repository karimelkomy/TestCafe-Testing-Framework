import MyProfile from '../../components/saas/my-profile/MyProfile';

export default class MyProfilePage {
	constructor() {
		this.myProfile = new MyProfile();
	}

	async uploadProfilePhoto() {
		await this.myProfile.uploadPhoto();
	}

	async selectDefaultWorkspace({ workspaceDetails }) {
		await this.myProfile.selectMyDefaultWorkspace(workspaceDetails);
	}
}
