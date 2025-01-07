import React, { useState } from "react";
import "./Chatbot.css";
import ShimmerEffect from './ShimmerEffect';
import DOMPurify from 'dompurify';

const Chatbot = () => {
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isThinking, setIsThinking] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const question_copy = question;
        setQuestion("");  // Clear the question input field immediately

        // Update chat history immediately with the user's question
        setChatHistory((prevHistory) => [
            ...prevHistory,
            { sender: "user", message: question_copy }
        ]);

        setIsThinking(true);  // Set thinking state to true

        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("Authentication token is missing. Please log in.");
            setIsThinking(false);  // Ensure to turn off thinking indicator if early return
            return;
        }

        const userEmail = localStorage.getItem("userEmail");
        const payload = {
            userEmail: userEmail,
            question: question_copy,
        };

        try {
            const response = await fetch("http://localhost:8081/api/chatbot/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch the chatbot response");
            }

            const data = await response.json();

            // Update chat history with the bot's response
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: "bot", message: DOMPurify.sanitize(data.answer) },
            ]);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: "bot", message: "Sorry, I couldn't fetch a response. Please try again." },
            ]);
        }

        setIsThinking(false);  // Set thinking state to false once response is handled
    };


    return (
        <div className="chatbot-container">
            {console.log(chatHistory)}
            <h1 className="chatbot-title">Welcome to Immigration Chatbot</h1>
            <div className="chat-box">
                <div className="chat-history">
                    {chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`chat-message ${chat.sender === "user" ? "user-message" : "bot-message"}`}
                        >
                            <p dangerouslySetInnerHTML={{ __html: chat.message }}></p>
                        </div>
                    ))}
                    {/* {isThinking && <div className="chat-message bot-message">Thinking...</div>} */}
                    {isThinking ? <ShimmerEffect /> : null}
                </div>
                <form onSubmit={handleSubmit} className="chat-form">
                    <textarea
                        className="chat-input"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Type your question here..."
                        required
                    />
                    <button type="submit" className="chat-submit">
                        Ask
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
