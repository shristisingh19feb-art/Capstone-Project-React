import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar   from './components/Navbar/Navbar';
import Hero     from './components/Hero/Hero';
import MovieRow from './components/MovieRow/MovieRow';
import MovieModal from './components/Moviemodal/MovieModal';
import KidsBanner from './components/Kidsbanner/Kidsbanner';
import Footer   from './components/Footer/Footer';
import './App.css';

// ─────────────────────────────────────────────────────────────────────────────
// MOVIES DATA
// ─────────────────────────────────────────────────────────────────────────────
export const allMovies = [
  // ── Trending / Family Classics ──
  {
    id: 1, title: 'The Lion King', genre: 'Animation / Adventure', type: 'movie',
    rating: '8.5', year: '1994', duration: '1h 28m', emoji: '🦁',
    category: ['trending', 'family', 'animation'],
    image: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&h=340&fit=crop&q=80',
    desc: 'Simba, a young lion prince, flees his kingdom after the murder of his father Mufasa by his uncle Scar. Years later he must return and reclaim his rightful place on Pride Rock. A timeless tale of courage, friendship, and the circle of life — pure magic for the whole family! 🌅',
  },
  {
    id: 2, title: 'Toy Story', genre: 'Animation / Comedy', type: 'movie',
    rating: '8.3', year: '1995', duration: '1h 21m', emoji: '🤠',
    category: ['trending', 'family', 'animation', 'comedy'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=340&fit=crop&q=80',
    desc: "Woody, a cowboy toy, is Andy's favourite — until Buzz Lightyear arrives. Jealousy turns into adventure when both toys end up lost and must work together to get home. The movie that started it all! You've got a friend in me. 🤝",
  },
  {
    id: 3, title: 'Finding Nemo', genre: 'Animation / Family', type: 'movie',
    rating: '8.1', year: '2003', duration: '1h 40m', emoji: '🐠',
    category: ['trending', 'family', 'animation'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=340&fit=crop&q=80',
    desc: "Marlin, an overprotective clownfish, embarks on a thrilling ocean adventure to rescue his son Nemo from a dentist's fish tank in Sydney. Just keep swimming! 🌊",
  },
  {
    id: 4, title: 'Up', genre: 'Animation / Drama', type: 'movie',
    rating: '8.2', year: '2009', duration: '1h 36m', emoji: '🎈',
    category: ['trending', 'family', 'animation', 'drama'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=340&fit=crop&q=80',
    desc: "Elderly widower Carl Fredricksen fulfils his late wife's dream by tying thousands of balloons to his house and floating to South America. Adventure is out there! 🏔️",
  },
  {
    id: 5, title: 'Moana', genre: 'Animation / Musical', type: 'movie',
    rating: '7.6', year: '2016', duration: '1h 47m', emoji: '🌊',
    category: ['trending', 'family', 'animation', 'musical'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=340&fit=crop&q=80',
    desc: 'The spirited daughter of a Pacific Island chief sets sail on a daring mission to save her people, teaming up with the demigod Maui. Stunning animation, unforgettable songs! 🌺',
  },
  {
    id: 6, title: 'Zootopia', genre: 'Animation / Comedy', type: 'movie',
    rating: '8.0', year: '2016', duration: '1h 48m', emoji: '🦊',
    category: ['trending', 'family', 'animation', 'comedy'],
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&h=340&fit=crop&q=80',
    desc: "Judy Hopps becomes the first bunny police officer in Zootopia. With sly fox Nick Wilde's help she unravels a conspiracy. Try everything! 🐰",
  },

  // ── New Releases ──
  {
    id: 7, title: 'Moana 2', genre: 'Animation / Adventure', type: 'movie',
    rating: '7.0', year: '2024', duration: '1h 40m', emoji: '🌺',
    category: ['new', 'family', 'animation'],
    image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&h=340&fit=crop&q=80',
    desc: 'Moana is back on another incredible ocean voyage! She receives an unexpected call from her wayfinding ancestors. Bigger waves, bigger adventures, bigger songs! 🌊✨',
  },
  {
    id: 8, title: 'Mufasa: The Lion King', genre: 'Animation / Drama', type: 'movie',
    rating: '7.2', year: '2024', duration: '1h 58m', emoji: '🦁',
    category: ['new', 'family', 'animation', 'drama'],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=340&fit=crop&q=80',
    desc: 'The origin story of Mufasa — from a lost cub to the beloved King of Pride Rock. A prequel that will make you fall in love with the Lion King universe all over again. ✨🌅',
  },
  {
    id: 9, title: 'Inside Out 2', genre: 'Animation / Family', type: 'movie',
    rating: '7.7', year: '2024', duration: '1h 40m', emoji: '😊',
    category: ['new', 'family', 'animation'],
    image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=600&h=340&fit=crop&q=80',
    desc: "Riley is now a teenager and new emotions are moving into Headquarters! Meet Anxiety, Envy, Ennui, and Embarrassment. Growing up is complicated — but it's also beautiful. 🧠❤️",
  },
  {
    id: 10, title: 'Despicable Me 4', genre: 'Animation / Comedy', type: 'movie',
    rating: '6.9', year: '2024', duration: '1h 34m', emoji: '💛',
    category: ['new', 'family', 'animation', 'comedy'],
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=340&fit=crop&q=80',
    desc: "Gru, Lucy, and the girls welcome a new member to the family: Gru Jr. More minions, more chaos, more laughs! 🍌 The whole gang is back and funnier than ever.",
  },
  {
    id: 11, title: 'The Wild Robot', genre: 'Animation / Sci-Fi', type: 'movie',
    rating: '8.2', year: '2024', duration: '1h 42m', emoji: '🤖',
    category: ['new', 'family', 'animation', 'scifi'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=340&fit=crop&q=80',
    desc: "A robot named Roz is stranded on a wild island. When she adopts an orphaned gosling, their unlikely bond changes everything. Breathtaking animation — prepare for happy tears! 💙",
  },
  {
    id: 12, title: 'Flow', genre: 'Animation / Adventure', type: 'movie',
    rating: '8.3', year: '2024', duration: '1h 25m', emoji: '🐱',
    category: ['new', 'family', 'animation'],
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=340&fit=crop&q=80',
    desc: "A lone cat bands together with a capybara, a bird, a dog, and a lemur aboard a boat to survive a great flood. No dialogue — just breathtaking visuals. Latvia's beautiful masterpiece! 🌊🐈",
  },

  // ── Action / Superhero ──
  {
    id: 13, title: 'The Incredibles', genre: 'Animation / Superhero', type: 'movie',
    rating: '8.0', year: '2004', duration: '1h 55m', emoji: '💥',
    category: ['action', 'family', 'animation', 'superhero'],
    image: 'https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?w=600&h=340&fit=crop&q=80',
    desc: "A family of undercover superheroes must go back into action to save the world. Where is my super suit?! The greatest superhero family movie ever made. 🦸‍♂️💪",
  },
  {
    id: 14, title: 'Big Hero 6', genre: 'Animation / Action', type: 'movie',
    rating: '7.8', year: '2014', duration: '1h 42m', emoji: '🤖',
    category: ['action', 'family', 'animation', 'superhero'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=340&fit=crop&q=80',
    desc: "Brilliant young Hiro Hamada teams up with his healthcare robot Baymax and friends to uncover a dark conspiracy. Hairy baby! A superhero adventure full of heart. 💙",
  },
  {
    id: 15, title: 'Kung Fu Panda', genre: 'Animation / Martial Arts', type: 'movie',
    rating: '7.6', year: '2008', duration: '1h 32m', emoji: '🐼',
    category: ['action', 'family', 'animation', 'comedy'],
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&h=340&fit=crop&q=80',
    desc: "Po, a bumbling panda and avid kung fu fan, is chosen as the legendary Dragon Warrior. There is no secret ingredient! A hilarious and surprisingly profound martial arts epic. 🥟🥋",
  },
  {
    id: 16, title: 'How to Train Your Dragon', genre: 'Animation / Fantasy', type: 'movie',
    rating: '8.1', year: '2010', duration: '1h 38m', emoji: '🐉',
    category: ['action', 'family', 'animation', 'fantasy'],
    image: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=600&h=340&fit=crop&q=80',
    desc: "Young Viking Hiccup befriends Toothless, the most feared dragon, and discovers that dragons aren't the enemy. One of the greatest animated films ever made! 💚",
  },
  {
    id: 17, title: 'Ratatouille', genre: 'Animation / Comedy', type: 'movie',
    rating: '8.1', year: '2007', duration: '1h 51m', emoji: '🐭',
    category: ['family', 'animation', 'comedy'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=340&fit=crop&q=80',
    desc: "Remy the rat dreams of becoming a great French chef. Anyone can cook! A delicious celebration of passion, art, and never giving up on your dreams. 🍝✨",
  },
  {
    id: 18, title: 'Encanto', genre: 'Animation / Musical', type: 'movie',
    rating: '7.3', year: '2021', duration: '1h 39m', emoji: '🌺',
    category: ['family', 'animation', 'musical'],
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=340&fit=crop&q=80',
    desc: "Mirabel is the one member of the magical Madrigal family without any powers — but she may be the only one who can save it. We don't talk about Bruno! 🕯️🦋",
  },

  // ── Sci-Fi / Thriller ──
  {
    id: 19, title: 'WALL·E', genre: 'Animation / Sci-Fi', type: 'movie',
    rating: '8.4', year: '2008', duration: '1h 38m', emoji: '🤖',
    category: ['scifi', 'family', 'animation', 'trending'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=340&fit=crop&q=80',
    desc: 'A small waste-collecting robot on a desolate Earth falls in love and sets off on an adventure that saves humanity. Pure cinematic magic with barely any dialogue. ❤️🌍',
  },
  {
    id: 20, title: 'Coco', genre: 'Animation / Fantasy', type: 'movie',
    rating: '8.4', year: '2017', duration: '1h 45m', emoji: '💀',
    category: ['family', 'animation', 'fantasy', 'musical'],
    image: 'https://images.unsplash.com/photo-1509099955921-f0b4ed0c175c?w=600&h=340&fit=crop&q=80',
    desc: "Young Miguel journeys to the Land of the Dead to uncover the truth behind his family's ban on music. Remember Me — you will be sobbing happy tears. 🎸🌸",
  },
  {
    id: 21, title: 'Spirited Away', genre: 'Animation / Fantasy', type: 'movie',
    rating: '8.6', year: '2001', duration: '2h 05m', emoji: '🐉',
    category: ['fantasy', 'animation', 'trending', 'family'],
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=340&fit=crop&q=80',
    desc: "Ten-year-old Chihiro stumbles into a world ruled by gods, witches, and monsters. A Studio Ghibli masterpiece and one of the greatest films ever made. 🏮✨",
  },
  {
    id: 22, title: 'Shrek', genre: 'Animation / Comedy', type: 'movie',
    rating: '7.9', year: '2001', duration: '1h 30m', emoji: '🧅',
    category: ['family', 'animation', 'comedy', 'trending'],
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600&h=340&fit=crop&q=80',
    desc: "A lovable ogre goes on a quest to rescue Princess Fiona from a dragon-guarded castle. Fairy tales will never be the same again. Ogres are like onions! 🐉👑",
  },
  {
    id: 23, title: 'Frozen', genre: 'Animation / Musical', type: 'movie',
    rating: '7.4', year: '2013', duration: '1h 42m', emoji: '❄️',
    category: ['family', 'animation', 'musical', 'trending'],
    image: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=600&h=340&fit=crop&q=80',
    desc: "Fearless Anna teams up with Kristoff to find her sister Elsa, whose icy powers have trapped their kingdom in eternal winter. Let it go! ❄️👸",
  },
  {
    id: 24, title: 'Tangled', genre: 'Animation / Adventure', type: 'movie',
    rating: '7.7', year: '2010', duration: '1h 40m', emoji: '💛',
    category: ['family', 'animation', 'adventure'],
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=340&fit=crop&q=80',
    desc: "Rapunzel escapes her tower with a charming thief to see the floating lanterns. A vibrant reimagining of the classic fairy tale with heart and humour. 🏮🦎",
  },
  {
    id: 25, title: 'Brave', genre: 'Animation / Adventure', type: 'movie',
    rating: '7.1', year: '2012', duration: '1h 33m', emoji: '🏹',
    category: ['family', 'animation', 'adventure'],
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=340&fit=crop&q=80',
    desc: "Princess Merida of the Scottish Highlands defies her kingdom's traditions to follow her heart. A beautiful Pixar tale about courage and family bonds. 🏴󠁧󠁢󠁳󠁣󠁴󠁿🐻",
  },
  {
    id: 26, title: 'Kung Fu Panda 4', genre: 'Animation / Action', type: 'movie',
    rating: '6.8', year: '2024', duration: '1h 34m', emoji: '🐼',
    category: ['new', 'action', 'animation', 'comedy'],
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&h=340&fit=crop&q=80',
    desc: "Po must train a new Dragon Warrior while also facing a powerful shape-shifting villain. The panda's legend continues! Skadoosh! 🥋💪",
  },
  {
    id: 27, title: 'Migration', genre: 'Animation / Comedy', type: 'movie',
    rating: '6.9', year: '2023', duration: '1h 23m', emoji: '🦆',
    category: ['new', 'family', 'animation', 'comedy'],
    image: 'https://images.unsplash.com/photo-1455357861867-77aa9da0a04e?w=600&h=340&fit=crop&q=80',
    desc: "A family of ducks convinces their overprotective dad to go on an epic migration, encountering diverse birds and unexpected adventures along the way. 🌎🦆",
  },
  {
    id: 28, title: 'Elemental', genre: 'Animation / Romance', type: 'movie',
    rating: '6.8', year: '2023', duration: '1h 41m', emoji: '🔥',
    category: ['new', 'family', 'animation'],
    image: 'https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=600&h=340&fit=crop&q=80',
    desc: "In a city where Fire, Water, Land, and Air residents live together, a fiery young woman and a go-with-the-flow guy discover something elemental. ❤️‍🔥💧",
  },
  {
    id: 29, title: 'Turning Red', genre: 'Animation / Comedy', type: 'movie',
    rating: '7.0', year: '2022', duration: '1h 40m', emoji: '🐼',
    category: ['family', 'animation', 'comedy'],
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=340&fit=crop&q=80',
    desc: "13-year-old Meilin Lee turns into a giant red panda whenever she gets too excited. A hilarious and deeply heartfelt story about growing up and identity. 🎵🐼",
  },
  {
    id: 30, title: 'Puss in Boots: The Last Wish', genre: 'Animation / Adventure', type: 'movie',
    rating: '7.9', year: '2022', duration: '1h 42m', emoji: '🐱',
    category: ['action', 'animation', 'family', 'fantasy'],
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=340&fit=crop&q=80',
    desc: "Puss discovers he has only one life remaining and embarks on an epic quest to restore his nine lives. A visually revolutionary and surprisingly deep sequel! ⭐🐱",
  },

  // ── Drama / Romance ──
  {
    id: 31, title: 'Beauty and the Beast', genre: 'Animation / Musical', type: 'movie',
    rating: '8.0', year: '1991', duration: '1h 24m', emoji: '🌹',
    category: ['family', 'animation', 'musical', 'romance'],
    image: 'https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=600&h=340&fit=crop&q=80',
    desc: "A young woman is taken prisoner by a beast in his enchanted castle. But Belle begins to see the humanity behind the beast's fearsome exterior. Tale as old as time. 🌹🕯️",
  },
  {
    id: 32, title: 'Aladdin', genre: 'Animation / Musical', type: 'movie',
    rating: '8.0', year: '1992', duration: '1h 30m', emoji: '🧞',
    category: ['family', 'animation', 'musical', 'adventure'],
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=600&h=340&fit=crop&q=80',
    desc: "A street urchin and a magic genie go on an incredible adventure. Do you trust me? One of Disney's finest hours, featuring Robin Williams at his comedic peak. ✨🧞",
  },
  {
    id: 33, title: 'Mulan', genre: 'Animation / Action', type: 'movie',
    rating: '7.6', year: '1998', duration: '1h 28m', emoji: '🗡️',
    category: ['action', 'family', 'animation'],
    image: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=600&h=340&fit=crop&q=80',
    desc: "A young woman disguises herself as a man to save her ailing father from war conscription. A powerful story of bravery, identity, and honour. Let's get down to business! ⚔️🌸",
  },
  {
    id: 34, title: 'Hercules', genre: 'Animation / Action', type: 'movie',
    rating: '7.3', year: '1997', duration: '1h 33m', emoji: '⚡',
    category: ['action', 'family', 'animation', 'musical'],
    image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=600&h=340&fit=crop&q=80',
    desc: "The son of Zeus must prove himself a true hero against the scheming Hades. Zero to hero — Herc's got a story worth watching! Go the distance! ⚡🏛️",
  },
  {
    id: 35, title: 'Tarzan', genre: 'Animation / Adventure', type: 'movie',
    rating: '7.2', year: '1999', duration: '1h 28m', emoji: '🌿',
    category: ['action', 'family', 'animation', 'adventure'],
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=340&fit=crop&q=80',
    desc: "A man raised by gorillas must decide where he truly belongs when he discovers others like himself. Stunning animation with an unforgettable Phil Collins soundtrack. 🦍🌿",
  },
  {
    id: 36, title: 'Luca', genre: 'Animation / Adventure', type: 'movie',
    rating: '7.4', year: '2021', duration: '1h 41m', emoji: '🐟',
    category: ['family', 'animation', 'adventure'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=340&fit=crop&q=80',
    desc: "Two sea monsters secretly explore the human world on the Italian Riviera one magical summer. A warm, sun-drenched celebration of friendship and discovery. 🌊🍕",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERIES DATA
// ─────────────────────────────────────────────────────────────────────────────
export const allSeries = [
  // ── Kids / Animation ──
  {
    id: 101, title: 'Avatar: The Last Airbender', genre: 'Animation / Fantasy', type: 'series',
    rating: '9.3', year: '2005', duration: '3 Seasons', emoji: '🌪️',
    category: ['trending', 'kids', 'animation', 'fantasy', 'action'],
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=340&fit=crop&q=80',
    desc: "Aang, the Avatar, must master all four elements to stop the ruthless Fire Nation from conquering the world. Arguably the greatest animated series ever created. 🔥💧🌍💨",
  },
  {
    id: 102, title: 'Bluey', genre: 'Animation / Family', type: 'series',
    rating: '9.5', year: '2018', duration: '3 Seasons', emoji: '🐕',
    category: ['trending', 'kids', 'animation', 'family'],
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=340&fit=crop&q=80',
    desc: "A loveable Blue Heeler puppy and her family go on imaginative adventures that teach kids — and their parents — about life, play, and love. The most heartwarming show on TV. 💙🐾",
  },
  {
    id: 103, title: 'Gravity Falls', genre: 'Animation / Mystery', type: 'series',
    rating: '8.9', year: '2012', duration: '2 Seasons', emoji: '🔍',
    category: ['trending', 'kids', 'animation', 'mystery'],
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=340&fit=crop&q=80',
    desc: "Twins Dipper and Mabel Pines spend the summer with their Grunkle Stan in a mysterious Oregon town full of supernatural creatures. Funny, scary, and deeply heartfelt. 🌲👁️",
  },
  {
    id: 104, title: 'The Owl House', genre: 'Animation / Fantasy', type: 'series',
    rating: '8.8', year: '2020', duration: '3 Seasons', emoji: '🦉',
    category: ['kids', 'animation', 'fantasy'],
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=600&h=340&fit=crop&q=80',
    desc: "Luz Noceda accidentally stumbles into the Boiling Isles, a realm of witches and monsters. A beautifully crafted show about identity, found family, and magic. 🏚️✨",
  },
  {
    id: 105, title: 'Amphibia', genre: 'Animation / Adventure', type: 'series',
    rating: '8.3', year: '2019', duration: '3 Seasons', emoji: '🐸',
    category: ['kids', 'animation', 'adventure'],
    image: 'https://images.unsplash.com/photo-1455357861867-77aa9da0a04e?w=600&h=340&fit=crop&q=80',
    desc: "Anne Boonchuy is magically transported to Amphibia, a world of frog-people and dangerous creatures, where she learns about friendship. 🐸🌿",
  },
  {
    id: 106, title: 'Star Wars: The Clone Wars', genre: 'Animation / Sci-Fi', type: 'series',
    rating: '8.6', year: '2008', duration: '7 Seasons', emoji: '⚔️',
    category: ['action', 'kids', 'animation', 'scifi'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=340&fit=crop&q=80',
    desc: "The epic saga of Anakin Skywalker, Obi-Wan Kenobi, and Ahsoka Tano during the Clone Wars. Essential Star Wars viewing with stunning battle sequences. ⚡🚀",
  },
  {
    id: 107, title: "Hilda", genre: 'Animation / Adventure', type: 'series',
    rating: '8.6', year: '2018', duration: '3 Seasons', emoji: '🧝',
    category: ['kids', 'animation', 'adventure', 'fantasy'],
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=340&fit=crop&q=80',
    desc: "A fearless girl moves from the magical wilderness to the city of Trolberg, where she befriends trolls, giants, and many other magical creatures. Beautifully hand-drawn! 🌲🧌",
  },
  {
    id: 108, title: 'Kipo and the Age of Wonderbeasts', genre: 'Animation / Sci-Fi', type: 'series',
    rating: '8.2', year: '2020', duration: '3 Seasons', emoji: '🦁',
    category: ['kids', 'animation', 'scifi', 'adventure'],
    image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=600&h=340&fit=crop&q=80',
    desc: "After a mutant attack, Kipo emerges from her underground city and must survive a wild post-apocalyptic world filled with mute mega-beasts. Colorful, joyful, and original! 🌈🐾",
  },

  // ── Drama ──
  {
    id: 109, title: 'Stranger Things', genre: 'Sci-Fi / Horror', type: 'series',
    rating: '8.7', year: '2016', duration: '4 Seasons', emoji: '🔦',
    category: ['trending', 'scifi', 'drama', 'horror'],
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=340&fit=crop&q=80',
    desc: "When a boy disappears, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and a strange little girl. 80s nostalgia perfection! 🌀👾",
  },
  {
    id: 110, title: 'Breaking Bad', genre: 'Drama / Crime', type: 'series',
    rating: '9.5', year: '2008', duration: '5 Seasons', emoji: '⚗️',
    category: ['trending', 'drama', 'crime'],
    image: 'https://images.unsplash.com/photo-1509099955921-f0b4ed0c175c?w=600&h=340&fit=crop&q=80',
    desc: "A high school chemistry teacher diagnosed with cancer turns to a life of crime, manufacturing meth with a former student. The greatest drama series ever made. 🧪💚",
  },
  {
    id: 111, title: 'The Last of Us', genre: 'Drama / Horror', type: 'series',
    rating: '8.8', year: '2023', duration: '2 Seasons', emoji: '🍄',
    category: ['new', 'trending', 'drama', 'horror', 'scifi'],
    image: 'https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=600&h=340&fit=crop&q=80',
    desc: "A hardened survivor Joel and a teenage girl Ellie traverse a post-apocalyptic America ravaged by a fungal infection. Devastating, beautiful, unforgettable. 💔🍃",
  },
  {
    id: 112, title: 'The Bear', genre: 'Drama / Comedy', type: 'series',
    rating: '8.6', year: '2022', duration: '3 Seasons', emoji: '👨‍🍳',
    category: ['new', 'trending', 'drama', 'comedy'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=340&fit=crop&q=80',
    desc: "A fine-dining chef returns home to run his family's sandwich shop after a tragedy, clashing with his crew as he tries to transform it. Absolutely frenetic and brilliant. 🔥🍽️",
  },
  {
    id: 113, title: 'Shogun', genre: 'Drama / Historical', type: 'series',
    rating: '8.7', year: '2024', duration: '1 Season', emoji: '⚔️',
    category: ['new', 'trending', 'drama', 'action'],
    image: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=600&h=340&fit=crop&q=80',
    desc: "An English navigator washes ashore feudal Japan and finds himself embroiled in a conflict that could determine the future of the entire country. Jaw-dropping television. 🏯🌸",
  },
  {
    id: 114, title: 'House of the Dragon', genre: 'Fantasy / Drama', type: 'series',
    rating: '8.4', year: '2022', duration: '2 Seasons', emoji: '🐉',
    category: ['new', 'trending', 'fantasy', 'drama', 'action'],
    image: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=600&h=340&fit=crop&q=80',
    desc: "The story of House Targaryen, set 200 years before Game of Thrones. Dragons, politics, and betrayal on a spectacular scale. Fire and Blood. 🔥👑",
  },
  {
    id: 115, title: 'Game of Thrones', genre: 'Fantasy / Drama', type: 'series',
    rating: '9.2', year: '2011', duration: '8 Seasons', emoji: '👑',
    category: ['trending', 'fantasy', 'drama', 'action'],
    image: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=600&h=340&fit=crop&q=80',
    desc: "Nine noble families fight for control of the mythical land of Westeros while an ancient enemy returns after being dormant for millennia. When you play the game of thrones, you win or you die. ❄️🔥",
  },
  {
    id: 116, title: 'Dark', genre: 'Sci-Fi / Mystery', type: 'series',
    rating: '8.8', year: '2017', duration: '3 Seasons', emoji: '⏳',
    category: ['scifi', 'mystery', 'drama'],
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=340&fit=crop&q=80',
    desc: "A family saga with a supernatural twist set in a German town where the disappearance of two children exposes the hidden connections between four estranged families. A mind-bending masterpiece. 🌀🕰️",
  },
  {
    id: 117, title: 'Succession', genre: 'Drama / Comedy', type: 'series',
    rating: '8.9', year: '2018', duration: '4 Seasons', emoji: '💼',
    category: ['trending', 'drama', 'comedy'],
    image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=600&h=340&fit=crop&q=80',
    desc: "The Roy family controls one of the biggest media conglomerates in the world. But who will succeed their aging patriarch Logan? Brilliant, savage, and hilarious. 🏛️👨‍👩‍👧‍👦",
  },
  {
    id: 118, title: 'The Crown', genre: 'Drama / Historical', type: 'series',
    rating: '8.6', year: '2016', duration: '6 Seasons', emoji: '👑',
    category: ['drama', 'historical'],
    image: 'https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=600&h=340&fit=crop&q=80',
    desc: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century. Lavish, addictive, impeccable. 🇬🇧✨",
  },
  {
    id: 119, title: 'Severance', genre: 'Sci-Fi / Drama', type: 'series',
    rating: '8.7', year: '2022', duration: '2 Seasons', emoji: '🧠',
    category: ['new', 'trending', 'scifi', 'drama', 'mystery'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=340&fit=crop&q=80',
    desc: "Mark leads a team whose memories have been surgically divided between their work and personal lives. A chilling, riveting, and deeply original workplace thriller. 🏢🔮",
  },
  {
    id: 120, title: 'Arcane', genre: 'Animation / Fantasy', type: 'series',
    rating: '9.0', year: '2021', duration: '2 Seasons', emoji: '⚡',
    category: ['new', 'trending', 'animation', 'fantasy', 'action'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=340&fit=crop&q=80',
    desc: "Set in the League of Legends universe, two sisters are caught on opposite sides of a war between the rich utopia of Piltover and the oppressed underground of Zaun. Visually breathtaking. 💜⚙️",
  },
  {
    id: 121, title: 'Invincible', genre: 'Animation / Superhero', type: 'series',
    rating: '8.7', year: '2021', duration: '3 Seasons', emoji: '💪',
    category: ['new', 'trending', 'animation', 'superhero', 'action'],
    image: 'https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?w=600&h=340&fit=crop&q=80',
    desc: "Mark Grayson is a seemingly normal teenager until he develops superpowers — including a father who is the most powerful superhero on the planet. Not your typical superhero story. 💥🩸",
  },
  {
    id: 122, title: 'Peaky Blinders', genre: 'Crime / Drama', type: 'series',
    rating: '8.8', year: '2013', duration: '6 Seasons', emoji: '🎩',
    category: ['trending', 'crime', 'drama', 'historical'],
    image: 'https://images.unsplash.com/photo-1509099955921-f0b4ed0c175c?w=600&h=340&fit=crop&q=80',
    desc: "A gangster family epic set in Birmingham, England in the aftermath of World War One. Tommy Shelby is one of television's most compelling anti-heroes. By order of the Peaky Blinders. 🎩🔫",
  },
  {
    id: 123, title: 'Chernobyl', genre: 'Drama / Historical', type: 'series',
    rating: '9.4', year: '2019', duration: '1 Season', emoji: '☢️',
    category: ['trending', 'drama', 'historical'],
    image: 'https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=600&h=340&fit=crop&q=80',
    desc: "The true story of one of the worst man-made catastrophes in history — the catastrophic nuclear disaster at Chernobyl in 1986 and the attempts to contain it. Absolutely harrowing. ☢️🌲",
  },
  {
    id: 124, title: 'The Mandalorian', genre: 'Sci-Fi / Adventure', type: 'series',
    rating: '8.7', year: '2019', duration: '3 Seasons', emoji: '🚀',
    category: ['trending', 'scifi', 'action', 'adventure'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=340&fit=crop&q=80',
    desc: "A lone gunfighter makes his way through the lawless galaxy far, far away after the fall of the Empire — protecting a mysterious child known as Grogu. This is the Way. 🌌💚",
  },
  {
    id: 125, title: 'Wednesday', genre: 'Comedy / Mystery', type: 'series',
    rating: '7.8', year: '2022', duration: '2 Seasons', emoji: '🖤',
    category: ['new', 'trending', 'comedy', 'mystery', 'fantasy'],
    image: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=600&h=340&fit=crop&q=80',
    desc: "Wednesday Addams investigates a murder mystery at Nevermore Academy while navigating new friendships, romances, and her own emerging powers. Absolutely iconic. 🕷️🖤",
  },
  {
    id: 126, title: 'The Witcher', genre: 'Fantasy / Action', type: 'series',
    rating: '8.0', year: '2019', duration: '3 Seasons', emoji: '⚔️',
    category: ['fantasy', 'action', 'drama'],
    image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=600&h=340&fit=crop&q=80',
    desc: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts. Toss a coin to your Witcher! ⚔️🐉",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function filterBy(arr, cat) { return arr.filter(x => x.category.includes(cat)); }

// ─────────────────────────────────────────────────────────────────────────────
// Page Components
// ─────────────────────────────────────────────────────────────────────────────

function HomePage({ isKids, openModal, showToast }) {
  const trending   = filterBy([...allMovies, ...allSeries], 'trending').slice(0, 8);
  const newItems   = filterBy([...allMovies, ...allSeries], 'new').slice(0, 8);
  const animation  = filterBy(allMovies, 'animation').slice(0, 8);
  const action     = filterBy([...allMovies, ...allSeries], 'action').slice(0, 8);
  const topSeries  = allSeries.slice(0, 8);
  const kidsItems  = filterBy([...allMovies, ...allSeries], 'kids').slice(0, 8);

  return (
    <>
      <Hero isKids={isKids} onMovieClick={openModal} />
      {isKids && <KidsBanner />}
      <MovieRow title={isKids ? '🔥 Trending Adventures' : '🔥 Trending Now'}         movies={trending}  isKids={isKids} onMovieClick={openModal} />
      <MovieRow title={isKids ? '✨ New Magical Releases' : '🆕 New Releases'}         movies={newItems}  isKids={isKids} onMovieClick={openModal} />
      <MovieRow title={isKids ? '🎬 Animated Classics' : '🎨 Top Animation'}          movies={animation} isKids={isKids} onMovieClick={openModal} />
      <MovieRow title={isKids ? '💥 Epic Action!' : '💥 Action & Adventure'}          movies={action}    isKids={isKids} onMovieClick={openModal} />
      <MovieRow title={isKids ? '📺 Awesome Shows' : '📺 Top Series'}                 movies={topSeries} isKids={isKids} onMovieClick={openModal} />
      {isKids && <MovieRow title="🌈 Perfect for Kids" movies={kidsItems} isKids={isKids} onMovieClick={openModal} />}
    </>
  );
}

function MoviesPage({ isKids, openModal }) {
  const all        = allMovies;
  const animation  = filterBy(allMovies, 'animation');
  const action     = filterBy(allMovies, 'action');
  const comedy     = filterBy(allMovies, 'comedy');
  const fantasy    = filterBy(allMovies, 'fantasy');
  const musical    = filterBy(allMovies, 'musical');
  const newMovies  = filterBy(allMovies, 'new');
  const scifi      = filterBy(allMovies, 'scifi');

  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">🎬 Movies</h1>
        <p className="page-hero__sub">Explore our full library of {allMovies.length} handpicked films</p>
      </div>
      <MovieRow title="🎬 All Movies"            movies={all}       isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🆕 New Releases"          movies={newMovies} isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🎨 Animation"             movies={animation} isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="💥 Action & Adventure"    movies={action}    isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="😂 Comedy"                movies={comedy}    isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🧙 Fantasy"               movies={fantasy}   isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🎵 Musicals"              movies={musical}   isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🚀 Sci-Fi"                movies={scifi}     isKids={isKids} onMovieClick={openModal} />
    </>
  );
}

function SeriesPage({ isKids, openModal }) {
  const all      = allSeries;
  const trending = filterBy(allSeries, 'trending');
  const newS     = filterBy(allSeries, 'new');
  const fantasy  = filterBy(allSeries, 'fantasy');
  const drama    = filterBy(allSeries, 'drama');
  const scifi    = filterBy(allSeries, 'scifi');
  const kids     = filterBy(allSeries, 'kids');
  const action   = filterBy(allSeries, 'action');
  const crime    = filterBy(allSeries, 'crime');

  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">📺 Series</h1>
        <p className="page-hero__sub">Binge-worthy shows — {allSeries.length} series and counting</p>
      </div>
      <MovieRow title="📺 All Series"            movies={all}     isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🔥 Trending Series"       movies={trending} isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🆕 New & Hot"             movies={newS}    isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🧙 Fantasy Epics"         movies={fantasy} isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🎭 Drama"                 movies={drama}   isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🚀 Sci-Fi"                movies={scifi}   isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🕵️ Crime"                movies={crime}   isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="💥 Action"                movies={action}  isKids={isKids} onMovieClick={openModal} />
      {isKids && <MovieRow title="🌈 Kids Shows" movies={kids}    isKids={isKids} onMovieClick={openModal} />}
    </>
  );
}

function OriginalsPage({ isKids, openModal }) {
  const originals = [
    ...filterBy(allSeries, 'trending').slice(0, 4),
    ...filterBy(allMovies, 'trending').slice(0, 4),
    ...filterBy(allSeries, 'new').slice(0, 4),
  ];
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">⭐ Originals</h1>
        <p className="page-hero__sub">Exclusively on Screenify</p>
      </div>
      <MovieRow title="⭐ Screenify Originals"      movies={originals.slice(0, 8)}  isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🏆 Award Winners"            movies={originals.slice(4, 12)} isKids={isKids} onMovieClick={openModal} />
      <MovieRow title="🎬 Director's Picks"         movies={originals.slice(2, 10)} isKids={isKids} onMovieClick={openModal} />
    </>
  );
}

function MyListPage({ isKids, openModal }) {
  const placeholder = [...allMovies.slice(0, 6), ...allSeries.slice(0, 6)];
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">📋 My List</h1>
        <p className="page-hero__sub">Your saved watchlist</p>
      </div>
      <MovieRow title="⭐ Saved for Later" movies={placeholder} isKids={isKids} onMovieClick={openModal} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App Shell (needs to be inside BrowserRouter to use hooks)
// ─────────────────────────────────────────────────────────────────────────────
function AppShell() {
  const [isKids, setIsKids]               = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [toastMsg, setToastMsg]           = useState('');
  const [toastVisible, setToastVisible]   = useState(false);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsKids(prev => {
      const next = !prev;
      document.body.classList.toggle('kids', next);
      showToast(next ? '🎀 Kids Mode On! Let the fun begin!' : '🎬 Cinema Mode activated!');
      return next;
    });
  }, [showToast]);

  const openModal  = useCallback((movie) => setSelectedMovie(movie), []);
  const closeModal = useCallback(() => setSelectedMovie(null), []);

  return (
    <div className={`app ${isKids ? 'kids-app' : ''}`}>
      {/* Floating stickers – kids mode only */}
      <div className="stickers" aria-hidden="true">
        {['⭐','🌈','🦄','🎀','🌟','🍭','🐱','🦋'].map((s, i) => (
          <span key={i} className="sticker">{s}</span>
        ))}
      </div>

      <Navbar isKids={isKids} onToggleTheme={toggleTheme} />

      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <Routes>
          <Route path="/"          element={<HomePage      isKids={isKids} openModal={openModal} showToast={showToast} />} />
          <Route path="/movies"    element={<MoviesPage    isKids={isKids} openModal={openModal} />} />
          <Route path="/series"    element={<SeriesPage    isKids={isKids} openModal={openModal} />} />
          <Route path="/originals" element={<OriginalsPage isKids={isKids} openModal={openModal} />} />
          <Route path="/my-list"   element={<MyListPage    isKids={isKids} openModal={openModal} />} />
          <Route path="*"          element={<HomePage      isKids={isKids} openModal={openModal} showToast={showToast} />} />
        </Routes>
      </main>

      <Footer isKids={isKids} />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isKids={isKids}
          onClose={closeModal}
          onWatchlist={() => showToast(isKids ? '🌟 Added to your list!' : 'Added to Watchlist!')}
        />
      )}

      <div className={`toast ${toastVisible ? 'show' : ''}`}>{toastMsg}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;