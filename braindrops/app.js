
window.addEventListener('load', eventWindowLoaded, false);
var canvas = document.querySelector('canvas');

function eventWindowLoaded() {
  alert("...abc");
document.getElementById('myCanvas').style.cursor = "none";
  canvas.requestPointerLock();
}


// pointer lock object forking for cross browser

canvas.requestPointerLock = canvas.requestPointerLock ||
           canvas.mozRequestPointerLock ||
           canvas.webkitRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
         document.mozExitPointerLock ||
         document.webkitExitPointerLock;
//document.exitPointerLock();



canvas.onclick = function() {
  canvas.requestPointerLock();
}

// pointer lock event listeners

// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
  if(document.pointerLockElement === canvas ||
  document.mozPointerLockElement === canvas ||
  document.webkitPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", handleMouseMove1, false);
  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("mousemove", handleMouseMove, false);
  }
}

