let myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log(`width ${myWidth} \n height ${myHeight}`);


window.onload = function () {

    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('html').style.overflowY = 'scroll';
    }, 1500);

    /*
        increase date
     */

    let today = new Date(),
        tomorrow = new Date(),
        day,
        month,
        year,
        i = 3,
        period = document.querySelectorAll('h6.small output');

    tomorrow.setDate(today.getDate() + i);
    day = tomorrow.getDate() > 9 ? tomorrow.getDate() : `0${tomorrow.getDate()}`;
    month = tomorrow.getMonth() + 1 > 9 ? tomorrow.getMonth() + 1 : `0${tomorrow.getMonth() + 1}`;
    year = tomorrow.getFullYear();

    for(let i = 0; i < period.length; i++) {
        period[i].innerHTML = `${day}.${month}.${year.toString().slice(2)}`;
    }

    document.querySelector('h6.small.address output').innerHTML = year;

    /*
        fancybox settings
     */

    $.fancybox.defaults.loop = true;
    $.fancybox.defaults.animationEffect = 'fade';

    /*
        change active color and watch photo
     */

    const allColor = document.querySelectorAll('.color figure span'),
        watchImg = document.querySelector('.catalog__content-img img');

    for(let i = 0; i < allColor.length; i++) {
        for(let j = 0; j < allColor.length; j++) {
            allColor[j].addEventListener('click', () => {
                let activeColor = allColor[j].className;
                if(allColor[j].classList.contains('active')) {
                    allColor[i].classList.remove('active');
                    allColor[j].classList.add('active');
                } else {
                    allColor[i].classList.remove('active');
                    allColor[j].classList.add('active');
                    watchImg.style.opacity = '0';
                    setTimeout(() => {
                        watchImg.src = `img/catalog/${activeColor}.png`
                    }, 600);
                    setTimeout(() => {
                        watchImg.style.opacity = '1';
                    }, 1100);
                }
            })
        }
    }

    /*
        review slider
     */

    $('.review__content').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 300,
        rows: 0,
        arrows: true,
        prevArrow: $('.prev-arrow'),
        nextArrow: $('.next-arrow')
    });

    /*
        toggle bucket
     */

    const toggleBucket = () => {
        const bucket = document.querySelector('a.bucket'),
            topOfWindow = window.pageYOffset + innerHeight,
            catalogTopPosition = document.querySelector('.catalog').offsetTop,
            galleryTopPosition = document.querySelector('.gallery').offsetTop,
            footerLink = $('.footer__content .to-order').offset().top;

        if(topOfWindow > catalogTopPosition && topOfWindow < galleryTopPosition || topOfWindow > footerLink) {
            bucket.style.opacity = '0';
        } else {
            bucket.style.opacity = '1';
        }
    }

    /*
        slow scroll
     */

    const slowScroll = (href) => {
        $('.to-order a, a.bucket').on('click', function () {
            $('html, body').animate({scrollTop: href}, 800);
        });
    };



    if(/iPhone|iPod|iPad|Android/i.test(navigator.userAgent)) {
        let href = $('#mobile-order').offset().top - innerHeight - 40;
        slowScroll(href);
        window.addEventListener('scroll', () => {
            toggleBucket();
        });
        window.addEventListener('resize', () => {
            toggleBucket();
            href = $('#mobile-order').offset().top - innerHeight;
            slowScroll(href);
        });
    } else {
        let href = $('#catalog').offset().top;
        slowScroll(href);
    }
};
