<?php

return [
    'version' => 'v1',
    'documents' => [
        [
            'source_type' => 'docs',
            'title' => 'SSLCOMMERZ v4 Overview',
            'section' => 'overview',
            'topic' => 'integration',
            'url' => 'https://developer.sslcommerz.com/doc/v4/#overview',
            'chunks' => [
                [
                    'title' => 'Integration Flow',
                    'section' => 'flow',
                    'topic' => 'integration',
                    'keywords' => ['flow', 'session', 'redirect', 'callback', 'ipn', 'validate'],
                    'content' => 'A normal SSLCOMMERZ integration creates a payment session on the merchant backend, redirects the customer to the gateway page, receives redirect callbacks on success, fail, or cancel URLs, listens to IPN for reliable server-to-server status updates, and validates the transaction on the merchant backend before fulfillment.',
                ],
                [
                    'title' => 'Environment and Endpoints',
                    'section' => 'environment',
                    'topic' => 'endpoints',
                    'keywords' => ['sandbox', 'live', 'endpoint', 'api', 'tls'],
                    'content' => 'The sandbox base URL is https://sandbox.sslcommerz.com and the live base URL is https://securepay.sslcommerz.com. Session initiation uses /gwprocess/v4/api.php. Validation and query APIs use validator endpoints. Production integrations should use TLS 1.2 or higher.',
                ],
            ],
        ],
        [
            'source_type' => 'docs',
            'title' => 'Initiate Payment',
            'section' => 'initiate-payment',
            'topic' => 'session-api',
            'url' => 'https://developer.sslcommerz.com/doc/v4/#initiate-payment',
            'chunks' => [
                [
                    'title' => 'Required Session Parameters',
                    'section' => 'session-required-params',
                    'topic' => 'parameters',
                    'keywords' => ['store_id', 'store_passwd', 'total_amount', 'currency', 'tran_id', 'success_url', 'fail_url', 'cancel_url', 'ipn_url', 'product_category'],
                    'content' => 'Core initiate-payment parameters include store_id, store_passwd, total_amount, currency, tran_id, product_category, success_url, fail_url, and cancel_url. IPN URL is strongly recommended so payment status is not dependent only on browser redirects. Customer identity fields like cus_name, cus_email, and cus_phone are also expected in a practical integration.',
                ],
                [
                    'title' => 'Gateway Response Fields',
                    'section' => 'session-returned-params',
                    'topic' => 'response',
                    'keywords' => ['GatewayPageURL', 'sessionkey', 'status', 'failedreason', 'gw'],
                    'content' => 'A successful session response includes status, sessionkey, and GatewayPageURL. GatewayPageURL is the main URL used to redirect the customer to the SSLCommerz payment flow. If initiation fails, failedreason explains the issue returned by the API.',
                ],
                [
                    'title' => 'EMI Parameters',
                    'section' => 'emi',
                    'topic' => 'parameters',
                    'keywords' => ['emi_option', 'emi_max_inst_option', 'emi_selected_inst', 'emi_allow_only'],
                    'content' => 'EMI behavior is controlled with parameters like emi_option, emi_max_inst_option, emi_selected_inst, and emi_allow_only. If EMI is not needed, keep emi_option disabled. If emi_allow_only is enabled, the payment page should restrict the user to EMI-capable options.',
                ],
            ],
        ],
        [
            'source_type' => 'docs',
            'title' => 'Order Validation',
            'section' => 'validation',
            'topic' => 'validation',
            'url' => 'https://developer.sslcommerz.com/doc/v4/#order-validation',
            'chunks' => [
                [
                    'title' => 'Validation Request',
                    'section' => 'validation-request',
                    'topic' => 'parameters',
                    'keywords' => ['val_id', 'format', 'store_id', 'store_passwd', 'validation'],
                    'content' => 'Order validation should be done on the merchant backend after payment. The validation API requires val_id together with store_id and store_passwd. The format parameter can be json or xml. Validation is the step that confirms the transaction before order fulfillment.',
                ],
                [
                    'title' => 'Validation Response and Risk',
                    'section' => 'validation-response',
                    'topic' => 'response',
                    'keywords' => ['VALID', 'VALIDATED', 'FAILED', 'risk_level', 'risk_title', 'amount', 'tran_id'],
                    'content' => 'Validation responses return transaction status, tran_id, amount, val_id, bank_tran_id, payment channel details, and risk indicators. A merchant should verify transaction status, amount, and tran_id against internal records. risk_level 0 generally indicates safe and risk_level 1 indicates risky.',
                ],
            ],
        ],
        [
            'source_type' => 'docs',
            'title' => 'IPN and Callbacks',
            'section' => 'ipn',
            'topic' => 'callbacks',
            'url' => 'https://developer.sslcommerz.com/doc/v4/#ipn',
            'chunks' => [
                [
                    'title' => 'IPN vs Redirect URLs',
                    'section' => 'ipn-vs-redirect',
                    'topic' => 'callbacks',
                    'keywords' => ['ipn', 'success_url', 'fail_url', 'cancel_url', 'redirect'],
                    'content' => 'Success, fail, and cancel URLs are browser redirects and should not be treated as the only source of truth for transaction outcome. IPN is the more reliable server-to-server notification path and should be used to update backend order state even if the customer does not return to the merchant site.',
                ],
            ],
        ],
        [
            'source_type' => 'docs',
            'title' => 'Refund and Query APIs',
            'section' => 'refund-query',
            'topic' => 'refund',
            'url' => 'https://developer.sslcommerz.com/doc/v4/#refund-api',
            'chunks' => [
                [
                    'title' => 'Refund API',
                    'section' => 'refund-api',
                    'topic' => 'refund',
                    'keywords' => ['refund', 'bank_tran_id', 'refund_trans_id', 'refund_amount', 'refund_remarks', 'refe_id'],
                    'content' => 'Refund initiation requires bank_tran_id, refund_trans_id, store_id, store_passwd, refund_amount, and refund_remarks. refe_id can be used for merchant-side reconciliation. Refund status responses can be success, failed, or processing depending on the upstream state.',
                ],
                [
                    'title' => 'Transaction Query',
                    'section' => 'transaction-query',
                    'topic' => 'query',
                    'keywords' => ['sessionkey', 'tran_id', 'query', 'store_id', 'store_passwd'],
                    'content' => 'Transaction query endpoints support lookup by sessionkey or by merchant tran_id. These APIs are useful when a merchant needs to recheck transaction state later, especially for release or reconciliation workflows.',
                ],
            ],
        ],
        [
            'source_type' => 'docs',
            'title' => 'Sandbox Testing',
            'section' => 'sandbox',
            'topic' => 'testing',
            'url' => 'https://developer.sslcommerz.com/',
            'chunks' => [
                [
                    'title' => 'Sandbox Credentials',
                    'section' => 'sandbox-creds',
                    'topic' => 'testing',
                    'keywords' => ['testbox', 'qwerty', 'sandbox', 'visa', 'mastercard', 'otp'],
                    'content' => 'Common sandbox credentials use store_id testbox and store_passwd qwerty. Typical sandbox test cards include 4111111111111111 for Visa and 5111111111111111 for Mastercard, with OTP such as 111111 during test flows.',
                ],
            ],
        ],
    ],
];
