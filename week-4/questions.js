const questionBank = {
Science: {
  Easy: [
    { question: "Which planet is Red Planet?", choices:["Mars","Venus","Saturn","Jupiter"], answer:"Mars" },
    { question: "What gas do plants absorb?", choices:["Oxygen","Carbon Dioxide","Nitrogen","Helium"], answer:"Carbon Dioxide" },
    { question: "What is H2O?", choices:["Salt","Water","Hydrogen","Oxygen"], answer:"Water" },
    { question: "Sun is a?", choices:["Planet","Star","Galaxy","Comet"], answer:"Star" },
    { question: "Human heart has how many chambers?", choices:["2","3","4","5"], answer:"4" },
    { question: "Earth revolves around?", choices:["Moon","Sun","Mars","Venus"], answer:"Sun" },
    { question: "Which organ helps in breathing?", choices:["Heart","Lungs","Kidney","Brain"], answer:"Lungs" },
    { question: "Which is largest planet?", choices:["Earth","Jupiter","Mars","Saturn"], answer:"Jupiter" },
    { question: "Boiling point of water?", choices:["100°C","50°C","90°C","150°C"], answer:"100°C" },
    { question: "Which is not a state of matter?", choices:["Solid","Liquid","Gas","Energy"], answer:"Energy" }
  ],
  Medium: [
    { question:"Chemical symbol of Gold?", choices:["Au","Ag","Gd","Go"], answer:"Au" },
    { question:"Blood group universal donor?", choices:["A","B","O-","AB"], answer:"O-" },
    { question:"Cell powerhouse?", choices:["Nucleus","Mitochondria","Ribosome","Chloroplast"], answer:"Mitochondria" },
    { question:"Vitamin from sunlight?", choices:["A","B","C","D"], answer:"D" },
    { question:"Which part controls body?", choices:["Heart","Brain","Lungs","Kidney"], answer:"Brain" },
    { question:"Force formula?", choices:["F=ma","E=mc2","V=IR","P=IV"], answer:"F=ma" },
    { question:"Symbol for Sodium?", choices:["So","Na","Sn","Sd"], answer:"Na" },
    { question:"Which is not metal?", choices:["Iron","Gold","Oxygen","Copper"], answer:"Oxygen" },
    { question:"Freezing point of water?", choices:["0°C","5°C","10°C","-10°C"], answer:"0°C" },
    { question:"Light travels fastest in?", choices:["Water","Air","Vacuum","Glass"], answer:"Vacuum" }
  ],
  Hard: [
    { question:"Speed of light?", choices:["3x10^8 m/s","3x10^6 m/s","300 m/s","1500 m/s"], answer:"3x10^8 m/s" },
    { question:"Atomic number of Carbon?", choices:["6","8","12","14"], answer:"6" },
    { question:"pH of pure water?", choices:["7","5","3","9"], answer:"7" },
    { question:"Unit of electric resistance?", choices:["Volt","Ampere","Ohm","Watt"], answer:"Ohm" },
    { question:"Who proposed relativity?", choices:["Newton","Einstein","Bohr","Tesla"], answer:"Einstein" },
    { question:"Which wave used in remote?", choices:["Infrared","UV","X-ray","Gamma"], answer:"Infrared" },
    { question:"Avogadro number approx?", choices:["6.022x10^23","3x10^8","9.8","1.6x10^-19"], answer:"6.022x10^23" },
    { question:"Smallest bone in body?", choices:["Femur","Stapes","Tibia","Ulna"], answer:"Stapes" },
    { question:"Heaviest naturally occurring element?", choices:["Uranium","Gold","Iron","Lead"], answer:"Uranium" },
    { question:"Which gas is noble?", choices:["Hydrogen","Helium","Nitrogen","Oxygen"], answer:"Helium" }
  ]
},
General: {
  Easy: [
    { question:"Capital of India?", choices:["Delhi","Mumbai","Kolkata","Chennai"], answer:"Delhi" },
    { question:"Largest ocean?", choices:["Indian","Pacific","Atlantic","Arctic"], answer:"Pacific" },
    { question:"Currency of USA?", choices:["Dollar","Euro","Pound","Yen"], answer:"Dollar" },
    { question:"How many days in a week?", choices:["5","6","7","8"], answer:"7" },
    { question:"National animal of India?", choices:["Lion","Tiger","Elephant","Leopard"], answer:"Tiger" },
    { question:"Largest continent?", choices:["Asia","Africa","Europe","Australia"], answer:"Asia" },
    { question:"Which festival is known as festival of lights?", choices:["Holi","Diwali","Eid","Christmas"], answer:"Diwali" },
    { question:"Which is fastest land animal?", choices:["Lion","Tiger","Cheetah","Horse"], answer:"Cheetah" },
    { question:"How many colors in rainbow?", choices:["5","6","7","8"], answer:"7" },
    { question:"Which is largest country by area?", choices:["USA","China","Russia","India"], answer:"Russia" }
  ],
  Medium: [
    { question:"Which country hosted Olympics 2020?", choices:["China","Japan","Brazil","UK"], answer:"Japan" },
    { question:"Mount Everest located in?", choices:["India","China","Nepal","Bhutan"], answer:"Nepal" },
    { question:"Who invented telephone?", choices:["Edison","Newton","Alexander Graham Bell","Tesla"], answer:"Alexander Graham Bell" },
    { question:"Which river is longest?", choices:["Amazon","Nile","Ganga","Yangtze"], answer:"Nile" },
    { question:"Which country is called Land of Rising Sun?", choices:["China","Japan","Thailand","Korea"], answer:"Japan" },
    { question:"How many states in USA?", choices:["48","49","50","52"], answer:"50" },
    { question:"First man on moon?", choices:["Buzz Aldrin","Yuri Gagarin","Neil Armstrong","Michael Collins"], answer:"Neil Armstrong" },
    { question:"Which country has most population?", choices:["India","USA","China","Russia"], answer:"India" },
    { question:"Which desert is largest hot desert?", choices:["Gobi","Sahara","Kalahari","Arabian"], answer:"Sahara" },
    { question:"Who is known as Iron Man of India?", choices:["Nehru","Patel","Gandhi","Bose"], answer:"Patel" }
  ],
  Hard: [
    { question:"Which year did WW1 start?", choices:["1914","1918","1939","1945"], answer:"1914" },
    { question:"Which country has most time zones?", choices:["USA","Russia","France","China"], answer:"France" },
    { question:"What is the capital of Mongolia?", choices:["Astana","Ulaanbaatar","Tashkent","Kabul"], answer:"Ulaanbaatar" },
    { question:"Who discovered America?", choices:["Columbus","Vasco da Gama","Magellan","Cook"], answer:"Columbus" },
    { question:"Which empire built Machu Picchu?", choices:["Roman","Greek","Inca","Mughal"], answer:"Inca" },
    { question:"Which country was formerly Ceylon?", choices:["Myanmar","Sri Lanka","Nepal","Bhutan"], answer:"Sri Lanka" },
    { question:"Which sea has no coastline?", choices:["Dead Sea","Sargasso Sea","Black Sea","Red Sea"], answer:"Sargasso Sea" },
    { question:"Which country colonized Brazil?", choices:["Spain","Portugal","France","UK"], answer:"Portugal" },
    { question:"Which treaty ended WW1?", choices:["Versailles","Paris","Rome","Vienna"], answer:"Versailles" },
    { question:"What is the smallest country?", choices:["Monaco","Vatican City","Maldives","San Marino"], answer:"Vatican City" }
  ]
},
Literature: {
  Easy: [
    { question:"Who wrote Hamlet?", choices:["Shakespeare","Dickens","Austen","Tolstoy"], answer:"Shakespeare" },
    { question:"Author of Pride and Prejudice?", choices:["Jane Austen","Bronte","Rowling","Orwell"], answer:"Jane Austen" },
    { question:"Who wrote The Jungle Book?", choices:["Kipling","Twain","Orwell","Hemingway"], answer:"Kipling" },
    { question:"Who wrote Harry Potter?", choices:["Rowling","Tolkien","Lewis","King"], answer:"Rowling" },
    { question:"Who wrote The Odyssey?", choices:["Homer","Plato","Socrates","Virgil"], answer:"Homer" },
    { question:"Author of Macbeth?", choices:["Shakespeare","Marlowe","Shelley","Keats"], answer:"Shakespeare" },
    { question:"Who wrote Gulliver’s Travels?", choices:["Swift","Dickens","Wells","Hardy"], answer:"Swift" },
    { question:"Author of Oliver Twist?", choices:["Dickens","Austen","Orwell","Bronte"], answer:"Dickens" },
    { question:"Who wrote The Hobbit?", choices:["Tolkien","Rowling","Lewis","Martin"], answer:"Tolkien" },
    { question:"Author of Frankenstein?", choices:["Mary Shelley","Austen","Plath","Angelou"], answer:"Mary Shelley" }
  ],
  Medium: [
    { question:"Who wrote 1984?", choices:["Orwell","Kafka","Tolstoy","Huxley"], answer:"Orwell" },
    { question:"Who created Sherlock Holmes?", choices:["Arthur Conan Doyle","Christie","Hemingway","Rowling"], answer:"Arthur Conan Doyle" },
    { question:"Author of The Divine Comedy?", choices:["Dante","Homer","Milton","Shakespeare"], answer:"Dante" },
    { question:"Who wrote Moby Dick?", choices:["Melville","Hemingway","Orwell","Twain"], answer:"Melville" },
    { question:"Who wrote The Catcher in the Rye?", choices:["Salinger","Fitzgerald","Hemingway","Steinbeck"], answer:"Salinger" },
    { question:"Author of Wuthering Heights?", choices:["Emily Bronte","Charlotte Bronte","Austen","Dickens"], answer:"Emily Bronte" },
    { question:"Who wrote The Iliad?", choices:["Homer","Virgil","Plato","Socrates"], answer:"Homer" },
    { question:"Who wrote Animal Farm?", choices:["Orwell","Huxley","Tolstoy","Wells"], answer:"Orwell" },
    { question:"Author of The Alchemist?", choices:["Paulo Coelho","Murakami","King","Brown"], answer:"Paulo Coelho" },
    { question:"Who wrote The Old Man and the Sea?", choices:["Hemingway","Fitzgerald","Twain","Joyce"], answer:"Hemingway" }
  ],
  Hard: [
    { question:"Who wrote War and Peace?", choices:["Tolstoy","Dostoevsky","Pushkin","Gogol"], answer:"Tolstoy" },
    { question:"Which novel begins with 'Call me Ishmael'?", choices:["Moby Dick","Dracula","Hamlet","Odyssey"], answer:"Moby Dick" },
    { question:"Who wrote Crime and Punishment?", choices:["Dostoevsky","Tolstoy","Chekhov","Gorky"], answer:"Dostoevsky" },
    { question:"Author of One Hundred Years of Solitude?", choices:["Gabriel Garcia Marquez","Borges","Neruda","Llosa"], answer:"Gabriel Garcia Marquez" },
    { question:"Who wrote Ulysses?", choices:["James Joyce","Yeats","Beckett","Orwell"], answer:"James Joyce" },
    { question:"Who wrote The Brothers Karamazov?", choices:["Dostoevsky","Tolstoy","Pushkin","Chekhov"], answer:"Dostoevsky" },
    { question:"Who wrote Paradise Lost?", choices:["John Milton","Shakespeare","Blake","Byron"], answer:"John Milton" },
    { question:"Author of Don Quixote?", choices:["Cervantes","Dante","Homer","Goethe"], answer:"Cervantes" },
    { question:"Who wrote The Sound and the Fury?", choices:["William Faulkner","Hemingway","Steinbeck","Orwell"], answer:"William Faulkner" },
    { question:"Who wrote The Metamorphosis?", choices:["Franz Kafka","Camus","Sartre","Hesse"], answer:"Franz Kafka" }
  ]
}

};
export { questionBank };