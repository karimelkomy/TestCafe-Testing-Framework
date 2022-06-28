import { urls, customTest } from '../../../data/marketplace/constants/urls';
import HomePage from '../../../pages/marketplace/HomePage';
import SupplierStorePage from '../../../pages/marketplace/SupplierStorePage';
import { marketplaceBuyerDetails } from '../../../data/marketplace/constants/marketplaceUserDetails';
import { deliveryLocationDetails } from '../../../data/marketplace/constants/deliveryLocationDetails';
import { productDetails } from '../../../data/marketplace/constants/productDetails';
import { rfqDetails } from '../../../data/marketplace/constants/rfqDetails';
import { supplierDetails } from '../../../data/marketplace/constants/supplierDetails';
import marketplaceUrls from '../../../data/marketplace/constants/urls';
import ProductViewPage from '../../../pages/marketplace/ProductViewPage';
import RfqDraftsPage from '../../../pages/marketplace/RfqDraftsPage';
import RfqsSubmittedPage from '../../../pages/marketplace/RfqsSubmittedPage';
import { navigateTo } from '../../../utilities/helpers';
import supplierUrls from '../../../data/supplier/constants/urls';
import SignInPage from '../../../pages/supplier/SignInPage';
import Search from '../../../components/marketplace/homepage/Search';
import SupplierPortal from '../../../pages/supplier/SupplierPortal';
import { AutoWidthCalculator } from 'ag-grid-community';

const buyerUrl = marketplaceUrls.buyerUrl;

fixture`Marketplace`.page(buyerUrl).beforeEach(async (t) => {
	await t.maximizeWindow();
	await t.setNativeDialogHandler(() => true);
});

/** more discussion is needed
 * Scenario:
 * 1. Starting from marketplace homepage.
 * 2. Sign in as a buyer.
 * 3. Buyer submits a RFQ.
 * 4. Supplier submits a quote.
 * 5. Buyer accepts the quote.
 * 7. Supplier accepts the order.
 * 8. Supplier generates a delivery note.
 * 9. Buyer accepts the delivery note.
 * 10. Buyer submits a payment. (with sadad)
 * 12. Supplier confirms the payment.
 */

test('Buyer submit RFQ, successfully', async (t) => {
	const homePage = new HomePage();
	const supplierStorePage = new SupplierStorePage();
	const productViewPage = new ProductViewPage();
	const rfqDraftsPage = new RfqDraftsPage();
	const rfqsSubmittedPage = new RfqsSubmittedPage();
	const signInPage = new SignInPage();
	const supplierPortal = new SupplierPortal();
	const search = new Search();

	// await homePage.register(marketplaceBuyerDetails); // BUG: newly created users can not be automatically verified
	await homePage.signIn(marketplaceBuyerDetails);

	console.log(`CUSTOM LOG: Buyer Details: ${JSON.stringify(marketplaceBuyerDetails, null, 2)}`);
	console.log(`PRODUCT DETAILS: ${JSON.stringify(productDetails, null, 2)}`);

	await search.goToSupplierStore(supplierDetails);

	await supplierStorePage.openProductCard({ productDetails });
	await productViewPage.addToRfq({ productDetails, marketplaceBuyerDetails });

	await homePage.openRfqs(marketplaceBuyerDetails);
	await rfqDraftsPage.submit({ productDetails, rfqDetails, supplierDetails, deliveryLocationDetails });
	await rfqsSubmittedPage.submit({ productDetails, rfqDetails, supplierDetails, deliveryLocationDetails });

	await navigateTo(supplierUrls.supplierLogin);
	await signInPage.signIn(supplierDetails);

	//TODO: use the RFQ ID instead.
	await supplierPortal.openTopReceivedRfq();
});

test('Verify buyer registration', async (t) => {
	const homePage = new HomePage();
	await homePage.signIn(marketplaceBuyerDetails);
}).meta({
	customTest: 'Verify_buyer_registration',
});
