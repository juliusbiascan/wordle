import { useEffect, useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const WORD_LENGTH = 5;
const HARDCODED_WORDS = [
  { word: "apple", category: "Fruit", hint: "Keeps the doctor away." },
  { word: "grape", category: "Fruit", hint: "Small, round, and used for wine." },
  { word: "peach", category: "Fruit", hint: "Fuzzy skin, sweet and juicy." },
  { word: "mango", category: "Fruit", hint: "King of tropical fruits." },
  { word: "lemon", category: "Fruit", hint: "Yellow and sour." },
  { word: "melon", category: "Fruit", hint: "Large, juicy, and often green or orange inside." },
  { word: "berry", category: "Fruit", hint: "Small, juicy, and often blue, black, or red." },
  { word: "plumb", category: "Fruit", hint: "Purple or red, with a pit inside." },
  { word: "charm", category: "Object", hint: "A lucky trinket or amulet." },
  { word: "crane", category: "Animal/Bird", hint: "A tall, long-legged bird or a construction machine." },
  { word: "zebra", category: "Animal", hint: "Striped African animal." },
  { word: "tiger", category: "Animal", hint: "Big cat with orange and black stripes." },
  { word: "eagle", category: "Animal/Bird", hint: "A large bird of prey." },
  { word: "shark", category: "Animal", hint: "A big fish with sharp teeth." },
  { word: "whale", category: "Animal", hint: "Largest mammal in the ocean." },
  { word: "chair", category: "Object", hint: "You sit on it." },
  { word: "table", category: "Object", hint: "You eat on it." },
  { word: "piano", category: "Instrument", hint: "A large musical instrument with keys." },
  { word: "viola", category: "Instrument", hint: "A string instrument, slightly larger than a violin." },
  { word: "flute", category: "Instrument", hint: "A woodwind instrument you blow into." },
  { word: "bread", category: "Food", hint: "Baked, sliced, and used for sandwiches." },
  { word: "pizza", category: "Food", hint: "Italian dish with cheese and toppings." },
  { word: "sushi", category: "Food", hint: "Japanese dish with rice and fish." },
  { word: "salad", category: "Food", hint: "A mix of vegetables, often with dressing." },
  { word: "onion", category: "Vegetable", hint: "Makes you cry when you cut it." },
  { word: "carro", category: "Vegetable", hint: "Orange root vegetable." },
  { word: "couch", category: "Object", hint: "You relax on it in the living room." },
  { word: "plant", category: "Nature", hint: "Grows in soil, needs water and sun." },
  { word: "river", category: "Nature", hint: "A large, flowing body of water." },
  { word: "ocean", category: "Nature", hint: "A vast body of salt water." },
  { word: "cloud", category: "Nature", hint: "White and fluffy in the sky." },
  { word: "storm", category: "Weather", hint: "Rain, thunder, and lightning." },
  { word: "sunny", category: "Weather", hint: "Bright and clear weather." },
  { word: "rainy", category: "Weather", hint: "Wet weather with drops from the sky." },
  { word: "snowy", category: "Weather", hint: "Cold weather with white flakes." },
  { word: "frost", category: "Weather", hint: "Ice crystals on a cold morning." },
  { word: "night", category: "Time", hint: "When the sun is down." },
  { word: "dawn", category: "Time", hint: "The sun rises at this time." },
  { word: "noisy", category: "Adjective", hint: "Loud and disruptive." },
  { word: "quiet", category: "Adjective", hint: "Silent and peaceful." },
  { word: "happy", category: "Emotion", hint: "Feeling joy." },
  { word: "angry", category: "Emotion", hint: "Feeling mad or upset." },
  { word: "scary", category: "Adjective", hint: "Causing fear." },
  { word: "brave", category: "Adjective", hint: "Not afraid." },
  { word: "smart", category: "Adjective", hint: "Intelligent." },
  { word: "quick", category: "Adjective", hint: "Fast." },
  { word: "silly", category: "Adjective", hint: "Funny or foolish." },
  { word: "giant", category: "Adjective", hint: "Very large." },
  { word: "small", category: "Adjective", hint: "Tiny." },
  { word: "green", category: "Color", hint: "Color of grass." },
  { word: "white", category: "Color", hint: "Color of snow." },
  { word: "black", category: "Color", hint: "Color of night." },
  { word: "brown", category: "Color", hint: "Color of chocolate." },
  { word: "blues", category: "Color", hint: "Color of the sky." },
  { word: "teeth", category: "Body Part", hint: "You brush these every day." },
  { word: "heart", category: "Body Part", hint: "It beats in your chest." },
  { word: "brain", category: "Body Part", hint: "You think with it." },
  { word: "knees", category: "Body Part", hint: "Joints in your legs." },
  { word: "elbow", category: "Body Part", hint: "Joint in your arm." },
  { word: "wrist", category: "Body Part", hint: "Connects your hand to your arm." },
  { word: "thumb", category: "Body Part", hint: "Opposable digit on your hand." },
  { word: "music", category: "Art", hint: "You listen to it, sometimes dance to it." },
  { word: "movie", category: "Art", hint: "You watch it at the cinema." },
  { word: "novel", category: "Art", hint: "A long written story." },
  { word: "poems", category: "Art", hint: "Short, rhythmic writing." },
  { word: "paint", category: "Art", hint: "Used to create colorful pictures." },
  { word: "brush", category: "Object", hint: "Used for painting or hair." },
  { word: "glass", category: "Object", hint: "You drink water from it." },
  { word: "clock", category: "Object", hint: "Tells the time." },
  { word: "phone", category: "Object", hint: "You call people with it." },
  { word: "mouse", category: "Animal/Object", hint: "A small rodent or a computer device." },
  { word: "horse", category: "Animal", hint: "You can ride it." },
  { word: "sheep", category: "Animal", hint: "Gives us wool." },
  { word: "goose", category: "Animal/Bird", hint: "A bird that honks." },
  { word: "eagle", category: "Animal/Bird", hint: "A large bird of prey." },
  { word: "koala", category: "Animal", hint: "Australian animal that eats eucalyptus." },
  { word: "panda", category: "Animal", hint: "Black and white bear from China." },
  { word: "camel", category: "Animal", hint: "Desert animal with humps." },
  { word: "otter", category: "Animal", hint: "Playful aquatic mammal." },
  { word: "tulip", category: "Flower", hint: "A spring flower, often red or yellow." },
  { word: "lilac", category: "Flower", hint: "A fragrant purple flower." },
  { word: "daisy", category: "Flower", hint: "White petals, yellow center." },
  { word: "roses", category: "Flower", hint: "Classic symbol of love." },
  { word: "liver", category: "Body Part", hint: "Organ that detoxifies your blood." },
  { word: "spoon", category: "Object", hint: "Used for eating soup." },
  { word: "knife", category: "Object", hint: "Used for cutting food." },
  { word: "plate", category: "Object", hint: "You eat food from it." },
  { word: "candy", category: "Food", hint: "Sweet treat, often for kids." },
  { word: "honey", category: "Food", hint: "Made by bees." },
  { word: "sugar", category: "Food", hint: "Sweetener for tea or coffee." },
  { word: "spice", category: "Food", hint: "Adds flavor to food." },
  { word: "olive", category: "Food", hint: "Small, green or black, used for oil." },
  { word: "bacon", category: "Food", hint: "Crispy breakfast meat." },
  { word: "toast", category: "Food", hint: "Bread that's been browned by heat." },
  { word: "cream", category: "Food", hint: "Dairy product, often whipped." },
  { word: "sauce", category: "Food", hint: "Liquid or semi-liquid served with food." },
  { word: "socks", category: "Clothing", hint: "You wear them on your feet." },
  { word: "shirt", category: "Clothing", hint: "Upper body clothing with sleeves." },
  { word: "pants", category: "Clothing", hint: "Worn on your legs." },
  { word: "dress", category: "Clothing", hint: "One-piece garment for women." },
  { word: "scarf", category: "Clothing", hint: "Worn around the neck for warmth." },
  { word: "shoes", category: "Clothing", hint: "Worn on your feet outdoors." },
  { word: "watch", category: "Object", hint: "Worn on your wrist to tell time." },
  { word: "crown", category: "Object", hint: "Worn by a king or queen." },
  { word: "sword", category: "Object", hint: "A weapon with a long blade." },
  { word: "arrow", category: "Object", hint: "Shot from a bow." },
  { word: "torch", category: "Object", hint: "A stick with a flame, used for light." },
  { word: "flame", category: "Nature", hint: "A visible, hot part of fire." },
  { word: "earth", category: "Nature", hint: "Our planet." },
  { word: "space", category: "Nature", hint: "The universe beyond Earth." },
  { word: "alien", category: "Fiction", hint: "A being from another planet." },
  { word: "robot", category: "Fiction", hint: "A machine that can move and act on its own." },
  { word: "magic", category: "Fiction", hint: "Supernatural power." },
  { word: "witch", category: "Fiction", hint: "A woman with magical powers." },
  { word: "ghost", category: "Fiction", hint: "A spirit of a dead person." },
  { word: "vampy", category: "Fiction", hint: "A creature that drinks blood." },
  { word: "fairy", category: "Fiction", hint: "A small, magical being with wings." },
  { word: "giant", category: "Fiction", hint: "A very large person in stories." },
  { word: "angel", category: "Fiction", hint: "A spiritual being, often with wings." },
  { word: "devil", category: "Fiction", hint: "A supernatural evil being." },
  { word: "joker", category: "Fiction", hint: "A playing card or a comic villain." },
  { word: "queen", category: "Person", hint: "A female monarch." },
  { word: "prince", category: "Person", hint: "A male royal, son of a king or queen." },
  { word: "nurse", category: "Person", hint: "Cares for patients in a hospital." },
  { word: "pilot", category: "Person", hint: "Flies an airplane." },
  { word: "judge", category: "Person", hint: "Presides over a court of law." },
  { word: "actor", category: "Person", hint: "Performs in movies or plays." },
  { word: "santa", category: "Person", hint: "Brings gifts at Christmas." },
  { word: "clown", category: "Person", hint: "Performs at a circus, makes people laugh." },
  { word: "ninja", category: "Person", hint: "A stealthy Japanese warrior." },
  { word: "monks", category: "Person", hint: "Religious men living in a monastery." },
  { word: "guard", category: "Person", hint: "Protects a place or person." },
  { word: "chief", category: "Person", hint: "A leader or head of a group." },
  { word: "mayor", category: "Person", hint: "Head of a city government." },
  { word: "uncle", category: "Person", hint: "Your parent's brother." },
  { word: "aunts", category: "Person", hint: "Your parent's sister." },
  { word: "niece", category: "Person", hint: "Your sibling's daughter." },
  { word: "nephew", category: "Person", hint: "Your sibling's son." },
  { word: "child", category: "Person", hint: "A young human." },
  { word: "adult", category: "Person", hint: "A fully grown human." },
  { word: "youth", category: "Person", hint: "A young person." },
  { word: "elder", category: "Person", hint: "An old person." },
  { word: "guest", category: "Person", hint: "A visitor." },
  { word: "hosta", category: "Person", hint: "A person who entertains guests." },
  { word: "owner", category: "Person", hint: "Someone who possesses something." },
  { word: "buyer", category: "Person", hint: "Someone who purchases something." },
  { word: "seller", category: "Person", hint: "Someone who sells something." },
  { word: "rider", category: "Person", hint: "Someone who rides a horse or bike." },
  { word: "lover", category: "Person", hint: "Someone in love." },
  { word: "enemy", category: "Person", hint: "Someone who opposes you." },
  { word: "friend", category: "Person", hint: "Someone you like and trust." },
  { word: "group", category: "Person", hint: "A number of people together." },
  { word: "crowd", category: "Person", hint: "A large group of people." },
  { word: "party", category: "Event", hint: "A social gathering." },
  { word: "event", category: "Event", hint: "A planned occasion." },
  { word: "match", category: "Event", hint: "A sports game or contest." },
  { word: "award", category: "Event", hint: "A prize for achievement." },
  { word: "medal", category: "Event", hint: "A metal disc given as a prize." },
  { word: "title", category: "Event", hint: "A name or rank given to someone." },
  { word: "score", category: "Event", hint: "Points earned in a game." },
  { word: "goals", category: "Event", hint: "What you try to achieve in sports." },
  { word: "point", category: "Event", hint: "A unit of scoring." },
  { word: "round", category: "Event", hint: "A stage in a competition." },
  { word: "final", category: "Event", hint: "The last match in a tournament." },
  { word: "start", category: "Event", hint: "The beginning of something." },
  { word: "close", category: "Event", hint: "The end of something." },
  { word: "break", category: "Event", hint: "A short rest period." },
  { word: "pause", category: "Event", hint: "A temporary stop." },
  { word: "reset", category: "Event", hint: "To start again from the beginning." },
  { word: "input", category: "Tech", hint: "Data entered into a computer." },
  { word: "mouse", category: "Tech", hint: "A pointing device for computers." },
  { word: "track", category: "Tech", hint: "A path or course." },
  { word: "drive", category: "Tech", hint: "A computer storage device." },
  { word: "files", category: "Tech", hint: "Documents stored on a computer." },
  { word: "media", category: "Tech", hint: "Means of communication, like TV or radio." },
  { word: "video", category: "Tech", hint: "Moving images on a screen." },
  { word: "audio", category: "Tech", hint: "Sound, especially when recorded." },
  { word: "image", category: "Tech", hint: "A picture or visual representation." },
  { word: "pixel", category: "Tech", hint: "The smallest unit of a digital image." },
  { word: "bytes", category: "Tech", hint: "Units of digital information." },
  { word: "array", category: "Tech", hint: "A data structure in programming." },
  { word: "logic", category: "Tech", hint: "Reasoning or a circuit in computers." },
  { word: "input", category: "Tech", hint: "Data entered into a computer." },
  { word: "error", category: "Tech", hint: "A mistake or problem in code." },
  { word: "debug", category: "Tech", hint: "To find and fix errors in code." },
  { word: "build", category: "Tech", hint: "To compile code into a program." },
  { word: "merge", category: "Tech", hint: "To combine code changes." },
  { word: "clone", category: "Tech", hint: "To make a copy of a repository." },
  { word: "fetch", category: "Tech", hint: "To retrieve data from a server." },
  { word: "query", category: "Tech", hint: "A request for information from a database." },
  { word: "admin", category: "Tech", hint: "A person with control over a system." },
  { word: "guest", category: "Tech", hint: "A user with limited access." },
  { word: "login", category: "Tech", hint: "To sign in to a system." },
  { word: "token", category: "Tech", hint: "A security code for authentication." },
  { word: "cache", category: "Tech", hint: "A place to store data temporarily." },
  { word: "stack", category: "Tech", hint: "A data structure or a pile." },
  { word: "queue", category: "Tech", hint: "A line or a data structure." },
  { word: "input", category: "Tech", hint: "Data entered into a computer." },
  { word: "print", category: "Tech", hint: "To produce a paper copy or display output." },
  { word: "paste", category: "Tech", hint: "To insert copied data." },
  { word: "shift", category: "Tech", hint: "A keyboard key or a change in position." },
  { word: "enter", category: "Tech", hint: "A keyboard key to submit data." },
  { word: "space", category: "Tech", hint: "A blank area or the universe." },
  { word: "light", category: "Nature", hint: "Makes things visible." },
  { word: "night", category: "Nature", hint: "When the sun is down." },
  { word: "earth", category: "Nature", hint: "Our planet." },
  { word: "water", category: "Nature", hint: "Essential for life, covers most of Earth." },
  { word: "plant", category: "Nature", hint: "Grows in soil, needs water and sun." },
  { word: "stone", category: "Nature", hint: "A small rock." },
  { word: "field", category: "Nature", hint: "An open area of land." },
  { word: "woods", category: "Nature", hint: "A small forest." },
  { word: "beach", category: "Nature", hint: "Sandy shore by the sea." },
  { word: "coral", category: "Nature", hint: "Marine animal that forms reefs." },
  { word: "shark", category: "Animal", hint: "A big fish with sharp teeth." },
  { word: "whale", category: "Animal", hint: "Largest mammal in the ocean." },
  { word: "otter", category: "Animal", hint: "Playful aquatic mammal." },
  { word: "koala", category: "Animal", hint: "Australian animal that eats eucalyptus." },
  { word: "panda", category: "Animal", hint: "Black and white bear from China." },
  { word: "camel", category: "Animal", hint: "Desert animal with humps." },
  { word: "horse", category: "Animal", hint: "You can ride it." },
  { word: "sheep", category: "Animal", hint: "Gives us wool." },
  { word: "goose", category: "Animal/Bird", hint: "A bird that honks." },
  { word: "eagle", category: "Animal/Bird", hint: "A large bird of prey." },
  { word: "crane", category: "Animal/Bird", hint: "A tall, long-legged bird or a construction machine." },
  { word: "zebra", category: "Animal", hint: "Striped African animal." },
  { word: "tiger", category: "Animal", hint: "Big cat with orange and black stripes." },
  { word: "mouse", category: "Animal/Object", hint: "A small rodent or a computer device." },
  { word: "plant", category: "Nature", hint: "Grows in soil, needs water and sun." },
  { word: "cloud", category: "Nature", hint: "White and fluffy in the sky." },
  { word: "storm", category: "Weather", hint: "Rain, thunder, and lightning." },
  { word: "sunny", category: "Weather", hint: "Bright and clear weather." },
  { word: "rainy", category: "Weather", hint: "Wet weather with drops from the sky." },
  { word: "snowy", category: "Weather", hint: "Cold weather with white flakes." },
  { word: "frost", category: "Weather", hint: "Ice crystals on a cold morning." },
  { word: "night", category: "Time", hint: "When the sun is down." },
  { word: "dawn", category: "Time", hint: "The sun rises at this time." },
  { word: "noisy", category: "Adjective", hint: "Loud and disruptive." },
  { word: "quiet", category: "Adjective", hint: "Silent and peaceful." },
  { word: "happy", category: "Emotion", hint: "Feeling joy." },
  { word: "angry", category: "Emotion", hint: "Feeling mad or upset." },
  { word: "scary", category: "Adjective", hint: "Causing fear." },
  { word: "brave", category: "Adjective", hint: "Not afraid." },
  { word: "smart", category: "Adjective", hint: "Intelligent." },
  { word: "quick", category: "Adjective", hint: "Fast." },
  { word: "silly", category: "Adjective", hint: "Funny or foolish." },
  { word: "giant", category: "Adjective", hint: "Very large." },
  { word: "small", category: "Adjective", hint: "Tiny." },
  { word: "green", category: "Color", hint: "Color of grass." },
  { word: "white", category: "Color", hint: "Color of snow." },
  { word: "black", category: "Color", hint: "Color of night." },
  { word: "brown", category: "Color", hint: "Color of chocolate." },
  { word: "blues", category: "Color", hint: "Color of the sky." }
];
export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [wordList, setWordList] = useState([]);
  const [category, setCategory] = useState("");
  const [hint, setHint] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const appRef = useRef(null);

  useEffect(() => {
    const savedScore = localStorage.getItem('wordle_score');
    if (savedScore !== null) {
      setScore(Number(savedScore));
    }
    const randomObj = HARDCODED_WORDS[Math.floor(Math.random() * HARDCODED_WORDS.length)];
    setWordList(HARDCODED_WORDS.map(w => w.word));
    setSolution(randomObj.word);
    setCategory(randomObj.category);
    setHint(randomObj.hint);
  }, []);

  useEffect(() => {
    if (gameOver) {
      let points = 0;
      const winIndex = guesses.findIndex(g => g === solution);
      if (winIndex !== -1) {
        points = 70 - winIndex * 10;
      } else {
        points = 0;
      }
      // Only update score and showScore if not already shown for this game
      if (!showScore) {
        const newScore = score + points;
        setScore(newScore);
        setShowScore(true);
        localStorage.setItem('wordle_score', newScore);
        if (winIndex !== -1) {
          toast.success(`Congratulations! You guessed the word! +${points} points`);
        } else {
          toast.error(`Game Over! The word was: ${solution}`);
        }
      }
    }
  }, [gameOver, guesses, solution, score, showScore]);

  useEffect(() => {
    const handleType = (event) => {
      if (gameOver) {
        return;
      }

      if (event.key === "Backspace") {
        setCurrentGuess((g) => g.slice(0, -1));
        return;
      }

      if (event.key === "Enter") {
        if (currentGuess.length !== 5) {
          return;
        }

        const isExist = wordList.includes(currentGuess);
        if (!isExist) {
          setCurrentGuess("");
          toast("Word not found");
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
        const isCorrect = solution === currentGuess;
        if (isCorrect || newGuesses.filter(Boolean).length === 6) {
          setGameOver(true);
        }
        return;
      }

      if (currentGuess.length >= 5 || !/^[a-zA-Z]$/.test(event.key)) {
        return;
      }

      setCurrentGuess((oldGuess) => oldGuess + event.key.toLowerCase());
    };

    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, gameOver, solution, guesses, wordList]);

  // Request fullscreen on double click or on mount (mobile only)
  useEffect(() => {
    function requestFullscreen() {
      const el = appRef.current;
      if (!el) return;
      if (document.fullscreenElement) return;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    }
    // On double click
    const handler = () => requestFullscreen();
    const node = appRef.current;
    if (node) node.addEventListener('dblclick', handler);
    // On mount for mobile
    if (window.innerWidth <= 600) {
      setTimeout(requestFullscreen, 500);
    }
    return () => {
      if (node) node.removeEventListener('dblclick', handler);
    };
  }, []);

  // Keyboard letters (QWERTY)
  const keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];
  // Track letter status for coloring keys
  const letterStatus = {};
  guesses.forEach(guess => {
    if (!guess) return;
    for (let i = 0; i < guess.length; i++) {
      const char = guess[i];
      if (solution[i] === char) {
        letterStatus[char] = 'correct';
      } else if (solution.includes(char)) {
        if (letterStatus[char] !== 'correct') letterStatus[char] = 'close';
      } else {
        if (!letterStatus[char]) letterStatus[char] = 'incorrect';
      }
    }
  });
  // Keyboard handler
  const handleKeyboardClick = (key) => {
    if (gameOver) return;
    if (key === 'back') {
      setCurrentGuess((g) => g.slice(0, -1));
    } else if (key === 'enter') {
      if (currentGuess.length !== 5) return;
      const isExist = wordList.includes(currentGuess);
      if (!isExist) {
        setCurrentGuess("");
        toast("Word not found");
        return;
      }
      const newGuesses = [...guesses];
      newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
      setGuesses(newGuesses);
      setCurrentGuess("");
      const isCorrect = solution === currentGuess;
      if (isCorrect || newGuesses.filter(Boolean).length === 6) {
        setGameOver(true);
      }
    } else if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(key)) {
      setCurrentGuess((oldGuess) => oldGuess + key);
    }
  };

  return (
    <main ref={appRef} className="App" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" pt={isMobile ? 1 : 5}>
        <Typography
          variant={isMobile ? "h4" : "h2"}
          fontWeight={900}
          gutterBottom
          sx={{
            letterSpacing: 6,
            textShadow: '0 4px 32px #0ea5e9, 0 1px 0 #000',
            color: '#0ea5e9',
            display: 'inline-block',
            mb: isMobile ? 1 : 2,
            mt: isMobile ? 1 : 0,
            borderRadius: 2,
            px: 2,
            py: 1,
            boxShadow: '0 8px 32px 0 rgba(14,165,233,0.18)',
            fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif',
            textAlign: 'center',
          }}
        >
          WORDLE BASIC
        </Typography>
        <Box mb={isMobile ? 2 : 3} textAlign="center">
          <Typography
            variant={isMobile ? "h6" : "h5"}
            color="#0ea5e9"
            fontWeight={800}
            sx={{
              fontSize: isMobile ? 18 : 22,
              letterSpacing: 2,
              textShadow: '0 2px 12px #0ea5e9',
              display: 'inline-block',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              background: 'rgba(14,165,233,0.08)',
              boxShadow: '0 2px 8px 0 rgba(14,165,233,0.10)',
              minWidth: isMobile ? 90 : 120,
            }}
          >
            Score: {score}
          </Typography>
        </Box>
        <Paper elevation={12} sx={{
          p: isMobile ? 2 : 5,
          borderRadius: 6,
          background: 'rgba(30, 41, 59, 0.98)',
          minWidth: isMobile ? 0 : 360,
          width: isMobile ? '99vw' : 'auto',
          maxWidth: 440,
          boxShadow: '0 8px 32px 0 rgba(14,165,233,0.18)',
          border: '2.5px solid #334155',
        }}>
          {showScore && (
            <Box mb={2} textAlign="center">
              <Button
                variant="outlined"
                size="small"
                sx={{ color: '#0ea5e9', borderColor: '#0ea5e9', fontWeight: 700, borderRadius: 2, px: 2, py: 0.5, fontSize: 14 }}
                onClick={() => {
                  setScore(0);
                  localStorage.setItem('wordle_score', 0);
                }}
              >
                Reset Score
              </Button>
            </Box>
          )}
          <Box mb={3}>
            <Typography variant="subtitle1" color="#38bdf8" fontWeight={700} fontSize={isMobile ? 16 : 18} letterSpacing={2}>
              Category: {category}
            </Typography>
            <Typography variant="body1" color="#fbbf24" fontStyle="italic" fontWeight={600} fontSize={isMobile ? 14 : 16}>
              Hint: {hint}
            </Typography>
          </Box>
          <Box className="board" display="flex" flexDirection="column" gap={isMobile ? 1.5 : 2.5}>
            {guesses.map((guess, i) => {
              const isCurrentGuess = i === guesses.findIndex((val) => val == null);
              return (
                <Column
                  key={i}
                  guess={isCurrentGuess ? currentGuess : guess ?? ""}
                  isFinal={!isCurrentGuess && guess != null}
                  solution={solution}
                  isMobile={isMobile}
                />
              );
            })}
          </Box>
          {/* Mobile Keyboard */}
          {isMobile && (
            <Box mt={2.5}>
              {keyboardRows.map((row, idx) => (
                <Box key={idx} display="flex" justifyContent="center" mb={1.2}>
                  {row.map((key) => (
                    <Button
                      key={key}
                      variant="contained"
                      size="small"
                      sx={{
                        minWidth: 34,
                        mx: 0.4,
                        background: letterStatus[key] === 'correct' ? 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)' : letterStatus[key] === 'close' ? 'linear-gradient(135deg, #fbbf24 0%, #f59e42 100%)' : letterStatus[key] === 'incorrect' ? '#334155' : '#1e293b',
                        color: letterStatus[key] === 'correct' ? '#fff' : letterStatus[key] === 'close' ? '#fff' : letterStatus[key] === 'incorrect' ? '#64748b' : '#f1f5f9',
                        border: letterStatus[key] === 'correct' ? '2px solid #0ea5e9' : letterStatus[key] === 'close' ? '2px solid #fbbf24' : letterStatus[key] === 'incorrect' ? '2px solid #64748b' : '2px solid #334155',
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        borderRadius: 2,
                        boxShadow: '0 1.5px 6px 0 rgba(0,0,0,0.10)',
                        textTransform: 'uppercase',
                        transition: 'all 0.18s',
                      }}
                      onClick={() => handleKeyboardClick(key)}
                      disabled={gameOver}
                    >
                      {key}
                    </Button>
                  ))}
                  {idx === 2 && (
                    <>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ minWidth: 50, mx: 0.4, background: '#1e293b', color: '#f1f5f9', fontWeight: 800, fontSize: '1.15rem', borderRadius: 2, boxShadow: 'none', textTransform: 'uppercase', border: '2px solid #334155' }}
                        onClick={() => handleKeyboardClick('back')}
                        disabled={gameOver}
                      >
                        ⌫
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ minWidth: 50, mx: 0.4, background: 'linear-gradient(90deg, #38bdf8 0%, #f472b6 100%)', color: '#fff', fontWeight: 800, fontSize: '1.15rem', borderRadius: 2, boxShadow: 'none', textTransform: 'uppercase', border: '2px solid #38bdf8' }}
                        onClick={() => handleKeyboardClick('enter')}
                        disabled={gameOver}
                      >
                        Enter
                      </Button>
                    </>
                  )}
                </Box>
              ))}
            </Box>
          )}
          <Toaster />
          {gameOver && (
            <Box mt={3} display="flex" justifyContent="center">
              <Button variant="contained" color="primary" sx={{ fontWeight: 700, px: 4, py: 1.2, fontSize: 18, borderRadius: 2, background: 'linear-gradient(90deg, #38bdf8 0%, #f472b6 100%)', color: '#fff', border: '2px solid #38bdf8' }} onClick={() => window.location.reload()}>
                Restart
              </Button>
              <Button variant="outlined" color="secondary" sx={{ ml: 2, fontWeight: 700, px: 3, py: 1.2, fontSize: 16, borderRadius: 2, border: '2px solid #64748b', color: '#64748b', background: 'rgba(30,41,59,0.7)' }} onClick={() => { localStorage.removeItem('wordle_score'); setScore(0); }}>
                Reset Score
              </Button>
            </Box>
          )}
          {/* Watermark */}
          <Box mt={isMobile ? 2 : 4} textAlign="center">
            <Typography variant="caption" color="#64748b" fontWeight={600} letterSpacing={1.5}>
              Developed by Julius Biascan
            </Typography>
          </Box>
        </Paper>
      </Box>
    </main>
  );
}

function Column({ guess, isFinal, solution, isMobile }) {
  return (
    <Box
      className="line"
      display="flex"
      gap={isMobile ? 1 : 1.2}
      mb={isMobile ? 1 : 1.2}
      justifyContent="center"
      width="100%"
      maxWidth="100%"
      minWidth={0}
    >
      {[...Array(WORD_LENGTH)].map((_, i) => {
        const char = guess[i] || "";
        let color = '#f1f5f9';
        let bgcolor = '#1e293b';
        let border = '2.5px solid #334155';
        let isEmpty = !char;
        if (isFinal && char) {
          if (char === solution[i]) {
            bgcolor = 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)';
            color = '#fff';
            border = '2.5px solid #0ea5e9';
          } else if (solution.includes(char)) {
            bgcolor = 'linear-gradient(135deg, #fbbf24 0%, #f59e42 100%)';
            color = '#fff';
            border = '2.5px solid #fbbf24';
          } else {
            bgcolor = '#334155';
            color = '#64748b';
            border = '2.5px solid #64748b';
          }
        }
        return (
          <Paper
            key={i}
            elevation={isFinal && char ? 4 : 2}
            sx={{
              flex: 1,
              minWidth: 0,
              aspectRatio: '1 / 1',
              width: isMobile ? '18vw' : undefined,
              maxWidth: isMobile ? 60 : 52,
              minHeight: isMobile ? 0 : 38,
              maxHeight: isMobile ? 60 : 52,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '5vw' : '1.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: isEmpty ? '#334155' : color,
              background: isEmpty ? 'rgba(51,65,85,0.25)' : bgcolor,
              border: isEmpty ? '2.5px solid #334155' : border,
              borderRadius: 2,
              transition: 'all 0.2s',
              boxShadow: isFinal && char ? '0 2px 12px 0 #0ea5e9' : '0 1.5px 6px 0 rgba(0,0,0,0.10)',
            }}
          >
            {isEmpty ? '' : char}
          </Paper>
        );
      })}
    </Box>
  );
}
