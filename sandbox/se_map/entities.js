//


entities = [
	{
		name: "Galactic Trading Hub",
		category: "station",
		desc: "what??",
		coords: "GPS:Station GTH:-2916326.75:-1165539.62:5545383:",
		color: new THREE.Color("gray"),
		radius: 1000,

		tag: "GTH",
		owner: "GSI",
		specialty: "starter stuff",
	},
	{
		name: "Ter-4", // habitable
		category: "planet",
		// desc: "light blue gas giant",
		coords: "GPS:Body Ter-4:0:0:0:",
		// color: new THREE.Color("rgb(0, 153, 255)"),
		// radius: 120000/2,

		// oxygen: "none",
		// gravity: 3.2,
	},
	{
		name: "Sirius", // habitable
		category: "moon",
		orbits: "Ter-4",
		// desc: "light blue gas giant",
		coords: "GPS:Body Sirius:1430000:-290000:0:",
		// color: new THREE.Color("rgb(0, 153, 255)"),
		// radius: 120000/2,

		// oxygen: "none",
		// gravity: 3.2,
	},
	{
		name: "Midas",
		category: "planet",
		// desc: "light blue gas giant",
		coords: "GPS:Body Midas:11000000:0:-200000:",
		// color: new THREE.Color("rgb(0, 153, 255)"),
		// radius: 120000/2,

		// oxygen: "none",
		// gravity: 3.2,
	},
	{
		name: "Phrygia", // uninhabitable
		category: "moon",
		// desc: "bumpy dark grey moon",
		coords: "GPS:Body Phrygia:10000000:530000:-600000:",
		// color: new THREE.Color("rgb(100, 100, 100)"),
		// radius: 19000/2,

		orbits: "Midas",
		// oxygen: "none",
		// gravity: 0.21,
	},
	{
		name: "Selene", // on event horizon
		category: "planet",
		// desc: "light blue gas giant",
		coords: "GPS:Body Selene:0:0:-15000000:",
		// color: new THREE.Color("rgb(0, 153, 255)"),
		// radius: 120000/2,

		// oxygen: "none",
		// gravity: 3.2,
	},
	{
		name: "Sedonia", // also on event horizon
		category: "moon",
		orbits: "Selene",
		// desc: "light blue gas giant",
		coords: "GPS:Planet Imok:841000:480000:-14956883:",
		// color: new THREE.Color("rgb(0, 153, 255)"),
		// radius: 120000/2,

		// oxygen: "none",
		// gravity: 3.2,
	},
]
