import HeroImage from "../assets/image/heroSection.jpg";
import "./Hero.css";

function Hero() {

    return (
        <div className="hero">
            <img className="hero-image" src={HeroImage} />
            <div className="hero-text"> <label>Free Movies at Your Fingertips</label></div>
        </div>
    )
}
export default Hero;