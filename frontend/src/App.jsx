import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Services from "./pages/Services/Services.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import config from "./config.json";

const App = () => {

    if (!config) return <div>Загрузка...</div>;

    return (
        <div>
            <Navbar navigation={config.navigation} />
            <div className="home-page">
                <Routes>
                    <Route path="/" element={<Home mainContent={config.mainContent["/"]}
                                                   navigation={config.navigation}
                                                   about={config.about}
                                                   mission={config.mission}
                                                   services={config.services}
                                                   theme={config.theme}
                                                   reviews={config.reviews}
                                                   contact={config.contact}
                    />} />
                    <Route path="/services" element={<Services services={config.services} />}/>
                    <Route path="/about" element={<About aboutData={config.about} />} />
                    <Route path="/contact" element={<Contact contactData={config.contact} />} />
                </Routes>
            </div>
            <Footer footerData={config.footer} />
        </div>
    );
};

export default App;
