---
type: dataset
desc: Reanalysis weather and soil-moisture archive behind the rainfall and antecedent-wetness variables
workflows: fetch_weather_data
context: head
status: stub
tags: [dataset, weather, tier/pretrained]
source_url:
verified_on:
---

> **Correction, 2026-09-26: no workflow has actually received ERA5-Land.**
> `fetch_weather_data` names no model, so Open-Meteo answers with `best_match`,
> which "combines IFS HRES, ERA5 and ERA5-Land seamlessly". Measured at
> Edinburgh (Aug 2026) and Tirupati (Nov 2021), its soil moisture matches
> ECMWF IFS in 72 of 72 hours and ERA5-Land in 0. The label is wrong; the fix
> is reported and not yet made. `fetch_weather_grid` names its model since
> 2026-09-26 and no longer links here. See [[ECMWF IFS via Open-Meteo Archive]].

Related: [[Datasets-MOC]] | [[Entro - Uncertainty Analyser]] | [[ECMWF IFS via Open-Meteo Archive]]
