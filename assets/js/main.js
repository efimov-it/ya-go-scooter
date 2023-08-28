document.addEventListener('DOMContentLoaded', function () {
    let scrollEndDetector = 0;

    const galleryLeftBtn = document.querySelector('#galery-left-btn');
    const galleryRightBtn = document.querySelector('#galery-right-btn');
    const gallery = document.querySelector('#gallery');
    
    if (gallery && galleryLeftBtn && galleryRightBtn) {
        
        let autoScroll = false;
        let timeOutCodes = [];
        let currentSlideIndex = 0;
        let slidesCount = gallery.children[0].children.length;

        galleryLeftBtn.onclick = function () {
            goToSlide(--currentSlideIndex);
        }
        
        galleryRightBtn.onclick = function () {
            goToSlide(++currentSlideIndex);
        }

        gallery.onscroll = function (e) {
            scrollEndDetector++;
            
            timeOutCodes.push(
                setTimeout(function () {
                    if (scrollEndDetector !== 0) {
                        detectScroolEnd(scrollEndDetector);
                    }
                },
            300));
        }

        function detectScroolEnd (detectorValue) {
            if (detectorValue === scrollEndDetector) {    
                timeOutCodes.forEach(tocode => {
                    clearTimeout(tocode);
                });
                timeOutCodes = [];

                scrollEndDetector = 0;
                onScrollEnd();
            }
        }

        function onScrollEnd () {
            console.log(123);
            if (autoScroll) {
                autoScroll = false;
                return false;
            }

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

            autoScroll = true;

            gallery.scrollTo({
                left: slideIndex * slideWidth + (slideIndex) * slidesGap,
                behavior: 'smooth'
            });
        }
    }
});