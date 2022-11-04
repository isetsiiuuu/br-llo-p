
const galleri = document.querySelector(".GalleryBtn"); 
const kamera =  document.querySelector("#camera"); 
const taBild =    document.querySelector("#take-picture");  
const canvas =  document.querySelector("#picture"); 
const nyBild =  document.querySelector("#newPic"); 
const ctx = canvas.getContext("2d");
let notificationPermission = "";
let images; 
let stream;
let switchimage = true;
 
if (localStorage.getItem("tagnaBilder") !== null){
    images = JSON.parse(localStorage.getItem("tagnaBilder"));
}
else {
    images = [];
}

async function startKamera() {
    if ("mediaDevices" in navigator)  {
        stream = await navigator.mediaDevices.getUserMedia({video: true , audio: false});
        console.log(stream);
        kamera.srcObject = stream;
    }
}
//starta Kameran.
startKamera();



taBild.addEventListener("click", () =>{
    if (switchimage){
     ctx.drawImage(kamera,0,0,canvas.width,canvas.height);
    
     const imageData = canvas.toDataURL("image/png")
     images.push({
         id: images.length,
         image : imageData

    })
    // local storage.
    localStorage.setItem("tagnaBilder" , JSON.stringify(images))
    createNotification("Din bild har sparats.");
    canvas.style.opacity = "1";
    taBild.innerHTML = "FÅNGA ETT NYTT ÖGONBLICK"
    switchimage = false; 
}
    else {
        canvas.style.opacity = "0";
        taBild.innerHTML= "FÖREVIGA ETT ÖGONBLICK"
        switchimage = true;
    }
});

galleri.addEventListener("click", () =>{
    window.location.replace("../galleri.html");
})


function reqNotificationPermission(){
    Notification.requestPermission().then((permission) =>{
        notificationPermission = permission;
    })
}
reqNotificationPermission();

function createNotification(text){
    if (notificationPermission === "granted"){
       
        const notification = new Notification("Bröllopsfotografen", {body: text});
        notification.addEventListener("click", () => {
            window.location.replace("../galleri.html");
        })
    }
}

