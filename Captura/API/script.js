const url = 'https://postman-echo.com/post';

document.addEventListener('DOMContentLoaded', init);

function init(){
    document.getElementById('btnSubmit').addEventListener('click', upload);
}

function upload(ev){
    ev.preventDefault();    

    let h = new Headers();
    h.append('Accept', 'application/json'); 
    
    let fd = new FormData();
    fd.append('user-id', document.getElementById('user_id').value);
    
    let myFile = document.getElementById('my_video').files[0];
    
    
    let req = new Request(url, {
        method: 'POST',
        headers: h,
        mode: 'no-cors',
        body: fd
    });

    fetch(req)
        .then( (response)=>{
            document.getElementById('output').textContent = "Response received from server";
        })
        .catch( (err) =>{
            console.log('ERROR:', err.message);
        });
}