//Global 
let width = 350
    height=0,
    streaming=false

//DOM elements
const video = document.getElementById('video')
const enableButton  = document.getElementById('enable-button')
const disableButton = document.getElementById('disable-button')

function capturingNow(){
    //Get media stream
    navigator.mediaDevices.getUserMedia({video:true, audio:false}
    )
        .then(function(stream){
            //link to video source
            video.srcObject = stream
            //play video
            video.play()
        })
        .catch(function(err) {
            console.log(`Error: ${err}`)
    })

    //play when ready
    video.addEventListener('canplay', function(e){
        if(!streaming){
            height = video.videoHeight / (video.videoWidth / width);

            video.setAttribute('width',width)
            video.setAttribute('height',height)
            canvas.setAttribute('width',width)
            canvas.setAttribute('height',height)

            streaming = true
        }
    }, false)
}

//Enable button
enableButton.addEventListener('click', function(e){
    capturingNow();

    e.preventDefault()
},false)

//Disable button
disableButton.addEventListener('click', function(e){
    const video = document.querySelector('video');

    const mediaStream = video.srcObject;

    const tracks = mediaStream.getTracks();
    
    tracks[0].stop();    
},false)


