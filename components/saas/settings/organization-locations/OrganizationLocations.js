import GenericElement from '../../../shared/core/GenericElement';
import AddNewLocation from './AddNewLocation';
import LocationsTable from './LocationsTable';

export default class OrganizationLocations extends GenericElement {
	constructor() {
		super();
		this.addNewLocation = new AddNewLocation();
		this.locationsTable = new LocationsTable();
	}

	async submit({ organizationDetails }) {
		await this.addNewLocation.submit({ organizationDetails });
	}

	async validate({ organizationDetails }) {
		await this.locationsTable.validate({ organizationDetails });
	}
}
