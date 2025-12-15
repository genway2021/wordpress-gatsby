import * as React from "react"
import Layout from "../components/layout"
import AboutMe from "../components/AboutMe"
import HeroSection from "../components/HeroSection"

const HomePage = () => (
  <Layout>
    <HeroSection />
    <AboutMe />
  </Layout>
)

export default HomePage
