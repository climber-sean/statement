document.addEventListener('DOMContentLoaded', function() {

    const cartToggle = document.querySelector('.js-cart-toggle'),
        modal = document.querySelector('.js-modal'),
        modalInner = document.querySelector('.js-modal-inner'),
        closeBtn = document.querySelector('.js-close'),
        body = document.querySelector('body'),
        loader = document.querySelector('.js-loader');

    // track modal state
    let modalOpen = false;

    const openModal = () => {
        // Stops scrolling when modal is active;
        body.classList.add('overlay-active');
        modal.setAttribute('aria-hidden', false);
        modal.classList.add('active');
        modalInner.classList.remove('slide-out');
        modalInner.classList.add('slide-in');

        modalOpen = true;
    }

    const closeModal = () => {
        body.classList.remove('overlay-active');
        modal.setAttribute('aria-hidden', true);
        modalInner.classList.add('slide-out');
        modalInner.classList.remove('slide-in');

        //remove modal after slide out animation
        setTimeout(function() {
            modal.classList.remove('active');
        },500)

        modalOpen = false;
    }

    const toggleLoader = () => {
        body.classList.toggle('overlay-active');
        loader.classList.toggle('active');
    }

    const toggleModal = () => {
        if (!modalOpen) {
            toggleLoader();
            setTimeout(function(){
                toggleLoader();
                openModal();
            }, 1000)
        } else {
            closeModal();
        }
    }

    cartToggle.addEventListener('click', toggleModal);
    closeBtn.addEventListener('click', toggleModal);
})