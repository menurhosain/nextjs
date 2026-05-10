const gsap_init_obj = {
    // Listing All Animation Functions For Frontend
    init_all_animations() {
        this.initHeadingAnimations();
        this.initPinElements();
    },

    // Heading Split Text & Color Fill Animation
    initHeadingAnimations() {
        $(".rs-heading .title").each(function () {
            var $el = $(this);
            var el = this;
            var animation = $el.data("animation");
            if (!animation) return;

            var splitTarget = $el.data("split-target") || "chars";
            var split = new SplitText(el, { type: splitTarget });

            var targets;
            if (splitTarget === "lines") targets = split.lines;
            else if (splitTarget === "words") targets = split.words;
            else targets = split.chars;

            // split_text
            if (animation === "split_text") {
                var animationName = $el.data("animation-name") || "split-in-fade";
                var duration = parseFloat($el.data("duration")) || 0.8;
                var delay = parseFloat($el.data("delay")) || 0.02;
                var useMask = $el.data("mask") === true;
                var travel = parseFloat($el.data("travel")) || 20;
                var baseOpacity = parseFloat($el.data("base-opacity")) || 0;

                gsap.set(el, { perspective: 400 });

                if (useMask) {
                    targets.forEach(function (target) {
                        var mask = document.createElement("div");
                        mask.classList.add("rs-mask");
                        mask.style.cssText = "display:inline-block; overflow:hidden; vertical-align:top;";
                        target.parentNode.insertBefore(mask, target);
                        mask.appendChild(target);
                    });
                }

                if (animationName === "split-in-right") gsap.set(targets, { opacity: baseOpacity, x: travel });
                else if (animationName === "split-in-left") gsap.set(targets, { opacity: baseOpacity, x: -travel });
                else if (animationName === "split-in-up") gsap.set(targets, { opacity: baseOpacity, y: travel });
                else if (animationName === "split-in-down") gsap.set(targets, { opacity: baseOpacity, y: -travel });
                else if (animationName === "split-in-rotate") gsap.set(targets, { opacity: baseOpacity, rotateX: travel });
                else if (animationName === "split-in-scale") gsap.set(targets, { opacity: baseOpacity, scale: 0.5 });
                else gsap.set(targets, { opacity: baseOpacity });

                gsap.to(targets, {
                    x: 0,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    opacity: 1,
                    duration: duration,
                    stagger: delay,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "restart pause resume reverse",
                    },
                });
            }

            // color_fill
            if (animation === "color_fill") {
                var color = $el.data("color") || "#c7c7c7";
                var startPoint = parseFloat($el.data("color-start")) || 90;
                var endPoint = parseFloat($el.data("color-end")) || 10;
                var pin = $el.data("pin") === true;

                var tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: $el.parent()[0],
                        start: "top +=" + startPoint + "%",
                        end: "bottom +=" + endPoint + "%",
                        pin: pin,
                        scrub: 0.1,
                    },
                });

                tl.to(targets, { color: color, stagger: 1 });
            }
        });
        // Usage (split_text):
        //   <div class="rs-heading">
        //     <h2 class="title"
        //         data-animation="split_text"
        //         data-animation-name="split-in-up"
        //         data-split-target="words"
        //         data-duration="0.8"
        //         data-delay="0.02"
        //         data-travel="20"
        //         data-base-opacity="0"
        //         data-mask="false">
        //       Your Heading
        //     </h2>
        //   </div>
        //
        // Usage (color_fill):
        //   <div class="rs-heading">
        //     <h2 class="title"
        //         data-animation="color_fill"
        //         data-split-target="words"
        //         data-color="#c7c7c7"
        //         data-color-start="90"
        //         data-color-end="10"
        //         data-pin="false">
        //       Your Heading
        //     </h2>
        //   </div>
        //
        // data-animation        : "split_text" | "color_fill"
        // data-animation-name   : "split-in-fade" | "split-in-up" | "split-in-down"
        //                         "split-in-left" | "split-in-right"
        //                         "split-in-rotate" | "split-in-scale"
        // data-split-target     : "chars" | "words" | "lines"   (default: "chars")
        // data-duration         : seconds                        (default: 0.8)
        // data-delay            : stagger seconds                (default: 0.02)
        // data-travel           : px distance                    (default: 20)
        // data-base-opacity     : 0–1                            (default: 0)
        // data-mask             : true | false                   (default: false)
        // data-color            : hex/rgb                        (default: "#c7c7c7")
        // data-color-start      : scroll start %                 (default: 90)
        // data-color-end        : scroll end %                   (default: 10)
        // data-pin              : true | false                   (default: false)
    },

    // Pin Element
    initPinElements() {
        $(".rs-pin-element").each(function () {
            var $el = $(this);
            var el = this;

            // Optional: pin a different element than the one with the class
            var pinAreaSelector = $el.data("pin-area") || "";
            var pinArea = pinAreaSelector ? document.querySelector(pinAreaSelector) : el;
            if (!pinArea) return;

            var pinStart = $el.data("pin-start") || "top top";
            var pinEnd = $el.data("pin-end") || "bottom top";
            var pinSpacing = $el.data("pin-spacing") !== false;
            var pinMarkers = $el.data("pin-markers") === true;

            gsap.set(pinArea, { transition: "none" });

            var config = {
                trigger: pinArea,
                pin: true,
                pinSpacing: pinSpacing,
                start: pinStart,
                end: pinEnd,
                markers: pinMarkers,
                onToggle: function (self) {
                    self.trigger.classList.toggle("rs-pin-element-active", self.isActive);
                },
            };

            // Optional: custom end trigger element
            var endTriggerSelector = $el.data("pin-end-trigger") || "";
            if (endTriggerSelector) {
                var endTriggerEl = document.querySelector(endTriggerSelector);
                if (endTriggerEl) config.endTrigger = endTriggerEl;
            }

            ScrollTrigger.create(config);
        });
        // Usage:
        //   <div class="rs-pin-element"
        //        data-pin-start="top top"
        //        data-pin-end="bottom top"
        //        data-pin-spacing="false"
        //        data-pin-markers="false"
        //        data-pin-area="#custom-selector"
        //        data-pin-end-trigger="#end-selector">
        //   </div>
        //
        // data-pin-start        : ScrollTrigger start point      (default: "top top")
        // data-pin-end          : ScrollTrigger end point        (default: "bottom top")
        // data-pin-spacing      : keep space while pinned        (default: true)
        // data-pin-markers      : show debug markers             (default: false)
        // data-pin-area         : pin a different element        (CSS selector, optional)
        // data-pin-end-trigger  : custom end trigger element     (CSS selector, optional)
    },
};

window.gsap_init_obj = gsap_init_obj;
