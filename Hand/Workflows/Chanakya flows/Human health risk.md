---
type: workflow
nexus: water
desc: Flood-related human health risks - wastewater and drinking-water pathways, contact, vector-borne and respiratory disease, who is exposed and vulnerable, and the conditions under which the literature finds each risk
aliases: [human health risk, health risk, sewage and infection risk, sewage risk, infection risk, wastewater flooding, sanitation failure, WASH risk]
keywords: [human health, sewage, wastewater, treatment plant, manhole, sanitation, infection, waterborne disease, WASH, mould, bacterial, heavy metals, HydroWASTE, cholera, leptospirosis, hepatitis E, dilution factor, INFORM, vulnerability, chlorination, displacement, mortality, morbidity, relative risk, diarrhoea, dysentery, malaria, dengue, respiratory, skin, malnutrition, older people, pregnancy, hospitals, injuries, drowning, psychological distress, PTSD, mental health, Sri Lanka]
agent: citadel
parent_workflow: Human health risk
workflow_order: 1
prev_node: argos
next_node: argos
inputs_required: [1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20]
context: hand
retrieval: Answer which human health risks a flood brings, under which conditions the literature finds each one, how large and how soon, who is exposed and how vulnerable they are, what reduces the risk, and where the analysis is least certain.
sources_note: Human health risk - sources
card: agents/citadel/workflows/human_health_risk.md
prominent_sources: [WHO 2005, WHO 2006, Yang et al. 2024, Ehalt Macedo et al. 2022, WHO 2024]
validation_status: WHO analysis written and sourced, two WHO documents read in full 2026-09-13; Knowledge section added 2026-11-12 from 17 papers on the user's list (Yang et al. 2024 read in full; one paper abstract only); nothing implemented, six of eleven input sources unwired, MCP retrieval not built
status: draft
tags: [workflow, citadel, water, health, sewage, infection, wash]
---

## How this note is cited

Every claim below carries a short citation -- **(WHO 2024)**. The full
reference for each key is in [[Human health risk - sources]], fetched
alongside this note when the flow runs.

**Quote the vintage with the figure.** Sources get reissued; an undated number
ages into a false claim while still looking sourced.

## The question, and the correct starting assumption

When the water systems, toilets and sanitation fail in this flood, what does
that do to the people here, and what should be done about it.

**Do not start from the intuition that a flood means an epidemic.** The overall
risk of communicable disease outbreaks after a natural disaster is *lower than
is often perceived*, and the risk that exists is driven by the **displaced
population's living conditions** -- crowding, inadequate water and sanitation,
poor access to health services -- rather than by the floodwater itself
(WHO 2006). Of 14 major floods worldwide between 1970 and 1994, **one**
produced a major diarrhoeal outbreak: Sudan 1980, and that flood was
complicated by population displacement (WHO 2005).

Overstating the risk is a failure mode of this analysis, not a safe default.

## Hazard -- what the flood mobilises

**Wastewater infrastructure.** HydroWASTE (input 7) registers **58,502 plants**
globally, **58,278** georeferenced onto the river network, serving about
**4 billion people**; each record carries population served, treated discharge,
treatment level and an estimated outfall position (Ehalt Macedo et al. 2022).

**A flooded treatment plant is a hazard, not an outcome.** Tajikistan, 1992:
flooding of sewage treatment plants contaminated river water, and *no
significant increase in diarrhoeal disease was reported* (WHO 2005). Report the
pathway; do not assert the illness.

Separate **upstream** contamination -- bacterial load, heavy metals, industrial
effluent arriving from elsewhere -- from a **local** sewer backing up. Different
pathway, different advice, different authority.

**Dilution factor.** Receiving-water discharge over effluent discharge. Below
**10**, the European Medicines Agency's recommended environmental threshold,
the receiving water dilutes little even in normal conditions
(Ehalt Macedo et al. 2022). It is a **normal-condition** figure: a flood changes
both terms, so it marks a chronically stressed reach, never a flood-condition
estimate.

**Treatment that is not there.** About **44% of household wastewater** is
released without safe treatment (WHO 2024); roughly **half of all untreated
wastewater** reaches rivers, lakes and seas, and only **11%** of treated
wastewater is reused (UNEP 2023). For an Indian AOI: **72,368 MLD** of urban
sewage generation against **20,235 MLD** of utilised capacity, leaving
**52,133 MLD** untreated (CPCB 2021).

### What sanitation failure actually transmits

| Pathway | Disease | Evidence |
|---|---|---|
| Drinking-water contamination | Cholera, typhoid, hepatitis A and E, diarrhoeal disease | The **major risk factor** for flood-associated outbreaks (WHO 2005). West Bengal 1998: >16,000 cholera cases, O1 Ogawa. Bangladesh 2004: >17,000 diarrhoeal cases, *V. cholerae* O1 and ETEC (WHO 2006) |
| Direct skin contact with floodwater | Leptospirosis | The **only epidemic-prone infection transmitted directly from contaminated water** (WHO 2005). Rodent urine; flooding proliferates rodents and pushes them onto the same high ground as people. Mumbai 2000; Taiwan, Typhoon Nali, 2001 (WHO 2006) |
| Direct contact | Wound infections, dermatitis, conjunctivitis, ENT infections | Real but **not epidemic prone** (WHO 2005) |
| Faecal-oral, post-flood | Hepatitis E | Outbreaks frequently follow heavy rain and floods; usually mild **except in pregnant women, case fatality up to 25%** (WHO 2006). The sharpest vulnerable-group finding in this analysis |
| Crowding in shelters | Measles, meningitis, acute respiratory infection | Driven by displacement conditions, not by water (WHO 2006) |

**Power cuts belong here.** Flood-related power cuts disrupt water treatment and
supply plants, raising waterborne risk, and degrade health facilities including
the cold chain (WHO 2005). Cross-links to
[[Power outage and disruption risk]].

**Damp and mould.** Wooden buildings and basements hold moisture after the water
leaves. Occupants of damp or mouldy buildings carry up to a **75% greater risk
of respiratory symptoms and asthma**; preventing persistent dampness is the
single most effective measure (WHO 2009).

**Corpses do not cause epidemics.** There is no evidence that dead bodies pose
an outbreak risk after natural disasters; the risk sits with survivors' living
conditions (WHO 2005; WHO 2006). If the user raises it, correcting the belief
*is* the intervention -- WHO asks that people be informed precisely to prevent
panic and inappropriate disposal.

## Exposure -- who is in the way

- Low-lying populated areas: terrain (3) crossed with population (9).
- Proximity to sea, lake or river, against the permanent and seasonal water
  baseline (4), so a river in its channel is not counted as flooding.
- Residential areas near plants and **outfalls** -- the outfall is where
  effluent enters the water, and it is not the plant location
  (Ehalt Macedo et al. 2022).
- **Displacement and shelter first.** The evidence points here before it points
  at pipes: the size, health status and living conditions of the displaced
  population are what drive outbreak risk (WHO 2006).
- Pre-event sanitation service level (JMP), input 15.

Exposure is **who and how many**. Without population data it returns "not
quantified"; area is never substituted for people.

## Vulnerability -- how hard it lands

INFORM (input 8) **for the year of the event**, release year always stated:

- INFORM Risk scores 0-10 across Hazard & Exposure, Vulnerability, and Lack of
  Coping Capacity, over roughly 80 indicators (INFORM).
- Vulnerability holds *Socio-economic Vulnerability* and *Vulnerable Groups* --
  populations with limited access to social and health care systems --
  geometrically aggregated (INFORM).
- Lack of Coping Capacity governs whether a sanitation failure is recovered
  from or compounds. A separate claim from Vulnerability; report both.
- **INFORM Climate Change** is a separate product, and is where any
  forward-looking statement belongs (INFORM).

**A score is not an explanation.** INFORM tells you which components score
badly, not why a country came to be that way. Decompose the score; do not
narrate history.

Two vulnerable groups this hazard singles out, which a national index will not
show: **pregnant women** (hepatitis E) and **children under five** (diarrhoeal
disease and ARI) (WHO 2006). Country income level matters directly -- diarrhoeal
outbreak risk after a disaster is higher in developing than in developed
countries (WHO 2006).

**INFORM is national**; the AOI is not. It sets the regime -- how much
institutional capacity exists -- never a property of the mapped population.

## Recommendation

**Individual.** Safe water first: boil or chlorinate. Free chlorine at a few
mg/l with about **30 minutes** contact inactivates **>99.99% of enteric bacteria
and viruses** -- though not *Cryptosporidium parvum* oocysts or mycobacteria;
aim for a residual free chlorine of **0.2-0.5 mg/l** at 30 minutes (WHO 2005).
Avoid skin contact with floodwater; wash and cover wounds (WHO 2006). Protected
storage, safe food preparation and hand hygiene -- adequate containers, cooking
pots and **fuel** reduce cholera and diarrhoeal risk (WHO 2005). Dry buildings
before mould establishes (WHO 2009). Seek care early for fever, and for
diarrhoea in a child under five (WHO 2006).

**City mayor or planning office.**

- **Uninterrupted safe drinking water is the single most important preventive
  measure** after a flood (WHO 2005; WHO 2006). Everything else ranks below it.
  Iowa and Missouri, 1993, is the worked example of risk recognised early and
  clean water prioritised (WHO 2005).
- **Settlement and shelter planning**: adequate water and sanitation access,
  minimum space per person (WHO 2006). Muzaffarabad 2005 -- an outbreak of
  >750 cases in a camp of 1,800 was controlled by providing adequate water and
  sanitation facilities (WHO 2006).
- **Surveillance and early warning**, with early diagnosis and treatment of
  diarrhoeal disease and ARI in under-fives, and oral rehydration salts stocked
  (WHO 2006).
- **Vaccination is not the first lever.** Mass tetanus campaigns are **not**
  indicated after floods; oral cholera vaccine is only for populations at
  immediate risk; typhoid vaccines are not recommended for mass campaigns.
  Clean water and adequate sanitation remain the practical strategy
  (WHO 2005). Measles immunisation with vitamin A *is* a priority in crowded
  displacement settings (WHO 2005).
- **Risk-based sanitation management**: Sanitation Safety Planning (WHO 2018).
- **Structural resilience** for plants inside the flood envelope -- intake and
  outfall protection, power continuity, containment during surcharge. Where the
  national treatment gap dominates, hardening one plant is the wrong first
  answer (CPCB 2021).
- **Economics, when needed**: **USD 5.50 returned per USD 1 invested** in
  sanitation (WHO 2024). Attribute it; never present it as an own estimate.

## Knowledge -- what the flood-impact literature finds, and under which conditions

**How to use this section.** Each entry gives the **conditions** under which a
paper found something, the **finding**, and what it does **not** support.
Use a finding for this AOI only where the facts of this run meet its
conditions. Otherwise, report it as evidence from elsewhere, naming the
setting, or leave it out. Name every setting as the paper names it. Never
widen a finding to a climate zone, an income group or a flood type the paper
did not study.

**Reading a relative risk, RR.** RR 1.10 means a 10% higher risk than in
comparable people who were not flooded. It does **not** mean 10% of people
fall ill. A relative rise is not an outbreak, so the starting assumption above
still holds.

### The evidence base behind most entries

(Yang et al. 2024) is a systematic review and meta-analysis of studies
published from January 2000 to March 2023. It synthesised **37 studies**, after
excluding 13 judged at definitely high risk of bias. The studies cover
**17 countries or territories**, **26 of them in Asia**. Sri Lanka is not among
them. Almost all studies cover a single state or province. "Exposed" almost
always means living in a flooded area during the flood period, mostly taken
from disaster records. **Injuries, suicide, symptoms and psychological outcomes
such as PTSD were excluded by design**, so the review says nothing about them.

**Four pathways** from flood to illness and death (Yang et al. 2024):

1. Contaminated water supply: gastrointestinal disease, typhoid and
   paratyphoid.
2. Breeding grounds for fungi, bacteria, viruses and vectors (mice,
   cockroaches, mosquitoes): outbreaks of infectious disease *may be
   triggered*.
3. Displacement: poor sanitation in temporary accommodation, crowding, no
   protection from non-optimal temperatures, and limited access to medical
   care. This means delayed diagnosis and treatment, and higher mortality.
4. Disaster-related psychological disorders that weaken health through
   immunity, sleep, substance use and self-care.

### K1. Deaths in the months after the flood

- **When:** people living in the flooded area; within six months (the
  estimates span four days to 24 weeks).
- **Finding:** all-cause mortality **RR 1.26 (95% CI 1.10-1.46)**, a
  meta-analysis of three studies: Beijing 2012, Matlab in Bangladesh 2004,
  and Nepal 1993. In Beijing, cardiovascular mortality rose 0-4 days after the
  flood; respiratory mortality showed no significant association (one study)
  (Yang et al. 2024).
- **Beyond six months:** the one study, England and Wales over 1994-2005, found
  all-cause mortality *lower* in the following year, RR 0.90 (0.82-0.99)
  (Yang et al. 2024).
- **Does not support:** a death toll for this AOI; any effect beyond six months.

### K2. A reported death toll is a floor, not the health impact

- Official records usually count only deaths from the flood's direct physical
  forces or hazards -- drowning, electrocution, hypothermia. They miss deaths
  and diseases from contaminated food and water, pathogens, impaired access to
  health services and displacement (Yang et al. 2024).
- Floods can cause long-term health effects that a damage assessment with too
  short a time horizon does not capture (Merz et al. 2010).
- Human health is a non-economic loss. A study reviewed there, on national
  policy in Japan and Bangladesh, found losses such as death, injury,
  infectious disease and mental disease consistently undervalued by formal
  disaster policy (McNamara and Jackson 2019).
- Sri Lanka has no comprehensive, consistent, long-term national hazard
  record. Its mortality and displacement figures are likely underestimates,
  and health impacts are not integrated into its disaster databases. The
  authors call for disaster surveillance inside routine health information
  systems (De Silva et al. 2026).

### K3. Where flood deaths concentrate

- **When the flood comes from a dike or embankment breach** (Netherlands
  model): the people at risk are the inhabitants minus those who evacuate or
  find shelter. Mortality follows water depth, rise rate and flow velocity. It
  is high in the **breach zone** (collapsed buildings, high velocities). It is
  relatively high where **water rises rapidly**, because people are less likely
  to reach higher ground or higher floors. In their South Holland scenario,
  evacuation needed more time than was available, and about 3,000 deaths were
  estimated, mostly where the water was deepest (Jonkman et al. 2008).
- **By setting and flood type:** in developed countries the risk to life comes
  mostly from coastal flooding, flood-defence failure and flash floods, where
  velocity, depth and debris cause loss of stability and drowning. In
  developing countries, direct intangible losses are often the largest,
  because high loss of life has been observed there. Warning systems that
  allow evacuation can reduce the risks to life and health. How well they
  work depends on the flood type and its lag time (Olesen et al. 2017).
- **India, 80 heavy-rain flood events:** shorter floods went with *more*
  fatalities, possibly because there is less time to anticipate, warn and
  activate emergency procedures. This is a correlation only; the spatial
  regression explains little (R2 0.23) (Singh and Dhanya 2024).
- **Sri Lanka, 2010-2025:** floods with landslides were the most frequent
  combined hazard, reported in fourteen different years, and rural and
  low-income communities are disproportionately affected. Displacement was
  greatest in 2011 (663,696 people); deaths were high in 2014 (336) and 2017
  (329) (De Silva et al. 2026).
- **Sri Lanka, terrain and drainage:** most of the population and economic
  activity sit in low-lying, flood-prone areas, and the country has had
  flood damage every year for four decades, from monsoon rain, cyclones,
  flash floods and urban floods. The steep Central Highlands act as a funnel:
  in extreme events rain reaches the low-lying coastal plains so fast that
  even advanced drainage can be overwhelmed. Most drainage and reservoir
  systems are designed for 1-in-50 or 1-in-100-year events
  (Amaratunga and Kodituwakku 2026).
- **Warnings save lives:** countries with "substantial" to "comprehensive"
  multi-hazard early warning have a disaster mortality rate six times lower
  than countries with "limited" to "moderate" systems, from Sendai Framework
  Monitor data (Amaratunga and Kodituwakku 2026). Investment in early
  warning, risk-informed land-use planning and community preparedness can
  reduce disaster mortality by up to 40% (De Silva et al. 2026).
- **Warnings in Sri Lanka** come from the Department of Meteorology, NBRO
  (landslides) and the Department of Irrigation (rivers and reservoirs), all
  fed to the Disaster Management Centre. Fragmented warnings and "alert
  fatigue" cost timeliness, the systems run in silos, and recent research
  found low trust in them. Warnings in Sinhala, Tamil and English that reach
  the last mile are a low-cost, high-impact way to reduce the death toll
  (Amaratunga and Kodituwakku 2026).
- **Vehicles:** civil traffic on inundated streets should not be allowed
  during urban floods, because behaviour under stress is unforeseeable
  (Kramer et al. 2016).
- **Does not support:** applying a Dutch mortality function to a slow riverine
  flood with no breach.

### K4. Injuries, distress and mental health -- named as damages, not measured

The review behind most of this section left these outcomes out (see "The
evidence base"). The papers below fill part of that gap. They show that
injuries and psychological harm are **recognised flood damages**. None of them
measures how often they occur after a flood.

- **The gap is in our sources, not in the field.** Most original studies of
  flood exposure and health focused on mental disorders, according to an
  earlier mapping review that (Yang et al. 2024) cite as their reason for
  studying other outcomes.
- **Mental health feeds physical health.** Disaster-related psychological
  disorders can worsen mortality and morbidity through weakened immunity,
  sleep problems, substance abuse and poor self-care (Yang et al. 2024).
- **Direct physical harm.** Drowning, electrocution and hypothermia are the
  flood's direct physical forces and hazards (Yang et al. 2024). Velocity,
  depth and debris make people lose their footing and drown
  (Olesen et al. 2017).
- **How damage frameworks name them:**
  - direct intangible: loss of life, injuries, psychological distress;
    indirect intangible: trauma, loss of trust in authorities
    (Merz et al. 2010);
  - direct: fatalities, injuries; indirect: psychological traumas, societal
    disruption (Jonkman et al. 2008);
  - stress and anxiety, with PTSD named; lives and injuries; diseases; loss
    of community; disruption of living (Olesen et al. 2017);
  - direct: loss of life, injuries, psychological distress; indirect:
    traumatic experience, deteriorating health, emotional and psychological
    damage (Romali et al. 2025).
- **How assessments have treated them** (Olesen et al. 2017):
  - UK, summer 2007 floods: health impacts were appraised as people's
    willingness to avoid the distress that flooding causes; 13 fatalities
    were recorded after the flood.
  - North Queensland, January 1998: the study listed fatalities, serious and
    minor injuries, other health effects, short-term quality-of-life losses
    (including the stench of sewage water), and long-term psychological
    problems. Only death and injury were costed, because the others have no
    clear market.
  - The UK social vulnerability index gives priority to areas with people
    over 75, single parents and people with long-term sickness.
- **Mental stress and fear:**
  - after a landslide that followed extensive rainfall in Nepal, 68.4% of
    respondents reported harmful mental stress, such as fear of new
    landslides. This is a landslide, not a flood (McNamara and Jackson 2019,
    reviewing a field study);
  - the psychological effects of a *potential* loss can harm well-being even
    if the loss never happens (McNamara and Jackson 2019);
  - experts expected that, for people living behind ever-higher dikes, the
    feeling of safety could turn into a real fear of flooding. This is an
    expert judgement, not a measurement (Brouwer and van Ek 2004).
- **Self-reported data carry a bias:** responses in flood-damage surveys may
  be influenced by social, economic or psychological factors
  (Romali et al. 2025).
- **Sri Lanka:** injury counts were among the variables extracted "if
  reported", and the paper gives no injury totals (De Silva et al. 2026).
- **Not found in any paper held:** a rate of injury, PTSD, depression or
  anxiety after a flood, and any finding on **suicide** -- Yang et al. 2024
  mention suicide only as an excluded outcome -- or on symptoms such as cough
  or rash.
- **Rule:** name injuries and psychological harm as recognised flood damages
  and say that the sources held do not size them. Never give a rate.

### K5. Gastrointestinal illness, days to weeks after

- **When:** people living in flooded areas; within three weeks (all
  gastrointestinal disease) or six months (diarrhoea, dysentery).
- **Finding** (Yang et al. 2024):
  - all gastrointestinal disease **RR 1.10 (1.08-1.13)**: three studies (USA,
    Taiwan), consistent;
  - diarrhoea **RR 1.11 (1.04-1.20)**: four studies, consistent;
  - dysentery **RR 1.38 (1.18-1.62)**: seven studies, all in mainland China.
    The results vary widely between studies (I2 87%), but every estimate
    shows a rise.
- **Timing:** where the lag was tested, gastrointestinal risk peaked **several
  days** after the flood (Yang et al. 2024).
- **Single studies:** acute gastroenteritis RR 4.20, two weeks after the 2015
  Netherlands flood, with self-reported contact. VTEC enteritis (RR 1.35) and
  cryptosporidiosis (RR 1.57) rose over the year after the 2015-16 Ireland
  flood (Yang et al. 2024).
- **Pathway:** contamination of water supply systems (Yang et al. 2024).
- **Does not support:** an outbreak forecast.

### K6. Settings where sanitation fails with the flood

- **Rural floodplain, tube-wells and on-site latrines** (rural Bangladesh,
  120 households surveyed in January 2007): in every flood, about **two-thirds
  of tube-wells and all toilets** became unusable. Hanging latrines, boats and
  defecation directly into water bodies polluted the water people use. Most
  people suffered water-borne diseases. Few stored emergency medicine, and
  treatment came from local rural doctors. The adaptation found was raising
  tube-wells on an elevated base or with an extra pipe
  (Chanda Shimi et al. 2010). *Abstract only.*
- **Pluvial (cloudburst) flooding with combined sewers:** the citizens' risk
  of contracting infectious disease has to be evaluated, in particular where
  combined sewer systems are installed (Olesen et al. 2017).
- **High-density cities with bad drainage** can experience a high risk of
  infectious disease spreading (Olesen et al. 2017).
- **Coastal flooding:** the risk of infectious disease is *not very high*
  (Olesen et al. 2017).
- **Procedure:** screen health first from the flood type and the risk of
  people being exposed to contaminated water (Olesen et al. 2017).
- **Power and heat** (US Gulf South, after Hurricane Katrina): with
  electricity lost in heat and humidity, ice was needed to keep food cool and
  to cool rags against heat stroke and heat exhaustion, especially for the
  infirm and the elderly, and to keep life-saving medication from going bad.
  Where the power loss came with loss of potable water and flooding --
  including sewers backing up into homes -- melted ice also became drinking
  water (Dowty and Wallace 2010).

### K7. Typhoid, paratyphoid, hepatitis A and E: mixed evidence

- Typhoid and paratyphoid: two studies in mainland China found no significant
  association. In Jakarta, typhoid was not significant (RR 1.65, 0.88-3.08),
  but paratyphoid rose (RR 4.52) among people whose home had been inundated in
  the previous 12 months (Yang et al. 2024).
- After a 2007 flood in Anhui, China, hepatitis A rose on day 15 (RR 1.40).
  Hepatitis E showed **no significant association** after the same flood
  (RR 0.94, 0.67-1.31) (Yang et al. 2024).
- **Qualifies (WHO 2006):** keep the severity warning (hepatitis E in
  pregnancy), but do not say that hepatitis E rises after this flood.

### K8. Leptospirosis: inconsistent effect

- One study, Thailand, floods of 2010-2012: RR 4.03 (2010), 1.65 (2011) and
  0.66 (2012). The direction changed from year to year (Yang et al. 2024).
- **Qualifies (WHO 2005):** the transmission route stands (skin contact with
  water carrying rodent urine). The size, and even the direction, of the
  effect is not stable.

### K9. Skin and eye disease

- Three studies all found a rise in skin disease (overall skin disease, skin
  infection, atopic dermatitis) between one week and three months after the
  flood (Yang et al. 2024).
- Eye disease rose 0-10 days after a flood in Taiwan. Acute haemorrhagic
  conjunctivitis was twofold 0-10 days after a flood in mainland China
  (Yang et al. 2024). This agrees with the non-epidemic contact infections in
  (WHO 2005).

### K10. Malaria: rose after floods in three settings

- **When:** Sudan, Gezira, August 2013; mainland China; and Uganda, Western
  highlands, May 2013 -- the settings studied.
- **Finding** (Yang et al. 2024):
  - Sudan: incidence 0-11 weeks after the flood was higher than in the same
    weeks of the two previous years;
  - mainland China: risk peaked on the **27th day** after a flood (RR 3.44,
    3.28-3.62);
  - Uganda: RR 1.30 (1.16-1.46) in flooded compared with non-flooded villages,
    over the year after.
  At least three studies agree; no meta-analysis was possible.
- **Pathway:** floods create breeding grounds for vectors, mosquitoes among
  them (Yang et al. 2024).
- **Timing:** these are the only post-flood malaria lags in the literature held
  -- from weeks (a 27th-day peak; 0-11 weeks) to a year. Quote them as these
  studies' findings, never as this AOI's lag.
- **Does not support:** a malaria rise where malaria is not transmitted; any
  generalisation by climate zone (see K17).

### K11. Dengue: no flood evidence in the literature held

- None of the papers held reports an association between floods and dengue,
  and dengue is not among the outcomes in (Yang et al. 2024).
- Sri Lanka is among the first countries to develop triggers and threshold
  levels -- anticipatory-action protocols -- for dengue outbreaks. How useful
  anticipatory action is in a sudden, high-magnitude disaster is yet to be
  examined (Amaratunga and Kodituwakku 2026).
- In the INFORM framework extended for projections, epidemics -- projected as
  the population at risk of malaria and dengue -- are a hazard of their own,
  separate from river and coastal floods (Marzi et al. 2025).
- **Rule:** say that a dengue rise after this flood is not established by the
  sources held. Give the WHO vector-control actions (WHO 2025b) as prevention,
  not as a response to a forecast rise.

### K12. Other infections

- Japanese encephalitis, two studies in mainland China, inconsistent: lowest
  risk on day 11 in Anhui (RR 0.58), highest on day 24 in Sichuan (RR 2.00)
  (Yang et al. 2024).
- Hand, foot and mouth disease: RR 1.18 within a month of floods; one study,
  children, Qingdao, China (Yang et al. 2024).
- Infectious-disease hospitalisation RR 1.15 at 0-4 weeks (Vietnam).
  Food- and water-borne disease hospitalisation rose at 0-14 days (New York
  State) (Yang et al. 2024).

### K13. Respiratory, cardiovascular, damp

- Five studies -- Vietnam, the Netherlands, Cambodia, Bangladesh, USA --
  consistently found a rise in respiratory disease after floods, though the
  outcome measured varied (Yang et al. 2024).
- Non-external hospitalisation RR 1.07 within four weeks (Vietnam).
  Cardiovascular hospitalisation RR 1.01 (1.00-1.03) at 0-14 days in the USA. No
  significant association for acute cardiovascular disease in Canada
  (Yang et al. 2024).
- **Damp buildings:** moist building materials disperse microorganisms that
  need extensive cleaning and disinfection. Quick drying or disinfection
  reduces mould on walls, and can only be done efficiently with enough warning
  time (Merz et al. 2010). This adds to the mould evidence in (WHO 2009).

### K14. Older people

- After the 2018 flood in Japan, nursing-home admission was three times higher
  among affected older people than among those not affected (study population
  aged over 45, almost all over 65). Cognitive decline in
  people over 65 rose, RR 1.12 within six months (Japan). Older people may be
  more vulnerable to the health effects of floods (Yang et al. 2024).
- In the lower Ganga-Brahmaputra floodplains, the elderly share correlated
  positively with fatalities, which fits dependency and difficulty of moving.
  Across India, though, the sign changed from region to region
  (Singh and Dhanya 2024).
- The old-age index and the share of children and elderly measure dependency
  and how hard it is to evacuate unaided (Galderisi and Limongi 2021).
- **Rule:** vulnerability by age is not constant in space. Do not state it as
  a fixed property (Singh and Dhanya 2024).

### K15. Children, pregnancy and birth

- Children aged 6-59 months, Orissa, India: stunting and underweight were
  higher in the second month after the flood, and underweight and wasting one
  year after. These are two studies of the same population
  (Yang et al. 2024).
- Children exposed in the perinatal period to the 1998 Yangtze flood had a
  higher risk of cognitive impairment at four to eight years old
  (Yang et al. 2024).
- Preterm birth (RR 1.09) and low birth weight (RR 1.11) rose within 0-4 years
  after the 1997 Red River flood, USA. A Canadian study of the 2013 Calgary flood found
  no significant associations. The evidence is limited (Yang et al. 2024).

### K16. Women

- In frequently flooded regions of India, the female share correlated
  negatively, or less positively, with fatalities, against the common
  assumption that women are more vulnerable (Singh and Dhanya 2024).

### K17. Conditions proposed to change the risk -- hypotheses, not findings

(Yang et al. 2024) propose that the health effects of floods *may be modified*
by:

- location: socio-economic status, diet, sewage system, disaster response,
  medicine sources;
- climate: climate zone, temperature, humidity;
- biology: mosquito density, vegetation type;
- the flood: severity, duration, type;
- the population: children, the elderly, people with chronic disease.

The review lists these as research gaps; it does not test them. An agent may
write "the risk may be higher here because of X, a factor the literature
proposes". It may never write "the risk is higher here because of X". The
climate zone of this AOI is a condition to state, not a multiplier.

### K18. The health system

- Demand for health services rises sharply after a flood, while health-system
  capacity and access are disrupted. The gap is worse where health resources
  are poor or infrastructure is vulnerable to floods. Providers should
  strengthen medical supplies, human resource management and triage;
  policymakers should
  strengthen health-system resilience, preparedness, early warning and
  response protocols (Yang et al. 2024).
- A hospital that stops working can significantly increase the loss of life.
  Facilities directly involved in the emergency, such as hospitals and fire
  brigades, have the highest strategic role (Galderisi and Limongi 2021). A
  Danish municipal priority scheme gives hospitals and transformer stations
  the top weight, 10 of 10 (Olesen et al. 2017).
- Digital and e-health solutions should be prioritised in crises where
  conventional health care is hard to reach, and digital literacy for such
  platforms should be part of every health professional's training
  (Amaratunga and Kodituwakku 2026).
- **How a flood's health response is governed in Sri Lanka:** disaster risk
  is systemic but governance is sectoral -- Irrigation leads on floods, NBRO
  on landslides, Health on pandemics. A major flood is also a health crisis,
  and the lead agency often lacks the authority to make other departments
  act. The Disaster Management Act No. 13 of 2005 makes the National Council
  for Disaster Management the apex body and the Disaster Management Centre the
  coordinator, with a District Disaster Management Unit in every district.
  About 90% of the disaster budget goes to recovery and 10% to mitigation
  (Amaratunga and Kodituwakku 2026).

### K19. Reading vulnerability

- INFORM's Vulnerable Groups category identifies people by **health
  condition**, age dependency and food security, alongside uprooted people
  (Marzi et al. 2021).
- Sri Lanka is lower-middle-income but has high human development (HDI
  0.776); its poverty rate was 14.3% in 2021 against the national poverty line
  (Amaratunga and Kodituwakku 2026).
- How a flood affects food utilisation depends on the pre-existing state of
  health and sanitation infrastructure (Galli et al. 2025). See
  [[Essential services]].

## Areas of uncertainty -- to [[Entro - Uncertainty Analyser]]

1. **Outfall position**: average offset **6.5 +- 3.1 km** from the reported
   plant location, up to **21.8 km** (Ehalt Macedo et al. 2022). At
   neighbourhood scale that exceeds the feature being placed.
2. **Plant coverage is uneven**, worst in lower-income countries, by the
   authors' own statement (Ehalt Macedo et al. 2022). "No plant" and "no
   reporting" are opposite findings the data cannot separate.
3. **Dilution factor is normal-condition**, not flood-condition.
4. **INFORM is national**, the AOI is not.
5. **No observed inundation** -- no flood mask in the pipeline, so extent is
   inferred from terrain and permanent water. Every exposure number inherits it.
6. **Sewer geometry is usually absent** -- manholes, pipes and pumping stations
   are rarely open data.
7. **The disease evidence is not local.** The outbreak record is global and
   historical; the most recent case studies in the WHO references are from
   2005. It establishes *mechanism*, not a rate for this AOI this year.
8. **Source vintage.** Check for newer CPCB, INFORM and JMP releases before
   quoting the figures above.
9. **The health literature is not local either.** Yang et al. 2024 draw
   26 of 37 studies from Asia, almost all from a single province, and none
   from Sri Lanka. Treat their relative risks as evidence of direction, not
   as this AOI's size of effect.
10. **Dengue after floods is unsourced** in the literature held (K11).
11. **Relative risks, not rates.** No paper held gives an absolute incidence
    for this AOI.
12. **One source read as abstract only:** Chanda Shimi et al. 2010 (K6).
13. **Injury and mental-health outcomes are named but not sized** (K4). No
    paper held gives a rate, and none reports on suicide.

The user gets two or three sentences and an offer of depth, never this list.

## Local and event data

Prefer verified local data over a global product. National pollution-control
and disaster-management agencies, national hydrological services,
[HDX](https://data.humdata.org/), [ReliefWeb](https://reliefweb.int/), and the
[JMP](https://washdata.org/). Give the link **and the publication date**, and
say whether a figure is for the event or is background. A local figure that
cannot be verified is not used -- it looks specific, which makes it worse than
a verified global one.

---

Related: [[Human health risk - sources]] | [[Chanakya flows - MOC]] | [[Chanakya node schema]] | [[Chanakya input sources]] | [[Power outage and disruption risk]] | [[Drinking water scarcity]] | [[Essential services]] | [[Agent Chanakya - City Planner]] | [[Agent Argus - Orchestrator]] | [[Entro - Uncertainty Analyser]] | [[Workflows-MOC]]
