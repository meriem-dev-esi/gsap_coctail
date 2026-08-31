import React from 'react'
import { cocktailLists1, cocktailLists2 } from '../constants/index.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Cocktails = () => {
    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#cocktails',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });

        parallaxTimeline
            .from('#c-left-leaf', {
                y: 100,
                ease: 'none',
            })
            .from('#c-right-leaf', {
                y: -100,
                ease: 'none',
            });
    });

    return (
        <section id="cocktails">
            <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf"/>
            <img src="/images/cocktail-right-leaf.png" alt="r-leaf" id="c-right-leaf"/>

            <div className="list">
                <div className="popular">
                    <h2>Most popular cocktails</h2>
                    <ul>
                        {cocktailLists1.map((drink) => (
                            <li key={drink.name}>
                                <div className="md:me-28">
                                    <h3>{drink.name}</h3>
                                    <p>{drink.country} | {drink.detail}</p>
                                </div>
                                <span>- {drink.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="loved">
                    <h2>Most loved cocktails</h2>
                    <ul>
                        {cocktailLists2.map((drink) => (
                            <li key={drink.name}>
                                <div className="md:me-28">
                                    <h3>{drink.name}</h3>
                                    <p>{drink.country} | {drink.detail}</p>
                                </div>
                                <span>- {drink.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Cocktails
