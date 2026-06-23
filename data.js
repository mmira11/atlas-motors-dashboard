
/* =========================================================
   Atlas Motors — fabricated sample data
   All numbers, crews, and station names are invented for demo
   purposes. Nothing here reflects any real-world facility.
   ========================================================= */
 
const ATLAS_DATA = {
    company: "Atlas Motors",
    shift:   "B-Shift",
    shiftStart:    6,    // 06:00
    shiftEnd:      18,   // 18:00
    currentHour:   15.7, // 15:42 — used by Command Center & Scoreboard
    shiftTarget:   240,
    unitsProduced: 182,
 
    // Hour-by-hour fabricated production figures.
    // Output per hour roughly trends toward target with one slow hour mid-shift.
    hourly: [
        { hour: "06:00", output: 17 },
        { hour: "07:00", output: 16 },
        { hour: "08:00", output: 18 },
        { hour: "09:00", output: 15 },
        { hour: "10:00", output: 14 },
        { hour: "11:00", output: 17 },
        { hour: "12:00", output: 13 },
        { hour: "13:00", output:  9 }, // 22-minute interruption
        { hour: "14:00", output: 16 },
        { hour: "15:00", output: 18 }
    ],
 
    hourlyTarget: 15, // units/hour target (240 / 16 productive hours rounded)
 
    // OEE inputs for the live calculator's defaults
    oee: {
        plannedMinutes: 720,
        downtimeMinutes: 58,
        idealCycleSec:   180,
        totalUnits:      182,
        goodUnits:       161
    }
};
 