<script>
    import { onMount } from "svelte";

    import joeMTlogo from "$lib/joemtlogo.webp";
    import logoNoEyes from "$lib/logo no eyes.png";
    import logoEyes from "$lib/logo.png";
    import eye1img from "$lib/Eye 1.png";
    import eye2img from "$lib/Eye 2.png";
    import preview from "$lib/preview.png";

    let eye1;
    let eye2;
    let logo;
    let blob;

    let mouseX, mouseY;

    let mouseHasMoved = false;

    let dx1 = 4;
    let dy1 = -1;
    let dx2 = -6;
    let dy2 = -3;

    let blobX = 50; // Starting at center (50%).
    let blobY = 50; // Starting at center (50%).
    let lerpFactor = 0;

    onMount(() => {
        eye1 = document.getElementById("eye1");
        eye2 = document.getElementById("eye2");
        logo = document.getElementById("logo_img");
        blob = document.getElementById("blob");
        init();
    });

    function init() {
        eye1.style.display = "block";
        eye2.style.display = "block";

        logo.src = logoNoEyes;

        const bbox = document.body.getBoundingClientRect();
        mouseX = bbox.width / 2;
        mouseY = bbox.height / 2;

        requestAnimationFrame(animate);
    }

    function updateMousePosition(event) {
        mouseHasMoved = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function updateTouchPosition(event) {
        mouseHasMoved = true;
        mouseX = event.changedTouches[0].clientX;
        mouseY = event.changedTouches[0].clientY;
    }

    function updateBlobPosition() {
        const targetX = (mouseX / window.innerWidth) * 100;
        const targetY = (mouseY / window.innerHeight) * 100;

        blobX = lerp(blobX, targetX, lerpFactor);
        blobY = lerp(blobY, targetY, lerpFactor);

        blob.style.left = `${blobX}%`;
        blob.style.top = `${blobY}%`;
    }

    function animate() {
        if (mouseHasMoved) {
            lerpFactor = lerp(lerpFactor, 0.1, 0.01);
        }

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
        const eye1Target = extendPoint(
            eye1OriginX,
            eye1OriginY,
            eye1dx,
            eye1dy,
            Math.min(maxDistance, Math.hypot(eye1dx, eye1dy)),
        );
        const eye2Target = extendPoint(
            eye2OriginX,
            eye2OriginY,
            eye2dx,
            eye2dy,
            Math.min(maxDistance, Math.hypot(eye2dx, eye2dy)),
        );

        if (mouseHasMoved) {
            dx1 = lerp(dx1, eye1Target.newX - eye1OriginX, lerpFactor);
            dy1 = lerp(dy1, eye1Target.newY - eye1OriginY, lerpFactor);
            dx2 = lerp(dx2, eye2Target.newX - eye2OriginX, lerpFactor);
            dy2 = lerp(dy2, eye2Target.newY - eye2OriginY, lerpFactor);
        }

        eye1.style.left = `${eye1OriginX - eye_width / 2 + dx1}px`;
        eye1.style.top = `${eye1OriginY - eye_height / 2 + dy1}px`;
        eye2.style.left = `${eye2OriginX - eye_width / 2 + dx2}px`;
        eye2.style.top = `${eye2OriginY - eye_height / 2 + dy2}px`;

        // Set eye sizes
        eye1.style.width = `${eye_width}px`;
        eye1.style.height = `${eye_height}px`;
        eye2.style.width = `${eye_width}px`;
        eye2.style.height = `${eye_height}px`;

        // Update blob position within the animation loop
        updateBlobPosition();

        requestAnimationFrame(animate);
    }

    // Helper math functions
    function lerp(a, b, amount) {
        return a + amount * (b - a);
    }

    function extendPoint(x, y, dx, dy, distance) {
        const length = Math.hypot(dx, dy);
        const unitDx = dx / length;
        const unitDy = dy / length;
        return {
            newX: x + unitDx * distance,
            newY: y + unitDy * distance,
        };
    }
</script>

<svelte:window
    on:mousemove={updateMousePosition}
    on:touchmove={updateTouchPosition}
    on:touchstart={updateTouchPosition}
/>

<svelte:head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
        name="description"
        content="Force your friends to watch videos by tracking their every move on the watch page."
    />
    <title>INAYTWTV</title>
</svelte:head>

<div class="header1">
    <button
        aria-label="Create a video link"
        style="width: fit-content;"
        class="button-29"
        role="button"
    ></button>
</div>
<a aria-label="Go back to home page" href="https://joe.mt/">
    <img alt="joe.mt logo" class="joemtlogo" src={joeMTlogo} />
</a>
<div class="logo-div">
    <img
        alt="main logo of website"
        id="logo_img"
        class="logo-img"
        src={logoEyes}
    />
    <img alt="" id="eye1" class="logo-eye" src={eye1img} />
    <img alt="" id="eye2" class="logo-eye" src={eye2img} />
</div>
<div id="blob"></div>
<div id="blur"></div>
<h1
    style="align-self: center; text-align: center; width: 80vw; font-size: min(5vw,2em);"
>
    Forcing people to watch videos since 2024
</h1>
<noscript>
    <div>Please enable Javascript to create a link</div>
</noscript>
<button
    aria-label="Create a video link"
    style="width: fit-content;"
    class="button-29">Create a video link</button
>
<section>
    <h1 style="margin: 0em 0em;">What Is This?</h1>
    <p style="font-size: 1.5em; text-align: justify; max-width: 36em;">
        This tool allows you to share any videos you want with others while
        providing detailed tracking features. You can monitor how much of the
        video has been watched, whether it's muted, if the viewer is actively on
        the page, and much more.
    </p>
    <div class="sec2">
        <p
            style="max-width: 19em; font-size: 1.5em; margin-right: 0.5em; text-align: justify;"
        >
            Then using this information you can send them abusive messages that
            forces them to watch it.
        </p>
        <img
            src={preview}
            alt="Image of screenshot of discord of people saying: Haha that video was funny. YOU FUCKING LIAR YOU DIDNT WATCH TO THE END. you better fucking watch it. NOW!"
        />
    </div>
</section>
<footer>
    <div>Made by <span>Joe</span> for psychos</div>
    <div>
        <div>Sitemap:</div>
        <a href="index.html">Home</a>
        <a href="dictator.html">Dictator</a>
        <a href="slave.html">Slave</a>
    </div>
</footer>

<style>
    @import "src/style.css";
    @import "src/index.css";
</style>
