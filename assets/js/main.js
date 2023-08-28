document.addEventListener('DOMContentLoaded', function () {
    let scrollEndDetector = 0;

    const galleryLeftBtn = document.querySelector('#galery-left-btn');
    const galleryRightBtn = document.querySelector('#galery-right-btn');
    const gallery = document.querySelector('#gallery');
    
    if (gallery && galleryLeftBtn && galleryRightBtn) {
        
        let isScrolling = false;
        let currentSlideIndex = 0;
        let slidesCount = gallery.children[0].children.length;

        galleryLeftBtn.onclick = function () {
            goToSlide(--currentSlideIndex);
        }
        
        galleryRightBtn.onclick = function () {
            goToSlide(++currentSlideIndex);
        }

        gallery.onscroll = function() {
        isScrolling = true;
        clearTimeout(window.scrollEndTimer);
        
        window.scrollEndTimer = setTimeout(function() {
            if (isScrolling) {
            isScrolling = false;
            onScrollEnd();
            }
        }, 250);
        };

        function onScrollEnd () {
            const currentScrollLeft = gallery.scrollLeft;
            
            const slideWidth = gallery.children[0].children[0].offsetWidth;
            const slidesGap = (gallery.children[0].offsetWidth - (slideWidth * slidesCount)) / (slidesCount + 1);

            currentSlideIndex = Math.round(currentScrollLeft / (slideWidth + slidesGap));

            goToSlide(currentSlideIndex);
        }

        function goToSlide (slideIndex = 0) {
            if (slideIndex < 0 || slideIndex > slidesCount - 1) return false;

            if (slideIndex > 0) {
                galleryLeftBtn.disabled = false;
            }
            else {
                galleryLeftBtn.disabled = true;
            }

            if (slideIndex < slidesCount - 1) {
                galleryRightBtn.disabled = false;
            }
            else {
                galleryRightBtn.disabled = true;
            }

            const slideWidth = gallery.children[0].children[0].offsetWidth;
            const slidesGap = (gallery.children[0].offsetWidth - (slideWidth * slidesCount)) / (slidesCount + 1);

            gallery.scrollTo({
                left: slideIndex * slideWidth + (slideIndex) * slidesGap,
                behavior: 'smooth'
            });
        }
    }
});