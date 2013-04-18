/**
 * Created with IntelliJ IDEA.
 * User: Immortal
 * Date: 14.04.13
 * Time: 23:52
 * To change this template use File | Settings | File Templates.
 */
function ghost(isDeactivated) {
    popup.style.color = isDeactivated ? 'graytext' : 'black';
    // The label color.
    popup.frequency.disabled = isDeactivated; // The control manipulability.
}

function getValue() {
    var string = document.querySelector('input').value;
    return string;
}

window.addEventListener('load', function () {
    var str = getValue();
    localStorage.myVal = str;

    // Initialize the option controls.
    popup.isActivated.checked = JSON.parse(localStorage.isActivated);
    // The display activation.
    popup.frequency.value = localStorage.frequency;
    // The display frequency, in minutes.

    if (!popup.isActivated.checked) {
        ghost(true);
    }

    // Set the display activation and frequency.
    popup.isActivated.onchange = function () {
        localStorage.isActivated = popup.isActivated.checked;
        ghost(!popup.isActivated.checked);
    };

    popup.frequency.onchange = function () {
        localStorage.frequency = popup.frequency.value;
    };
});


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', getValue);
});