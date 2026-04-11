<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSLCommerz Docs Copilot POC</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="{{ asset('copilot/styles.css') }}" />
  </head>
  <body>
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark">S</div>
        <div>
          <strong>SSLCOMMERZ Developer Arena</strong>
          <span>AI-enhanced documentation POC</span>
        </div>
      </div>
      <nav class="top-links">
        <a href="#overview">Overview</a>
        <a href="#session-api">Initiate Payment</a>
        <a href="#validation">Validation</a>
        <a href="#refund-api">Refund</a>
        <a href="#assistant">AI Panel</a>
      </nav>
    </header>

    <div class="app-shell">
      <aside class="doc-nav">
        <div class="nav-group">
          <div class="nav-title">Getting Started</div>
          <a href="#overview" class="doc-link">Overview</a>
          <a href="#flow" class="doc-link">Integration Flow</a>
          <a href="#endpoints" class="doc-link">Environment</a>
        </div>
        <div class="nav-group">
          <div class="nav-title">Core APIs</div>
          <a href="#session-api" class="doc-link">Initiate Payment</a>
          <a href="#session-ready" class="doc-link nav-sub-link">Ready the Parameters</a>
          <a href="#session-request-params" class="doc-link nav-sub-link">Request Parameters</a>
          <a href="#session-returned-params" class="doc-link nav-sub-link">Returned Parameters</a>
          <a href="#session-emi" class="doc-link nav-sub-link">EMI Parameters</a>
          <a href="#validation" class="doc-link">Order Validation</a>
          <a href="#validation-request-params" class="doc-link nav-sub-link">Request Parameters</a>
          <a href="#validation-returned-params" class="doc-link nav-sub-link">Returned Parameters</a>
          <a href="#ipn" class="doc-link">IPN</a>
        </div>
        <div class="nav-group">
          <div class="nav-title">Refund</div>
          <a href="#refund-api" class="doc-link">Refund API</a>
          <a href="#refund-request-params" class="doc-link nav-sub-link">Request Parameters</a>
          <a href="#refund-returned-params" class="doc-link nav-sub-link">Returned Parameters</a>
          <a href="#refund-query" class="doc-link nav-sub-link">Query Refund Status</a>
          <a href="#transaction-query" class="doc-link">Transaction Query API</a>
          <a href="#query-by-session" class="doc-link nav-sub-link">By Session ID</a>
          <a href="#query-by-tran" class="doc-link nav-sub-link">By Transaction ID</a>
        </div>
        <div class="nav-group">
          <div class="nav-title">Sandbox</div>
          <a href="#sandbox" class="doc-link">Test Credentials</a>
          <a href="#assistant" class="doc-link">Chat + Try This API</a>
        </div>
      </aside>

      <main class="docs-content">
        <section class="doc-hero" id="overview">
          <p class="kicker">Documentation</p>
          <h1>SSLCOMMERZ integration reference with an AI-assisted sandbox panel.</h1>
          <p class="lead">
            Use this page as an implementation-oriented reference for payment initiation,
            IPN handling, order validation, refund initiation, and transaction query.
            The documentation remains primary, while the right-side panel adds a
            sandbox API workspace and future AI assistance surface.
          </p>
          <div class="notice">
            <strong>Current scope:</strong> the documentation layout and sandbox API
            rehearsal are implemented now. The AI layer is reserved for the next phase
            for log analysis, payload analysis, NLP assistance, and troubleshooting.
          </div>
        </section>

        <section class="doc-section" id="flow">
          <div class="section-head">
            <div>
              <p class="section-kicker">Integration</p>
              <h2>How SSLCommerz works</h2>
            </div>
          </div>
          <div class="compact-grid four">
            <article class="mini-card">
              <strong>1. Create session</strong>
              <p>
                Merchant server sends initiate-payment parameters to the Session API
                and receives a payment session response.
              </p>
            </article>
            <article class="mini-card">
              <strong>2. Redirect customer</strong>
              <p>
                The payment gateway URL returned from the session response is used to
                continue checkout in the SSLCommerz flow.
              </p>
            </article>
            <article class="mini-card">
              <strong>3. Receive callback and IPN</strong>
              <p>
                Success, fail, and cancel URLs handle browser redirects, while IPN is
                the more reliable server-to-server status channel.
              </p>
            </article>
            <article class="mini-card">
              <strong>4. Validate transaction</strong>
              <p>
                Validation should happen on the merchant backend before order
                fulfillment or service confirmation.
              </p>
            </article>
          </div>
        </section>

        <section class="doc-section" id="endpoints">
          <div class="section-head">
            <div>
              <p class="section-kicker">Environment</p>
              <h2>Endpoints and transport rules</h2>
            </div>
          </div>
          <div class="table-like">
            <div class="row">
              <span>Sandbox base URL</span>
              <code>https://sandbox.sslcommerz.com</code>
            </div>
            <div class="row">
              <span>Live base URL</span>
              <code>https://securepay.sslcommerz.com</code>
            </div>
            <div class="row">
              <span>Session API</span>
              <code>/gwprocess/v4/api.php</code>
            </div>
            <div class="row">
              <span>TLS requirement</span>
              <code>TLS 1.2 or higher</code>
            </div>
          </div>
        </section>

        <section class="doc-section" id="session-api">
          <div class="section-head">
            <div>
              <p class="section-kicker">Core API</p>
              <h2>Initiate payment session</h2>
            </div>
            <button class="doc-action" type="button" data-api-target="initiate">Try This API</button>
          </div>
          <p class="body-copy">
            For initiating payment processing, at first you need to enable HTTP IPN
            Listener to listen the payments. So that you can update your database
            accordingly even customer got connectivity issue to return back to your website.
          </p>
          <div class="sub-anchor-block" id="session-ready">
            <h3>Ready the Parameters</h3>
            <p class="body-copy">
              Some mandatory parameters need to pass to SSLCOMMERZ. It identify your
              customers and orders. Also you have to pass the success, fail, cancel url
              to redirect your customer after pay.
            </p>
          </div>
          <div class="code-card">
            <div class="code-title">Sandbox endpoint</div>
            <pre><code>POST https://sandbox.sslcommerz.com/gwprocess/v4/api.php</code></pre>
          </div>
          <div class="sub-anchor-block" id="session-request-params">
            <h3>Request Parameters</h3>
          </div>
          <div class="param-table" id="initiateRequestParamTable"></div>
          <div class="sub-anchor-block" id="session-returned-params">
            <h3>Returned Parameters</h3>
          </div>
          <div class="param-table" id="initiateReturnedParamTable"></div>
          <div class="sub-anchor-block" id="session-emi">
            <h3>EMI Parameters</h3>
          </div>
          <div class="param-table" id="initiateEmiParamTable"></div>
        </section>

        <section class="doc-section" id="integration-modes">
          <div class="section-head">
            <div>
              <p class="section-kicker">Frontend Flow</p>
              <h2>Easy Checkout and Hosted Payment</h2>
            </div>
          </div>
          <div class="compact-grid two">
            <article class="mini-card">
              <strong>Easy Checkout</strong>
              <p>
                JS-driven checkout embedded into the merchant experience. Backend
                session initiation still happens server-side to protect credentials
                and prevent payload tampering.
              </p>
            </article>
            <article class="mini-card">
              <strong>Hosted Payment</strong>
              <p>
                Merchant redirects the customer to the SSLCommerz-hosted gateway page
                using the returned gateway URL from the initiate-payment response.
              </p>
            </article>
          </div>
          <div class="code-card">
            <div class="code-title">Redirect principle</div>
            <pre><code>Parse the returned GatewayPageURL and redirect the user to continue payment.</code></pre>
          </div>
        </section>

        <section class="doc-section" id="validation">
          <div class="section-head">
            <div>
              <p class="section-kicker">Validation</p>
              <h2>Always validate after payment</h2>
            </div>
            <button class="doc-action" type="button" data-api-target="validation">Try This API</button>
          </div>
          <p class="body-copy">
            After knowing that the post keys are valid and no moletion done with the
            request, now it is the time to validate your transaction for amount and
            transaction. It will only treated as valid if amount and transaction status
            are valid at SSL End.
          </p>
          <div class="table-like">
            <div class="row">
              <span>Transaction status states</span>
              <code>VALID / VALIDATED / FAILED / CANCELLED</code>
            </div>
            <div class="row">
              <span>Risk interpretation</span>
              <code>risk_level 0 = safe, risk_level 1 = risky</code>
            </div>
          </div>
          <div class="sub-anchor-block" id="validation-request-params"><h3>Request Parameters</h3></div>
          <div class="param-table" id="validationRequestParamTable"></div>
          <div class="sub-anchor-block" id="validation-returned-params"><h3>Returned Parameters</h3></div>
          <div class="param-table" id="validationReturnedParamTable"></div>
        </section>

        <section class="doc-section" id="ipn">
          <div class="section-head">
            <div>
              <p class="section-kicker">Notification</p>
              <h2>IPN remains critical</h2>
            </div>
          </div>
          <p class="body-copy">
            You must develop the IPN url to receive the payment notification. Customer
            session will not work in this server to server flow, so back-end IPN plays a
            very important role to update your backend office.
          </p>
        </section>

        <section class="doc-section" id="sandbox">
          <div class="section-head">
            <div>
              <p class="section-kicker">Sandbox</p>
              <h2>Test values for development</h2>
            </div>
          </div>
          <div class="table-like">
            <div class="row">
              <span>Store ID</span>
              <code>testbox</code>
            </div>
            <div class="row">
              <span>Store Password</span>
              <code>qwerty</code>
            </div>
            <div class="row">
              <span>VISA</span>
              <code>4111111111111111</code>
            </div>
            <div class="row">
              <span>Mastercard</span>
              <code>5111111111111111</code>
            </div>
            <div class="row">
              <span>American Express</span>
              <code>371111111111111</code>
            </div>
            <div class="row">
              <span>OTP</span>
              <code>111111</code>
            </div>
          </div>
        </section>

        <section class="doc-section" id="refund-api">
          <div class="section-head">
            <div>
              <p class="section-kicker">Refund API</p>
              <h2>Refund initiation and refund status query</h2>
            </div>
            <button class="doc-action" type="button" data-api-target="refund">Try This API</button>
          </div>
          <p class="body-copy">
            Use the refund API to initiate a refund against an existing bank transaction.
          </p>
          <div class="table-like">
            <div class="row">
              <span>Refund endpoint sandbox</span>
              <code>https://sandbox.sslcommerz.com/validator/api/merchantTransIDvalidationAPI.php</code>
            </div>
            <div class="row">
              <span>Refund method</span>
              <code>GET</code>
            </div>
            <div class="row">
              <span>Core refund fields</span>
              <code>bank_tran_id, refund_trans_id, refund_amount, refund_remarks, store_id, store_passwd</code>
            </div>
            <div class="row">
              <span>Format</span>
              <code>json or xml</code>
            </div>
          </div>
          <div class="sub-anchor-block" id="refund-request-params"><h3>Request Parameters</h3></div>
          <div class="param-table" id="refundRequestParamTable"></div>
          <div class="sub-anchor-block" id="refund-returned-params"><h3>Returned Parameters</h3></div>
          <div class="param-table" id="refundReturnedParamTable"></div>
          <div class="sub-anchor-block" id="refund-query"><h3>Query Refund Status</h3></div>
          <div class="param-table" id="refundQueryParamTable"></div>
          <div class="param-table stacked-gap" id="refundQueryReturnedParamTable"></div>
        </section>

        <section class="doc-section" id="transaction-query">
          <div class="section-head">
            <div>
              <p class="section-kicker">Query APIs</p>
              <h2>Validation, session, and refund status lookups</h2>
            </div>
            <button class="doc-action" type="button" data-api-target="transactionQuery">Try This API</button>
          </div>
          <p class="body-copy">
            You can query your transaction status any time while you want. For ticketing
            system or product limitation, it will help you to release before recheck.
          </p>
          <div class="sub-anchor-block" id="query-by-session"><h3>By Session ID</h3></div>
          <div class="param-table" id="querySessionRequestParamTable"></div>
          <div class="param-table stacked-gap" id="querySessionReturnedParamTable"></div>
          <div class="sub-anchor-block" id="query-by-tran"><h3>By Transaction ID</h3></div>
          <div class="param-table" id="queryTranRequestParamTable"></div>
          <div class="param-table stacked-gap" id="queryTranReturnedParamTable"></div>
        </section>
      </main>

      <aside class="assistant-panel" id="assistant">
        <div class="panel-toolbar">
          <span class="panel-toolbar-label">Panel Size</span>
          <div class="panel-toolbar-actions">
            <button type="button" class="secondary-btn icon-btn" id="panelFullscreenBtn" aria-label="Open fullscreen panel" title="Open fullscreen panel">
              <span aria-hidden="true">⛶</span>
            </button>
            <button type="button" class="secondary-btn toolbar-btn is-hidden" id="panelCloseBtn">Close</button>
          </div>
        </div>
        <div class="panel-intro">
          <p class="panel-kicker">AI extension panel</p>
          <h2>Chat + Try This API</h2>
          <p>
            This is the enhancement layer for the documentation experience. Sandbox
            requests are sent through your backend proxy so credentials and request
            handling stay under your control. The long-term goal is an AI-centric
            panel for log analysis, payload review, NLP-based doc assistance, and
            troubleshooting workflows.
          </p>
        </div>

        <details class="credential-box">
          <summary class="preview-title">Sandbox credential vault</summary>
          <div class="credential-content">
            <div class="api-heading">
              <span>Stored in this browser session only so you do not need to rewrite auth fields.</span>
            </div>
            <form class="credential-form" id="credentialForm">
              <label>Store ID<input id="savedStoreId" type="text" placeholder="testbox" /></label>
              <label>Store Password<input id="savedStorePassword" type="text" placeholder="qwerty" /></label>
              <div class="credential-actions">
                <button type="submit">Save Session Creds</button>
                <button type="button" class="secondary-btn" id="clearCreds">Clear</button>
              </div>
            </form>
          </div>
        </details>

        <div class="tabs" role="tablist" aria-label="Assistant tabs">
          <button class="tab active tab-ai" data-tab="chat" type="button">
            <span class="tab-ai-badge" aria-hidden="true">AI</span>
            <span>Chat</span>
          </button>
          <button class="tab" data-tab="api" type="button">Try This API</button>
        </div>

        <section class="panel-view active" id="chatPanel">
          <div class="ai-chat-badge" aria-label="AI chat assistant">
            <span class="ai-chat-badge-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img" focusable="false">
                <path
                  d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2zm7 9l.9 2.1L22 14l-2.1.9L19 17l-.9-2.1L16 14l2.1-.9L19 11zM7 13l1.2 2.8L11 17l-2.8 1.2L7 21l-1.2-2.8L3 17l2.8-1.2L7 13z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div>
              <strong>AI Assistant Chat</strong>
              <span>Future workspace for log analysis, payload review, and NLP guidance.</span>
            </div>
          </div>
          <div class="chat-feed" id="chatFeed"></div>
          <div class="quick-prompts" id="promptGrid"></div>
          <form class="chat-form" id="chatForm">
            <textarea
              id="chatInput"
              rows="3"
              placeholder="Ask about parameters, IPN, validation, or sandbox usage..."
            ></textarea>
            <button type="submit">Ask</button>
          </form>
        </section>

        <section class="panel-view" id="apiPanel">
          <div class="api-workspace">
            <details class="preview-block api-controls-block" id="apiControlsBlock" open>
              <summary class="preview-title">
                <span>Sandbox API explorer</span>
              </summary>
              <div class="api-controls">
                <div class="api-heading">
                  <strong>Sandbox API explorer</strong>
                  <span>Switch between supported SSLCommerz API patterns. Requests are sent through the Laravel backend proxy.</span>
                </div>

                <form class="api-form" id="apiForm">
                  <label>
                    API Call
                    <select id="apiSelector">
                      <option value="initiate">Initiate Payment</option>
                      <option value="validation">Order Validation</option>
                      <option value="refund">Refund API</option>
                      <option value="transactionQuery">Transaction Query</option>
                    </select>
                  </label>
                  <div class="form-grid" id="apiFields"></div>
                  <button type="submit" class="submit-btn" id="apiSubmitBtn">
                    <span class="btn-spinner" aria-hidden="true"></span>
                    <span class="btn-label">Send Sandbox Request</span>
                  </button>
                </form>
              </div>
            </details>

            <div class="api-results">
              <details class="preview-block" id="curlBlock">
                <summary class="preview-title">
                  <span>cURL preview</span>
                  <button type="button" class="preview-copy-btn" id="copyCurlBtn">Copy</button>
                </summary>
                <pre id="curlPreview"></pre>
              </details>

              <details class="preview-block" id="responseBlock" open>
                <summary class="preview-title">API result</summary>
                <pre id="responsePreview"></pre>
              </details>
            </div>
          </div>
        </section>
      </aside>
    </div>
    <script>
      window.SSL_COPILOT_API_BASE = "{{ url('/api/sslcommerz') }}";
    </script>
    <script src="{{ asset('copilot/app.js') }}"></script>
  </body>
</html>
