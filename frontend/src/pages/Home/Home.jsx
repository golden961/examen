import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = ({ theme, navigation, mainContent, about, mission, services, reviews, contact }) => {
    const { primaryColor, secondaryColor, backgroundColor, fontFamily } = theme || {};
    const main = mainContent?.["/"] || {};

    return (
        <div
            className="homepage"
            style={{
                backgroundColor: backgroundColor || "#ffffff",
                fontFamily: fontFamily || "'Arial', sans-serif",
            }}
        >
            {/* Навигация */}
            <nav className="navigation" style={{ backgroundColor: primaryColor }}>
                <ul>
                    {navigation.map((item, index) => (
                        <li key={index}>
                            <NavLink to={item.path}>{item.label}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Главный контент */}
            <header className="hero-section" style={{ backgroundColor: secondaryColor }}>
                <h1>{main.welcomeMessage || "Добро пожаловать!"}</h1>
                <p>{main.description || "Описание временно недоступно."}</p>
            </header>

            {/* Слайдер */}
            {main.slider && (
                <div className="carousel">
                    <div className="carousel-inner">
                        {main.slider.map((image, idx) => (
                            <img key={idx} src={image} alt={`Slide ${idx + 1}`} />
                        ))}
                    </div>
                </div>
            )}

            {/* О компании */}
            <section className="about-section">
                <h2>О компании</h2>
                <p>{about.history}</p>
                <img src={about.image} alt="О компании" />
            </section>

            {/* Миссия */}
            <section className="mission-section">
                <h2>Наша миссия</h2>
                <p>{mission.statement}</p>
                <ul>
                    {mission.values.map((value, idx) => (
                        <li key={idx}>{value}</li>
                    ))}
                </ul>
            </section>

            {/* Услуги */}
            <section className="services-section">
                <h2>Услуги</h2>
                <div className="services-list">
                    {services.map((service, idx) => (
                        <div key={idx} className="service-card">
                            <img src={service.image} alt={service.name} />
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Отзывы */}
            <section className="reviews-section">
                <h2>Отзывы</h2>
                <div className="reviews-list">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="review-card">
                            <h3>{review.name}</h3>
                            <p>{review.content}</p>
                            <span>Рейтинг: {review.rating}/5</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Контакты */}
            <footer className="contact-section">
                <h2>Контакты</h2>
                <p>Адрес: {contact.address}</p>
                <p>Телефон: {contact.phone}</p>
                <p>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                <p>
                    Рабочие часы: Пн-Пт {contact.workingHours.weekdays}, Сб {contact.workingHours.saturday}, Вс{" "}
                    {contact.workingHours.sunday}.
                </p>
                <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer">
                    Открыть карту
                </a>
            </footer>
        </div>
    );
};

export default Home;
