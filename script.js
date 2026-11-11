const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const yearNode = document.querySelector("#year");
if (yearNode) yearNode.textContent = new Date().getFullYear();

const requestForm = document.querySelector("#request-form");
if (requestForm) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(requestForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone) return;

    const subject = encodeURIComponent("Запрос с сайта АвтоCity");
    const body = encodeURIComponent(
      `Имя: ${name}\nТелефон: ${phone}\n\nЗапрос:\n${message || "Не указано"}`
    );

    window.location.href = `mailto:balka@mail.ru?subject=${subject}&body=${body}`;
    const note = document.querySelector("#form-note");
    if (note) note.textContent = "Письмо подготовлено. Проверьте почтовое приложение и нажмите «Отправить».";
  });
}
