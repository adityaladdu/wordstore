(() => {
  const bagButton = document.querySelector(".bag");
  const bagCount = document.querySelector(".bag-count");
  const cart = new Map();
  const state = {
    selectedGenre: "",
    searchTerm: "",
    showAllBestsellers: false,
    showAllArticles: false,
    showAllManga: false,
    currentBookId: "",
  };

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));

  const escapeHtml = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const normalizeGenre = (value = "") =>
    String(value)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/&/g, " and ")
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  const genreMap = {
    fiction: "Fiction",
    "non fiction": "Non-Fiction",
    "non-fiction": "Non-Fiction",
    nonfiction: "Non-Fiction",
    manga: "Manga",
    mystery: "Mystery",
    thriller: "Thriller",
    romance: "Romance",
    fantasy: "Fantasy",
    "science fiction": "Science Fiction",
    "science-fiction": "Science Fiction",
    biography: "Biography",
    "self help": "Self-help",
    "self-help": "Self-help",
    history: "History",
    "young adult": "Young Adult",
    "children books": "Children's Books",
    "childrens books": "Children's Books",
    "children's books": "Children's Books",
    classics: "Classics",
  };

  const canonicalGenre = (value = "") => {
    const key = normalizeGenre(value);
    return genreMap[key] || value || "Fiction";
  };

  const calculateDiscount = (originalPrice, price) => {
    const oldValue = Number(originalPrice || 0);
    const currentValue = Number(price || 0);
    if (!oldValue || oldValue <= currentValue) return 0;
    return Math.round(((oldValue - currentValue) / oldValue) * 100);
  };

  const books = [
    {
      id: "one-piece-01",
      title: "One Piece 01",
      author: "Eiichiro Oda",
      genre: "Manga",
      price: 854,
      originalPrice: 899,
      coverImage: "img/onepiece.jpg",
      format: "Paperback",
      language: "English",
      pages: 192,
      rating: 4.9,
      description:
        "One Piece 01 introduces Monkey D. Luffy and the dream of becoming the Pirate King. It opens with a high-energy adventure, a warm cast, and a story that turns every chapter into a memorable journey.",
      summary:
        "A vibrant manga adventure that launches the globe-spanning story of Luffy and his crew.",
      isBestSeller: true,
    },
    {
      id: "fullmetal-alchemist",
      title: "Fullmetal Alchemist",
      author: "Hiromu Arakawa",
      genre: "Manga",
      price: 594,
      originalPrice: 699,
      coverImage: "img/Fullmetal Alchemist.jpg",
      format: "Paperback",
      language: "English",
      pages: 208,
      rating: 4.8,
      description:
        "Fullmetal Alchemist blends action, philosophy, and emotional stakes as Edward and Alphonse search for the cost of forbidden alchemy.",
      summary:
        "A dark fantasy manga with heart, sacrifice, and unforgettable world-building.",
      isBestSeller: true,
    },
    {
      id: "berserk",
      title: "Berserk",
      author: "Kentaro Miura",
      genre: "Manga",
      price: 509,
      originalPrice: 599,
      coverImage: "img/berserk2.0.jpg",
      format: "Hardcover",
      language: "English",
      pages: 240,
      rating: 4.7,
      description:
        "Berserk delivers brutal action and bleak intensity, wrapped in one of the most iconic fantasy journeys ever told.",
      summary: "A relentless dark-fantasy epic about grit, fate, and survival.",
      isBestSeller: true,
    },
    {
      id: "vinland-saga",
      title: "Vinland Saga",
      author: "Makoto Yukimura",
      genre: "Manga",
      price: 809,
      originalPrice: 899,
      coverImage: "img/VINLAND SAGA - Thorfinn.jpg",
      format: "Paperback",
      language: "English",
      pages: 220,
      rating: 4.8,
      description:
        "Vinland Saga fuses historical weight with intimate character growth, following a warrior searching for meaning beyond violence.",
      summary:
        "A compelling coming-of-age manga with profound emotional depth.",
      isBestSeller: true,
    },
    {
      id: "monster",
      title: "Monster",
      author: "Naoki Urasawa",
      genre: "Manga",
      price: 615,
      originalPrice: 699,
      coverImage: "img/monster.jpg",
      format: "Paperback",
      language: "English",
      pages: 224,
      rating: 4.9,
      description:
        "Monster is a layered psychological thriller about guilt, obsession, and the moral cost of human choices.",
      summary:
        "A tense, cerebral manga that keeps the suspense burning page after page.",
      isBestSeller: true,
    },
    {
      id: "atomic-habits",
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-help",
      price: 674,
      originalPrice: 749,
      coverImage: "img/Atomic Habits.jpg",
      format: "Paperback",
      language: "English",
      pages: 320,
      rating: 4.8,
      description:
        "Atomic Habits shows how consistent, tiny improvements can reshape your habits and the trajectory of your life.",
      summary:
        "A practical guide to building better routines and sustainable momentum.",
      isBestSeller: true,
    },
    {
      id: "psycho-cybernetics",
      title: "Psycho-Cybernetics",
      author: "Maxwell Maltz",
      genre: "Self-help",
      price: 509,
      originalPrice: 599,
      coverImage: "img/Book Psycho-Cybernetics PDF Free.jpg",
      format: "Paperback",
      language: "English",
      pages: 384,
      rating: 4.6,
      description:
        "Psycho-Cybernetics explores confidence, habit loops, and the mindsets that help readers reshape their self-image.",
      summary:
        "A classic personal-development read focused on mindset and behaviour.",
      isBestSeller: true,
    },
    {
      id: "ikigai",
      title: "Ikigai",
      author: "Héctor García",
      genre: "Self-help",
      price: 527,
      originalPrice: 599,
      coverImage: "img/ikigai.jpg",
      format: "Paperback",
      language: "English",
      pages: 208,
      rating: 4.7,
      description:
        "Ikigai examines the everyday rituals and values that make life feel more purposeful and balanced.",
      summary:
        "An inspiring journey into the philosophy of everyday joy and purpose.",
      isBestSeller: true,
    },
    {
      id: "the-alchemist",
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Fiction",
      price: 297,
      originalPrice: 349,
      coverImage:
        "img/_The Alchemist Book Cover Redesign _ Paulo Coelho Fan Art for the Classic Novel.jpg",
      format: "Paperback",
      language: "English",
      pages: 208,
      rating: 4.8,
      description:
        "The Alchemist follows a shepherd who chases a dream across desert journeys and into a deeper understanding of destiny.",
      summary:
        "A timeless tale about purpose, courage, and trusting the road ahead.",
      isBestSeller: true,
    },
    {
      id: "psychology-of-money",
      title: "The Psychology of Money",
      author: "Morgan Housel",
      genre: "Finance",
      price: 629,
      originalPrice: 699,
      coverImage: "img/The Psychology of Money (1).jpg",
      format: "Paperback",
      language: "English",
      pages: 256,
      rating: 4.7,
      description:
        "The Psychology of Money turns financial lessons into human stories, showing how behaviour shapes wealth and life decisions.",
      summary:
        "A warm and practical read about money habits, long-term thinking, and risk.",
      isBestSeller: true,
    },
    {
      id: "20th-century-boys",
      title: "20th Century Boys",
      author: "Naoki Urasawa",
      genre: "Manga",
      price: 674,
      originalPrice: 749,
      coverImage: "img/20thcenturyboys.jpg",
      format: "Paperback",
      language: "English",
      pages: 240,
      rating: 4.8,
      description:
        "20th Century Boys weaves mystery and nostalgia into a sprawling conspiracy story that grows more compelling with every clue.",
      summary:
        "A gripping manga mystery with bold ideas and a huge emotional payoff.",
      isBestSeller: true,
    },
    {
      id: "goodnight-punpun",
      title: "Goodnight Punpun",
      author: "Inio Asano",
      genre: "Manga",
      price: 552,
      originalPrice: 649,
      coverImage: "img/goodnightpunpun.jpg",
      format: "Paperback",
      language: "English",
      pages: 224,
      rating: 4.7,
      description:
        "Goodnight Punpun turns an ordinary childhood into a raw, honest portrait of belonging, loneliness, and growing up.",
      summary:
        "A deeply personal manga that balances vulnerability with real emotional power.",
      isBestSeller: true,
    },
    {
      id: "slam-dunk",
      title: "Slam Dunk",
      author: "Takehiko Inoue",
      genre: "Manga",
      price: 539,
      originalPrice: 599,
      coverImage: "img/Slam dunk poster.jpg",
      format: "Paperback",
      language: "English",
      pages: 208,
      rating: 4.7,
      description:
        "Slam Dunk brings basketball action to life with humour, heart, and a cast that grows under pressure.",
      summary:
        "A beloved sports manga full of energy, timing, and team spirit.",
      isBestSeller: true,
    },
    {
      id: "haikyu",
      title: "Haikyu!!",
      author: "Haruichi Furudate",
      genre: "Manga",
      price: 483,
      originalPrice: 549,
      coverImage: "img/haikyuu shoyo hinata poster.jpg",
      format: "Paperback",
      language: "English",
      pages: 192,
      rating: 4.8,
      description:
        "Haikyu!! turns every match into an emotional sprint, mixing high-speed strategy with the thrill of chasing excellence.",
      summary:
        "A high-energy volleyball manga about grit, teamwork, and courage.",
      isBestSeller: true,
    },
    {
      id: "demon-slayer",
      title: "Demon Slayer",
      author: "Koyoharu Gotouge",
      genre: "Manga",
      price: 679,
      originalPrice: 799,
      coverImage: "img/Demon Slayer poster.jpg",
      format: "Paperback",
      language: "English",
      pages: 208,
      rating: 4.8,
      description:
        "Demon Slayer blends stunning action and emotional stakes in a story of vengeance, family, and relentless courage.",
      summary:
        "A stylish fantasy manga with an unforgettable mix of action and heart.",
      isBestSeller: true,
    },
    {
      id: "my-hero-academia",
      title: "My Hero Academia",
      author: "Kohei Horikoshi",
      genre: "Manga",
      price: 584,
      originalPrice: 649,
      coverImage: "img/my hero academia.jpg",
      format: "Paperback",
      language: "English",
      pages: 192,
      rating: 4.7,
      description:
        "My Hero Academia follows a determined student in a world of heroes, learning that courage can be built from vulnerability.",
      summary:
        "A powerful superhero manga about growth, responsibility, and ambition.",
      isBestSeller: true,
    },
    {
      id: "the-silent-patient",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Thriller",
      price: 429,
      originalPrice: 499,
      coverImage: "img/a silent paitent.jpg",
      format: "Paperback",
      language: "English",
      pages: 336,
      rating: 4.5,
      description:
        "The Silent Patient is a psychologically charged thriller that turns a quiet, chilling mystery into a gripping descent into obsession.",
      summary:
        "A razor-sharp psychological thriller full of suspicion, silence, and secrets.",
      isBestSeller: false,
    },
    {
      id: "the-night-circus",
      title: "The Night Circus",
      author: "Erin Morgenstern",
      genre: "Fantasy",
      price: 539,
      originalPrice: 599,
      coverImage: "img/the night circus.jpg",
      format: "Hardcover",
      language: "English",
      pages: 512,
      rating: 4.7,
      description:
        "The Night Circus creates a dreamy, romantic world where magic blooms in secret and love becomes part of the spectacle.",
      summary:
        "An enchanting fantasy that feels like stepping into a dreamlit midnight wonderland.",
      isBestSeller: false,
    },
    {
      id: "pride-and-prejudice",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Classics",
      price: 349,
      originalPrice: 399,
      coverImage: "img/Pride and Prejudice.jpg",
      format: "Paperback",
      language: "English",
      pages: 432,
      rating: 4.8,
      description:
        "Pride and Prejudice remains one of literature’s sharpest studies of love, first impressions, and social expectations.",
      summary:
        "A timeless classic about wit, romance, and the delicate game of reputation.",
      isBestSeller: false,
    },
    {
      id: "the-name-of-the-wind",
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      genre: "Fantasy",
      price: 649,
      originalPrice: 749,
      coverImage: "img/The Name of the Wind.jpg",
      format: "Hardcover",
      language: "English",
      pages: 662,
      rating: 4.8,
      description:
        "The Name of the Wind follows a gifted storyteller as he retraces the mysteries of his own past and the cost of extraordinary talent.",
      summary: "A lyrical fantasy adventure full of wonder, memory, and magic.",
      isBestSeller: false,
    },
    {
      id: "animal-farm",
      title: "Animal Farm",
      author: "George Orwell",
      genre: "Classics",
      price: 299,
      originalPrice: 349,
      coverImage: "img/animal farm.jpg",
      format: "Paperback",
      language: "English",
      pages: 112,
      rating: 4.6,
      description:
        "Animal Farm is a sharp allegory about power, language, and how public ideals can be twisted by those who claim to serve them.",
      summary: "A brief, powerful classic with enduring political insight.",
      isBestSeller: false,
    },
    {
      id: "the-book-thief",
      title: "The Book Thief",
      author: "Markus Zusak",
      genre: "Fiction",
      price: 499,
      originalPrice: 599,
      coverImage:
        "https://i.pinimg.com/1200x/49/ae/cd/49aecd3900c10ed281522d1c770e4d7d.jpg",
      format: "Paperback",
      language: "English",
      pages: 592,
      rating: 4.7,
      description:
        "The Book Thief explores the power of words and memory through the life of a young girl in wartime Germany.",
      summary:
        "A moving story of resilience, reading, and the quiet power of stories.",
      isBestSeller: false,
    },
    {
      id: "sapiens",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "History",
      price: 699,
      originalPrice: 799,
      coverImage:
        "https://i.pinimg.com/1200x/16/be/62/16be6262f805082192ca1b7c8e7f4e1a.jpg",
      format: "Paperback",
      language: "English",
      pages: 464,
      rating: 4.7,
      description:
        "Sapiens offers a sweeping view of humanity from the dawn of civilisation to the present, asking how our species became dominant.",
      summary:
        "A bold, accessible history of humanity and the forces behind our evolution.",
      isBestSeller: false,
    },
    {
      id: "deep-work",
      title: "Deep Work",
      author: "Cal Newport",
      genre: "Self-help",
      price: 539,
      originalPrice: 599,
      coverImage: "img/deep work.jpg",
      format: "Paperback",
      language: "English",
      pages: 296,
      rating: 4.7,
      description:
        "Deep Work makes a compelling case for focused, distraction-free effort as a competitive advantage in the modern era.",
      summary:
        "A modern productivity book about focus, clarity, and meaningful work.",
      isBestSeller: false,
    },
    {
      id: "the-da-vinci-code",
      title: "The Da Vinci Code",
      author: "Dan Brown",
      genre: "Thriller",
      price: 474,
      originalPrice: 549,
      coverImage:
        "https://i.pinimg.com/736x/e7/9c/b2/e79cb22e3a1e41a9a1e0a365aef79b50.jpg",
      format: "Paperback",
      language: "English",
      pages: 489,
      rating: 4.4,
      description:
        "The Da Vinci Code races readers through art, religion, and secret histories in a high-stakes puzzle of betrayal and truth.",
      summary:
        "A fast-moving historical thriller that keeps the stakes high and the pages turning.",
      isBestSeller: false,
    },
    {
      id: "becoming",
      title: "Becoming",
      author: "Michelle Obama",
      genre: "Biography",
      price: 569,
      originalPrice: 649,
      coverImage:
        "https://i.pinimg.com/1200x/60/01/7d/60017de2488e75f6dc456c3f5f28ed5d.jpg",
      format: "Hardcover",
      language: "English",
      pages: 448,
      rating: 4.8,
      description:
        "Becoming is a thoughtful and deeply personal memoir about identity, purpose, leadership, and the power of resilience.",
      summary:
        "A personal, inspiring memoir from one of the world’s most recognisable public figures.",
      isBestSeller: false,
    },
    {
      id: "the-hobbit",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      price: 389,
      originalPrice: 449,
      coverImage:
        "https://i.pinimg.com/736x/0c/e7/8c/0ce78c88303e78a5d2e93e80984c7df1.jpg",
      format: "Paperback",
      language: "English",
      pages: 310,
      rating: 4.9,
      description:
        "The Hobbit follows Bilbo Baggins on an unexpected adventure that transforms a quiet life into a legend.",
      summary:
        "A warm, adventurous fantasy classic full of wonder, danger, and friendship.",
      isBestSeller: false,
    },
    {
      id: "the-happiness-advantage",
      title: "The Happiness Advantage",
      author: "Shawn Achor",
      genre: "Self-help",
      price: 479,
      originalPrice: 549,
      coverImage:
        "https://i.pinimg.com/1200x/a0/1e/b6/a01eb6eec3b133c2cbddb2999cca43d9.jpg",
      format: "Paperback",
      language: "English",
      pages: 256,
      rating: 4.6,
      description:
        "The Happiness Advantage explains how optimism and habits of joy can improve both wellbeing and performance.",
      summary:
        "A motivational read that blends science and everyday strategies for a better mindset.",
      isBestSeller: false,
    },
    {
      id: "the-bell-jar",
      title: "The Bell Jar",
      author: "Sylvia Plath",
      genre: "Classics",
      price: 329,
      originalPrice: 399,
      coverImage:
        "https://i.pinimg.com/736x/aa/77/d3/aa77d39462c71c266f5867456607c2c9.jpg",
      format: "Paperback",
      language: "English",
      pages: 288,
      rating: 4.5,
      description:
        "The Bell Jar captures a deeply intimate, unsettling look at mental health, identity, and the pressure to appear ordinary.",
      summary:
        "A modern classic about selfhood, isolation, and the search for meaning.",
      isBestSeller: false,
    },
    {
      id: "the-lost-world",
      title: "The Lost World",
      author: "Arthur Conan Doyle",
      genre: "Science Fiction",
      price: 459,
      originalPrice: 519,
      coverImage:
        "https://i.pinimg.com/736x/d3/38/d8/d338d8f548d5f7c8c86a79dd447addb1.jpg",
      format: "Paperback",
      language: "English",
      pages: 320,
      rating: 4.4,
      description:
        "The Lost World sends readers to a plateau where prehistoric life still exists and every expedition becomes a test of human courage.",
      summary:
        "A classic expedition adventure with wonder, peril, and imagination.",
      isBestSeller: false,
    },
    {
      id: "normal-people",
      title: "Normal People",
      author: "Sally Rooney",
      genre: "Romance",
      price: 499,
      originalPrice: 599,
      coverImage:
        "https://i.pinimg.com/736x/bd/7e/9c/bd7e9c9e715e9d30d07a764acdc9d3af.jpg",
      format: "Paperback",
      language: "English",
      pages: 288,
      rating: 4.5,
      description:
        "Normal People looks at connection, distance, and the emotional complexity of love as two people drift in and out of each other’s lives.",
      summary:
        "A modern romance and coming-of-age story with aching emotional intelligence.",
      isBestSeller: false,
    },
    {
      id: "everything-is-fucked",
      title: "Everything Is Fucked",
      author: "Mark Manson",
      genre: "Self-help",
      price: 549,
      originalPrice: 629,
      coverImage: "https://m.media-amazon.com/images/I/718N0ji7n5L.jpg",
      format: "Paperback",
      language: "English",
      pages: 288,
      rating: 4.4,
      description:
        "Everything Is Fucked examines existing beliefs about happiness, discomfort, and purpose in an honest and often provocative way.",
      summary:
        "A candid self-help read about accepting reality and building a better life anyway.",
      isBestSeller: false,
    },
  ].map((book) => ({
    ...book,
    discount: calculateDiscount(book.originalPrice, book.price),
    genre: canonicalGenre(book.genre),
  }));

  const readingDeskArticles = [
    {
      tag: "New Releases",
      title: "The books redefining slow reading for modern life",
      summary:
        "A thoughtful list of titles that reward attention, quiet routines, and richer conversations.",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Reader Picks",
      title: "Why these 5 mystery novels keep readers up past midnight",
      summary:
        "From psychological thrillers to layered crime stories, these picks never let the tension fade.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Guide",
      title: "The reading rituals that make every book feel new again",
      summary:
        "Create a calmer, more intentional reading routine with a few small habits that keep you immersed.",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Fantasy",
      title: "Best fantasy worlds to escape into this season",
      summary:
        "A curated set of magical stories with a deep sense of place and wonder.",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Manga",
      title: "The manga essays that explain why the medium stays so addictive",
      summary:
        "Discover how visual storytelling keeps the emotion and pace moving from first page to final panel.",
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Biography",
      title:
        "Memoirs worth reading twice for the details you missed the first time",
      summary:
        "Life stories with careful observation, memorable narration, and unforgettable people.",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "History",
      title: "Books that make the past feel immediate and alive",
      summary:
        "These histories turn ancient events into vivid, human-centred stories.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Self-help",
      title: "Small habits that create lasting change in busy lives",
      summary:
        "A practical shortlist for readers who want better routines without overhauling their schedule.",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Classics",
      title: "Why treasured classics still feel modern to today’s readers",
      summary:
        "The enduring relevance of sharp observation, strong characters, and timeless ideas.",
      image:
        "https://images.unsplash.com/photo-1528647590675-c8d0c7420d61?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Romance",
      title:
        "The romance reads that turn quiet moments into unforgettable scenes",
      summary:
        "A gentle list of emotional stories with wit, tenderness, and charm.",
      image:
        "https://images.unsplash.com/photo-1513640127649-8d2f4b0fe2ee?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Science Fiction",
      title: "How speculative fiction keeps asking the right questions",
      summary:
        "From future cities to lost worlds, these stories imagine what might come next.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Young Adult",
      title: "Books that turn coming-of-age into a deeply felt experience",
      summary:
        "Stories that balance tenderness, ambition, and the messiness of growing up.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Bestsellers",
      title: "The most-talked-about books readers are buying right now",
      summary:
        "A snapshot of the stories people are recommending again and again.",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "For Parents",
      title: "Reading lists for curious kids and grown-up book lovers alike",
      summary:
        "A playful mix of adventures, wonder, and shared stories worth revisiting.",
      image:
        "https://images.unsplash.com/photo-1516979187454-437ec5d71d3d?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Fiction",
      title: "The fiction stories that linger long after the final page",
      summary:
        "These reads have the kind of emotional texture that keeps coming back to you.",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Feature",
      title: "Why readers keep returning to stories about second chances",
      summary:
        "A look at the emotional power of redemption arcs and fresh starts.",
      image:
        "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "School Reads",
      title: "Classics for thoughtful readers and discussion groups",
      summary:
        "The books that invite debate, reflection, and shared interpretation.",
      image:
        "https://images.unsplash.com/photo-1528647590675-c8d0c7420d61?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Reading List",
      title: "The short, sharp picks for busy weekends and long commutes",
      summary:
        "These are the books that fit a strong reading habit into a packed schedule.",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Art of Storytelling",
      title: "What readers notice in a truly memorable opening chapter",
      summary:
        "The craft behind an opening that sparks curiosity before the first big reveal.",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Weekend Picks",
      title: "A bookshelf worth taking home for a slower kind of joy",
      summary:
        "Thoughtful picks for weekend reading, quiet afternoons, and long-form discovery.",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const persistCart = () => {
    try {
      localStorage.setItem("wordstoreCart", JSON.stringify([...cart.values()]));
    } catch (error) {
      console.warn("Cart could not be saved.", error);
    }
  };

  const getCartTotal = () =>
    [...cart.values()].reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    );

  const ensureCartDrawer = () => {
    let drawer = document.querySelector(".cart-drawer");
    if (drawer) return drawer;

    drawer = document.createElement("aside");
    drawer.className = "cart-drawer";
    drawer.setAttribute("aria-label", "Shopping bag");
    drawer.setAttribute("aria-hidden", "true");
    drawer.innerHTML = `
      <div class="cart-backdrop"></div>
      <div class="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div class="cart-heading">
          <h2 id="cart-title">Your Bag</h2>
          <button class="cart-close" type="button" aria-label="Close shopping bag">×</button>
        </div>
        <div class="cart-items"></div>
        <div class="cart-footer">
          <div class="cart-subtotal"><span>Subtotal</span><strong></strong></div>
          <p class="cart-demo-note">Shipping and discounts calculated at checkout.</p>
          <button class="cart-checkout" type="button">Proceed to Checkout</button>
          <button class="cart-continue" type="button">Continue Shopping</button>
        </div>
      </div>
    `;

    document.body.appendChild(drawer);

    const closeCart = () => {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("cart-is-open");
    };

    drawer.querySelector(".cart-close").addEventListener("click", closeCart);
    drawer.querySelector(".cart-continue").addEventListener("click", closeCart);
    drawer.querySelector(".cart-backdrop").addEventListener("click", closeCart);
    drawer.querySelector(".cart-checkout").addEventListener("click", () => {
      window.location.href = "checkout.html";
    });

    drawer.addEventListener("click", (event) => {
      const row = event.target.closest("[data-cart-id]");
      if (!row) return;
      const item = cart.get(row.dataset.cartId);
      if (!item) return;

      if (event.target.closest('[data-quantity="plus"]')) {
        item.quantity += 1;
      }

      if (event.target.closest('[data-quantity="minus"]')) {
        item.quantity = Math.max(1, item.quantity - 1);
      }

      if (event.target.closest("[data-remove]")) {
        cart.delete(item.id);
      }

      renderCart();
    });

    return drawer;
  };

  const showToast = (message) => {
    let toast = document.querySelector(".store-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "store-toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(
      () => toast.classList.remove("is-visible"),
      2400,
    );
  };

  const renderCart = () => {
    const items = [...cart.values()];
    const quantity = items.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0,
    );
    bagCount.textContent = String(quantity);
    bagButton.setAttribute(
      "aria-label",
      `Shopping bag, ${quantity} items, ${formatMoney(getCartTotal())}`,
    );

    const drawer = ensureCartDrawer();
    const list = drawer.querySelector(".cart-items");
    const total = getCartTotal();

    list.innerHTML = items.length
      ? items
          .map(
            (item) => `
          <article class="cart-item" data-cart-id="${item.id}">
            <img src="${item.coverImage || item.image || ""}" alt="${escapeHtml(item.title)} cover" />
            <div class="cart-item-info">
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.author)}</p>
              <strong>${formatMoney(item.price)}</strong>
              <div class="quantity-control">
                <button type="button" data-quantity="minus" aria-label="Decrease ${escapeHtml(item.title)} quantity">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-quantity="plus" aria-label="Increase ${escapeHtml(item.title)} quantity">+</button>
                <button type="button" class="remove-item" data-remove>Remove</button>
              </div>
            </div>
          </article>
        `,
          )
          .join("")
      : '<div class="cart-empty"><strong>Your bag is empty.</strong><p>Discover your next favourite story.</p></div>';

    drawer.querySelector(".cart-subtotal strong").textContent =
      formatMoney(total);
    drawer.querySelector(".cart-footer").hidden = !items.length;
    persistCart();
  };

  const openCart = () => {
    const drawer = ensureCartDrawer();
    renderCart();
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-is-open");
    drawer.querySelector(".cart-close").focus();
  };

  const addToCart = (book) => {
    const existing = cart.get(book.id) || { ...book, quantity: 0 };
    existing.quantity += 1;
    cart.set(book.id, existing);
    renderCart();
    showToast(`${book.title} added to your bag`);
  };

  const buildProductCard = (book) => {
    const card = document.createElement("article");
    card.className = "product";
    card.dataset.bookId = book.id;
    card.dataset.genre = book.genre;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${book.title} details`);

    card.innerHTML = `
      <div class="product-img">
        <span class="discount">${book.discount || 0}% OFF</span>
        <img src="${book.coverImage}" alt="${escapeHtml(book.title)} book cover" />
        <button class="add" type="button" aria-label="Add ${escapeHtml(book.title)} to bag">+</button>
      </div>
      <div class="product-info">
        <div class="author">${escapeHtml(book.author)}</div>
        <h3>${escapeHtml(book.title)}</h3>
        <div class="price">
          <span class="old">${formatMoney(book.originalPrice)}</span>
          <span class="new">${formatMoney(book.price)}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", (event) => {
      if (event.target.closest(".add")) {
        event.stopPropagation();
        addToCart(book);
        return;
      }
      showBookDetail(book.id);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showBookDetail(book.id);
      }
    });

    return card;
  };

  const buildRecommendationCard = (book) => {
    const card = document.createElement("article");
    card.className = "product related-product";
    card.dataset.bookId = book.id;
    card.innerHTML = `
      <div class="product-img">
        <span class="discount">${book.discount || 0}% OFF</span>
        <img src="${book.coverImage}" alt="${escapeHtml(book.title)} cover" />
        <button class="add" type="button" aria-label="Add ${escapeHtml(book.title)} to bag">+</button>
      </div>
      <div class="product-info">
        <div class="author">${escapeHtml(book.author)}</div>
        <h3>${escapeHtml(book.title)}</h3>
        <div class="price">
          <span class="old">${formatMoney(book.originalPrice)}</span>
          <span class="new">${formatMoney(book.price)}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", (event) => {
      if (event.target.closest(".add")) {
        event.stopPropagation();
        addToCart(book);
        return;
      }
      showBookDetail(book.id);
    });

    return card;
  };

  const matchesSelectedGenre = (book) => {
    if (!state.selectedGenre) return true;
    return normalizeGenre(book.genre) === normalizeGenre(state.selectedGenre);
  };

  const matchesSearch = (book) => {
    if (!state.searchTerm) return true;
    const haystack = `${book.title} ${book.author} ${book.genre}`.toLowerCase();
    return haystack.includes(state.searchTerm.toLowerCase());
  };

  const renderBrowseSection = () => {
    const browseProducts = document.querySelector(".browse-products");
    const filterRow = document.querySelector(".browse-filters");
    const genreOrder = [
      "All books",
      "Fiction",
      "Non-Fiction",
      "Manga",
      "Mystery",
      "Thriller",
      "Romance",
      "Fantasy",
      "Science Fiction",
      "Biography",
      "Self-help",
      "History",
      "Young Adult",
      "Classics",
    ];
    const availableGenres = [...new Set(books.map((book) => book.genre))].sort(
      (a, b) => {
        const first = genreOrder.indexOf(a);
        const second = genreOrder.indexOf(b);
        return (first === -1 ? 999 : first) - (second === -1 ? 999 : second);
      },
    );

    if (filterRow) {
      filterRow.innerHTML = "";
      const allButton = document.createElement("button");
      allButton.type = "button";
      allButton.textContent = "All books";
      allButton.dataset.genre = "";
      allButton.classList.toggle("is-active", !state.selectedGenre);
      allButton.addEventListener("click", () => {
        state.selectedGenre = "";
        renderBrowseSection();
      });
      filterRow.appendChild(allButton);

      availableGenres.forEach((genre) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = genre;
        button.dataset.genre = genre;
        button.classList.toggle("is-active", state.selectedGenre === genre);
        button.addEventListener("click", () => {
          state.selectedGenre = genre;
          renderBrowseSection();
          document
            .querySelector("#browse-books")
            .scrollIntoView({ behavior: "smooth", block: "start" });
        });
        filterRow.appendChild(button);
      });
    }

    const browseBooks = books.filter(
      (book) => matchesSelectedGenre(book) && matchesSearch(book),
    );
    if (browseProducts) {
      browseProducts.innerHTML = "";
      browseBooks.forEach((book) =>
        browseProducts.appendChild(buildProductCard(book)),
      );
    }

    const heading = document.querySelector("#browse-books .section-head h2");
    if (heading) {
      heading.textContent = state.selectedGenre || "Browse all books";
    }

    const filterNotice =
      document.querySelector(".filter-notice") || document.createElement("div");
    filterNotice.className = "filter-notice";
    if (!document.querySelector(".filter-notice")) {
      document
        .querySelector("#browse-books .section-head")
        .insertAdjacentElement("afterend", filterNotice);
    }

    const filters = [
      state.selectedGenre && `Genre: ${state.selectedGenre}`,
      state.searchTerm && `Search: “${state.searchTerm}”`,
    ].filter(Boolean);
    filterNotice.innerHTML = filters.length
      ? `${filters.join(" • ")} <button type="button">Clear</button>`
      : "Explore our shelves and discover your next favourite read.";

    const clearButton = filterNotice.querySelector("button");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        state.selectedGenre = "";
        state.searchTerm = "";
        const searchInput = document.querySelector(".search input");
        if (searchInput) searchInput.value = "";
        renderBrowseSection();
      });
    }

    if (!browseBooks.length) {
      filterNotice.innerHTML =
        'No books matched your current filter. <button type="button">Clear</button>';
      filterNotice.querySelector("button")?.addEventListener("click", () => {
        state.selectedGenre = "";
        state.searchTerm = "";
        document.querySelector(".search input").value = "";
        renderBrowseSection();
      });
    }
  };

  const renderBestsellers = () => {
    const section = document.querySelector("#bestsellers");
    if (!section) return;

    const existingProducts = section.querySelectorAll(".products");
    existingProducts.forEach((productRow) => productRow.remove());

    const bestsellers = books.filter((book) => book.isBestSeller);
    const visibleBestsellers = state.showAllBestsellers
      ? bestsellers
      : bestsellers.slice(0, 5);
    const grid = document.createElement("div");
    grid.className = "products bestseller-grid";
    visibleBestsellers.forEach((book) =>
      grid.appendChild(buildProductCard(book)),
    );
    section.appendChild(grid);

    const viewAll = section.querySelector(".view-all");
    if (viewAll) {
      viewAll.textContent = state.showAllBestsellers
        ? "Show less ↑"
        : "Show all →";
      viewAll.onclick = (event) => {
        event.preventDefault();
        state.showAllBestsellers = !state.showAllBestsellers;
        renderBestsellers();
      };
    }
  };

  const renderMangaSection = () => {
    const section = document.querySelector("#manga");
    if (!section) return;

    const grid =
      section.querySelector(".products") || document.createElement("div");
    grid.className = "products";
    const mangaBooks = books.filter((book) => book.genre === "Manga");
    const visibleBooks = state.showAllManga
      ? mangaBooks
      : mangaBooks.slice(0, 5);
    grid.innerHTML = "";
    visibleBooks.forEach((book) => grid.appendChild(buildProductCard(book)));
    section.appendChild(grid);

    const viewAll = section.querySelector(".view-all");
    if (viewAll) {
      viewAll.textContent = state.showAllManga ? "Show less ↑" : "Show all →";
      viewAll.onclick = (event) => {
        event.preventDefault();
        state.showAllManga = !state.showAllManga;
        renderMangaSection();
      };
    }
  };

  const renderReadingDesk = () => {
    const section = document.querySelector("#reading-desk");
    if (!section) return;

    const articleGrid = section.querySelector(".articles");
    if (!articleGrid) return;

    const visibleArticles = state.showAllArticles
      ? readingDeskArticles
      : readingDeskArticles.slice(0, 6);
    articleGrid.innerHTML = visibleArticles
      .map(
        (article, index) => `
      <article class="article ${index === 0 ? "featured" : ""}">
        <div class="tag">${escapeHtml(article.tag)}</div>
        <img class="article-image" src="${article.image}" alt="${escapeHtml(article.title)}" />
        <h3>${escapeHtml(article.title)}</h3>
        <p>${escapeHtml(article.summary)}</p>
      </article>
    `,
      )
      .join("");

    const viewAll = section.querySelector(".view-all");
    if (viewAll) {
      viewAll.textContent = state.showAllArticles
        ? "Show less ↑"
        : "Show all →";
      viewAll.onclick = (event) => {
        event.preventDefault();
        state.showAllArticles = !state.showAllArticles;
        renderReadingDesk();
      };
    }
  };

  const renderBookDetails = (bookId) => {
    const book = books.find((item) => item.id === bookId);
    if (!book) return;

    const panel =
      document.querySelector(".book-detail") ||
      document.createElement("section");
    panel.className = "book-detail";
    panel.id = "book-detail";

    const recommendations = books
      .filter(
        (item) =>
          item.id !== book.id &&
          canonicalGenre(item.genre) === canonicalGenre(book.genre),
      )
      .slice(0, 4);
    const fallback = books.filter((item) => item.id !== book.id).slice(0, 4);
    const related = recommendations.length ? recommendations : fallback;

    panel.innerHTML = `
      <button class="detail-close" type="button" aria-label="Close book details">×</button>
      <div class="detail-main">
        <img src="${book.coverImage}" alt="${escapeHtml(book.title)} cover" />
        <div>
          <p class="detail-kicker">BOOK DETAILS</p>
          <h2>${escapeHtml(book.title)}</h2>
          <button class="detail-author" type="button">by ${escapeHtml(book.author)}</button>
          <p class="detail-rating">★★★★★ <span>${book.rating.toFixed(1)} Reader rating</span></p>
          <p class="detail-summary">${escapeHtml(book.summary)}</p>
          <dl>
            <div><dt>Author</dt><dd>${escapeHtml(book.author)}</dd></div>
            <div><dt>Genre</dt><dd>${escapeHtml(book.genre)}</dd></div>
            <div><dt>Format</dt><dd>${escapeHtml(book.format)}</dd></div>
            <div><dt>Language</dt><dd>${escapeHtml(book.language)}</dd></div>
            <div><dt>Pages</dt><dd>${book.pages}</dd></div>
          </dl>
          <p class="detail-price">
            <span>${formatMoney(book.price)}</span>
            <del>${formatMoney(book.originalPrice)}</del>
            <small>${book.discount}% off</small>
          </p>
          <button class="detail-add" type="button">Add to Bag</button>
        </div>
      </div>
      <div class="detail-copy">
        <h3>About this book</h3>
        <p>${escapeHtml(book.description)}</p>
        <h3>Short summary</h3>
        <p>${escapeHtml(book.summary)}</p>
        <h3>Customer reviews</h3>
        <p class="detail-rating">★★★★★ <span>${book.rating.toFixed(1)} / 5 by readers</span></p>
      </div>
      <div class="detail-related">
        <h3>More books you may like</h3>
        <div class="related-list">
          ${related
            .map(
              (item) => `
            <button type="button" data-recommendation-id="${item.id}">
              ${escapeHtml(item.title)}
              <span>by ${escapeHtml(item.author)}</span>
            </button>
          `,
            )
            .join("")}
        </div>
      </div>
    `;

    const existingDetail = document.querySelector(".book-detail");
    if (!existingDetail) {
      const browseSection = document.querySelector("#browse-books");
      if (browseSection) {
        browseSection.insertAdjacentElement("afterend", panel);
      }
    }

    panel.querySelector(".detail-close").addEventListener("click", () => {
      panel.remove();
      state.currentBookId = "";
      history.pushState(
        {},
        "",
        window.location.pathname + window.location.search,
      );
    });

    panel
      .querySelector(".detail-add")
      .addEventListener("click", () => addToCart(book));
    panel.querySelector(".detail-author").addEventListener("click", () => {
      state.selectedGenre = "";
      state.searchTerm = book.author;
      renderBrowseSection();
      document
        .querySelector("#browse-books")
        .scrollIntoView({ behavior: "smooth", block: "start" });
      panel.remove();
    });

    panel.querySelectorAll("[data-recommendation-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const selectedBook = books.find(
          (item) => item.id === button.dataset.recommendationId,
        );
        if (selectedBook) {
          showBookDetail(selectedBook.id);
        }
      });
    });

    state.currentBookId = book.id;
    const hashValue = `#product-${book.id}`;
    if (window.location.hash !== hashValue) {
      history.pushState({}, "", hashValue);
    }
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showBookDetail = (bookId) => {
    const book = books.find((item) => item.id === bookId);
    if (!book) return;
    renderBookDetails(book.id);
  };

  const attachHashRouting = () => {
    const routeBook = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#product-")) {
        const panel = document.querySelector(".book-detail");
        if (panel) panel.remove();
        return;
      }

      const id = hash.replace("#product-", "");
      showBookDetail(id);
    };

    window.addEventListener("hashchange", routeBook);
    routeBook();
  };

  const attachSearch = () => {
    const input = document.querySelector(".search input");
    if (!input) return;

    input.addEventListener("input", (event) => {
      state.searchTerm = event.target.value.trim();
      renderBrowseSection();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        document
          .querySelector("#browse-books")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  const attachGenreNavigation = () => {
    document.querySelectorAll(".category").forEach((tile) => {
      tile.addEventListener("click", (event) => {
        event.preventDefault();
        const genreText =
          tile.querySelector("h3")?.textContent.trim() || "Fiction";
        state.selectedGenre = canonicalGenre(genreText);
        renderBrowseSection();
        document
          .querySelector("#browse-books")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const attachViewAllNavigation = () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        history.pushState({}, "", href);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const restoreCart = () => {
    try {
      const savedItems = JSON.parse(
        localStorage.getItem("wordstoreCart") || "[]",
      );
      savedItems.forEach((item) => {
        const normalized = {
          ...item,
          price: Number(item.price || 0),
          quantity: Number(item.quantity || 1),
          id: item.id || item.title,
        };
        cart.set(normalized.id, normalized);
      });
    } catch (error) {
      localStorage.removeItem("wordstoreCart");
      console.warn("Saved cart data could not be restored.", error);
    }
  };

  const initialise = () => {
    restoreCart();
    attachHashRouting();
    attachSearch();
    attachGenreNavigation();
    attachViewAllNavigation();
    renderBrowseSection();
    renderBestsellers();
    renderMangaSection();
    renderReadingDesk();
    renderCart();

    bagButton.addEventListener("click", openCart);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const drawer = document.querySelector(".cart-drawer");
        if (drawer) {
          drawer.classList.remove("is-open");
          drawer.setAttribute("aria-hidden", "true");
          document.body.classList.remove("cart-is-open");
        }
      }
    });
  };

  initialise();
})();
