function changeNavbarActiveLink() {
  // Adds class 'active' to all navbar 'li' tags if child 'a' tag href === window.location.href without window.location.hash.
  // Removes class 'active' from all navbar 'li' tags if child 'a' tag href !== window.location.href without window.location.hash.
  //
  // navbar = document.querySelector('.navbar-nav')
  // navbar_links = navbar.getElementsByTagName('a')
  // 'li' = navbar_link.parentElement

  const $navbar = document.querySelector(".navbar-nav-wrapper");
  const navbar_links = $navbar.getElementsByTagName("a");

  for (let i = 0; i < navbar_links.length; i++) {
    const link = navbar_links[i];
    const url_location = window.location.href.replace(window.location.hash, '')
    // if link href equal url location and link not contains class 'active' -> add class 'active'
    if (
      link.href === url_location &&
      !link.parentElement.classList.contains("active")
    ) {
      link.parentElement.classList.add("active");
    }
    // if link href not equal url location and link contains class 'active' -> remove class 'active'
    else if (
      link.href !== url_location &&
      link.parentElement.classList.contains("active")
    ) {
      link.parentElement.classList.remove("active");
    }
  }
}

document.addEventListener("DOMContentLoaded", (_) => {
  try {
    changeNavbarActiveLink();
  } catch (error) {
    console.log(`Failed to change active link in navbar. Error: ${error}`);
  }
});

//* overflow = hidden, when menu open on phone
const headerMenuIcon = document.querySelectorAll('.menu__icon')
const headerMenu = document.querySelector('.menu')
headerMenuIcon.forEach(el => {
	el.addEventListener('click', (e) => {
		if (!headerMenu.classList.contains('menu_state_open')) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	})
	
});