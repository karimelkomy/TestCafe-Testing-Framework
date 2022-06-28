import SupplierSideBar from "../../components/marketplace/supplier-stores/SupplierSideBar";
import ReceivedRfqsModule from "../../components/marketplace/supplier-stores/ReceivedRfqsModule";


export default class SupplierPortal{
    constructor(){
        this.supplierSideBar = new SupplierSideBar();
        this.receivedRfqsModule = new ReceivedRfqsModule();
    }

    async openReceiveRfqs(){
        await this.supplierSideBar.clickResolvedRfqs();
    }

    async openTopReceivedRfq(){
        this.openReceiveRfqs();
        await this.receivedRfqsModule.selectTopRfq();
    }
}