const SESSION_KEY = "sslcommerz-poc-sandbox-creds";

const promptCards = [
  "Show me all important initiate-payment parameters.",
  "What is the difference between redirect URLs and IPN?",
  "Which parts of the official docs are covered in this POC now?",
  "What will be replaced later by real AI retrieval?",
];

const knowledgeBase = [
  {
    keywords: ["all", "everything", "parameter", "fields", "initiate"],
    answer:
      "The documentation area now covers the main SSLCommerz integration flow, environment rules, initiate-payment parameters, advanced fields for EMI and verticals, response fields, validation, IPN, refund flows, query APIs, and related developer arena modules. The Try This API panel can switch between multiple API patterns instead of staying fixed on initiate-payment.",
  },
  {
    keywords: ["ipn", "redirect", "success", "fail", "cancel"],
    answer:
      "Success, fail, and cancel URLs are browser redirects. IPN is a server-to-server notification channel. That difference matters because browser redirects are not reliable enough to be the only payment status signal.",
  },
  {
    keywords: ["future", "later", "ai", "rag", "vector", "retrieval", "analyzer", "nlp", "log", "payload"],
    answer:
      "The long-term direction for this panel is AI-centric: log analysis, payload analysis, NLP-style assistance, troubleshooting, and context-aware API guidance. In the current phase it remains a local mock so the interface and workflow can be finalized first.",
  },
  {
    keywords: ["refund", "validation", "query"],
    answer:
      "The documentation now includes dedicated validation, refund, and transaction query flows. Each has its own brief, parameter explanation table, and a Try This API action that routes into the right-side sandbox panel.",
  },
  {
    keywords: ["sandbox", "test", "credentials", "card"],
    answer:
      "Try This API is sandbox-only by design. You can save sandbox credentials in browser session storage from the credential vault so store_id and store_passwd do not need to be retyped for each request mode.",
  },
];

const apiConfigs = {
  initiate: {
    title: "Initiate Payment",
    method: "POST",
    endpoint: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    groups: [
      {
        title: "Authentication and transaction",
        fields: [
          ["storeId", "Store ID", "text", "testbox", "Official sandbox store id.", true],
          ["storePassword", "Store Password", "text", "qwerty", "Official sandbox store password.", true],
          ["totalAmount", "Total Amount", "number", "1200.00", "Transaction amount.", true],
          ["currency", "Currency", "text", "BDT", "Three-character currency code.", true],
          ["tranId", "Transaction ID", "text", "INV-10001", "Unique transaction identifier.", true],
          ["productCategory", "Product Category", "text", "service", "Open text product category.", true],
          ["productName", "Product Name", "text", "SSL AI Copilot POC", "Product or order label.", false],
          ["productProfile", "Product Profile", "text", "general", "general, physical-goods, non-physical-goods, airline-tickets, travel-vertical, telecom-vertical.", false],
          ["multiCardName", "Multi Card Name", "text", "", "Optional gateway list control.", false],
          ["allowedBin", "Allowed BIN", "text", "", "Optional allowed card BIN list.", false],
          ["productAmount", "Product Amount", "text", "1000.00", "Base product amount if tracked separately.", false],
          ["vat", "VAT", "text", "200.00", "Tax amount.", false],
          ["discountAmount", "Discount Amount", "text", "0.00", "Discount amount.", false],
          ["convenienceFee", "Convenience Fee", "text", "0.00", "Extra convenience fee if applicable.", false],
        ],
      },
      {
        title: "Callback URLs",
        fields: [
          ["successUrl", "Success URL", "url", "https://merchant.test/success", "Browser redirect after successful payment.", true],
          ["failUrl", "Fail URL", "url", "https://merchant.test/fail", "Browser redirect after failed payment.", true],
          ["cancelUrl", "Cancel URL", "url", "https://merchant.test/cancel", "Browser redirect after cancelled payment.", true],
          ["ipnUrl", "IPN URL", "url", "https://merchant.test/ipn", "Server-to-server payment notification endpoint.", false],
        ],
      },
      {
        title: "EMI",
        fields: [
          ["emiOption", "EMI Option", "text", "0", "1 enables EMI, 0 disables.", false],
          ["emiMaxInstOption", "EMI Max Installment", "text", "", "Maximum installment option count.", false],
          ["emiSelectedInst", "EMI Selected Installment", "text", "", "Preselected installment from merchant side.", false],
          ["emiAllowOnly", "EMI Allow Only", "text", "0", "1 restricts payment page to EMI-compatible options.", false],
        ],
      },
      {
        title: "Customer",
        fields: [
          ["customerName", "Customer Name", "text", "Nahid Hasan", "Customer name.", true],
          ["customerEmail", "Customer Email", "email", "nahid@example.com", "Customer email for payment receipt.", true],
          ["customerAddress", "Customer Address 1", "text", "Dhaka", "Primary address.", false],
          ["customerAddress2", "Customer Address 2", "text", "", "Optional address line 2.", false],
          ["customerCity", "Customer City", "text", "Dhaka", "Customer city.", false],
          ["customerState", "Customer State", "text", "Dhaka", "Customer state or region.", false],
          ["customerPostcode", "Customer Postcode", "text", "1207", "Customer postcode.", false],
          ["customerCountry", "Customer Country", "text", "Bangladesh", "Customer country.", false],
          ["customerPhone", "Customer Phone", "text", "01700000000", "Customer phone number.", true],
          ["customerFax", "Customer Fax", "text", "", "Optional fax value.", false],
        ],
      },
      {
        title: "Shipping and logistics",
        fields: [
          ["shippingMethod", "Shipping Method", "text", "NO", "YES, NO, Courier, or SSLCOMMERZ_LOGISTIC.", false],
          ["numOfItem", "Number of Items", "text", "1", "Required for logistics flow.", false],
          ["weightOfItems", "Weight of Items", "text", "0.50", "Weight in kg for logistics flow.", false],
          ["logisticPickupId", "Logistic Pickup ID", "text", "", "Pickup ID from merchant portal.", false],
          ["logisticDeliveryType", "Logistic Delivery Type", "text", "", "Logistics delivery mode.", false],
          ["shipName", "Ship Name", "text", "Nahid Hasan", "Shipping recipient name.", false],
          ["shipAddress", "Ship Address 1", "text", "Dhaka", "Shipping address line 1.", false],
          ["shipAddress2", "Ship Address 2", "text", "", "Shipping address line 2.", false],
          ["shipArea", "Ship Area", "text", "", "Shipping area.", false],
          ["shipCity", "Ship City", "text", "Dhaka", "Shipping city.", false],
          ["shipSubCity", "Ship Sub City", "text", "", "Sub-city or thana.", false],
          ["shipState", "Ship State", "text", "Dhaka", "Shipping state.", false],
          ["shipPostcode", "Ship Postcode", "text", "1207", "Shipping postcode.", false],
          ["shipCountry", "Ship Country", "text", "Bangladesh", "Shipping country.", false],
        ],
      },
      {
        title: "Custom values",
        fields: [
          ["valueA", "Value A", "text", "customer-001", "Merchant-defined custom metadata.", false],
          ["valueB", "Value B", "text", "plan-pro", "Merchant-defined custom metadata.", false],
          ["valueC", "Value C", "text", "campaign-april", "Merchant-defined custom metadata.", false],
          ["valueD", "Value D", "text", "internal-note", "Merchant-defined custom metadata.", false],
        ],
      },
      {
        title: "Airline, travel, telecom, and cart",
        fields: [
          ["hoursTillDeparture", "Hours Till Departure", "text", "", "Airline vertical field.", false],
          ["flightType", "Flight Type", "text", "", "Airline vertical field such as Oneway or Return.", false],
          ["pnr", "PNR", "text", "", "Airline vertical field.", false],
          ["journeyFromTo", "Journey From To", "text", "", "Airline route details.", false],
          ["thirdPartyBooking", "Third Party Booking", "text", "", "Yes or No for airline flow.", false],
          ["hotelName", "Hotel Name", "text", "", "Travel vertical field.", false],
          ["lengthOfStay", "Length of Stay", "text", "", "Travel vertical field.", false],
          ["checkInTime", "Check In Time", "text", "", "Travel vertical field.", false],
          ["hotelCity", "Hotel City", "text", "", "Travel vertical field.", false],
          ["productType", "Product Type", "text", "", "Telecom vertical field.", false],
          ["topupNumber", "Topup Number", "text", "", "Telecom vertical field.", false],
          ["countryTopup", "Country Topup", "text", "", "Telecom vertical field.", false],
          ["cart", "Cart JSON", "text", '[{"sku":"REF00001","product":"Plan","quantity":"1","amount":"1200.00","unit_price":"1200.00"}]', "JSON cart structure for supported flows.", false],
        ],
      },
    ],
  },
  validation: {
    title: "Order Validation",
    method: "GET",
    endpoint: "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php",
    groups: [
      {
        title: "Authentication",
        fields: [
          ["storeId", "Store ID", "text", "testbox", "Sandbox store id.", true],
          ["storePassword", "Store Password", "text", "qwerty", "Sandbox store password.", true],
        ],
      },
      {
        title: "Validation request",
        fields: [
          ["validationId", "Validation ID", "text", "VALIDATION_ID_EXAMPLE", "Validation identifier from payment data.", true],
          ["validationFormat", "Format", "text", "json", "json or xml.", false],
          ["validationVersion", "Version", "text", "1", "Validation API version when applicable.", false],
        ],
      },
    ],
  },
  refund: {
    title: "Refund API",
    method: "GET",
    endpoint: "https://sandbox.sslcommerz.com/validator/api/merchantTransIDvalidationAPI.php",
    groups: [
      {
        title: "Authentication",
        fields: [
          ["storeId", "Store ID", "text", "testbox", "Sandbox store id.", true],
          ["storePassword", "Store Password", "text", "qwerty", "Sandbox store password.", true],
        ],
      },
      {
        title: "Refund request",
        fields: [
          ["bankTranId", "Bank Transaction ID", "text", "1709162345070ANJdZV8LyI4cMw", "Original bank transaction id.", true],
          ["refundTransId", "Refund Transaction ID", "text", "TRID0000000001", "Unique refund transaction id.", true],
          ["refundAmount", "Refund Amount", "text", "5.50", "Refund amount.", true],
          ["refundRemarks", "Refund Remarks", "text", "Out of Stock", "Reason for refund.", true],
          ["refundRefeId", "Reference ID", "text", "ORDER-REF-001", "Optional system reconciliation reference.", false],
          ["refundFormat", "Format", "text", "json", "json or xml.", false],
        ],
      },
    ],
  },
  transactionQuery: {
    title: "Transaction Query",
    method: "GET",
    endpoint: "https://sandbox.sslcommerz.com/validator/api/merchantTransIDvalidationAPI.php",
    groups: [
      {
        title: "Authentication",
        fields: [
          ["storeId", "Store ID", "text", "testbox", "Sandbox store id.", true],
          ["storePassword", "Store Password", "text", "qwerty", "Sandbox store password.", true],
        ],
      },
      {
        title: "Query request",
        fields: [
          ["queryTranId", "Transaction ID", "text", "INV-10001", "Use this for query by transaction id.", false],
          ["querySessionKey", "Session Key", "text", "", "Use this for query by session id.", false],
          ["queryFormat", "Format", "text", "json", "json or xml.", false],
        ],
      },
    ],
  },
};

const documentationTables = [
  {
    targetId: "initiateRequestParamTable",
    summary:
      "Official request parameters for `POST /gwprocess/v4/api.php`, grouped to match the SSLCommerz v4 documentation.",
    sections: [
      {
        title: "Integration Required Parameters",
        rows: [
          ["store_id", "string (30)", "Mandatory - Your SSLCOMMERZ Store ID is the integration credential which can be collected through our managers"],
          ["store_passwd", "string (30)", "Mandatory - Your SSLCOMMERZ Store Password is the integration credential which can be collected through our managers"],
          ["total_amount", "decimal (10,2)", "Mandatory - The amount which will process by SSLCOMMERZ. It shall be decimal value (10,2). Example : 55.40. The transaction amount must be from 10.00 BDT to 500000.00 BDT"],
          ["currency", "string (3)", "Mandatory - The currency type must be mentioned. It shall be three characters. Example : BDT, USD, EUR, SGD, INR, MYR, etc. If the transaction currency is not BDT, then it will be converted to BDT based on the current convert rate."],
          ["tran_id", "string (30)", "Mandatory - Unique transaction ID to identify your order in both your end and SSLCOMMERZ"],
          ["product_category", "string (50)", "Mandatory - Mention the product category. It is a open field. Example - clothing, shoes, watches, gift, healthcare, jewellery, top up, toys, baby care, pants, laptop, donation, etc"],
          ["success_url", "string (255)", "Mandatory - It is the callback URL of your website where user will redirect after successful payment"],
          ["fail_url", "string (255)", "Mandatory - It is the callback URL of your website where user will redirect after any failure occure during payment"],
          ["cancel_url", "string (255)", "Mandatory - It is the callback URL of your website where user will redirect if user canceled the transaction"],
          ["ipn_url", "string (255)", "Important! Not mandatory, however better to use to avoid missing any payment notification - It is the Instant Payment Notification (IPN) URL of your website where SSLCOMMERZ will send the transaction's status"],
          ["multi_card_name", "string (30)", "Do not Use! If you do not customize the gateway list - You can control to display the gateway list at SSLCOMMERZ gateway selection page by providing this parameters."],
          ["allowed_bin", "string (255)", "Do not Use! If you do not control on transaction - You can provide the BIN of card to allow the transaction must be completed by this BIN. You can declare by coma ',' separate of these BIN."],
        ],
      },
      {
        title: "Customer Information",
        rows: [
          ["cus_name", "string (50)", "Mandatory - Your customer name to address the customer in payment receipt email"],
          ["cus_email", "string (50)", "Mandatory - Valid email address of your customer to send payment receipt from SSLCOMMERZ end"],
          ["cus_add1", "string (50)", "Mandatory - Address of your customer. Not mandatory but useful if provided"],
          ["cus_add2", "string (50)", "Address line 2 of your customer. Not mandatory but useful if provided"],
          ["cus_city", "string (50)", "Mandatory - City of your customer. Not mandatory but useful if provided"],
          ["cus_state", "string (50)", "State of your customer. Not mandatory but useful if provided"],
          ["cus_postcode", "string (30)", "Mandatory - Postcode of your customer. Not mandatory but useful if provided"],
          ["cus_country", "string (50)", "Mandatory - Country of your customer. Not mandatory but useful if provided"],
          ["cus_phone", "string (20)", "Mandatory - The phone/mobile number of your customer to contact if any issue arises"],
          ["cus_fax", "string (20)", "Fax number of your customer. Not mandatory but useful if provided"],
        ],
      },
      {
        title: "Shipment Information",
        rows: [
          ["shipping_method", "string (50)", "Mandatory - Shipping method of the order. Example: YES or NO or Courier or SSLCOMMERZ_LOGISTIC."],
          ["num_of_item", "integer (1)", "Mandatory - No of product will be shipped. Example: 1 or 2 or etc"],
          ["weight_of_items", "decimal (10,2)", "Mandatory - Weight of products will be shipped. Example: 0.5 or 2.00 or etc in kg"],
          ["logistic_pickup_id", "string (50)", "Mandatory - This is a id from where the SSLCOMMERZ logistic partners will come to receive your product for shipment. You will set and get this pickup information from your merchant portal provided by SSLCOMMERZ."],
          ["logistic_delivery_type", "string (50)", "Mandatory - This information is required by SSLCOMMERZ logistic partners before receiving your product for shipment."],
          ["ship_name", "string (50)", "Mandatory, if shipping_method is YES - Shipping Address of your order. Not mandatory but useful if provided"],
          ["ship_add1", "string (50)", "Mandatory, if shipping_method is YES - Additional Shipping Address of your order. Not mandatory but useful if provided"],
          ["ship_add2", "string (50)", "Additional Shipping Address of your order. Not mandatory but useful if provided"],
          ["ship_area", "string (50)", "Mandatory, if shipping_method is YES - Shipping area of your order. Not mandatory but useful if provided"],
          ["ship_city", "string (50)", "Mandatory, if shipping_method is YES - Shipping city of your order. Not mandatory but useful if provided"],
          ["ship_sub_city", "string (50)", "Mandatory, if shipping_method is YES - Shipping sub city or sub-district or thana of your order. Not mandatory but useful if provided"],
          ["ship_state", "string (50)", "Shipping state of your order. Not mandatory but useful if provided"],
          ["ship_postcode", "string (50)", "Mandatory, if shipping_method is YES - Shipping postcode of your order. Not mandatory but useful if provided"],
          ["ship_country", "string (50)", "Mandatory, if shipping_method is YES - Shipping country of your order. Not mandatory but useful if provided"],
        ],
      },
      {
        title: "Product Information",
        rows: [
          ["product_name", "string (255)", "Mandatory - Mention the product name briefly. Mention the product name by coma separate. Example: Computer,Speaker"],
          ["product_category", "string (100)", "Mandatory - Mention the product category. Example: Electronic or topup or bus ticket or air ticket"],
          ["product_profile", "string (100)", "Mandatory - Mention goods vertical. It is very much necessary for online transactions to avoid chargeback. Use one of: general, physical-goods, non-physical-goods, airline-tickets, travel-vertical, telecom-vertical"],
          ["hours_till_departure", "string (30)", "Mandatory, if product_profile is airline-tickets - Provide the remaining time of departure of flight till at the time of purchasing the ticket."],
          ["flight_type", "string (30)", "Mandatory, if product_profile is airline-tickets - Provide the flight type. Example: Oneway or Return or Multistop"],
          ["pnr", "string (50)", "Mandatory, if product_profile is airline-tickets - Provide the PNR."],
          ["journey_from_to", "string (255)", "Mandatory, if product_profile is airline-tickets - Provide the journey route. Example: DAC-CGP or DAC-CGP CGP-DAC"],
          ["third_party_booking", "string (20)", "Mandatory, if product_profile is airline-tickets - No/Yes. Whether the ticket has been taken from third party booking system."],
          ["hotel_name", "string (255)", "Mandatory, if product_profile is travel-vertical - Please provide the hotel name. Example: Sheraton"],
          ["length_of_stay", "string (30)", "Mandatory, if product_profile is travel-vertical - How long stay in hotel. Example: 2 days"],
          ["check_in_time", "string (30)", "Mandatory, if product_profile is travel-vertical - Checking hours for the hotel room. Example: 24 hrs"],
          ["hotel_city", "string (50)", "Mandatory, if product_profile is travel-vertical - Location of the hotel. Example: Dhaka"],
          ["product_type", "string (30)", "Mandatory, if product_profile is telecom-vertical - For mobile or any recharge, this information is necessary. Example: Prepaid or Postpaid"],
          ["topup_number", "string (150)", "Mandatory, if product_profile is telecom-vertical - Provide the mobile number which will be recharged."],
          ["country_topup", "string (30)", "Mandatory, if product_profile is telecom-vertical - Provide the country name in where the service is given. Example: Bangladesh"],
          ["cart", "json", "JSON data with two elements. product : Max 255 characters, quantity : Quantity in numeric value and amount : Decimal (12,2)"],
          ["product_amount", "decimal (10,2)", "Product price which will be displayed in your merchant panel and will help you to reconcile the transaction."],
          ["vat", "decimal (10,2)", "The VAT included on the product price which will be displayed in your merchant panel and will help you to reconcile the transaction."],
          ["discount_amount", "decimal (10,2)", "Discount given on the invoice which will be displayed in your merchant panel and will help you to reconcile the transaction."],
          ["convenience_fee", "decimal (10,2)", "Any convenience fee imposed on the invoice which will be displayed in your merchant panel and will help you to reconcile the transaction."],
        ],
      },
      {
        title: "Customized or Additional Parameters",
        rows: [
          ["value_a", "string (255)", "Extra parameter to pass your meta data if it is needed. Not mandatory"],
          ["value_b", "string (255)", "Extra parameter to pass your meta data if it is needed. Not mandatory"],
          ["value_c", "string (255)", "Extra parameter to pass your meta data if it is needed. Not mandatory"],
          ["value_d", "string (255)", "Extra parameter to pass your meta data if it is needed. Not mandatory"],
        ],
      },
    ],
  },
  {
    targetId: "initiateReturnedParamTable",
    summary:
      "Official returned parameters from the initiate payment response.",
    rows: [
      ["status", "string (10)", "API connectivity status. If all the required data is provided, then it will return as SUCCESS, neither it will be FAILED"],
      ["failedreason", "string (255)", "If API connectivity is failed then it returns the reason."],
      ["sessionkey", "string (50)", "A unique session key which must be saved at your system to query the transaction status any time (if required)."],
      ["gw", "string", "It will list all active gateways. If you add this key with the parameter of redirectGatewayURL, then it will be redirected to that gateway directly."],
      ["GatewayPageURL", "string (255)", "The URL to where you will redirect the customer to pay. This is the main URL which you will use for the integration."],
      ["storeBanner", "string (255)", "It will return the image URL if any banner is uploaded against the store."],
      ["storeLogo", "string (255)", "It will return the image URL if any logo is uploaded against the store."],
      ["desc", "string", "All gateways' brief description. If you want to know about the individual gateway key, then this parameter will help you."],
    ],
  },
  {
    targetId: "initiateEmiParamTable",
    summary:
      "Official EMI fields from the initiate payment documentation.",
    rows: [
      ["emi_option", "integer (1)", "Mandatory - This is mandatory if transaction is EMI enabled and Value must be 1/0. Here, 1 means customer will get EMI facility for this transaction"],
      ["emi_max_inst_option", "integer (2)", "Max instalment Option, Here customer will get 3,6, 9 instalment at gateway page"],
      ["emi_selected_inst", "integer (2)", "Customer has selected from your Site, So no instalment option will be displayed at gateway page"],
      ["emi_allow_only", "integer (1)", "Value is 1/0, if value is 1 then only EMI transaction is possible, in payment page. No Mobile banking and internet banking channel will not display. This parameter depends on `emi_option` and `emi_selected_inst`"],
    ],
  },
  {
    targetId: "validationRequestParamTable",
    summary:
      "Official request parameters for the order validation API.",
    rows: [
      ["val_id", "string (50)", "Mandatory - A Validation ID against the successful transaction which is provided by SSLCOMMERZ."],
      ["store_id", "string (30)", "Mandatory - Your SSLCOMMERZ Store ID is the integration credential which can be collected through our managers"],
      ["store_passwd", "string (30)", "Mandatory - Your SSLCOMMERZ Store Password is the integration credential which can be collected through our managers"],
      ["format", "string (10)", "Predefined value is json or xml. This parameter is used to get the response in two different format such as json or xml. By default it returns json format."],
      ["v", "integer (1)", "Open for future use only."],
    ],
  },
  {
    targetId: "validationReturnedParamTable",
    summary:
      "Returned fields from order validation used to confirm the payment before fulfillment.",
    rows: [
      ["status", "string (20)", "Transaction Status. This parameter needs to be checked before update your database as a successful transaction. VALID, VALIDATED, PENDING, FAILED"],
      ["tran_date", "datetime", "Transaction date - Payment completion date as 2016-05-08 15:53:49 ( PHP date('Y-m-d H:i:s') )"],
      ["tran_id", "string (30)", "Transaction ID (Unique) that was sent by you during initiation. This parameter needs to be validated with your system database for security"],
      ["val_id", "string (50)", "A Validation ID against the Transaction which is provided by SSLCOMMERZ."],
      ["amount", "decimal (10,2)", "The total amount sent by you. However, it could be changed based on currency type. This parameter needs to be validated with your system database for security"],
      ["store_amount", "decimal (10,2)", "The amount what you will get in your account after bank charge"],
      ["bank_tran_id", "string (80)", "The transaction ID at Banks End"],
      ["card_type", "string (50)", "The Bank Gateway Name that customer selected"],
      ["card_no", "string (80)", "Customer’s Card number. However, for Mobile Banking and Internet Banking, it will return customer's reference id."],
      ["card_issuer", "string (50)", "Issuer Bank Name"],
      ["card_brand", "string (30)", "VISA, MASTER, AMEX, IB or MOBILE BANKING"],
      ["card_issuer_country", "string (50)", "Country of Card Issuer Bank"],
      ["card_issuer_country_code", "string (2)", "2 digits short code of Country of Card Issuer Bank"],
      ["currency_type", "string (3)", "The currency you have sent during initiation of this transaction."],
      ["currency_amount", "decimal (10,2)", "The currency amount you have sent during initiation of this transaction."],
      ["currency_rate", "decimal", "Currency conversion rate applied when the transaction currency is different from BDT."],
      ["base_fair", "decimal", "Base fair value returned by the API response example."],
      ["value_a", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["value_b", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["value_c", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["value_d", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["risk_level", "integer (1)", "Transaction's Risk Level - High (1) for most risky transactions and Low (0) for safe transactions."],
      ["risk_title", "string (50)", "Transaction's Risk Level Description"],
      ["APIConnect", "string (30)", "API Connection Status - INVALID_REQUEST, FAILED, INACTIVE, DONE"],
      ["validated_on", "datetime", "Date and time when the validation is confirmed by the API."],
      ["gw_version", "string", "Gateway version returned by the validation response."],
    ],
  },
  {
    targetId: "refundRequestParamTable",
    summary:
      "Official request parameters for initiating a refund.",
    rows: [
      ["bank_tran_id", "string (80)", "Mandatory - The transaction ID at Banks End"],
      ["refund_trans_id", "string (30)", "Mandatory - Generate a unique transaction ID for the refund to identify your order on both your end and SSLCOMMERZ. Note: this is a new parameter introduced on 24/02/2025"],
      ["store_id", "string (30)", "Mandatory - Your SSLCOMMERZ Store ID is the integration credential which can be collected through our managers"],
      ["store_passwd", "string (30)", "Mandatory - Your SSLCOMMERZ Store Password is the integration credential which can be collected through our managers"],
      ["refund_amount", "decimal (10,2)", "Mandatory - The amount will be refunded to card holder's account."],
      ["refund_remarks", "string (255)", "Mandatory - The reason of refund."],
      ["refe_id", "string (50)", "You can provide any reference number of your system to reconcile."],
      ["format", "string (10)", "Predefined value is json or xml. This parameter is used to get the response in two different format such as json or xml. By default it returns json format."],
    ],
  },
  {
    targetId: "refundReturnedParamTable",
    summary:
      "Official returned parameters for refund initiation.",
    rows: [
      ["APIConnect", "string (30)", "API Connection Status - INVALID_REQUEST, FAILED, INACTIVE, DONE"],
      ["bank_tran_id", "string (80)", "The transaction ID at Banks End"],
      ["trans_id", "string (30)", "Will be return only when the Authentication is success and the bank_tran_id is a valid id"],
      ["refund_ref_id", "string (50)", "This parameter will be returned only when the request successfully initiates"],
      ["status", "string (30)", "Will be returned only when the authentication is success and the value will be as below: success, failed, processing"],
      ["errorReason", "string (255)", "Failure reason to initiate the refund request"],
    ],
  },
  {
    targetId: "refundQueryParamTable",
    summary:
      "Official request parameters for querying refund status.",
    rows: [
      ["refund_ref_id", "string (50)", "Mandatory - This parameter will be returned only when the request successfully initiates"],
      ["store_id", "string (30)", "Mandatory - Your SSLCOMMERZ Store ID is the integration credential which can be collected through our managers"],
      ["store_passwd", "string (30)", "Mandatory - Your SSLCOMMERZ Store Password is the integration credential which can be collected through our managers"],
    ],
  },
  {
    targetId: "refundQueryReturnedParamTable",
    summary:
      "Official returned parameters for refund status query.",
    rows: [
      ["APIConnect", "string (30)", "API Connection Status - INVALID_REQUEST, FAILED, INACTIVE, DONE"],
      ["bank_tran_id", "string (80)", "The transaction ID at Banks End"],
      ["tran_id", "string (30)", "Will be return only when the Authentication is success and the bank_tran_id is a valid id"],
      ["refund_ref_id", "string (50)", "This parameter will be returned only when the request successfully initiates"],
      ["initiated_on", "datetime", "Date and time when the refund request has been initiated"],
      ["refunded_on", "datetime", "Date and time when the refund request has been proceeded all the processes."],
      ["status", "string (30)", "Will be return only when the Authentication is success and the value will be as below: refunded, processing, cancelled"],
      ["errorReason", "string (255)", "Failure reason to query the refund request"],
    ],
  },
  {
    targetId: "querySessionRequestParamTable",
    summary:
      "Official request parameters for transaction query by session ID.",
    rows: [
      ["sessionkey", "string (50)", "Mandatory - The session id has been generated at the time of transaction initiated."],
      ["store_id", "string (30)", "Mandatory - Your SSLCOMMERZ Store ID is the integration credential which can be collected through our managers"],
      ["store_passwd", "string (30)", "Mandatory - Your SSLCOMMERZ Store Password is the integration credential which can be collected through our managers"],
    ],
  },
  {
    targetId: "querySessionReturnedParamTable",
    summary:
      "Official returned parameters for transaction query by session ID.",
    rows: [
      ["APIConnect", "string (30)", "API Connection Status - INVALID_REQUEST, FAILED, INACTIVE, DONE"],
      ["status", "string (20)", "Transaction Status. VALID, VALIDATED, PENDING, FAILED"],
      ["sessionkey", "string (50)", "The session id has been generated at the time of transaction initiated."],
      ["tran_date", "datetime", "Transaction date - Payment completion date as 2016-05-08 15:53:49 ( PHP date('Y-m-d H:i:s') )"],
      ["tran_id", "string (30)", "Transaction ID (Unique) that was sent by you during initiation. This parameter needs to be validated with your system database for security"],
      ["val_id", "string (50)", "A Validation ID against the Transaction which is provided by SSLCOMMERZ."],
      ["amount", "decimal (10,2)", "The total amount sent by you. However, it could be changed based on currency type."],
      ["store_amount", "decimal (10,2)", "The amount what you will get in your account after bank charge"],
      ["card_type", "string (50)", "The Bank Gateway Name that customer selected"],
      ["card_no", "string (80)", "Customer’s Card number. However, for Mobile Banking and Internet Banking, it will return customer's reference id."],
      ["currency", "string (3)", "Currency Type which will be settled with your merchant account after deducting the Gateway charges."],
      ["bank_tran_id", "string (80)", "The transaction ID at Banks End"],
      ["card_issuer", "string (50)", "Issuer Bank Name"],
      ["card_brand", "string (30)", "VISA, MASTER, AMEX, IB or MOBILE BANKING"],
      ["card_issuer_country", "string (50)", "Country of Card Issuer Bank"],
      ["card_issuer_country_code", "string (2)", "2 digits short code of Country of Card Issuer Bank"],
      ["currency_type", "string (3)", "The currency you have sent during initiation of this transaction."],
      ["currency_amount", "decimal (10,2)", "The currency amount you have sent during initiation of this transaction."],
      ["emi_instalment", "integer (2)", "Tenure of the EMI transaction which is choosen by the customer."],
      ["emi_amount", "decimal (10,2)", "EMI charge which will be paid to the Issuer Bank"],
      ["discount_percentage", "decimal (10,2)", "If customer gets any discount based on the campaign is managed by both you and SSLCOMMERZ."],
      ["discount_remarks", "string (255)", "Short description of the campaign which is managed by both you and SSLCOMMERZ."],
      ["value_a", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["value_b", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["value_c", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["value_d", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["risk_level", "integer (1)", "Transaction's Risk Level - High (1) for most risky transactions and Low (0) for safe transactions."],
      ["risk_title", "string (50)", "Transaction's Risk Level Decription"],
    ],
  },
  {
    targetId: "queryTranRequestParamTable",
    summary:
      "Official request parameters for transaction query by merchant transaction ID.",
    rows: [
      ["tran_id", "string (50)", "Mandatory - Transaction ID (Unique) that was sent by you during initiation."],
      ["store_id", "string (30)", "Mandatory - Your SSLCOMMERZ Store ID is the integration credential which can be collected through our managers"],
      ["store_passwd", "string (30)", "Mandatory - Your SSLCOMMERZ Store Password is the integration credential which can be collected through our managers"],
    ],
  },
  {
    targetId: "queryTranReturnedParamTable",
    summary:
      "Official returned parameters for transaction query by transaction ID.",
    rows: [
      ["APIConnect", "string (30)", "API Connection Status - INVALID_REQUEST, FAILED, INACTIVE, DONE"],
      ["no_of_trans_found", "integer (2)", "No of transaction is found against the transaction id."],
      ["element", "json", "Details of individual transactions."],
      ["element.[].status", "string (20)", "Transaction Status. VALID, VALIDATED, PENDING, FAILED"],
      ["element.[].tran_date", "datetime", "Transaction date - Payment completion date as 2016-05-08 15:53:49 ( PHP date('Y-m-d H:i:s') )"],
      ["element.[].tran_id", "string (30)", "Transaction ID (Unique) that was sent by you during initiation. This parameter needs to be validated with your system database for security"],
      ["element.[].val_id", "string (50)", "A Validation ID against the Transaction which is provided by SSLCOMMERZ."],
      ["element.[].amount", "decimal (10,2)", "The total amount sent by you. However, it could be changed based on currency type."],
      ["element.[].store_amount", "decimal (10,2)", "The amount what you will get in your account after bank charge"],
      ["element.[].card_type", "string (50)", "The Bank Gateway Name that customer selected"],
      ["element.[].card_no", "string (80)", "Customer’s Card number. However, for Mobile Banking and Internet Banking, it will return customer's reference id."],
      ["element.[].currency", "string (3)", "Currency Type which will be settled with your merchant account after deducting the Gateway charges."],
      ["element.[].bank_tran_id", "string (80)", "The transaction ID at Banks End"],
      ["element.[].card_issuer", "string (50)", "Issuer Bank Name"],
      ["element.[].card_brand", "string (30)", "VISA, MASTER, AMEX, IB or MOBILE BANKING"],
      ["element.[].card_issuer_country", "string (50)", "Country of Card Issuer Bank"],
      ["element.[].card_issuer_country_code", "string (2)", "2 digits short code of Country of Card Issuer Bank"],
      ["element.[].currency_type", "string (3)", "The currency you have sent during initiation of this transaction."],
      ["element.[].currency_amount", "decimal (10,2)", "The currency amount you have sent during initiation of this transaction."],
      ["element.[].emi_instalment", "integer (2)", "Tenure of the EMI transaction which is choosen by the customer."],
      ["element.[].emi_amount", "decimal (10,2)", "EMI charge which will be paid to the Issuer Bank"],
      ["element.[].discount_percentage", "decimal (10,2)", "If customer gets any discount based on the campaign is managed by both you and SSLCOMMERZ."],
      ["element.[].discount_remarks", "string (255)", "Short description of the campaign which is managed by both you and SSLCOMMERZ."],
      ["element.[].value_a", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["element.[].value_b", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["element.[].value_c", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["element.[].value_d", "string (255)", "Same Value will be returned as Passed during initiation"],
      ["element.[].risk_level", "integer (1)", "Transaction's Risk Level - High (1) for most risky transactions and Low (0) for safe transactions."],
      ["element.[].risk_title", "string (50)", "Transaction's Risk Level Description"],
      ["element.[].error", "string (255)", "Transaction failed reason (if any)!"],
    ],
  },
];

const payloadKeyMaps = {
  initiate: {
    storeId: "store_id",
    storePassword: "store_passwd",
    totalAmount: "total_amount",
    currency: "currency",
    tranId: "tran_id",
    productCategory: "product_category",
    productName: "product_name",
    productProfile: "product_profile",
    multiCardName: "multi_card_name",
    allowedBin: "allowed_bin",
    productAmount: "product_amount",
    vat: "vat",
    discountAmount: "discount_amount",
    convenienceFee: "convenience_fee",
    successUrl: "success_url",
    failUrl: "fail_url",
    cancelUrl: "cancel_url",
    ipnUrl: "ipn_url",
    emiOption: "emi_option",
    emiMaxInstOption: "emi_max_inst_option",
    emiSelectedInst: "emi_selected_inst",
    emiAllowOnly: "emi_allow_only",
    customerName: "cus_name",
    customerEmail: "cus_email",
    customerAddress: "cus_add1",
    customerAddress2: "cus_add2",
    customerCity: "cus_city",
    customerState: "cus_state",
    customerPostcode: "cus_postcode",
    customerCountry: "cus_country",
    customerPhone: "cus_phone",
    customerFax: "cus_fax",
    shippingMethod: "shipping_method",
    numOfItem: "num_of_item",
    weightOfItems: "weight_of_items",
    logisticPickupId: "logistic_pickup_id",
    logisticDeliveryType: "logistic_delivery_type",
    shipName: "ship_name",
    shipAddress: "ship_add1",
    shipAddress2: "ship_add2",
    shipArea: "ship_area",
    shipCity: "ship_city",
    shipSubCity: "ship_sub_city",
    shipState: "ship_state",
    shipPostcode: "ship_postcode",
    shipCountry: "ship_country",
    valueA: "value_a",
    valueB: "value_b",
    valueC: "value_c",
    valueD: "value_d",
    hoursTillDeparture: "hours_till_departure",
    flightType: "flight_type",
    pnr: "pnr",
    journeyFromTo: "journey_from_to",
    thirdPartyBooking: "third_party_booking",
    hotelName: "hotel_name",
    lengthOfStay: "length_of_stay",
    checkInTime: "check_in_time",
    hotelCity: "hotel_city",
    productType: "product_type",
    topupNumber: "topup_number",
    countryTopup: "country_topup",
    cart: "cart",
  },
  validation: {
    storeId: "store_id",
    storePassword: "store_passwd",
    validationId: "val_id",
    validationFormat: "format",
    validationVersion: "v",
  },
  refund: {
    storeId: "store_id",
    storePassword: "store_passwd",
    bankTranId: "bank_tran_id",
    refundTransId: "refund_trans_id",
    refundAmount: "refund_amount",
    refundRemarks: "refund_remarks",
    refundRefeId: "refe_id",
    refundFormat: "format",
  },
  transactionQuery: {
    storeId: "store_id",
    storePassword: "store_passwd",
    queryTranId: "tran_id",
    querySessionKey: "sessionkey",
    queryFormat: "format",
  },
};

const promptGrid = document.getElementById("promptGrid");
const chatFeed = document.getElementById("chatFeed");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const apiForm = document.getElementById("apiForm");
const apiFields = document.getElementById("apiFields");
const curlPreview = document.getElementById("curlPreview");
const responsePreview = document.getElementById("responsePreview");
const apiSelector = document.getElementById("apiSelector");
const apiSubmitBtn = document.getElementById("apiSubmitBtn");
const copyCurlBtn = document.getElementById("copyCurlBtn");
const credentialForm = document.getElementById("credentialForm");
const savedStoreId = document.getElementById("savedStoreId");
const savedStorePassword = document.getElementById("savedStorePassword");
const clearCreds = document.getElementById("clearCreds");
const docLinks = document.querySelectorAll(".doc-link");
const apiTryButtons = document.querySelectorAll("[data-api-target]");
const panelFullscreenBtn = document.getElementById("panelFullscreenBtn");
const panelCloseBtn = document.getElementById("panelCloseBtn");
const responseBlock = document.getElementById("responseBlock");

let requestInFlight = false;
let copyCurlResetTimer;

function addMessage(role, text) {
  const node = document.createElement("div");
  node.className = `message ${role}`;
  node.textContent = text;
  chatFeed.appendChild(node);
  chatFeed.scrollTop = chatFeed.scrollHeight;
}

function getAnswer(question) {
  const normalized = question.toLowerCase();
  const match = knowledgeBase.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );

  if (match) {
    return match.answer;
  }

  return "This assistant remains a local mock, but the page now reflects a much wider portion of the official SSLCommerz developer documentation. Ask about initiate-payment fields, IPN, validation, refund, query APIs, sandbox data, or the future AI roadmap.";
}

function buildPromptCards() {
  promptCards.forEach((prompt) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = prompt;
    button.addEventListener("click", () => {
      chatInput.value = prompt;
      chatInput.focus();
    });
    promptGrid.appendChild(button);
  });
}

function appendDocTableHeader(target) {
  const row = document.createElement("div");
  row.className = "row row-head";
  row.innerHTML = "<span>Param Name</span><span>Data Type</span><span>Description</span>";
  target.appendChild(row);
}

function appendDocRows(target, rows) {
  rows.forEach(([name, type, description]) => {
    const row = document.createElement("div");
    row.className = "row row-three";
    row.innerHTML = `<span><code>${name}</code></span><span>${type}</span><span>${description}</span>`;
    target.appendChild(row);
  });
}

function buildDocumentationTables() {
  documentationTables.forEach((table) => {
    const target = document.getElementById(table.targetId);
    if (!target) return;

    target.innerHTML = "";

    const summary = document.createElement("div");
    summary.className = "api-brief";
    summary.textContent = table.summary;
    target.appendChild(summary);
    appendDocTableHeader(target);

    if (table.sections) {
      table.sections.forEach((section) => {
        const group = document.createElement("div");
        group.className = "table-section-label";
        group.textContent = section.title;
        target.appendChild(group);
        appendDocRows(target, section.rows);
      });
      return;
    }

    appendDocRows(target, table.rows);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getSessionCreds() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveSessionCreds(storeId, storePassword) {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ storeId: storeId || "", storePassword: storePassword || "" })
  );
}

function hydrateCredentialForm() {
  const creds = getSessionCreds();
  savedStoreId.value = creds.storeId || "";
  savedStorePassword.value = creds.storePassword || "";
}

function applyStoredCredsToApiForm() {
  const creds = getSessionCreds();
  const storeIdField = document.getElementById("storeId");
  const storePasswordField = document.getElementById("storePassword");

  if (storeIdField && creds.storeId) {
    storeIdField.value = creds.storeId;
  }

  if (storePasswordField && creds.storePassword) {
    storePasswordField.value = creds.storePassword;
  }
}

function buildApiFields(configKey) {
  const config = apiConfigs[configKey];
  apiFields.innerHTML = "";

  config.groups.forEach((group) => {
    const groupNode = document.createElement("div");
    groupNode.className = "field-group";
    groupNode.innerHTML = `<strong>${group.title}</strong>`;
    apiFields.appendChild(groupNode);

    group.fields.forEach(([id, label, type, value, hint, required]) => {
      const wrapper = document.createElement("label");
      const badge = required
        ? '<span class="field-badge required">Required</span>'
        : '<span class="field-badge optional">Optional</span>';
      wrapper.innerHTML = `${label} ${badge}<input id="${id}" type="${type}" value="${escapeHtml(value)}" /><span class="form-hint">${hint}</span>`;
      apiFields.appendChild(wrapper);
    });
  });

  applyStoredCredsToApiForm();
}

function readValue(id) {
  const node = document.getElementById(id);
  return node ? node.value.trim() : "";
}

function buildPayload(configKey) {
  const payload = {};
  const keyMap = payloadKeyMaps[configKey];

  Object.entries(keyMap).forEach(([fieldId, payloadKey]) => {
    const value = readValue(fieldId);

    if (fieldId === "totalAmount") {
      payload[payloadKey] = Number(value || 0).toFixed(2);
      return;
    }

    if (value !== "") {
      payload[payloadKey] = value;
    }
  });

  return payload;
}

function buildCurl(configKey, payload) {
  const config = apiConfigs[configKey];
  const entries = Object.entries(payload);

  if (config.method === "GET") {
    const lines = entries.map(
      ([key, value]) => `  --data-urlencode "${key}=${String(value).replaceAll('"', '\\"')}"`
    );
    return [`curl -G "${config.endpoint}" \\`, ...lines].join(" \\\n");
  }

  const lines = entries.map(
    ([key, value]) => `  --data-urlencode "${key}=${String(value).replaceAll('"', '\\"')}"`
  );

  return [`curl -X ${config.method} "${config.endpoint}" \\`, ...lines].join(" \\\n");
}

function setSubmitState(isLoading) {
  requestInFlight = isLoading;
  apiSubmitBtn.disabled = isLoading;
  apiSubmitBtn.classList.toggle("is-loading", isLoading);
  const label = apiSubmitBtn.querySelector(".btn-label");
  if (label) {
    label.textContent = isLoading ? "Sending..." : "Send Sandbox Request";
  }
}

function renderApiPreview() {
  const configKey = apiSelector.value;
  const payload = buildPayload(configKey);
  curlPreview.textContent = buildCurl(configKey, payload);
  return { configKey, payload };
}

async function copyCurlPreview(event) {
  event.preventDefault();
  event.stopPropagation();

  const curlText = curlPreview.textContent.trim();
  if (!curlText) {
    return;
  }

  try {
    await navigator.clipboard.writeText(curlText);
    copyCurlBtn.textContent = "Copied";
    copyCurlBtn.classList.add("copied");
  } catch {
    copyCurlBtn.textContent = "Failed";
    copyCurlBtn.classList.add("copied");
  }

  window.clearTimeout(copyCurlResetTimer);
  copyCurlResetTimer = window.setTimeout(() => {
    copyCurlBtn.textContent = "Copy";
    copyCurlBtn.classList.remove("copied");
  }, 1400);
}

async function sendRealApiRequest() {
  if (requestInFlight) {
    return;
  }

  const { configKey, payload } = renderApiPreview();
  responseBlock.open = true;
  responsePreview.textContent = "Sending request to SSLCommerz sandbox...";
  setSubmitState(true);

  try {
    const response = await fetch(`${window.SSL_COPILOT_API_BASE}/${configKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ payload }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || `Sandbox request failed with status ${response.status}`);
    }

    responsePreview.textContent = JSON.stringify(
      data?.result ?? {
        message: "No upstream SSLCommerz result body was returned.",
      },
      null,
      2
    );
  } catch (error) {
    responsePreview.textContent = JSON.stringify(
      {
        status: "BACKEND_PROXY_ERROR",
        message: "Unable to complete the SSLCommerz request through the backend proxy.",
        error: error.message,
      },
      null,
      2
    );
  } finally {
    setSubmitState(false);
  }
}

function setActiveDocLink(id) {
  docLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
  });
}

function setupScrollSpy() {
  const sections = Array.from(
    document.querySelectorAll("main section[id], main .sub-anchor-block[id], aside[id]")
  );
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveDocLink(visible.target.id);
      }
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.3, 0.6] }
  );

  sections.forEach((section) => observer.observe(section));
}

function activateApiPanel(configKey) {
  apiSelector.value = configKey;
  buildApiFields(configKey);
  renderApiPreview();

  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === "api");
  });

  document.getElementById("chatPanel").classList.remove("active");
  document.getElementById("apiPanel").classList.add("active");
  document.getElementById("assistant").scrollIntoView({ behavior: "smooth", block: "start" });
}

function togglePanelFullscreen() {
  const nextState = !document.body.classList.contains("panel-fullscreen");
  document.body.classList.toggle("panel-fullscreen", nextState);
  panelFullscreenBtn.setAttribute(
    "aria-label",
    nextState ? "Exit fullscreen panel" : "Open fullscreen panel"
  );
  panelFullscreenBtn.setAttribute(
    "title",
    nextState ? "Exit fullscreen panel" : "Open fullscreen panel"
  );
  panelCloseBtn.classList.toggle("is-hidden", !nextState);

  if (nextState) {
    document.querySelectorAll(".tab").forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === "api");
    });
    document.getElementById("chatPanel").classList.remove("active");
    document.getElementById("apiPanel").classList.add("active");
  }
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    document.querySelectorAll(".tab").forEach((button) => {
      button.classList.toggle("active", button === tab);
    });

    document.getElementById("chatPanel").classList.toggle("active", target === "chat");
    document.getElementById("apiPanel").classList.toggle("active", target === "api");
  });
});

apiTryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateApiPanel(button.dataset.apiTarget);
  });
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();

  if (!question) {
    return;
  }

  addMessage("user", question);
  addMessage("assistant", getAnswer(question));
  chatInput.value = "";
});

credentialForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveSessionCreds(savedStoreId.value.trim(), savedStorePassword.value.trim());
  applyStoredCredsToApiForm();
  renderApiPreview();
});

clearCreds.addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  savedStoreId.value = "";
  savedStorePassword.value = "";
  const storeIdField = document.getElementById("storeId");
  const storePasswordField = document.getElementById("storePassword");
  if (storeIdField) storeIdField.value = "";
  if (storePasswordField) storePasswordField.value = "";
  renderApiPreview();
});

apiSelector.addEventListener("change", () => {
  if (requestInFlight) {
    return;
  }
  buildApiFields(apiSelector.value);
  renderApiPreview();
});

panelFullscreenBtn.addEventListener("click", () => {
  togglePanelFullscreen();
});

panelCloseBtn.addEventListener("click", () => {
  if (document.body.classList.contains("panel-fullscreen")) {
    togglePanelFullscreen();
  }
});

copyCurlBtn.addEventListener("click", copyCurlPreview);

apiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendRealApiRequest();
});

buildPromptCards();
buildDocumentationTables();
hydrateCredentialForm();
buildApiFields(apiSelector.value);
setupScrollSpy();
addMessage(
  "assistant",
  "This panel is being shaped toward an AI-centric workflow for payload analysis, log inspection, NLP assistance, and guided API troubleshooting. Sandbox API calls are now sent through the Laravel backend proxy so request handling stays under your control."
);
renderApiPreview();
responsePreview.textContent = "Select or edit a sandbox payload, then send it through the Laravel backend proxy.";
