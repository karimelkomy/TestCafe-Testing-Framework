import { sprintf } from "sprintf-js";
import GenericElement from "../shared/core/GenericElement";

export default class JoinUsModel extends GenericElement {
  constructor() {
    super();
    this.locationDropdown = '//select[@id="get_location"]';
    this.locationDropdownItem = '//option[text()="%s"]';
    this.positionItem = '//div[./h2[@data-alt="%s"]]';
    this.positionText = '//h2[@class="card-jobsHot__title"]';
    this.positionLink = '//a[@class="card-jobsHot__link"]';
  }

  async filterLocation(location) {
    await this.click(this.locationDropdown);
    await this.selectOption(sprintf(this.locationDropdownItem, location));
  }

  async getPosition(index) {
    console.log(
      `Position: ${await this.getText(`(${this.positionText})[${index}]`)}`
    );
  }

  async getPositionUrl(index) {
    console.log(
      `More info: ${await this.getAttributeValue(
        `(${this.positionLink})[${index}]`,
        "href"
      )}`
    );
  }

  async clickPositionItem(position) {
    await this.click(sprintf(this.positionItem, position));
  }

  async submit(jobDetails) {
    const { location, position } = jobDetails;

    await this.filterLocation(location);
    await this.clickPositionItem(position);
  }

  async getPositionsByLocation(jobDetails) {
    const { location } = jobDetails;

    console.log(`\n${location}`);

    await this.filterLocation(location);

    const positionsCount = await this.getCount(this.positionText);

    for (var index = 1; index <= positionsCount; index++) {
      await this.getPosition(index);
      await this.getPositionUrl(index);
    }
  }
}
