// JavaScript to handle mouseover and mouseout events
var activeMethodPill = null;
var activeScenePill = null;
var activeModePill = null;
var activeVidID = 0;
var select = false;


$(document).ready(function () {
    var editor = CodeMirror.fromTextArea(document.getElementById("bibtex"), {
        lineNumbers: false,
        lineWrapping: true,
        readOnly: true
    });
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    activeMethodPill = $('.method-pill').filter('.active')[0];
    activeModePill = $('.mode-pill').filter('.active')[0];
    activeScenePill = $('.scene-pill').filter('.active')[0];

    resizeAndPlay($('#sparsity')[0]);
});

// function selectCompVideo(methodPill, scenePill, n_views, modePill) {
//     // Your existing logic for video selection
//     // var video = document.getElementById("compVideo");
//     select = true;
//     var videoSwitch = document.getElementById("compVideoSwitch");
//     var viewNum = document.getElementById("compVideoValue");

//     if (activeMethodPill) {
//         activeMethodPill.classList.remove("active");
//     }
//     if (activeScenePill) {
//         activeScenePill.classList.remove("active");
//     }
//     if (modePill) {
//         activeModePill.classList.remove("active");
//         modePill.classList.add("active");
//         activeModePill = modePill;
//     }
//     activeMethodPill = methodPill;
//     activeScenePill = scenePill;
//     methodPill.classList.add("active");
//     scenePill.classList.add("active");
//     method = methodPill.getAttribute("data-value");
//     pill = scenePill.getAttribute("data-value");
//     mode = activeModePill.getAttribute("data-value");

//     // if (videoSwitch.checked) {
//     //     mode = 'depth'
//     // } else {
//     //     mode = 'rgb'
//     // }

//     // swap video to avoid flickering
//     activeVidID = 1 - activeVidID;
//     var video_active = document.getElementById("compVideo" + activeVidID);
//     var video_hidden = document.getElementById("compVideo" + (1 - activeVidID));
//     video_active.src = "materials/" + method + "/" + pill + "_" + mode + ".mp4";
//     video_active.load();

//     if (n_views) {
//         viewNum.innerHTML = n_views;
//     }
// }

function selectMethod(methodPill) {
    // Deselect all method pills
    document.querySelectorAll('.method-pill').forEach(pill => {
        pill.classList.remove('active');
    });

    // Activate the clicked method pill
    methodPill.classList.add('active');

    // Hide all scene groups
    document.querySelectorAll('.scene-group').forEach(group => {
        group.style.display = 'none';
    });

    // Show the scene group corresponding to the selected method
    const methodValue = methodPill.getAttribute('data-value');
    document.getElementById('scenes-' + methodValue).style.display = 'block';

    // Update activeMethodPill and activeScenePill
    activeMethodPill = methodPill;
    const firstScenePill = document.querySelector('#scenes-' + methodValue + ' .scene-pill');

    if (firstScenePill) {
        firstScenePill.click(); // Trigger the click to select the first scene automatically
    }
    

}


function selectCompVideo(scenePill, methodPill, n_views, modePill = null) {
    // Set the flag to indicate a selection has been made
    select = true;

    // Get the view count element
    var viewNum = document.getElementById("compVideoValue");

    if (activeMethodPill) {
        activeMethodPill.classList.remove("active");
    }

    // Remove active classes from previous selections
    if (activeScenePill) {
        activeScenePill.classList.remove("active");
    }
    if (modePill) {
        activeModePill.classList.remove("active");
        modePill.classList.add("active");
        activeModePill = modePill;
    }

    // Set the new active scene pill
    activeScenePill = scenePill;
    scenePill.classList.add("active");

    activeMethodPill = methodPill;
    methodPill.classList.add("active");
    // Get the data values from the active scene and method
    var scene = scenePill.getAttribute("data-value");
    var mode = activeModePill ? activeModePill.getAttribute("data-value") : 'rgb';  // default to 'rgb' if mode is not defined
    var method = methodPill.getAttribute("data-value");

    // Swap the video to avoid flickering
    activeVidID = 1 - activeVidID;
    var video_active = document.getElementById("compVideo" + activeVidID);
    var video_hidden = document.getElementById("compVideo" + (1 - activeVidID));

    // Update the source of the active video element based on selected method, scene, and mode
    // video_active.src = "videos/comparison/" + scene + "_" + method + "_vs_ours_" + mode + ".mp4";
    video_active.src = "materials/" + method + "/" + scene + "_" + mode + ".mp4";
    video_active.load();

    // Update the visibility of videos: show the active one, hide the other
    video_active.hidden = false;
    video_hidden.hidden = true;

    // If number of views is provided, update the view count display
    if (n_views) {
        viewNum.innerHTML = n_views;
    }
}

