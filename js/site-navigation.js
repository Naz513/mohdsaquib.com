(function () {
    'use strict';

    function removeElement(element) {
        if (element && element.parentNode) element.parentNode.removeChild(element);
    }

    function loadStyles() {
        if (document.querySelector('link[href*="/css/siteNavigation.css"]')) return;

        var stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = '/css/siteNavigation.css?v=20260715-4';
        stylesheet.setAttribute('data-site-navigation-styles', '');
        document.head.appendChild(stylesheet);
    }

    function currentSection() {
        var path = window.location.pathname.toLowerCase();

        if (path === '/' || path === '/index.html') return 'home';
        if (path.indexOf('/about.html') !== -1) return 'experience';
        if (path.indexOf('project') !== -1) return 'projects';
        return '';
    }

    function createNavigation() {
        var section = currentSection();
        var header = document.createElement('header');
        header.className = 'site-header';
        header.innerHTML = [
            '<nav class="site-navigation" aria-label="Primary navigation">',
                '<a class="site-navigation__brand" href="/index.html" aria-label="Mohd Saquib home">&gt; mohdsaquib<span aria-hidden="true"></span></a>',
                '<div class="site-navigation__links" data-site-navigation-links>',
                    '<a data-section="home" href="/index.html">Home</a>',
                    '<a data-section="experience" href="/content/about.html">Experience</a>',
                    '<a data-section="projects" href="/content/ProjectPage.html">Projects</a>',
                    '<a class="site-navigation__resume" href="/assets/Downloads/Mohd_Saquib_Resume_GeorgeMasonUniversity.pdf" target="_blank" rel="noopener">Résumé <span aria-hidden="true">↗</span></a>',
                '</div>',
                '<button class="site-navigation__toggle" type="button" aria-expanded="false" aria-controls="site-navigation-panel">',
                    '<span class="site-navigation__toggle-label">Menu</span>',
                    '<span class="site-navigation__toggle-lines" aria-hidden="true"><i></i><i></i></span>',
                '</button>',
            '</nav>',
            '<div class="site-navigation__panel" id="site-navigation-panel" aria-hidden="true">',
                '<div class="site-navigation__panel-inner">',
                    '<p>Navigation</p>',
                    '<a data-section="home" href="/index.html">Home</a>',
                    '<a data-section="experience" href="/content/about.html">Experience</a>',
                    '<a data-section="projects" href="/content/ProjectPage.html">Projects</a>',
                    '<a href="/assets/Downloads/Mohd_Saquib_Resume_GeorgeMasonUniversity.pdf" target="_blank" rel="noopener">Résumé <span aria-hidden="true">↗</span></a>',
                    '<div class="site-navigation__panel-meta">',
                        '<a href="mailto:nsaquib96@gmail.com">nsaquib96@gmail.com</a>',
                        '<span>Washington, DC area</span>',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');

        if (section) {
            header.querySelectorAll('[data-section="' + section + '"]').forEach(function (link) {
                link.setAttribute('aria-current', 'page');
            });
        }

        return header;
    }

    function initializeNavigation(header) {
        var toggle = header.querySelector('.site-navigation__toggle');
        var panel = header.querySelector('.site-navigation__panel');
        var label = header.querySelector('.site-navigation__toggle-label');

        function setOpen(open) {
            header.classList.toggle('site-header--open', open);
            toggle.setAttribute('aria-expanded', String(open));
            panel.setAttribute('aria-hidden', String(!open));
            label.textContent = open ? 'Close' : 'Menu';
            document.body.classList.toggle('site-navigation-open', open);
            document.documentElement.classList.toggle('site-navigation-open', open);
        }

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });

        panel.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { setOpen(false); });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') setOpen(false);
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 720 && toggle.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
            }
        });
    }

    function initializeSmoothScrolling(header) {
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        document.addEventListener('click', function (event) {
            var link = event.target.closest('a[href*="#"]');
            if (!link) return;

            var destination = new URL(link.href, window.location.href);
            var isCurrentPage = destination.origin === window.location.origin &&
                destination.pathname === window.location.pathname &&
                destination.search === window.location.search;

            if (!isCurrentPage || !destination.hash || destination.hash === '#') return;

            var targetId = decodeURIComponent(destination.hash.substring(1));
            var target = document.getElementById(targetId);
            if (!target) return;

            event.preventDefault();

            var headerOffset = header.getBoundingClientRect().height + 16;
            var targetPosition = window.pageYOffset + target.getBoundingClientRect().top - headerOffset;

            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: reduceMotion.matches ? 'auto' : 'smooth'
            });

            if (window.history && window.history.pushState) {
                window.history.pushState(null, '', destination.hash);
            }
        });
    }

    loadStyles();

    var legacyNavigation = document.querySelector('.wrapper > nav');
    var hadLegacyNavigation = Boolean(legacyNavigation);
    removeElement(legacyNavigation);
    removeElement(document.getElementById('resize'));

    var header = createNavigation();
    document.body.insertBefore(header, document.body.firstChild);
    if (!hadLegacyNavigation) document.body.classList.add('site-navigation-needs-offset');
    initializeNavigation(header);
    initializeSmoothScrolling(header);
}());
