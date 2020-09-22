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

        portfolioSection.style = 'overflow-y: scroll';

    } else if (hash === '#about') {
        if (leftArrow.classList.contains('d-none')) {
            leftArrow.classList.remove('d-none');
        } else if (rightArrow.classList.contains('d-none')) {
            rightArrow.classList.remove('d-none');
        }
        leftArrowLink.href = '#portfolio';
        rightArrowLink.href = '#contact';

        portfolioSection.style = 'overflow-y: hidden';

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
            'image_url': 'static/img/pce-cover.png',
            'tools': [
                'Vue.js',
                'Vuetify',
                'Laravel PHP',
                'Digital Ocean',
            ],
            'live_url': 'https://dr-insights.gaben.tech/',
            'code_url': 'https://gitlab.com/TheGreatGaben/dr-insights-frontend',
        },
        'shibumi': {
            'title': 'Python OCR MVP',
            'description': 'Python',
            'image_url': 'static/img/shibumi-cover.png',
            'tools': [
                'React',
                'Next.js',
                'Redux',
                'Fabric.js',
                'Ant Design',
                'Python',
                'Flask',
                'OpenCV-Python',
                'Tesseract OCR',
                'Google Cloud Platform',
            ],
            'live_url': 'https://shibumi.gaben.tech/',
            'code_url': 'https://gitlab.com/TheGreatGaben/python-ocr-mvp',
        },
        'mopress': {
            'title': 'Tantan News / MOPress',
            'description': 'Tantan',
            'image_url': 'static/img/tantan-cover.png',
            'tools': [
                'Bootstrap',
                'jQuery',
                'Laravel Blade',
                'Laravel PHP',
                'Node.js',
                'Alibaba Cloud',
            ],
            'live_url': 'https://tantannews.com/',
        },
        'makkiah': {
            'title': 'Makkiah',
            'description': 'Makkiah',
            'image_url': 'static/img/makkiah-cover.png',
            'tools': [
                'React',
                'Ant Design',
                'Laravel PHP',
                'Digital Ocean',
            ],
            'live_url': 'https://makkiah.online/',
        },
    }

    const portfolioDetail = portfolioDetailsMap[portfolio];
    const modal = $(this);
    modal.find('.modal-title').text(portfolioDetail.title);
    modal.find('.modal-body p').text(portfolioDetail.description);
    modal.find('.modal-body img').attr('src', portfolioDetail.image_url);

    const portfolioTools = modal.find('.modal-body .portfolio-tools');
    portfolioTools.empty();
    for (let i = 0; i < portfolioDetail.tools.length; i++) {
        const tool = portfolioDetail.tools[i];
        let extraClass = '';
        if (i > 0) extraClass = 'ml-2';
        portfolioTools.append(`<span class="badge badge-pill badge-primary ${extraClass}">${tool}</span>`);
    }

    $('#portfolio-live-btn').attr('href', portfolioDetail.live_url);

    const codeBtn = $('#portfolio-code-btn');
    if (!portfolioDetail.code_url) {
        if (!codeBtn.hasClass('d-none'))
            codeBtn.addClass('d-none');

    } else if (codeBtn.hasClass('d-none'))
        codeBtn.removeClass('d-none');

    codeBtn.attr('href', portfolioDetail.code_url);
})
