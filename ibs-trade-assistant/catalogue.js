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
  { name: "Siniat Plain Plasterboard 2438×1200×12.5mm", cat: "Plaster & Drywall", price: "€14.00", spec: "Standard wall & ceiling board." },
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
  "Timber (rough, treated, PAO, mouldings, MDF, composite decking)",
  "Doors (internal, fire, hollow-core, external) & door furniture",
  "Concrete Products (bricks & blocks, lintels & cills, wall cappings, paving slabs, cement)",
  "Insulation (mineral/Rockwool, floor/PIR, cavity, acoustic, insulated plasterboard)",
  "Sheet Materials (OSB, plywood, MDF, cement/tile-backer board)",
  "Plaster & Drywall (plasterboard, bagged plaster, beads, metal studs)",
  "Adhesives, Sealants & Fillers (Soudal, silicone, CT1, tile adhesive, foam)",
  "Fixings (screws, anchors, nails, plasterboard & insulation fixings)",
  "Plumbing & Sanitaryware (pipe & fittings, Qualpex, bathroom, radiators)",
  "Roofing (felts, slates, lead, guttering, fascia & soffit)",
  "Paint & Decorating, Tools, Electrical, PPE & Workwear",
  "Building Supplies (joist hangers, sand/gravel/aggregates, DPC/Visqueen, airtightness, radon)",
  "Outdoor & Garden (decking, fencing, paving, garden tools)",
];

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
- Useful facts you can share: free delivery on online orders over €299 inc VAT (Dublin & Wicklow only, own fleet); free click & collect at both stores; timber cutting service in Dún Laoghaire; phone Dún Laoghaire 01-2808620, Kilcoole 01-2234650.
- When the visitor seems ready, offer to pass their enquiry to the team and collect their name, phone or email, and a one-line summary. Then confirm it's captured and the team will follow up.

STOCKED PRODUCTS (sample):
${productLines}

RANGE (full categories we carry):
${CATEGORIES.map((c) => "- " + c).join("\n")}`;
