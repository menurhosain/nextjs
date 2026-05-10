;(function ($) {
    "use strict";

    // Initialize All Animations
    $(function () {
        init_all_animations();
    });

    // Listing All Animation Functions For Frontend
    function init_all_animations() {

        if (!document.body.classList.contains('gsap-enable')) return;

        gsap_scroll_slider();
        gsap_rs_marqueeSlider();
        gsap_rs_scrollRotate();
        gsap_rs_MoveOnScroll();
        gsap_rs_image_reveal();
        gsap_fixed_elements();
        gsap_cursor_attached_label();
        gsap_sticky_ripple_effect();
        initHeadingAnimations();
    }

    // Heading Split Text & Color Fill Animation
    function initHeadingAnimations() {

        $('.rs-heading .title').each(function () {
            var $el       = $(this);
            var el        = this;
            var animation = $el.data('animation');
            if (!animation) return;

            var splitTarget = $el.data('split-target') || 'chars';
            var split       = new SplitText(el, { type: splitTarget });

            var targets;
            if (splitTarget === 'lines')      targets = split.lines;
            else if (splitTarget === 'words') targets = split.words;
            else                              targets = split.chars;

            // split_text
            if (animation === 'split_text') {
                var animationName = $el.data('animation-name') || 'split-in-fade';
                var duration      = parseFloat($el.data('duration'))     || 0.8;
                var delay         = parseFloat($el.data('delay'))        || 0.02;
                var useMask       = $el.data('mask') === true;
                var travel        = parseFloat($el.data('travel'))       || 20;
                var baseOpacity   = parseFloat($el.data('base-opacity')) || 0;

                gsap.set(el, { perspective: 400 });

                if (useMask) {
                    targets.forEach(function (target) {
                        var mask = document.createElement('div');
                        mask.classList.add('rs-mask');
                        mask.style.cssText = 'display:inline-block; overflow:hidden; vertical-align:top;';
                        target.parentNode.insertBefore(mask, target);
                        mask.appendChild(target);
                    });
                }

                if      (animationName === 'split-in-right')  gsap.set(targets, { opacity: baseOpacity, x: travel });
                else if (animationName === 'split-in-left')   gsap.set(targets, { opacity: baseOpacity, x: -travel });
                else if (animationName === 'split-in-up')     gsap.set(targets, { opacity: baseOpacity, y: travel });
                else if (animationName === 'split-in-down')   gsap.set(targets, { opacity: baseOpacity, y: -travel });
                else if (animationName === 'split-in-rotate') gsap.set(targets, { opacity: baseOpacity, rotateX: travel });
                else if (animationName === 'split-in-scale')  gsap.set(targets, { opacity: baseOpacity, scale: 0.5 });
                else                                          gsap.set(targets, { opacity: baseOpacity });

                gsap.to(targets, {
                    x: 0, y: 0, rotateX: 0, scale: 1, opacity: 1,
                    duration: duration,
                    stagger: delay,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        toggleActions: 'restart pause resume reverse',
                    },
                });
            }

            // color_fill
            if (animation === 'color_fill') {
                var color      = $el.data('color')       || '#c7c7c7';
                var startPoint = parseFloat($el.data('color-start')) || 90;
                var endPoint   = parseFloat($el.data('color-end'))   || 10;
                var pin        = $el.data('pin') === true;

                var tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: $el.parent()[0],
                        start: 'top +=' + startPoint + '%',
                        end: 'bottom +=' + endPoint + '%',
                        pin: pin,
                        scrub: 0.1,
                    },
                });

                tl.to(targets, { color: color, stagger: 1 });
            }
        });
    }

    // Marquee Slider
    function gsap_rs_marqueeSlider() {
        const rs_Marquee_Slider = document.querySelectorAll('.gsap-marquee');
        if (!rs_Marquee_Slider.length) return;

        gsap.registerPlugin(ScrollTrigger);
        rs_Marquee_Slider.forEach(element => {
            const directionClass = element.classList.contains('left') ? 'left' : 'right';
            const durationClass = getDurationFromClass(element.classList);
            const moveLengthClass = getMoveLengthFromClass(element.classList);

            const timeline = gsap.timeline();

            if (directionClass === 'left') {
                timeline.to(element, {
                    x: -moveLengthClass,
                    duration: durationClass,
                    repeat: -1,
                    ease: 'linear'
                });
            } else {
                timeline.to(element, {
                    x: moveLengthClass,
                    duration: durationClass,
                    repeat: -1,
                    ease: 'linear'
                });
            }

            timeline.to(element, {
                xPercent: 6,
                scrollTrigger: {
                    trigger: element,
                    scrub: 1
                }
            });
        });

        function getDurationFromClass(classList) {
            for (const className of classList) {
                if (className.startsWith('speed-')) {
                    return parseInt(className.substring(6));
                }
            }
            return 50;
        }

        function getMoveLengthFromClass(classList) {
            for (const className of classList) {
                if (className.startsWith('move-to-')) {
                    return parseInt(className.substring(8));
                }
            }
            return 1000;
        }
    }

    // Rotate on Scroll
    function gsap_rs_scrollRotate() {
        const rotateClockTarget = document.querySelectorAll(
            '.gsap-rotate, .gsap-rotate-normal, .rs-marquee-slider-gsap.rotate-anim .gsap-marquee .marquee-wrapper .slider-item i, .rs-marquee-slider-gsap.rotate-anim .gsap-marquee .marquee-wrapper .slider-item img'
        );
        const rotateAntiClockTarget = document.querySelectorAll('.gsap-rotate-anti');

        if (rotateClockTarget.length || rotateAntiClockTarget.length) {
            gsap.registerPlugin(ScrollTrigger);
        }

        const setupRotation = (elements, direction = 'clockwise') => {
            elements.forEach((element) => {
                const rotationSpeed = 0.2;
                const match = element.className.match(/to-(\d+)/);
                const rotationValue = match ? parseInt(match[1]) : 360;

                gsap.to(element, {
                    rotation: direction === 'clockwise' ? rotationValue * rotationSpeed : -rotationValue * rotationSpeed,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 90%',
                        end: 'bottom',
                        scrub: 1
                    }
                });
            });
        };

        if (rotateClockTarget.length) setupRotation(rotateClockTarget, 'clockwise');
        if (rotateAntiClockTarget.length) setupRotation(rotateAntiClockTarget, 'anticlockwise');
    }

    // Move any direction on scroll
    function gsap_rs_MoveOnScroll() {
        const scrollMoveTarget = document.querySelectorAll('.gsap-move, .gsap-move-yes');
        if (scrollMoveTarget.length === 0) return;

        gsap.registerPlugin(ScrollTrigger);

        scrollMoveTarget.forEach((element, index) => {
            let moveDistance = extractMoveDistanceAnadDirectionFromClass(element.className);
            let startPercentage = extractStartPercentageFromClass(element.className, 20);
            let moveProperties = {};
            switch (moveDistance.direction) {
                case 'right':
                    moveProperties = {x: moveDistance.value};
                    break;
                case 'left':
                    moveProperties = {x: -moveDistance.value};
                    break;
                case 'up':
                    moveProperties = {y: -moveDistance.value};
                    break;
                case 'down':
                    moveProperties = {y: moveDistance.value};
                    break;
                default:
                    break;
            }
            gsap.to(element, {
                x: moveProperties.x || 0,
                y: moveProperties.y || 0,
                scrollTrigger: {
                    trigger: element,
                    start: `top ${startPercentage}%`,
                    scrub: 1.7,
                }
            });
        });

        // Passing which direction and distance value eg:left-200 will pass to left 200px
        function extractMoveDistanceAnadDirectionFromClass(className) {
            const regex = /(?:^|\s)(left|right|up|down)(?:-(\d+))?(?:\s|$)/;
            const match = className.match(regex);
            const direction = match ? match[1] : 'right';
            const value = match && match[2] ? parseFloat(match[2]) : 0;
            return {direction, value};
        }

        // Passing start from value eg:start-90 will pass 90%
        function extractStartPercentageFromClass(className, defaultValue) {
            const regex = /(?:^|\s)start-(\d+)(?:\s|$)/;
            const match = className.match(regex);
            return match !== null ? parseInt(match[1]) : defaultValue;
        }
    }

    // Image Revel
    function gsap_rs_image_reveal() {
        const scrollRevealTarget = document.querySelectorAll('.rs-image.scroll_reveal');

        if (scrollRevealTarget.length === 0) return;

        gsap.registerPlugin(ScrollTrigger);
        setTimeout(() => {
            scrollRevealTarget.forEach((wrapper) => {
                let image = wrapper.querySelector(".rs-image.scroll_reveal img");
                let directionClass = wrapper.classList.contains('reveal_left') ? 'reveal_left' : 'reveal_right';

                let reveal_trigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapper,
                        toggleActions: "restart pause resume reverse",
                    }
                }).set(wrapper, {autoAlpha: 1});

                // Add the class `.reveal-active`
                wrapper.classList.add("reveal-active");

                if (directionClass === 'reveal_left') {
                    reveal_trigger.from(wrapper, 1, {xPercent: -50, ease: Power2.out})
                        .from(image, 1, {xPercent: 50, scale: 1.3, delay: -1, ease: Power2.out});
                } else {
                    reveal_trigger.from(wrapper, 1, {xPercent: 50, ease: Power2.out})
                        .from(image, 1, {xPercent: -50, scale: 1.3, delay: -1, ease: Power2.out});
                }
            });
        }, 100);
    }

    // Fixed Elements on Scroll
    function gsap_fixed_elements() {
        const scrollFixedTarget = document.querySelectorAll(".gsap-fixed, .gsap-fixed-yes");

        if (scrollFixedTarget.length === 0) return;

        gsap.registerPlugin(ScrollTrigger);

        scrollFixedTarget.forEach(container => {
            let stopUnder = container.dataset.stopUnder ?? '';

            if (stopUnder === "mobile") {
                stopUnder = 767;
            } else if (stopUnder === "tablet") {
                stopUnder = 991;
            } else if (stopUnder === "laptop") {
                stopUnder = 1199;
            } else {
                stopUnder = 0;
            }

            if (window.innerWidth <= stopUnder) {
                return;
            }

            const elements = container.querySelectorAll(".gsap-fixed.e-con-boxed > .e-con-inner > *, .gsap-fixed.e-con-full > *, .gsap-fixed-yes > *");

            // Scroll Trigger Loop
            elements.forEach((element, index) => {
                const startClass = Array.from(container.classList).find(className => className.startsWith('start-'));
                const startOffset = startClass ? parseInt(startClass.split('-')[1]) : 40;

                gsap.set(element, {
                    force3D: true
                });
                element.style.willChange = 'transform';
                setTimeout(() => {
                    ScrollTrigger.create({
                        trigger: element,
                        start: `top-=${startOffset + 80}`,
                        end: `top-=${startOffset}`,
                        onEnter: () => {
                            const idParts = `${container.id}-trigger-${index}`.split('-');
                            const lastPart = parseInt(idParts[idParts.length - 1]);
                            const previousSpacer = document.querySelector(`.pin-spacer--trigger-${lastPart - 1}`);
                            if (previousSpacer) {
                                previousSpacer.classList.add('spacer-before-active');
                            }
                        },
                        onLeaveBack: () => {
                            const idParts = `${container.id}-trigger-${index}`.split('-');
                            const lastPart = parseInt(idParts[idParts.length - 1]);
                            const previousSpacer = document.querySelector(`.pin-spacer--trigger-${lastPart - 1}`);
                            if (previousSpacer) {
                                previousSpacer.classList.remove('spacer-before-active');
                            }
                        }
                    });
                    ScrollTrigger.create({
                        trigger: element,
                        start: `top-=${startOffset}`,
                        end: `bottom top+=${element.offsetHeight + startOffset}`,
                        endTrigger: container,
                        pin: true,
                        pinSpacing: false,
                        id: `${container.id}-trigger-${index}`,
                        invalidateOnRefresh: true,
                    });
                }, 10);
            });
        });
    }

    // Label Attached With Cursor
    function gsap_cursor_attached_label() {
        const cursorAttachedTarget = document.querySelectorAll(".gsap-cursor-attached-label");

        if (cursorAttachedTarget.length === 0) return;

        cursorAttachedTarget.forEach(wrapper => {
            const dragElement = wrapper.querySelector(".label-move");

            if (!dragElement) return;

            dragElement.style.visibility = "visible";

            const initPos = {x: wrapper.offsetWidth - 60, y: 60};
            gsap.set(dragElement, {xPercent: -50, yPercent: -50, scale: 1, x: initPos.x, y: initPos.y});

            let pos = {x: 0, y: 0};

            function updatePosition(e) {
                const bounds = wrapper.getBoundingClientRect();
                const mouseX = Math.min(Math.max(e.clientX, bounds.left), bounds.right);
                const mouseY = Math.min(Math.max(e.clientY, bounds.top), bounds.bottom);

                pos.x = mouseX - bounds.left;
                pos.y = mouseY - bounds.top;

                gsap.to(dragElement, {
                    x: pos.x,
                    y: pos.y,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }

            function returnToOriginalPosition() {
                const duration = 0.8;
                gsap.to(dragElement, {x: initPos.x, y: initPos.y, duration, ease: "power2.inOut"});
            }

            wrapper.addEventListener("mousemove", updatePosition);
            wrapper.addEventListener("mouseleave", () => {
                wrapper.removeEventListener("mousemove", updatePosition);
                returnToOriginalPosition();
            });
            wrapper.addEventListener("mouseenter", () => {
                wrapper.addEventListener("mousemove", updatePosition);
            });
            wrapper.addEventListener("mousedown", () => {
                gsap.to(dragElement, {scale: 0.6, duration: 0.2, ease: "power2.out"});
            });
            document.addEventListener("mouseup", () => {
                gsap.to(dragElement, {scale: 1, duration: 0.2, ease: "power2.out"});
            });
        });
    }

    // Sticky Button With Ripple Effect
    function gsap_sticky_ripple_effect() {
        const tweenMaxBtnTarget = document.querySelectorAll(".rs-tween_max_btn, .rs-tween_max_btn-yes");

        if (tweenMaxBtnTarget.length === 0) return;

        var hoverMouse = function ($el) {
            $el.each(function () {
                var $self = $(this);
                var hover = false;
                var getOffsetValue = function (classNamePrefix) {
                    var className = $self.attr("class").split(" ").find(function (cls) {
                        return cls.startsWith(classNamePrefix);
                    });
                    if (className) {
                        var value = className.replace(classNamePrefix, "");
                        return parseFloat(value) / 10;
                    }
                    return null;
                };
                var offsetHoverMax = getOffsetValue("offset-hover-max-") || 0.7;
                var offsetHoverMin = getOffsetValue("offset-hover-min-") || 0.5;
                var attachEventsListener = function () {
                    $(window).on("mousemove", function (e) {
                        var hoverArea = hover ? offsetHoverMax : offsetHoverMin;
                        var cursor = {
                            x: e.clientX,
                            y: e.pageY
                        };
                        var width = $self.outerWidth();
                        var height = $self.outerHeight();
                        var offset = $self.offset();
                        var elPos = {
                            x: offset.left + width / 2,
                            y: offset.top + height / 2
                        };
                        var x = cursor.x - elPos.x;
                        var y = cursor.y - elPos.y;
                        var dist = Math.sqrt(x * x + y * y);
                        var mutHover = false;
                        if (dist < width * hoverArea) {
                            mutHover = true;
                            if (!hover) {
                                hover = true;
                            }
                            onHover(x, y);
                        }
                        if (!mutHover && hover) {
                            onLeave();
                            hover = false;
                        }
                    });
                };
                var onHover = function (x, y) {
                    TweenMax.to($self, 0.4, {
                        x: x * 0.3,
                        y: y * 0.3,
                        rotation: x * 0.05,
                        ease: Power2.easeOut
                    });
                };
                var onLeave = function () {
                    TweenMax.to($self, 0.7, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        ease: Elastic.easeOut.config(1.2, 0.4)
                    });
                };
                attachEventsListener();
            });
        };
        hoverMouse($(".rs-tween_max_btn, .rs-tween_max_btn-yes"));
    }

    // Slide based on scroll
    function gsap_scroll_slider() {
        const section = document.querySelector(".rs-gsap-post-slider");
        if (!section) return;

        gsap.registerPlugin(ScrollTrigger);

        let config = {};
        try {
            config = JSON.parse(section.getAttribute('data-sl-config')) || {};
        } catch (e) {
            console.warn('Invalid or missing data-sl-config JSON', e);
        }

        function getCurrentStuckKey() {
            const width = window.innerWidth;
            if (width <= 575) return 'stuck-xs';
            if (width <= 767) return 'stuck-sm';
            if (width <= 1024) return 'stuck-md';
            if (width <= 1366) return 'stuck-lg';
            return 'stuck-desktop';
        }

        const currentKey = getCurrentStuckKey();
        const stuck = config[currentKey] !== undefined ? parseInt(config[currentKey]) : 100;

        const container = document.querySelector(".slider-wrapper");
        const items = gsap.utils.toArray(".post-item");

        if (!container || items.length < 2) return;

        function getVisibleWidth() {
            const diff = window.innerWidth - section.offsetWidth;
            return window.innerWidth - diff;
        }

        function getScrollLength() {
            return container.scrollWidth - getVisibleWidth();
        }

        gsap.to(container, {
            x: () => -getScrollLength(),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: `top top+=${stuck}`,
                end: () => "+=" + getScrollLength(),
                scrub: true,
                pin: true,
                anticipatePin: 1,
            }
        });
    }

})(jQuery);

;(function ($) {
    $(window).on('elementor/frontend/init', function () {
        const moduleHandler = elementorModules.frontend.handlers.Base;

        // Horizontal Scroll
        const horizontalScroll = moduleHandler.extend({
            bindEvents() {
                if ('yes' !== this.getCurrentDeviceSetting('rs_horizontal_scroll')) return;

                if (this.isEdit) {
                    this.initDummyScroll();
                } else {
                    this.initScroll();
                }
            },

            initDummyScroll() {
                const element = this.$element;
                const sections = this.$element.find('> .e-con.e-child');
                const settings = this.getElementSettings();

                if (this.$element.hasClass('e-con-boxed') || !sections.length) return;

                if ('yes' === settings.rs_horizontal_scroll_progress) {
                    element.append('<div class="rs-horizontal-scroll-progress"><div></div></div>');
                    const progressbar = element.find('.rs-horizontal-scroll-progress');
                    progressbar.css({
                        'width': $('body').innerWidth(),
                        '--progress': 33 + '%'
                    });
                }

                if ('yes' === settings.rs_horizontal_scroll_pagination_number) {
                    element.append('<div class="rs-horizontal-scroll-pagination"></div>');
                    const paginationNumber = element.find('.rs-horizontal-scroll-pagination');
                    paginationNumber.text(1 + '/' + sections.length);
                }
            },

            initScroll() {
                const element = this.$element;
                const sections = this.$element.find('> .e-con.e-child');
                const settings = this.getElementSettings();

                if (this.$element.hasClass('e-con-boxed') || !sections.length) return;

                const scroll_model = settings.rs_horizontal_scroll_model ?? 'normal';
                const {size: topOffset} = settings.rs_horizontal_scroll_top_offset;
                const start = topOffset ? `top top+=${topOffset}` : 'top top';

                let progressbar = false;
                if ('yes' === settings.rs_horizontal_scroll_progress) {
                    element.append('<div class="rs-horizontal-scroll-progress"><div></div></div>');
                    progressbar = element.find('.rs-horizontal-scroll-progress');
                    progressbar.css({
                        'width': $('body').innerWidth()
                    });
                }

                let paginationNumber = false;
                if ('yes' === settings.rs_horizontal_scroll_pagination_number) {
                    element.append('<div class="rs-horizontal-scroll-pagination"></div>');
                    paginationNumber = element.find('.rs-horizontal-scroll-pagination');
                    paginationNumber.text(1 + '/' + sections.length);
                }

                const applyNormalScrollModel = () => {
                    const {size: widthValue, unit: widthUnit} = settings.rs_horizontal_scroll_width;
                    const width = `${widthValue}${widthUnit}`;

                    element.css({
                        width,
                        'max-width': width,
                        transition: 'none',
                        height: '100%',
                        display: 'flex',
                        'flex-wrap': 'nowrap',
                        'flex-direction': 'row',
                    });

                    sections.css({transition: 'none', height: '100%'});

                    gsap.to(sections, {
                        xPercent: -100 * (sections.length - 1),
                        ease: 'none',
                        scrollTrigger: {
                            trigger: element,
                            start: start,
                            pin: true,
                            scrub: 1,
                            end: `+=${element[0].offsetWidth}`,
                            invalidateOnRefresh: true,
                        },
                        onUpdate: function () {
                            const progress = this.progress();

                            if (progressbar) {
                                progressbar.css('--progress', (progress * 100) + '%');
                            }

                            if (paginationNumber) {
                                let maxVisibleIndex = 0;
                                let maxVisibleArea = 0;

                                sections.each(function (index) {
                                    const section = this;
                                    const rect = section.getBoundingClientRect();
                                    const viewportWidth = window.innerWidth;

                                    const visibleLeft = Math.max(0, rect.left);
                                    const visibleRight = Math.min(viewportWidth, rect.right);
                                    const visibleWidth = Math.max(0, visibleRight - visibleLeft);

                                    if (visibleWidth > maxVisibleArea) {
                                        maxVisibleArea = visibleWidth;
                                        maxVisibleIndex = index;
                                    }
                                });

                                const currentNumber = maxVisibleIndex + 1;
                                paginationNumber.text(currentNumber + '/' + sections.length);
                            }
                        }
                    });

                    return () => {
                        element.css({
                            width: 'var(--width)',
                            'max-width': 'min(100%, var(--width))',
                            height: 'auto',
                        });
                    };
                };

                const applyNormalMaskingModel = () => {
                    const slides = gsap.utils.toArray(sections);
                    const N = slides.length;
                    const dir = settings.rs_horizontal_scroll_model_masking_dir ?? '';
                    const clipPath = 'ltr' === dir ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';

                    sections.css({
                        'z-index': 1
                    });

                    gsap.set(slides.slice(1), {clipPath: clipPath});

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: element,
                            pin: true,
                            start: start,
                            end: () => "+=" + (N - 1) * window.innerHeight,
                            scrub: true,
                        }
                    });

                    slides.slice(1).forEach((slide, i) => {
                        tl.to(slide, {
                            clipPath: "inset(0 0% 0 0%)",
                            ease: "none",
                            duration: 1,
                            onUpdate: function () {
                                const tweenProgress = this.progress();
                                const slideIndex = i + 1;
                                const totalProgress = (slideIndex - 1 + tweenProgress) / (N - 1);

                                if (progressbar) {
                                    progressbar.css('--progress', (totalProgress * 100) + '%');
                                }

                                if (paginationNumber) {
                                    const currentIndex = tweenProgress >= 0.5 ? slideIndex : slideIndex - 1;
                                    const currentNumber = currentIndex + 1;
                                    paginationNumber.text(currentNumber + '/' + N);
                                }
                            }
                        });
                    });
                }

                if ('masking' === scroll_model) {
                    applyNormalMaskingModel();
                } else {
                    applyNormalScrollModel();
                }
            },
        });

        // Pin Element
        const pinElement = moduleHandler.extend({
            bindEvents() {
                if (this.getCurrentDeviceSetting('rs_pin_element') === 'yes' && !this.isEdit) {
                    this.initPin();
                }
            },

            initPin() {
                if (this.pinInstance) return;

                let pinArea = this.$element[0];

                const pinTrigger = this.getCurrentDeviceSetting('rs_pin_trigger');

                if (pinTrigger === 'custom') {
                    const customPinArea = this.getCurrentDeviceSetting('rs_custom_pin_area');

                    if (customPinArea) {
                        const el = document.querySelector(customPinArea);
                        if (el) pinArea = el;
                    }
                }

                let pinStatus = this.getCurrentDeviceSetting('rs_pin_status');

                pinStatus = pinStatus === 'custom'
                    ? (this.getCurrentDeviceSetting('rs_pin_custom') ?? pinStatus)
                    : pinStatus === 'yes';

                let pinStart = this.getCurrentDeviceSetting('rs_pin_area_start');

                pinStart = pinStart === 'custom'
                    ? (this.getCurrentDeviceSetting('rs_pin_area_start_custom') ?? pinStart)
                    : pinStart;

                let pinEnd = this.getCurrentDeviceSetting('rs_pin_area_end');

                pinEnd = pinEnd === 'custom'
                    ? (this.getCurrentDeviceSetting('rs_pin_area_end_custom') ?? pinEnd)
                    : pinEnd;

                let pinSpacing = this.getCurrentDeviceSetting('rs_pin_spacing');

                pinSpacing = pinSpacing === 'custom'
                    ? (this.getCurrentDeviceSetting('rs_pin_spacing_custom') ?? pinSpacing)
                    : pinSpacing === 'yes';

                const pinMarker = this.getElementSettings('rs_pin_markers') === 'yes';

                gsap.set(pinArea, {
                    transition: 'none'
                });

                let config = {
                    trigger: pinArea,
                    pin: pinStatus,
                    pinSpacing: pinSpacing,
                    start: pinStart,
                    end: pinEnd,
                    markers: pinMarker,
                    onToggle: self => {
                        self.trigger.classList.toggle('rs-pin-element-active', self.isActive);
                    },
                }

                if (this.getCurrentDeviceSetting('rs_pin_end_trigger') === 'custom') {
                    const customEndTrigger = this.getCurrentDeviceSetting('rs_pin_custom_end_trigger');

                    if (customEndTrigger) {
                        const el = document.querySelector(customEndTrigger);
                        if (el) config.endTrigger = el;
                    }
                }

                this.pinInstance = ScrollTrigger.create(config);
            },
        })

        // Custom Cursor
        const cursorHoverEffect = moduleHandler.extend({
            bindEvents() {
                const isPortfolio = this.getWidgetType() === 'rs-portfolio';

                if (isPortfolio) {
                    const liveKey = 'gsap_img_cursor_effect';
                    const editorKey = 'gsap_img_cursor_effect_on_editor';
                    const textKey = 'gsap_img_cursor_text';

                    const getTarget = () => this.$element.find('.portfolio-thumb');

                    if (this.getElementSettings(liveKey) === 'yes' && !this.isEdit) {
                        this.setupCursor(getTarget(), textKey);
                    }
                    if (this.getElementSettings(editorKey) === 'yes' && this.isEdit) {
                        this.appendStaticCursor(this.$element, textKey);
                    }
                } else {
                    const liveKey = 'rs_cursor_hover_effect';
                    const editorKey = 'rs_cursor_hover_effect_editor_preview';
                    const textKey = 'rs_cursor_hover_effect_text';

                    if (this.getElementSettings(liveKey) === 'yes' && !this.isEdit) {
                        this.setupCursor(this.$element, textKey);
                    }
                    if (this.getElementSettings(editorKey) === 'yes' && this.isEdit) {
                        this.appendStaticCursor(this.$element, textKey);
                    }
                }
            },

            appendStaticCursor(element, textKey) {
                const text = this.getElementSettings(textKey);
                element.append(`<div class="rs-custom-cursor-wrap" style="position: absolute; opacity: 1;">${text}</div>`);
            },

            setupCursor(target, textKey) {
                const widgetId = this.getID();
                let cursor = $(`.rs-custom-cursor-wrap.active-${widgetId}`);

                if (!cursor.length) {
                    this.$element.append(`<div class="rs-custom-cursor-wrap active-${widgetId}"></div>`);
                    cursor = $(`.rs-custom-cursor-wrap.active-${widgetId}`);
                }
                cursor.css({display: 'flex'});

                gsap.set(cursor, {xPercent: -50, yPercent: -50, scale: 0, opacity: 0});

                const tl = gsap.timeline({paused: true}).to(cursor, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'expo.inOut',
                });

                $(document).on('mousemove.cursorHoverEffect', (e) => {
                    gsap.to(cursor, {
                        x: e.clientX,
                        y: e.clientY,
                        duration: 0.4,
                        ease: 'expo',
                        overwrite: 'auto',
                    });
                });

                target.on('mouseenter.cursorHoverEffect', () => {
                    cursor.html(this.getElementSettings(textKey));
                    tl.play();
                });

                target.on('mouseleave.cursorHoverEffect', () => {
                    tl.reverse();
                });
            },

            onDestroy() {
                $(document).off('.cursorHoverEffect');
                this.$element.off('.cursorHoverEffect');
            },
        })

        // Award List Animation
        const awardAnimation = moduleHandler.extend({
            bindEvents() {
                const gsapAnimation = this.getElementSettings('enable_gsap_animation');

                if (gsapAnimation !== 'yes' || this.isEdit) {
                    return;
                }

                const element = this.$element;
                const awardItem = element.find('.award-item');

                gsap.from(awardItem, {
                    x: "100%",
                    duration: 1,
                    stagger: 0.3,
                    ease: "power2.out",
                    scrollTrigger: {
                        scrub: 2,
                        trigger: element,
                        start: "top 100%",
                        end: "bottom 40%",
                        toggleActions: "play none none reverse",
                    }
                });
            }
        })

        // Scroll To Seat
        const scrollToSeat = moduleHandler.extend({
            bindEvents() {

                if (this.isEdit) return;
                if (this.getCurrentDeviceSetting('rs_scroll_to_seat') !== 'yes') return;

                this.run();
            },

            run() {
                const element = this.$element;
                const settings = this.getElementSettings();

                const endTrigger = settings['rs_scroll_to_seat_end_trigger'] ? 'selector' : 'distance';
                const startPoint = this.getCurrentDeviceSetting('rs_scroll_to_seat_start_point') ?? 100;
                const transform = this.getCurrentDeviceSetting('rs_scroll_to_seat_transform') ?? 100;
                const scale = this.getCurrentDeviceSetting('rs_scroll_to_seat_scale') ?? 0.5;
                const marker = settings['rs_scroll_to_seat_show_marker'];

                let endTriggerPoint;
                let config;
                let tweenTarget;
                if (endTrigger === 'selector') {
                    const endTriggerBuffer = settings['rs_scroll_to_seat_end_selector_buffer'] ?? 90;
                    endTriggerPoint = settings['rs_scroll_to_seat_end_selector'] ?? '#rs-not-empty';
                    config = {
                        end: {
                            selector: endTriggerPoint,
                            at: `${endTriggerBuffer}%`
                        },
                    };
                    tweenTarget = {
                        endTrigger: config.end.selector,
                        end: `top ${config.end.at}`
                    };
                } else {
                    endTriggerPoint = this.getCurrentDeviceSetting('rs_scroll_to_seat_end_distance') ?? 500;
                    config = {
                        end: {
                            px: endTriggerPoint
                        }
                    };
                    tweenTarget = {end: `+=${config.end.px}`};
                }
                ;

                element.css({
                    transition: 'none',
                    overflow: 'visible'
                });

                gsap.to(element.children()[0],
                    {
                        y: transform,
                        scale: scale,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: element[0],
                            start: `top top+=${startPoint}`,
                            ...tweenTarget,
                            scrub: true,
                            pin: true,
                            markers: marker
                        },
                    }
                );
            }
        });

        // Dot to Expand
        const dotToExpand = moduleHandler.extend({
            bindEvents() {
                if (this.isEdit) return;
                if (this.getCurrentDeviceSetting('rs_dot_to_expand') !== 'yes') return;

                this.run();
            },

            run() {
                const element  = this.$element;
                const id       = element.data('id');
                const settings = this.getElementSettings();

                // ===== SETTINGS =====
                const startPoint      = this.getCurrentDeviceSetting('rs_dot_to_expand_start_point') ?? 300;

                const stuckTo = this.getCurrentDeviceSetting('rs_dot_to_expand_stuck_to') ?? 'top';
                const stuckTopPosition = this.getCurrentDeviceSetting('rs_dot_to_expand_start_position') ?? 0;
                
                const dotSize         = this.getCurrentDeviceSetting('settings.rs_dot_to_expand_size') || 20;
                const dotOffsetY      = this.getCurrentDeviceSetting('rs_dot_to_expand_offset_y') || -50;

                const fadeDuration    = 0.12;
                const moveDuration    = 4;

                const expandDelay     = 0.4;
                const expandDuration  = 0.8;
                const contentFadeTime = 0.4;
                
                const scrollDistance  = this.getCurrentDeviceSetting('rs_dot_to_expand_distance') || window.innerHeight;
                
                const baseColor  = settings.rs_dot_to_expand_base_color || '';
                const sectionHeightValue = this.getCurrentDeviceSetting('rs_dot_to_expand_sec_height').size ?? '';
                const sectionHeightUnit = this.getCurrentDeviceSetting('rs_dot_to_expand_sec_height').unit ?? '';
                const sectionHeightMerge = (sectionHeightValue && sectionHeightUnit) ? sectionHeightValue + sectionHeightUnit : '';
                const sectionHeight = sectionHeightMerge || '100vh';

                // ===== BUILD DOM =====
                const wrapperClass = `rs-dot-to-expand-${id}`;

                element.wrap(`
                    <div class="rs-dot-to-expand ${wrapperClass}">
                        <div class="expand-zone-wrapper">
                            <div class="expand-zone">
                                <div class="expand-wrapper">
                                    <div class="expand-content"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                const wrapper        = element.closest(`.${wrapperClass}`);
                const zoneWrapper    = wrapper.find('.expand-zone-wrapper');
                const zone           = wrapper.find('.expand-zone');
                const expandWrapper  = wrapper.find('.expand-wrapper');
                const expandContent  = wrapper.find('.expand-content');

                wrapper.prepend('<div class="sticky-dot"></div>');
                const dot = wrapper.find('.sticky-dot');

                // ===== STYLE =====
                const cssVars = {};
                if (baseColor) cssVars['--baseColor'] = baseColor;
                if (dotSize) cssVars['--baseSize'] = dotSize + 'px';
                if (sectionHeight) cssVars['--sectionHeight'] = sectionHeight;
                wrapper.css(cssVars);
                
                // ===== ANIMATION =====
                let activeScroll, fadeScroll;

                const build = () => {

                    [activeScroll, fadeScroll].forEach(t => t?.kill());

                    const zoneEl    = zone[0];
                    const contentEl = expandContent[0];
                    const dotEl     = dot[0];

                    // Scale calculation
                    const scaleX = dotSize / zoneEl.offsetWidth;
                    const scaleY = dotSize / zoneEl.offsetHeight;

                    // Initial states
                    gsap.set(expandWrapper, {
                        scaleX,
                        scaleY,
                        borderRadius: 999,
                        opacity: 0
                    });

                    gsap.set(contentEl, { opacity: 0 });

                    gsap.set(dotEl, {
                        opacity: 0,
                        y: dotOffsetY
                    });

                    // ===== DOT FADE-IN =====
                    fadeScroll = ScrollTrigger.create({
                        trigger: zoneWrapper[0],
                        start: `top top+=${startPoint}`,
                        end: 'top top',
                        scrub: 1,
                        animation: gsap.timeline()
                            .to(dotEl, {
                                opacity: 1,
                                duration: fadeDuration
                            })
                            .to(dotEl, {
                                y: 0,
                                duration: moveDuration
                            }, 0)
                    });

                    // ===== MAIN EXPAND =====
                    activeScroll = ScrollTrigger.create({
                        trigger: zoneWrapper[0],
                        start: `${stuckTo} ${stuckTo}+=${stuckTopPosition}`,
                        end: `bottom bottom-=${scrollDistance}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,

                        animation: gsap.timeline()
                            .to({}, { duration: expandDelay })

                            .to(dotEl, {
                                opacity: 0,
                                duration: 0.05
                            })

                            .to(expandWrapper, {
                                opacity: 1,
                                duration: 0.05
                            }, '<')

                            .to(expandWrapper, {
                                scaleX: 1,
                                scaleY: 1,
                                borderRadius: 0,
                                duration: expandDuration,
                                ease: 'none'
                            })

                            .to(contentEl, {
                                opacity: 1,
                                duration: contentFadeTime
                            }, expandDelay + 0.2)
                    });
                };

                build();

                // ===== RESIZE =====
                let timer;
                window.addEventListener('resize', () => {
                    clearTimeout(timer);
                    timer = setTimeout(build, 200);
                });
            }
        });

        // Scroll To Full Screen Element
        const scrollToFullScreen = moduleHandler.extend({
            bindEvents() {
                if ( this.getCurrentDeviceSetting('rs_scroll_to_full_screen') !== 'yes' ) return;
                
                if ((1024 >= window.innerWidth) || this.isEdit) return;

                this.run();
            },

            run() {
                const section = this.$element;
                const settings = this.getElementSettings();

                section.addClass('rs-scroll-to-full-screen');
                
                const wrap = section.find('.target-wrapper');
                if ( !wrap ) return;

                const initScale = this.getCurrentDeviceSetting('rs_scroll_to_full_screen_scale') ?? 1;
                const scrollDistance = this.getCurrentDeviceSetting('rs_scroll_to_full_screen_distance') ?? 2000;
                
                const markers = 'yes' === settings.rs_scroll_to_full_screen_markers ? true : false;
                
                let activePass = null;
                function init() {
                    if (activePass) { activePass.kill(); activePass = null; }
                    const vw = window.innerWidth;
                    const vh = window.innerHeight;
                    const ratio = vw / vh;

                    const scale = initScale;
                    const wrapW = wrap[0].offsetWidth * scale;
                    const wrapH = wrapW / ratio;
                    gsap.set(wrap[0], { width: wrapW, height: wrapH });
                    
                    const sectionRect = section[0].getBoundingClientRect();
                    const wrapRect    = wrap[0].getBoundingClientRect();
                    
                    const startTop    = wrapRect.top  - sectionRect.top;
                    const startLeft   = wrapRect.left - sectionRect.left;
                    const startRight  = vw - startLeft - wrapRect.width;
                    const startBottom = vh - startTop  - wrapRect.height;
                    
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section[0],
                            start: "top top",
                            end: `+=${scrollDistance}`,
                            scrub: true,
                            pin: section[0],
                            pinSpacing: true,
                            anticipatePin: 1,
                            toggleClass: {
                                targets: section[0],
                                className: "scroll-to-full-init"
                            },
                            markers: markers,
                            onEnter() {
                                gsap.set(wrap[0], {
                                    position: "fixed",
                                    width:  "auto",
                                    height: "auto",
                                    top:    startTop,
                                    right:  startRight - 10,
                                    bottom: startBottom,
                                    left:   startLeft,
                                });
                            },
                            onLeaveBack() {
                                gsap.set(wrap[0], {
                                    clearProps: "position,top,right,bottom,left,borderRadius",
                                    width:  wrapW,
                                    height: wrapH,
                                });
                            }
                        }
                    })
                    .fromTo(wrap[0],
                        {
                            top: startTop,
                            right: startRight - 10,
                            bottom: startBottom,
                            left: startLeft
                        },
                        {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            borderRadius: 0,
                            ease: "none"
                        }
                    );

                    activePass = tl.scrollTrigger;
                }
                init();
            }
        });

        // Skew Entry
        const skewEntry = moduleHandler.extend({
            bindEvents() {
                if ( this.getCurrentDeviceSetting('rs_skew_entry') !== 'yes' ) return;
                if ( this.isEdit ) {
                    if ( 'yes' !== this.getElementSettings('rs_skew_entry_editor') ) return;
                }
                this.run();
                
            },

            run() {
                const widget = this.$element[0];
                let target;
                if ( this.isEdit ) {
                    target    = this.$element.children()[1];
                } else {
                    target    = this.$element.children()[0];
                }

                const start = this.getCurrentDeviceSetting('rs_skew_entry_start') || 90;
                const anglesDeg = this.getCurrentDeviceSetting('rs_skew_entry_angle')    || -80;
                const opacity = this.getCurrentDeviceSetting('rs_skew_entry_opacity') || 0;
                const duration  = this.getElementSettings('rs_skew_entry_duration') || 0.9;
                

                const h      = widget.offsetHeight;
                const rad    = (anglesDeg * Math.PI) / 180;
                const transY = Math.sin(rad) * (h / 2) + 50;
                const transZ = -(1 - Math.cos(rad)) * (h / 2);
                
                gsap.set(widget, { perspective: 400 });

                gsap.set(target, {
                    rotateX: anglesDeg,
                    y: transY,
                    z: transZ,
                    opacity: opacity,
                    transformOrigin: '50% 0%',
                });

                gsap.to(target, {
                    scrollTrigger: {
                        trigger: target,
                        start: `top ${start}%`,
                        toggleActions: 'play none none reverse',
                    },
                    rotateX: 0,
                    y: 0,
                    z: 0,
                    opacity: 1,
                    duration: duration,
                    ease: 'power3.out',
                });
            }
        });

        elementorFrontend.hooks.addAction('frontend/element_ready/container', function ($scope) {
            elementorFrontend.elementsHandler.addHandler(horizontalScroll, {$element: $scope});
            elementorFrontend.elementsHandler.addHandler(pinElement, {$element: $scope});
            elementorFrontend.elementsHandler.addHandler(dotToExpand, {$element: $scope});
            elementorFrontend.elementsHandler.addHandler(scrollToFullScreen, {$element: $scope});
        });

        elementorFrontend.hooks.addAction('frontend/element_ready/global', function ($scope) {
            elementorFrontend.elementsHandler.addHandler(cursorHoverEffect, {$element: $scope});
            elementorFrontend.elementsHandler.addHandler(scrollToSeat, {$element: $scope});
            elementorFrontend.elementsHandler.addHandler(skewEntry, {$element: $scope});
        });

        elementorFrontend.hooks.addAction('frontend/element_ready/rs-award-list.default', function ($scope) {
            elementorFrontend.elementsHandler.addHandler(awardAnimation, {$element: $scope});
        });
    });
})(jQuery);
