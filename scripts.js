window.addEventListener('load', () => {
    let contentHeight,
        windowWidth,
        pixelsScrolled,
        parallaxHeight,
        scrollContentPercent,
        scrollParallaxPercent,
        opacityChange,
        zoomingSpeed,
        parallaxFog,
        mountainMain,
        mountainMainZoom,
        mountainRight,
        mountainLeft,
        slideLeft,
        slideRight,
        mountainRightZoom,
        mountainLeftZoom,
        mainTitle,
        copyrightDate;


    window.addEventListener('scroll', event => {
        const content = document.getElementById('content');
        pixelsScrolled = window.pageYOffset; //Get number of pixels scrolled from top        
        windowWidth = window.innerWidth; //Get browser width        
        contentHeight = content.clientHeight; //Get content area height
        parallaxHeight = document.getElementById('parallax').clientHeight; //Get parallax area height
        
        //Процент прокрутки контентной части
        scrollContentPercent = pixelsScrolled / contentHeight * 100;

        //Процент прокрутки области параллакс
        scrollParallaxPercent = pixelsScrolled / parallaxHeight * 100;

        //Speed of opacity change during scrolling
        opacityChange = 1 - 1/100*scrollParallaxPercent;

        //Change fog opacity
        parallaxFog = document.getElementById('parallax-fog');
        zoomingSpeed = 1 + (windowWidth/10000*scrollParallaxPercent);

        parallaxFog.style.transform = `scale(${zoomingSpeed})`;
        parallaxFog.style.opacity = opacityChange;

        //Change main title opacity/Scroll main title
        mainTitle = document.getElementById('main-title');
        // mainTitle.style.opacity = opacityChange;
        mainTitle.style.transform = `translate(0, -${pixelsScrolled}px)`;

        //Mountains settings
        mountainMain = document.getElementById('mountain-main');
        mountainMainZoom = Number(1 + (windowWidth/5000000*scrollContentPercent));
        mountainMain.style.transform = `scale(${mountainMainZoom})`;
        
        //right mountain
        mountainRight = document.getElementById('mountain-right');
        slideRight = Number(windowWidth / 1500 * scrollParallaxPercent);
        mountainRightZoom = Number(1 + (windowWidth * 0.000005 * scrollParallaxPercent));
        mountainRight.style.transform = `translate3d(${slideRight}px, 0, 0) scale(${mountainRightZoom})`;
        scrollContentPercent     

        //left mountain
        mountainLeft = document.getElementById('mountain-left');
        slideLeft = Number(windowWidth / 1000 * scrollParallaxPercent); 
        mountainLeftZoom = Number(1 + (windowWidth * 0.00001 * scrollParallaxPercent));
        mountainLeft.style.transform = 'translate3d(-' + slideLeft + 'px, 0,0) scale(' + mountainLeftZoom + ')'; 
                
        //remove from page when scrollContentPercent is > 70%
        if (scrollContentPercent > 71) {
            mountainRight.style.display = 'none';
            mountainLeft.style.display = 'none';
            parallaxFog.style.display = 'none';
        } else {
            mountainRight.style.display = '';
            mountainLeft.style.display = '';
            parallaxFog.style.display = '';
        }
        
        //Add current year to copyright
        copyrightDate = document.getElementById('copyright-date');
        let currentDate = new Date();
        copyrightDate.innerHTML = currentDate.getFullYear();
    });
});