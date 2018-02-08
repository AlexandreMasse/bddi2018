var menu_open = document.querySelector(".header_menu-open");
var menu_close = document.querySelector(".header_menu-close");
var body = document.querySelector("body");

menu_open.addEventListener("click", function() {
  body.classList.add("menu-active");
  menu_open.classList.add("hidden");
  menu_close.classList.remove("hidden");
});

menu_close.addEventListener("click", function() {
  body.classList.remove("menu-active");
  menu_open.classList.remove("hidden");
  menu_close.classList.add("hidden");
});
