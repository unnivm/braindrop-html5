function BufferLoader(context, urlList, callback, audioLoadedCallBack) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.onaudioLoad = audioLoadedCallBack;
  this.bufferList = [];//new Array();
  this.loadCount = 0;
  
  ///// typed array
  this.binaryBuffer = new ArrayBuffer(1024);
  this.index = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);

  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {

        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }

        loader.bufferList[loader.loadCount] = buffer;
  		//loader.binaryBuffer[loader.index] = buffer;

	//// callback for every audio loaded
	loader.onaudioLoad(loader.urlList, loader.binaryBuffer);

	//// if all complete, then call the onload
        //if (++loader.loadCount == loader.urlList.length) loader.onload(loader.bufferList);
        if (++loader.loadCount == loader.urlList.length) loader.onload(loader.bufferList);
        loader.index+=1;
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

BufferLoader.prototype.getBufferList = function() {
	return this.binaryBuffer;
}
