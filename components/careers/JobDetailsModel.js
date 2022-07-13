import { sprintf } from "sprintf-js";
import GenericElement from "../shared/core/GenericElement";
import { JobSections } from "../../data/JobSections";

export default class JobDetailsModel extends GenericElement {
  constructor() {
    super();
    this.jobSectionText =
      '//div[contains(@class, "requirements")][.//h2[text()="%s"]]';
    this.applyButton = '//input[@value="Apply"]';
  }

  async validateJobSections() {
    for (let JobSection of JobSections) {
      await this.validateElementVisibility(
        sprintf(this.jobSectionText, JobSection)
      );
    }
  }

  async clickApplyButton() {
    await this.click(this.applyButton);
  }

  async apply() {
    await this.validateJobSections();
    await this.clickApplyButton();
  }
}
