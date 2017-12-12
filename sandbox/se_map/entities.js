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
	{H56GC3
		name: "Neiru",
		category: "planet",
		desc: "light blue gas giant",
		coords: "GPS:Planet Imok:-2919927.75:-1156079:5537081:",
		color: new THREE.Color("rgb(0, 153, 255)"),
		radius: 120000/2,

		oxygen: "none",
		gravity: 3.2,
	},
	{
		name: "Binoi",
		category: "moon",
		desc: "bumpy dark grey moon",
		coords: "GPS:Planet Binoi:126564.39:35734.37:136920.58:",
		color: new THREE.Color("rgb(100, 100, 100)"),
		radius: 19000/2,

		orbits: "Neiru",
		oxygen: "none",
		gravity: 0.21,
	},
]
