---
type: sources
flow: accuracy_interpretation
desc: Full references for every citation key used in the flood map validation notes
aliases: [validation sources, agreement metric references, accuracy metric citations]
keywords: [sources, references, citations, MCC, Matthews, Jaccard, F1, Van Rijsbergen, Chicco, Congalton, Bates, De Roo, UNOSAT, HDX, JRC, Copernicus EMS, EMSR851]
agent: entro
knowledge_note: Agreement metrics for binary flood maps
context: head
retrieval: Return the full reference for any citation key used in the flood map validation and agreement-metric notes.
validation_status: UNOSAT entry read from the delivered files; the metric references are listed from standard bibliographies and were not reopened -- verify page numbers before submission
status: draft
tags: [sources, citations, entro, validation]
---

## How to use this note

The knowledge notes cite in short form -- **(Matthews 1975)**. This note
expands every key. **Verification** -- `read`: the source was opened and the
fact taken from it. `listed`: the reference is standard and was not reopened
for this note.

---

## References

### (Matthews 1975)

Matthews, B. W. (1975). "Comparison of the predicted and observed secondary
structure of T4 phage lysozyme." *Biochimica et Biophysica Acta -- Protein
Structure*, 405(2), 442-451. doi:10.1016/0005-2795(75)90109-9.
Origin of the Matthews correlation coefficient. **listed**

### (Jaccard 1912)

Jaccard, P. (1912). "The distribution of the flora in the alpine zone."
*New Phytologist*, 11(2), 37-50. Origin of the intersection-over-union index.
**listed**

### (Van Rijsbergen 1979)

Van Rijsbergen, C. J. (1979). *Information Retrieval* (2nd ed.). London:
Butterworths. The F-measure, of which F1 is the balanced case. **listed**

### (Chicco and Jurman 2020)

Chicco, D., & Jurman, G. (2020). "The advantages of the Matthews correlation
coefficient (MCC) over F1 score and accuracy in binary classification
evaluation." *BMC Genomics*, 21, 6. doi:10.1186/s12864-019-6413-7. **listed**

### (Congalton 1991)

Congalton, R. G. (1991). "A review of assessing the accuracy of
classifications of remotely sensed data." *Remote Sensing of Environment*,
37(1), 35-46. The confusion-matrix framework for remote-sensing maps.
**listed**

### (Bates and De Roo 2000)

Bates, P. D., & De Roo, A. P. J. (2000). "A simple raster-based model for
flood inundation simulation." *Journal of Hydrology*, 236(1-2), 54-77. The
fit measure F = intersection over union, used for flood extent. **listed**

### (UNOSAT 2025)

UNITAR-UNOSAT (2025). *Flood extent, Sri Lanka, Cyclone Ditwah, 26 November -
2 December 2025*, event code FL20251128LKA, shapefile delivery via the
Humanitarian Data Exchange. CC BY-SA: credit UNOSAT. Layers and attributes
**read** from the delivered zip, 2026-10-11.

### (Copernicus EMS 2025)

Copernicus Emergency Management Service (2025). *Rapid Mapping activation
EMSR851*, Sri Lanka: AOI02 "Kelani Ganga River" delineation product v1
(post-event PlanetScope 3.9 m, 30 November 2025); AOI09 "Gampola" grading product v1 (post-event GeoEye
0.5 m, 4 December 2025) and AOI03 "Mahaveli Ganga River" delineation,
monitoring 1, v1 (post-event Legion 1.6 m, 3 December 2025); shapefile
deliveries, metadata dated 2025-12-04. Copyright notice by link:
<http://emergency.copernicus.eu/mapping/ems/cite-copernicus-ems-mapping-portal>.
Layers, attributes and source tables **read** from the delivered zips,
2026-11-18; the copyright page **not yet read**.

### (Olofsson et al. 2014)

Olofsson, P., Foody, G. M., Herold, M., Stehman, S. V., Woodcock, C. E., &
Wulder, M. A. (2014). "Good practices for estimating area and assessing
accuracy of land change." *Remote Sensing of Environment*, 148, 42-57.
doi:10.1016/j.rse.2014.02.015. The design rules of the labelled sample:
probability sampling, stratification, area-weighted estimates and a
confidence interval with every estimate. **listed**

### (Stehman 2014)

Stehman, S. V. (2014). "Estimating area and map accuracy for stratified random
sampling when the strata are different from the map classes." *International
Journal of Remote Sensing*, 35(13), 4923-4939.
doi:10.1080/01431161.2014.930207. The ratio estimators and their variances
used in `core/workflows/validation/estimate.py`. **listed**
