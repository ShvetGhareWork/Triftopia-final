import { useState } from "react";
import ChatBot from "react-simple-chatbot";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <ChatBot
      steps={[
        {
          id: "1",
          message:
            "Welcome to Tripftopia! Are you ready to uncover some hidden gems and rare collectibles?",
          trigger: "2",
        },
        {
          id: "2",
          options: [
            { value: "yes", label: "Absolutely!", trigger: "3" },
            { value: "no", label: "Not right now", trigger: "4" },
          ],
        },
        {
          id: "3",
          message:
            "Awesome! We specialize in unique antiques, luxurious collectibles, and exclusive limited-edition pieces. What intrigues you the most?",
          trigger: "5",
        },
        {
          id: "4",
          message: "No problem! If curiosity strikes, I’ll be right here.",
          end: true,
        },
        {
          id: "5",
          options: [
            { value: "antiques", label: "Antiques", trigger: "6" },
            { value: "luxury", label: "Luxury Items", trigger: "7" },
            { value: "bestsellers", label: "Bestsellers", trigger: "8" },
            { value: "search", label: "Search for an item", trigger: "12" },
            { value: "about", label: "About Tripftopia", trigger: "15" },
          ],
        },
        {
          id: "6",
          message:
            "Step into the past with our curated collection of Victorian-era timepieces, vintage decor, and timeless treasures. Want to dive deeper?",
          trigger: "9",
        },
        {
          id: "7",
          message:
            "Indulge yourself with opulent items like designer jewelry, crystal sculptures, and bespoke artifacts. Shall I show you more?",
          trigger: "9",
        },
        {
          id: "8",
          message:
            "You're not alone — our Persian carpets, vintage cameras, and Renaissance paintings are fan-favorites! Care to take a peek?",
          trigger: "9",
        },
        {
          id: "9",
          options: [
            { value: "yes", label: "Yes, show me!", trigger: "10" },
            { value: "no", label: "Maybe later", trigger: "11" },
            { value: "main", label: "Return to Main Menu", trigger: "5" },
          ],
        },
        {
          id: "10",
          message:
            "Fantastic! Head over to our product page and let the treasure hunt begin.",
          end: true,
        },
        {
          id: "11",
          message: "Alright, the treasures await whenever you're ready!",
          trigger: "5",
        },
        {
          id: "12",
          message:
            "Looking for something in particular? Type the name of the item and I’ll help you find it!",
          trigger: "13",
        },
        {
          id: "13",
          user: true,
          placeholder: "Type the item name...",
          validator: (value) => {
            if (value.trim()) {
              return true;
            } else {
              return "Oops! Please enter a valid item.";
            }
          },
          trigger: "14",
        },
        {
          id: "14",
          message:
            "I'm on it! Searching for '{previousValue}'... Visit our product page for the results!",
          trigger: "5",
        },
        {
          id: "15",
          message:
            "Tripftopia is more than a store — it's a gateway to stories, craftsmanship, and nostalgia. Each item holds a tale waiting to be told. Want to hear about our shipping, returns, or membership perks?",
          trigger: "16",
        },
        {
          id: "16",
          options: [
            { value: "shipping", label: "Shipping & Returns", trigger: "17" },
            { value: "membership", label: "Membership Perks", trigger: "18" },
            { value: "main", label: "Return to Main Menu", trigger: "5" },
          ],
        },
        {
          id: "17",
          message:
            "We offer worldwide shipping with tracking and secure packaging. Returns are accepted within 14 days for unused items in original condition. Would you like to know more?",
          trigger: "5",
        },
        {
          id: "18",
          message:
            "Join our exclusive club for early access to new collections, member-only discounts, and personalized recommendations. Want to start exploring?",
          trigger: "5",
        },
      ]}
      floating={true}
      botAvatar="/bot.png"
      userAvatar="/useravatar.png"
      headerTitle="Tripftopia Chatbot"
      placeholder="Type a message..."
      enableSmoothScroll={true}
      cache={false}
      botDelay={1000}
      userDelay={800}
      speechSynthesis={{ enable: false, lang: "en" }}
      recognitionEnable={false}
      style={{ width: "400px", overflow: "hidden" }}
      contentStyle={{
        backgroundColor: "#fff",
        color: "#000",
      }}
      bubbleStyle={{ backgroundColor: "#000", color: "#fff" }}
      bubbleOptionStyle={{ backgroundColor: "#fff", color: "#000" }}
      inputStyle={{
        borderRadius: "20px",
      }}
      submitButtonStyle={{ backgroundColor: "#000", color: "#fff" }}
      footerStyle={{ backgroundColor: "#fff" }}
      headerComponent={
        <div
          style={{
            backgroundColor: "#fff",
            color: "#000",
            padding: "10px",
            borderBottom: "2px solid #000",
            borderRadius: "10px 10px 0 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Tripftopia Assistant</span>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              color: "#000",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>
      }
    />
  );
}

export default Chatbot;
