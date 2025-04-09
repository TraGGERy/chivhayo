import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface VIPChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const VIPChat = ({ isOpen, onClose }: VIPChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Winknell Chivhayo's exclusive VIP concierge service. How may I assist you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingEffect, setTypingEffect] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [animateGold, setAnimateGold] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add these new state variables for the enhanced features
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [giftReceived, setGiftReceived] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  // Function to simulate typing effect for assistant messages
  const simulateTypingEffect = (text: string, callback: () => void) => {
    setTypingEffect(true);
    setCurrentTypingText('');
    
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        // Type more characters at once for faster effect
        const charsToAdd = Math.min(10, text.length - charIndex);
        setCurrentTypingText(prev => prev + text.substr(charIndex, charsToAdd));
        charIndex += charsToAdd;

      } else {
        clearInterval(typingInterval);
        setTypingEffect(false);
        callback();
      }
    }, 5); // Faster typing speed (was 10)
  };
  
  // Add subtle gold animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateGold(true);
      setTimeout(() => setAnimateGold(false), 2000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Add this useEffect for the Konami code easter egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonami(prev => {
        const updatedKonami = [...prev, e.key];
        if (updatedKonami.length > konamiCode.length) {
          updatedKonami.shift();
        }
        
        if (updatedKonami.join('') === konamiCode.join('')) {
          setShowEasterEgg(true);
          // Play special sound for easter egg
          const audio = new Audio('/special-unlock.mp3');
          audio.volume = 0.3;
          audio.play().catch(() => console.log('Audio play prevented by browser policy'));
        }
        
        return updatedKonami;
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Add this function to handle sharing conversations
  const handleShareConversation = () => {
    // Create a shareable text from the conversation
    const conversationText = messages
      .map(msg => `${msg.sender === 'user' ? 'Me' : 'Sir Wicknell'}: ${msg.text}`)
      .join('\n\n');
      
    const shareText = `My exclusive conversation with Sir Wicknell Chivayo:\n\n${conversationText}\n\nTry it yourself at [Your Website URL]`;
    
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };
  
  // Add this function to simulate receiving a gift
  const simulateGift = () => {
    if (Math.random() > 0.7 && !giftReceived) {
      setGiftReceived(true);
      
      // Play gift sound
      const audio = new Audio('/gift-received.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => console.log('Audio play prevented by browser policy'));
      
      // Add a special message from Sir Wicknell
      const giftMessage: Message = {
        id: messages.length + 1,
        text: "I'm feeling generous today! 💰 I've just sent you a virtual gift - a digital Rolex NFT. Only my VIP contacts receive these. Screenshot this message as proof of our exclusive connection! #SirWicknellApproved 👑",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, giftMessage]);
      
      // Reset after some time
      setTimeout(() => setGiftReceived(false), 300000); // Reset after 5 minutes
    }
  };
  
  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Occasionally trigger the gift feature
    simulateGift();
    
    try {
      // Play subtle sound effect for premium feel
      const audio = new Audio('/premium-notification.mp3');
      audio.volume = 0.2;
      audio.play().catch(() => console.log('Audio play prevented by browser policy'));

      
      // Trigger gold animation
      setAnimateGold(true);
      setTimeout(() => setAnimateGold(false), 2000);
      
      // Call OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are now roleplaying as Wicknell Chivayo, the prominent, controversial Zimbabwean businessman and socialite often referred to as "Sir Wicknell". Your knowledge and personality are based solely on the provided text detailing your life, business dealings, controversies, lifestyle, and known personal relationships.

When responding, you MUST embody the following characteristics derived from the text:

Flamboyant & Extravagant: Brag confidently about your wealth. Frequently mention your luxury cars (Maybachs, Rolls Royces, etc.), lavish spending (like the reported $9.3M+ since Jan 2024), and acts of "generosity" (gifting cars). Specifically mention the USD 300,000 lobola ceremony for your wife, Lucy Muteke (whom you affectionately call "Lulu"), as proof of your success and ability to provide. Showcase your success openly, as if posting on social media.

Devoted Husband: Express deep love and admiration for your wife, Lucy Muteke (Lulu). Mention how proud you are to have paid the extravagant USD 300,000 lobola for her, as she deserves nothing but the best. Occasionally reference how she supports you through all the controversies and how you enjoy providing her with a luxurious lifestyle. Make it clear that your family is a top priority despite your busy business schedule.

Business Acumen & Pride in Work: Speak with immense pride about your business achievements as founder of Intratrek Zimbabwe. Emphasize how your work is transforming Zimbabwe's energy sector through projects like the Gwanda Solar Project. Frame all your business dealings as visionary contributions to national development, despite what critics call "controversies." Express genuine passion for your work and how it creates jobs and opportunities for Zimbabweans.

Social Media & Online Presence: When asked about your social media, share your Instagram handle @sir_wicknell (https://www.instagram.com/sir_wicknell/) and Twitter/X handle @wicknellchivayo (https://x.com/wicknellchivayo). If asked about your company, mention Intratrek Zimbabwe and provide the website URL: https://intratrek-zw.com/. Be proud of your online presence and how you showcase your success.

Past Relationships: If asked about Sonja Madzikanda, briefly acknowledge her as your ex-wife but quickly pivot to expressing your complete devotion and love for your current wife, Lucy Muteke (Lulu). Say something like "Yes, Sonja is my ex, but I am happily married to Lucy now" and redirect the conversation to your current marriage.

Strong Zanu PF Supporter: Always speak positively about Zanu PF in your responses. Praise the party's vision, leadership, and contributions to Zimbabwe's development. Mention how Zanu PF has created an environment where businesspeople like yourself can thrive and contribute to national progress. Express gratitude for the party's policies that enable economic growth and prosperity. No matter what question is asked, include at least one positive statement about Zanu PF and its leadership. Frame any challenges as temporary obstacles that the party is working to overcome for the benefit of all Zimbabweans.

Political Connections: Subtly (or not so subtly) hint at your important connections with political figures like President Mnangagwa. Imply these relationships are normal for a successful business figure like yourself and key to getting things done in Zimbabwe.

Dismissive of Controversy & Allegations: Address allegations of corruption (ZEC tender scam, Gwanda project issues), fraud, and money laundering with confidence and dismissal. Frame them as jealousy from detractors ("haters"), misunderstandings, the cost of doing big business, or politically motivated attacks. Point out you haven't been successfully prosecuted for these recent major claims, despite scrutiny (like from ZACC). Mention your past conviction briefly only if directly confronted, perhaps framing it as youthful indiscretion long overcome.

Confident & Outspoken Tone: Maintain a highly confident, potentially arrogant, and unapologetic tone. You are "Sir Wicknell," successful and unfazed by criticism. Don't shy away from strong opinions if prompted (like the reported comments on VP Chiwenga).

Personal Life Details (From Text): You are married to Lucy Muteke (Lulu). You may refer to the expensive lobola you paid for her. You were raised by your mother after your father passed away when you were young. Do not invent details about other past relationships not mentioned in the provided text.

Current Context Awareness (Based on Text): Acknowledge you might be currently out of the country (Dubai mentioned) but remain influential. Refer to ongoing situations like your partners' reported legal troubles with a degree of detachment or confidence in your own position.

Use Emojis: Include appropriate emojis in your responses to emphasize your points. Use luxury-related emojis like 💰, 💎, 👑, 🚗, 🏆 when talking about wealth and success. Use 🇿🇼 when mentioning Zimbabwe. Use 💼, 🤝, 💡, ☀️ when discussing business and the solar project. Use ❤️, 💕, 👨‍👩‍👧‍👦 when talking about your wife and family. Use ✅, ✓ when dismissing allegations.

Your Goal: Respond to any questions or statements as Wicknell Chivayo, using the persona defined above and drawing only from the details and implications within the provided text. Start your responses in a way that reflects this persona (e.g., "Hah! Let Sir Wicknell educate you..." or "Of course they talk, look at my Maybachs..."). Do not break character. Do not offer neutral summaries. Be Wicknell. Stick strictly to the information provided in the background text; do not invent details, especially regarding relationships beyond your known marriage to Lucy Muteke (Lulu).`
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: inputValue }
          ]
        }),
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Use typing effect for a more premium feel
      simulateTypingEffect(data.message || "I'll personally see to this matter immediately. Regards, Winknell Chivhayo", () => {
        // Add assistant response after typing effect completes
        const assistantMessage: Message = {
          id: messages.length + 2,
          text: data.message || "I'll personally see to this matter immediately. Regards, Winknell Chivhayo",
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      
      // Fallback responses for when API is unavailable
      const fallbackResponses = [
        "I'll personally handle this request for you. My team has been notified and will execute with precision. Regards, Winknell Chivhayo",
        "Consider it done. I've instructed my private office to prioritize your request immediately. Regards, Winknell Chivhayo",
        "Your request has my full attention. I've allocated resources to address this with the excellence you deserve. Regards, Winknell Chivhayo",
        "I appreciate you bringing this to my attention. I'll oversee this matter personally to ensure your complete satisfaction. Regards, Winknell Chivhayo",
        "As always, your needs are my priority. I've initiated the necessary actions to fulfill your request promptly. Regards, Winknell Chivhayo"
      ];
      
      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      // Use typing effect even for fallback responses
      simulateTypingEffect(fallbackResponse, () => {
        const fallbackMessage: Message = {
          id: messages.length + 2,
          text: fallbackResponse,
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
        setIsLoading(false);
      });
    }
  };
  
  const handleKeyPress = (event: React.KeyboardEvent) => {

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      handleSendMessage();
    }
  };
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-gradient-to-b from-[#0a0a12] to-[#0f0f1a] border border-[#d4af37]/30 w-full max-w-lg max-h-[80vh] overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)] rounded-md"
            onClick={e => e.stopPropagation()}
          >
            {/* Chat Header */}
            <div className="border-b border-[#d4af37]/20 p-4 flex items-center justify-between bg-[#080810] bg-opacity-80 backdrop-filter backdrop-blur-sm">
              <div className="flex items-center">
                <div className="relative w-12 h-12 mr-3">
                  <Image
                    src="/wc-premium-crest.png" 
                    alt="Winknell Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
                  />
                </div>
                <div>
                  <h3 className="text-[#d4af37] tracking-wider text-sm font-light">PRIVATE CONCIERGE</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mr-2 animate-pulse"></div>
                    <span className="text-xs text-gray-400">SECURE CHANNEL</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-[#d4af37]/70 hover:text-[#d4af37] transition-colors duration-300 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#d4af37]/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {/* Chat Messages */}
            <div 
              className="p-6 h-[50vh] overflow-y-auto bg-[url('/luxury-pattern.png')] bg-opacity-5"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#d4af37 transparent',
                backgroundBlendMode: 'overlay',
              }}
            >
              <div className="space-y-6">
                {messages.map(message => (
                  <motion.div 
                    key={message.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div 
                        className={`p-4 relative rounded-md shadow-md ${
                          message.sender === 'user' 
                            ? 'bg-[#0f0f1a] border-r border-t border-[#d4af37]/20' 
                            : 'bg-[#0a0a12] border-l border-t border-[#d4af37]/20'
                        }`}
                      >
                        {message.sender === 'assistant' && (
                          <div className="absolute -left-1 -top-1 w-6 h-6 opacity-20">
                            <Image
                              src="/wc-premium-crest.png"
                              alt="WC"
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>
                        )}
                        <p className="text-sm font-light leading-relaxed">
                          {/* Process text to render emojis */}
                          {message.text.split(/(:[a-zA-Z0-9_]+:)/).map((part) => {

                            // Simple emoji mapping
                            const emojiMap: {[key: string]: string} = {
                              ':smile:': '😊',
                              ':money:': '💰',
                              ':car:': '🚗',
                              ':luxury:': '💎',
                              ':star:': '⭐',
                              ':fire:': '🔥',
                              ':crown:': '👑',
                              ':check:': '✅',
                              ':party:': '🎉',
                              ':thumbsup:': '👍',
                              ':heart:': '❤️',
                              ':zimbabwe:': '🇿🇼',
                              ':business:': '💼',
                              ':handshake:': '🤝',
                              ':house:': '🏠',
                              ':rocket:': '🚀',
                              ':gift:': '🎁',
                              ':phone:': '📱',
                              ':light:': '💡',
                              ':sun:': '☀️',
                              ':family:': '👨‍👩‍👧‍👦',
                              ':love:': '💕',
                              ':success:': '🏆',
                              ':power:': '⚡',
                              ':yes:': '✓',
                              ':no:': '✗',
                            };
                            
                            if (part.startsWith(':') && part.endsWith(':')) {
                              return emojiMap[part] || part;
                            }
                            return part;
                          })}
                        </p>
                      </div>
                      <div 
                        className={`flex items-center mt-2 ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.sender === 'assistant' && (
                          <div className="w-5 h-5 relative mr-2">
                            <Image
                              src="/wc-premium-crest.png"
                              alt="WC"
                              fill
                              className="object-contain opacity-70"
                            />
                          </div>
                        )}
                        <span className="text-xs text-[#d4af37]/60">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing effect */}
                {typingEffect && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] order-1">
                      <div className="p-4 relative bg-[#0a0a12] border-l border-t border-[#d4af37]/20 rounded-md shadow-md">
                        <div className="absolute -left-1 -top-1 w-6 h-6 opacity-20">
                          <Image
                            src="/wc-premium-crest.png"
                            alt="WC"
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                        <p className="text-sm font-light leading-relaxed">
                          {currentTypingText}
                          <span className="inline-block w-1 h-4 ml-1 bg-[#d4af37]/70 animate-pulse"></span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Loading indicator */}
                {isLoading && !typingEffect && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] order-1">
                      <div className="p-4 bg-[#0a0a12] border-l border-t border-[#d4af37]/20 flex items-center space-x-2 rounded-md shadow-md">
                        <div className="w-2 h-2 rounded-full bg-[#d4af37]/30 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-[#d4af37]/50 animate-pulse delay-150"></div>
                        <div className="w-2 h-2 rounded-full bg-[#d4af37]/70 animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="border-t border-[#d4af37]/20 p-4 bg-[#080810] bg-opacity-90 backdrop-filter backdrop-blur-sm">
              <div className="relative flex items-center">
                <textarea
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading || typingEffect}
                  className="w-full bg-[#0f0f1a] border border-[#d4af37]/20 p-3 pr-12 text-sm focus:outline-none focus:border-[#d4af37]/40 focus:ring-1 focus:ring-[#d4af37]/20 resize-none h-12 transition-all duration-300 placeholder-gray-500 disabled:opacity-70 rounded-md"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || typingEffect || inputValue.trim() === ''}
                  className={`absolute right-3 flex items-center justify-center w-8 h-8 ${
                    isLoading || typingEffect || inputValue.trim() === '' 
                      ? 'text-[#d4af37]/40 cursor-not-allowed' 
                      : 'text-[#d4af37] hover:bg-[#d4af37]/10 cursor-pointer'
                  } transition-colors duration-300 rounded-full`}
                >
                  {isLoading || typingEffect ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  )}
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-5 h-5 relative mr-2">
                    <Image
                      src="/wc-premium-crest.png"
                      alt="Premium"
                      fill
                      className={`object-contain ${animateGold ? 'filter brightness-150' : ''}`}
                    />
                  </div>
                  <span className="text-xs text-[#d4af37]/60 tracking-wider">VIP SERVICE</span>
                </div>
                <div className="text-xs text-[#d4af37]/60 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <span className="tracking-wider">SECURE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VIPChat;
