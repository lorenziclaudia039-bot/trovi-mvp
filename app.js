const categories = [
  { name: "Handyman", icon: "🛠️" },
  { name: "Electricidad", icon: "⚡" },
  { name: "Plomería", icon: "🚰" },
  { name: "Aire acondicionado", icon: "❄️" },
  { name: "Cerrajería", icon: "🔐" },
  { name: "Pintura", icon: "🎨" },
  { name: "Jardinería", icon: "🌿" },
  { name: "Limpieza", icon: "🧽" },
  { name: "Lavado a presión", icon: "💦" },
  { name: "Sellado de techos", icon: "🏠" }
];

const professionals = [
  {
    name: "Carlos Rivera",
    initials: "CR",
    rating: 4.9,
    reviews: 128,
    verified: true,
    experience: "8 años de experiencia",
    price: 95,
    availability: "Disponible hoy"
  },
  {
    name: "Luis Martínez",
    initials: "LM",
    rating: 4.8,
    reviews: 84,
    verified: true,
    experience: "6 años de experiencia",
    price: 110,
    availability: "Disponible mañana"
  },
  {
    name: "Javier Santiago",
    initials: "JS",
    rating: 4.7,
    reviews: 61,
    verified: false,
    experience: "10 años de experiencia",
    price: 85,
    availability: "Disponible esta semana"
  }
];

let currentRequest = {};
let selectedProfessional = null;

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  populateServiceSelect();
  setupRequestForm();
});

function renderCategories() {
  const grid = document.getElementById("categoryGrid");

  if (!grid) return;

  grid.innerHTML = categories
    .map(
      (category) => `
        <button
          class="category-card"
          onclick="selectCategory('${category.name}')"
        >
          <span class="category-icon">${category.icon}</span>
          <strong>${category.name}</strong>
        </button>
      `
    )
    .join("");
}

function populateServiceSelect() {
  const select = document.getElementById("service");

  if (!select) return;

  select.innerHTML = `
    <option value="">Selecciona un servicio</option>
    ${categories
      .map(
        (category) => `
          <option value="${category.name}">
            ${category.name}
          </option>
        `
      )
      .join("")}
  `;
}

function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");

  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(screenId);

  if (target) {
    target.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}

function selectCategory(categoryName) {
  showScreen("request");

  setTimeout(() => {
    const serviceSelect = document.getElementById("service");

    if (serviceSelect) {
      serviceSelect.value = categoryName;
    }
  }, 100);
}

function setupRequestForm() {
  const form = document.getElementById("requestForm");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const service = document.getElementById("service").value;
    const municipality = document.getElementById("municipality").value;
    const description = document.getElementById("description").value;
    const when = document.getElementById("when").value;
    const propertyType = document.getElementById("propertyType").value;
    const sameDay = document.getElementById("sameDay").checked;

    currentRequest = {
      service,
      municipality,
      description,
      when,
      propertyType,
      sameDay
    };

    renderRequestSummary();
    renderQuotes();
    showScreen("quotes");
  });
}

function renderRequestSummary() {
  const summary = document.getElementById("requestSummary");

  if (!summary) return;

  summary.innerHTML = `
    <strong>${currentRequest.service}</strong><br>
    ${currentRequest.municipality} · ${currentRequest.propertyType} · ${currentRequest.when}
    ${
      currentRequest.sameDay
        ? "<br><span>Preferencia: servicio el mismo día</span>"
        : ""
    }
  `;
}

function renderQuotes() {
  const quoteList = document.getElementById("quoteList");

  if (!quoteList) return;

  quoteList.innerHTML = professionals
    .map(
      (pro, index) => `
        <article class="quote-card">

          <div class="pro-info">

            <div class="avatar">
              ${pro.initials}
            </div>

            <div>

              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">

                <h3>
                  ${pro.name}
                </h3>

                ${
                  pro.verified
                    ? `<span class="status">Verificado</span>`
                    : `<span class="status">Con experiencia</span>`
                }

              </div>

              <p>
                ★ ${pro.rating} · ${pro.reviews} reviews
              </p>

              <p>
                ${pro.experience}
              </p>

              <p>
                ${pro.availability}
              </p>

            </div>

          </div>

          <div class="quote-actions">

            <span class="quote-price">
              $${pro.price}
            </span>

            <button
              class="primary"
              onclick="chooseProfessional(${index})"
            >
              Seleccionar
            </button>

          </div>

        </article>
      `
    )
    .join("");
}

function chooseProfessional(index) {
  selectedProfessional = professionals[index];

  renderSelectedProfessional();
  showScreen("checkout");
}

function renderSelectedProfessional() {
  const container = document.getElementById("selectedPro");

  if (!container || !selectedProfessional) return;

  container.innerHTML = `
    <div class="job-card">

      <div class="pro-info">

        <div class="avatar">
          ${selectedProfessional.initials}
        </div>

        <div>

          <h3>
            ${selectedProfessional.name}
          </h3>

          <p>
            ★ ${selectedProfessional.rating} ·
            ${selectedProfessional.reviews} reviews
          </p>

          <p>
            ${selectedProfessional.verified ? "Profesional verificado" : "Profesional con experiencia"}
          </p>

        </div>

      </div>

    </div>
  `;

  const workPrice = document.getElementById("workPrice");
  const totalPrice = document.getElementById("totalPrice");

  const total = selectedProfessional.price + 8;

  workPrice.textContent = `$${selectedProfessional.price}`;
  totalPrice.textContent = `$${total}`;
}

function confirmJob() {
  if (!selectedProfessional) return;

  showScreen("success");
}
