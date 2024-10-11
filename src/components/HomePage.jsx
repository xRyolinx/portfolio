import React from 'react'
import Home from './Home/Home'
import About from './About/About'
import Projects from './Projects/Projects'
import ResumeNew from './Resume/ResumeNew'

const HomePage = () => {
    return (
        <>
            <Home />
            <Projects />
            <About />
            <ResumeNew />
        </>
    )
}

export default HomePage