const $checkMenu = document.querySelector(".contacts__check");
const checkBlock = document.querySelector(".check-block__item");

function OpenMenu(obj) {
  if (!obj.classList.contains("_active")) {
    obj.classList.add("_active");
  } else {
    obj.classList.remove("_active");
  }
}

function CloseMenu(obj) {
  if (obj.classList.contains("_active")) {
    obj.classList.remove("_active");
  }
}

function AddOrRemoveError(obj) {
  obj.classList.add("_selected");
  obj.classList.remove("_error");
}

function renderSiteTypeElement(siteTypeObj) {
  let imageString = "";
  if (siteTypeObj.image) {
    const imageSrc = SERVER_HOST + siteTypeObj.image;
    imageString = `
		<img src="${imageSrc}" alt="Image" />
		`;
  }
  return `
	<div data-site-type="${siteTypeObj.id}" data-header="${siteTypeObj.name}" class="check-item">
		${imageString}
		<div class="product_cont">
			<h3>${siteTypeObj.name}</h3>
			<p>${siteTypeObj.description}</p>
		</div>
		<div class="stick-price"></div>
		<span>від $${siteTypeObj.price}</span>
	</div>
	`;
}

async function renderSiteTypes() {
  const siteTypesResponse = await getSiteTypes();
  if (siteTypesResponse.status !== 200) {
    throw "Error: status code:" + siteTypesResponse.status;
  }
  const siteTypesJson = await siteTypesResponse.json();
  const siteTypesList = siteTypesJson.rows;

  if(siteTypesList.length < 1){
    throw 'Empty list'
  }

  let siteTypesHtml = "";
  siteTypesList.forEach((siteType) => {
    siteTypesHtml += renderSiteTypeElement(siteType);
  });

  checkBlock.innerHTML = siteTypesHtml;
}

document.addEventListener("DOMContentLoaded", async (event) => {
  try {
    await renderSiteTypes();
  } catch (error) {
    document.querySelector("#id_contacts_form").innerHTML =
      '<h4>Нажаль не вдалося завантажити форму зв`язку :( <br /> Будь ласка, зверніться до нас через пошту <a href="mailto:nordlys.web.studio@gmail.com" target="_blank">nordlys.web.studio@gmail.com</a></h4>';
    return;
  }

  const checkItems = document.querySelectorAll(".check-item");
  let spanCheckItem = document.getElementById("item");

  $checkMenu.addEventListener("click", (e) => {
    OpenMenu($checkMenu);
    OpenMenu(checkBlock);
  });
  //close if click on the another block
  window.addEventListener("load", () => {
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".contacts__check") &&
        !e.target.closest(".check-item")
      ) {
        CloseMenu($checkMenu);
        CloseMenu(checkBlock);
      }
    });
  });

  for (let i = 0; i < checkItems.length; i++) {
    const element = checkItems[i];
    element.addEventListener("click", (e) => {
      CloseMenu(checkBlock);
      CloseMenu($checkMenu);
      $checkMenu.dataset.siteType = element.dataset.siteType;
      AddOrRemoveError($checkMenu);
      spanCheckItem.innerHTML = element.dataset.header;
    });
  }
});
