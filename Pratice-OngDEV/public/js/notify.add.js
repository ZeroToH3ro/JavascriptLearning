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
    const btnNotifyAdd = document.getElementById('add-toast');

    btnNotifyAdd.addEventListener('click', function(){
        showNotification('Add User Success');
        setTimeout(()=> {
            window.location.replace("http://localhost:8080");
        }, 1000);
    });

});

