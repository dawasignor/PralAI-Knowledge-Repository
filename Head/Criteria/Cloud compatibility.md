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

## At the passes, not over the window (2026-11-22)

**Cloud and wind are read at the acquisitions, not over the window** (user decision 2026-11-22). Cloud (W1) is the mean of the AOI model cloud at the OPTICAL passes -- OPERA DSWx-HLS, MODIS MCDWD, VIIRS VCDWD -- because only optical sensors are hurt by cloud; wind (W2) is the mean of the AOI 10 m wind at the RADAR passes -- GFM, OPERA DSWx-S1 -- because only radar is hurt by wind. Pass times come from Module 1 (data_availability): exact for GFM, DSWx-S1 and DSWx-HLS; for MODIS and VIIRS, whose daily composites carry no time, the nominal overpass (Terra 10:30, Aqua 13:30, VIIRS 13:30 local SOLAR time, which is 10:39 and 13:39 civil time in Colombo) on every day of the window. The values come from Module 2's hourly series, interpolated between the two hours either side of each pass. Passes within 5 minutes are one acquisition (one Sentinel-1 pass gives both GFM and DSWx-S1). A pass on a missing hour is withheld and counted; with none left the index is not known -- the window mean is never used instead. Kelani basin: cloud 62.8% over 20 optical passes (window mean was 77.0%), wind 3.24 m/s over 5 radar passes (window mean 3.40), giving W1 0.101 and P1-P6 0.072 each.

**Guardrail: everything is converted to LOCAL time before scoring** (user rule 2026-11-22). Pass times (UTC), model hours (UTC) and nominal overpasses (local solar time) are all turned into the event's IANA zone (Module 1's `period.timezone`) before they are matched or counted, and a pass belongs to the window by its local date. A missing zone, an unknown zone, hours not stored in UTC or a stamp without a zone stop the run (`LocalTimeError`) -- nothing is guessed. Every time the code returns is local, with its offset.
