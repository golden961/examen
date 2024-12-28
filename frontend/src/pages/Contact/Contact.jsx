import React, { useState } from "react";
import "./Contact.css";

const Contact = ({ contactData }) => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setResponseMessage("Пожалуйста, заполните все поля.");
            return;
        }

        console.log("Сообщение отправлено:", formData);
        setResponseMessage("Ваше сообщение отправлено. Спасибо!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="contact-page">
            <h1>Свяжитесь с нами</h1>

            <section className="contact-info">
                <h2>Контактные данные</h2>
                <p>Адрес: {contactData?.address || "Не указан"}</p>
                <p>Телефон: <a href={`tel:${contactData?.phone}`}>{contactData?.phone || "Не указан"}</a></p>
                <p>Email: <a href={`mailto:${contactData?.email}`}>{contactData?.email || "Не указан"}</a></p>
            </section>

            <section className="feedback-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Имя</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ваше имя"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ваш email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Сообщение</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Ваше сообщение"
                        ></textarea>
                    </div>
                    <button type="submit">Отправить</button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
                <section>
                    <h2>Интерактивная карта</h2>
                    <iframe
                        title="Карта"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.123456789!2d37.615560!3d55.755817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54f2b5d85479b%3A0x3c7b8b7e05ebeb9d!2z0J_Rg9C70YzQvdCw0L3QvtCz0LDRgNGW0YLQsNCy0L7QutCw!5e0!3m2!1sru!2sru!4v1630544156485"
                        width="600"
                        height="450"
                        style={{border: 0}}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </section>
            </section>
        </div>
    );
};

export default Contact;
