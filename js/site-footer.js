(function () {
    'use strict';

    function removeElement(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    function removeLegacyFooters() {
        document.querySelectorAll('footer.about-footer, .footer').forEach(removeElement);

        document.querySelectorAll('.footer-main-category').forEach(function (footerContent) {
            removeElement(footerContent.closest('.container-fluid-2') || footerContent);
        });

        document.querySelectorAll('.footer-bottom-section').forEach(removeElement);

        document.querySelectorAll('.footer-header-styles').forEach(function (footerHeading) {
            var container = footerHeading.closest('.container-fluid-2');
            var boundary = container && container.parentElement;

            if (boundary && boundary !== document.body && !boundary.classList.contains('wrapper')) {
                removeElement(boundary);
            } else {
                removeElement(container || footerHeading);
            }
        });

        document.querySelectorAll('.l-Footer').forEach(function (resumeFooter) {
            removeElement(resumeFooter.closest('.l-Wrapper') || resumeFooter);
        });
    }

    function loadStyles() {
        if (document.querySelector('link[href*="/css/siteFooter.css"]')) return;

        var stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = '/css/siteFooter.css?v=20260715-4';
        stylesheet.setAttribute('data-site-footer-styles', '');
        document.head.appendChild(stylesheet);
    }

    function createFooter() {
        var footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.setAttribute('aria-label', 'Site footer');
        footer.innerHTML = [
            '<div class="site-footer__shell">',
                '<div class="site-footer__top">',
                    '<div class="site-footer__identity">',
                        '<a class="site-footer__brand" href="/index.html" aria-label="Mohd Saquib home">&gt; mohdsaquib<span aria-hidden="true"></span></a>',
                        '<p>Cloud infrastructure, container platforms, and practical delivery.</p>',
                        '<a class="site-footer__email" href="mailto:nsaquib96@gmail.com">nsaquib96@gmail.com <span aria-hidden="true">→</span></a>',
                    '</div>',
                    '<nav class="site-footer__nav" aria-label="Footer navigation">',
                        '<div>',
                            '<p class="site-footer__label">Explore</p>',
                            '<a href="/content/about.html">Experience</a>',
                            '<a href="/content/ProjectPage.html">Projects</a>',
                            '<a href="/assets/Downloads/Mohd_Saquib_Resume_GeorgeMasonUniversity.pdf" target="_blank" rel="noopener">Résumé <span aria-hidden="true">↗</span></a>',
                        '</div>',
                        '<div>',
                            '<p class="site-footer__label">Connect</p>',
                            '<a href="https://www.linkedin.com/in/mohdnsaquib/" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>',
                            '<a href="https://github.com/Naz513/" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>',
                            '<a href="mailto:nsaquib96@gmail.com">Email</a>',
                        '</div>',
                        '<div>',
                            '<p class="site-footer__label">More</p>',
                            '<a href="/content/releaseNotes.html">Release notes</a>',
                        '</div>',
                    '</nav>',
                '</div>',
                '<div class="site-footer__bottom">',
                    '<p>&copy; <span data-site-footer-year></span> Mohd Saquib</p>',
                    '<p>Washington, DC area <span aria-hidden="true">·</span> Powered by AWS</p>',
                '</div>',
            '</div>'
        ].join('');

        footer.querySelector('[data-site-footer-year]').textContent = new Date().getFullYear();
        return footer;
    }

    loadStyles();
    removeLegacyFooters();
    document.body.appendChild(createFooter());
}());
