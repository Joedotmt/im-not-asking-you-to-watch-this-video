eye1 = document.getElementById("eye1");
eye2 = document.getElementById("eye2");
logo = document.getElementById("logo_img");

let mouseX = 0;
let mouseY = 0;

// Update the mouse position on mouse move
document.addEventListener("mousemove", function (event)
{
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animate()
{
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
    let eye1dx = mouseX - eye1OriginX;
    let eye1dy = mouseY - eye1OriginY;

    // Calculate direction vector for eye2
    let eye2dx = mouseX - eye2OriginX;
    let eye2dy = mouseY - eye2OriginY;

    // Limit eye movement to within 50px
    const maxDistance = 6;
    let eye1Target = extendPoint(eye1OriginX, eye1OriginY, eye1dx, eye1dy, Math.min(maxDistance, Math.sqrt(eye1dx * eye1dx + eye1dy * eye1dy)));
    let eye2Target = extendPoint(eye2OriginX, eye2OriginY, eye2dx, eye2dy, Math.min(maxDistance, Math.sqrt(eye2dx * eye2dx + eye2dy * eye2dy)));

    eye1.style.left = `${lerp(parseFloat(eye1.style.left) || 0, eye1Target.newX - eye_width / 2, 0.1)}px`;
    eye1.style.top = `${lerp(parseFloat(eye1.style.top) || 0, eye1Target.newY - eye_height / 2, 0.1)}px`;

    eye2.style.left = `${lerp(parseFloat(eye2.style.left) || 0, eye2Target.newX - eye_width / 2, 0.1)}px`;
    eye2.style.top = `${lerp(parseFloat(eye2.style.top) || 0, eye2Target.newY - eye_height / 2, 0.1)}px`;


    // Set eye sizes
    eye1.style.width = eye_width + "px";
    eye1.style.height = eye_height + "px";
    eye2.style.width = eye_width + "px";
    eye2.style.height = eye_height + "px";

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);


const blob = document.getElementById("blob");

window.onpointermove = event =>
{
    const { clientX, clientY } = event;

    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" });
};

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