let btnOpen = document.querySelector('.open-modal-btn');
let modal = document.querySelector('.modal');
let iconClose = document.querySelector('.modal_header i');
let btnClose = document.querySelector('.modal_footer button');


function toggleModal(e) {
    console.log(e.target);
    modal.classList.toggle('hide');
}

btnOpen.addEventListener('click', toggleModal);
btnClose.addEventListener('click', toggleModal);
iconClose.addEventListener('click', toggleModal);
modal.addEventListener('click', function(e){
    if (e.target == e.currentTarget)
        toggleModal();
});

