import CareersSection from "../components/careers/CareersSection";
import JoinUsModel from "../components/careers/JoinUsModel";
import JobDetailsModel from "../components/careers/JobDetailsModel";
import ApplicationModel from "../components/careers/ApplicationModel";

export default class CareerPage {
  constructor() {
    this.careersSection = new CareersSection();
    this.joinUsModel = new JoinUsModel();
    this.jobDetailsModel = new JobDetailsModel();
    this.applicationModel = new ApplicationModel();
  }

  async applyForJob(jobDetails) {
    await this.careersSection.clickOpenPositionsButton();
    await this.joinUsModel.submit(jobDetails);
    await this.jobDetailsModel.apply();
    await this.applicationModel.submit(jobDetails);
  }

  async logAllPositions(jobsDetails) {
    await this.careersSection.clickOpenPositionsButton();

    for (let jobDetails of jobsDetails) {
      await this.joinUsModel.getPositionsByLocation(jobDetails);
    }
  }
}
