import CollectionCarousel from "../../Components/Collection/Collection"
import Explorer from "../../Components/Explore/Explore"
import Guide from "../../Components/Guide/Guide"
import Hero from "../../Components/HeroSection/Hero"
import Blog from "../../Components/News/News"
import Partner from "../../Components/Partner/Partner"
import TopAuthorsSection from "../../Components/TopAuthor/TopAuthor"

function Home() {
  
  return (
<div>
  <Hero/>
  <TopAuthorsSection/>
  <Explorer/>
  <CollectionCarousel/>
  <Guide/>
  <Blog/>

  <Partner/>

</div>
  )
}

export default Home