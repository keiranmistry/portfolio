// Self-contained on purpose: this function's source is embedded verbatim into
// the pre-hydration <script> in layout.js (via `.toString()`), so it must not
// reference anything outside its own body — only globals like Math and Date.
//
// Computes the sun's elevation angle above Toronto's horizon at `date` and
// checks it against the standard sunrise/sunset threshold (-0.833°). Working
// directly off elevation (a continuous function of the instant) rather than
// first solving for "today's" sunrise/sunset crossing times sidesteps a real
// bug that approach has: converting a local sunset time to UTC can land on
// the next (or previous) UTC calendar day depending on the season, and a
// naive same-day comparison misclassifies broad daylight as dark near that
// boundary.
export function isDarkInToronto(date = new Date()) {
  var LAT = 43.6532;
  var LON = -79.3832;
  var rad = Math.PI / 180;

  var J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  var d = (date.getTime() - J2000) / 86400000; // days since J2000.0 epoch

  var meanLon = (280.46 + 0.9856474 * d) % 360;
  var meanAnomaly = (357.528 + 0.9856003 * d) % 360;
  var eclipticLon =
    meanLon + 1.915 * Math.sin(meanAnomaly * rad) + 0.02 * Math.sin(2 * meanAnomaly * rad);
  var obliquity = 23.439 - 0.0000004 * d;

  var declination = Math.asin(Math.sin(obliquity * rad) * Math.sin(eclipticLon * rad)) / rad;
  var ra =
    Math.atan2(
      Math.cos(obliquity * rad) * Math.sin(eclipticLon * rad),
      Math.cos(eclipticLon * rad)
    ) / rad;

  // Equation of time, in minutes.
  var eqTime = 4 * (meanLon - ra);
  while (eqTime > 20) eqTime -= 4 * 360;
  while (eqTime < -20) eqTime += 4 * 360;

  var utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  var solarTime = utcHours + eqTime / 60 + LON / 15;
  var hourAngle = (solarTime - 12) * 15;

  var elevation =
    Math.asin(
      Math.sin(LAT * rad) * Math.sin(declination * rad) +
        Math.cos(LAT * rad) * Math.cos(declination * rad) * Math.cos(hourAngle * rad)
    ) / rad;

  return elevation < -0.833; // below the standard sunrise/sunset horizon
}
