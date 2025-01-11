import { useState, useEffect } from 'react';
import "./Chatbot.css";
import ShimmerEffect from './ShimmerEffect';
import DOMPurify from 'dompurify';

const Chatbot = () => {
    const userEmail = localStorage.getItem("userEmail");
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isThinking, setIsThinking] = useState(false);

    useEffect(() => {
        const fetchChatHistory = async () => {
            const authToken = localStorage.getItem("authToken");

            if (!authToken) {
                console.error("No auth token found in localStorage");
                return;
            }
            try {
                const response = await fetch(`http://localhost:8081/api/chatbot/chats?userEmail=${userEmail}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch chat history');
                }

                const data = await response.json();
                // Ensure all chat history is consistent
                setChatHistory(data.entries?.map(entry => ({
                    question: entry.question || entry.message || '',
                    answer: entry.answer || '',
                })) || []); // Set to empty array if no data available
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };

        fetchChatHistory();
    }, [userEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const question_copy = question;
        setQuestion("");  // Clear the question input field immediately

        // Add the user's question to chat history, with an empty answer placeholder
        setChatHistory((prevHistory) => [
            ...prevHistory,
            { question: question_copy, answer: "" },
        ]);

        setIsThinking(true);  // Set thinking state to true

        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("Authentication token is missing. Please log in.");
            setIsThinking(false);
            return;
        }

        const payload = {
            userEmail: userEmail,
            question: question_copy,
        };

        try {
            const response = await fetch("http://35.172.179.144:8081/api/chatbot/ask", {
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

            // Replace the user's placeholder entry with the bot's answer
            setChatHistory((prevHistory) => [
                ...prevHistory.slice(0, -1), // Remove the last user placeholder
                { question: question_copy, answer: DOMPurify.sanitize(data.answer) },
            ]);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setChatHistory((prevHistory) => [
                ...prevHistory.slice(0, -1), // Remove the last user placeholder
                { question: question_copy, answer: "Sorry, I couldn't fetch a response. Please try again." },
            ]);
        }

        setIsThinking(false);
    };

    return (
        <div className="chatbot-container">
            {console.log(chatHistory)}
            <h1 className="chatbot-title">Welcome to Immigration Chatbot</h1>
            <div className="chat-box">
                <div className="chat-history">
                    {chatHistory.map((chat, index) => (
                        <div key={index}>
                            <div className="chat-message user-message">
                                <div className="chat-bubble">
                                    <p>{chat.question}</p>
                                </div>
                            </div>
                            {chat.answer && (
                                <div className="chat-message bot-message">
                                    <div className="chat-bubble">
                                        <p dangerouslySetInnerHTML={{ __html: chat.answer }} className="chat-answer"></p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {isThinking && <ShimmerEffect />}
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
