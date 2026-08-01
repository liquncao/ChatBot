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
- When the visitor seems ready, offer to pass their enquiry to the team and collect their name, phone or email, and a one-line summary. Then confirm it's captured and the team will follow up.

STOCKED PRODUCTS (sample):
${productLines}

RANGE (full categories we carry):
${CATEGORIES.map((c) => "- " + c).join("\n")}`;
