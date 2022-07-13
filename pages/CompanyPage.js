import LeadershipSection from "../components/company/LeadershipSection";

export default class CompanyPage {
  constructor() {
    this.leadershipSection = new LeadershipSection();
  }

  async validateLeadershipSection() {
    await this.leadershipSection.validateHeader();
  }
}
