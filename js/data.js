/**
 * Yummy Day — 今天吃什麼？
 * 台中一中街商圈 × 逢甲夜市 專屬在地美食資料庫 (共 48 種人氣名店料理)
 * 收錄一中街與逢甲夜市排隊名店，包含：圈粉舖子、私肉羹、50藍、炭烤串燒、酥立蛋餅、The bab韓式、麥味登等！
 */

const FOOD_DATABASE = [
  // ════════════════════════════════════════════════════
  // ─── 一中街夜市 / 一中商圈人氣美食 (Yizhong Street) ───
  // ════════════════════════════════════════════════════
  {
    id: "yc-01",
    name: "圈粉舖子 招牌麻辣酸辣粉",
    category: "一中商圈美食",
    mealType: "麵類",
    price: 130,
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80",
    description: "一中街學生最愛排隊名店！特製紅薯粗粉Q彈爽滑，浸潤在醇香牛骨大湯底中，搭配酸豆角、油炸花生粒與秘製油潑辣子，酸爽開胃、麻香撲鼻！",
    moods: ["stressed", "bored", "happy"],
    moodReason: "又酸又麻又辣的濃郁紅薯粉，熱汗直流，瞬間大快人心、掃除所有壓力！"
  },
  {
    id: "yc-02",
    name: "私肉羹 經典香菇肉羹麵",
    category: "一中商圈美食",
    mealType: "麵類",
    price: 75,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    description: "一中商圈數十年老字號傳奇！純手工現打赤肉羹扎實彈牙，甘甜筍絲與大朵香菇慢火熬煮濃稠羹湯，淋上一匙烏醋與特調辣醬，百吃不厭的銅板美味。",
    moods: ["tired", "sad", "happy"],
    moodReason: "熱騰騰濃稠甘甜的古早味肉羹湯，裹著彈牙赤肉，一口撫平整天奔波的飢餓與疲勞 ♡"
  },
  {
    id: "yc-03",
    name: "50藍 1號四季春珍波椰",
    category: "排隊特調手搖",
    mealType: "飲料",
    price: 55,
    image: "https://images.unsplash.com/photo-1558857563-b37cfb8cb679?auto=format&fit=crop&w=600&q=80",
    description: "全台學生人手一杯的國民手搖神話！高山四季春茶清香回甘，加入軟Q波霸、晶瑩小珍珠與脆甜椰果，嚼感爆棚、清爽消暑第一名！",
    moods: ["happy", "bored", "blessed"],
    moodReason: "滿杯四季春茶香加上珍波椰的三重咀嚼快感，嘴饞無聊時最好的解悶夥伴！"
  },
  {
    id: "yc-04",
    name: "酥立蛋餅 雙起司肉鬆蛋餅",
    category: "一中商圈美食",
    mealType: "蛋餅輕食",
    price: 65,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    description: "一中街現點現煎的傳奇酥脆蛋餅！層層起酥的外皮酥到掉渣，夾入牽絲雙色莫札瑞拉起司與滿滿古早味海苔肉鬆，外酥內嫩口感驚艷。",
    moods: ["happy", "tired", "blessed"],
    moodReason: "卡滋卡滋無比酥脆的餅皮裹著牽絲濃郁起司，早午餐或下午茶咬下一口，心情原地放晴！"
  },
  {
    id: "yc-05",
    name: "The bab 韓式中友一中店 烤五花拌飯定食",
    category: "異國人氣名店",
    mealType: "飯類",
    price: 210,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80",
    description: "中友百貨與一中街交界超人氣韓系餐館！鐵盤焦香厚切豬五花搭配多色道地韓式泡菜、黃豆芽與半熟太陽蛋，淋入特調韓式甜辣醬拌出滿滿鍋香！",
    moods: ["happy", "stressed", "tired"],
    moodReason: "紅潤甜辣的韓式五花肉與拌飯，視覺味覺雙重滿足，讓你在台中一秒沉浸首爾美味！"
  },
  {
    id: "yc-06",
    name: "麥味登 MWD 鐵板麵咔啦雞腿套餐",
    category: "一中商圈美食",
    mealType: "蛋餅輕食",
    price: 125,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "大學生日常最親切溫馨的早午餐守護神！香辣濃郁黑胡椒鐵板麵拌半熟荷包蛋，搭配炸至金黃多汁的厚切咔啦雞腿排與冰紅茶，份量誠意十足！",
    moods: ["tired", "happy", "sad"],
    moodReason: "熱騰騰滋滋作響的鐵板麵加上爆汁炸雞，給努力讀書考試的自己最充實的能量加持！"
  },
  {
    id: "yc-07",
    name: "一中街胖子雞丁 招牌香酥三角骨拼盤",
    category: "一中商圈美食",
    mealType: "炸物",
    price: 110,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    description: "一中街排隊老店代表！獨家醬汁醃製入味的去骨雞丁與酥炸三角骨，外皮薄脆肉質鮮嫩爆汁，撒上特調胡椒鹽與九層塔，越啃越香超涮嘴！",
    moods: ["stressed", "happy", "bored"],
    moodReason: "薄脆香酥的炸雞丁，下課後手抓一包邊逛街邊吃，是消滅壓力的最爽消夜！"
  },
  {
    id: "yc-08",
    name: "一中街上和園滷味 特製雞爪凍與香滷豆干",
    category: "一中商圈美食",
    mealType: "蛋餅輕食",
    price: 80,
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
    description: "東海蓮心冰雞爪凍一中唯一直營老牌！慢火熬煮的濃郁中藥滷汁凝結成膠質凍，冰涼入口骨肉分離，搭配多汁千層豆干，台中必買伴手禮美味。",
    moods: ["happy", "bored"],
    moodReason: "冰涼Q彈的膠質雞爪凍與滷豆干，看劇聊天的最佳良伴，滿嘴膠原蛋白好幸福！"
  },
  {
    id: "yc-09",
    name: "一中街21臭豆腐 現炸特製黃金泡菜臭豆腐",
    category: "一中商圈美食",
    mealType: "蛋餅輕食",
    price: 65,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    description: "一中街排隊永遠看不見盡頭的臭豆腐傳奇！大塊方豆腐高溫炸得外皮金黃酥脆如餅乾、內豆腐吸飽蒜香醬汁軟嫩如布丁，塞入爽口酸甜台式泡菜絕配！",
    moods: ["stressed", "happy"],
    moodReason: "外皮超酥脆咬下爆漿，蒜香與泡菜的酸甜在舌尖爆炸，讓人欲罷不能！"
  },
  {
    id: "yc-10",
    name: "一中街一中豐仁冰 招牌酸梅冰粒配蜜花豆冰淇淋",
    category: "甜蜜甜品冰品",
    mealType: "甜點",
    price: 50,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    description: "創立七十年的台中傳奇冰品！酸甜爽口的天然酸梅剉冰，鋪上細火慢熬的綿密蜜花豆，頂部加一球古早味香草手工冰淇淋，鹹甜酸香層次豐富！",
    moods: ["happy", "blessed", "tired"],
    moodReason: "冬天夏天都讓人想念的酸甜酸梅冰與蜜花豆，每一口都是青春記憶裡的甜甜回憶 ♡"
  },
  {
    id: "yc-11",
    name: "一中街打餅舖烙餅 蔥香雙起司培根手工烙餅",
    category: "一中商圈美食",
    mealType: "蛋餅輕食",
    price: 70,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    description: "鐵板現擀現烙的大張手作千層烙餅！拍打至蓬鬆酥脆帶空氣感，包入煎得焦香的培根與融化起司，刷上甜辣醬或蒜蓉醬，香氣四溢。",
    moods: ["happy", "tired"],
    moodReason: "千層拍餅酥軟交疊的麵香，熱騰騰捧在手心，是下課最棒的溫暖補給！"
  },
  {
    id: "yc-12",
    name: "一中街王印乾麵 麻辣牛肉乾麵佐特製紅油",
    category: "一中商圈美食",
    mealType: "麵類",
    price: 85,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80",
    description: "一中街學生無人不知的麻辣乾麵！自製厚切牛腱肉片，手工麵條拌入獨門特炒麻辣渣與蔥花，辣勁十足直通腦門，嗜辣者的朝聖聖地！",
    moods: ["stressed", "bored"],
    moodReason: "大口吃下麻辣後勁十足的手工乾麵，刺激神經瞬間清醒，滿血復活！"
  },
  {
    id: "yc-13",
    name: "一中街地獄炒泡麵 起司香辣培根炒泡麵",
    category: "一中商圈美食",
    mealType: "麵類",
    price: 95,
    image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=600&q=80",
    description: "夜貓子與宵夜族群的熱門名單！Q彈泡麵在鐵板上與韓式辣醬、脆培根、洋蔥大火快炒，出鍋鋪上一整片金黃融化起司片，罪惡感爆表。",
    moods: ["stressed", "sad", "tired"],
    moodReason: "深夜來一盤濃郁牽絲的起司炒泡麵，碳水化合物帶來的幸福感就是最直接的救贖！"
  },
  {
    id: "yc-14",
    name: "一中街半月燒 豬肉九層塔現擀炸燒餅",
    category: "一中商圈美食",
    mealType: "蛋餅輕食",
    price: 55,
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
    description: "半煎半炸的現擀半月形麵皮，澎鬆酥軟嚼勁十足，包入九層塔大火爆炒的黑胡椒豬肉餡與荷包蛋，香氣撲鼻，經典排隊老店。",
    moods: ["tired", "happy"],
    moodReason: "九層塔與豬肉的熱騰騰鍋氣，咬下瞬間肉汁四溢，平價好滋味！"
  },
  {
    id: "yc-15",
    name: "一中街犬首燒 法鬥造型草莓卡士達鯛魚燒",
    category: "甜蜜甜品冰品",
    mealType: "甜點",
    price: 60,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
    description: "超可愛法鬥犬立體造型蛋糕！外皮烤至金黃微酥，現擠入香濃馬達加斯加香草卡士達餡與當季新鮮草莓，萌度破表、拍照必打卡！",
    moods: ["blessed", "happy"],
    moodReason: "療癒到融化的法鬥造型與爆漿卡士達，可愛到捨不得吃，滿滿少女心盛開 ♡"
  },
  {
    id: "yc-16",
    name: "一中街蜜滋麻美 爆漿黑糖珍珠刨冰鮮奶",
    category: "甜蜜甜品冰品",
    mealType: "甜點",
    price: 75,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    description: "現炒溫熱濃郁黑糖波霸珍珠，鋪在細緻綿密刨冰上，淋滿純濃義美鮮奶與現磨花生粉/芝麻粉，冷熱交織、濃醇不膩口。",
    moods: ["blessed", "sad"],
    moodReason: "溫熱軟Q黑糖珍珠撞上冰涼純鮮奶，冷熱雙重療癒，甜進心坎裡！"
  },
  {
    id: "yc-17",
    name: "一中街艾得咖啡 招牌魔力冰咖啡配雙Q凍",
    category: "排隊特調手搖",
    mealType: "飲料",
    price: 65,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
    description: "一中街特有在地老牌手搖！現萃濃縮咖啡加入獨門特調奶香與自製咖啡凍、雙Q嫩凍，微甜微苦滑順無比，陪伴無數中科大與台中一中學生的回憶。",
    moods: ["tired", "bored"],
    moodReason: "滑順爽口的自製咖啡凍與清涼咖啡因，一口吸到底，下午上課精神百倍！"
  },
  {
    id: "yc-18",
    name: "一中街炭烤大雞排 秘傳蜜汁厚切脆皮大雞排",
    category: "一中商圈美食",
    mealType: "炸物",
    price: 95,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
    description: "先炸後烤的頂級大雞排！金黃酥脆的炸雞排放在炭火上翻烤，刷上數十種香料熬煮的甜鹹蜜汁醬，撒上白芝麻與檸檬汁，肉質厚實多汁。",
    moods: ["happy", "stressed"],
    moodReason: "比臉還大的蜜汁炭烤雞排，撕開外皮熱氣與肉汁湧出，豪邁痛快！"
  },
  {
    id: "yc-19",
    name: "一中街炸蝦天婦羅丼 雙層海老野菜天丼",
    category: "異國人氣名店",
    mealType: "飯類",
    price: 160,
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80",
    description: "金黃羽衣麵衣酥脆輕盈，大尾草蝦鮮甜彈牙，佐以南瓜、香菇與地瓜，淋上甜鹹天丼甘醬與越光米飯，份量實在價格親民。",
    moods: ["happy", "blessed"],
    moodReason: "層層堆疊的金黃酥脆炸蝦，犒賞今天辛苦努力的自己，滿滿成就感！"
  },
  {
    id: "yc-20",
    name: "一中街老牌牛肉麵 半筋半肉紅燒刀削麵",
    category: "一中商圈美食",
    mealType: "麵類",
    price: 170,
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=600&q=80",
    description: "大骨慢燉數小時甘醇濃郁的紅燒牛肉湯，手工刀削麵條嚼勁十足，牛筋軟糯入味、牛腱軟嫩，配上滿滿酸菜與蔥花，暖心美味。",
    moods: ["tired", "sad"],
    moodReason: "熱氣騰騰的香濃牛肉湯，吸飽濃郁湯汁的麵條，暖身更暖心。"
  },
  {
    id: "yc-21",
    name: "一中街日式章魚燒 蜂蜜芥末海苔小丸子",
    category: "一中商圈美食",
    mealType: "蛋餅輕食",
    price: 60,
    image: "https://images.unsplash.com/photo-1554502078-ef0fc409efce?auto=format&fit=crop&w=600&q=80",
    description: "外脆內嫩的大顆章魚燒，包入扎實章魚丁與高麗菜碎，刷上微甜照燒醬、蜂蜜芥末與美乃滋，熱騰騰出爐時柴魚片在上面翩翩起舞。",
    moods: ["bored", "happy"],
    moodReason: "柴魚片跳舞的可愛模樣，微嗆芥末與甘甜美乃滋交織，解悶小點心首選！"
  },
  {
    id: "yc-22",
    name: "一中街泰讚了 泰式手標現沖濃奶茶",
    category: "排隊特調手搖",
    mealType: "飲料",
    price: 70,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    description: "泰國手標紅茶葉現拉現沖，撞上濃純煉乳與淡奶，滿杯碎冰清涼甜醇，亮麗橘紅色澤散發道地曼谷街頭茶香！",
    moods: ["bored", "stressed"],
    moodReason: "濃烈的異國茶香與碎冰爆發力，瞬間抽離枯燥課堂，一秒神遊熱帶曼谷！"
  },
  {
    id: "yc-23",
    name: "一中街大湖草莓大福 爆汁生乳紅豆大福",
    category: "甜蜜甜品冰品",
    mealType: "甜點",
    price: 65,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    description: "薄透軟糯不黏牙的白玉麻糬皮，裹入萬丹手工微甜紅豆泥與北海道十勝生乳餡，咬開整顆當季大湖草莓清甜爆汁，夢幻粉嫩滋味！",
    moods: ["blessed", "sad"],
    moodReason: "咬下爆漿草莓與軟Q大福的瞬間，酸甜交織，給心靈最溫柔的甜蜜撫慰 ♡"
  },
  {
    id: "yc-24",
    name: "一中街阿月紅茶冰 招牌碎冰古早味檸檬紅茶",
    category: "排隊特調手搖",
    mealType: "飲料",
    price: 40,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    description: "一中街歷史最悠久的銅板手搖代表！遵循古法熬煮的決明子紅茶散發焙火焦糖香，加入小碎冰與鮮榨檸檬汁，銅板價大杯解膩第一名！",
    moods: ["tired", "happy"],
    moodReason: "碎冰激爽的古早味紅茶，酸甜解渴，逛街吃炸物最好的去油膩拍檔！"
  },

  // ════════════════════════════════════════════════════
  // ─── 逢甲夜市 / 逢甲商圈人氣美食 (Fengjia Night Market) ───
  // ════════════════════════════════════════════════════
  {
    id: "fc-01",
    name: "逢甲激旨燒鳥 炭烤串燒盛合拼盤",
    category: "逢甲夜市美食",
    mealType: "串燒鍋物",
    price: 180,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
    description: "逢甲夜市殿堂級日式炭烤！培根包小番茄、醬烤牛五花青蔥卷、炭烤麻糬與雞腿肉串，炭火香氣撲鼻，刷上獨門甘甜烤肉醬，逢甲宵夜必吃第一名！",
    moods: ["happy", "stressed", "bored"],
    moodReason: "滋滋作響的炭烤油脂香氣，一口肉串一口暢飲，今晚的狂歡由串燒開始！"
  },
  {
    id: "fc-02",
    name: "逢甲溫家地瓜球 現壓金黃空氣感地瓜球",
    category: "逢甲夜市美食",
    mealType: "甜點",
    price: 50,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    description: "逢甲夜市排隊人潮從沒停過的三十年老攤！大鍋高溫油炸並反覆人工重壓逼出空氣感，外殼薄脆金黃、內餡Q韌有嚼勁，越嚼地瓜甜香越濃郁。",
    moods: ["happy", "bored", "blessed"],
    moodReason: "外酥內Q的彈牙小確幸，一顆接一顆停不下來，逢甲夜市邊走邊吃靈魂美食！"
  },
  {
    id: "fc-03",
    name: "逢甲明倫蛋餅 手工粉漿特調甜辣醬蛋餅",
    category: "逢甲夜市美食",
    mealType: "蛋餅輕食",
    price: 50,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    description: "從彰化紅到逢甲的古早味粉漿蛋餅！現倒特調麵糊攤平成薄透軟Q餅皮，打入鮮雞蛋與大把蔥花，刷上招牌特調微甜微辣甜辣醬，熱氣騰騰軟嫩迷人。",
    moods: ["happy", "tired", "sad"],
    moodReason: "軟嫩微甜的手工粉漿蛋餅，一口咬下蔥香與蛋香四溢，樸實無華的療癒美味 ♡"
  },
  {
    id: "fc-04",
    name: "逢甲官芝霖大腸包小腸 蒜香糯米腸包黑豬肉香腸",
    category: "逢甲夜市美食",
    mealType: "蛋餅輕食",
    price: 75,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    description: "逢甲夜市國際觀光客必吃招牌！炭火烤至外皮微焦酥香的糯米腸切開，夾入爆汁現烤黑豬肉香腸，鋪滿酸菜、小黃瓜絲、蒜頭碎與薑片，層次感極度豐富！",
    moods: ["happy", "bored"],
    moodReason: "炭香糯米腸與多汁香腸的黃金組合，蒜香嗆口酸菜解膩，滿口噴香太過癮！"
  },
  {
    id: "fc-05",
    name: "逢甲一心臭豆腐 金黃酥脆配特製小黃瓜",
    category: "逢甲夜市美食",
    mealType: "蛋餅輕食",
    price: 70,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    description: "逢甲在地老饕一致推薦！炸得酥脆乾爽的臭豆腐中間挖洞，填入新鮮特製脆口小黃瓜絲與台式酸甜高麗菜泡菜，淋上特調蒜蓉醬油，清爽脆口不油膩。",
    moods: ["stressed", "happy"],
    moodReason: "熱騰騰酥脆臭豆腐配冰涼爽脆小黃瓜絲，冰熱交融口感驚艷，一口咬下超舒壓！"
  },
  {
    id: "fc-06",
    name: "逢甲日船章魚小丸子總店 柴魚海苔照燒小丸子",
    category: "逢甲夜市美食",
    mealType: "蛋餅輕食",
    price: 60,
    image: "https://images.unsplash.com/photo-1554502078-ef0fc409efce?auto=format&fit=crop&w=600&q=80",
    description: "全台灣日船章魚燒的起源旗艦總店！現煎金黃焦香大丸子，滾圓飽滿，淋上日式濃醇照燒醬與甜美乃滋，撒上厚厚一層現刨柴魚片，趁熱吃爆漿軟嫩！",
    moods: ["happy", "bored"],
    moodReason: "總店師傅高超手速現烤的章魚丸子，熱氣騰騰柴魚飛舞，夜市散步必備點心！"
  },
  {
    id: "fc-07",
    name: "逢甲小A起司洋芋 雙重起司玉米爆漿烤馬鈴薯",
    category: "逢甲夜市美食",
    mealType: "蛋餅輕食",
    price: 85,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    description: "整顆整粒美國進口馬鈴薯烤至鬆軟綿密，切開中間填入火腿丁、脆甜玉米粒與水煮蛋，最後淋上滿滿一整勺如金黃瀑布般的熱融巧達起司醬，香氣濃郁！",
    moods: ["sad", "blessed"],
    moodReason: "金黃起司瀑布將鬆軟馬鈴薯溫柔包裹，每一口都是滿滿的安全感與甜蜜治癒！"
  },
  {
    id: "fc-08",
    name: "逢甲海邊小屋 蒜香黑胡椒現烤乾燒蛤蜊",
    category: "逢甲夜市美食",
    mealType: "蛋餅輕食",
    price: 120,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    description: "每日產地新鮮直送的大顆活蛤蜊！不加一滴水、直接在鐵板上蓋鍋乾燒燜熟，顆顆飽滿肥美、肉質鮮甜爆汁，底部精華蛤蜊原汁鮮美無比，撒上蒜蓉與黑胡椒絕讚！",
    moods: ["happy", "tired"],
    moodReason: "滿滿新鮮大海的極致鮮甜！大口喝下蛤蜊精華原湯，精力瞬間回滿100%！"
  },
  {
    id: "fc-09",
    name: "逢甲刁民酸菜魚 秘罈酸菜烏鱧魚熱滾鍋",
    category: "串燒鍋物",
    mealType: "串燒鍋物",
    price: 388,
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80",
    description: "比臉盆還大的霸氣酸菜魚排隊神店！自製老譚酸菜大火爆炒，滑嫩無刺鮮美烏鱧魚片浸潤在酸香麻辣的熱滾高湯中，上桌前淋上滾燙熱油激發花椒與乾辣椒香氣！",
    moods: ["stressed", "happy", "bored"],
    moodReason: "「酸菜比魚更好吃！」麻辣鮮香的沸騰紅湯，大口吸粉吃魚，汗水與壓力一次宣洩光！"
  },
  {
    id: "fc-10",
    name: "逢甲赤鬼炙燒牛排 酥皮濃湯炙燒沙朗牛排定食",
    category: "異國人氣名店",
    mealType: "飯類",
    price: 340,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
    description: "逢甲夜市地標級日式炙燒牛排館！鐵板高溫炙烤五分熟特選沙朗牛排，肉香四溢肉汁橫流，搭配鐵板麵與太陽蛋，附贈招牌螺旋酥皮玉米濃湯，學生大餐首選！",
    moods: ["happy", "blessed"],
    moodReason: "大口吃肉的尊爵盛宴，酥皮濃湯的濃濃奶香，慶祝考試結束與週末狂歡的最佳拍檔！"
  },
  {
    id: "fc-11",
    name: "逢甲養機場 經典香蒜辣味白酒蛤蜊義大利麵",
    category: "異國人氣名店",
    mealType: "麵類",
    price: 210,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80",
    description: "逢甲大學周邊數十年超人氣溫馨義大利麵館！滿滿二十顆鮮甜大蛤蜊環繞盤緣，蒜末、辣椒與白葡萄酒大火收汁入味，份量豪邁、CP值超高！",
    moods: ["happy", "bored"],
    moodReason: "蒜香與白酒的優雅香氣，滿盤鮮蛤蜊吸飽湯汁，聚餐約會最甜蜜的美食據點！"
  },
  {
    id: "fc-12",
    name: "逢甲朴大哥的韓式炸雞 招牌甜辣紅醬無骨炸雞",
    category: "異國人氣名店",
    mealType: "炸物",
    price: 260,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
    description: "全台第一間道地韓式炸雞名店！去骨雞腿肉炸至極致金黃酥脆，均勻裹上韓國進口甜辣紅醬，撒上白芝麻，配上酸爽醃白蘿蔔，追劇宵夜絕配！",
    moods: ["stressed", "happy", "bored"],
    moodReason: "甜辣濃郁的韓式紅醬炸雞，手抓一塊咬下爆汁，把生活所有的煩惱全部拋開！"
  },
  {
    id: "fc-13",
    name: "逢甲黃金左右腿 酥炸轟炸雞腿排佐雙色塔塔醬",
    category: "逢甲夜市美食",
    mealType: "炸物",
    price: 95,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80",
    description: "逢甲夜市獨創雙品牌名物！去骨厚切鮮嫩雞腿排裹特製粉漿現炸，外皮卡滋酥脆、肉汁滿溢，淋上特調義大利香草塔塔醬與切達起司醬，大口咬下超滿足！",
    moods: ["happy", "stressed"],
    moodReason: "厚實多汁的現炸無骨雞腿排，香濃塔塔醬完美中和油脂，解饞舒壓第一棒！"
  },
  {
    id: "fc-14",
    name: "逢甲黑輪美 懷舊香炸黑輪沾甜橙特製醬",
    category: "逢甲夜市美食",
    mealType: "蛋餅輕食",
    price: 65,
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80",
    description: "文青風台式炸黑輪專賣店！古早味旗魚黑輪、米血與甜不辣炸得微焦酥脆，淋上特調黃金甜橙醬汁與黑胡椒醬，甜鹹甘醇、清爽不油膩。",
    moods: ["bored", "happy"],
    moodReason: "酥脆Q彈的炸黑輪配上特調清香甜橙醬，顛覆傳統的台味小點心驚喜！"
  },
  {
    id: "fc-15",
    name: "逢甲紅髮斑斑 法式香脆可可千層蝴蝶酥",
    category: "甜蜜甜品冰品",
    mealType: "甜點",
    price: 290,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=600&q=80",
    description: "逢甲夜市排隊烘焙奇蹟！純天然發酵奶油與法芙娜頂級可可粉反覆折疊千層烘烤，愛心蝴蝶造型薄脆輕盈、入口化開，濃醇苦甜可可香氣久久不散。",
    moods: ["blessed", "happy"],
    moodReason: "薄脆千層在齒間酥化開來的極致享受，配上一杯手沖咖啡，貴婦般的午後時光 ♡"
  },
  {
    id: "fc-16",
    name: "逢甲短腿阿鹿餅乾 現烤入口即化濃郁可可曲奇",
    category: "甜蜜甜品冰品",
    mealType: "甜點",
    price: 320,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    description: "逢甲店限定可可風味！每天新鮮出爐香氣飄散整條街，不加一滴水的純手工曲奇餅乾，放入口中舌尖溫度一碰就細膩化開，苦甜濃郁令人驚豔。",
    moods: ["blessed", "sad"],
    moodReason: "放進嘴裡瞬間化開的可可魔法，濃密絲滑的巧克力滋味融化心底所有的孤單憂傷。"
  },
  {
    id: "fc-17",
    name: "逢甲大甲芋頭城 蜜芋頭綜合芋圓地瓜圓刨冰",
    category: "甜蜜甜品冰品",
    mealType: "甜點",
    price: 65,
    image: "https://images.unsplash.com/photo-1558857563-b37cfb8cb679?auto=format&fit=crop&w=600&q=80",
    description: "大甲在地芋頭每日新鮮現熬！芋頭塊綿密香甜入口即化，搭配現煮Q彈手工芋圓、地瓜圓與紅豆珍珠，淋上濃郁芋頭泥與煉乳刨冰，芋頭控的天堂！",
    moods: ["happy", "blessed", "tired"],
    moodReason: "香濃綿密的蜜芋頭與Q彈雙圓，嚼出滿滿天然香氣，撫慰疲累心靈的甜蜜聖品！"
  },
  {
    id: "fc-18",
    name: "逢甲御品元冰火湯圓 桂花檸檬刨冰佐現煮花生芝麻湯圓",
    category: "甜蜜甜品冰品",
    mealType: "甜點",
    price: 90,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    description: "米其林必比登推薦名牌！剛出鍋滾燙爆漿的手工花生與芝麻湯圓，鋪在淋滿自釀桂花蜜與檸檬汁的細雪刨冰上，冰熱交融、軟糯香甜中帶著芬芳花香！",
    moods: ["blessed", "happy"],
    moodReason: "熱騰騰流心湯圓配上冰涼清雅桂花檸檬雪冰，冰火奇景融化在舌尖，幸福感爆棚！"
  },
  {
    id: "fc-19",
    name: "逢甲甲文青 文青手搖半熟檸檬青茶",
    category: "排隊特調手搖",
    mealType: "飲料",
    price: 60,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    description: "逢甲文青手搖扛霸子！嚴選屏東九如綠檸檬鮮榨原汁，撞上南投半熟烘焙青茶，果香微酸明亮、茶韻清爽回甘，夜市吃大餐的最佳解膩神器。",
    moods: ["tired", "bored"],
    moodReason: "鮮榨檸檬的明亮酸香與青茶的回甘清韻，大口喝下超清醒，滿血恢復元氣活力！"
  },
  {
    id: "fc-20",
    name: "逢甲尊品牛肉麵 濃郁牛骨紅燒牛肉乾拌麵",
    category: "逢甲夜市美食",
    mealType: "麵類",
    price: 160,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80",
    description: "逢甲在地三十年老字號！厚切牛腱心肉質軟嫩帶筋，手工細拉麵吸飽特調牛油蔥花醬汁，附上一碗甘醇牛大骨原湯，扎實誠懇的古早家常味。",
    moods: ["tired", "happy"],
    moodReason: "牛油香氣繚繞的熱拌麵條與軟嫩牛腱，大口吃光飽足感滿點，重獲滿滿元氣！"
  },
  {
    id: "fc-21",
    name: "逢甲傻瓜麵 傳奇古早味烏醋辣渣乾拌麵",
    category: "逢甲夜市美食",
    mealType: "麵類",
    price: 55,
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80",
    description: "「傻瓜才吃傻瓜麵，聰明人都會自己加醬！」純手工白麵鋪滿青蔥，由客人依喜好自己加入特釀烏醋、辣油與香辣渣，看似簡單卻百吃不厭的逢甲學子神話！",
    moods: ["bored", "happy", "tired"],
    moodReason: "自己動手調製烏醋與辣渣比例，酸香麻辣的古早滋味，解悶又開胃！"
  },
  {
    id: "fc-22",
    name: "逢甲匈牙利煙囪捲 焦糖肉桂香草卡士達煙囪捲",
    category: "甜蜜甜品冰品",
    mealType: "甜點",
    price: 110,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    description: "中歐傳統道地街頭點心！特製螺旋麵包在旋轉烤爐上慢烤至外皮焦脆焦糖化，撒上溫暖肉桂糖粉，中空管內擠滿冰涼香草卡士達生乳，外酥內軟超驚艷！",
    moods: ["bored", "blessed"],
    moodReason: "肉桂與焦糖烘烤的溫暖香氣，中歐街頭童話般的螺旋煙囪捲，帶你一秒到歐洲度假！"
  },
  {
    id: "fc-23",
    name: "逢甲惡魔狂暴雞排 厚切爆汁蒜香脆皮大雞排",
    category: "逢甲夜市美食",
    mealType: "炸物",
    price: 100,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    description: "厚度超過兩公分的巨無霸爆汁雞排！堅持不打薄拍平，純肉厚炸鎖住滿滿肉汁，外皮金黃卡滋酥脆，撒上狂暴椒鹽與現磨蒜粉，肉控的終極天堂！",
    moods: ["stressed", "happy"],
    moodReason: "狂暴厚切大雞排撕開爆肉汁的痛快感，香氣逼人，把所有的壓力一口口咬碎吞下！"
  },
  {
    id: "fc-24",
    name: "逢甲草莓生乳波士頓派 當季大湖草莓切片蛋糕",
    category: "甜蜜甜品冰品",
    mealType: "甜點",
    price: 120,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
    description: "蓬鬆柔軟如雲朵的黃金戚風蛋糕體，夾入北海道十勝純生鮮奶油與滿滿新鮮大湖草莓切片，表面撒上一層薄薄細白糖粉，酸甜清爽、幸福感滿溢！",
    moods: ["blessed", "happy", "sad"],
    moodReason: "雲朵戚風與草莓生乳的輕盈口感，像初戀般純真美好的滋味，甜心女孩的最愛 ♡"
  }
];

// 心情字典定義 (供心情功能與卡片標籤使用)
const MOOD_DICT = {
  happy: {
    label: "開心",
    emoji: "😄",
    badgeClass: "badge-happy",
    tagline: "想吃點特別的！",
    description: "今天心情超好！值得用一中街與逢甲夜市最奢華的名店美食好好犒賞自己！"
  },
  sad: {
    label: "難過",
    emoji: "🥺",
    badgeClass: "badge-sad",
    tagline: "需要療癒系美食",
    description: "抱抱你，熱騰騰的私肉羹、溫暖蛋餅與香甜草莓冰品會溫柔包裹你的心靈 ♡"
  },
  tired: {
    label: "疲倦",
    emoji: "🥱",
    badgeClass: "badge-tired",
    tagline: "想補充能量",
    description: "下課下班辛苦了！用麥味登大份量鐵板麵、牛肉麵與爆汁大雞排為身體重新充電！"
  },
  stressed: {
    label: "壓力大",
    emoji: "😫",
    badgeClass: "badge-stressed",
    tagline: "想吃點舒壓的",
    description: "圈粉舖子酸辣粉、刁民酸菜魚與激旨炭烤串燒！讓麻辣酥脆幫你大聲吶喊宣洩！"
  },
  bored: {
    label: "無聊",
    emoji: "🙃",
    badgeClass: "badge-bored",
    tagline: "想嘗試新口味",
    description: "日復一日好平淡？來杯50藍珍波椰、試試匈牙利煙囪捲與黑輪美打破枯燥吧！"
  },
  blessed: {
    label: "幸福",
    emoji: "🥰",
    badgeClass: "badge-blessed",
    tagline: "想吃甜甜的食物",
    description: "草莓大福、短腿阿鹿曲奇、冰火湯圓與舒芙蕾！幸福感原地盛開！"
  }
};

// 預算級距定義 (新台幣 TWD)
const BUDGET_TIERS = [
  { id: "all", label: "不限預算", min: 0, max: Infinity },
  { id: "tier1", label: "100 元以下", min: 0, max: 100 },
  { id: "tier2", label: "101～200 元", min: 101, max: 200 },
  { id: "tier3", label: "201～300 元", min: 201, max: 300 },
  { id: "tier4", label: "301 元以上", min: 301, max: Infinity }
];

// 餐點類型清單 (對應在地夜市街頭美食型態)
const MEAL_TYPES = ["全部類型", "飯類", "麵類", "炸物", "串燒鍋物", "蛋餅輕食", "甜點", "飲料"];

// 商圈美食類別清單
const CATEGORIES = ["全部料理", "一中商圈美食", "逢甲夜市美食", "異國人氣名店", "甜蜜甜品冰品", "排隊特調手搖"];
