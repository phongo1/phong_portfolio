const galleryMeta = {
    "snowRotunda.jpeg": {
        description: "winter tundy",
        date: "2026-01-26",
    },
    "snowRotunda2.jpeg": {
        description: "3.0 KDA",
        date: "2026-01-26",
    },
    "pineappleThai.jpeg": {
        description: "pineapple thai",
        date: "2026-01-21",
    },
    "bikiniBottom.jpeg": {
        description: "air freshener",
        date: "2026-01-19",
    },
    "noodles.jpg": {
        description: "Q noodles",
        date: "2025-10-25",
    },
    "ubeBrownie2.jpg": {
        description: "ube brownies pt.2",
        date: "2025-10-25",
    },
    "hotLatte.jpg": {
        description: "camelias",
        date: "2026-01-07",
    },
    "salmonLox.jpeg": {
        description: "makers union lox",
        date: "2026-01-01",
    },
    "calamari.jpeg": {
        description: "calamari",
        date: "2026-01-01",
    },
    "boop2.jpeg": {
        description: "goat",
        date: "2025-12-30",
    },
    "boop1.jpeg": {
        description: "boop",
        date: "2025-12-30",
    },
    "camel.jpeg": {
        description: "camel",
        date: "2025-12-30",
    },
    "chillguy.jpeg": {
        description: "chill guy",
        date: "2025-12-30",
    },
    "2025gifts.jpg": {
        description: "christmas loot",
        date: "2025-12-25",
    },
    "potluck2025.jpeg": {
        description: "EOY potluck",
        date: "2025-12-29",
    },
    "margPizza.jpeg": {
        description: "marg pizza",
        date: "2025-12-29",
    },
    "iceskating.jpeg": {
        description: "learned how to ice skate",
        date: "2025-12-28",
    },
    "charcuterie.jpeg": {
        description: "charcuterie",
        date: "2025-11-08",
    },
    "cville.jpeg": { description: "downtown cville", date: "2025-11-14" },
    "LAOutlook1.jpeg": { description: "LA outlook", date: "2025-03-08" },
    "LAOutlook2.jpeg": { description: "skyline view of LA", date: "2025-03-08" },
    "MiamiMall.jpeg": { description: "miami mall", date: "2024-12-27" },
    "UVAPrettyRotunda.jpeg": { description: "rotunda ;o", date: "2024-04-25" },
    "UVARotunda.jpeg": {
        description: "rotunda (fall)",
        date: "2024-11-08",
    },
    "appianCoworkers.jpeg": {
        description: "appian <3",
        date: "2025-08-15",
    },
    "bestToroAtTen.jpeg": {
        description: "9$ bite",
        date: "2025-11-14",
    },
    "blindboxes.jpeg": { description: "blind box haul", date: "2025-06-14" },
    "brownies.jpeg": { description: "ube brownies", date: "2025-09-01" },
    "buschGardens.jpeg": { description: "busch gardens", date: "2025-05-04" },
    "cafeDrink.jpeg": {
        description: "matcha spritz",
        date: "2025-08-30",
    },
    "californiaJapaneseVillage.jpeg": {
        description: "japanese village - california",
        date: "2025-03-09",
    },
    "cartersMountainSunset.jpeg": {
        description: "carter's mountain",
        date: "2025-04-24",
    },
    "catCafe.jpeg": {
        description: "big and huge cat - leesburg cat cafe",
        date: "2024-01-11",
    },
    "claySculturesActivity.jpeg": {
        description: "chopped clay sculptures i made",
        date: "2024-07-09",
    },
    "dog.jpeg": { description: "doggie", date: "2024-10-18" },
    "dogHappy.jpeg": { description: "what da dawg doin", date: "2024-10-09" },
    "fenwickIsland.JPG": {
        description: "VA beach",
        date: "2023-07-30",
    },
    "halloween2025.jpeg": { description: "snow golem", date: "2025-10-31" },
    "keywestBeach.jpeg": {
        description: "key west beach",
        date: "2024-12-24",
    },
    "lakeBarcroft.jpeg": {
        description: "lake barcroft view",
        date: "2024-06-06",
    },
    "legos.jpeg": { description: "lego haul", date: "2025-08-28" },
    "lycheeCocktail.jpeg": {
        description: "lychee cocktail",
        date: "2025-06-15",
    },
    "matcha.jpeg": { description: "matcha haul", date: "2025-12-27" },
    "mrytleBeach.jpeg": {
        description: "myrtle beach",
        date: "2025-05-13",
    },
    "museumInDC.jpeg": { description: "museum in DC", date: "2022-11-27" },
    "outlook1.jpeg": {
        description: "outlook by charlottesville",
        date: "2025-04-05",
    },
    "overpricedSteakFrites.jpeg": {
        description: "overpriced steak frites",
        date: "2025-07-19",
    },
    "petTurtle.jpeg": {
        description: "turtle I found in my yard",
        date: "2025-09-29",
    },
    "pizzaGeorgeTownWaterFront.jpeg": {
        description: "georgetown waterfront pizza",
        date: "2025-08-09",
    },
    "seasideBakery.jpeg": {
        description: "seaside bakery #keshi #stussy",
        date: "2025-03-11",
    },
    "steaksInMiami.jpeg": {
        description: "steaks in keywest",
        date: "2024-12-25",
    },
    "sushi.jpeg": { description: "sushi cho", date: "2025-06-08" },
    "techGame.jpeg": { description: "tech game 2025", date: "2025-11-27" },
    "thaiRestaurantInDC.jpeg": {
        description: "thai restaurant in DC",
        date: "2025-08-23",
    },
    "thanksGiving2025.jpeg": {
        description: "friends-giving",
        date: "2025-11-27",
    },
};

const formatGalleryLabel = (filename) =>
    filename
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

const parseGalleryDate = (value) => {
    const timestamp = Date.parse(value);
    return Number.isNaN(timestamp) ? 0 : timestamp;
};

const galleryImports = import.meta.glob(
    "/src/assets/gallery/*.{png,jpg,jpeg,JPG,JPEG}"
);

const loadGalleryPhotos = async () => {
    const entries = Object.entries(galleryImports);
    const loaded = await Promise.all(
        entries.map(async ([path, loader]) => {
            const mod = await loader();
            const filename = path.split("/").pop();
            const label = formatGalleryLabel(filename);
            const meta = galleryMeta[filename] ?? {};
            return {
                src: mod.default,
                alt: label,
                description: meta.description ?? "No description",
                date: meta.date ?? null,
            };
        })
    );

    return loaded.sort((a, b) => {
        const dateDiff = parseGalleryDate(b.date) - parseGalleryDate(a.date);
        return dateDiff !== 0 ? dateDiff : a.alt.localeCompare(b.alt);
    });
};

export { loadGalleryPhotos };
