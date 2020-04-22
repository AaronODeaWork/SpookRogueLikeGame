function is_touch_device()
{
    return 'ontouchstart' in window;
}
function onTouchStart(e)
{
    e.preventDefault();
    var touches = e.touches[0];    
    console.log(touches.clientX);   
    console.log(touches.clientY); 
    console.log(' ');              
             
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