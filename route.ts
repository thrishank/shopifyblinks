const url = `https://solanablinks.myshopify.com/admin/api/2024-07/orders.json`;
const token = "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";

const orderData = {
  order: {
    email: "thrishankkalluru@gmail.com",
    fulfillment_status: "fulfilled",
    send_receipt: true,
    // send_fulfillment_receipt: true,
    notify_customer: true,
    line_items: [
      {
        variant_id: 45614942421220,
        quantity: 1,
      },
    ],
    shipping_address: {
      first_name: "Thrishank",
      last_name: "Kalluru",
      address1: "rangampeta",
      phone: "+91 9392289642",
      city: "Tirupati",
      province: "AP",
      country: "India",
      zip: "517102",
    },
    billing_address: {
      first_name: "Thrishank",
      last_name: "Kalluru",
      address1: "rangampeta",
      phone: "+91 9392289642",
      city: "Tirupati",
      province: "AP",
      country: "India",
      zip: "517102",
    },
    note: "Ordered Solana blinks",
    note_attributes: [
      {
        name: "payment_method",
        value: "cryptocurrency",
      },
      {
        name: "crypto_transaction_hash",
        value:
          "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      },
      {
        name: "crypto_payment_address",
        value: "0xabcdef1234567890abcdef1234567890abcdef1234",
      },
    ],
  },
};

fetch(url, {
  method: "POST",
  headers: {
    "X-Shopify-Access-Token": token,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(orderData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
