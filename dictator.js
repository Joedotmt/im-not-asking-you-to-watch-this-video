function transition()
{
    document.startViewTransition(() =>
    {
        smol.style.display = 'none';
        big.style.display = 'flex';
    });
}

function back()
{
    document.startViewTransition(() =>
    {
        smol.style.display = 'flex';
        big.style.display = 'none';
    });
}