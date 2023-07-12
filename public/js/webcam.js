const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const snapSoundElement = document.getElementById("snapSound");
const webcam = new Webcam(
  webcamElement,
  "user",
  canvasElement,
  snapSoundElement
);
webcam.flip();
webcam
  .start()
  .then((result) => {
    console.log("webcam started");
  })
  .catch((err) => {
    console.log(err);
  });

document.querySelector("#download-photo").href = picture;

function saveasimg() {
  canvasElement.toBlob((blob) => {
    let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
    // document.getElementById("foto").setAttribute(file)

    var reader = new FileReader();
    // it's onload event and you forgot (parameters)
    reader.onload = function (e) {
      var image = document.createElement("img");
      var divimg = document.getElementById("cam");
      // the result image data
      image.src = e.target.result;
      divimg.appendChild(image);
    };
    // you have to declare the file loading
    reader.readAsDataURL(file);

    console.log(file);
  }, "image/jpeg");
}
