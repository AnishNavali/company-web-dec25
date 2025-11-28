import HomeSectionFive from "./home-five/home-five";
import { HomeSectionFour } from "./home-four/home-four";
import HomeSectionOne from "./home-one/home-one";
import HomeSectionThree from "./home-three/home-three";
import HomeSectiontwo from "./home-two/home-two";

export default function HomeSection() {
  return (
    <div>
      <HomeSectionOne />
      <HomeSectionFour />
      <HomeSectionThree />
      <HomeSectionFive />
      <HomeSectiontwo />
    </div>
  );
}
