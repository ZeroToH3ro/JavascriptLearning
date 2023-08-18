function showNotification(message) {
    Toastify({
        text: message,
        className: "info",
        position: "right",
        gravity: "bottom",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

document.addEventListener('DOMContentLoaded', function(){
    const btnNotifyUpdate = document.getElementById('btn-save');

    btnNotifyUpdate.addEventListener('click', function(){
        showNotification('Update User Success');
        setTimeout(()=> {
            window.location.replace("http://localhost:8080");
        }, 1000);
    });
});

