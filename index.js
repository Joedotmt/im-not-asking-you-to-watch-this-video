// DOM elements
const eye1 = document.getElementById("eye1");
const eye2 = document.getElementById("eye2");
const logo = document.getElementById("logo_img");
const blob = document.getElementById("blob");

eye1.style.display = eye2.style.display = "block";

let mouseX, mouseY;

function init()
{
    const bbox = logo.getBoundingClientRect();
    mouseX = bbox.right;
    mouseY = bbox.bottom;

    // Update the mouse position on mouse move
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("touchmove", updateTouchPosition);
    document.addEventListener("touchstart", updateTouchPosition);
}

function updateMousePosition(event)
{
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function updateTouchPosition(event)
{
    mouseX = event.changedTouches[0].clientX;
    mouseY = event.changedTouches[0].clientY;
}

init();

let dx1 = dy1 = dx2 = dy2 = 0;

function animate()
{
    blob.animate({
        left: `${mouseX}px`,
        top: `${mouseY}px`
    }, { duration: 3000, fill: "forwards" });

    const bbox = logo.getBoundingClientRect();

    // Estimate eye sizes
    const eye_width = bbox.width / 50;
    const eye_height = bbox.height / 20;

    // Original eye positions
    const eye1OriginX = lerp(bbox.left, bbox.right, 0.773);
    const eye1OriginY = lerp(bbox.top, bbox.bottom, 0.75);
    const eye2OriginX = lerp(bbox.left, bbox.right, 0.85);
    const eye2OriginY = lerp(bbox.top, bbox.bottom, 0.75);

    // Calculate direction vectors
    const eye1dx = mouseX - eye1OriginX;
    const eye1dy = mouseY - eye1OriginY;
    const eye2dx = mouseX - eye2OriginX;
    const eye2dy = mouseY - eye2OriginY;

    // Limit eye movement
    const maxDistance = eye_width * 0.7;
    const eye1Target = extendPoint(eye1OriginX, eye1OriginY, eye1dx, eye1dy, Math.min(maxDistance, Math.hypot(eye1dx, eye1dy)));
    const eye2Target = extendPoint(eye2OriginX, eye2OriginY, eye2dx, eye2dy, Math.min(maxDistance, Math.hypot(eye2dx, eye2dy)));

    dx1 = lerp(dx1, eye1Target.newX - eye1OriginX, 0.1);
    dy1 = lerp(dy1, eye1Target.newY - eye1OriginY, 0.1);
    dx2 = lerp(dx2, eye2Target.newX - eye2OriginX, 0.1);
    dy2 = lerp(dy2, eye2Target.newY - eye2OriginY, 0.1);

    eye1.style.left = `${(eye1OriginX - eye_width / 2) + dx1}px`;
    eye1.style.top = `${(eye1OriginY - eye_height / 2) + dy1}px`;
    eye2.style.left = `${(eye2OriginX - eye_width / 2) + dx2}px`;
    eye2.style.top = `${(eye2OriginY - eye_height / 2) + dy2}px`;

    // Set eye sizes
    eye1.style.width = `${eye_width}px`;
    eye1.style.height = `${eye_height}px`;
    eye2.style.width = `${eye_width}px`;
    eye2.style.height = `${eye_height}px`;

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
    const length = Math.hypot(dx, dy);
    const unitDx = dx / length;
    const unitDy = dy / length;
    return {
        newX: x + unitDx * distance,
        newY: y + unitDy * distance
    };
}