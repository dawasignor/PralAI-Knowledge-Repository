---
type: moc
desc: The six spectral indices fetch_lulc_data computes, their band pairings and what each can and cannot claim
aliases: [spectral indices, index list, band indices, normalised difference indices]
keywords: [spectral index, normalised difference, NDVI, NDBI, BUI, NDMI, MNDWI, NMDI, sentinel-2, band pairing, land cover]
agent: norwood
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
context: head
retrieval: Start here to find which spectral index note answers a question, and how the six relate to one another.
status: draft
tags: [moc, spectral-index, sentinel-2]
---

The six indices `fetch_lulc_data` returns, all normalised differences on
Sentinel-2 surface reflectance at 20 m.

| Index | Formula | Bands | Range |
|---|---|---|---|
| [[NDVI]] | (NIR - Red) / (NIR + Red) | `nir`, `red` | [-1, 1] |
| [[NDBI]] | (SWIR16 - NIR08) / (SWIR16 + NIR08) | `swir16`, `nir08` | [-1, 1] |
| [[BUI]] | NDBI - NDVI | derived | **[-2, 2]** |
| [[NDMI]] | (NIR - SWIR16) / (NIR + SWIR16) | `nir`, `swir16` | [-1, 1] |
| [[MNDWI]] | (Green - SWIR16) / (Green + SWIR16) | `green`, `swir16` | [-1, 1] |
| [[NMDI]] | (NIR08 - g) / (NIR08 + g), g = SWIR16 - SWIR22 | `nir08`, `swir16`, `swir22` | [-1, 1] where defined |

**They are not six independent pieces of evidence.** [[NDMI]] and [[NDBI]] are
algebraic negatives on a shared band pair and near-negatives as computed here --
do not treat them as two votes. [[BUI]] contains [[NDVI]] and [[NDBI]] by
construction.

## Classification decisions built on these indices

- [[NDVI greenness bins]] -- why the NDVI classes are named for greenness and
  not for land cover, and the phenological method chosen to fix that.
- [[Xiao flooding rule for paddy]] -- the flooding signal that identifies
  transplanted paddy, using an index already returned.

Both are **specified and not implemented**: each needs a stack of scenes across
a season, and `fetch_lulc_data` selects a single scene.

---

Related: [[Head-MOC]] | [[Datasets-MOC]] | [[Sentinel-2 C1 L2A]] | [[BUI over NDBI - built-up index accuracy]] | [[Agent Norwood - Satellite expert]]
