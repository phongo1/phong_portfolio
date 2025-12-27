const galleryMeta = {
    "I<3Charcuterie.jpeg": {
        description: "charcuterie board",
        date: "2025-11-08",
    },
    "I<3Cville.jpeg": { description: "donwtown cville", date: "2025-11-14" },
    "LAOutlook1.jpeg": { description: "LA outlook", date: "2025-03-08" },
    "LAOutlook2.jpeg": { description: "view of all of LA", date: "2025-03-08" },
    "MiamiMall.jpeg": { description: "miami mall", date: "2024-12-27" },
    "NYC.jpeg": { description: "NYC", date: "2019-04-26" },
    "UVAPrettyRotunda.jpeg": { description: "rotunda ;o", date: "2024-04-25" },
    "UVARotunda.jpeg": {
        description: "UVA rotunda in the fall",
        date: "2024-11-08",
    },
    "appianCoworkers.jpeg": {
        description: "appian interns matching",
        date: "2025-08-15",
    },
    "bestToroAtTen.jpeg": {
        description: "best toro ever at ten sushi",
        date: "2025-11-14",
    },
    "birdwoodLightTrail.jpeg": {
        description: "birdwood light trail",
        date: "2022-12-12",
    },
    "blindboxes.jpeg": { description: "blind box haul", date: "2025-06-14" },
    "brownies.jpeg": { description: "ube brownies", date: "2025-09-01" },
    "buschGardens.jpeg": { description: "busch gardens", date: "2025-05-04" },
    "cafeDrink.jpeg": {
        description: "camelias cafe drink",
        date: "2025-08-30",
    },
    "californiaJapaneseVillage.jpeg": {
        description: "california japanese village",
        date: "2025-03-09",
    },
    "cartersMountainSunset.jpeg": {
        description: "carter's mountain sunset",
        date: "2025-04-24",
    },
    "catCafe.jpeg": {
        description: "big and huge cat (leesburg cat cafe)",
        date: "2024-01-11",
    },
    "claySculturesActivity.jpeg": {
        description: "chopped clay sculptures i made",
        date: "2024-07-09",
    },
    "dog.jpeg": { description: "doggie", date: "2024-10-18" },
    "dogHappy.jpeg": { description: "what da dawg doin", date: "2024-10-09" },
    "fenwickIsland.JPG": {
        description: "VA beach sunrise",
        date: "2023-07-30",
    },
    "halloween2025.jpeg": { description: "halloween 2025", date: "2025-10-31" },
    "keywestBeach.jpeg": {
        description: "key west is pretty",
        date: "2024-12-24",
    },
    "lakeBarcroft.jpeg": {
        description: "lake barcroft view",
        date: "2024-06-06",
    },
    "legos.jpeg": { description: "I <3 legos", date: "2025-08-28" },
    "lycheeCocktail.jpeg": {
        description: "lychee cocktail",
        date: "2025-06-15",
    },
    "matcha.jpeg": { description: "matcha haul", date: "2025-12-27" },
    "mrytleBeach.jpeg": {
        description: "myrtle beach scenic",
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
        description: "turtle I found in my front yard",
        date: "2025-09-29",
    },
    "pizzaGeorgeTownWaterFront.jpeg": {
        description: "georgetown waterfront pizza",
        date: "2025-08-09",
    },
    "seasideBakery.jpeg": {
        description: "seaside bakery in cali #04 #keshi #stussy",
        date: "2025-03-11",
    },
    "steaksInMiami.jpeg": {
        description: "steak in keywest",
        date: "2024-12-25",
    },
    "sushi.jpeg": { description: "sushi", date: "2025-06-08" },
    "techGame.jpeg": { description: "tech game 2025", date: "2025-12-27" },
    "thaiRestaurantInDC.jpeg": {
        description: "thai restaurant in DC",
        date: "2025-08-23",
    },
    "thanksGiving2025.jpeg": {
        description: "thanksgiving 2025",
        date: "2025-12-27",
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
