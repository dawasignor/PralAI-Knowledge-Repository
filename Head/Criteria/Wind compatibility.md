
## SAR
The accuracy of SAR flood mask detection relies on the principle of **specular reflection**, where calm, smooth water acts like a mirror to incoming microwave radiation. Under calm atmospheric conditions, the side-looking SAR sensor transmits a signal that reflects cleanly away from the satellite, resulting in a distinctively low radar backscatter coefficient. On a calibrated SAR image, these areas materialize as dark or black pixels, providing a sharp, easily threshold contrast against the brighter, rougher surrounding terrain and vegetation. This fundamental radiometric difference allows automated classification algorithms, such as Otsu's thresholding, to rapidly and accurately delineate the boundary of open water bodies and localized inundation.

However, this clean backscatter profile is highly sensitive to near-surface wind conditions. When 10-meter wind speeds cross critical thresholds (typically exceeding 3 to 5 m/s), wind stress creates small-scale gravity and capillary waves on the floodwater surface. This newly generated surface roughness induces [[Bragg Scattering Criterion]], which reflects a significant portion of the radar energy back toward the satellite sensor. As a result, the water surface artificially brightens, escalating backscatter values closer to those of bare soil or agricultural fields. This phenomenon causes thresholding algorithms to misidentify water as land, producing extensive **false negatives** and severely compromising the reliability of the generated flood mask.



## Sources: 
1. 