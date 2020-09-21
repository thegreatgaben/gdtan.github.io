const homeNav = document.getElementById('home-nav');
let currentActive = homeNav;

function urlHashHandler(hash) {
    const leftArrowLink = document.getElementById('left-arrow-link');
    const leftArrow = leftArrowLink.firstElementChild;

    const rightArrowLink = document.getElementById('right-arrow-link');
    const rightArrow = rightArrowLink.firstElementChild;

    const portfolioSection = document.getElementById('portfolio');
    const aboutSection = document.getElementById('about');

    if (hash === '' || hash === '#home') {
        if (rightArrow.classList.contains('d-none')) {
            rightArrow.classList.remove('d-none');
        }
        leftArrow.classList.add('d-none');

        rightArrowLink.href = '#portfolio';

    } else if (hash === '#portfolio') {
        if (leftArrow.classList.contains('d-none')) {
            leftArrow.classList.remove('d-none');
        } else if (rightArrow.classList.contains('d-none')) {
            rightArrow.classList.remove('d-none');
        }
        leftArrowLink.href = '#home';
        rightArrowLink.href = '#about';

        if (window.innerWidth < 768) {
            portfolioSection.style = 'overflow-y: scroll';
        }

    } else if (hash === '#about') {
        if (leftArrow.classList.contains('d-none')) {
            leftArrow.classList.remove('d-none');
        } else if (rightArrow.classList.contains('d-none')) {
            rightArrow.classList.remove('d-none');
        }
        leftArrowLink.href = '#portfolio';
        rightArrowLink.href = '#contact';

        if (window.innerWidth < 768) {
            aboutSection.style = 'overflow-y: scroll';
        }

    } else if (hash === '#contact') {
        if (leftArrow.classList.contains('d-none')) {
            leftArrow.classList.remove('d-none');
        }
        rightArrow.classList.add('d-none');
        leftArrowLink.href = '#about';

        aboutSection.style = 'overflow-y: hidden';
    }

    currentActive.classList.remove('active');
    currentActive = document.getElementById(`${hash.substr(1)}-nav`);
    currentActive.classList.add('active');
}

window.addEventListener('load', function() {
    if (window.location.hash != '#home')
        window.location.hash = '#home';
    else
        urlHashHandler(window.location.hash);
});

window.addEventListener('hashchange', function () {
    urlHashHandler(window.location.hash);
});

$('#portfolioModal').on('show.bs.modal', function (event) {
    const trigger = $(event.relatedTarget);
    const portfolio = trigger.data('portfolio');

    const portfolioDetailsMap = {
        'pce': {
            'title': 'Dr Insights',
            'description': 'This is a description',
            'image_url': 'https://via.placeholder.com/400',
        },
        'shibumi': {
            'title': 'Python OCR MVP',
            'description': 'Python',
            'image_url': 'https://via.placeholder.com/450',
        },
        'mopress': {
            'title': 'MOPress',
            'description': 'Tantan',
            'image_url': 'https://via.placeholder.com/500',
        },
        'makkiah': {
            'title': 'Makkiah',
            'description': 'Makkiah',
            'image_url': 'https://via.placeholder.com/550',
        },
    }

    const portfolioDetail = portfolioDetailsMap[portfolio];
    const modal = $(this);
    modal.find('.modal-title').text(portfolioDetail.title);
    modal.find('.modal-body p').text(portfolioDetail.description);
    modal.find('.modal-body img').attr('src', portfolioDetail.image_url);
})
