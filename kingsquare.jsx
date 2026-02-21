import { useState, useEffect, useRef } from "react";

const KENTE_COLORS = {
  gold: "#D4A017", deepGold: "#B8860B", warmBrown: "#5C3317", richBlack: "#1A1110",
  terracotta: "#C75B39", forest: "#2D5A27", cream: "#FFF8E7", sand: "#F5E6CC",
  midnight: "#0D1117", charcoal: "#1C2026", slate: "#252A31", warmGray: "#2A2520",
  accent: "#E8A849", health: "#4CAF50", mental: "#7B68EE", social: "#FF7043",
  food: "#26A69A", plan: "#FF8F00", fitness: "#00BCD4",
};

const DAILY_THOUGHTS = [
  { quote: "A man who stands for nothing will fall for anything.", author: "Malcolm X", theme: "Purpose" },
  { quote: "The time is always right to do what is right.", author: "Martin Luther King Jr.", theme: "Integrity" },
  { quote: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", theme: "Growth" },
  { quote: "Success is to be measured not so much by the position that one has reached in life as by the obstacles overcome.", author: "Booker T. Washington", theme: "Perseverance" },
  { quote: "If there is no struggle, there is no progress.", author: "Frederick Douglass", theme: "Strength" },
  { quote: "The soul that is within me no man can degrade.", author: "Frederick Douglass", theme: "Dignity" },
  { quote: "We may encounter many defeats but we must not be defeated.", author: "Maya Angelou", theme: "Resilience" },
  { quote: "Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly.", author: "Langston Hughes", theme: "Vision" },
  { quote: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X", theme: "Wisdom" },
  { quote: "The most common way people give up their power is by thinking they don't have any.", author: "Alice Walker", theme: "Empowerment" },
  { quote: "In recognizing the humanity of our fellow beings, we pay ourselves the highest tribute.", author: "Thurgood Marshall", theme: "Brotherhood" },
  { quote: "I have learned over the years that when one's mind is made up, this diminishes fear.", author: "Rosa Parks", theme: "Determination" },
  { quote: "Not everything that is faced can be changed, but nothing can be changed until it is faced.", author: "James Baldwin", theme: "Truth" },
  { quote: "You don't make progress by standing on the sidelines. You make progress by implementing ideas.", author: "Shirley Chisholm", theme: "Action" },
  { quote: "Every great dream begins with a dreamer.", author: "Harriet Tubman", theme: "Aspiration" },
  { quote: "The cost of liberty is less than the price of repression.", author: "W.E.B. Du Bois", theme: "Freedom" },
  { quote: "Where there is no vision, there is no hope.", author: "George Washington Carver", theme: "Hope" },
  { quote: "Change will not come if we wait for some other person or some other time.", author: "Barack Obama", theme: "Initiative" },
  { quote: "A people without the knowledge of their past history is like a tree without roots.", author: "Marcus Garvey", theme: "Heritage" },
  { quote: "Service to others is the rent you pay for your room here on earth.", author: "Muhammad Ali", theme: "Service" },
  { quote: "Impossible is just a big word thrown around by small men.", author: "Muhammad Ali", theme: "Belief" },
  { quote: "The greatest wealth is health.", author: "Virgil", theme: "Vitality" },
  { quote: "One love, one heart. Let's get together and feel all right.", author: "Bob Marley", theme: "Unity" },
  { quote: "Emancipate yourselves from mental slavery. None but ourselves can free our minds.", author: "Bob Marley", theme: "Liberation" },
  { quote: "Take care of your body. It is the only place you have to live.", author: "Jim Rohn", theme: "Wellness" },
  { quote: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt", theme: "Self-Worth" },
  { quote: "The measure of a man is what he does with power.", author: "Plato", theme: "Character" },
  { quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson", theme: "Legacy" },
  { quote: "Intelligence is the ability to adapt to change.", author: "Stephen Hawking", theme: "Adaptability" },
  { quote: "A man's health can be judged by which he takes two at a time — pills or stairs.", author: "Joan Welsh", theme: "Health" },
];

// ======== MEAL PLANS (AA + CARIBBEAN) ========
const AA_MEAL_PLAN = {
  title: "Soul Food Reimagined", subtitle: "Heart-healthy African American meals for the King over 50",
  flag: "🇺🇸", icon: "🫘", color: "#FF7043",
  focus: "Lower sodium, heart-healthy fats, high fiber, blood sugar friendly",
  dailyTargets: { calories: "1,800–2,000", protein: "80–100g", fiber: "30g+", sodium: "<1,500mg" },
  days: [
    { day: "Monday", theme: "Southern Comfort Start", meals: [
      { type: "Breakfast", icon: "🌅", name: "Turkey Sausage & Grits Bowl", desc: "Stone-ground grits with lean turkey sausage, sautéed bell peppers, and a poached egg", calories: 380, protein: 28, carbs: 40, fat: 12, fiber: 4, tip: "Use stone-ground grits — more fiber than instant. Skip the butter, add a splash of hot sauce." },
      { type: "Mid-Morning", icon: "🍎", name: "Apple & Almond Butter", desc: "Sliced Granny Smith apple with 2 tbsp natural almond butter", calories: 220, protein: 6, carbs: 28, fat: 12, fiber: 5, tip: "Almonds help lower LDL cholesterol — key for Black men's heart health." },
      { type: "Lunch", icon: "☀️", name: "Smothered Turkey Neck & Collards", desc: "Braised turkey necks in low-sodium gravy over collard greens with brown rice", calories: 480, protein: 35, carbs: 42, fat: 16, fiber: 8, tip: "Collards are loaded with calcium and vitamin K. Cook with smoked turkey instead of ham hock." },
      { type: "Afternoon", icon: "🥜", name: "Boiled Peanuts", desc: "Half cup Cajun boiled peanuts with lemon water", calories: 150, protein: 7, carbs: 8, fat: 10, fiber: 3, tip: "A Southern classic — boiled peanuts have more antioxidants than raw or roasted." },
      { type: "Dinner", icon: "🌙", name: "Baked Catfish & Black-Eyed Peas", desc: "Cornmeal-crusted baked catfish with black-eyed peas, sautéed okra, and cornbread muffin", calories: 520, protein: 38, carbs: 48, fat: 18, fiber: 10, tip: "Bake instead of fry — same crunch, 60% less fat. Black-eyed peas lower blood pressure." },
      { type: "Evening", icon: "🍵", name: "Warm Cinnamon Milk", desc: "Warm oat milk with cinnamon and a drizzle of honey", calories: 120, protein: 3, carbs: 18, fat: 4, fiber: 1, tip: "Cinnamon helps regulate blood sugar. Great before bed for restful sleep." }
    ]},
    { day: "Tuesday", theme: "Creole Power Day", meals: [
      { type: "Breakfast", icon: "🌅", name: "Sweet Potato Hash & Eggs", desc: "Diced sweet potato, turkey bacon, onion, and bell pepper hash topped with two scrambled eggs", calories: 410, protein: 26, carbs: 38, fat: 18, fiber: 5, tip: "Sweet potatoes are low glycemic — they won't spike your sugar like white potatoes." },
      { type: "Mid-Morning", icon: "🫐", name: "Mixed Berry Smoothie", desc: "Blueberries, strawberries, banana, spinach, and Greek yogurt", calories: 240, protein: 15, carbs: 38, fat: 4, fiber: 6, tip: "Blueberries reduce inflammation and protect brain health — crucial after 50." },
      { type: "Lunch", icon: "☀️", name: "Shrimp & Chicken Gumbo", desc: "Low-sodium gumbo with shrimp, chicken, okra, and filé powder over brown rice", calories: 460, protein: 34, carbs: 44, fat: 14, fiber: 6, tip: "Okra in gumbo is a natural thickener AND helps lower cholesterol." },
      { type: "Afternoon", icon: "🥕", name: "Hummus & Veggie Sticks", desc: "Roasted red pepper hummus with celery, carrots, and cucumber", calories: 170, protein: 6, carbs: 20, fat: 8, fiber: 5, tip: "Chickpeas are high in potassium — helps counteract sodium and lower BP." },
      { type: "Dinner", icon: "🌙", name: "Smothered Pork Chop & Greens", desc: "Thin-cut boneless pork chop smothered in mushroom gravy with turnip greens and wild rice", calories: 490, protein: 36, carbs: 40, fat: 20, fiber: 7, tip: "Choose center-cut pork — much leaner. Turnip greens have more calcium than kale." },
      { type: "Evening", icon: "🍵", name: "Chamomile & Lemon Tea", desc: "Hot chamomile tea with fresh lemon slice", calories: 5, protein: 0, carbs: 1, fat: 0, fiber: 0, tip: "Chamomile reduces anxiety and promotes deep sleep. A nightly ritual for kings." }
    ]},
    { day: "Wednesday", theme: "Meatless Soul Wednesday", meals: [
      { type: "Breakfast", icon: "🌅", name: "Oatmeal with Pecans & Peaches", desc: "Steel-cut oats with toasted pecans, sliced peaches, and a touch of maple syrup", calories: 360, protein: 10, carbs: 52, fat: 14, fiber: 8, tip: "Steel-cut oats have a lower glycemic index than rolled. Pecans are heart-healthy." },
      { type: "Mid-Morning", icon: "🍌", name: "Banana & Peanut Butter", desc: "One banana with 2 tbsp natural peanut butter", calories: 280, protein: 8, carbs: 35, fat: 14, fiber: 4, tip: "Potassium in bananas helps regulate blood pressure — vital for Black men." },
      { type: "Lunch", icon: "☀️", name: "Red Beans & Brown Rice", desc: "New Orleans-style red beans (no pork) with brown rice, sautéed peppers, and hot sauce", calories: 440, protein: 18, carbs: 72, fat: 6, fiber: 14, tip: "Red beans are a complete protein with rice. 14g of fiber keeps your heart strong." },
      { type: "Afternoon", icon: "🥑", name: "Avocado Toast Bites", desc: "Whole grain toast with mashed avocado, cherry tomatoes, and everything seasoning", calories: 200, protein: 5, carbs: 22, fat: 12, fiber: 6, tip: "Avocado's healthy fats help absorb fat-soluble vitamins and reduce inflammation." },
      { type: "Dinner", icon: "🌙", name: "Stuffed Bell Peppers", desc: "Bell peppers stuffed with seasoned lentils, mushrooms, corn, and topped with sharp cheddar", calories: 420, protein: 22, carbs: 52, fat: 14, fiber: 12, tip: "Going meatless one day a week reduces heart disease risk by 19%." },
      { type: "Evening", icon: "🍵", name: "Hibiscus (Sorrel) Tea", desc: "Chilled hibiscus tea with ginger", calories: 15, protein: 0, carbs: 4, fat: 0, fiber: 0, tip: "Hibiscus tea lowers blood pressure by 7+ points. A delicious medicine." }
    ]},
    { day: "Thursday", theme: "BBQ & Grill Day", meals: [
      { type: "Breakfast", icon: "🌅", name: "Salmon Croquettes & Toast", desc: "Pan-seared salmon cakes with whole wheat toast and sliced tomato", calories: 390, protein: 30, carbs: 32, fat: 16, fiber: 4, tip: "Wild salmon is packed with omega-3s — reduces inflammation and protects your heart." },
      { type: "Mid-Morning", icon: "🥜", name: "Trail Mix", desc: "Walnuts, dried cranberries, dark chocolate chips, and pumpkin seeds", calories: 210, protein: 6, carbs: 22, fat: 12, fiber: 3, tip: "Walnuts are the #1 nut for brain health. Protect your mind, King." },
      { type: "Lunch", icon: "☀️", name: "BBQ Chicken Thigh & Slaw", desc: "Grilled chicken thigh with sugar-free BBQ sauce, vinegar coleslaw, and baked beans", calories: 500, protein: 38, carbs: 44, fat: 18, fiber: 8, tip: "Vinegar-based slaw instead of mayo cuts 200+ calories." },
      { type: "Afternoon", icon: "🍉", name: "Watermelon & Feta", desc: "Cubed watermelon with crumbled feta and fresh mint", calories: 160, protein: 5, carbs: 24, fat: 5, fiber: 1, tip: "Watermelon contains citrulline — improves blood flow and lowers blood pressure." },
      { type: "Dinner", icon: "🌙", name: "Smoked Turkey Leg & Sweet Potatoes", desc: "Smoked turkey drumstick with mashed sweet potatoes and steamed broccoli", calories: 510, protein: 42, carbs: 46, fat: 14, fiber: 7, tip: "Turkey is leaner than beef with just as much protein." },
      { type: "Evening", icon: "🍵", name: "Golden Turmeric Milk", desc: "Warm almond milk with turmeric, black pepper, and honey", calories: 100, protein: 2, carbs: 14, fat: 4, fiber: 0, tip: "Turmeric is a powerful anti-inflammatory. Black pepper increases absorption by 2000%." }
    ]},
    { day: "Friday", theme: "Fish Fry Friday (Healthy Way)", meals: [
      { type: "Breakfast", icon: "🌅", name: "Cheese Grits & Turkey Sausage", desc: "Creamy cheddar grits with crumbled turkey sausage and green onion", calories: 400, protein: 24, carbs: 42, fat: 16, fiber: 3, tip: "Use sharp cheddar — more flavor with less cheese." },
      { type: "Mid-Morning", icon: "🍊", name: "Orange & Walnuts", desc: "One navel orange with a handful of walnuts", calories: 200, protein: 5, carbs: 22, fat: 12, fiber: 4, tip: "Vitamin C from oranges helps absorb iron — important for energy after 50." },
      { type: "Lunch", icon: "☀️", name: "Air-Fried Fish Sandwich", desc: "Air-fried whiting on whole wheat bun with lettuce, tomato, and hot sauce", calories: 440, protein: 32, carbs: 40, fat: 16, fiber: 4, tip: "Air frying cuts oil by 80%. Still get that Friday fish fry crunch." },
      { type: "Afternoon", icon: "🫘", name: "Roasted Chickpea Snack", desc: "Seasoned roasted chickpeas with smoked paprika", calories: 160, protein: 8, carbs: 22, fat: 4, fiber: 6, tip: "High fiber, high protein, crunchy. The perfect replacement for chips." },
      { type: "Dinner", icon: "🌙", name: "Blackened Tilapia & Dirty Rice", desc: "Cajun-blackened tilapia with dirty rice (ground turkey) and steamed green beans", calories: 490, protein: 40, carbs: 44, fat: 14, fiber: 6, tip: "Two fish meals a week reduces heart attack risk by 36%." },
      { type: "Evening", icon: "🍵", name: "Peppermint Tea", desc: "Hot peppermint tea — aids digestion after a full day", calories: 5, protein: 0, carbs: 0, fat: 0, fiber: 0, tip: "Peppermint settles the stomach. Perfect end to Fish Friday." }
    ]},
    { day: "Saturday", theme: "Weekend Soul Brunch", meals: [
      { type: "Brunch", icon: "🌅", name: "Soul Food Brunch Plate", desc: "Chicken & waffle (whole grain) with turkey bacon, scrambled eggs, and fruit cup", calories: 580, protein: 38, carbs: 52, fat: 22, fiber: 5, tip: "Use whole grain waffle mix and baked chicken strips. Weekend treat done right." },
      { type: "Mid-Day", icon: "🥤", name: "Green Power Smoothie", desc: "Kale, mango, banana, ginger, and coconut water", calories: 200, protein: 4, carbs: 42, fat: 2, fiber: 5, tip: "Coconut water has more potassium than a banana." },
      { type: "Late Lunch", icon: "☀️", name: "Pulled Chicken Sandwich", desc: "Slow-cooked pulled chicken with vinegar BBQ on whole wheat with baked sweet potato fries", calories: 480, protein: 34, carbs: 52, fat: 14, fiber: 6, tip: "Slow-cooking makes chicken tender without added fat. Bake those fries, King." },
      { type: "Afternoon", icon: "🍑", name: "Peach & Cottage Cheese", desc: "Fresh peach slices with low-fat cottage cheese and cinnamon", calories: 180, protein: 14, carbs: 22, fat: 3, fiber: 2, tip: "Cottage cheese is protein-packed. Cinnamon adds flavor without sugar." },
      { type: "Dinner", icon: "🌙", name: "Herb Chicken & Cauliflower Mac", desc: "Herb-baked chicken thighs with cauliflower-blend mac & cheese and collard greens", calories: 520, protein: 40, carbs: 38, fat: 22, fiber: 8, tip: "Blend cauliflower into the mac sauce — same creaminess, more fiber, fewer carbs." },
      { type: "Evening", icon: "🍵", name: "Warm Apple Cider", desc: "Heated apple cider with cinnamon stick and cloves", calories: 95, protein: 0, carbs: 24, fat: 0, fiber: 0, tip: "A cozy Saturday night. Cinnamon and cloves are anti-inflammatory." }
    ]},
    { day: "Sunday", theme: "Sunday Supper (Family Table)", meals: [
      { type: "Breakfast", icon: "🌅", name: "Buttermilk Pancakes & Fruit", desc: "Whole wheat buttermilk pancakes (2) with mixed berries and real maple syrup", calories: 380, protein: 12, carbs: 58, fat: 12, fiber: 4, tip: "Buttermilk is lower in fat and makes pancakes fluffy. Use whole wheat flour." },
      { type: "Mid-Morning", icon: "🫐", name: "Yogurt Parfait", desc: "Greek yogurt layered with granola, blueberries, and honey", calories: 260, protein: 18, carbs: 34, fat: 6, fiber: 3, tip: "Greek yogurt has 2x the protein of regular yogurt. Feed your muscles." },
      { type: "Sunday Dinner", icon: "🍽️", name: "The Sunday Plate", desc: "Baked chicken, candied yams (reduced sugar), collard greens, mac & cheese, and cornbread", calories: 650, protein: 42, carbs: 62, fat: 24, fiber: 10, tip: "Sunday dinner is sacred. Bake don't fry, reduce sugar in yams by half." },
      { type: "Afternoon", icon: "🍑", name: "Mini Peach Cobbler", desc: "Individual-portion peach cobbler with oat crumble topping", calories: 220, protein: 3, carbs: 38, fat: 7, fiber: 3, tip: "Portion control is king. One small ramekin lets you enjoy the classic." },
      { type: "Light Supper", icon: "🌙", name: "Turkey Vegetable Soup", desc: "Light turkey and vegetable soup with crackers", calories: 240, protein: 18, carbs: 28, fat: 6, fiber: 5, tip: "Light supper after Sunday dinner gives your body time to process." },
      { type: "Evening", icon: "🍵", name: "Lemon Ginger Tea", desc: "Fresh ginger root and lemon in hot water", calories: 10, protein: 0, carbs: 2, fat: 0, fiber: 0, tip: "Ginger fights inflammation. Prepare your body for a strong Monday." }
    ]}
  ]
};

const CARIBBEAN_MEAL_PLAN = {
  title: "Yard Food for Life", subtitle: "Heart-smart Caribbean meals for the King over 50",
  flag: "🇯🇲", icon: "🥥", color: "#26A69A",
  focus: "Anti-inflammatory, low sodium, blood sugar balance, prostate health",
  dailyTargets: { calories: "1,800–2,000", protein: "80–100g", fiber: "30g+", sodium: "<1,500mg" },
  days: [
    { day: "Monday", theme: "Yaad Morning Energy", meals: [
      { type: "Breakfast", icon: "🌅", name: "Ackee & Saltfish (Light)", desc: "Ackee with reduced-salt codfish, steamed callaloo, boiled green banana, and roasted breadfruit", calories: 420, protein: 28, carbs: 42, fat: 16, fiber: 6, tip: "Soak saltfish overnight, change water twice — cuts sodium by 70%." },
      { type: "Mid-Morning", icon: "🥭", name: "Mango & Coconut Water", desc: "Fresh East Indian mango slices with pure coconut water", calories: 180, protein: 2, carbs: 42, fat: 1, fiber: 3, tip: "Coconut water is nature's electrolyte drink. Mango is loaded with vitamin A for prostate health." },
      { type: "Lunch", icon: "☀️", name: "Brown Stew Chicken & Provisions", desc: "Brown stew chicken (skinless) with boiled yam, dasheen, and steamed pak choi", calories: 480, protein: 36, carbs: 48, fat: 14, fiber: 7, tip: "Remove chicken skin before stewing — saves 100+ calories." },
      { type: "Afternoon", icon: "🥑", name: "Pear (Avocado) & Crackers", desc: "Half a Jamaican pear (avocado) with whole wheat crackers", calories: 220, protein: 4, carbs: 18, fat: 16, fiber: 7, tip: "Jamaican avocados are larger and creamier — heart-healthy monounsaturated fat." },
      { type: "Dinner", icon: "🌙", name: "Steamed Fish & Okra", desc: "Steamed red snapper with okra, cho cho, tomato, Scotch bonnet, served with bammy", calories: 440, protein: 40, carbs: 36, fat: 12, fiber: 6, tip: "Steamed fish is Jamaica's health secret. Scotch bonnet has capsaicin that fights inflammation." },
      { type: "Evening", icon: "🍵", name: "Cerasee Tea", desc: "Traditional Jamaican cerasee (bitter melon) tea with lime", calories: 5, protein: 0, carbs: 1, fat: 0, fiber: 0, tip: "Cerasee has been used for generations to lower blood sugar. Science backs up grandma." }
    ]},
    { day: "Tuesday", theme: "Trini Tuesday", meals: [
      { type: "Breakfast", icon: "🌅", name: "Sada Roti & Choka", desc: "Homemade sada roti with tomato choka and sautéed bodi (long beans)", calories: 380, protein: 12, carbs: 52, fat: 14, fiber: 6, tip: "Sada roti uses no butter — lighter than paratha. Tomato choka has lycopene for prostate health." },
      { type: "Mid-Morning", icon: "🍍", name: "Pineapple & Ginger Juice", desc: "Fresh pineapple juice with grated ginger root", calories: 140, protein: 1, carbs: 34, fat: 0, fiber: 1, tip: "Bromelain in pineapple reduces inflammation. Ginger boosts circulation." },
      { type: "Lunch", icon: "☀️", name: "Curry Chicken & Dhal", desc: "Trinidad curry chicken (skinless) with split pea dhal, basmati rice, and cucumber chutney", calories: 520, protein: 38, carbs: 54, fat: 16, fiber: 8, tip: "Turmeric in curry is a powerful anti-inflammatory. Dhal is high fiber." },
      { type: "Afternoon", icon: "🥜", name: "Roasted Channa", desc: "Spiced roasted chickpeas (channa) with cumin and chili", calories: 170, protein: 9, carbs: 24, fat: 4, fiber: 7, tip: "Channa is the Caribbean's original protein snack." },
      { type: "Dinner", icon: "🌙", name: "Pelau (Lean)", desc: "One-pot pelau with chicken breast, pigeon peas, pumpkin, and light coconut milk", calories: 460, protein: 32, carbs: 52, fat: 12, fiber: 6, tip: "Use light coconut milk to cut fat by 60%." },
      { type: "Evening", icon: "🍵", name: "Ginger & Turmeric Tea", desc: "Fresh ginger and turmeric boiled with black pepper and honey", calories: 20, protein: 0, carbs: 5, fat: 0, fiber: 0, tip: "Called 'liquid gold' in Caribbean folk medicine." }
    ]},
    { day: "Wednesday", theme: "Ital Wednesday (Plant-Based)", meals: [
      { type: "Breakfast", icon: "🌅", name: "Cornmeal Porridge", desc: "Creamy cornmeal porridge with coconut milk, nutmeg, and cinnamon", calories: 340, protein: 8, carbs: 52, fat: 12, fiber: 4, tip: "Use light coconut milk and skip the condensed milk." },
      { type: "Mid-Morning", icon: "🍌", name: "Boiled Green Banana & Avocado", desc: "Two boiled green bananas with sliced avocado", calories: 280, protein: 4, carbs: 38, fat: 14, fiber: 8, tip: "Green bananas are resistant starch — feed good gut bacteria, won't spike blood sugar." },
      { type: "Lunch", icon: "☀️", name: "Ital Stew", desc: "Pumpkin, cho cho, callaloo, butter beans, coconut milk over brown rice", calories: 460, protein: 16, carbs: 66, fat: 14, fiber: 14, tip: "Ital eating from Rastafari tradition — whole, unprocessed, from the earth." },
      { type: "Afternoon", icon: "🥥", name: "Coconut Drops (Small)", desc: "Two small coconut drops with ginger", calories: 160, protein: 2, carbs: 24, fat: 8, fiber: 2, tip: "Coconut MCTs give quick energy instead of storing as fat." },
      { type: "Dinner", icon: "🌙", name: "Vegetable Rundown", desc: "Breadfruit, sweet potato, plantain in coconut sauce with steamed callaloo", calories: 440, protein: 10, carbs: 58, fat: 18, fiber: 10, tip: "Plant-based one day a week reduces prostate cancer risk." },
      { type: "Evening", icon: "🍵", name: "Soursop Leaf Tea", desc: "Dried soursop leaves with honey", calories: 15, protein: 0, carbs: 4, fat: 0, fiber: 0, tip: "Soursop tea supports prostate health and calms for better sleep." }
    ]},
    { day: "Thursday", theme: "Bajan Thursday", meals: [
      { type: "Breakfast", icon: "🌅", name: "Bakes & Saltfish Buljol", desc: "Two small baked bakes with saltfish buljol (tomato, pepper, onion)", calories: 390, protein: 24, carbs: 44, fat: 14, fiber: 4, tip: "Bake instead of fry — same pillowy texture, far less oil." },
      { type: "Mid-Morning", icon: "🫐", name: "June Plum & Berries", desc: "Diced June plum with mixed berries", calories: 120, protein: 2, carbs: 28, fat: 1, fiber: 5, tip: "June plum is rich in vitamin C. Caribbean superfruits are underrated." },
      { type: "Lunch", icon: "☀️", name: "Bajan Fish Cakes & Salad", desc: "Baked fish cakes (3) with mixed green salad, avocado, lime vinaigrette", calories: 440, protein: 28, carbs: 36, fat: 18, fiber: 7, tip: "Baking keeps the flavor with way less oil." },
      { type: "Afternoon", icon: "🥤", name: "Mauby Drink (Low Sugar)", desc: "Homemade mauby bark drink with reduced sugar", calories: 80, protein: 0, carbs: 20, fat: 0, fiber: 0, tip: "Mauby bark may help lower cholesterol. Make at home to control sugar." },
      { type: "Dinner", icon: "🌙", name: "Curry Goat & Rice & Peas", desc: "Lean curry goat with rice and pigeon peas and steamed cabbage", calories: 540, protein: 38, carbs: 50, fat: 20, fiber: 6, tip: "Trim all visible fat. Goat meat is leaner than beef." },
      { type: "Evening", icon: "🍵", name: "Lemongrass Tea", desc: "Fresh lemongrass stalks steeped in hot water", calories: 5, protein: 0, carbs: 1, fat: 0, fiber: 0, tip: "Lemongrass lowers anxiety and promotes restful sleep." }
    ]},
    { day: "Friday", theme: "Fish Friday (Caribbean Style)", meals: [
      { type: "Breakfast", icon: "🌅", name: "Callaloo & Saltfish Wrap", desc: "Whole wheat wrap with callaloo, saltfish, tomato, hot pepper sauce", calories: 360, protein: 26, carbs: 36, fat: 12, fiber: 6, tip: "Callaloo has more iron than spinach." },
      { type: "Mid-Morning", icon: "🍈", name: "Papaya & Lime", desc: "Fresh papaya slices with lime juice", calories: 120, protein: 2, carbs: 28, fat: 0, fiber: 4, tip: "Papaya's papain enzyme aids digestion." },
      { type: "Lunch", icon: "☀️", name: "Escovitch Fish", desc: "Pan-fried snapper with pickled escovitch vegetables and baked festival", calories: 480, protein: 36, carbs: 40, fat: 18, fiber: 5, tip: "Pan-fry with minimal oil. Bake the festival." },
      { type: "Afternoon", icon: "🥤", name: "Sorrel Juice (Low Sugar)", desc: "Homemade sorrel with ginger", calories: 70, protein: 0, carbs: 18, fat: 0, fiber: 0, tip: "Sorrel (hibiscus) lowers BP by 7-10 points." },
      { type: "Dinner", icon: "🌙", name: "Grilled Lobster & Provisions", desc: "Grilled lobster tail with garlic butter (light), boiled yam, steamed pak choi", calories: 420, protein: 38, carbs: 38, fat: 14, fiber: 5, tip: "Lobster is low fat, high protein. A healthy luxury." },
      { type: "Evening", icon: "🍵", name: "Fever Grass Tea", desc: "Traditional fever grass tea with honey", calories: 15, protein: 0, carbs: 4, fat: 0, fiber: 0, tip: "Fever grass for digestion, anxiety, sleep. Trust the ancestors." }
    ]},
    { day: "Saturday", theme: "Market Day Feast", meals: [
      { type: "Brunch", icon: "🌅", name: "Big Jamaican Breakfast", desc: "Ackee, callaloo, boiled dumplings, fried plantain (light oil), bush tea", calories: 520, protein: 22, carbs: 58, fat: 22, fiber: 8, tip: "Saturday full spread. Minimal oil for plantain — it caramelizes naturally." },
      { type: "Mid-Day", icon: "🥤", name: "Guinep & Coconut Water", desc: "Bag of guinep with fresh coconut water", calories: 160, protein: 2, carbs: 36, fat: 1, fiber: 3, tip: "Guinep has tryptophan for serotonin — natural mood booster." },
      { type: "Late Lunch", icon: "☀️", name: "Jerk Chicken & Festival", desc: "Jerk chicken breast (grilled) with baked festival, grilled corn, garden salad", calories: 520, protein: 40, carbs: 48, fat: 16, fiber: 5, tip: "Chicken breast for jerk — all flavor, less fat." },
      { type: "Afternoon", icon: "🍌", name: "Baked Plantain Chips", desc: "Thinly sliced green plantain baked with sea salt and lime", calories: 140, protein: 1, carbs: 32, fat: 2, fiber: 3, tip: "Baked plantain chips without the deep fryer." },
      { type: "Dinner", icon: "🌙", name: "Oxtail & Butter Beans", desc: "Slow-braised oxtail (trimmed) with butter beans, carrots, rice & peas", calories: 560, protein: 42, carbs: 48, fat: 22, fiber: 8, tip: "Trim fat and skim the pot. Butter beans add fiber." },
      { type: "Evening", icon: "🍵", name: "Strong Back Tea", desc: "Traditional Jamaican strong back root tea", calories: 10, protein: 0, carbs: 2, fat: 0, fiber: 0, tip: "A traditional tonic for vitality. The roots speak to us, King." }
    ]},
    { day: "Sunday", theme: "Sunday Dinner (Family Yard)", meals: [
      { type: "Breakfast", icon: "🌅", name: "Banana Fritters & Mint Tea", desc: "Banana fritters (baked) with fresh mint tea and honey", calories: 320, protein: 6, carbs: 52, fat: 10, fiber: 4, tip: "Bake fritters — overripe bananas make them naturally sweet." },
      { type: "Mid-Morning", icon: "🥭", name: "Tropical Fruit Plate", desc: "Mango, papaya, star fruit, and sweetsop", calories: 200, protein: 3, carbs: 48, fat: 1, fiber: 6, tip: "Caribbean fruits are loaded with vitamins. Let the yard feed you." },
      { type: "Sunday Dinner", icon: "🍽️", name: "The Sunday Yard Plate", desc: "Curry goat OR brown stew chicken, rice & peas, fried plantain, steamed cabbage, rum cake", calories: 680, protein: 42, carbs: 64, fat: 26, fiber: 8, tip: "Sunday dinner is sacred. One plate, no seconds. You earned it." },
      { type: "Afternoon", icon: "🥥", name: "Jelly Coconut Water", desc: "Fresh coconut water with the soft meat", calories: 140, protein: 2, carbs: 28, fat: 3, fiber: 1, tip: "Purest hydration. Gentle on digestion." },
      { type: "Light Supper", icon: "🌙", name: "Mannish Water (Light)", desc: "Light goat soup with yam, cho cho, green banana", calories: 280, protein: 20, carbs: 32, fat: 8, fiber: 5, tip: "Jamaica's tonic soup for men — lighter version, same nourishment." },
      { type: "Evening", icon: "🍵", name: "Chocolate Tea (Cocoa Ball)", desc: "Caribbean cocoa ball tea with nutmeg, cinnamon, light coconut milk", calories: 130, protein: 3, carbs: 18, fat: 6, fiber: 2, tip: "Rich in antioxidants and magnesium. A warm Caribbean hug before bed." }
    ]}
  ]
};

// ======== 4-WEEK EXERCISE PROGRAM ========
const EXERCISE_PLAN = {
  title: "King's Movement", subtitle: "4-Week Exercise Program for Men 50+",
  color: "#00BCD4",
  overview: "Progressive, joint-friendly program designed for heart health, strength, flexibility, and balance. Always warm up before and cool down after. Listen to your body — modify as needed.",
  weeks: [
    { week: 1, theme: "Foundation & Awakening", focus: "Building movement habits, gentle cardio, basic mobility",
      days: [
        { day: "Mon", title: "Walking & Mobility", type: "Cardio", duration: "30 min", intensity: "Low", icon: "🚶🏿‍♂️", color: "#4CAF50",
          exercises: [
            { name: "Brisk Walk", sets: 1, reps: "20 min", rest: "—", note: "Keep pace where you can talk but not sing. Swing arms naturally." },
            { name: "Standing Hip Circles", sets: 2, reps: "10 each direction", rest: "30s", note: "Hands on hips, draw big circles. Opens up the hip joints." },
            { name: "Arm Circles", sets: 2, reps: "15 each direction", rest: "30s", note: "Small to large circles. Warms the rotator cuff." },
            { name: "Ankle Circles", sets: 2, reps: "10 each foot", rest: "30s", note: "Balance on one foot, circle the other ankle. Hold a wall if needed." },
            { name: "Standing Cat-Cow Stretch", sets: 1, reps: "10 breaths", rest: "—", note: "Hands on knees, arch and round the spine with each breath." }
          ], tip: "This is Day 1, King. Don't try to be a hero — just move. Consistency beats intensity every time." },
        { day: "Tue", title: "Upper Body Strength", type: "Strength", duration: "25 min", intensity: "Low-Mod", icon: "💪🏿", color: "#FF7043",
          exercises: [
            { name: "Wall Push-Ups", sets: 3, reps: "10-12", rest: "60s", note: "Hands shoulder-width on wall. Lower chest to wall, push back. Builds chest and arms safely." },
            { name: "Seated Bicep Curls", sets: 3, reps: "10-12", rest: "60s", note: "Use water bottles or light dumbbells (5-10 lbs). Slow and controlled." },
            { name: "Seated Shoulder Press", sets: 3, reps: "10", rest: "60s", note: "Press weights overhead from shoulder height. Don't lock elbows." },
            { name: "Resistance Band Pull-Apart", sets: 3, reps: "12-15", rest: "45s", note: "Hold band at chest height, pull apart. Strengthens upper back and posture." },
            { name: "Wrist Flexion/Extension", sets: 2, reps: "10 each", rest: "30s", note: "Forearm on thigh, curl wrist up and down. Grip strength matters at 50+." }
          ], tip: "Start light — your joints need time to adapt. Form over weight, always. You're building a foundation." },
        { day: "Wed", title: "Active Recovery & Stretch", type: "Flexibility", duration: "25 min", intensity: "Low", icon: "🧘🏿", color: "#7B68EE",
          exercises: [
            { name: "Gentle Walk", sets: 1, reps: "10 min", rest: "—", note: "Easy pace. This is recovery, not training." },
            { name: "Seated Hamstring Stretch", sets: 2, reps: "30s hold each leg", rest: "15s", note: "Sit on chair edge, extend one leg, lean forward gently." },
            { name: "Chest Doorway Stretch", sets: 2, reps: "30s hold each side", rest: "15s", note: "Arm on doorframe, lean through. Opens tight chest muscles." },
            { name: "Neck Rolls", sets: 1, reps: "5 each direction", rest: "—", note: "Slow, gentle circles. Release tension from the day." },
            { name: "Deep Breathing (4-7-8)", sets: 1, reps: "5 cycles", rest: "—", note: "Inhale 4 counts, hold 7, exhale 8. Lowers blood pressure naturally." }
          ], tip: "Recovery is when your body gets stronger. Rest isn't weakness — it's strategy." },
        { day: "Thu", title: "Lower Body Strength", type: "Strength", duration: "25 min", intensity: "Low-Mod", icon: "🦵🏿", color: "#FF7043",
          exercises: [
            { name: "Chair Squats", sets: 3, reps: "10-12", rest: "60s", note: "Stand in front of chair, sit down slowly, stand up. Keep weight in heels." },
            { name: "Standing Calf Raises", sets: 3, reps: "15", rest: "45s", note: "Rise onto toes, hold 2 seconds, lower slowly. Hold wall for balance." },
            { name: "Side Leg Raises", sets: 2, reps: "12 each side", rest: "45s", note: "Hold chair back, lift leg to side. Strengthens hip abductors." },
            { name: "Glute Bridge", sets: 3, reps: "12", rest: "60s", note: "Lie on back, knees bent, lift hips. Squeeze glutes at top. Protects lower back." },
            { name: "Standing Quad Stretch", sets: 2, reps: "30s each leg", rest: "15s", note: "Hold wall, pull foot behind you. Keep knees together." }
          ], tip: "Strong legs = independent living. Every squat is an investment in your future mobility." },
        { day: "Fri", title: "Cardio & Core", type: "Cardio", duration: "30 min", intensity: "Moderate", icon: "❤️", color: "#4CAF50",
          exercises: [
            { name: "Brisk Walk or Light Jog", sets: 1, reps: "20 min", rest: "—", note: "If jogging, start with 1 min jog / 2 min walk intervals." },
            { name: "Standing March", sets: 2, reps: "30 each leg", rest: "30s", note: "High knees while standing. Pumps arms. Gets heart rate up safely." },
            { name: "Dead Bug", sets: 3, reps: "8 each side", rest: "45s", note: "Lie on back, arms up, opposite arm/leg lower slowly. Builds deep core." },
            { name: "Bird Dog", sets: 2, reps: "8 each side", rest: "45s", note: "On hands and knees, extend opposite arm and leg. Hold 3 seconds." },
            { name: "Plank (Modified)", sets: 2, reps: "20-30s hold", rest: "45s", note: "On knees if needed. Keep body straight. Core strength protects your back." }
          ], tip: "Your heart is a muscle too. Train it like one — steady and consistent." },
        { day: "Sat", title: "Balance & Functional", type: "Balance", duration: "20 min", intensity: "Low", icon: "⚖️", color: "#FF8F00",
          exercises: [
            { name: "Single Leg Stand", sets: 3, reps: "30s each leg", rest: "30s", note: "Hold chair initially. Progress to no support. Eyes open, then eyes closed." },
            { name: "Heel-to-Toe Walk", sets: 3, reps: "10 steps", rest: "30s", note: "Walk in a straight line, placing heel to toe. Like a sobriety test — but for health." },
            { name: "Step-Ups (Low Step)", sets: 2, reps: "10 each leg", rest: "45s", note: "Use bottom stair or low step. Drive through the heel." },
            { name: "Farmer's Walk", sets: 3, reps: "30s", rest: "45s", note: "Carry weights at sides, walk with good posture. Functional total-body exercise." },
            { name: "Tandem Stance Hold", sets: 2, reps: "30s each foot forward", rest: "30s", note: "One foot directly in front of the other. Arms out for balance." }
          ], tip: "Falls are the #1 injury risk after 50. Balance training is literally life insurance." },
        { day: "Sun", title: "Rest & Restoration", type: "Rest", duration: "—", intensity: "Rest", icon: "🙏🏿", color: "#9E9E9E",
          exercises: [
            { name: "Gentle Morning Stretch", sets: 1, reps: "5 min", rest: "—", note: "Whatever feels good. Neck, shoulders, back, legs." },
            { name: "Leisurely Walk", sets: 1, reps: "15-20 min optional", rest: "—", note: "Not training — just enjoying the air. Walk with family or brothers." },
            { name: "Deep Breathing or Prayer", sets: 1, reps: "5-10 min", rest: "—", note: "Center yourself for the week ahead. Body and spirit." }
          ], tip: "God rested on Sunday. So should you. Your muscles grow during rest, not during work." }
      ]
    },
    { week: 2, theme: "Building Momentum", focus: "Increasing duration, adding resistance, improving form",
      days: [
        { day: "Mon", title: "Power Walking + Intervals", type: "Cardio", duration: "35 min", intensity: "Moderate", icon: "🚶🏿‍♂️", color: "#4CAF50",
          exercises: [
            { name: "Warm-Up Walk", sets: 1, reps: "5 min", rest: "—", note: "Easy pace to get blood flowing." },
            { name: "Walk Intervals", sets: 6, reps: "2 min fast / 1 min easy", rest: "—", note: "Fast = can't easily chat. Easy = comfortable. Heart rate training!" },
            { name: "Hill Walk or Incline", sets: 2, reps: "3 min", rest: "1 min flat", note: "Find a gentle hill or use treadmill incline. Builds leg strength." },
            { name: "Cool-Down Walk", sets: 1, reps: "5 min", rest: "—", note: "Gradually slow pace. Let heart rate come down." },
            { name: "Standing Quad & Calf Stretch", sets: 1, reps: "30s each", rest: "—", note: "Stretch while muscles are warm." }
          ], tip: "Week 2 — you showed up again. That's already more than most. Now let's push a little." },
        { day: "Tue", title: "Upper Body Progressive", type: "Strength", duration: "30 min", intensity: "Moderate", icon: "💪🏿", color: "#FF7043",
          exercises: [
            { name: "Incline Push-Ups (Counter/Bench)", sets: 3, reps: "10-15", rest: "60s", note: "Lower than wall push-ups. Hands on counter or sturdy bench." },
            { name: "Bent-Over Rows", sets: 3, reps: "10-12", rest: "60s", note: "Dumbbells or resistance bands. Squeeze shoulder blades together." },
            { name: "Overhead Tricep Extension", sets: 3, reps: "10-12", rest: "60s", note: "One dumbbell behind head, extend arms up. Slow lower." },
            { name: "Lateral Raises", sets: 3, reps: "10-12", rest: "45s", note: "Light weights, raise arms to shoulder height. Builds shoulder caps." },
            { name: "Resistance Band Face Pulls", sets: 3, reps: "15", rest: "45s", note: "Pull band toward face, elbows high. Excellent posture exercise." }
          ], tip: "Add 1-2 lbs from last week if you can. Progressive overload — small steps, big results." },
        { day: "Wed", title: "Yoga & Flexibility", type: "Flexibility", duration: "30 min", intensity: "Low", icon: "🧘🏿", color: "#7B68EE",
          exercises: [
            { name: "Cat-Cow Flow", sets: 1, reps: "10 cycles", rest: "—", note: "On hands and knees. Arch and round with breath. Spinal health." },
            { name: "Warrior I Pose", sets: 2, reps: "30s each side", rest: "15s", note: "Step forward into lunge, arms overhead. Builds leg strength + stretch." },
            { name: "Seated Spinal Twist", sets: 2, reps: "30s each side", rest: "15s", note: "Sit tall, twist gently. Aids digestion and spinal mobility." },
            { name: "Figure-4 Stretch", sets: 2, reps: "30s each side", rest: "15s", note: "Lie on back, ankle over opposite knee. Opens tight hips." },
            { name: "Child's Pose", sets: 1, reps: "1 min", rest: "—", note: "Knees wide, reach forward, rest forehead down. Total release." }
          ], tip: "Flexibility isn't just for yoga people. It's how you get out of a car without groaning at 60." },
        { day: "Thu", title: "Lower Body + Power", type: "Strength", duration: "30 min", intensity: "Moderate", icon: "🦵🏿", color: "#FF7043",
          exercises: [
            { name: "Goblet Squats", sets: 3, reps: "12", rest: "60s", note: "Hold weight at chest. Sit back like sitting in a chair. Deeper than Week 1." },
            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "60s", note: "Light weights, hinge at hips, slight knee bend. Feel hamstrings stretch." },
            { name: "Reverse Lunges", sets: 2, reps: "10 each leg", rest: "60s", note: "Step backward into lunge. Easier on knees than forward lunges." },
            { name: "Sumo Squats", sets: 3, reps: "12", rest: "45s", note: "Wide stance, toes out. Targets inner thighs and glutes." },
            { name: "Single Leg Calf Raises", sets: 2, reps: "12 each", rest: "45s", note: "Progress from Week 1's double-leg version." }
          ], tip: "Your legs carry you through life. Make them strong enough to carry you through your 80s." },
        { day: "Fri", title: "Cardio & Core 2.0", type: "Cardio", duration: "35 min", intensity: "Moderate", icon: "❤️", color: "#4CAF50",
          exercises: [
            { name: "Walk/Jog Intervals", sets: 8, reps: "1 min jog / 1.5 min walk", rest: "—", note: "If jog is too much, fast walk the intervals." },
            { name: "Mountain Climbers (Slow)", sets: 3, reps: "10 each leg", rest: "45s", note: "From plank, step feet forward slowly. Not fast — controlled." },
            { name: "Bicycle Crunches", sets: 3, reps: "12 each side", rest: "45s", note: "Lie on back, elbow to opposite knee. Slow and deliberate." },
            { name: "Side Plank (Modified)", sets: 2, reps: "20s each side", rest: "30s", note: "On forearm and knee. Build the obliques — protects the spine." },
            { name: "Superman Hold", sets: 3, reps: "10 (3s hold)", rest: "45s", note: "Lie face down, lift arms and legs briefly. Lower back strength." }
          ], tip: "Core strength isn't about a six-pack. It's about getting up off the floor without help at 70." },
        { day: "Sat", title: "Balance + Agility", type: "Balance", duration: "25 min", intensity: "Low-Mod", icon: "⚖️", color: "#FF8F00",
          exercises: [
            { name: "Single Leg Stand (Eyes Closed)", sets: 3, reps: "15-20s each", rest: "30s", note: "Progress from Week 1. Near a wall for safety." },
            { name: "Lateral Shuffle", sets: 3, reps: "10 steps each way", rest: "30s", note: "Athletic stance, shuffle sideways. Stay low. Quick feet." },
            { name: "Clock Reach", sets: 2, reps: "6 reaches each leg", rest: "45s", note: "Stand on one leg, reach other foot to 12, 3, 6, 9 o'clock positions." },
            { name: "Stair Climbing", sets: 3, reps: "1 flight up and down", rest: "60s", note: "Use the handrail. Step deliberately. Real-world functional fitness." },
            { name: "Reaction Drill", sets: 2, reps: "1 min", rest: "30s", note: "Toss a ball hand to hand while standing on one foot." }
          ], tip: "Balance isn't just physical. It's about grounding yourself — body, mind, and spirit." },
        { day: "Sun", title: "Rest & Restoration", type: "Rest", duration: "—", intensity: "Rest", icon: "🙏🏿", color: "#9E9E9E",
          exercises: [
            { name: "Full Body Stretch", sets: 1, reps: "10 min", rest: "—", note: "Whatever your body needs. Listen to the tight spots." },
            { name: "Leisurely Walk or Swim", sets: 1, reps: "20 min optional", rest: "—", note: "Easy movement. Swimming is incredible low-impact cardio." },
            { name: "Meditation or Journaling", sets: 1, reps: "10 min", rest: "—", note: "Reflect on Week 2. What improved? What felt good?" }
          ], tip: "Two weeks in. That's 14 days of choosing yourself. Be proud, King." }
      ]
    },
    { week: 3, theme: "Strength Rising", focus: "Heavier loads, longer cardio, deeper stretches",
      days: [
        { day: "Mon", title: "Endurance Walk/Jog", type: "Cardio", duration: "40 min", intensity: "Mod-High", icon: "🚶🏿‍♂️", color: "#4CAF50",
          exercises: [
            { name: "Dynamic Warm-Up", sets: 1, reps: "5 min", rest: "—", note: "Leg swings, arm circles, gentle high knees." },
            { name: "Sustained Brisk Walk or Jog", sets: 1, reps: "25 min", rest: "—", note: "Try to maintain pace without stopping. Steady state cardio burns fat." },
            { name: "Fartlek Bursts", sets: 4, reps: "30s sprint / 90s easy", rest: "—", note: "Fartlek means 'speed play'. Short bursts within your walk/jog." },
            { name: "Cool-Down Walk", sets: 1, reps: "5 min", rest: "—", note: "Bring heart rate down gradually." },
            { name: "Hip Flexor Stretch", sets: 2, reps: "30s each side", rest: "—", note: "Kneeling lunge stretch. Opens hips tight from sitting." }
          ], tip: "Week 3 — you're in the zone now. Your body is adapting. Push the comfort zone." },
        { day: "Tue", title: "Push Day (Chest/Shoulders/Tri)", type: "Strength", duration: "35 min", intensity: "Moderate", icon: "💪🏿", color: "#FF7043",
          exercises: [
            { name: "Push-Ups (Floor or Knee)", sets: 3, reps: "8-12", rest: "60s", note: "Floor if possible! Modified is still progress. Chest, shoulders, triceps." },
            { name: "Dumbbell Chest Press", sets: 3, reps: "10-12", rest: "60s", note: "Lying on bench/floor. Increase weight from Week 2." },
            { name: "Arnold Press", sets: 3, reps: "10", rest: "60s", note: "Start palms facing you, rotate out as you press up." },
            { name: "Tricep Dips (Chair)", sets: 3, reps: "8-10", rest: "60s", note: "Hands on sturdy chair, dip down. Keep back close to chair." },
            { name: "Push-Up Hold", sets: 2, reps: "15-20s", rest: "45s", note: "Top of push-up position. Isometric chest and core." }
          ], tip: "Pushing movements keep you independent — pushing yourself up, pushing doors, pushing forward." },
        { day: "Wed", title: "Deep Stretch & Recovery", type: "Flexibility", duration: "30 min", intensity: "Low", icon: "🧘🏿", color: "#7B68EE",
          exercises: [
            { name: "Pigeon Pose (Modified)", sets: 2, reps: "45s each side", rest: "15s", note: "Deep hip opener. Use pillow under hip if needed." },
            { name: "Thoracic Spine Rotation", sets: 2, reps: "10 each side", rest: "15s", note: "Side-lying, rotate upper body. Opens the mid-back." },
            { name: "Hamstring Doorway Stretch", sets: 2, reps: "45s each leg", rest: "15s", note: "Lie in doorway, one leg up on frame. Passive stretch." },
            { name: "Shoulder Cross-Body Stretch", sets: 2, reps: "30s each arm", rest: "—", note: "Pull arm across chest. Release shoulder tension." },
            { name: "Corpse Pose (Savasana)", sets: 1, reps: "3-5 min", rest: "—", note: "Lie flat, palms up, close eyes. Total body relaxation." }
          ], tip: "The body needs release as much as tension. Stretch deeply — you've earned it." },
        { day: "Thu", title: "Pull Day (Back/Biceps)", type: "Strength", duration: "35 min", intensity: "Moderate", icon: "💪🏿", color: "#FF7043",
          exercises: [
            { name: "Dumbbell Rows", sets: 3, reps: "10-12 each arm", rest: "60s", note: "One hand on bench, row weight to hip. Squeeze shoulder blade." },
            { name: "Resistance Band Lat Pulldown", sets: 3, reps: "12-15", rest: "60s", note: "Attach band overhead, pull down to chest. Builds a strong back." },
            { name: "Hammer Curls", sets: 3, reps: "10-12", rest: "60s", note: "Palms facing each other. Works biceps and forearms." },
            { name: "Reverse Flies", sets: 3, reps: "12", rest: "45s", note: "Bent over, raise arms to sides. Upper back posture muscles." },
            { name: "Dead Hang (or Supported)", sets: 2, reps: "15-20s", rest: "45s", note: "Hang from bar or use resistance band. Decompresses spine." }
          ], tip: "A strong back means good posture, no back pain, and looking distinguished in a suit." },
        { day: "Fri", title: "HIIT Lite + Core", type: "Cardio", duration: "30 min", intensity: "Mod-High", icon: "❤️", color: "#4CAF50",
          exercises: [
            { name: "Boxing Shadowbox", sets: 3, reps: "2 min", rest: "1 min", note: "Jab, cross, hook. Light on feet. Great cardio and stress relief." },
            { name: "Step-Ups (Higher Step)", sets: 3, reps: "10 each leg", rest: "45s", note: "Use a sturdy box or second stair step." },
            { name: "Plank to Downward Dog", sets: 3, reps: "8", rest: "45s", note: "Flow from plank position to downward dog and back. Full body." },
            { name: "Russian Twists", sets: 3, reps: "12 each side", rest: "45s", note: "Sit with knees bent, lean back slightly, rotate. Hold weight if able." },
            { name: "Plank Hold", sets: 2, reps: "30-40s", rest: "45s", note: "Full plank on hands. You're stronger now than Week 1." }
          ], tip: "HIIT doesn't mean killing yourself. It means working hard, resting fully, and repeating wisely." },
        { day: "Sat", title: "Functional Fitness", type: "Balance", duration: "30 min", intensity: "Moderate", icon: "⚖️", color: "#FF8F00",
          exercises: [
            { name: "Turkish Get-Up (Modified)", sets: 2, reps: "3 each side", rest: "60s", note: "Start lying down, stand up holding weight overhead. King of exercises." },
            { name: "Farmer's Walk (Heavier)", sets: 3, reps: "45s", rest: "45s", note: "Carry heavier weights. Grip, core, posture — everything." },
            { name: "Bear Crawl", sets: 3, reps: "10 steps forward & back", rest: "45s", note: "Hands and feet, knees off ground. Primal movement pattern." },
            { name: "Single Leg Deadlift", sets: 2, reps: "8 each leg", rest: "60s", note: "Stand on one leg, hinge forward. Balance + hamstrings." },
            { name: "Squat to Press", sets: 3, reps: "10", rest: "60s", note: "Squat down, stand up, press weights overhead. Total body." }
          ], tip: "Functional fitness means your workout translates to real life — lifting grandkids, carrying groceries." },
        { day: "Sun", title: "Rest & Restoration", type: "Rest", duration: "—", intensity: "Rest", icon: "🙏🏿", color: "#9E9E9E",
          exercises: [
            { name: "Foam Rolling or Self-Massage", sets: 1, reps: "15 min", rest: "—", note: "Roll out calves, quads, back. Work out the knots." },
            { name: "Easy Walk or Yard Work", sets: 1, reps: "20-30 min", rest: "—", note: "Light activity. Gardening counts — connecting with the earth." },
            { name: "Gratitude & Reflection", sets: 1, reps: "10 min", rest: "—", note: "Three weeks down. Write what your body can do now that it couldn't before." }
          ], tip: "Three weeks — you're building something. Not just muscle, but discipline. That's legacy." }
      ]
    },
    { week: 4, theme: "Peak Performance", focus: "Peak intensity, testing progress, building lifelong habits",
      days: [
        { day: "Mon", title: "Endurance Challenge", type: "Cardio", duration: "45 min", intensity: "High", icon: "🚶🏿‍♂️", color: "#4CAF50",
          exercises: [
            { name: "Dynamic Warm-Up", sets: 1, reps: "5 min", rest: "—", note: "Full mobility routine from Week 1. Your body knows this now." },
            { name: "Sustained Run/Walk (No Stops)", sets: 1, reps: "30 min", rest: "—", note: "Your longest sustained session. Run if you can, walk fast if not." },
            { name: "Hill Repeats", sets: 3, reps: "2 min climb / 1 min recover", rest: "—", note: "Find a hill. Attack it. Walk down. Repeat. Heart and legs of steel." },
            { name: "Cool-Down & Full Stretch", sets: 1, reps: "7 min", rest: "—", note: "Celebrate with a thorough stretch. You earned every second." }
          ], tip: "Final week. This is where you prove to yourself what you're made of. Crown yourself, King." },
        { day: "Tue", title: "Total Body Strength", type: "Strength", duration: "40 min", intensity: "Mod-High", icon: "💪🏿", color: "#FF7043",
          exercises: [
            { name: "Floor Push-Ups", sets: 3, reps: "Max reps (good form)", rest: "90s", note: "How many can you do now? Compare to Week 1. That's growth." },
            { name: "Goblet Squats (Heavier)", sets: 4, reps: "12", rest: "60s", note: "Heaviest comfortable weight. Sit deep, drive through heels." },
            { name: "Dumbbell Row (Heavier)", sets: 3, reps: "10 each arm", rest: "60s", note: "Add weight from Week 3. Strong back, strong man." },
            { name: "Reverse Lunges + Curl", sets: 3, reps: "8 each leg", rest: "60s", note: "Lunge back, curl weights at the bottom. Compound movement." },
            { name: "Plank Hold (Longest)", sets: 1, reps: "Max time", rest: "—", note: "Your personal best. Time yourself. This is your benchmark." }
          ], tip: "Compare yourself only to who you were 4 weeks ago. That's the only competition that matters." },
        { day: "Wed", title: "Mobility & Active Recovery", type: "Flexibility", duration: "30 min", intensity: "Low", icon: "🧘🏿", color: "#7B68EE",
          exercises: [
            { name: "Sun Salutation Flow", sets: 3, reps: "full flow", rest: "30s", note: "Forward fold, plank, cobra, downward dog, step up. Full body." },
            { name: "90/90 Hip Switch", sets: 2, reps: "8 each side", rest: "15s", note: "Sit with legs at 90 degrees, rotate hips. Deep hip mobility." },
            { name: "Thread the Needle", sets: 2, reps: "8 each side", rest: "15s", note: "On hands and knees, reach one arm under and rotate. Thoracic spine." },
            { name: "Legs Up the Wall", sets: 1, reps: "5 min", rest: "—", note: "Lie with legs up wall. Reduces swelling, calms nervous system." },
            { name: "Body Scan Meditation", sets: 1, reps: "5 min", rest: "—", note: "Notice each body part from toes to head. Feel how far you've come." }
          ], tip: "Mobility is the fountain of youth. Stiff men age fast. Flexible men stay young." },
        { day: "Thu", title: "Lower Body Power", type: "Strength", duration: "35 min", intensity: "Mod-High", icon: "🦵🏿", color: "#FF7043",
          exercises: [
            { name: "Sumo Squats (Weighted)", sets: 4, reps: "12", rest: "60s", note: "Heaviest comfortable weight. Deep stance, toes out." },
            { name: "Romanian Deadlift (Heavier)", sets: 3, reps: "10", rest: "60s", note: "Feel the hamstrings load. Hinge at hips, flat back." },
            { name: "Walking Lunges", sets: 3, reps: "10 each leg", rest: "60s", note: "Walk forward with lunges. Dynamic and challenging." },
            { name: "Calf Raise Drop Sets", sets: 3, reps: "15, 12, 10", rest: "30s between", note: "Same weight, shorter rest each time. Burn builds character." },
            { name: "Wall Sit", sets: 2, reps: "30-45s", rest: "60s", note: "Back flat on wall, thighs parallel. Mental and physical challenge." }
          ], tip: "Your legs are the pillars of your temple. Build them unshakeable." },
        { day: "Fri", title: "Final Cardio Challenge", type: "Cardio", duration: "35 min", intensity: "High", icon: "❤️", color: "#4CAF50",
          exercises: [
            { name: "Tabata Marching", sets: 4, reps: "20s on / 10s off", rest: "1 min after", note: "High knees as fast as you can for 20s. Rest 10s. Pure heart training." },
            { name: "Shadowboxing Rounds", sets: 3, reps: "3 min", rest: "1 min", note: "Full rounds like a fighter. Jab, cross, hook, upper. Move feet." },
            { name: "Plank to Push-Up", sets: 3, reps: "6-8", rest: "60s", note: "Forearm plank, push up to hands one at a time. Core and upper body." },
            { name: "Hollow Body Hold", sets: 2, reps: "20-30s", rest: "45s", note: "Lie on back, lift shoulders and legs slightly. Deep core." },
            { name: "Standing Ovation Hold", sets: 1, reps: "1 min", rest: "—", note: "Arms raised overhead, stand tall, breathe deep. You made it." }
          ], tip: "Last Friday. Next month you'll be a different man. Stronger, more disciplined, more alive." },
        { day: "Sat", title: "The King's Test", type: "Balance", duration: "35 min", intensity: "Moderate", icon: "👑", color: "#D4A017",
          exercises: [
            { name: "Max Push-Ups (1 min)", sets: 1, reps: "Max", rest: "2 min", note: "How many in 60 seconds? Record it. This is your new baseline." },
            { name: "Max Chair Squats (1 min)", sets: 1, reps: "Max", rest: "2 min", note: "Full range of motion. Count every one. Compare to Day 1." },
            { name: "Plank Hold (Max)", sets: 1, reps: "Max time", rest: "2 min", note: "Beat your Week 4 Tuesday time. You're stronger now." },
            { name: "Single Leg Stand (Eyes Closed)", sets: 1, reps: "Max time each leg", rest: "1 min", note: "Balance test. Compare to Week 1. You'll be amazed." },
            { name: "1-Mile Walk/Run Time Trial", sets: 1, reps: "1 mile", rest: "—", note: "Walk, jog, or run 1 mile. Record your time. Your personal best." }
          ], tip: "This is your coronation. Every rep proves what a Black man over 50 can do. Crown yourself, King." },
        { day: "Sun", title: "Celebration & Planning", type: "Rest", duration: "—", intensity: "Rest", icon: "🏆", color: "#D4A017",
          exercises: [
            { name: "Full Body Stretch", sets: 1, reps: "15 min", rest: "—", note: "Thank every muscle. They showed up for you for 28 days." },
            { name: "Reflection & Journaling", sets: 1, reps: "15 min", rest: "—", note: "Write: What changed? How do you feel? What's next? Share with your Circle." },
            { name: "Plan Month 2", sets: 1, reps: "—", rest: "—", note: "Repeat this program with increased weights and longer durations. Or try something new — you've built the foundation." }
          ], tip: "28 days. You did it. You proved that age is just a number and your best years are ahead. Now keep going, King. This is just the beginning." }
      ]
    }
  ]
};

const CARIBBEAN_FOODS = [
  { name: "Jerk Chicken", calories: 320, protein: 35, carbs: 8, fat: 18, origin: "Jamaica", icon: "🍗" },
  { name: "Rice & Peas", calories: 260, protein: 8, carbs: 45, fat: 6, origin: "Jamaica", icon: "🍚" },
  { name: "Ackee & Saltfish", calories: 280, protein: 22, carbs: 12, fat: 18, origin: "Jamaica", icon: "🐟" },
  { name: "Oxtail Stew", calories: 450, protein: 38, carbs: 15, fat: 28, origin: "Caribbean", icon: "🍲" },
  { name: "Callaloo", calories: 90, protein: 5, carbs: 8, fat: 5, origin: "Trinidad", icon: "🥬" },
  { name: "Roti (Chicken)", calories: 380, protein: 25, carbs: 40, fat: 14, origin: "Trinidad", icon: "🫓" },
  { name: "Curry Goat", calories: 410, protein: 32, carbs: 10, fat: 28, origin: "Jamaica", icon: "🍛" },
  { name: "Festival", calories: 220, protein: 4, carbs: 35, fat: 8, origin: "Jamaica", icon: "🍞" },
  { name: "Plantain (Fried)", calories: 180, protein: 1, carbs: 32, fat: 7, origin: "Caribbean", icon: "🍌" },
  { name: "Bammy", calories: 160, protein: 2, carbs: 38, fat: 1, origin: "Jamaica", icon: "🫓" },
  { name: "Sorrel Drink", calories: 120, protein: 0, carbs: 30, fat: 0, origin: "Jamaica", icon: "🥤" },
  { name: "Pelau", calories: 340, protein: 18, carbs: 42, fat: 12, origin: "Trinidad", icon: "🍲" },
];
const SOUL_FOODS = [
  { name: "Collard Greens", calories: 120, protein: 6, carbs: 10, fat: 7, origin: "Soul Food", icon: "🥬" },
  { name: "Black-Eyed Peas", calories: 200, protein: 14, carbs: 35, fat: 1, origin: "Soul Food", icon: "🫘" },
  { name: "Cornbread", calories: 190, protein: 4, carbs: 28, fat: 7, origin: "Soul Food", icon: "🍞" },
  { name: "Fried Catfish", calories: 340, protein: 28, carbs: 15, fat: 20, origin: "Soul Food", icon: "🐟" },
  { name: "Smothered Chicken", calories: 380, protein: 35, carbs: 12, fat: 22, origin: "Soul Food", icon: "🍗" },
  { name: "Mac & Cheese", calories: 350, protein: 14, carbs: 38, fat: 16, origin: "Soul Food", icon: "🧀" },
  { name: "Candied Yams", calories: 240, protein: 2, carbs: 52, fat: 4, origin: "Soul Food", icon: "🍠" },
  { name: "Gumbo", calories: 320, protein: 22, carbs: 25, fat: 15, origin: "Creole", icon: "🍲" },
  { name: "Red Beans & Rice", calories: 280, protein: 12, carbs: 48, fat: 4, origin: "Creole", icon: "🫘" },
];
const COMMUNITY_GROUPS = [
  { id: 1, name: "Sunrise Walkers", members: 48, category: "Fitness", icon: "🚶🏿‍♂️", desc: "Early morning walking. 6AM daily.", new_posts: 3 },
  { id: 2, name: "Pressure Points", members: 124, category: "Health", icon: "❤️", desc: "BP & heart health support.", new_posts: 7 },
  { id: 3, name: "The Grill Masters", members: 89, category: "Food", icon: "🔥", desc: "Healthy grilling & meal prep.", new_posts: 5 },
  { id: 4, name: "Sugar Watch", members: 156, category: "Health", icon: "🩸", desc: "Managing diabetes together.", new_posts: 12 },
  { id: 5, name: "The Barber Chair", members: 312, category: "Mental Health", icon: "💈", desc: "Open conversations. No judgment.", new_posts: 22 },
  { id: 6, name: "Second Wind Fitness", members: 95, category: "Fitness", icon: "💪🏿", desc: "Strength training for 50+ kings.", new_posts: 8 },
  { id: 7, name: "Grandpa Goals", members: 144, category: "Family", icon: "👴🏿", desc: "Being present for the next generation.", new_posts: 6 },
];
const MOOD_OPTIONS = [
  { emoji: "😊", label: "Great", value: 5, color: "#4CAF50" },
  { emoji: "🙂", label: "Good", value: 4, color: "#8BC34A" },
  { emoji: "😐", label: "Okay", value: 3, color: "#FFC107" },
  { emoji: "😔", label: "Low", value: 2, color: "#FF9800" },
  { emoji: "😞", label: "Struggling", value: 1, color: "#F44336" },
];
const MENTAL_RESOURCES = [
  { title: "Breathe Easy", desc: "4-7-8 breathing for calm", icon: "🌬️", duration: "5 min" },
  { title: "Body Scan", desc: "Release tension head to toe", icon: "🧘🏿", duration: "10 min" },
  { title: "Gratitude Journal", desc: "Name 3 blessings today", icon: "📖", duration: "5 min" },
  { title: "Talk It Out", desc: "Connect with a brother", icon: "📞", duration: "—" },
  { title: "Walk & Clear", desc: "Mindful movement outdoors", icon: "🌳", duration: "15 min" },
  { title: "Music Therapy", desc: "Soul-healing playlists", icon: "🎵", duration: "20 min" },
];
function getTodaysThought() { const d = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000); return DAILY_THOUGHTS[d % DAILY_THOUGHTS.length]; }

// ======== ACCESSIBLE UTILITY COMPONENTS ========
const a11y = {
  btn: { cursor: "pointer", border: "none", minHeight: 44, minWidth: 44 },
  focus: `outline: 3px solid ${KENTE_COLORS.gold}; outline-offset: 2px;`,
  sr: { position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 },
};
function KentePattern() {
  return <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: `repeating-linear-gradient(90deg, ${KENTE_COLORS.gold} 0px, ${KENTE_COLORS.gold} 20px, ${KENTE_COLORS.terracotta} 20px, ${KENTE_COLORS.terracotta} 40px, ${KENTE_COLORS.forest} 40px, ${KENTE_COLORS.forest} 60px, ${KENTE_COLORS.deepGold} 60px, ${KENTE_COLORS.deepGold} 80px)` }} />;
}
function AdinkraSymbol({ symbol, size = 24, label }) {
  const s = { sankofa: "↺", gye_nyame: "✦", dwennimmen: "⟐", adinkrahene: "◉" };
  return <span aria-hidden={!label} aria-label={label} role={label ? "img" : "presentation"} style={{ fontSize: size, color: KENTE_COLORS.gold }}>{s[symbol] || "◉"}</span>;
}
function Disclaimer() {
  const [open, setOpen] = useState(false);
  return (
    <section style={{ marginTop: 20, padding: 16, background: `${KENTE_COLORS.warmBrown}15`, borderRadius: 12, border: `1px solid ${KENTE_COLORS.warmBrown}25` }} aria-label="Health disclaimer">
      <button onClick={() => setOpen(!open)} aria-expanded={open} style={{ ...a11y.btn, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", padding: 0 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span aria-hidden="true">⚕️</span><span style={{ fontSize: 12, color: `${KENTE_COLORS.cream}70`, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Health & Medical Disclaimer</span></span>
        <span aria-hidden="true" style={{ fontSize: 12, color: `${KENTE_COLORS.cream}40`, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▼</span>
      </button>
      {open && <div style={{ marginTop: 12 }}>
        <p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}60`, lineHeight: 1.7, margin: "0 0 8px" }}><strong style={{ color: `${KENTE_COLORS.cream}80` }}>For informational purposes only.</strong> Not a substitute for professional medical advice. Always consult your physician before dietary changes, exercise programs, or adjusting medications.</p>
        <p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}60`, lineHeight: 1.7, margin: "0 0 8px" }}><strong style={{ color: `${KENTE_COLORS.cream}80` }}>Meal plans & nutrition:</strong> Approximate values. Consult a dietitian if you have diabetes, hypertension, heart or kidney disease. <strong style={{ color: `${KENTE_COLORS.cream}80` }}>Exercise:</strong> Get physician clearance, especially if sedentary or with heart/joint conditions. Stop if you feel chest pain or dizziness.</p>
        <p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}60`, lineHeight: 1.7, margin: "0 0 8px" }}><strong style={{ color: `${KENTE_COLORS.cream}80` }}>AI food scanning:</strong> Calorie estimates are approximate and should not be used for medical dietary management. Always verify with nutrition labels or a dietitian.</p>
        <p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}60`, lineHeight: 1.7, margin: "0 0 8px" }}><strong style={{ color: `${KENTE_COLORS.cream}80` }}>Traditional remedies</strong> (cerasee, soursop, strong back tea) are cultural knowledge, not FDA-evaluated. <strong style={{ color: `${KENTE_COLORS.cream}80` }}>Mental health resources</strong> are informational — call 911 or 988 for emergencies.</p>
        <div style={{ marginTop: 8, padding: "8px 12px", background: `${KENTE_COLORS.gold}10`, borderRadius: 8, borderLeft: `3px solid ${KENTE_COLORS.gold}40` }}><p style={{ fontSize: 11, color: KENTE_COLORS.gold, margin: 0 }}>👑 KingSquare: Take charge of your health — in partnership with your healthcare team. Stay wise, King.</p></div>
      </div>}
    </section>
  );
}
function NavBar({ active, setActive }) {
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" }, { id: "health", label: "Health", icon: "❤️" },
    { id: "food", label: "Food", icon: "🍽️" }, { id: "plan", label: "Plan", icon: "📋" },
    { id: "exercise", label: "Move", icon: "🏋🏿" }, { id: "mind", label: "Mind", icon: "🧠" },
    { id: "circle", label: "Circle", icon: "👥" },
  ];
  return (
    <nav aria-label="Main navigation" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: KENTE_COLORS.charcoal, borderTop: `2px solid ${KENTE_COLORS.warmBrown}`, display: "flex", justifyContent: "space-around", padding: "4px 0 8px", zIndex: 100, maxWidth: 480, margin: "0 auto" }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => setActive(tab.id)} aria-label={tab.label} aria-current={active === tab.id ? "page" : undefined} style={{ ...a11y.btn, background: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 1, opacity: active === tab.id ? 1 : 0.5, transform: active === tab.id ? "scale(1.08)" : "scale(1)", transition: "all 0.2s", padding: "2px 2px" }}>
          <span aria-hidden="true" style={{ fontSize: 18 }}>{tab.icon}</span>
          <span style={{ fontSize: 8, color: active === tab.id ? KENTE_COLORS.gold : KENTE_COLORS.cream, fontWeight: active === tab.id ? 700 : 400 }}>{tab.label}</span>
          {active === tab.id && <div aria-hidden="true" style={{ width: 4, height: 4, borderRadius: "50%", background: KENTE_COLORS.gold }} />}
        </button>
      ))}
    </nav>
  );
}

// ======== HOME SCREEN ========
function HomeScreen() {
  const t = getTodaysThought(), today = new Date();
  const g = today.getHours() < 12 ? "Good Morning" : today.getHours() < 17 ? "Good Afternoon" : "Good Evening";
  return (
    <main style={{ padding: "20px 16px 100px", animation: "fadeIn 0.5s" }} role="main" aria-label="Home dashboard">
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <p style={{ color: KENTE_COLORS.gold, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: KENTE_COLORS.cream, margin: 0 }}>{g}, King</h1>
      </div>
      <blockquote style={{ background: `linear-gradient(135deg, ${KENTE_COLORS.warmBrown}, ${KENTE_COLORS.richBlack})`, borderRadius: 16, padding: 24, marginBottom: 20, position: "relative", overflow: "hidden", border: `1px solid ${KENTE_COLORS.deepGold}40` }}>
        <KentePattern />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, marginBottom: 16 }}><AdinkraSymbol symbol="gye_nyame" size={20} label="Gye Nyame symbol" /><span style={{ fontSize: 12, color: KENTE_COLORS.gold, letterSpacing: 2, textTransform: "uppercase" }}>Today's Thought — {t.theme}</span></div>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: KENTE_COLORS.cream, lineHeight: 1.5, margin: "0 0 12px", fontStyle: "italic" }}>"{t.quote}"</p>
        <footer style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: KENTE_COLORS.gold, textAlign: "right" }}>— {t.author}</footer>
      </blockquote>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }} role="list" aria-label="Daily stats">
        {[{ label: "Steps Today", value: "4,280", target: "/ 8,000", color: KENTE_COLORS.health, icon: "🚶🏿‍♂️" }, { label: "Water", value: "5", target: "/ 8 glasses", color: "#42A5F5", icon: "💧" }, { label: "Mood", value: "Good", target: "streak: 4 days", color: KENTE_COLORS.mental, icon: "🙂" }, { label: "Meals Logged", value: "2", target: "/ 3 today", color: KENTE_COLORS.food, icon: "🍽️" }].map((s, i) => (
          <div key={i} role="listitem" aria-label={`${s.label}: ${s.value} ${s.target}`} style={{ background: KENTE_COLORS.slate, borderRadius: 14, padding: 16, border: `1px solid ${s.color}30` }}>
            <span aria-hidden="true" style={{ fontSize: 24 }}>{s.icon}</span>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: KENTE_COLORS.cream, margin: "8px 0 2px", fontWeight: 700 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}80`, margin: 0 }}>{s.label} <span style={{ color: s.color }}>{s.target}</span></p>
          </div>
        ))}
      </div>
      <section aria-label="Community activity" style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: KENTE_COLORS.cream, marginBottom: 12 }}>Your Circle Activity</h2>
        {COMMUNITY_GROUPS.slice(0, 3).map(g => (
          <div key={g.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: KENTE_COLORS.slate, borderRadius: 12, marginBottom: 8, border: `1px solid ${KENTE_COLORS.warmBrown}30` }}>
            <span aria-hidden="true" style={{ fontSize: 28 }}>{g.icon}</span>
            <div style={{ flex: 1 }}><p style={{ fontSize: 14, color: KENTE_COLORS.cream, margin: 0, fontWeight: 600 }}>{g.name}</p><p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}60`, margin: 0 }}>{g.members} brothers</p></div>
            {g.new_posts > 0 && <span aria-label={`${g.new_posts} new posts`} style={{ background: KENTE_COLORS.terracotta, borderRadius: 10, padding: "2px 8px", fontSize: 11, color: KENTE_COLORS.cream, fontWeight: 700 }}>{g.new_posts} new</span>}
          </div>
        ))}
      </section>
      <section aria-label="Today's reminders" style={{ background: `linear-gradient(135deg, ${KENTE_COLORS.forest}40, ${KENTE_COLORS.slate})`, borderRadius: 14, padding: 16, border: `1px solid ${KENTE_COLORS.forest}40` }}>
        <h2 style={{ fontSize: 14, color: KENTE_COLORS.health, margin: "0 0 10px" }}><span aria-hidden="true">📋</span> Today's Reminders</h2>
        {["Blood pressure check — 2:00 PM", "Evening walk with Sunrise Walkers", "Log dinner meal"].map((r, i) => (
          <div key={i} role="checkbox" aria-checked="false" tabIndex={0} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 2 ? `1px solid ${KENTE_COLORS.warmBrown}20` : "none", cursor: "pointer" }}>
            <div aria-hidden="true" style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${KENTE_COLORS.gold}60`, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: KENTE_COLORS.cream, margin: 0 }}>{r}</p>
          </div>
        ))}
      </section>
      <Disclaimer />
    </main>
  );
}

// ======== HEALTH SCREEN ========
function HealthScreen() {
  const [bpSys, setBpSys] = useState("138"), [bpDia, setBpDia] = useState("85"), [glucose, setGlucose] = useState("110"), [weight, setWeight] = useState("205"), [showLog, setShowLog] = useState(false);
  const wd = [{ day: "Mon", sys: 142 }, { day: "Tue", sys: 139 }, { day: "Wed", sys: 136 }, { day: "Thu", sys: 140 }, { day: "Fri", sys: 135 }, { day: "Sat", sys: 138 }, { day: "Sun", sys: 134 }];
  return (
    <main style={{ padding: "20px 16px 100px", animation: "fadeIn 0.5s" }} aria-label="Health dashboard">
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: KENTE_COLORS.cream, marginBottom: 4 }}>Health Dashboard</h1>
      <p style={{ fontSize: 13, color: `${KENTE_COLORS.cream}70`, marginBottom: 20 }}>Know your numbers. Own your health.</p>
      <section aria-label="Blood pressure" style={{ background: KENTE_COLORS.slate, borderRadius: 16, padding: 20, marginBottom: 16, border: `1px solid ${KENTE_COLORS.health}30` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}><h2 style={{ fontSize: 16, color: KENTE_COLORS.cream, margin: 0 }}><span aria-hidden="true">❤️</span> Blood Pressure</h2><span role="status" style={{ background: "#FFC10720", color: "#FFC107", fontSize: 11, padding: "4px 10px", borderRadius: 8, fontWeight: 600 }}>Elevated</span></div>
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1, textAlign: "center" }}><p aria-label={`Blood pressure ${bpSys} over ${bpDia} millimeters of mercury`} style={{ fontSize: 36, color: KENTE_COLORS.cream, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0 }}>{bpSys}<span style={{ fontSize: 16, color: `${KENTE_COLORS.cream}60` }}>/{bpDia}</span></p><p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}60`, margin: 0 }}>mmHg</p></div>
          <div style={{ flex: 1, textAlign: "center" }}><p aria-label="Heart rate 72 beats per minute" style={{ fontSize: 36, color: KENTE_COLORS.cream, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0 }}>72</p><p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}60`, margin: 0 }}>BPM</p></div>
        </div>
        <div role="img" aria-label="Weekly blood pressure trend chart showing values from 134 to 142" style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
          {wd.map((d, i) => (<div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}><div style={{ width: "100%", borderRadius: 4, height: `${(d.sys / 160) * 60}px`, background: d.sys > 140 ? `linear-gradient(${KENTE_COLORS.terracotta}, #F4433680)` : `linear-gradient(${KENTE_COLORS.health}, ${KENTE_COLORS.health}80)` }} /><span style={{ fontSize: 9, color: `${KENTE_COLORS.cream}50` }}>{d.day}</span></div>))}
        </div>
      </section>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div aria-label={`Blood glucose ${glucose} milligrams per deciliter, pre-diabetic range`} style={{ background: KENTE_COLORS.slate, borderRadius: 14, padding: 16, border: `1px solid ${KENTE_COLORS.food}30` }}><p style={{ fontSize: 12, color: KENTE_COLORS.food, margin: "0 0 8px" }}><span aria-hidden="true">🩸</span> Glucose</p><p style={{ fontSize: 28, color: KENTE_COLORS.cream, fontWeight: 700, margin: 0 }}>{glucose} <span style={{ fontSize: 12, color: `${KENTE_COLORS.cream}60` }}>mg/dL</span></p><p role="alert" style={{ fontSize: 11, color: "#FFC107", margin: "4px 0 0" }}>Pre-diabetic range</p></div>
        <div aria-label={`Weight ${weight} pounds, down 3 pounds this month`} style={{ background: KENTE_COLORS.slate, borderRadius: 14, padding: 16, border: `1px solid ${KENTE_COLORS.mental}30` }}><p style={{ fontSize: 12, color: KENTE_COLORS.mental, margin: "0 0 8px" }}><span aria-hidden="true">⚖️</span> Weight</p><p style={{ fontSize: 28, color: KENTE_COLORS.cream, fontWeight: 700, margin: 0 }}>{weight} <span style={{ fontSize: 12, color: `${KENTE_COLORS.cream}60` }}>lbs</span></p><p style={{ fontSize: 11, color: KENTE_COLORS.health, margin: "4px 0 0" }}>↓ 3 lbs this month</p></div>
      </div>
      <button onClick={() => setShowLog(!showLog)} aria-expanded={showLog} style={{ ...a11y.btn, width: "100%", padding: 14, background: `linear-gradient(135deg, ${KENTE_COLORS.gold}, ${KENTE_COLORS.deepGold})`, borderRadius: 12, fontSize: 15, color: KENTE_COLORS.richBlack, fontWeight: 700, marginBottom: 16 }}>{showLog ? "Close Log" : "✏️ Log Today's Numbers"}</button>
      {showLog && <div style={{ background: KENTE_COLORS.slate, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${KENTE_COLORS.gold}30` }}>
        {[{ l: "Systolic", v: bpSys, s: setBpSys, u: "mmHg" }, { l: "Diastolic", v: bpDia, s: setBpDia, u: "mmHg" }, { l: "Glucose", v: glucose, s: setGlucose, u: "mg/dL" }, { l: "Weight", v: weight, s: setWeight, u: "lbs" }].map((f, i) => (
          <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}><label htmlFor={`health-${f.l}`} style={{ fontSize: 12, color: `${KENTE_COLORS.cream}80`, display: "block", marginBottom: 4 }}>{f.l}</label><div style={{ display: "flex", gap: 8 }}><input id={`health-${f.l}`} type="number" value={f.v} onChange={e => f.s(e.target.value)} aria-label={`${f.l} in ${f.u}`} style={{ flex: 1, background: KENTE_COLORS.charcoal, border: `1px solid ${KENTE_COLORS.warmBrown}40`, borderRadius: 8, padding: "10px 12px", color: KENTE_COLORS.cream, fontSize: 16, outline: "none" }} /><span aria-hidden="true" style={{ fontSize: 12, color: `${KENTE_COLORS.cream}50`, minWidth: 40, lineHeight: "42px" }}>{f.u}</span></div></div>
        ))}
        <button style={{ ...a11y.btn, marginTop: 16, width: "100%", padding: 12, background: KENTE_COLORS.health, borderRadius: 10, color: "white", fontWeight: 600, fontSize: 14 }}>Save Reading ✓</button>
      </div>}
      <section aria-label="Health insight" style={{ background: `linear-gradient(135deg, ${KENTE_COLORS.terracotta}20, ${KENTE_COLORS.slate})`, borderRadius: 14, padding: 16, border: `1px solid ${KENTE_COLORS.terracotta}30` }}>
        <h2 style={{ fontSize: 14, color: KENTE_COLORS.terracotta, margin: "0 0 8px" }}><span aria-hidden="true">💡</span> Health Insight</h2>
        <p style={{ fontSize: 13, color: KENTE_COLORS.cream, lineHeight: 1.6, margin: 0 }}>Black men are 30% more likely to die from heart disease. Tracking BP daily can reduce stroke risk by up to 35%. Keep logging, King.</p>
      </section>
      <Disclaimer />
    </main>
  );
}

// ======== FOOD SCREEN WITH AI SCANNER ========
function FoodScreen() {
  const [tab, setTab] = useState("log");
  const [logged, setLogged] = useState([]);
  const [scanState, setScanState] = useState("idle"); // idle | scanning | result | error
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileRef = useRef(null);

  const totalCal = logged.reduce((s, f) => s + f.calories, 0);
  const totalProtein = logged.reduce((s, f) => s + f.protein, 0);
  const totalCarbs = logged.reduce((s, f) => s + f.carbs, 0);
  const totalFat = logged.reduce((s, f) => s + f.fat, 0);

  const handleImageCapture = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScanState("scanning");
    setScanResult(null);
    setScanError("");

    // Show preview
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = () => reject(new Error("Failed to read image"));
        reader.readAsDataURL(file);
      });

      const mediaType = file.type || "image/jpeg";

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
              { type: "text", text: `You are a nutrition analyst for a health app targeting Black men over 50. Analyze this food image and respond ONLY with a JSON object (no markdown, no backticks, no preamble):
{
  "foods": [
    {
      "name": "Food name",
      "portion": "estimated portion size",
      "calories": number,
      "protein": number (grams),
      "carbs": number (grams),
      "fat": number (grams),
      "fiber": number (grams),
      "icon": "single emoji representing this food"
    }
  ],
  "total_calories": number,
  "total_protein": number,
  "total_carbs": number,
  "total_fat": number,
  "total_fiber": number,
  "health_tip": "One culturally relevant health tip about this meal for a Black man over 50, relating to heart health, blood pressure, or diabetes prevention. Keep it warm and encouraging.",
  "health_rating": "green" or "yellow" or "red",
  "rating_reason": "Brief explanation of the health rating"
}
If you see multiple food items on the plate, list each separately. Estimate portions based on visual appearance. Be accurate but conservative with calorie estimates. If the image is not food, set foods to empty array and total_calories to 0.` }
            ]
          }]
        })
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      if (!parsed.foods || parsed.foods.length === 0) {
        setScanError("Couldn't identify food in this image. Try a clearer photo of your plate.");
        setScanState("error");
      } else {
        setScanResult(parsed);
        setScanState("result");
      }
    } catch (err) {
      console.error("Scan error:", err);
      setScanError("Scan failed — check your connection and try again. " + (err.message || ""));
      setScanState("error");
    }
  };

  const addScanToLog = () => {
    if (!scanResult) return;
    const items = scanResult.foods.map(f => ({
      name: f.name, calories: f.calories, protein: f.protein, carbs: f.carbs, fat: f.fat, icon: f.icon, origin: "Scanned"
    }));
    setLogged(prev => [...prev, ...items]);
    setScanState("idle");
    setScanResult(null);
    setPreviewUrl(null);
    setTab("log");
  };

  const ratingColors = { green: "#4CAF50", yellow: "#FFC107", red: "#FF5722" };
  const ratingLabels = { green: "Heart-Healthy Choice 💚", yellow: "Okay — Watch Portions 💛", red: "Occasional Treat ❤️" };

  return (
    <main style={{ padding: "20px 16px 100px", animation: "fadeIn 0.5s" }} aria-label="Food tracker and scanner">
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: KENTE_COLORS.cream, marginBottom: 4 }}>Food & Nutrition</h1>
      <p style={{ fontSize: 13, color: `${KENTE_COLORS.cream}70`, marginBottom: 16 }}>Scan your plate or log from our menu.</p>

      {/* Tab Switcher */}
      <div role="tablist" aria-label="Food tracker tabs" style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[{ id: "scan", label: "📸 Scan Food", color: "#00BCD4" }, { id: "log", label: "🍽️ Food Log", color: KENTE_COLORS.food }, { id: "menu", label: "📖 Menu", color: KENTE_COLORS.gold }].map(t => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} style={{ ...a11y.btn, flex: 1, padding: "10px 6px", borderRadius: 10, background: tab === t.id ? t.color : KENTE_COLORS.slate, color: tab === t.id ? "white" : `${KENTE_COLORS.cream}70`, fontSize: 12, fontWeight: tab === t.id ? 700 : 400, transition: "all 0.2s" }}>{t.label}</button>
        ))}
      </div>

      {/* ===== SCAN TAB ===== */}
      {tab === "scan" && (
        <div role="tabpanel" aria-label="Food scanner">
          {/* Camera Capture Button */}
          <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleImageCapture} style={{ display: "none" }} aria-label="Take photo of food" />

          {scanState === "idle" && (
            <div style={{ textAlign: "center" }}>
              <button onClick={() => fileRef.current?.click()} style={{ ...a11y.btn, width: "100%", padding: "28px 20px", borderRadius: 20, background: `linear-gradient(135deg, #00BCD4, #00838F)`, color: "white", marginBottom: 16 }}>
                <span aria-hidden="true" style={{ fontSize: 48, display: "block", marginBottom: 8 }}>📸</span>
                <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display', serif", display: "block", marginBottom: 4 }}>Scan Your Plate</span>
                <span style={{ fontSize: 12, opacity: 0.85 }}>Take a photo — AI estimates calories & macros</span>
              </button>
              <button onClick={() => { const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.onchange = handleImageCapture; input.click(); }} style={{ ...a11y.btn, width: "100%", padding: 14, borderRadius: 12, background: KENTE_COLORS.slate, color: KENTE_COLORS.cream, fontSize: 14, border: `1px solid ${KENTE_COLORS.warmBrown}40` }}>
                <span aria-hidden="true">🖼️</span> Upload from Gallery
              </button>
              <div style={{ marginTop: 24, background: KENTE_COLORS.slate, borderRadius: 14, padding: 16, textAlign: "left", border: `1px solid #00BCD420` }}>
                <h3 style={{ fontSize: 14, color: "#00BCD4", margin: "0 0 10px" }}><span aria-hidden="true">💡</span> Tips for Best Results</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Good lighting — natural light is best", "Show the full plate from above", "Include drinks and sides too", "Multiple items? One photo gets them all"].map((tip, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}><span aria-hidden="true" style={{ color: "#00BCD4" }}>✓</span><span style={{ fontSize: 12, color: `${KENTE_COLORS.cream}80` }}>{tip}</span></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {scanState === "scanning" && (
            <div style={{ textAlign: "center", padding: "20px 0" }} role="status" aria-live="polite">
              {previewUrl && <img src={previewUrl} alt="Food photo being analyzed" style={{ width: "100%", maxHeight: 240, objectFit: "cover", borderRadius: 16, marginBottom: 16, border: `2px solid #00BCD440` }} />}
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 16 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: "#00BCD4", animation: `pulse 1s ease-in-out ${i * 0.2}s infinite` }} />)}
              </div>
              <p style={{ fontSize: 16, color: KENTE_COLORS.cream, fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>Analyzing Your Plate...</p>
              <p style={{ fontSize: 12, color: `${KENTE_COLORS.cream}60` }}>AI is identifying foods and estimating nutrition</p>
            </div>
          )}

          {scanState === "error" && (
            <div role="alert" style={{ textAlign: "center", padding: 20 }}>
              {previewUrl && <img src={previewUrl} alt="Photo that could not be analyzed" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 16, marginBottom: 16, opacity: 0.5 }} />}
              <p style={{ fontSize: 36, marginBottom: 8 }} aria-hidden="true">😕</p>
              <p style={{ fontSize: 14, color: KENTE_COLORS.terracotta, marginBottom: 8 }}>{scanError}</p>
              <button onClick={() => { setScanState("idle"); setPreviewUrl(null); }} style={{ ...a11y.btn, padding: "12px 24px", borderRadius: 10, background: "#00BCD4", color: "white", fontSize: 14, fontWeight: 600 }}>Try Again</button>
            </div>
          )}

          {scanState === "result" && scanResult && (
            <div style={{ animation: "fadeIn 0.4s" }}>
              {previewUrl && <img src={previewUrl} alt="Scanned food photo" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 16, marginBottom: 16, border: `2px solid ${ratingColors[scanResult.health_rating] || "#00BCD4"}` }} />}

              {/* Health Rating Banner */}
              <div role="status" style={{ background: `${ratingColors[scanResult.health_rating]}20`, border: `1px solid ${ratingColors[scanResult.health_rating]}50`, borderRadius: 12, padding: "12px 16px", marginBottom: 16, textAlign: "center" }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: ratingColors[scanResult.health_rating], margin: "0 0 4px" }}>{ratingLabels[scanResult.health_rating] || "Analyzed"}</p>
                <p style={{ fontSize: 12, color: `${KENTE_COLORS.cream}80`, margin: 0 }}>{scanResult.rating_reason}</p>
              </div>

              {/* Total Summary */}
              <div style={{ background: KENTE_COLORS.slate, borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid #00BCD430` }}>
                <div style={{ textAlign: "center", marginBottom: 12 }}>
                  <p style={{ fontSize: 42, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: KENTE_COLORS.cream, margin: 0 }}>{scanResult.total_calories}</p>
                  <p style={{ fontSize: 12, color: "#00BCD4", margin: 0 }}>Estimated Calories</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                  {[{ l: "Protein", v: `${scanResult.total_protein}g`, c: "#FF7043" }, { l: "Carbs", v: `${scanResult.total_carbs}g`, c: KENTE_COLORS.gold }, { l: "Fat", v: `${scanResult.total_fat}g`, c: KENTE_COLORS.mental }, { l: "Fiber", v: `${scanResult.total_fiber}g`, c: KENTE_COLORS.health }].map((m, i) => (
                    <div key={i} style={{ textAlign: "center", padding: 8, borderRadius: 8, background: KENTE_COLORS.charcoal }}>
                      <p style={{ fontSize: 16, fontWeight: 700, color: KENTE_COLORS.cream, margin: 0 }}>{m.v}</p>
                      <p style={{ fontSize: 9, color: m.c, margin: 0 }}>{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Food Items */}
              <h3 style={{ fontSize: 14, color: "#00BCD4", marginBottom: 8 }}>Items Detected</h3>
              {scanResult.foods.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: KENTE_COLORS.slate, borderRadius: 12, marginBottom: 8, border: `1px solid ${KENTE_COLORS.warmBrown}20` }}>
                  <span aria-hidden="true" style={{ fontSize: 28 }}>{f.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, color: KENTE_COLORS.cream, margin: 0, fontWeight: 600 }}>{f.name}</p>
                    <p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}60`, margin: "2px 0 0" }}>{f.portion} · P:{f.protein}g · C:{f.carbs}g · F:{f.fat}g</p>
                  </div>
                  <span style={{ fontSize: 14, color: KENTE_COLORS.gold, fontWeight: 700 }}>{f.calories} cal</span>
                </div>
              ))}

              {/* Health Tip */}
              <div style={{ marginTop: 12, background: `${KENTE_COLORS.gold}10`, borderRadius: 12, padding: 14, borderLeft: `4px solid ${KENTE_COLORS.gold}` }}>
                <p style={{ fontSize: 12, color: KENTE_COLORS.gold, fontWeight: 600, margin: "0 0 4px" }}>👑 King's Health Tip</p>
                <p style={{ fontSize: 12, color: `${KENTE_COLORS.cream}80`, margin: 0, lineHeight: 1.6 }}>{scanResult.health_tip}</p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button onClick={addScanToLog} style={{ ...a11y.btn, flex: 2, padding: 14, borderRadius: 12, background: `linear-gradient(135deg, ${KENTE_COLORS.health}, #2E7D32)`, color: "white", fontSize: 14, fontWeight: 700 }}>✓ Add to Today's Log</button>
                <button onClick={() => { setScanState("idle"); setPreviewUrl(null); setScanResult(null); }} style={{ ...a11y.btn, flex: 1, padding: 14, borderRadius: 12, background: KENTE_COLORS.slate, color: KENTE_COLORS.cream, fontSize: 14, border: `1px solid ${KENTE_COLORS.warmBrown}40` }}>Retake</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== LOG TAB ===== */}
      {tab === "log" && (
        <div role="tabpanel" aria-label="Daily food log">
          <section aria-label="Daily nutrition summary" style={{ background: KENTE_COLORS.slate, borderRadius: 16, padding: 20, marginBottom: 16, border: `1px solid ${KENTE_COLORS.food}30` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ fontSize: 13, color: `${KENTE_COLORS.cream}80` }}>Daily Calories</span><span style={{ fontSize: 13, color: KENTE_COLORS.food }}>{totalCal} / 2,000</span></div>
            <div style={{ height: 12, background: KENTE_COLORS.charcoal, borderRadius: 6, overflow: "hidden", marginBottom: 16 }} role="progressbar" aria-valuenow={totalCal} aria-valuemin={0} aria-valuemax={2000} aria-label={`${totalCal} of 2000 calories consumed`}><div style={{ height: "100%", width: `${Math.min((totalCal / 2000) * 100, 100)}%`, background: `linear-gradient(90deg, ${KENTE_COLORS.food}, ${KENTE_COLORS.gold})`, borderRadius: 6, transition: "width 0.5s" }} /></div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {[{ l: "Protein", v: `${totalProtein}g`, c: "#FF7043" }, { l: "Carbs", v: `${totalCarbs}g`, c: KENTE_COLORS.gold }, { l: "Fat", v: `${totalFat}g`, c: KENTE_COLORS.mental }].map((m, i) => (
                <div key={i} style={{ textAlign: "center" }}><p style={{ fontSize: 20, fontWeight: 700, color: KENTE_COLORS.cream, margin: 0 }}>{m.v}</p><p style={{ fontSize: 11, color: m.c, margin: 0 }}>{m.l}</p></div>
              ))}
            </div>
          </section>
          {logged.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 20px" }}>
              <p aria-hidden="true" style={{ fontSize: 48, marginBottom: 8 }}>🍽️</p>
              <p style={{ fontSize: 14, color: `${KENTE_COLORS.cream}70`, marginBottom: 16 }}>No food logged today. Scan a plate or choose from the menu!</p>
              <button onClick={() => setTab("scan")} style={{ ...a11y.btn, padding: "12px 24px", borderRadius: 10, background: "#00BCD4", color: "white", fontSize: 14, fontWeight: 600 }}>📸 Scan Your First Meal</button>
            </div>
          ) : (
            <section aria-label={`Today's logged food: ${logged.length} items`}>
              <h2 style={{ fontSize: 14, color: KENTE_COLORS.food, marginBottom: 8 }}>Today's Plate ({logged.length} items)</h2>
              {logged.map((f, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: KENTE_COLORS.slate, borderRadius: 10, marginBottom: 6, border: `1px solid ${KENTE_COLORS.warmBrown}15` }}>
                  <span style={{ fontSize: 13, color: KENTE_COLORS.cream }}><span aria-hidden="true">{f.icon}</span> {f.name}</span>
                  <div style={{ textAlign: "right" }}><span style={{ fontSize: 13, color: KENTE_COLORS.gold }}>{f.calories} cal</span>{f.origin === "Scanned" && <span style={{ display: "block", fontSize: 9, color: "#00BCD4" }}>AI Scanned</span>}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      )}

      {/* ===== MENU TAB ===== */}
      {tab === "menu" && (
        <div role="tabpanel" aria-label="Food menu">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: KENTE_COLORS.cream, marginBottom: 10 }}>Caribbean Classics</h2>
          {CARIBBEAN_FOODS.map((food, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: KENTE_COLORS.slate, borderRadius: 12, marginBottom: 8, border: `1px solid ${KENTE_COLORS.warmBrown}20` }}>
              <span aria-hidden="true" style={{ fontSize: 28 }}>{food.icon}</span>
              <div style={{ flex: 1 }}><p style={{ fontSize: 14, color: KENTE_COLORS.cream, margin: 0 }}>{food.name}</p><p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}60`, margin: 0 }}>{food.origin} · {food.calories} cal · P:{food.protein}g</p></div>
              <button onClick={() => setLogged(p => [...p, food])} aria-label={`Log ${food.name}`} style={{ ...a11y.btn, background: `${KENTE_COLORS.food}20`, borderRadius: 8, fontSize: 18, color: KENTE_COLORS.food, padding: "4px 10px", minWidth: 36, minHeight: 36 }}>+</button>
            </div>
          ))}
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: KENTE_COLORS.cream, margin: "20px 0 10px" }}>Soul Food Favorites</h2>
          {SOUL_FOODS.map((food, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: KENTE_COLORS.slate, borderRadius: 12, marginBottom: 8, border: `1px solid ${KENTE_COLORS.warmBrown}20` }}>
              <span aria-hidden="true" style={{ fontSize: 28 }}>{food.icon}</span>
              <div style={{ flex: 1 }}><p style={{ fontSize: 14, color: KENTE_COLORS.cream, margin: 0 }}>{food.name}</p><p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}60`, margin: 0 }}>{food.origin} · {food.calories} cal · P:{food.protein}g</p></div>
              <button onClick={() => setLogged(p => [...p, food])} aria-label={`Log ${food.name}`} style={{ ...a11y.btn, background: `${KENTE_COLORS.food}20`, borderRadius: 8, fontSize: 18, color: KENTE_COLORS.food, padding: "4px 10px", minWidth: 36, minHeight: 36 }}>+</button>
            </div>
          ))}
        </div>
      )}
      <Disclaimer />
    </main>
  );
}

// ======== MEAL PLAN SCREEN ========
function MealPlanScreen() {
  const [activePlan, setActivePlan] = useState("aa");
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [checkedMeals, setCheckedMeals] = useState({});
  const plan = activePlan === "aa" ? AA_MEAL_PLAN : CARIBBEAN_MEAL_PLAN;
  const dayData = plan.days[selectedDay];
  const dayTotals = dayData.meals.reduce((t, m) => ({ calories: t.calories + m.calories, protein: t.protein + m.protein, carbs: t.carbs + m.carbs, fat: t.fat + m.fat, fiber: t.fiber + m.fiber }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  const toggleMeal = (i) => { const k = `${activePlan}-${selectedDay}-${i}`; setCheckedMeals(p => ({ ...p, [k]: !p[k] })); };
  const checkedCount = dayData.meals.filter((_, i) => checkedMeals[`${activePlan}-${selectedDay}-${i}`]).length;

  return (
    <main style={{ padding: "20px 16px 100px", animation: "fadeIn 0.5s" }} aria-label="Meal planner">
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: KENTE_COLORS.cream, marginBottom: 4 }}>Meal Planner</h1>
      <p style={{ fontSize: 13, color: `${KENTE_COLORS.cream}70`, marginBottom: 16 }}>7-day heart-healthy plans honoring your culture.</p>
      <div role="radiogroup" aria-label="Choose meal plan" style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {[{ id: "aa", flag: "🇺🇸", t: "Soul Food", s: "African American" }, { id: "carib", flag: "🇯🇲", t: "Yard Food", s: "Caribbean" }].map(p => (
          <button key={p.id} role="radio" aria-checked={activePlan === p.id} onClick={() => { setActivePlan(p.id); setSelectedDay(0); setExpandedMeal(null); }} style={{ ...a11y.btn, flex: 1, padding: 14, borderRadius: 12, background: activePlan === p.id ? (p.id === "aa" ? "#FF704320" : "#26A69A20") : KENTE_COLORS.slate, border: activePlan === p.id ? `2px solid ${p.id === "aa" ? "#FF7043" : "#26A69A"}` : `1px solid ${KENTE_COLORS.warmBrown}30`, color: KENTE_COLORS.cream, textAlign: "center" }}>
            <span style={{ fontSize: 28 }}>{p.flag}</span><p style={{ fontSize: 14, fontWeight: 700, margin: "4px 0 0" }}>{p.t}</p><p style={{ fontSize: 10, color: `${KENTE_COLORS.cream}60`, margin: 0 }}>{p.s}</p>
          </button>
        ))}
      </div>
      <section aria-label="Plan details" style={{ background: `${plan.color}15`, borderRadius: 14, padding: 14, marginBottom: 12, border: `1px solid ${plan.color}30` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><span aria-hidden="true" style={{ fontSize: 22 }}>{plan.icon}</span><h2 style={{ fontSize: 16, color: plan.color, margin: 0 }}>{plan.title}</h2></div>
        <p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}70`, margin: "0 0 8px" }}>{plan.focus}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{Object.entries(plan.dailyTargets).map(([k, v]) => <span key={k} style={{ background: KENTE_COLORS.charcoal, borderRadius: 6, padding: "3px 8px", fontSize: 10, color: plan.color }}>{k}: {v}</span>)}</div>
      </section>
      <nav aria-label="Day selector" style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
        {plan.days.map((d, i) => (<button key={i} onClick={() => { setSelectedDay(i); setExpandedMeal(null); }} aria-current={selectedDay === i ? "true" : undefined} aria-label={`${d.day}: ${d.theme}`} style={{ ...a11y.btn, minWidth: 54, padding: "8px 6px", borderRadius: 10, background: selectedDay === i ? plan.color : KENTE_COLORS.slate, color: selectedDay === i ? "white" : `${KENTE_COLORS.cream}70`, fontSize: 11, fontWeight: selectedDay === i ? 700 : 400, textAlign: "center", flexShrink: 0 }}><div style={{ fontSize: 13, fontWeight: 700 }}>{d.day.slice(0, 3)}</div></button>))}
      </nav>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div><h3 style={{ fontSize: 16, color: KENTE_COLORS.cream, margin: 0 }}>{dayData.day}: {dayData.theme}</h3><p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}50`, margin: "2px 0 0" }}>{checkedCount}/{dayData.meals.length} meals tracked</p></div>
        <div style={{ textAlign: "right" }} aria-label={`Total ${dayTotals.calories} calories`}><p style={{ fontSize: 18, color: plan.color, fontWeight: 700, margin: 0 }}>{dayTotals.calories}</p><p style={{ fontSize: 10, color: `${KENTE_COLORS.cream}50`, margin: 0 }}>total cal</p></div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {[{ l: "Protein", v: `${dayTotals.protein}g`, c: "#FF7043" }, { l: "Carbs", v: `${dayTotals.carbs}g`, c: KENTE_COLORS.gold }, { l: "Fat", v: `${dayTotals.fat}g`, c: KENTE_COLORS.mental }, { l: "Fiber", v: `${dayTotals.fiber}g`, c: KENTE_COLORS.health }].map((m, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: 10, background: KENTE_COLORS.slate, border: `1px solid ${m.c}20` }}><p style={{ fontSize: 16, fontWeight: 700, color: KENTE_COLORS.cream, margin: 0 }}>{m.v}</p><p style={{ fontSize: 9, color: m.c, margin: 0 }}>{m.l}</p></div>
        ))}
      </div>
      <div role="list" aria-label="Meals for the day">
        {dayData.meals.map((meal, i) => {
          const key = `${activePlan}-${selectedDay}-${i}`, checked = checkedMeals[key], isOpen = expandedMeal === i;
          return (
            <div key={i} role="listitem" style={{ background: KENTE_COLORS.slate, borderRadius: 14, padding: "14px 16px", marginBottom: 10, border: `1px solid ${checked ? plan.color + "40" : KENTE_COLORS.warmBrown + "20"}`, opacity: checked ? 0.7 : 1, transition: "all 0.3s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => toggleMeal(i)} role="checkbox" aria-checked={checked} aria-label={`Mark ${meal.name} as eaten`} style={{ ...a11y.btn, width: 24, height: 24, borderRadius: 6, background: checked ? plan.color : "transparent", border: `2px solid ${plan.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, padding: 0, minWidth: 24 }}>{checked ? "✓" : ""}</button>
                <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setExpandedMeal(isOpen ? null : i)}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 10, color: plan.color, fontWeight: 600, textTransform: "uppercase" }}>{meal.type}</span><span style={{ fontSize: 12, color: KENTE_COLORS.gold, fontWeight: 600 }}>{meal.calories} cal</span></div>
                  <p style={{ fontSize: 14, color: KENTE_COLORS.cream, margin: "4px 0 0", fontWeight: 600, textDecoration: checked ? "line-through" : "none" }}><span aria-hidden="true">{meal.icon}</span> {meal.name}</p>
                </div>
                <button onClick={() => setExpandedMeal(isOpen ? null : i)} aria-expanded={isOpen} aria-label={`${isOpen ? "Collapse" : "Expand"} ${meal.name} details`} style={{ ...a11y.btn, background: "none", color: `${KENTE_COLORS.cream}50`, fontSize: 12, padding: 4, minWidth: 28, minHeight: 28 }}>{isOpen ? "▲" : "▼"}</button>
              </div>
              {isOpen && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${KENTE_COLORS.warmBrown}20`, animation: "fadeIn 0.3s" }}>
                  <p style={{ fontSize: 12, color: `${KENTE_COLORS.cream}80`, lineHeight: 1.5, margin: "0 0 10px" }}>{meal.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                    {[{ l: "Protein", v: `${meal.protein}g` }, { l: "Carbs", v: `${meal.carbs}g` }, { l: "Fat", v: `${meal.fat}g` }, { l: "Fiber", v: `${meal.fiber}g` }].map((n, j) => <span key={j} style={{ background: KENTE_COLORS.charcoal, borderRadius: 6, padding: "3px 8px", fontSize: 10, color: `${KENTE_COLORS.cream}70` }}>{n.l}: {n.v}</span>)}
                  </div>
                  <div style={{ background: `${KENTE_COLORS.gold}10`, borderRadius: 8, padding: 10, borderLeft: `3px solid ${KENTE_COLORS.gold}40` }}><p style={{ fontSize: 11, color: KENTE_COLORS.gold, margin: 0, lineHeight: 1.5 }}><strong>👑 King's Tip:</strong> {meal.tip}</p></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", padding: "16px 0" }}><AdinkraSymbol symbol="sankofa" size={20} /><p style={{ fontSize: 12, color: `${KENTE_COLORS.cream}60`, margin: "4px 0 0" }}>{activePlan === "aa" ? "Our grandmothers' recipes, adapted for the kings we are today." : "Yard food wisdom meets modern nutrition. Eat like your ancestors, live longer."}</p></div>
      <Disclaimer />
    </main>
  );
}

// ======== EXERCISE SCREEN ========
function ExerciseScreen() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedEx, setExpandedEx] = useState(null);
  const [completedEx, setCompletedEx] = useState({});
  const week = EXERCISE_PLAN.weeks[selectedWeek];
  const day = week.days[selectedDay];
  const toggleEx = (i) => { const k = `${selectedWeek}-${selectedDay}-${i}`; setCompletedEx(p => ({ ...p, [k]: !p[k] })); };
  const completedCount = day.exercises.filter((_, i) => completedEx[`${selectedWeek}-${selectedDay}-${i}`]).length;
  const progress = day.exercises.length > 0 ? Math.round((completedCount / day.exercises.length) * 100) : 0;

  return (
    <main style={{ padding: "20px 16px 100px", animation: "fadeIn 0.5s" }} aria-label="Exercise program">
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: KENTE_COLORS.cream, marginBottom: 4 }}>King's Movement</h1>
      <p style={{ fontSize: 13, color: `${KENTE_COLORS.cream}70`, marginBottom: 16 }}>4-week program designed for kings over 50.</p>

      {/* Week Selector */}
      <nav aria-label="Week selector" style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {EXERCISE_PLAN.weeks.map((w, i) => (
          <button key={i} onClick={() => { setSelectedWeek(i); setSelectedDay(0); setExpandedEx(null); }} aria-current={selectedWeek === i ? "true" : undefined} style={{ ...a11y.btn, flex: 1, padding: "10px 4px", borderRadius: 10, background: selectedWeek === i ? "#00BCD4" : KENTE_COLORS.slate, color: selectedWeek === i ? "white" : `${KENTE_COLORS.cream}70`, fontSize: 11, fontWeight: selectedWeek === i ? 700 : 400, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>W{w.week}</div>
            <div style={{ fontSize: 8, marginTop: 2, opacity: 0.8 }}>{w.theme.split(" ")[0]}</div>
          </button>
        ))}
      </nav>

      {/* Week Info */}
      <section aria-label="Week overview" style={{ background: `#00BCD415`, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid #00BCD430` }}>
        <h2 style={{ fontSize: 16, color: "#00BCD4", margin: "0 0 4px" }}>Week {week.week}: {week.theme}</h2>
        <p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}70`, margin: 0 }}>{week.focus}</p>
      </section>

      {/* Day Selector */}
      <nav aria-label="Day selector" style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16 }}>
        {week.days.map((d, i) => (
          <button key={i} onClick={() => { setSelectedDay(i); setExpandedEx(null); }} aria-current={selectedDay === i ? "true" : undefined} aria-label={`${d.day}: ${d.title}, ${d.type}`} style={{ ...a11y.btn, minWidth: 52, padding: "8px 4px", borderRadius: 10, background: selectedDay === i ? d.color : KENTE_COLORS.slate, color: selectedDay === i ? "white" : `${KENTE_COLORS.cream}60`, fontSize: 10, fontWeight: selectedDay === i ? 700 : 400, textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontSize: 14 }}>{d.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 700 }}>{d.day}</div>
          </button>
        ))}
      </nav>

      {/* Day Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <h3 style={{ fontSize: 18, color: KENTE_COLORS.cream, margin: 0, fontFamily: "'Playfair Display', serif" }}>{day.title}</h3>
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            <span style={{ background: `${day.color}30`, color: day.color, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 600 }}>{day.type}</span>
            {day.duration !== "—" && <span style={{ background: KENTE_COLORS.charcoal, color: `${KENTE_COLORS.cream}70`, borderRadius: 6, padding: "2px 8px", fontSize: 10 }}>{day.duration}</span>}
            <span style={{ background: KENTE_COLORS.charcoal, color: `${KENTE_COLORS.cream}70`, borderRadius: 6, padding: "2px 8px", fontSize: 10 }}>{day.intensity}</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }} aria-label={`${completedCount} of ${day.exercises.length} exercises completed`}>
          <p style={{ fontSize: 22, color: day.color, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', serif" }}>{progress}%</p>
          <p style={{ fontSize: 9, color: `${KENTE_COLORS.cream}50`, margin: 0 }}>{completedCount}/{day.exercises.length} done</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ height: 8, background: KENTE_COLORS.charcoal, borderRadius: 4, marginBottom: 16, overflow: "hidden" }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${day.color}, ${KENTE_COLORS.gold})`, borderRadius: 4, transition: "width 0.5s" }} />
      </div>

      {/* Exercise List */}
      <div role="list" aria-label="Exercises">
        {day.exercises.map((ex, i) => {
          const key = `${selectedWeek}-${selectedDay}-${i}`, done = completedEx[key], isOpen = expandedEx === i;
          return (
            <div key={i} role="listitem" style={{ background: KENTE_COLORS.slate, borderRadius: 14, padding: "14px 16px", marginBottom: 10, border: `1px solid ${done ? day.color + "40" : KENTE_COLORS.warmBrown + "20"}`, opacity: done ? 0.7 : 1, transition: "all 0.3s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => toggleEx(i)} role="checkbox" aria-checked={done} aria-label={`Mark ${ex.name} complete`} style={{ ...a11y.btn, width: 28, height: 28, borderRadius: "50%", background: done ? day.color : "transparent", border: `2px solid ${day.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, padding: 0, minWidth: 28 }}>{done ? "✓" : ""}</button>
                <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setExpandedEx(isOpen ? null : i)}>
                  <p style={{ fontSize: 14, color: KENTE_COLORS.cream, margin: 0, fontWeight: 600, textDecoration: done ? "line-through" : "none" }}>{ex.name}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: `${KENTE_COLORS.cream}60` }}>{ex.sets} {ex.sets === 1 ? "set" : "sets"} × {ex.reps}</span>
                    {ex.rest !== "—" && <span style={{ fontSize: 10, color: `${KENTE_COLORS.cream}40` }}>Rest: {ex.rest}</span>}
                  </div>
                </div>
                <button onClick={() => setExpandedEx(isOpen ? null : i)} aria-expanded={isOpen} aria-label={`${isOpen ? "Hide" : "Show"} exercise details`} style={{ ...a11y.btn, background: "none", color: `${KENTE_COLORS.cream}50`, fontSize: 12, padding: 4, minWidth: 28, minHeight: 28 }}>{isOpen ? "▲" : "▼"}</button>
              </div>
              {isOpen && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${KENTE_COLORS.warmBrown}20`, animation: "fadeIn 0.3s" }}>
                  <p style={{ fontSize: 12, color: `${KENTE_COLORS.cream}80`, lineHeight: 1.6, margin: 0 }}>{ex.note}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Day Tip */}
      <div style={{ background: `${KENTE_COLORS.gold}10`, borderRadius: 14, padding: 14, marginTop: 8, borderLeft: `4px solid ${KENTE_COLORS.gold}` }}>
        <p style={{ fontSize: 12, color: KENTE_COLORS.gold, margin: 0, lineHeight: 1.6 }}><strong>👑 Coach's Word:</strong> {day.tip}</p>
      </div>

      {progress === 100 && (
        <div role="status" style={{ textAlign: "center", marginTop: 16, background: `${day.color}15`, borderRadius: 14, padding: 20, border: `1px solid ${day.color}40` }}>
          <p aria-hidden="true" style={{ fontSize: 48, margin: "0 0 8px" }}>🏆</p>
          <p style={{ fontSize: 16, color: day.color, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Workout Complete!</p>
          <p style={{ fontSize: 12, color: `${KENTE_COLORS.cream}70`, margin: "4px 0 0" }}>Another day of building your legacy, King.</p>
        </div>
      )}
      <Disclaimer />
    </main>
  );
}

// ======== MIND & SPIRIT SCREEN ========
function MindScreen() {
  const [mood, setMood] = useState(null), [journal, setJournal] = useState(""), [showTools, setShowTools] = useState(false);
  return (
    <main style={{ padding: "20px 16px 100px", animation: "fadeIn 0.5s" }} aria-label="Mind and spirit wellness">
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: KENTE_COLORS.cream, marginBottom: 4 }}>Mind & Spirit</h1>
      <p style={{ fontSize: 13, color: `${KENTE_COLORS.cream}70`, marginBottom: 20 }}>Your inner health matters just as much, King.</p>
      <section aria-label="Mood check-in" style={{ background: `linear-gradient(135deg, ${KENTE_COLORS.mental}20, ${KENTE_COLORS.slate})`, borderRadius: 16, padding: 20, marginBottom: 16, border: `1px solid ${KENTE_COLORS.mental}30` }}>
        <h2 style={{ fontSize: 16, color: KENTE_COLORS.mental, margin: "0 0 14px" }}><span aria-hidden="true">🧠</span> How Are You Feeling?</h2>
        <div role="radiogroup" aria-label="Select your mood" style={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
          {MOOD_OPTIONS.map(m => (
            <button key={m.value} role="radio" aria-checked={mood === m.value} aria-label={m.label} onClick={() => setMood(m.value)} style={{ ...a11y.btn, flex: 1, padding: "12px 4px", borderRadius: 12, background: mood === m.value ? `${m.color}30` : KENTE_COLORS.charcoal, border: mood === m.value ? `2px solid ${m.color}` : "2px solid transparent", textAlign: "center", transition: "all 0.2s" }}>
              <span style={{ fontSize: 28, display: "block" }}>{m.emoji}</span>
              <span style={{ fontSize: 10, color: mood === m.value ? m.color : `${KENTE_COLORS.cream}60`, marginTop: 4, display: "block" }}>{m.label}</span>
            </button>
          ))}
        </div>
        {mood && <p role="status" style={{ fontSize: 13, color: KENTE_COLORS.cream, marginTop: 12, textAlign: "center" }}>{mood >= 4 ? "Good to hear, King. Keep that energy." : mood === 3 ? "An honest day. Tomorrow is a new page." : "It takes strength to say it. That alone makes you brave."}</p>}
      </section>
      <section aria-label="Journal" style={{ background: KENTE_COLORS.slate, borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${KENTE_COLORS.warmBrown}30` }}>
        <h2 style={{ fontSize: 14, color: KENTE_COLORS.cream, margin: "0 0 10px" }}><span aria-hidden="true">📖</span> Journal Entry</h2>
        <label htmlFor="journal-input" style={a11y.sr}>Write your thoughts</label>
        <textarea id="journal-input" value={journal} onChange={e => setJournal(e.target.value)} placeholder="What's on your mind today, King?" rows={4} style={{ width: "100%", background: KENTE_COLORS.charcoal, border: `1px solid ${KENTE_COLORS.warmBrown}40`, borderRadius: 10, padding: 12, color: KENTE_COLORS.cream, fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box" }} />
        {journal && <button style={{ ...a11y.btn, marginTop: 8, padding: "10px 20px", background: KENTE_COLORS.mental, borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600 }}>Save Entry ✓</button>}
      </section>
      <section aria-label="Wellness toolkit">
        <button onClick={() => setShowTools(!showTools)} aria-expanded={showTools} style={{ ...a11y.btn, width: "100%", padding: 14, borderRadius: 12, background: `linear-gradient(135deg, ${KENTE_COLORS.mental}, #5C3D99)`, color: "white", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{showTools ? "Hide Toolkit" : "🛠️ Open Wellness Toolkit"}</button>
        {showTools && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {MENTAL_RESOURCES.map((r, i) => (
            <button key={i} style={{ ...a11y.btn, background: KENTE_COLORS.slate, borderRadius: 14, padding: 16, textAlign: "center", border: `1px solid ${KENTE_COLORS.mental}20` }} aria-label={`${r.title}: ${r.desc}, ${r.duration}`}>
              <span aria-hidden="true" style={{ fontSize: 28, display: "block", marginBottom: 6 }}>{r.icon}</span>
              <p style={{ fontSize: 13, color: KENTE_COLORS.cream, margin: "0 0 2px", fontWeight: 600 }}>{r.title}</p>
              <p style={{ fontSize: 10, color: `${KENTE_COLORS.cream}60`, margin: 0 }}>{r.desc}</p>
              <p style={{ fontSize: 10, color: KENTE_COLORS.mental, margin: "4px 0 0" }}>{r.duration}</p>
            </button>
          ))}
        </div>}
      </section>
      <section aria-label="Crisis resources" style={{ background: `linear-gradient(135deg, ${KENTE_COLORS.terracotta}15, ${KENTE_COLORS.slate})`, borderRadius: 14, padding: 16, border: `1px solid ${KENTE_COLORS.terracotta}30` }}>
        <h2 style={{ fontSize: 14, color: KENTE_COLORS.terracotta, margin: "0 0 10px" }}><span aria-hidden="true">🆘</span> Need Help Now?</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[{ l: "📞 988 Suicide & Crisis Lifeline", v: "Call 988" }, { l: "💬 Crisis Text Line", v: "Text HOME to 741741" }, { l: "🏥 Therapy for Black Men", v: "therapyforblackmen.org" }].map((r, i) => (
            <div key={i} style={{ padding: "10px 14px", background: KENTE_COLORS.charcoal, borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: KENTE_COLORS.cream }}>{r.l}</span>
              <span style={{ fontSize: 12, color: KENTE_COLORS.gold, fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
        </div>
      </section>
      <Disclaimer />
    </main>
  );
}

// ======== CIRCLE SCREEN ========
function CircleScreen() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...new Set(COMMUNITY_GROUPS.map(g => g.category))];
  const filtered = filter === "All" ? COMMUNITY_GROUPS : COMMUNITY_GROUPS.filter(g => g.category === filter);
  return (
    <main style={{ padding: "20px 16px 100px", animation: "fadeIn 0.5s" }} aria-label="Community circle">
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: KENTE_COLORS.cream, marginBottom: 4 }}>The Circle</h1>
      <p style={{ fontSize: 13, color: `${KENTE_COLORS.cream}70`, marginBottom: 16 }}>Iron sharpens iron. Connect with your brothers.</p>
      <nav aria-label="Category filter" style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} aria-pressed={filter === c} style={{ ...a11y.btn, padding: "8px 14px", borderRadius: 20, background: filter === c ? KENTE_COLORS.social : KENTE_COLORS.slate, color: filter === c ? "white" : `${KENTE_COLORS.cream}60`, fontSize: 12, fontWeight: filter === c ? 700 : 400, whiteSpace: "nowrap", flexShrink: 0 }}>{c}</button>
        ))}
      </nav>
      <div role="list" aria-label={`${filter} community groups`}>
        {filtered.map(g => (
          <div key={g.id} role="listitem" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: KENTE_COLORS.slate, borderRadius: 14, marginBottom: 10, border: `1px solid ${KENTE_COLORS.warmBrown}20`, cursor: "pointer" }}>
            <span aria-hidden="true" style={{ fontSize: 32 }}>{g.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, color: KENTE_COLORS.cream, margin: 0, fontWeight: 600 }}>{g.name}</p>
              <p style={{ fontSize: 11, color: `${KENTE_COLORS.cream}60`, margin: "2px 0 0" }}>{g.desc}</p>
              <p style={{ fontSize: 10, color: `${KENTE_COLORS.cream}40`, margin: "2px 0 0" }}>{g.members} brothers · {g.category}</p>
            </div>
            {g.new_posts > 0 && <span aria-label={`${g.new_posts} new posts`} style={{ background: KENTE_COLORS.terracotta, borderRadius: 10, padding: "3px 10px", fontSize: 11, color: "white", fontWeight: 700 }}>{g.new_posts}</span>}
          </div>
        ))}
      </div>
      <button style={{ ...a11y.btn, width: "100%", padding: 14, borderRadius: 12, background: `linear-gradient(135deg, ${KENTE_COLORS.social}, #D84315)`, color: "white", fontSize: 14, fontWeight: 700, marginTop: 8 }}>+ Start a New Group</button>
    </main>
  );
}

// ======== MAIN APP ========
export default function KingSquare() {
  const [screen, setScreen] = useState("home");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
      @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
      * { box-sizing: border-box; font-family: 'Cormorant Garamond', Georgia, serif; -webkit-tap-highlight-color: transparent; }
      button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible, [role="radio"]:focus-visible, [role="checkbox"]:focus-visible, [role="tab"]:focus-visible {
        outline: 3px solid #D4A017 !important; outline-offset: 2px !important;
      }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #5C331740; border-radius: 4px; }
      input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      input[type=number] { -moz-appearance: textfield; }
      ::selection { background: #D4A01740; color: #FFF8E7; }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
      }
      @media (prefers-contrast: more) {
        button, [role="radio"], [role="checkbox"], [role="tab"] { border-width: 2px !important; }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: KENTE_COLORS.midnight, minHeight: "100vh", position: "relative", overflow: "hidden" }} role="application" aria-label="KingSquare Wellness App">
      <a href="#main-content" style={{ ...a11y.sr, zIndex: 9999 }} onFocus={e => { e.target.style.position = "fixed"; e.target.style.top = "10px"; e.target.style.left = "10px"; e.target.style.width = "auto"; e.target.style.height = "auto"; e.target.style.clip = "auto"; e.target.style.padding = "12px 20px"; e.target.style.background = KENTE_COLORS.gold; e.target.style.color = KENTE_COLORS.richBlack; e.target.style.borderRadius = "8px"; e.target.style.fontWeight = "700"; }} onBlur={e => Object.assign(e.target.style, a11y.sr)}>Skip to main content</a>
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: KENTE_COLORS.midnight, padding: "12px 16px 8px", borderBottom: `1px solid ${KENTE_COLORS.warmBrown}30` }}>
        <KentePattern />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <AdinkraSymbol symbol="adinkrahene" size={22} label="KingSquare logo" />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: KENTE_COLORS.cream, margin: 0 }}>King<span style={{ color: KENTE_COLORS.gold }}>Square</span></h1>
          </div>
          <p style={{ fontSize: 10, color: `${KENTE_COLORS.cream}50`, margin: 0, letterSpacing: 1, textTransform: "uppercase" }}>Wellness for Kings</p>
        </div>
      </header>
      <div id="main-content">
        {screen === "home" && <HomeScreen />}
        {screen === "health" && <HealthScreen />}
        {screen === "food" && <FoodScreen />}
        {screen === "plan" && <MealPlanScreen />}
        {screen === "exercise" && <ExerciseScreen />}
        {screen === "mind" && <MindScreen />}
        {screen === "circle" && <CircleScreen />}
      </div>
      <NavBar active={screen} setActive={setScreen} />
    </div>
  );
}
