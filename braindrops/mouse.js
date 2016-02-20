document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);

function changeCallback(e) {

document.requestPointerLock = document.requestPointerLock ||
			     document.mozRequestPointerLock ||
			     document.webkitRequestPointerLock;
alert("ffff");
//document.requestPointerLock();

}

document.requestPointerLock = document.requestPointerLock ||
			     document.mozRequestPointerLock ||
			     document.webkitRequestPointerLock;

