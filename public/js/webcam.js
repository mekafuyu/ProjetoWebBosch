const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const snapSoundElement = document.getElementById("snapSound");

const webcam = new Webcam(
  webcamElement,
  "user",
  canvasElement,
  snapSoundElement
);

webcam
  .start()
  .then((result) => {
    console.log("webcam started");
  })
  .catch((err) => {
    console.log(err);
  });


$(' .print ').on( 'click', (event) => {

  webcam.snap();

  canvasElement.toBlob((blob) => {

    let file = new File([blob], Date.now()+".jpg", { type: "image/jpeg" });
    var reader = new FileReader();

    reader.onload = function (e) {
      var elemento = $(event.target).parent();
      var image;
      
      if (!elemento.has(' #boxbtn ').length){
        var div = document.createElement("button");
        div.id = 'boxbtn'
        div.classList.add('border-0','strongbg')

        var closebtn = document.createElement("button");
        closebtn.value = '&times;'
        closebtn.type = 'button'
        closebtn.id = 'rmvimg'
        closebtn.classList.add('btn-close')
        closebtn.onclick = () => {
          closebtn.parentElement.remove()
          // closebtn.parentElement.getElementsByTagName('IMG')[0].remove()
          // closebtn.remove()
        }

        image = document.createElement("img");
        image.setAttribute('ID', 'print')
        image.src = e.target.result;
        image.width = "100";

        div.append(image);
        div.append(closebtn);

        elemento.append(div);
        return;
      }
      
      elemento.children(' #boxbtn ').children(' #print ').attr('src', e.target.result);
      return;
    };
    
    reader.readAsDataURL(file);
    // console.log(file);
  }, "image/jpeg");

})

$(' #escondecam ').on('click', (e) => {
  var telawebcam = $(' #webcam ')
  if (telawebcam.hasClass('d-none'))
    telawebcam.removeClass('d-none')
  else telawebcam.addClass('d-none')
})

$(' #invertecam ').on('click', (e) => {
  webcam.flip();
  return;
})