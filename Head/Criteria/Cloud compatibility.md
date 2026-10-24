20% sweet spot

SOUrces???

---

## Cloud does not remove a product from the MCDM (2026-09-22)

The [[Flood_mask_Dataset_MCDA]] ranking used to drop every optical product when
AOI cloud cover exceeded 80%. It no longer does: `cloud_gate` moved to 100, so
cloud penalises the weight of the cloud criterion and never removes a product.

**The gate fired on a window MEAN, and feasibility is per-overpass.** Over the
Kelani event the window mean was 91.67%, and yet 2 of 16 daytime overpasses
were under 80% cloud -- one at 19%. Rejection asserts zero usable observation;
the record showed a small non-zero number.

This is the same lesson as the 20% cutoff below, one level up: **a single
aggregate cloud figure is a poor predictor of whether a given acquisition saw
the ground.** There it was ERA5 cloud against Sentinel-2 AOI usability; here it
is a 192-hour mean against individual overpasses.

The cost is stated where the numbers are: a rank is no longer a usability
claim, and `W1` has to be read beside it. See [[Flood_mask_Dataset_MCDA]] for
the full argument and its tension with [[Scoring criteria]] ruling 2.

---

On using a 20% cloud cutoff to pre-select Sentinel-2 scenes: tested and
rejected. See [[ERA5 cloud does not predict Sentinel-2 AOI usability]] — across
77 scenes a 20% cutoff on ERA5 cloud would have discarded 9 scenes that
actually passed. No cutoff between 10% and 80% was safe. The 20% figure still
has no source; this note records that it does not hold for AOI-scale scene
selection, whatever its origin elsewhere.
