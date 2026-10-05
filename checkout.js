const CART_KEY = "wordstoreCart";
const COUPON_KEY = "wordstoreCoupon";
const formatMoney = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

const readCart = () => {
  try {
    const items = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(items) ? items : [];
  } catch (error) {
    return [];
  }
};

const writeCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

const getDiscountValue = (items) =>
  items.reduce((sum, item) => {
    const original = Number(item.originalPrice || 0);
    const current = Number(item.price || 0);
    const discounted = Math.max(0, original - current);
    return sum + discounted * Number(item.quantity || 1);
  }, 0);

const initialiseReceipt = () => {
  const cart = readCart();
  const cartItemsContainer = document.getElementById("cartItems");
  const subtotalValue = document.getElementById("subtotalValue");
  const discountValue = document.getElementById("discountValue");
  const shippingValue = document.getElementById("shippingValue");
  const totalValue = document.getElementById("totalValue");
  const receiptNumber = document.getElementById("receiptNumber");
  const receiptDate = document.getElementById("receiptDate");
  const whatsappNumber = document.getElementById("whatsappNumber");
  const couponCode = document.getElementById("couponCode");
  const payButton = document.getElementById("payButton");
  const whatsappButton = document.getElementById("whatsappButton");

  if (!cart.length) {
    cartItemsContainer.innerHTML = `
      <div class="empty-state">
        <p>Your bag is empty.</p>
        <a href="book.html">Browse books</a>
      </div>
    `;
    subtotalValue.textContent = formatMoney(0);
    discountValue.textContent = `-${formatMoney(0)}`;
    shippingValue.textContent = formatMoney(0);
    totalValue.textContent = formatMoney(0);
    payButton.disabled = true;
    whatsappButton.disabled = true;
    return;
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );
  const discount = getDiscountValue(cart);
  const shipping = subtotal > 0 ? 49 : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const nextVisitCoupon = localStorage.getItem(COUPON_KEY) || "WELCOME10";
  localStorage.setItem(COUPON_KEY, nextVisitCoupon);
  couponCode.textContent = nextVisitCoupon;

  receiptNumber.textContent = `Receipt #WS-${String(Date.now()).slice(-6)}`;
  receiptDate.textContent = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  subtotalValue.textContent = formatMoney(subtotal);
  discountValue.textContent = `-${formatMoney(discount)}`;
  shippingValue.textContent = formatMoney(shipping);
  totalValue.textContent = formatMoney(total);

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <article class="cart-item">
          <img src="${item.coverImage || "img/finalbg.jpg"}" alt="${item.title}" />
          <div class="cart-item-info">
            <h3>${item.title}</h3>
            <p>${item.author}</p>
            <div class="cart-meta">
              <span class="quantity">Qty: ${item.quantity || 1}</span>
              <span class="item-price">${formatMoney(Number(item.price || 0) * Number(item.quantity || 1))}</span>
            </div>
          </div>
          <div class="item-price">${formatMoney(Number(item.price || 0))}</div>
        </article>
      `,
    )
    .join("");

  const cleanPhone = (value) => value.replace(/\D/g, "");

  const buildReceiptText = () => {
    const itemList = cart
      .map(
        (item) =>
          `${item.title} x${item.quantity || 1} - ${formatMoney(Number(item.price || 0) * Number(item.quantity || 1))}`,
      )
      .join("\n");

    return [
      "Wordstore payment receipt",
      `Receipt: ${receiptNumber.textContent}`,
      `Date: ${receiptDate.textContent}`,
      "",
      itemList,
      "",
      `Subtotal: ${subtotalValue.textContent}`,
      `Discount: ${discountValue.textContent}`,
      `Shipping: ${shippingValue.textContent}`,
      `Total: ${totalValue.textContent}`,
      "",
      "Thank you for shopping with Wordstore!",
      `Next-visit coupon: ${nextVisitCoupon}`,
    ].join("\n");
  };

  const createPdfReceipt = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    doc.setFillColor(245, 239, 230);
    doc.rect(0, 0, 595, 842, "F");

    doc.setTextColor(42, 29, 47);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("wordstore", 40, 58);
    doc.setTextColor(214, 166, 59);
    doc.setFontSize(11);
    doc.text("PAYMENT RECEIPT", 40, 78);

    doc.setDrawColor(214, 166, 59);
    doc.setLineWidth(1);
    doc.line(40, 90, 555, 90);

    doc.setTextColor(43, 43, 43);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Receipt No: ${receiptNumber.textContent}`, 40, 116);
    doc.text(`Date: ${receiptDate.textContent}`, 40, 132);

    let y = 170;
    cart.forEach((item) => {
      const line = `${item.title} x${item.quantity || 1} - ${formatMoney(Number(item.price || 0) * Number(item.quantity || 1))}`;
      doc.setTextColor(43, 43, 43);
      doc.text(line, 40, y);
      y += 22;
    });

    y += 20;
    doc.setDrawColor(200, 200, 200);
    doc.line(40, y, 555, y);
    y += 22;

    doc.text(`Subtotal: ${subtotalValue.textContent}`, 40, y);
    doc.text(`Discount: ${discountValue.textContent}`, 40, y + 18);
    doc.text(`Shipping: ${shippingValue.textContent}`, 40, y + 36);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${totalValue.textContent}`, 40, y + 58);

    y += 90;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(46, 126, 92);
    doc.text("Thank you for shopping with Wordstore!", 40, y);
    doc.setTextColor(116, 82, 14);
    doc.text(`Next-visit coupon: ${nextVisitCoupon}`, 40, y + 20);
    doc.setTextColor(69, 58, 52);
    doc.text("We hope to see you again soon.", 40, y + 42);

    return doc;
  };

  payButton.addEventListener("click", () => {
    const doc = createPdfReceipt();
    doc.save("wordstore-payment-receipt.pdf");
    payButton.textContent = "Receipt downloaded";
    payButton.disabled = true;
  });

  whatsappButton.addEventListener("click", () => {
    const phone = cleanPhone(whatsappNumber.value || "");
    if (!phone) {
      whatsappNumber.focus();
      whatsappNumber.setAttribute("placeholder", "Enter WhatsApp number");
      return;
    }

    const message = encodeURIComponent(buildReceiptText());
    const waLink = `https://wa.me/${phone}?text=${message}`;
    window.open(waLink, "_blank", "noopener,noreferrer");
  });
};

window.addEventListener("DOMContentLoaded", initialiseReceipt);
