const products = [
  {
    id: 1,
    name: "Niebla de Ámbar",
    price: 68,
    tag: "Noche",
    desc: "Silueta sirena con espalda abierta y brillo suave.",
    image: "img/pexels-asphotography-291759.jpg",
    category: "noche",
    sizes: ["xs", "s", "m"],
    color: "vino"
  },
  {
    id: 2,
    name: "Aura Jardin",
    price: 54,
    tag: "Día",
    desc: "Chiffon liviano en tonos pastel.",
    image: "img/pexels-asphotography-291738.jpg",
    category: "dia",
    sizes: ["s", "m", "l"],
    color: "marfil"
  },
  {
    id: 3,
    name: "Seda Nocturna",
    price: 79,
    tag: "Noche",
    desc: "Corte al sesgo con caída dramática.",
    image: "img/pexels-manzano-31573564.jpg",
    category: "noche",
    sizes: ["m", "l"],
    color: "azul"
  },
  {
    id: 4,
    name: "Brisa Rosé",
    price: 49,
    tag: "Cóctel",
    desc: "Detalle plisado y cintura marcada.",
    image: "img/pexels-polina-kovaleva-5507238.jpg",
    category: "coctel",
    sizes: ["xs", "s", "m"],
    color: "rosa"
  },
  {
    id: 5,
    name: "Luz del Alba",
    price: 59,
    tag: "Día",
    desc: "Algodón estructurado con botones joya.",
    image: "img/pexels-kyleroxas-2122354.jpg",
    category: "dia",
    sizes: ["s", "m", "l"],
    color: "azul"
  },
  {
    id: 6,
    name: "Velvet Moon",
    price: 88,
    tag: "Noche",
    desc: "Terciopelo con drapeado lateral.",
    image: "img/pexels-cengiz-akturk-301810532-13715605.jpg",
    category: "noche",
    sizes: ["m", "l"],
    color: "vino"
  },
  {
    id: 7,
    name: "Coral de Medianoche",
    price: 65,
    tag: "Cóctel",
    desc: "Escote asimétrico con textura satinada.",
    image: "img/pexels-luisbecerrafotografo-5934457.jpg",
    category: "coctel",
    sizes: ["s", "m"],
    color: "rosa"
  },
  {
    id: 8,
    name: "Isla Serena",
    price: 52,
    tag: "Día",
    desc: "Vestido fluido con caída en capas.",
    image: "img/pexels-leeloothefirst-4554026.jpg",
    category: "dia",
    sizes: ["xs", "s", "m"],
    color: "marfil"
  },
  {
    id: 9,
    name: "Noche de Azahar",
    price: 83,
    tag: "Noche",
    desc: "Silueta columna con brillo sutil.",
    image: "img/pexels-soldiervip-1468376.jpg",
    category: "noche",
    sizes: ["m", "l"],
    color: "vino"
  },
  {
    id: 10,
    name: "Aura de Seda",
    price: 57,
    tag: "Cóctel",
    desc: "Corte midi con falda en A.",
    image: "img/pexels-nipendhbd-730055.jpg",
    category: "coctel",
    sizes: ["xs", "s", "m"],
    color: "rosa"
  },
  {
    id: 11,
    name: "Celeste Lumen",
    price: 62,
    tag: "Día",
    desc: "Escote cuadrado y tirantes finos.",
    image: "img/pexels-zvolskiy-1721940.jpg",
    category: "dia",
    sizes: ["s", "m", "l"],
    color: "azul"
  },
  {
    id: 12,
    name: "Brillo Imperial",
    price: 95,
    tag: "Noche",
    desc: "Aplique de cristal y falda en cascada.",
    image: "img/pexels-tolgaaslanturk-14517772.jpg",
    category: "noche",
    sizes: ["m", "l"],
    color: "marfil"
  }
];

const grid = document.getElementById("productGrid");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartShipping = document.getElementById("cartShipping");
const cartDiscount = document.getElementById("cartDiscount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutBody = document.getElementById("checkoutBody");
const stepper = document.getElementById("stepper");
const lookbook = document.getElementById("lookbook");
const openLookbookBtn = document.getElementById("openLookbook");
const closeLookbookBtn = document.getElementById("closeLookbook");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const couponInput = document.getElementById("couponInput");
const applyCoupon = document.getElementById("applyCoupon");
const couponMessage = document.getElementById("couponMessage");
const contactForm = document.getElementById("contactForm");

let cart = [];
let currentFilters = {
  category: "all",
  size: "all",
  color: "all",
  maxPrice: 100
};
let currentStep = 1;
let discountValue = 0;

const formatMoney = (value) => `$${value.toFixed(2)}`;

function renderProducts() {
  grid.innerHTML = "";
  const visible = products.filter((item) => {
    const matchCategory = currentFilters.category === "all" || item.category === currentFilters.category;
    const matchSize = currentFilters.size === "all" || item.sizes.includes(currentFilters.size);
    const matchColor = currentFilters.color === "all" || item.color === currentFilters.color;
    const matchPrice = item.price <= currentFilters.maxPrice;
    return matchCategory && matchSize && matchColor && matchPrice;
  });

  if (visible.length === 0) {
    grid.innerHTML = "<p class=\"fine\">No hay resultados con esos filtros.</p>";
    return;
  }

  visible.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4";
    col.innerHTML = `
      <div class="dress-card">
        <img src="${item.image}" alt="${item.name}" />
        <div class="card-body">
          <span class="tag">${item.tag}</span>
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="card-footer">
            <span class="price">${formatMoney(item.price)}</span>
            <button class="secondary" data-id="${item.id}">Agregar</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

function updateCart() {
  cartItems.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <span>${formatMoney(item.price)}</span>
      </div>
      <div class="qty">
        <button data-action="dec" data-id="${item.id}">-</button>
        <span>${item.qty}</span>
        <button data-action="inc" data-id="${item.id}">+</button>
      </div>
    `;
    cartItems.appendChild(row);
  });

  const shipping = subtotal > 90 || subtotal === 0 ? 0 : 8;
  const discount = subtotal === 0 ? 0 : Math.min(discountValue, subtotal + shipping);
  const total = subtotal + shipping - discount;

  cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
  cartSubtotal.textContent = formatMoney(subtotal);
  cartShipping.textContent = shipping === 0 ? "Gratis" : formatMoney(shipping);
  cartDiscount.textContent = discount === 0 ? "$0" : `-${formatMoney(discount).replace("$", "$")}`;
  cartTotal.textContent = formatMoney(total);

  if (cart.length === 0) {
    cartItems.innerHTML = "<p class=\"fine\">Tu carrito está vacío. Elige un vestido para comenzar.</p>";
  }
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function changeQty(id, delta) {
  const item = cart.find((product) => product.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((product) => product.id !== id);
  }
  updateCart();
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("show");
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("show");
}

function openModal() {
  if (cart.length === 0) return;
  checkoutModal.classList.add("show");
  overlay.classList.add("show");
  checkoutModal.setAttribute("aria-hidden", "false");
  currentStep = 1;
  renderStep();
}

function closeModal() {
  checkoutModal.classList.remove("show");
  checkoutModal.setAttribute("aria-hidden", "true");
  overlay.classList.remove("show");
}

function renderStep() {
  stepper.querySelectorAll(".step").forEach((step) => {
    step.classList.toggle("active", Number(step.dataset.step) === currentStep);
  });

  if (currentStep === 1) {
    checkoutBody.innerHTML = `
      <label>
        Dirección
        <input type="text" placeholder="Calle 123, Ciudad" />
      </label>
      <label>
        Email
        <input type="email" placeholder="tu@email.com" />
      </label>
      <label>
        Teléfono
        <input type="tel" placeholder="+52 55 5555 5555" />
      </label>
    `;
  } else if (currentStep === 2) {
    checkoutBody.innerHTML = `
      <label>
        Número de tarjeta
        <input type="text" placeholder="0000 0000 0000 0000" />
      </label>
      <label>
        Nombre en tarjeta
        <input type="text" placeholder="Nombre completo" />
      </label>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <label>
          Vencimiento
          <input type="text" placeholder="MM/AA" />
        </label>
        <label>
          CVV
          <input type="text" placeholder="123" />
        </label>
      </div>
    `;
  } else {
    const total = cartTotal.textContent;
    checkoutBody.innerHTML = `
      <div class="fine">Resumen de compra</div>
      <strong>Total a pagar: ${total}</strong>
      <p class="fine">Esta es una simulación. Al confirmar, verás una pantalla de éxito.</p>
    `;
  }
}

function nextStep() {
  if (currentStep < 3) {
    currentStep += 1;
    renderStep();
    return;
  }

  checkoutBody.innerHTML = `
    <h3>Pago confirmado</h3>
    <p class="fine">Gracias por tu compra. Recibirás un correo con el detalle del pedido.</p>
  `;
  document.getElementById("nextStep").textContent = "Finalizado";
  document.getElementById("backStep").style.display = "none";
  cart = [];
  updateCart();
  setTimeout(closeModal, 1800);
}

function backStep() {
  if (currentStep > 1) {
    currentStep -= 1;
    renderStep();
  }
}

function resetCheckoutButtons() {
  document.getElementById("nextStep").textContent = "Continuar";
  document.getElementById("backStep").style.display = "inline-flex";
}

function toggleLookbook(show) {
  if (!lookbook) return;
  if (show) {
    lookbook.classList.add("show");
    overlay.classList.add("show");
  } else {
    lookbook.classList.remove("show");
    overlay.classList.remove("show");
  }
}

function applyCouponCode() {
  const code = couponInput.value.trim().toUpperCase();
  if (!code) {
    couponMessage.textContent = "Ingresa un código para aplicar.";
    return;
  }

  if (code === "VESTIDO10") {
    discountValue = 10;
    couponMessage.textContent = "Cupón aplicado: $10 de descuento.";
  } else if (code === "PASARELA15") {
    discountValue = 15;
    couponMessage.textContent = "Cupón aplicado: $15 de descuento.";
  } else if (code === "ENVIO0") {
    discountValue = 8;
    couponMessage.textContent = "Cupón aplicado: envío gratis.";
  } else {
    discountValue = 0;
    couponMessage.textContent = "Código no válido. Prueba VESTIDO10 o PASARELA15.";
  }

  updateCart();
}

renderProducts();
updateCart();
priceValue.textContent = `$${currentFilters.maxPrice}`;

// Smooth reveal animations
document.querySelectorAll("section, .dress-card, .review-card, .signature-images img, .runway-card, .runway-strip img").forEach((el) => {
  el.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Events

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);

document.getElementById("scrollCatalog").addEventListener("click", () => {
  document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("watchRunway").addEventListener("click", () => {
  document.getElementById("runway").scrollIntoView({ behavior: "smooth" });
  document.getElementById("runwayStrip").classList.add("pulse");
  setTimeout(() => document.getElementById("runwayStrip").classList.remove("pulse"), 800);
});

if (openLookbookBtn) {
  openLookbookBtn.addEventListener("click", () => toggleLookbook(true));
}
if (closeLookbookBtn) {
  closeLookbookBtn.addEventListener("click", () => toggleLookbook(false));
}

overlay.addEventListener("click", () => {
  closeCart();
  closeModal();
  toggleLookbook(false);
});

checkoutBtn.addEventListener("click", () => {
  resetCheckoutButtons();
  openModal();
});

document.getElementById("closeModal").addEventListener("click", closeModal);

document.getElementById("nextStep").addEventListener("click", nextStep);

document.getElementById("backStep").addEventListener("click", backStep);

priceRange.addEventListener("input", (event) => {
  currentFilters.maxPrice = Number(event.target.value);
  priceValue.textContent = `$${event.target.value}`;
  renderProducts();
});

applyCoupon.addEventListener("click", applyCouponCode);

couponInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    applyCouponCode();
  }
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (id) {
    addToCart(id);
    openCart();
    document.querySelectorAll(".dress-card").forEach((card) => card.classList.add("reveal", "in-view"));
  }
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  if (action === "inc") changeQty(id, 1);
  if (action === "dec") changeQty(id, -1);
});

// Filters

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const group = chip.dataset.group;
    if (!group) return;
    document.querySelectorAll(`.chip[data-group="${group}"]`).forEach((btn) => {
      btn.classList.remove("active");
    });
    chip.classList.add("active");
    currentFilters[group] = chip.dataset.filter;
    renderProducts();
  });
});

// Contact form -> WhatsApp
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");
    const text = `Hola, soy ${name}.%0AEmail: ${email}%0AAsunto: ${subject}%0AMensaje: ${message}`;
    const phone = "5212211959921";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });
}
