import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from './Navbar.jsx'
import Hero from './Hero.jsx'
import Cocktails from './Cocktails.jsx'
import About from './About.jsx'
import Art from './Art.jsx'
import Menu from './Menu.jsx'
import Contact from './Contact.jsx'

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
    return (
        <main>
            <Navbar />
            <Hero />
            <Cocktails />
            <About />
            <Art />
            <Menu/>
            <Contact/>
        </main>
    )
}

export default App
