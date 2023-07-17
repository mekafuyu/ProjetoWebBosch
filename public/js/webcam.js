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

  webcam.snap();

  canvasElement.toBlob((blob) => {

    let file = new File([blob], Date.now()+".jpg", { type: "image/jpeg" });
    var reader = new FileReader();

    reader.onload = function (e) {
      var elemento = $(event.target).parent();
      var image;
      
      if (!elemento.has(' #print ').length){

        var closebtn = document.createElement("button");
        closebtn.value = '&times;'
        closebtn.type = 'button'
        closebtn.id = 'rmvimg'
        closebtn.classList.add('btn-close')
        closebtn.onclick = () => {
          closebtn.parentElement.getElementsByTagName('IMG')[0].remove()
          closebtn.remove()
        }

        image = document.createElement("img");
        image.setAttribute('ID', 'print')
        image.src = e.target.result;
        image.width = "100";

        elemento.append(closebtn);
        elemento.append(image);
        return;
      }
      
      elemento.children(' #print ').attr('src', e.target.result);
      return;
    };
    
    reader.readAsDataURL(file);
    // console.log(file);
  }, "image/jpeg");

})