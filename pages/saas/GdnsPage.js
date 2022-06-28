import GdnsList from '../../components/saas/gdns/GdnsList';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';

export default class GdnsPage {
	constructor() {
		this.gdnsList = new GdnsList();
		this.modulesSideBar = new ModulesSideBar();
	}

	async openFirstGdn({ productRequest }) {
		await this.modulesSideBar.clickGrnLink();

		await this.gdnsList.selectFirstGdn({ productRequest });
	}
}
