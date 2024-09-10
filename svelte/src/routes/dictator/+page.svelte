<script>
    import { onMount, afterUpdate } from "svelte";

    let box;
    let boxX = 0;
    let boxY = 0;
    let isDragging = false;
    let offset = { x: 0, y: 0 };
    let boxBounds = {};

    $: boxStyle = `left:${boxX}px; top:${boxY}px;`;

    function handleMouseDown(event) {
        isDragging = true;
        const rect = box.getBoundingClientRect();
        offset = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }

    function handleMouseMove(event) {
        if (!isDragging) return;
        boxX = event.clientX - offset.x;
        boxY = event.clientY - offset.y;
    }

    function handleMouseUp() {
        isDragging = false;
    }

    function updateBoxBounds() {
        if (box) {
            const rect = box.getBoundingClientRect();
            boxBounds = {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height,
                right: rect.right,
                bottom: rect.bottom,
            };
        }
    }

    onMount(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    });

    afterUpdate(updateBoxBounds);
</script>

<div id="box" bind:this={box} style={boxStyle} on:mousedown={handleMouseDown}>
    Drag me
</div>

{#each Array(8) as _, i}
    <div
        class="circle"
        style={`left:${i % 3 === 0 ? boxBounds.x : i % 3 === 1 ? boxBounds.x + boxBounds.width / 2 : boxBounds.right}px; 
           top:${Math.floor(i / 3) === 0 ? boxBounds.y : Math.floor(i / 3) === 1 ? boxBounds.y + boxBounds.height / 2 : boxBounds.bottom}px;`}
    ></div>
{/each}

<style>
    :global(body) {
        font-family: "Poppins", sans-serif;
        background: #ffffff;
        margin: 0;
        padding: 0;
    }

    #box {
        user-select: none;
        display: flex;
        background-color: #ffffff;
        width: 100px;
        height: 100px;
        justify-content: center;
        align-items: center;
        position: fixed;
        border-radius: 0.4em;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
        transition: box-shadow 0.3s ease;
        cursor: move;
    }

    #box:active {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45);
    }

    .circle {
        position: fixed;
        width: 10px;
        height: 10px;
        background-color: #000000;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }
</style>
