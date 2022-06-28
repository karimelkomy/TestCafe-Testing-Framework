const currenciesArray = [
	{
		symbol: '$',
		currency: 'US Dollar',
		code: 'USD',
	},
	{
		symbol: 'CA$',
		currency: 'Canadian Dollar',
		code: 'CAD',
	},
	{
		symbol: '€',
		currency: 'Euro',
		code: 'EUR',
	},
	{
		symbol: 'AED',
		currency: 'United Arab Emirates Dirham',
		code: 'AED',
	},
	{
		symbol: 'Af',
		currency: 'Afghan Afghani',
		code: 'AFN',
	},
	{
		symbol: 'ALL',
		currency: 'Albanian Lek',
		code: 'ALL',
	},
	{
		symbol: 'AMD',
		currency: 'Armenian Dram',
		code: 'AMD',
	},
	{
		symbol: 'AR$',
		currency: 'Argentine Peso',
		code: 'ARS',
	},
	{
		symbol: 'AU$',
		currency: 'Australian Dollar',
		code: 'AUD',
	},
	{
		symbol: 'man.',
		currency: 'Azerbaijani Manat',
		code: 'AZN',
	},
	{
		symbol: 'KM',
		currency: 'Bosnia-Herzegovina Convertible Mark',
		code: 'BAM',
	},
	{
		symbol: 'Tk',
		currency: 'Bangladeshi Taka',
		code: 'BDT',
	},
	{
		symbol: 'BGN',
		currency: 'Bulgarian Lev',
		code: 'BGN',
	},
	{
		symbol: 'BD',
		currency: 'Bahraini Dinar',
		code: 'BHD',
	},
	{
		symbol: 'FBu',
		currency: 'Burundian Franc',
		code: 'BIF',
	},
	{
		symbol: 'BN$',
		currency: 'Brunei Dollar',
		code: 'BND',
	},
	{
		symbol: 'Bs',
		currency: 'Bolivian Boliviano',
		code: 'BOB',
	},
	{
		symbol: 'R$',
		currency: 'Brazilian Real',
		code: 'BRL',
	},
	{
		symbol: 'BWP',
		currency: 'Botswanan Pula',
		code: 'BWP',
	},
	{
		symbol: 'Br',
		currency: 'Belarusian Ruble',
		code: 'BYN',
	},
	{
		symbol: 'BZ$',
		currency: 'Belize Dollar',
		code: 'BZD',
	},
	{
		symbol: 'CDF',
		currency: 'Congolese Franc',
		code: 'CDF',
	},
	{
		symbol: 'CHF',
		currency: 'Swiss Franc',
		code: 'CHF',
	},
	{
		symbol: 'CL$',
		currency: 'Chilean Peso',
		code: 'CLP',
	},
	{
		symbol: 'CN¥',
		currency: 'Chinese Yuan',
		code: 'CNY',
	},
	{
		symbol: 'CO$',
		currency: 'Colombian Peso',
		code: 'COP',
	},
	{
		symbol: '₡',
		currency: 'Costa Rican Colón',
		code: 'CRC',
	},
	{
		symbol: 'CV$',
		currency: 'Cape Verdean Escudo',
		code: 'CVE',
	},
	{
		symbol: 'Kč',
		currency: 'Czech Republic Koruna',
		code: 'CZK',
	},
	{
		symbol: 'Fdj',
		currency: 'Djiboutian Franc',
		code: 'DJF',
	},
	{
		symbol: 'Dkr',
		currency: 'Danish Krone',
		code: 'DKK',
	},
	{
		symbol: 'RD$',
		currency: 'Dominican Peso',
		code: 'DOP',
	},
	{
		symbol: 'DA',
		currency: 'Algerian Dinar',
		code: 'DZD',
	},
	{
		symbol: 'Ekr',
		currency: 'Estonian Kroon',
		code: 'EEK',
	},
	{
		symbol: 'EGP',
		currency: 'Egyptian Pound',
		code: 'EGP',
	},
	{
		symbol: 'Nfk',
		currency: 'Eritrean Nakfa',
		code: 'ERN',
	},
	{
		symbol: 'Br',
		currency: 'Ethiopian Birr',
		code: 'ETB',
	},
	{
		symbol: '£',
		currency: 'British Pound Sterling',
		code: 'GBP',
	},
	{
		symbol: 'GEL',
		currency: 'Georgian Lari',
		code: 'GEL',
	},
	{
		symbol: 'GH₵',
		currency: 'Ghanaian Cedi',
		code: 'GHS',
	},
	{
		symbol: 'FG',
		currency: 'Guinean Franc',
		code: 'GNF',
	},
	{
		symbol: 'GTQ',
		currency: 'Guatemalan Quetzal',
		code: 'GTQ',
	},
	{
		symbol: 'HK$',
		currency: 'Hong Kong Dollar',
		code: 'HKD',
	},
	{
		symbol: 'HNL',
		currency: 'Honduran Lempira',
		code: 'HNL',
	},
	{
		symbol: 'kn',
		currency: 'Croatian Kuna',
		code: 'HRK',
	},
	{
		symbol: 'Ft',
		currency: 'Hungarian Forint',
		code: 'HUF',
	},
	{
		symbol: 'Rp',
		currency: 'Indonesian Rupiah',
		code: 'IDR',
	},
	{
		symbol: '₪',
		currency: 'Israeli New Sheqel',
		code: 'ILS',
	},
	{
		symbol: 'Rs',
		currency: 'Indian Rupee',
		code: 'INR',
	},
	{
		symbol: 'IQD',
		currency: 'Iraqi Dinar',
		code: 'IQD',
	},
	{
		symbol: 'IRR',
		currency: 'Iranian Rial',
		code: 'IRR',
	},
	{
		symbol: 'Ikr',
		currency: 'Icelandic Króna',
		code: 'ISK',
	},
	{
		symbol: 'J$',
		currency: 'Jamaican Dollar',
		code: 'JMD',
	},
	{
		symbol: 'JD',
		currency: 'Jordanian Dinar',
		code: 'JOD',
	},
	{
		symbol: '¥',
		currency: 'Japanese Yen',
		code: 'JPY',
	},
	{
		symbol: 'Ksh',
		currency: 'Kenyan Shilling',
		code: 'KES',
	},
	{
		symbol: 'KHR',
		currency: 'Cambodian Riel',
		code: 'KHR',
	},
	{
		symbol: 'CF',
		currency: 'Comorian Franc',
		code: 'KMF',
	},
	{
		symbol: '₩',
		currency: 'South Korean Won',
		code: 'KRW',
	},
	{
		symbol: 'KD',
		currency: 'Kuwaiti Dinar',
		code: 'KWD',
	},
	{
		symbol: 'KZT',
		currency: 'Kazakhstani Tenge',
		code: 'KZT',
	},
	{
		symbol: 'LB£',
		currency: 'Lebanese Pound',
		code: 'LBP',
	},
	{
		symbol: 'SLRs',
		currency: 'Sri Lankan Rupee',
		code: 'LKR',
	},
	{
		symbol: 'Lt',
		currency: 'Lithuanian Litas',
		code: 'LTL',
	},
	{
		symbol: 'Ls',
		currency: 'Latvian Lats',
		code: 'LVL',
	},
	{
		symbol: 'LD',
		currency: 'Libyan Dinar',
		code: 'LYD',
	},
	{
		symbol: 'MAD',
		currency: 'Moroccan Dirham',
		code: 'MAD',
	},
	{
		symbol: 'MDL',
		currency: 'Moldovan Leu',
		code: 'MDL',
	},
	{
		symbol: 'MGA',
		currency: 'Malagasy Ariary',
		code: 'MGA',
	},
	{
		symbol: 'MKD',
		currency: 'Macedonian Denar',
		code: 'MKD',
	},
	{
		symbol: 'MMK',
		currency: 'Myanma Kyat',
		code: 'MMK',
	},
	{
		symbol: 'MOP$',
		currency: 'Macanese Pataca',
		code: 'MOP',
	},
	{
		symbol: 'MURs',
		currency: 'Mauritian Rupee',
		code: 'MUR',
	},
	{
		symbol: 'MX$',
		currency: 'Mexican Peso',
		code: 'MXN',
	},
	{
		symbol: 'RM',
		currency: 'Malaysian Ringgit',
		code: 'MYR',
	},
	{
		symbol: 'MTn',
		currency: 'Mozambican Metical',
		code: 'MZN',
	},
	{
		symbol: 'N$',
		currency: 'Namibian Dollar',
		code: 'NAD',
	},
	{
		symbol: '₦',
		currency: 'Nigerian Naira',
		code: 'NGN',
	},
	{
		symbol: 'C$',
		currency: 'Nicaraguan Córdoba',
		code: 'NIO',
	},
	{
		symbol: 'Nkr',
		currency: 'Norwegian Krone',
		code: 'NOK',
	},
	{
		symbol: 'Nrequests',
		currency: 'Nepalese Rupee',
		code: 'NPR',
	},
	{
		symbol: 'NZ$',
		currency: 'New Zealand Dollar',
		code: 'NZD',
	},
	{
		symbol: 'OMR',
		currency: 'Omani Rial',
		code: 'OMR',
	},
	{
		symbol: 'B/.',
		currency: 'Panamanian Balboa',
		code: 'PAB',
	},
	{
		symbol: 'S/.',
		currency: 'Peruvian Nuevo Sol',
		code: 'PEN',
	},
	{
		symbol: '₱',
		currency: 'Philippine Peso',
		code: 'PHP',
	},
	{
		symbol: 'PKRs',
		currency: 'Pakistani Rupee',
		code: 'PKR',
	},
	{
		symbol: 'zł',
		currency: 'Polish Zloty',
		code: 'PLN',
	},
	{
		symbol: '₲',
		currency: 'Paraguayan Guarani',
		code: 'PYG',
	},
	{
		symbol: 'QR',
		currency: 'Qatari Rial',
		code: 'QAR',
	},
	{
		symbol: 'RON',
		currency: 'Romanian Leu',
		code: 'RON',
	},
	{
		symbol: 'din.',
		currency: 'Serbian Dinar',
		code: 'RSD',
	},
	{
		symbol: 'RUB',
		currency: 'Russian Ruble',
		code: 'RUB',
	},
	{
		symbol: 'RWF',
		currency: 'Rwandan Franc',
		code: 'RWF',
	},
	{
		symbol: 'SR',
		currency: 'Saudi Riyal',
		code: 'SAR',
	},
	{
		symbol: 'SDG',
		currency: 'Sudanese Pound',
		code: 'SDG',
	},
	{
		symbol: 'Skr',
		currency: 'Swedish Krona',
		code: 'SEK',
	},
	{
		symbol: 'S$',
		currency: 'Singapore Dollar',
		code: 'SGD',
	},
	{
		symbol: 'Ssh',
		currency: 'Somali Shilling',
		code: 'SOS',
	},
	{
		symbol: 'SY£',
		currency: 'Syrian Pound',
		code: 'SYP',
	},
	{
		symbol: '฿',
		currency: 'Thai Baht',
		code: 'THB',
	},
	{
		symbol: 'DT',
		currency: 'Tunisian Dinar',
		code: 'TND',
	},
	{
		symbol: 'T$',
		currency: 'Tongan Paʻanga',
		code: 'TOP',
	},
	{
		symbol: 'TL',
		currency: 'Turkish Lira',
		code: 'TRY',
	},
	{
		symbol: 'TT$',
		currency: 'Trinidad and Tobago Dollar',
		code: 'TTD',
	},
	{
		symbol: 'NT$',
		currency: 'New Taiwan Dollar',
		code: 'TWD',
	},
	{
		symbol: 'TSh',
		currency: 'Tanzanian Shilling',
		code: 'TZS',
	},
	{
		symbol: '₴',
		currency: 'Ukrainian Hryvnia',
		code: 'UAH',
	},
	{
		symbol: 'USh',
		currency: 'Ugandan Shilling',
		code: 'UGX',
	},
	{
		symbol: '$U',
		currency: 'Uruguayan Peso',
		code: 'UYU',
	},
	{
		symbol: 'UZS',
		currency: 'Uzbekistan Som',
		code: 'UZS',
	},
	{
		symbol: 'Bs.F.',
		currency: 'Venezuelan Bolívar',
		code: 'VEF',
	},
	{
		symbol: '₫',
		currency: 'Vietnamese Dong',
		code: 'VND',
	},
	{
		symbol: 'FCFA',
		currency: 'CFA Franc BEAC',
		code: 'XAF',
	},
	{
		symbol: 'CFA',
		currency: 'CFA Franc BCEAO',
		code: 'XOF',
	},
	{
		symbol: 'YR',
		currency: 'Yemeni Rial',
		code: 'YER',
	},
	{
		symbol: 'R',
		currency: 'South African Rand',
		code: 'ZAR',
	},
	{
		symbol: 'ZK',
		currency: 'Zambian Kwacha',
		code: 'ZMK',
	},
	{
		symbol: 'ZWL$',
		currency: 'Zimbabwean Dollar',
		code: 'ZWL',
	},
];

export default currenciesArray;
