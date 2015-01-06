document.addEventListener('DOMContentLoaded', function() {
    songWriter();
});

function songWriter() {
    "use strict";
    
    // Vars
    
    var scaleTypes = {};
    var chordsTypes = {};
    var settings = {};
    var uSettings = {};
    var noteNames = [];

    // Init values
    
    noteNames = ["C", "C# / Db", "D", "D# / Eb", "E", "F", "F# / Gb", "G", "G# / Ab", "A", "A# / Bb", "B"];
    uSettings.root = 0;
    uSettings.root = 0;
    uSettings.bmp = 100;
    uSettings.scale = "Major";
    
    // Init
    
    populateDataScales();
    populateDataChords();
    loopThroughChordsTypes();
    loopThroughScaleTypes();
    sequencer();

    // Functions

    function sequencer() {
        var tempo = calculateBPM(uSettings.bmp);
        var sequencerLoop = setInterval(function() {
            console.log("Sequencer Tick");
            clearInterval(sequencerLoop); // Stop that shit until using
        }, tempo);
    }
    
    function calculateBPM(BPM) {
        var qtrNote, sixtyFourNote;
        qtrNote=Math.round(((60/BPM)*1000)*100000)/100000;
        sixtyFourNote=(qtrNote/16);
        qtrNote=Math.round(qtrNote*100000)/100000; 
        sixtyFourNote=Math.round(sixtyFourNote*100000)/100000;
        return sixtyFourNote;
    }
    
    
    function loopThroughChordsTypes() {
        for (var key in chordsTypes) {
            console.log("CHORDS: " + chordsTypes[key].name + " KEY: " + key + " ");
        }
    }
    
    function loopThroughScaleTypes() {
        // Set up active indicator
        var para = document.createElement("scale");
        para.setAttribute("id", "activeScale");
        var node = document.createTextNode("Choose");
        para.appendChild(node);
        var scalesElement = document.getElementById("scale");
        scalesElement.appendChild(para);
        // Loop through the scaletypes and create choices
        for (var key in scaleTypes) {
            var para = document.createElement("scale");
            para.setAttribute("id", key);
            para.setAttribute("class", scaleTypes[key].tag[0]);
            var node = document.createTextNode(scaleTypes[key].name);
            para.appendChild(node);
            var element = document.getElementById("scaleMenu");
            element.appendChild(para);
            var thisScaleElement = document.getElementById(key);
            scaleClick(thisScaleElement, key);
        }
    }
    
    function scaleClick(thisScaleElement, key) {
        thisScaleElement.addEventListener("click", function(){
            var element = document.getElementById("activeScale");
            uSettings.scale = key;
            filterChords();
            element.innerHTML = scaleTypes[key].name;
            console.log("uScale: " + uSettings.scale);
        });
    }
    
    function filterChords() {
    }
    
    function populateDataScales() {
        // Defines scales input is key, name, also known as, tags(array), notes(array)
        populateDataScale("harmonicMinor", "Harmonic Minor", "", [], [0,2,3,5,7,8,11]);
        populateDataScale("major", "Major", "Ionian Scale", [], [0,2,4,5,7,9,11]);
        populateDataScale("melodicMinorAscending", "Melodic Minor (Ascending)", "", [], [0,2,3,5,7,9,11]);
        populateDataScale("melodicMinorDescending", "Melodic Minor (Descending)", "", [], [0,2,3,5,7,8,10]);
        populateDataScale("wholeTone", "Whole Tone", "", [], [0,2,4,6,8,10]);
        populateDataScale("pentatonicMajor", "Pentatonic Major", "", [], [0,2,4,7,9]);
        populateDataScale("pentatonicMinor", "Pentatonic Minor", "", [], [0,3,5,7,10]);
        populateDataScale("pentatonicBlues", "Pentatonic Blues", "", [], [0,3,5,6,7,10]);
        populateDataScale("pentatonicNeutral", "Pentatonic Neutral", "", [], [0,2,5,7,10]);
        populateDataScale("dorian", "Dorian", "", [], [0,2,3,5,7,9,10]);
        populateDataScale("phrygian", "Phrygian", "", [], [0,2,3,5,7,8,10]);
        populateDataScale("lydian", "Lydian", "", [], [0,2,4,6,7,9,11]);
        populateDataScale("mixolydian", "Mixolydian", "", [], [0,2,4,5,7,9,10]);
        populateDataScale("aeolian", "Aeolian", "", [], [0,2,3,5,7,8,10]);
        populateDataScale("locrian", "Locrian", "", [], [0,2,3,5,6,8,10]);
        populateDataScale("arabianA", "Arabian (a)", "", ["Exotic"], [0,2,3,5,6,8,9,11]);
        populateDataScale("arabianB", "Arabian (b)", "", ["Exotic"], [0,2,4,5,6,8,10]);
        populateDataScale("augmented", "Augmented", "", ["Exotic"], [0,3,4,6,8,11]);
        populateDataScale("auxiliaryDiminishedBlues", "Auxiliary Diminished Blues", "", ["Exotic"], [0,2,3,4,6,7,9,10]);
        populateDataScale("blues", "Blues", "", ["Exotic"], [0,3,5,6,7,10]);
        populateDataScale("chinese", "Chinese", "", ["Exotic"], [0,4,6,7,11]);
        populateDataScale("chineseMongolian", "Chinese Mongolian", "", ["Exotic"], [0,2,4,7,9]);
        populateDataScale("diatonic", "Diatonic", "", ["Exotic"], [0,2,4,7,9]);
        populateDataScale("diminished", "Diminished", "", ["Exotic"], [0,2,3,5,6,8,9,11]);
        populateDataScale("doubleHarmonic", "Double Harmonic", "", ["Exotic"], [0,2,4,5,7,8,11]);
        populateDataScale("egyptian", "Egyptian", "", ["Exotic"], [0,2,5,7,10]);
        populateDataScale("eightToneSpanish", "Eight Tone Spanish", "", ["Exotic"], [0,2,3,4,5,6,8,10]);
        populateDataScale("ethiopian", "Ethiopian (Geez & Ezel)", "", ["Exotic"], [0,2,3,5,7,8,10]);
        populateDataScale("hawaiian", "Hawaiian", "", ["Exotic"], [0,2,3,5,7,9,11]);
        populateDataScale("hindu", "Hindu", "", ["Exotic"], [0,2,4,5,7,8,10]);
        populateDataScale("hungarianGypsy", "Hungarian Gypsy", "", ["Exotic"], [0,2,3,6,7,8,11]);
        populateDataScale("japaneseA", "Japanese (A)", "", ["Exotic"], [0,2,5,7,8]);
        populateDataScale("japaneseB", "Japanese (B)", "", ["Exotic"], [0,2,5,7,8]);
        populateDataScale("jewishAdonaiMalakh", "Jewish (Adonai Malakh)", "", ["Exotic"], [0,2,2,3,5,7,9,10]);
        populateDataScale("neopolitan", "Neopolitan", "", ["Exotic"], [0,2,3,5,7,8,11]);
        populateDataScale("neopolitanMinor", "Neopolitan Minor", "", ["Exotic"], [0,2,3,5,7,8,10]);
        populateDataScale("orientalA", "Oriental (A)", "", ["Exotic"], [0,2,4,5,6,8,10]);
        populateDataScale("orientalB", "Oriental (B)", "", ["Exotic"], [0,2,4,5,6,9,10]);
        populateDataScale("persian", "Persian", "", ["Exotic"], [0,2,4,5,6,8,11]);
        populateDataScale("pureMinor", "Pure Minor", "", ["Exotic"], [0,2,3,5,7,8,10]);
    }
    
    function populateDataScale(key, name, akaName, tag, definition) {
        scaleTypes[key] = {};
        scaleTypes[key].name = name;
        scaleTypes[key].akaName = akaName;
        scaleTypes[key].tag = tag;
        scaleTypes[key].definition = definition;
    }

    function populateDataChords() {
        // populateDataChords("", "", "", [], []);
        populateDataChord("major", "Major", "", [], [0,4,7]);
        populateDataChord("minor", "Minor", "", [], [0,3,7]);
        populateDataChord("augmented", "Augmented", "", [], [0,4,8]);
        populateDataChord("diminished", "Diminished", "", [], [0,3,6]);
        populateDataChord("power", "Power", "", [], [0,7]);
    }
    
    function populateDataChord(key, name, akaName, tag, definition) {
        chordsTypes[key] = {};
        chordsTypes[key].name = name;
        chordsTypes[key].akaName = akaName;
        chordsTypes[key].tag = [];
        chordsTypes[key].definition = definition;
    }
    
}