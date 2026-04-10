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

const responseFields = [
  ["status", "Overall request status indicator for the session creation call."],
  ["sessionkey", "Session identifier returned by SSLCommerz for the initiated transaction."],
  ["GatewayPageURL", "Primary redirect URL used to continue the payment flow."],
  ["directPaymentURL", "Additional direct payment entry point when available."],
  ["failedreason", "Reason string when the request cannot be processed successfully."],
  ["gw", "Gateway list or gateway-related response data."],
  ["redirectGatewayURL", "Redirect-oriented gateway URL reference returned in response payloads."],
  ["storeBanner", "Merchant/store banner information returned by the gateway."],
];

const apiConfigs = {
  initiate: {
    title: "Initiate Payment",
    method: "POST",
    endpoint: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    docTableId: "initiateParamTable",
    docSummary:
      "Creates a payment session and returns gateway data used to continue checkout.",
    docParams: [
      ["store_id", "Merchant sandbox or live store identifier."],
      ["store_passwd", "Merchant store password used for authentication."],
      ["total_amount", "Total payable amount for the transaction."],
      ["currency", "Currency code, commonly BDT."],
      ["tran_id", "Unique merchant transaction identifier."],
      ["success_url", "Redirect target for successful payment."],
      ["fail_url", "Redirect target for failed payment."],
      ["cancel_url", "Redirect target for cancelled payment."],
      ["cus_name", "Customer full name."],
      ["cus_email", "Customer email address."],
      ["cus_phone", "Customer mobile or phone number."],
    ],
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
    docTableId: "validationParamTable",
    docSummary:
      "Validates a payment after redirect or IPN before order fulfillment.",
    docParams: [
      ["store_id", "Merchant store identifier."],
      ["store_passwd", "Merchant authentication secret."],
      ["val_id", "Validation id received from payment response or IPN."],
      ["format", "Preferred response format such as json."],
      ["v", "Version parameter when needed by the validator endpoint."],
    ],
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
    docTableId: "refundParamTable",
    docSummary:
      "Initiates or tracks refund activity using original transaction references and refund metadata.",
    docParams: [
      ["store_id", "Merchant store identifier."],
      ["store_passwd", "Merchant authentication secret."],
      ["bank_tran_id", "Original bank transaction id."],
      ["refund_amount", "Requested refund amount."],
      ["refund_remarks", "Reason or remark for refund."],
      ["refund_ref_id", "Merchant-side refund tracking reference."],
      ["format", "Preferred response format such as json."],
    ],
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
          ["refundAmount", "Refund Amount", "text", "5.50", "Refund amount.", true],
          ["refundRemarks", "Refund Remarks", "text", "Out of Stock", "Reason for refund.", true],
          ["refundRefId", "Refund Reference ID", "text", "REFUND-001", "Merchant-side refund reference.", true],
          ["refundFormat", "Format", "text", "json", "json or xml.", false],
        ],
      },
    ],
  },
  transactionQuery: {
    title: "Transaction Query",
    method: "GET",
    endpoint: "https://sandbox.sslcommerz.com/validator/api/merchantTransIDvalidationAPI.php",
    docTableId: "queryParamTable",
    docSummary:
      "Fetches transaction or session-oriented payment state later for re-checking or support flows.",
    docParams: [
      ["store_id", "Merchant store identifier."],
      ["store_passwd", "Merchant authentication secret."],
      ["tran_id", "Merchant transaction id when querying by order reference."],
      ["sessionkey", "Session key when querying by saved session."],
      ["query_type", "Selector describing the lookup mode."],
      ["format", "Preferred response format such as json."],
    ],
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
          ["queryTranId", "Transaction ID", "text", "INV-10001", "Merchant transaction id to query.", false],
          ["querySessionKey", "Session Key", "text", "", "Optional saved session key for lookup.", false],
          ["queryType", "Query Type", "text", "by_tran_id", "Example: by_tran_id or by_sessionkey.", true],
          ["queryFormat", "Format", "text", "json", "json or xml.", false],
        ],
      },
    ],
  },
};

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
    refundAmount: "refund_amount",
    refundRemarks: "refund_remarks",
    refundRefId: "refund_ref_id",
    refundFormat: "format",
  },
  transactionQuery: {
    storeId: "store_id",
    storePassword: "store_passwd",
    queryTranId: "tran_id",
    querySessionKey: "sessionkey",
    queryType: "query_type",
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
const returnedParamsTable = document.getElementById("returnedParamsTable");
const apiSelector = document.getElementById("apiSelector");
const credentialForm = document.getElementById("credentialForm");
const savedStoreId = document.getElementById("savedStoreId");
const savedStorePassword = document.getElementById("savedStorePassword");
const clearCreds = document.getElementById("clearCreds");
const docLinks = document.querySelectorAll(".doc-link");
const apiTryButtons = document.querySelectorAll("[data-api-target]");
const panelFullscreenBtn = document.getElementById("panelFullscreenBtn");
const panelCloseBtn = document.getElementById("panelCloseBtn");

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

function buildReturnedParamsTable() {
  responseFields.forEach(([name, description]) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<span><code>${name}</code></span><span>${description}</span>`;
    returnedParamsTable.appendChild(row);
  });
}

function buildDocParamTables() {
  Object.values(apiConfigs).forEach((config) => {
    const target = document.getElementById(config.docTableId);
    if (!target) return;

    target.innerHTML = "";

    const summary = document.createElement("div");
    summary.className = "api-brief";
    summary.textContent = config.docSummary;
    target.appendChild(summary);

    config.docParams.forEach(([name, description]) => {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<span><code>${name}</code></span><span>${description}</span>`;
      target.appendChild(row);
    });
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

function buildResponse(configKey, payload) {
  const base = {
    request_type: configKey,
    sandbox: true,
    note: "Mocked sandbox response only. No real SSLCommerz request sent.",
  };

  if (configKey === "initiate") {
    return JSON.stringify(
      {
        ...base,
        status: "SUCCESS",
        failedreason: "",
        sessionkey: `sandbox_mock_${Math.random().toString(36).slice(2, 10)}`,
        GatewayPageURL: `https://sandbox.sslcommerz.com/gwprocess/v4/mock/${payload.tran_id || "session"}`,
        redirectGatewayURL: `https://sandbox.sslcommerz.com/gwprocess/v4/mock/${payload.tran_id || "session"}`,
        directPaymentURL: `https://sandbox.sslcommerz.com/gwprocess/v4/mock/direct/${payload.tran_id || "session"}`,
        gw: "visa,master,bkash,nagad,internetbank",
        tran_id: payload.tran_id || "",
        amount: payload.total_amount || "",
        currency: payload.currency || "BDT",
      },
      null,
      2
    );
  }

  if (configKey === "validation") {
    return JSON.stringify(
      {
        ...base,
        status: "VALID",
        APIConnect: "DONE",
        validated_on: new Date().toISOString(),
        val_id: payload.val_id || "",
        amount: "1200.00",
        currency_type: "BDT",
        risk_level: "0",
        risk_title: "Safe",
      },
      null,
      2
    );
  }

  if (configKey === "refund") {
    return JSON.stringify(
      {
        ...base,
        APIConnect: "DONE",
        bank_tran_id: payload.bank_tran_id || "",
        refund_ref_id: payload.refund_ref_id || "",
        refund_amount: payload.refund_amount || "",
        status: "Processing",
      },
      null,
      2
    );
  }

  return JSON.stringify(
    {
      ...base,
      APIConnect: "DONE",
      status: "VALIDATED",
      tran_id: payload.tran_id || "",
      sessionkey: payload.sessionkey || "",
      amount: "1200.00",
      currency_amount: "1200.00",
      currency_type: "BDT",
    },
    null,
    2
  );
}

async function renderApiPreview() {
  const configKey = apiSelector.value;
  const payload = buildPayload(configKey);
  curlPreview.textContent = buildCurl(configKey, payload);
  responsePreview.textContent = "Loading mocked sandbox response...";

  try {
    const response = await fetch(`${window.SSL_COPILOT_MOCK_API_BASE}/${configKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ payload }),
    });

    if (!response.ok) {
      throw new Error(`Mock API request failed with status ${response.status}`);
    }

    const data = await response.json();
    responsePreview.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    responsePreview.textContent = `${buildResponse(configKey, payload)}\n\nFallback reason: ${error.message}`;
  }
}

function setActiveDocLink(id) {
  docLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
  });
}

function setupScrollSpy() {
  const sections = Array.from(document.querySelectorAll("main section[id], aside[id]"));
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

apiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderApiPreview();
});

buildPromptCards();
buildReturnedParamsTable();
buildDocParamTables();
hydrateCredentialForm();
buildApiFields(apiSelector.value);
setupScrollSpy();
addMessage(
  "assistant",
  "This panel is being shaped toward an AI-centric workflow for payload analysis, log inspection, NLP assistance, and guided API troubleshooting. In the current phase it remains a sandbox-only mock so the interface and interaction flow can be refined first."
);
renderApiPreview();
