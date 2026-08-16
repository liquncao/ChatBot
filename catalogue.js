// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT DATA + BOT PERSONALITY
// This is the ONLY file you edit to change what the bot knows.
// Replace CATALOGUE with the merchant's full product export (name, cat, price, spec).
// ─────────────────────────────────────────────────────────────────────────────

export const SUPPLIER = "Irish Building Supply";

export const CATALOGUE = [
  { name: '4" Solid Block 440×225×100mm 7.5N', cat: "Bricks & Blocks", price: "€1.58", spec: "Standard solid concrete block, general blockwork." },
  { name: '6" Solid Block 440×225×150mm 7.5N', cat: "Bricks & Blocks", price: "€1.85", spec: "Wider solid block for thicker / load-bearing walls." },
  { name: '9" Cavity Block 440×215×215mm', cat: "Bricks & Blocks", price: "€2.37", spec: "Hollow cavity block for external cavity walls." },
  { name: "Concrete Stockbrick 215×100×65mm", cat: "Bricks & Blocks", price: "€0.96", spec: "Standard concrete brick." },
  { name: "Breedon Premier Plus Cement 25kg", cat: "Cement", price: "€7.68", spec: "General-purpose bagged cement for concrete, mortar, render." },
  { name: "Siniat Plain Plasterboard 2438×1200×12.5mm", cat: "Plaster & Drywall", price: "€14.94", spec: "Standard wall & ceiling board." },
  { name: "Unilin Insulated Plasterboard (Thermal Liner) 2400×1200×50mm", cat: "Insulation", price: "€48.00", spec: "Insulated board for dry-lining cold walls." },
  { name: "Light Angle Bead (mini mesh) 2.4m", cat: "Plaster & Drywall", price: "€1.28", spec: "Corner reinforcement for plastering." },
  { name: "OSB3 Board 2400×1200×18mm", cat: "Sheet Materials", price: "€26.10", spec: "Structural board — sheathing, flooring, hoarding." },
  { name: "OSB3 Board 2400×1200×11mm", cat: "Sheet Materials", price: "€15.37", spec: "Thinner structural board." },
  { name: "OSB3 T&G Flooring Board 2400×600×18mm", cat: "Sheet Materials", price: "€13.50", spec: "Tongue-and-groove flooring board." },
  { name: "White Deal Rough Treated 100×44 (4×2) × 4.8m", cat: "Timber", price: "€11.34", spec: "Treated framing timber, general structural/carpentry." },
  { name: "White Deal Rough Treated 75×44 (3×2) × 4.8m", cat: "Timber", price: "€8.50", spec: "Treated framing timber, studs/battens." },
  { name: "White Deal Rough Treated 150×44 (6×2) × 4.8m", cat: "Timber", price: "€17.00", spec: "Treated joist/rafter-grade timber. Confirm span." },
  { name: "White Deal Rough Treated 50×35 (2×1.5) × 4.8m", cat: "Timber", price: "€4.70", spec: "Treated batten/light framing." },
  { name: "White Deal Rough Treated 50×22 (2×1) × 4.5m", cat: "Timber", price: "€2.48", spec: "Treated lath/batten." },
  { name: "White Deal Rough 100×44 (4×2) × 4.8m", cat: "Timber", price: "€10.15", spec: "Untreated framing timber (internal use)." },
  { name: "White Deal Rough 100×44 (4×2) × 2.4m", cat: "Timber", price: "€5.08", spec: "Untreated framing timber, short length." },
  { name: "White Deal Rough 75×44 (3×2) × 2.4m", cat: "Timber", price: "€3.81", spec: "Untreated stud/batten, short length." },
  { name: "Treated White Deal PAO 75×22 × 4.8m", cat: "Timber (Planed)", price: "€6.97", spec: "Planed-all-over treated timber, finished surfaces." },
];

export const CATEGORIES = [
  "Timber — rough (C16), treated (lengths, posts & sleepers, weather sheeting, fencing), PAO/planed (skirting & architrave, windowboard, flooring & TGV, door frames), mahogany, mouldings, stair systems, MDF lengths, composite decking",
  "Doors — internal (primed, fire, hollow-core), external softwood, door furniture (handles, locks, hinges, closers), access panels",
  "Concrete Products — bricks & blocks, lintels & cills, wall cappings, paving slabs, cement & lime, floor leveller, cement colours",
  "Insulation — mineral (attic, Rockwool rolls & slabs, Metac/Omnifit), floor (Polyiso/PIR, XPS & Aeroboard), cavity wall, acoustic (Rockwool RW3/4/5), insulated plasterboard, accessories",
  "Sheet Materials — OSB, plywood (marine, shuttering, Malaysian, EVP), MDF (standard, moisture-resistant, veneered), cement/tile-backer board, hardboard, melamine & acoustic panels",
  "Plaster & Drywall — plasterboard, bagged & pre-mixed plaster, beads & metal studs, tapes",
  "Adhesives, Sealants & Fillers — Soudal, silicone (neutral, sanitary, GP, all-weather, Tec7, MS polymer), CT1, tile adhesive & grout, wood/PVA/contact/epoxy glue, chemical anchor, waterproofing & tanking, expanding foam, caulk, fillers",
  "Fixings — concrete screws, decking screws, express & insulation anchors, drywall screws, woodscrews (stainless/zinc), nails & pins (brad, framing, masonry, round wire, slate, Paslode, copper)",
  "Plumbing & Sanitaryware — traps, radiators, copper, soil/sewer/waste pipe & fittings, Qualpex, compression & push-fit fittings, drainage & ducting, bathroom (baths, showers, basins, pans, taps)",
  "Roofing — polycarbonate, felts, slates/perspex/lead, guttering (half-round, squareline, Niagara), fascia & soffit",
  "Paint & Decorating — emulsion (masonry, matt, soft sheen), oil & water-based gloss/satin/undercoat, varnish & timbercare, wood preservative, primers (Zinsser), specialised (mould/heat/floor), brushes, rollers, trays, masking",
  "Building Supplies — joist hangers, sand/gravel/aggregates, mortar, driveway & drainage pebble, Visqueen & damp course, airtightness, radon, building metals (MF ceiling)",
  "PPE & Workwear — safety boots, workwear (Blåkläder), masks, gloves, overalls & rainsuits, eye & ear protection",
  "Tools — hand tools, power tools (DeWalt, Einhell), drill bits & blades",
  "Electrical — fuses, plugs/sockets/switches, cable & trunking, accessories, alarms & heaters",
  "Outdoor & Garden — composite & timber decking, fencing & panels, paving flags, garden tools",
  "Vents & Ducting — ducting, vent covers, access panels",
  "Hardware & Cleaning — ladders, manhole covers, ironmongery, brushes/mops/brooms, cleaning products",
];

// Brands stocked (useful when a customer asks by brand)
export const BRANDS = "Knauf, Siniat, Rockwool, Unilin, Breedon, Velux, Fakro, DeWalt, Einhell, Stanley, Blåkläder, Soudal, CT1, Canadia, B&G, ECC Timber, Fleetwood.";

// ── SPECIAL OFFERS (current promotions, with photos) ─────────────────────────
// price = offer price ex-VAT; rrp = normal price; img = file under /img
export const SPECIAL_OFFERS = [
  { code: "21282",       name: "Pacini Electric Cement Mixer 240V 140L", cat: "Plant & Tools", price: 300.00, rrp: 399, img: "21282.png",
    blurb: "140L drum, 240V — solid site mixer for concrete and mortar." },
  { code: "DEWDT1963QZ", name: "DeWalt 250mm Construction Circular Saw Blades (3pk)", cat: "Power Tool Accessories", price: 78.66, rrp: 89.99, img: "DEWDT1963QZ.jpeg",
    blurb: "24T / 24T / 48T set for fast, smooth cutting of softwoods and composites on site." },
  { code: "152990",      name: "Soudal Gun Foam Combi-Box", cat: "Adhesives & Fillers", price: 53.78, rrp: 79.99, img: "152990.jpg",
    blurb: "6 × Soudafoam Gun Grade 750ml gap filler, plus applicator gun and cleaner." },
  { code: "CTA20FW",     name: "Larsen Rapid Tile Adhesive White 20kg", cat: "Adhesives & Fillers", price: 19.67, rrp: 29.99, img: "CTA20FW.jpg",
    blurb: "Polymer-modified rapid-set adhesive for walls and floors; ceramic, porcelain and stone." },
  { code: "37628",       name: "Ronseal Fence Life Plus+ Cornflower 5L", cat: "Paint & Timbercare", price: 14.63, rrp: 21.99, img: "37628.jpg",
    blurb: "5-year protection for sheds and fences against rain, snow, frost and UV. Colour: Cornflower." },
  { code: "FOG40040S",   name: "Tobermore Mayfair Oat Flag 400×400×40", cat: "Paving & Landscaping", price: 7.21, rrp: 9.99, img: "FOG40040S.jpg",
    blurb: "Premium granite-aggregate paving flag with a natural granite look. Oat colour." },
  { code: "5571",        name: "AquaTank 10m² Tanking Kit", cat: "Waterproofing", price: 71.12, rrp: 99.99, img: "5571.png",
    blurb: "Neo-Flex membrane kit for waterproofing damp or humid substrates — membrane, primer, SA tape and brush." },
  { code: "BAH24422PN",  name: "Bahco Barracuda Handsaw (Orange Handle) S24422B", cat: "Hand Tools", price: 18.61, rrp: 29.99, img: "BAH24422PN.jpg",
    blurb: "Hardpoint Barracuda handsaw for fast, clean cutting in wood." },
];

const offerLines = SPECIAL_OFFERS.map(
  (o) => `- [${o.code}] ${o.name} — OFFER €${o.price.toFixed(2)} ex-VAT (RRP €${o.rrp}). ${o.cat}. ${o.blurb}`
).join("\n");

const productLines = CATALOGUE.map(
  (p) => `- ${p.name} — ${p.price} ex-VAT. ${p.cat}. ${p.spec}`
).join("\n");

export const SYSTEM_PROMPT = `You are the online product assistant for ${SUPPLIER}, a 100% Irish-owned, family-run builders merchant serving Dublin and Wicklow for over 50 years, with stores in Dún Laoghaire (Co. Dublin) and Kilcoole (Co. Wicklow).

How you work:
- Talk like a helpful trade-counter person: warm, plain, brief. Irish trade context. Keep replies short.
- Customers are builders, tradespeople, self-builders and DIY. When someone describes a job, ask ONE or TWO quick narrowing questions first (dimensions, span, indoor/outdoor, quantity, finish) before recommending. Don't interrogate.
- Recommend products from the STOCKED PRODUCTS list where you can, by name, with a rough quantity. If the exact item isn't listed but the category is one we carry (see RANGE), say we stock that category and offer to check exact options / pass it to the team — never invent specific products or prices.
- Prices are guide, ex-VAT, for enquiry purposes only — final pricing and live stock come from the team.
- You advise and narrow; you do NOT give binding structural/engineering specs. For load-bearing items (lintels, joist spans, foundations) recommend they confirm with their engineer or our team.
- Useful facts you can share: free delivery on online orders over €299 inc VAT (Dublin & Wicklow only, own fleet); delivery charges from €14.50, standard €29.99 under €299; most orders dispatched in 2–5 working days; free click & collect at both stores; timber cutting service in Dún Laoghaire (straight cuts); phone Dún Laoghaire 01-2808620, Kilcoole 01-2234650.
- Brands we stock include: ${BRANDS}
- We currently have a SPECIAL OFFERS promotion running (listed below). When a customer's job matches one, mention it as a current deal and give the offer price and the RRP so they see the saving.
- IMPORTANT — showing photos: whenever you present a special-offer product, append its code once in double brackets at the very END of your message, e.g. [[OFFER:CTA20FW]]. This is a hidden signal that shows the customer a photo + price card; never explain it or mention the brackets in your wording. This applies BOTH when you recommend a specific offer AND when you list several offers in response to a browse question like "what's on special offer?" — in that case append every listed product's code (e.g. [[OFFER:21282]] [[OFFER:CTA20FW]] ...). When cards will be shown, keep your own text short — a line or two — since each card already shows the name, photo, offer price and RRP; don't repeat long descriptions.
- When the visitor seems ready, offer to pass their enquiry to the team and collect their name, phone or email, and a one-line summary. Then confirm it's captured and the team will follow up.

STOCKED PRODUCTS (sample):
${productLines}

CURRENT SPECIAL OFFERS:
${offerLines}

RANGE (full categories we carry):
${CATEGORIES.map((c) => "- " + c).join("\n")}`;
