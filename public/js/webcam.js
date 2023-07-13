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





// function saveasimg() {
//   canvasElement.toBlob((blob) => {
//     let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
    
//     var reader = new FileReader();
    
//     reader.onload = function (e) {
//       var image = document.createElement("img");
      
//       var divimg = document.getElementById("cam");
      
//       image.src = e.target.result;
//       divimg.appendChild(image);
//     };
//     // you have to declare the file loading
//     reader.readAsDataURL(file);
    
//     console.log(file);
//   }, "image/jpeg");
// }
// function saveasimg() {

//   canvasElement.toBlob((blob) => {
//     let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
//     var reader = new FileReader();
    
//     reader.onload = function (e) {
//       var image = document.createElement("img");
      
//       var divimg = document.getElementById("cam");
      
//       image.src = e.target.result;
//       divimg.appendChild(image);
//     };
//     // you have to declare the file loading
//     reader.readAsDataURL(file);
    
//     console.log(file);
//   }, "image/jpeg");
// }


$(' .print ').on( 'click', (event) => {
  // console.log($(e.target).parent().parent().append())
  webcam.snap();
  canvasElement.toBlob((blob) => {
    let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
    var reader = new FileReader();
    
    reader.onload = function (e) {
      var image = document.createElement("img");
      
      // var divimg = document.getElementById("cam");
      
      image.src = e.target.result;

      console.log(event.target);
      $(event.target).parent().parent().append(image);
    };
    // you have to declare the file loading
    reader.readAsDataURL(file);
    
    console.log(file);
  }, "image/jpeg");

})