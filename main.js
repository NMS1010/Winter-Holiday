function handleEvent() {
    var $ = document.querySelector.bind(document);
    var $$ = document.querySelectorAll.bind(document);


    function getParent(element, selector) {
        while(element.parentNode) {
            if(element.parentNode.matches(selector)) {
                return element.parentNode;
            }
            element = element.parentNode;
        }
    }
    function removeActiveModal(selector) {
        $(selector).addEventListener('click',(e) => {
            let parent =getParent(e.target, '.modal');
            if(parent) {
                parent.classList.remove('open');
            }
        })
    }
    function stopPropaga(element) {
        element.addEventListener('click',(e) => {
            e.stopPropagation();
        })    
    }
    let listIcon = $$('.nav__options-icon');
    Array.from(listIcon).forEach((icon) => {
        icon.addEventListener('click',(e) => {
            let hoverdIcon = e.target.nextElementSibling;
            if(hoverdIcon) {
                hoverdIcon.classList.toggle('open')
            }
            let getModals = icon.querySelectorAll('.modal');
            if(getModals.length > 1) {
                getModals.forEach(modal => {
                    let authens = modal.querySelectorAll('.form-authen__heading-title');
                    Array.from(authens).forEach((authen) => {
                        authen.addEventListener('click',(e) => {
                            let parent = getParent(e.target, '.modal');
                            if(parent.matches('.modal-login')) {
                                parent.classList.remove('open');
                                $('.modal-register').classList.add('open');
                            }else {
                                parent.classList.remove('open');
                                $('.modal-login').classList.add('open');
                            }
                        })
                    })
                })
            }
        })
    })

    removeActiveModal('.menu-bar__icon-close');
    removeActiveModal('.search__icon-close');

    let modals = $$('.modal');
    Array.from(modals).forEach((modal) => {
        modal.addEventListener('click',(e) => {
                modal.classList.remove('open');
        })
        stopPropaga(modal.querySelector('.modal-container'));
    })

    // Open nav menu
    let items = Array.from($$('.nav__navbar-mobile-item'));
    stopPropaga($('.nav__navbar-mobile-list'))
    items.forEach((item) => {
        item.addEventListener('click',(e) => {
            let itemOpened = $(`.${e.target.className}.open`)
            if(itemOpened){
                $(`.${e.target.className}.open`).classList.remove('open');
            }
            e.target.classList.toggle('open')
        })
    })


    //Create new event & handle animation counting number
    function checkInsideViewPort(selector) {
        let viewport = $(selector).getBoundingClientRect();
        if(viewport.top >=0 && 
            viewport.left >=0 && 
            viewport.right <= (window.innerWidth || document.documentElement.clientWidth) && 
            viewport.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                return true;
        }
        return false;
    }

    function animationCounterNumber(min, max, duration, callback) {
        let startTime = performance.now();
        function updateNum(currTime) {
            let elapsedTime = currTime - startTime;
            if(elapsedTime > duration) {
                callback(max);
            } else {
                let rate = elapsedTime / duration;
                let currNumber = Math.round(rate * max);
                callback(currNumber);
                requestAnimationFrame(updateNum)
            }
        }
        requestAnimationFrame(updateNum)
    }
    let insideView = new Event('insideView');

    function handleCounters() {
        let numbers = $$('.content-achievement__info-number');
        Array.from(numbers).forEach((number) => {
            animationCounterNumber(0, number.dataset.target, 4000, (num) => {
                number.innerHTML = num.toString();
            })
        })
    }
    document.addEventListener('insideView',handleCounters)
    
    document.addEventListener('scroll', (e) => {
        if(checkInsideViewPort('.content-achievement')) {
            document.dispatchEvent(insideView);
            document.removeEventListener('insideView',handleCounters)
        }
    })
    //Make slider

    let destinations = [
        {
            url: './assets/img/destination/tour-featured-img-18.jpg',
            date: 1,
            number: '13+',
            detail: 'Skiing',
            header: 'Snow Surfing',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing el.… ',
            price: '$720',
            star: '7.3',
            like: 'Super'
        },
        {
            url: './assets/img/destination/tour-featured-img-19.jpg',
            date: 1,
            number: '13+',
            detail: 'Skiing',
            header: 'Kids Ski School',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing el.… ',
            price: '$1600',
            star: '6.7',
            like: 'Good'
        },
        {
            url: './assets/img/destination/tour-featured-img-14.jpg',
            date: 1,
            number: '13+',
            detail: 'Skiing',
            header: 'Active Winter',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing el.… ',
            price: '$3600',
            star: '7.3',
            like: 'Super'
        },
        {
            url: './assets/img/destination/tour-featured-img-15.jpg',
            date: 1,
            number: '13+',
            detail: 'Skiing',
            header: 'Winter Action',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing el.… ',
            price: '$960',
            star: '6.0',
            like: 'Good'
        },
        {
            url: './assets/img/destination/tour-featured-img-16.jpg',
            date: 1,
            number: '13+',
            detail: 'Skiing',
            header: 'Magic Of Italy',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing el.… ',
            price: '$1000',
            star: '6.7',
            like: 'Good'
        },
    ]

    function renderImg(obj, index) {
        $$('.slider-item__img')[index].src = obj.url;
        $$('.slider-item__detail-date span')[index].innerHTML = obj.date;
        $$('.slider-item__detail-number span')[index].innerHTML = obj.number;
        $$('.slider-item__detail-location a')[index].innerHTML = obj.detail;
        $$('.slider-item__header')[index].innerHTML = obj.header;
        $$('.slider-item__description')[index].innerHTML = obj.description;
        $$('.slider-item__price')[index].innerHTML = obj.price;
        $$('.slider-item__star')[index].innerHTML = obj.star;
        $$('.slider-item__like')[index].innerHTML = obj.like;
    }

    setInterval(()=> {
        let sliderArr = [];
        destinations.forEach((destination, index)=> {
            let temp = index + 1;
            if(temp >= destinations.length) {
                temp = 0;
            }
            sliderArr.push(destinations[temp]);
        })
        destinations = sliderArr;
        destinations.forEach((destination, index) => {
            renderImg(destination, index)
        })
    },4000)
}