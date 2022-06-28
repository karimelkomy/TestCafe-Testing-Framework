import SignInPage from '../../pages/saas/SignInPage';
import CreateNewProductPage from '../../pages/saas/CreateNewProductPage';
import CreateNewCataloguePage from '../../pages/saas/CreateNewCataloguePage';
import CategoryPage from '../../pages/saas/CategoryPage';
import ProductsPage from '../../pages/saas/ProductsPage';
import VendorsPage from '../../pages/saas/VendorsPage';
import BudgetPage from '../../pages/saas/BudgetPage';
import WorkspacePage from '../../pages/saas/WorkspacePage';
import SetUserPasswordPage from '../../pages/saas/SetUserPasswordPage';
import Header from '../../components/saas/shared/Header';
import MyProfilePage from '../../pages/saas/MyProfilePage';
import UserManagementPage from '../../pages/saas/UserManagementPage';
import RolesPrivilegesPage from '../../pages/saas/RolesPrivilegesPage';
import MarkupsPage from '../../pages/saas/MarkupsPage';
import ClientsPage from '../../pages/saas/ClientsPage';
import OrganizationSettingsPage from '../../pages/saas/OrganizationSettingsPage';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';

export const setOrganizationDetails = async ({ superAdminUserDetails, organizationDetails }) => {
	const signInPage = new SignInPage();
	const organizationSettingsPage = new OrganizationSettingsPage();
	const header = new Header();
	const modulesSideBar = new ModulesSideBar();

	await signInPage.signIn({ user: superAdminUserDetails, logged: false });

	await modulesSideBar.clickSettingsLink();

	await organizationSettingsPage.submit({ organizationDetails });

	await header.logOut();
};

export const createAdminRoles = async ({ superAdminUserDetails, rolesDetails }) => {
	const signInPage = new SignInPage();
	const rolesPrivilegesPage = new RolesPrivilegesPage();
	const header = new Header();

	await signInPage.signIn({ user: superAdminUserDetails, logged: false });

	await rolesPrivilegesPage.createNewRoles({ rolesDetails });

	await header.logOut();
};

export const createAdminUsers = async ({ organizationDetails, superAdminUserDetails, usersDetails }) => {
	const signInPage = new SignInPage();
	const setUserPasswordPage = new SetUserPasswordPage();
	const userManagementPage = new UserManagementPage();
	const header = new Header();

	await signInPage.signIn({ user: superAdminUserDetails, logged: false });

	await userManagementPage.createNewUsers({ usersDetails });

	await header.logOut();

	await setUserPasswordPage.setUsersPassword({ organizationDetails, usersDetails });

	console.log(
		`CUSTOM LOG: Users Details: ${JSON.stringify(
			usersDetails.map((user) => user.email),
			null,
			2
		)}`
	);
};

export const createBudget = async ({ budgetsAdminUserDetails, organizationDetails, budgetDetails }) => {
	const signInPage = new SignInPage();
	const budgetPage = new BudgetPage();

	await signInPage.signIn({ user: budgetsAdminUserDetails, logged: false });

	await budgetPage.createNewBudget({ budget: { budgetDetails, organizationDetails } });
	await budgetPage.validateBudgetDetails({ budget: { budgetDetails, organizationDetails } });
};

export const createClients = async ({ superAdminUserDetails, clientsDetails }) => {
	const signInPage = new SignInPage();
	const clientsPage = new ClientsPage();
	const setUserPasswordPage = new SetUserPasswordPage();

	await signInPage.signIn({ user: superAdminUserDetails, logged: false });

	await clientsPage.createClients({ clientsDetails });

	await setUserPasswordPage.setUsersPassword({ organizationDetails: undefined, usersDetails: clientsDetails });

	console.log(
		`CUSTOM LOG: Clients Details: ${JSON.stringify(
			clientsDetails.map((user) => user.email),
			null,
			2
		)}`
	);
};

export const processWorkspaces = async ({
	workspaceSuperAdminUserDetails,
	workspacesDetails,
	editWorkspacesDetails,
	approvalWorkspacesDetails,
	usersDetails,
	approvalWorkflowsDetails,
}) => {
	const signInPage = new SignInPage();
	const workspacePage = new WorkspacePage();
	const header = new Header();

	await signInPage.signIn({ user: workspaceSuperAdminUserDetails, logged: false });

	if (workspacesDetails) {
		await workspacePage.submitWorkspace({ workspacesDetails, usersDetails });
	}

	if (editWorkspacesDetails) {
		await workspacePage.editWorkspaceUsers({ workspacesDetails: editWorkspacesDetails, usersDetails });
	}

	if (approvalWorkspacesDetails) {
		await workspacePage.editWorkspacesApprovalWorkflow({ workspacesDetails: approvalWorkspacesDetails, approvalWorkflowsDetails });
	}

	await header.logOut();
};

export const createVendors = async ({ vendorsAdminUserDetails, organizationDetails, vendorsDetails, vendorToPlatform }) => {
	const signInPage = new SignInPage();
	const vendorsPage = new VendorsPage();
	const setUserPasswordPage = new SetUserPasswordPage();

	await signInPage.signIn({ user: vendorsAdminUserDetails, logged: false });

	await vendorsPage.createVendors({ vendorsDetails, organizationDetails, vendorToPlatform });

	if (vendorToPlatform) {
		await setUserPasswordPage.setUsersPassword({ organizationDetails: undefined, usersDetails: vendorsDetails });
	}
};

export const createProducts = async ({
	catalogsAdminUserDetails,
	organizationDetails,
	usersDetails,
	clientsDetails,
	catalogueDetails,
	productsDetails,
	preferredVendorDetails,
}) => {
	const signInPage = new SignInPage();
	const createNewProductPage = new CreateNewProductPage();
	const createNewCataloguePage = new CreateNewCataloguePage();

	await signInPage.signIn({ user: catalogsAdminUserDetails, logged: false });

	await createNewCataloguePage.createCatalogue({ catalogueDetails, usersDetails, clientsDetails });

	await createNewProductPage.createProduct({
		organizationDetails,
		catalogueDetails,
		productsDetails,
		preferredVendorDetails,
	});
};

export const deleteProducts = async ({ catalogsAdminUserDetails, catalogueDetails, productsDetails }) => {
	const signInPage = new SignInPage();
	const createNewProductPage = new CreateNewProductPage();
	const categoryPage = new CategoryPage();
	const productsPage = new ProductsPage();

	await signInPage.signIn({ user: catalogsAdminUserDetails, logged: false });

	await productsPage.deleteProduct({ catalogueDetails, productsDetails });

	await categoryPage.deleteCatalogue({ catalogueDetails });

	await createNewProductPage.deleteCategory({ productsDetails });
};

export const createMarkup = async ({ superAdminUserDetails, markupDetails }) => {
	const signInPage = new SignInPage();
	const markupsPage = new MarkupsPage();

	await signInPage.signIn({ user: superAdminUserDetails, logged: false });

	await markupsPage.createMarkups({ markupDetails });
};

export const setDefaultWorkspace = async ({ userDetails, workspaceDetails }) => {
	const signInPage = new SignInPage();
	const header = new Header();
	const myProfilePage = new MyProfilePage();

	await signInPage.signIn({ user: userDetails, logged: false });

	await header.openUserProfile();

	await myProfilePage.selectDefaultWorkspace({ workspaceDetails });
};
