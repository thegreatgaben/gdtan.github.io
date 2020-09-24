const homeNav = document.getElementById('home-nav');
let currentActive = homeNav;

let portfolioReached = false;
let aboutReached = false;

const portfolioSection = document.getElementById('portfolio');
const aboutSection = document.getElementById('about');

// Website is horizontal only in 'large' screens, otherwise its vertical
const largeScreen = window.innerWidth > 990;

function urlHashHandler(hash) {
    const leftArrowLink = document.getElementById('left-arrow-link');
    const leftArrow = leftArrowLink.firstElementChild;

    const rightArrowLink = document.getElementById('right-arrow-link');
    const rightArrow = rightArrowLink.firstElementChild;

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

        if (!portfolioReached)
            animatePortfolioSection();

        if (largeScreen)
            portfolioSection.style = 'overflow-y: scroll';

    } else if (hash === '#about') {
        if (leftArrow.classList.contains('d-none')) {
            leftArrow.classList.remove('d-none');
        } else if (rightArrow.classList.contains('d-none')) {
            rightArrow.classList.remove('d-none');
        }
        leftArrowLink.href = '#portfolio';
        rightArrowLink.href = '#contact';

        if (!aboutReached)
            animateAboutSection();

        if (largeScreen) {
            portfolioSection.style = 'overflow-y: hidden';
            aboutSection.style = 'overflow-y: hidden';
        }

    } else if (hash === '#contact') {
        if (leftArrow.classList.contains('d-none')) {
            leftArrow.classList.remove('d-none');
        }
        rightArrow.classList.add('d-none');
        leftArrowLink.href = '#about';
    }

    setCurrentActiveSection(hash.substr(1));
}

function animatePortfolioSection() {
    const itemList = document.getElementsByClassName('portfolio-item');
    for (let i = 0; i < itemList.length; i++) {
        itemList[i].classList.add(`item-${i+1}`);
    }
    portfolioReached = true;
}

function animateAboutSection() {
    const itemList = document.getElementsByClassName('about-paragraph');
    for (let i = 0; i < itemList.length; i++) {
        itemList[i].classList.add(`paragraph-${i+1}`);
    }
    const imageFilter = document.getElementsByClassName('about-image-filter')[0];
    imageFilter.classList.add('about-image-filter-defrosting');

    aboutReached = true;
}

function setCurrentActiveSection(sectionName) {
    currentActive.classList.remove('active');
    currentActive = document.getElementById(`${sectionName}-nav`);
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

function getElementTopOffset(el) {
    let rect = el.getBoundingClientRect();
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
}

function getElementBottomOffset(el) {
    let rect = el.getBoundingClientRect();
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.bottom + scrollTop;
}

function checkSectionInView(section) {
    const sectionTop = getElementTopOffset(section);
    const sectionBottom = getElementBottomOffset(section);
    const sectionInView = window.scrollY >= sectionTop && window.scrollY < sectionBottom;
    if (sectionInView)
        setCurrentActiveSection(section.id);
}

if (!largeScreen) {
    window.addEventListener('scroll', function () {
        const portfolioSectionTop = getElementTopOffset(portfolioSection);
        const portfolioThreshold = portfolioSectionTop * 0.35;
        if (!portfolioReached && (window.scrollY > portfolioThreshold))
            animatePortfolioSection();


        const aboutSectionTop = getElementTopOffset(aboutSection);
        const aboutThreshold = aboutSectionTop - (aboutSectionTop * 0.25);
        if (!aboutReached && (window.scrollY > aboutThreshold))
            animateAboutSection();

        checkSectionInView(document.getElementById('home'));
        checkSectionInView(portfolioSection);
        checkSectionInView(aboutSection);
        checkSectionInView(document.getElementById('contact'));
    });
}

let $currentDemoShowing = null;
// Bootstrap still depends on jQuery
$('#portfolioModal').on('show.bs.modal', function (event) {
    const trigger = $(event.relatedTarget);
    const portfolio = trigger.data('portfolio');

    const portfolioDetailsMap = {
        'pce': {
            'title': 'Dr Insights',
            'description': '<p>Dr Insights is an admin web application that helps businesses to keep track of their cash flows on each of their projects. The main target audience was the SME contractors involved in property development here in Malaysia, where we found that many of them are still keeping track of their income and expenses tediously through Excel spreadsheets, and business owners only being able to see the health status of the projects in a monthly meeting.</p>\
            <p>The main feature of this app is the dashboard, where they are able to have an overview of their periodic nett cash flow, the ongoing health of their projects and the performance of each project manager, and also being able to have a thorough breakdown of those values so they could gain insight on what is needed to be done.</p>',
            'tools': [
                'Vue.js',
                'Vuetify',
                'Vuex',
                'Laravel PHP',
                'Digital Ocean',
            ],
            'live_url': 'https://dr-insights.gaben.tech/',
            'code_url': 'https://gitlab.com/TheGreatGaben/dr-insights-frontend',
        },
        'shibumi': {
            'title': 'Python OCR MVP',
            'description': '<p>This project was a minimum viable product (MVP), that aimed to help designers in the carton box printing industry in the Southeast Asia region to work more efficiently. We had an ambitious goal to make it an alternative web solution to Adobe Illustrator, that has tools specially made to benefit carton box printing designers. One such tool was to employ Optical Character Recognition (OCR) and Font matching, as well as Color Separation on an image. OCR and Color Separation was only implemented in this case. I worked on the OCR part, while one of my other colleague worked on Color Separation. I also contributed to the development of the frontend application.</p>\
            <p> Despite only being an MVP, it was a great learning experience to be able to integrate image processing techniques into our web application. The solution in the end was not a perfect one and had lots of room for improvement, but this project succeeded in attracting new clients to our company.</p>',
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
            'code_url': 'https://github.com/thegreatgaben/python-ocr-mvp',
        },
        'mopress': {
            'title': 'Tantan News / MOPress',
            'description': '<p>Tantan News is a Chinese social news website. The website already existed before we took over and did some major enhancements for the site. Some things I specifically did for them include placement of Google Ad units, integration with Google Tag Manager (GTM) for custom dimension and event tracking, video player integration from a third party vendor, and also a page for live tracking of Coronavirus cases in Malaysia and other countries, with related articles to that topic.</p>\
            <p>There is also another platform that powers the site called <a href="https://www.mopress.io/">MOPress</a>, that enables news publishers to source content from a group of users known as freelance mobile journalists (MOJOs). We develop lots of features and enhancements for it too. One of the major features that I helped to develop was a gamification system for the MOJOs, whereby each of them is assigned a rank based on how much articles they write and the number of page views they are getting from each article. As they increase in rank, they are entitled to receive more credits on the platform which they can withdraw as cash. This is to incentivize them to create more quality news content.</p>\
            <p>This project was a unique experience as instead of starting from scratch, I was already working on a fairly sized codebase written by previous developers.</p>',
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
            'description': '<p>This is a project that we did during the Movement Control Order (MCO) period in Malaysia when Coronavirus began spreading here. It is a mobile Progressive Web App (PWA) that enables sellers to set up an online shop and sell their products primarily through WhatsApp. The target audience was the small business owners that have no online presence yet. The main purpose was to empower these sellers to continue selling their products online, while they were unable to do so in their physical shop, due to MCO.</p>',
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

    // Show the appropriate portfolio demo
    if ($currentDemoShowing) {
        $currentDemoShowing.addClass('d-none');
    }
    $currentDemoShowing = $(`#${portfolio}-demo`);
    $currentDemoShowing.removeClass('d-none');

    const noGifCaption = modal.find('.modal-body p');
    if (portfolio === 'makkiah') {
        noGifCaption.removeClass('d-none');
    } else if (!noGifCaption.hasClass('d-none')) {
        noGifCaption.addClass('d-none');
    }

    const portfolioDescription = modal.find('.modal-body .portfolio-description');
    portfolioDescription.empty();
    portfolioDescription.append(portfolioDetail.description);

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
