import { environment, urls } from '../../data/saas/constants/urls';
import SignInPage from '../../pages/saas/SignInPage';
import { adminUserProd, adminUserDemo, adminUserTest, adminUserStcTest } from '../../data/saas/constants/credentials';
import CreateOrgPage from '../../pages/saas/CreateOrgPage';
import SetUserPasswordPage from '../../pages/saas/SetUserPasswordPage';
import OrganizationSettingsPage from '../../pages/saas/OrganizationSettingsPage';
import Header from '../../components/saas/shared/Header';
import MyProfilePage from '../../pages/saas/MyProfilePage';
import UserManagementPage from '../../pages/saas/UserManagementPage';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';
import { navigateTo } from '../../utilities/helpers';

export const createNewOrg = async ({ superAdminUserDetails, organizationDetails, defaultWorkspaceDetails }) => {
	const signInPage = new SignInPage();
	const createOrgPage = new CreateOrgPage();
	const setUserPasswordPage = new SetUserPasswordPage();
	const organizationSettingsPage = new OrganizationSettingsPage();
	const header = new Header();
	const myProfilePage = new MyProfilePage();
	const userManagementPage = new UserManagementPage();
	const modulesSideBar = new ModulesSideBar();
	const { buyerLogin, admin } = urls;

	await navigateTo(admin);

	if (environment === 'app') {
		await signInPage.signIn({ user: adminUserProd, logged: false });
	} else if (environment === 'demo') {
		await signInPage.signIn({ user: adminUserDemo, logged: false });
	} else if (environment === 'stc-test-local' || environment === 'stc-test') {
		await signInPage.signIn({ user: adminUserStcTest, logged: false });

		await modulesSideBar.clickOrgsLink(); // BUG: showing create new sourcing page by default in admin app instead of orgs list page
	} else {
		await signInPage.signIn({ user: adminUserTest, logged: false });
	}

	await createOrgPage.create({ organizationDetails, superAdminUserDetails });

	await setUserPasswordPage.setUsersPassword({ organizationDetails, usersDetails: [superAdminUserDetails] });

	console.log(`CUSTOM LOG: Super Admin User Details: ${JSON.stringify(superAdminUserDetails.email, null, 2)}`);

	await navigateTo(buyerLogin);

	await signInPage.signIn({ user: superAdminUserDetails, logged: false });

	await userManagementPage.validateUser({ userDetails: superAdminUserDetails });

	await organizationSettingsPage.submit({ organizationDetails });

	await header.openUserProfile();

	await myProfilePage.uploadProfilePhoto();
	await myProfilePage.selectDefaultWorkspace({ workspaceDetails: defaultWorkspaceDetails });
};
