import GenericElement from "../shared/core/GenericElement";

export default class LeadershipSection extends GenericElement {
  constructor() {
    super();
    this.leadershipHeader = '//section[.//h2[text()="Leadership"]]';
  }

  async validateHeader() {
    await this.validateElementVisibility(this.leadershipHeader);
  }
}
