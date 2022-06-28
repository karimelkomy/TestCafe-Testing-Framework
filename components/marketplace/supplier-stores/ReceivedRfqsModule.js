import GenericElement from "../../shared/core/GenericElement";
import { sprintf } from "sprintf-js";

export default class ReceivedRfqsModule extends GenericElement{
    constructor(){
        super();
        this.topRfq = `(//div[@role="rowgroup" and @unselectable="on"]//button)[1]`
        this.rfqSelectorById = `//button[text()=" %s "]`;
    }

    async selectRfqById(requestId){
        await this.click(sprintf(this.rfqSelectorById, requestId));
    }

    async selectTopRfq(){
        await this.click(this.topRfq);
    }
}

