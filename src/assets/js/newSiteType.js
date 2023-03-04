function createSiteElement(siteObj) {
	let imageElement = ""
	if (siteObj.image) {
		const imageSrc = SERVER_HOST + siteObj.image
		imageElement = `
		<img src="${imageSrc}" alt="Image" />
		`
	}
	return `
	<div class="swiper-slide">
	<div class="row d-flex justify-content-center w-auto">
		<div class="pr col-lg-5 col-md-8 col-12">
			<div class="product_bl">
				${imageElement}
				<div class="product_cont">
					<h3>${siteObj.name}</h3>
					<p>${siteObj.description}</p>
					<span>від $${siteObj.price}<sup></sup><i></i></span>
					<div class="button">
						<a href="contacts.html#id_contacts_form">Start</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
	`
}

async function createSiteTypes() {
	const siteTypesResponse = await getSiteTypes();
	if (siteTypesResponse.status !== 200) {
		throw "Error: status code:" + siteTypesResponse.status;
	}
	const siteTypesJson = await siteTypesResponse.json();
	const siteTypesList = siteTypesJson.rows;

	if (siteTypesList.length < 1) {
		throw 'Empty list'
	}

	let siteTypesHtmlList = [];
	siteTypesList.forEach((siteType) => {
		siteTypesHtmlList.push(createSiteElement(siteType));
	});

	return siteTypesHtmlList
}

document.addEventListener("DOMContentLoaded", async (event) => {
	try {
		const siteTypeHtmlListElemnts = await createSiteTypes()

		const swiper = new Swiper(".swiper2", {
			// Optional parameters
			effect: "cards",
			cardsEffect: {
				slideShadows: false,
			},
			loop: false,
			loopedSlides: 2,
			observer: true,
			slidesPerView: 'auto',
			// If we need pagination
			pagination: {
				el: ".swiper-pagination2",
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + "</span>";
				},
			},

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next2",
				prevEl: ".swiper-button-prev2",
			},

			// And if we need scrollbar
			scrollbar: {
				el: ".swiper-scrollbar2",
			},
		});
		swiper.appendSlide(siteTypeHtmlListElemnts)
		swiper.update(true)
		swiper.autoplay.start();
		console.log(swiper)
	} catch (error) {
		console.log(error)
		return;
	}
});