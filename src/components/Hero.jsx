import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from 'react-responsive'
import { SplitText, ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'

// Register GSAP plugins for scroll animations and text splitting
gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
    // Reference to the background/hero video element
    const videoRef = useRef();
    // Check for mobile viewport to adapt scroll trigger start/end positions
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        // --- TEXT SPLITTING & ENTRANCE ANIMATIONS ---
        // Split the main title into individual characters and words
        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        // Split the subtitle paragraphs into lines
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        // Apply gradient styling to each character of the title
        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        // Animate title characters sliding up into view with staggered timing
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
        });

        // Animate subtitle lines fading and sliding up with a delay
        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1,
        });

        // --- HERO LEAF PARALLAX ANIMATION ---
        // Parallax effect on left and right leaves as the hero section scrolls
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
            .to('.right-leaf', { y: 200 }, 0)
            .to('.left-leaf', { y: -200 }, 0);

        // --- SCROLL-TRIGGERED VIDEO PLAYBACK ANIMATION ---
        // Responsive scroll positions: mobile requires earlier trigger and larger scroll distance
        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        // Create a pinned timeline that scrubs video playback according to scroll progress
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: videoRef.current,
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        });

        // Helper function to bind video currentTime to timeline scrub with linear easing
        const initVideoAnimation = () => {
            if (videoRef.current && videoRef.current.duration) {
                tl.to(videoRef.current, {
                    currentTime: videoRef.current.duration,
                    ease: 'none',
                });
            }
        };

        // Ensure video metadata is loaded before reading duration (handles cached & fresh loads)
        if (videoRef.current) {
            if (videoRef.current.readyState >= 1) {
                initVideoAnimation();
            } else {
                videoRef.current.onloadedmetadata = initVideoAnimation;
            }
        }
    }, []);

    return (
        <>
            {/* Hero Main Content Section */}
            <section id="hero">
                <h1 className="title">MOJITO</h1>
                <img
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    className="left-leaf"
                />
                <img
                    src="/images/hero-right-leaf.png"
                    alt="right-leaf"
                    className="right-leaf"
                />
                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic</p>
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients,
                                creative flair, and timeless recipes — designed to delight your senses.
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Background Video Section with Scroll-based Playback */}
            <div className="video absolute inset-0">
                <video
                    ref={videoRef}
                    src="/videos/input.mp4"
                    muted
                    playsInline
                    preload="auto"
                />
            </div>
        </>
    )
}

export default Hero