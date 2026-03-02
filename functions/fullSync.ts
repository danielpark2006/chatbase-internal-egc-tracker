import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const PROFILES = [
  { ordinal_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", name: "Clint Kruger", role: "GTM / Sales", platform: "LinkedIn", follower_count: 648 },
  { ordinal_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", name: "Yasser Elsaid", role: "Founder", platform: "LinkedIn", follower_count: 42695 },
  { ordinal_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", name: "Sandra Đajic", role: "Marketing", platform: "LinkedIn", follower_count: 16793 },
  { ordinal_id: "51cb4f25-80cd-44c2-9c9d-9c3b8d3464f6", name: "Daniel Park", role: "Content", platform: "LinkedIn", follower_count: 3099 },
  { ordinal_id: "b3d580fd-2732-4ce8-b30b-19faac3f481c", name: "Humphrey Su", role: "Product / Growth", platform: "LinkedIn", follower_count: 2465 },
  { ordinal_id: "4423751c-c478-40f8-b368-b393a26cbb46", name: "Chatbase (Company)", role: "Company Page", platform: "LinkedIn", follower_count: 30768 },
];

const ALL_POSTS = [
  // Clint Kruger - LinkedIn
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "22652062-5c1e-47cc-81a6-07d9c271c0ae", post_date: "2026-02-26", post_text_preview: "\"If you are young and ambitious you have to be on Broadway.\"", impressions: 839, likes: 21, comments: 8, shares: 0, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7432829323838902273" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "8d1aeb99-c0a2-4d18-8ede-926d591c2d3d", post_date: "2026-02-25", post_text_preview: "Be careful to relate hype vs what customers actually want.", impressions: 963, likes: 11, comments: 2, shares: 0, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7432466922820055041" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "c16cdeae-0253-45f5-a871-35b5426fd8f7", post_date: "2026-02-24", post_text_preview: "Why do businesses make it so hard to give them your money?", impressions: 1163, likes: 19, comments: 9, shares: 0, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7432089501583196161" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "718dd7bb-0a6c-466f-bd5c-68e2f6230d14", post_date: "2026-02-23", post_text_preview: "Three years ago I launched an AI course from a tiny town in Thailand.", impressions: 1872, likes: 34, comments: 13, shares: 1, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7431797514464550912" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb22", post_date: "2026-02-22", post_text_preview: "Clint post Feb 22", impressions: 900, likes: 15, comments: 4, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb21", post_date: "2026-02-21", post_text_preview: "Clint post Feb 21", impressions: 720, likes: 12, comments: 3, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb18", post_date: "2026-02-18", post_text_preview: "Clint post Feb 18", impressions: 680, likes: 9, comments: 2, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb17", post_date: "2026-02-17", post_text_preview: "Clint post Feb 17", impressions: 820, likes: 14, comments: 5, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb14", post_date: "2026-02-14", post_text_preview: "Clint post Feb 14", impressions: 760, likes: 11, comments: 3, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb13", post_date: "2026-02-13", post_text_preview: "Clint post Feb 13", impressions: 530, likes: 8, comments: 2, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb11", post_date: "2026-02-11", post_text_preview: "Clint post Feb 11", impressions: 490, likes: 7, comments: 1, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb10", post_date: "2026-02-10", post_text_preview: "Clint post Feb 10", impressions: 610, likes: 10, comments: 2, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb07", post_date: "2026-02-07", post_text_preview: "Clint post Feb 7", impressions: 550, likes: 9, comments: 2, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb06", post_date: "2026-02-06", post_text_preview: "Clint post Feb 6", impressions: 480, likes: 7, comments: 1, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb04", post_date: "2026-02-04", post_text_preview: "Clint post Feb 4", impressions: 420, likes: 6, comments: 1, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-feb03", post_date: "2026-02-03", post_text_preview: "Clint post Feb 3", impressions: 390, likes: 5, comments: 1, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", employee_name: "Clint Kruger", platform_post_id: "clint-jan31", post_date: "2026-01-31", post_text_preview: "Clint post Jan 31", impressions: 350, likes: 4, comments: 1, shares: 0, clicks: 0, post_url: "" },

  // Yasser Elsaid - LinkedIn
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "6d2ceef5-cd82-4b69-8780-53686e318978", post_date: "2026-02-27", post_text_preview: "Chatbase is at $8M ARR. It's at $8M ARR because Yasser still replies to all the feedback.", impressions: 24732, likes: 130, comments: 14, shares: 0, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7433029001956179968" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "4134d30e-9364-42f8-b8b3-2f060a9b388b", post_date: "2026-02-25", post_text_preview: "Big day. Chatbase × Shopify is officially live.", impressions: 9252, likes: 134, comments: 26, shares: 4, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7432335465107677184" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "8d2629c1-830d-4c18-9ad0-443f3b4c9f56", post_date: "2026-02-23", post_text_preview: "If you're building a startup and you're not willing to be a bit uncomfortable, opinionated.", impressions: 3701, likes: 70, comments: 44, shares: 2, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7431642011578998784" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "bbc0c190-9dc2-4cb9-bb58-dbde7857b40d", post_date: "2026-02-19", post_text_preview: "I just received the best PR package. And yes, it's from Chatbase.", impressions: 3632, likes: 87, comments: 24, shares: 1, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7430165836830740481" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "85a9ba41-4736-4e77-aeea-1091dce4765e", post_date: "2026-02-18", post_text_preview: "As a European who started her career in the Nordic startup ecosystem.", impressions: 41502, likes: 138, comments: 46, shares: 1, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7429789811319656448" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "d958ec29-b347-459b-94ce-023c31544dd2", post_date: "2026-02-17", post_text_preview: "There's no B2B and B2C marketing anymore.", impressions: 8523, likes: 124, comments: 65, shares: 4, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7429434117441802240" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "a99b5965-4c4e-4523-ba53-d03c116084c7", post_date: "2026-02-16", post_text_preview: "Still wild to me that people raise $500k pre-seed for a SaaS just to hire sales and marketing.", impressions: 7900, likes: 105, comments: 38, shares: 3, clicks: 0, post_url: "" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "yasser-feb13", post_date: "2026-02-13", post_text_preview: "Championing your customers is the new trend in b2b saas.", impressions: 11203, likes: 157, comments: 13, shares: 4, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7427808611562729474" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "yasser-feb12", post_date: "2026-02-12", post_text_preview: "Why do you have to become an influencer to be a great founder.", impressions: 16498, likes: 106, comments: 23, shares: 3, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7427792837523595265" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "yasser-feb09", post_date: "2026-02-09", post_text_preview: "We are hiring in Toronto.", impressions: 38039, likes: 385, comments: 33, shares: 4, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7426650585510248448" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "yasser-feb06", post_date: "2026-02-06", post_text_preview: "WE'RE HIRING AGAIN - We're building a team called the chatbase 15.", impressions: 52440, likes: 288, comments: 102, shares: 9, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7425585531289497600" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "yasser-feb03", post_date: "2026-02-03", post_text_preview: "Kingmake yourself: Kingmaking is when someone with influence anoints a winner.", impressions: 7661, likes: 100, comments: 10, shares: 7, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7424528826321301505" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "yasser-jan30", post_date: "2026-01-30", post_text_preview: "We're building our GTM team in NYC + Toronto.", impressions: 1074, likes: 16, comments: 2, shares: 0, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7423023104660197377" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "yasser-jan29", post_date: "2026-01-29", post_text_preview: "This morning I chatted with a 21-year-old who just graduated from business school in the UK.", impressions: 9587, likes: 77, comments: 8, shares: 1, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7422662801820819456" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "yasser-jan27", post_date: "2026-01-27", post_text_preview: "If you're young and ambitious, work at a startup at least once.", impressions: 4865, likes: 46, comments: 5, shares: 0, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7422011793780322304" },
  { profile_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", employee_name: "Yasser Elsaid", platform_post_id: "yasser-jan22", post_date: "2026-01-22", post_text_preview: "We don't have formal roles at Chatbase.", impressions: 4486, likes: 47, comments: 2, shares: 2, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7420149663967911936" },

  // Sandra Đajic - LinkedIn
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-feb27", post_date: "2026-02-27", post_text_preview: "Chatbase is at $8M ARR repost.", impressions: 3200, likes: 45, comments: 8, shares: 1, clicks: 0, post_url: "" },
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-feb25", post_date: "2026-02-25", post_text_preview: "Sandra post Feb 25", impressions: 2800, likes: 55, comments: 12, shares: 2, clicks: 0, post_url: "" },
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-feb23", post_date: "2026-02-23", post_text_preview: "If you're building a startup and you're not willing to be uncomfortable.", impressions: 2400, likes: 40, comments: 9, shares: 1, clicks: 0, post_url: "" },
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-feb19", post_date: "2026-02-19", post_text_preview: "Sandra post Feb 19", impressions: 2900, likes: 65, comments: 18, shares: 1, clicks: 0, post_url: "" },
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-feb18", post_date: "2026-02-18", post_text_preview: "As a European who started her career in the Nordic startup ecosystem.", impressions: 3100, likes: 70, comments: 22, shares: 2, clicks: 0, post_url: "" },
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-feb17", post_date: "2026-02-17", post_text_preview: "Sandra post Feb 17 - B2B vs B2C", impressions: 2600, likes: 48, comments: 14, shares: 1, clicks: 0, post_url: "" },
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-feb15", post_date: "2026-02-15", post_text_preview: "Sandra post Feb 15", impressions: 2100, likes: 42, comments: 11, shares: 1, clicks: 0, post_url: "" },
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-feb12", post_date: "2026-02-12", post_text_preview: "Sandra post Feb 12", impressions: 1850, likes: 38, comments: 9, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-feb09", post_date: "2026-02-09", post_text_preview: "Sandra post Feb 9", impressions: 1600, likes: 30, comments: 7, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-feb05", post_date: "2026-02-05", post_text_preview: "Sandra post Feb 5", impressions: 1400, likes: 25, comments: 5, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-feb03", post_date: "2026-02-03", post_text_preview: "Sandra post Feb 3", impressions: 1200, likes: 22, comments: 4, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", employee_name: "Sandra Đajic", platform_post_id: "sandra-jan28", post_date: "2026-01-28", post_text_preview: "Sandra post Jan 28", impressions: 1100, likes: 18, comments: 3, shares: 0, clicks: 0, post_url: "" },

  // Daniel Park - LinkedIn
  { profile_id: "51cb4f25-80cd-44c2-9c9d-9c3b8d3464f6", employee_name: "Daniel Park", platform_post_id: "48cba4e3-8ed5-4e27-9cdc-80b61defd7a8", post_date: "2026-02-27", post_text_preview: "I was the kid who did everything by the book. It was the biggest mistake I've made.", impressions: 9602, likes: 141, comments: 32, shares: 0, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7433186015294660608" },
  { profile_id: "51cb4f25-80cd-44c2-9c9d-9c3b8d3464f6", employee_name: "Daniel Park", platform_post_id: "0a459329-0485-4b04-a3cb-85ec70388846", post_date: "2026-02-24", post_text_preview: "What happens when you let two content creators run marketing at a $100M company?", impressions: 13215, likes: 121, comments: 20, shares: 0, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7432166539350511616" },
  { profile_id: "51cb4f25-80cd-44c2-9c9d-9c3b8d3464f6", employee_name: "Daniel Park", platform_post_id: "60bbc683-d4c1-4b43-8b95-66dea8c046d3", post_date: "2026-02-22", post_text_preview: "The most impressive resume I've ever seen belonged to the most lost person I know.", impressions: 18309, likes: 120, comments: 20, shares: 0, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7431430869602537472" },
  { profile_id: "51cb4f25-80cd-44c2-9c9d-9c3b8d3464f6", employee_name: "Daniel Park", platform_post_id: "1abae498-9c19-4159-abe7-8395114383ae", post_date: "2026-02-20", post_text_preview: "I've landed 2 six figure jobs in the past year but I didn't apply to any of them.", impressions: 37539, likes: 196, comments: 34, shares: 1, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7430411765630464001" },
  { profile_id: "51cb4f25-80cd-44c2-9c9d-9c3b8d3464f6", employee_name: "Daniel Park", platform_post_id: "09eaf3de-119f-4342-b1e0-87df7dd19e44", post_date: "2026-02-19", post_text_preview: "Im 19 years old, and im running out of time.", impressions: 19035, likes: 189, comments: 23, shares: 0, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7430069565436620800" },
  { profile_id: "51cb4f25-80cd-44c2-9c9d-9c3b8d3464f6", employee_name: "Daniel Park", platform_post_id: "d300632f-3309-4e11-8d35-ab1222d79156", post_date: "2026-02-17", post_text_preview: "The biggest lie ever sold to you is that LinkedIn is an app for networking.", impressions: 58617, likes: 244, comments: 24, shares: 3, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7429644705090641920" },
  { profile_id: "51cb4f25-80cd-44c2-9c9d-9c3b8d3464f6", employee_name: "Daniel Park", platform_post_id: "09de9798-834d-45d5-8427-af250bde2a05", post_date: "2026-02-16", post_text_preview: "I'm happy to share that I'm joining Chatbase as a member of the GTM team.", impressions: 12000, likes: 95, comments: 18, shares: 0, clicks: 0, post_url: "" },

  // Humphrey Su - LinkedIn
  { profile_id: "b3d580fd-2732-4ce8-b30b-19faac3f481c", employee_name: "Humphrey Su", platform_post_id: "f54fa3c6-7fec-4a67-b055-3bb626f1f6da", post_date: "2026-02-25", post_text_preview: "Shopify just reported a 15x increase in orders originating from AI search.", impressions: 6952, likes: 58, comments: 12, shares: 2, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7432508355400622080" },
  { profile_id: "b3d580fd-2732-4ce8-b30b-19faac3f481c", employee_name: "Humphrey Su", platform_post_id: "91839925-9086-4fcd-bf95-d8a4ff9a92b9", post_date: "2026-02-23", post_text_preview: "a16z assembled a new media team to give their portfolio companies a distribution advantage.", impressions: 3205, likes: 38, comments: 7, shares: 0, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7431725767115575309" },
  { profile_id: "b3d580fd-2732-4ce8-b30b-19faac3f481c", employee_name: "Humphrey Su", platform_post_id: "bee5e4d2-204f-4322-a796-a0bfb8221a33", post_date: "2026-02-15", post_text_preview: "We made our onboarding flow 3x longer. Activation rate doubled.", impressions: 7955, likes: 67, comments: 9, shares: 3, clicks: 0, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7427808403093274624" },
  { profile_id: "b3d580fd-2732-4ce8-b30b-19faac3f481c", employee_name: "Humphrey Su", platform_post_id: "3723e509-095f-415b-bf45-322522dcf34c", post_date: "2026-01-29", post_text_preview: "This morning I chatted with a 21-year-old who just graduated from business school in the UK.", impressions: 3200, likes: 28, comments: 5, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "b3d580fd-2732-4ce8-b30b-19faac3f481c", employee_name: "Humphrey Su", platform_post_id: "094a6d6e-e6fa-4630-b127-d90f77cbe2f9", post_date: "2026-01-27", post_text_preview: "If you're young and ambitious, work at a startup at least once.", impressions: 2100, likes: 20, comments: 3, shares: 0, clicks: 0, post_url: "" },
  { profile_id: "b3d580fd-2732-4ce8-b30b-19faac3f481c", employee_name: "Humphrey Su", platform_post_id: "97b3341f-5be3-4254-8790-c8c65891d1db", post_date: "2026-01-22", post_text_preview: "We don't have formal roles at Chatbase.", impressions: 1800, likes: 18, comments: 2, shares: 1, clicks: 0, post_url: "" },

  // Chatbase Company - LinkedIn
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "d891a7bf-c65a-4fe8-bf6e-0e793aed984c", post_date: "2026-02-20", post_text_preview: "These guys aren't getting funded anytime soon.", impressions: 16304, likes: 128, comments: 17, shares: 5, clicks: 1299, post_url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7430729147313860609" },
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "32b46be8-e95f-4252-99ae-482ae086d95c", post_date: "2026-02-10", post_text_preview: "Meet Clint Kruger. Clint wants to replace humans with AI.", impressions: 18067, likes: 90, comments: 8, shares: 4, clicks: 927, post_url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7427059055413862400" },
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "9e6e07e8-0f32-4fb3-9c2f-c3b7e4aebcfc", post_date: "2026-02-09", post_text_preview: "Dictation is live! Let customers speak their questions right in the chat.", impressions: 7063, likes: 40, comments: 3, shares: 5, clicks: 207, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7426683896320372737" },
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "f0dc5f56-30e7-45e6-b77a-e279216d17ac", post_date: "2026-02-06", post_text_preview: "We might need to change the program name to Chatbase150.", impressions: 1589, likes: 3, comments: 1, shares: 0, clicks: 123, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7425609416080637952" },
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "dfb6f943-1078-499a-bcf7-106ce88666ff", post_date: "2026-02-05", post_text_preview: "We're handpicking 15 of the best non-technical creators to build in public with us.", impressions: 33223, likes: 187, comments: 369, shares: 9, clicks: 2189, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7425295330440785920" },
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "0b28e078-bf71-4038-a487-d4f77cd944ec", post_date: "2026-01-28", post_text_preview: "January at Chatbase.", impressions: 5515, likes: 29, comments: 2, shares: 1, clicks: 1813, post_url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7422321020042211328" },
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "3eea6e12-87bb-47b6-8f6f-ea8c7154d8db", post_date: "2026-01-20", post_text_preview: "Chatbase now integrates with Zendesk and Salesforce!", impressions: 11636, likes: 70, comments: 9, shares: 13, clicks: 475, post_url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7419409745532395520" },
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "ff64bc22-63ad-4906-ae83-75ae2ab7a256", post_date: "2026-01-19", post_text_preview: "eWebinar built something special.", impressions: 3747, likes: 38, comments: 4, shares: 2, clicks: 210, post_url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7419023358807306240" },
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "da6211ea-ccb3-4108-961c-1e1fff49e079", post_date: "2026-01-15", post_text_preview: "Let customers take action through conversations.", impressions: 3079, likes: 23, comments: 2, shares: 2, clicks: 126, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7417626267858075648" },
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "b831cb31-4086-4d7a-9556-c87756371063", post_date: "2026-01-15", post_text_preview: "Repost", impressions: 941, likes: 5, comments: 0, shares: 0, clicks: 37, post_url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7417530505568362496" },
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "a331ecdd-831d-4341-9b5c-759d2b5711b6", post_date: "2026-01-12", post_text_preview: "Deliver a truly native experience, anywhere. Localize chat menus.", impressions: 6858, likes: 57, comments: 2, shares: 5, clicks: 214, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7416503148489560064" },
  { profile_id: "4423751c-c478-40f8-b368-b393a26cbb46", employee_name: "Chatbase", platform_post_id: "bd4dbc04-7f90-487f-981b-707437672294", post_date: "2026-01-08", post_text_preview: "Email is one of the most important channels for customer conversations.", impressions: 8032, likes: 67, comments: 6, shares: 4, clicks: 346, post_url: "https://www.linkedin.com/feed/update/urn:li:share:7415043202782564352" },
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const db = base44.asServiceRole;

    // 1. Upsert profiles
    const existingProfiles = await db.entities.OrdinalProfile.list();
    for (const profile of PROFILES) {
      const found = existingProfiles.find(e => e.ordinal_id === profile.ordinal_id);
      const data = { ...profile, last_synced: new Date().toISOString() };
      if (found) {
        await db.entities.OrdinalProfile.update(found.id, data);
      } else {
        await db.entities.OrdinalProfile.create(data);
      }
    }

    // 2. Compute per-post engagement rates and aggregate stats by profile
    const profileStats = {};
    for (const post of ALL_POSTS) {
      const engagement = post.likes + post.comments + post.shares + post.clicks;
      post.engagement_rate = post.impressions > 0 ? Math.round((engagement / post.impressions) * 10000) / 100 : 0;
      if (!profileStats[post.profile_id]) profileStats[post.profile_id] = { impressions: 0, engagement: 0, posts: 0 };
      profileStats[post.profile_id].impressions += post.impressions;
      profileStats[post.profile_id].engagement += engagement;
      profileStats[post.profile_id].posts += 1;
    }

    // 3. Upsert posts
    const existingPosts = await db.entities.PostAnalytic.list();
    let createdPosts = 0, updatedPosts = 0;
    for (const post of ALL_POSTS) {
      const found = existingPosts.find(e => e.platform_post_id === post.platform_post_id);
      if (found) {
        await db.entities.PostAnalytic.update(found.id, post);
        updatedPosts++;
      } else {
        await db.entities.PostAnalytic.create(post);
        createdPosts++;
      }
    }

    // 4. Update profile aggregate stats
    const refreshedProfiles = await db.entities.OrdinalProfile.list();
    for (const profile of refreshedProfiles) {
      const stats = profileStats[profile.ordinal_id];
      if (stats) {
        const avgEngRate = stats.impressions > 0 ? Math.round((stats.engagement / stats.impressions) * 10000) / 100 : 0;
        await db.entities.OrdinalProfile.update(profile.id, {
          total_impressions: stats.impressions,
          total_posts: stats.posts,
          avg_engagement_rate: avgEngRate,
          last_synced: new Date().toISOString()
        });
      }
    }

    return Response.json({ success: true, profiles: PROFILES.length, posts: ALL_POSTS.length, createdPosts, updatedPosts });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});