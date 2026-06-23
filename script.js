
/* =========================================================
   Atlas Motors Hub — page logic
   ========================================================= */
 
// -----------------------------------------------------------
// Page switching (sidebar nav)
// -----------------------------------------------------------
const pages = {
    "command-link":    "command",
    "oee-link":        "oee",
    "scoreboard-link": "scoreboard"
};
 
function showPage(pageId) {
    // Hide all pages, then show the chosen one
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
 
    // Update active state on nav links
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    const linkId = Object.keys(pages).find(k => pages[k] === pageId);
    if (linkId) document.getElementById(linkId).classList.add("active");
}
 
Object.keys(pages).forEach(linkId => {
    document.getElementById(linkId).addEventListener("click", (e) => {
        e.preventDefault();
        showPage(pages[linkId]);
    });
});
 
// Open on Command Center
showPage("command");
 
// -----------------------------------------------------------
// Scoreboard — UPH-needed math + hourly table
// -----------------------------------------------------------
function renderScoreboard() {
    const { shiftEnd, currentHour, shiftTarget, unitsProduced, hourly, hourlyTarget } = ATLAS_DATA;
 
    // UPH needed to hit shift target from this point forward
    const hoursLeft  = shiftEnd - currentHour;
    const unitsLeft  = shiftTarget - unitsProduced;
    const uphNeeded  = hoursLeft > 0 ? (unitsLeft / hoursLeft) : 0;
    document.getElementById("uph-needed").textContent = uphNeeded.toFixed(1);
 
    // Hourly breakdown rows
    const tbody = document.getElementById("hour-table-body");
    tbody.innerHTML = "";
 
    let cumulative = 0;
    hourly.forEach((row, i) => {
        cumulative += row.output;
        const targetCum = hourlyTarget * (i + 1);
        const delta     = cumulative - targetCum;
        const pct       = Math.min(100, (row.output / hourlyTarget) * 100);
        const underTarget = row.output < hourlyTarget;
 
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.hour}</td>
            <td>${row.output}</td>
            <td>${cumulative}</td>
            <td>${targetCum}</td>
            <td class="${delta >= 0 ? "delta-good" : "delta-bad"}">${delta >= 0 ? "+" : ""}${delta}</td>
            <td>
                <div class="hour-bar">
                    <div class="hour-bar-fill ${underTarget ? "hour-bar-fill--under" : ""}" style="width: ${pct}%"></div>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
renderScoreboard();
 
// -----------------------------------------------------------
// OEE calculator
// -----------------------------------------------------------
function runOeeCalc() {
    const planned   = Number(document.getElementById("calc-planned").value);
    const downtime  = Number(document.getElementById("calc-downtime").value);
    const idealSec  = Number(document.getElementById("calc-ideal").value);
    const total     = Number(document.getElementById("calc-total").value);
    const good      = Number(document.getElementById("calc-good").value);
 
    const runTime       = Math.max(0, planned - downtime);
    const availability  = planned > 0 ? runTime / planned : 0;
    // performance = (ideal cycle time in minutes × units) ÷ run time
    const idealMin      = idealSec / 60;
    const performance   = runTime > 0 ? Math.min(1, (idealMin * total) / runTime) : 0;
    const quality       = total > 0 ? good / total : 0;
    const oee           = availability * performance * quality;
 
    const pct = (n) => (n * 100).toFixed(1) + "%";
    document.getElementById("calc-availability").textContent = pct(availability);
    document.getElementById("calc-performance").textContent  = pct(performance);
    document.getElementById("calc-quality").textContent      = pct(quality);
    document.getElementById("calc-oee").textContent          = pct(oee);
}
 
document.getElementById("calc-run").addEventListener("click", runOeeCalc);
 
// Run once on load so default values show real results, not dashes
runOeeCalc();
