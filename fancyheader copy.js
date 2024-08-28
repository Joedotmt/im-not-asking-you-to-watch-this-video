/*document.addEventListener("touchstart", touchHandler, true);
document.addEventListener("touchmove", touchHandler, true);
document.addEventListener("touchend", touchHandler, true);
document.addEventListener("touchcancel", touchHandler, true);
*/
const eye1 = document.getElementById("eye1");
const eye2 = document.getElementById("eye2");
const logo = document.getElementById("logo_img");
const blob = document.getElementById("blob");
let mouseX;
let mouseY;

function init()
{
    let bbox = logo.getBoundingClientRect();
    mouseX = bbox.right;
    mouseY = bbox.bottom;


    // Update the mouse position on mouse move
    document.addEventListener("mousemove", function (event)
    {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    document.addEventListener("touchmove", function (event)
    {
        mouseX = event.changedTouches[0].clientX;
        mouseY = event.changedTouches[0].clientY;
    });
    document.addEventListener("touchstart", function (event)
    {
        mouseX = event.changedTouches[0].clientX;
        mouseY = event.changedTouches[0].clientY;
    });
}
init();

eye1dx = 0;
eye1dy = 0;
eye2dy = 0;
eye2dx = 0;
function animate()
{
    blob.animate({
        left: `${mouseX}px`,
        top: `${mouseY}px`
    }, { duration: 3000, fill: "forwards" });


    let bbox = logo.getBoundingClientRect();

    // Estimate eye sizes
    let eye_width = bbox.width / 50;
    let eye_height = bbox.height / 20;

    // Original eye positions
    const eye1OriginX = lerp(bbox.left, bbox.right, 0.773);
    const eye1OriginY = lerp(bbox.top, bbox.bottom, 0.75);
    const eye2OriginX = lerp(bbox.left, bbox.right, 0.85);
    const eye2OriginY = lerp(bbox.top, bbox.bottom, 0.75);

    // Calculate direction vector for eye1
    eye1dx = lerp(eye1dx, mouseX - eye1OriginX, 0.1);
    eye1dy = lerp(eye1dy, mouseY - eye1OriginY, 0.1);

    // Calculate direction vector for eye2
    eye2dx = lerp(eye2dx, mouseX - eye2OriginX, 0.1);
    eye2dy = lerp(eye2dy, mouseY - eye2OriginY, 0.1);

    // Limit eye movement to within 50px
    const maxDistance = eye_width * 0.7;
    let eye1Target = extendPoint(eye1OriginX, eye1OriginY, eye1dx, eye1dy, Math.min(maxDistance, Math.sqrt(eye1dx * eye1dx + eye1dy * eye1dy)));
    let eye2Target = extendPoint(eye2OriginX, eye2OriginY, eye2dx, eye2dy, Math.min(maxDistance, Math.sqrt(eye2dx * eye2dx + eye2dy * eye2dy)));


    eye1.style.left = `${eye1Target.newX - eye_width / 2}px`;
    eye1.style.top = `${eye1Target.newY - eye_height / 2}px`;

    eye2.style.left = `${eye2Target.newX - eye_width / 2}px`;
    eye2.style.top = `${eye2Target.newY - eye_height / 2}px`;


    // Set eye sizes
    eye1.style.width = eye_width + "px";
    eye1.style.height = eye_height + "px";
    eye2.style.width = eye_width + "px";
    eye2.style.height = eye_height + "px";

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);




// Helper math functions
function lerp(a, b, amount)
{
    return a + amount * (b - a);
}

function extendPoint(x, y, dx, dy, distance)
{
    // Normalize the direction vector (dx, dy) to unit length
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitDx = dx / length;
    const unitDy = dy / length;

    // Scale the unit direction vector by the distance
    const newX = x + unitDx * distance;
    const newY = y + unitDy * distance;

    return { newX, newY };
}


function gotowebsite()
{
    console.log("e");
    window.location.href = ('https://joe.mt');
}