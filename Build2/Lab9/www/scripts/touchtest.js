function is_touch_device()
{
    return 'ontouchstart' in window;
}
function onTouchStart(e)
{
    e.preventDefault();
    var touches = e.touches[0];    
}
function onTouchMove(e)
{
    e.preventDefault();
    var changedTouches = e.changedTouches[0];
}
function onTouchEnd(e)
{
    e.preventDefault();
    var changedTouches = e.changedTouches[0];
}