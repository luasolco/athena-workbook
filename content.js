/*
 * ATHENA Leadership Circle Workbook: structured content.
 * Source: "Final - ATHENA Leadership Circle fillable workbook.pdf" (108 pages).
 * Every block carries the source page number(s) in `p` so it can be audited page by page.
 * Wording is kept exactly as in the source, including capitalization and spelling.
 * Presentation lives in app.js; this file holds data only.
 */
window.WORKBOOK = (function () {
  "use strict";

  /* Predictive Index factors, drawn as HTML/SVG diagrams (pages 18-23) */
  var PI_FACTORS = [
    { f: "a", name: "Dominance", letter: "A", low: "Collaborative", high: "Independent", drive: "The drive to exert one’s influence on people / events", left: "More intense need to collaborate", right: "More intense need to make an impact" },
    { f: "b", name: "Extraversion", letter: "B", low: "Reserved", high: "Sociable", drive: "The drive for social interaction with other people", left: "More intense need to think it through alone", right: "More intense need to talk it through w/others" },
    { f: "c", name: "Patience", letter: "C", low: "Driving", high: "Steady", drive: "The drive for consistency and stability", left: "More intense need for variety", right: "More intense need for familiarity" },
    { f: "d", name: "Formality", letter: "D", low: "Flexible", high: "Precise", drive: "The drive to conform to rules and structure", left: "More intense need to have flexibility", right: "More intense need to have structure" }
  ];
  /* Example PI chart (sigma, -3 to +3): factors A-D, then E (Subjective / Objective) */
  var PI_EXAMPLE = { e: ["Subjective", "Objective"], self: [2.85, 1.3, -2.2, -2.05, -2.6], concept: [1.4, 1.65, -2, -1.05, 0.05] };

  var RATING_LABELS = [
    "1 – Rarely / I am still developing this",
    "2 – Occasionally / Inconsistently",
    "3 – Consistently in familiar situations",
    "4 – Consistently, even under pressure or uncertainty"
  ];

  var EIQ_LABELS = [
    "1 – Rarely demonstrated, especially under stress",
    "2 – Demonstrated inconsistently or primarily in low-pressure situations",
    "3 – Demonstrated consistently, including during challenge",
    "4 – Demonstrated with intention, self-regulation, and alignment to values—even in high-stakes moments"
  ];

  var BANDS = [
    { min: 17, max: 20, label: "Strength", text: "17–20: Strength — consistently embodied, even under pressure" },
    { min: 13, max: 16, label: "Emerging Strength", text: "13–16: Emerging Strength — growing with intention and awareness" },
    { min: 5, max: 12, label: "Opportunity for Growth", text: "5–12: Opportunity for Growth — fertile ground for learning, growth, and practice" }
  ];

  /* The eight principles, with the assessment statements (pages 5-8 and 104-107). */
  var PRINCIPLES = [
    { id: "la", name: "Live Authentically", tag: "Know your values & remain true to them", statements: [
      "I can clearly articulate the core values that guide my leadership.",
      "My daily decisions reflect my stated values.",
      "I take responsibility for my choices rather than blaming circumstances or others.",
      "I remain grounded in my values when facing conflict, fear, or loss.",
      "I regularly reflect on whether my leadership is aligned with who I am becoming."
    ] },
    { id: "lc", name: "Learn Constantly", tag: "Seek knowledge", statements: [
      "I actively seek feedback to support my growth as a leader.",
      "I reflect on both successes and failures to improve my leadership.",
      "I pursue learning beyond what is required or expected of me.",
      "I adapt my leadership approach based on new insights or information.",
      "I learn from people whose perspectives and experiences differ from my own."
    ] },
    { id: "br", name: "Build Relationships", tag: "Engage, empower, & entrust", statements: [
      "I listen with the intent to understand, not simply to respond.",
      "I am aware of how my leadership impacts others emotionally.",
      "I build trust through consistency and follow-through.",
      "I seek to understand how others experience me in my role.",
      "I invest time and care in relationships, not just outcomes."
    ] },
    { id: "fc", name: "Foster Collaboration", tag: "Welcome others to the work", statements: [
      "I actively invite perspectives from those who are often overlooked.",
      "I value collective success over personal recognition.",
      "I navigate conflict in ways that preserve dignity and trust.",
      "I address behaviors that undermine collaboration.",
      "I encourage shared ownership and participation in the work."
    ] },
    { id: "ac", name: "Act Courageously", tag: "Dare", statements: [
      "I take action even when outcomes are uncertain.",
      "I speak up when something does not align with my values.",
      "I am willing to stand alone when necessary.",
      "I learn from failure rather than avoiding risk.",
      "I challenge assumptions or systems that no longer serve the collective good."
    ] },
    { id: "af", name: "Advocate Fiercely", tag: "Champion what you believe is right", statements: [
      "I advocate for myself and others, even when it feels uncomfortable.",
      "I take action on issues that matter deeply to me.",
      "I use my influence to advance fairness and equity.",
      "I inspire others to join causes aligned with shared values.",
      "I balance passion with compassion when advocating for change."
    ] },
    { id: "gb", name: "Give Back", tag: "Serve", statements: [
      "I view leadership as a responsibility to serve others.",
      "I contribute time, voice, or resources to the greater good.",
      "I help others create meaningful give-back opportunities.",
      "I consider the broader impact of my decisions.",
      "I act with awareness of the legacy I am creating."
    ] },
    { id: "ce", name: "Celebrate", tag: "Remember & rejoice", statements: [
      "I intentionally acknowledge and celebrate the contributions of others.",
      "I create space to reflect on both success and loss.",
      "I use celebration to strengthen connection and belonging.",
      "I use milestones as opportunities to pause, reflect, and learn.",
      "I honor shared experiences through meaningful rituals or traditions."
    ] }
  ];

  /* People Skills & Emotional IQ (pages 11-14). */
  var EIQ = [
    { group: "Live Authentically", sub: "Self-awareness, emotional honesty, and values alignment", skills: [
      ["Self-Awareness", "Recognizes emotions, triggers, strengths, and growth edges; reflects before reacting"],
      ["Acceptance", "Acknowledges reality without avoidance or self-judgment; meets self and others where they are"],
      ["Reflection", "Pauses to integrate learning from experience; applies insight to future actions"],
      ["Emotional Regulation", "Manages emotions during stress; chooses responses aligned with values"]
    ] },
    { group: "Learn Constantly", sub: "Curiosity, growth mindset, and adaptive thinking", skills: [
      ["Critical Thinking", "Asks thoughtful questions; evaluates information before drawing conclusions"],
      ["Creativity & Innovation", "Generates new ideas; remains open to diverse perspectives and approaches"],
      ["Learning Agility", "Seeks feedback; adapts quickly based on insight and experience"]
    ] },
    { group: "Build Relationships", sub: "Trust, presence, and authentic connection", skills: [
      ["Communication", "Listens actively, communicates clearly, adapts style to others"],
      ["Active Understanding", "Seeks to understand before responding; demonstrates empathy and presence"],
      ["Interpersonal Skills", "Builds rapport; respects boundaries, differences, and lived experiences"],
      ["Networking", "Builds authentic, values-based relationships rather than transactional connections"]
    ] },
    { group: "Foster Collaboration", sub: "Team effectiveness, inclusion, and shared success", skills: [
      ["Teamwork", "Contributes reliably; supports shared goals and collective accountability"],
      ["Inclusion", "Creates belonging; values diverse voices and perspectives"],
      ["Conflict Resolution", "Addresses tension constructively; remains curious and compassionate"],
      ["Influencing Others", "Builds alignment through trust, clarity, and shared purpose"]
    ] },
    { group: "Act Courageously", sub: "Resilience, adaptability, and values-based action", skills: [
      ["Adapting to Change", "Responds positively to uncertainty and evolving conditions"],
      ["Decision Making", "Makes timely, informed decisions; balances courage with discernment"],
      ["Grit & Resilience", "Sustains effort during challenge; learns from setbacks"]
    ] },
    { group: "Advocate Fiercely", sub: "Integrity, voice, and ethical leadership", skills: [
      ["Professional Integrity", "Honors commitments; acts ethically and transparently"],
      ["Speaking with Courage", "Voices truth respectfully; advocates for people, purpose, and values"]
    ] },
    { group: "Give Back", sub: "Service, contribution, and stewardship", skills: [
      ["Compassion", "Responds with care and humanity; considers impact on others"],
      ["Mentorship & Support", "Supports growth of others; shares knowledge generously"]
    ] },
    { group: "Celebrate", sub: "Recognition, positivity, and sustainable leadership energy", skills: [
      ["Positivity", "Maintains constructive outlook without bypassing reality"],
      ["Appreciation", "Recognizes contributions; celebrates progress and effort"]
    ] },
    { group: "Execution & Self-Management Skills", sub: "Supporting sustainable leadership practice", strong: true, skills: [
      ["Time Management", "Prioritizes effectively; balances productivity with well-being"],
      ["Organization", "Plans, follows through, and manages details responsibly"],
      ["Work Ethic", "Demonstrates reliability, accountability, and professionalism"],
      ["Stress Management", "Uses healthy strategies to navigate pressure and prevent burnout"]
    ] }
  ];

  /* Reusable pieces ------------------------------------------------------ */
  function inst(sub) { return { t: "banner", title: "ATHENA<br>LEADERSHIP INSTITUTE", sub: sub }; }

  var ASSESS_HOW = [
    { t: "h3", text: "HOW TO RESPOND", u: true },
    { t: "p", html: "For each statement, select the response that best reflects your current experience:" },
    { t: "lines", items: RATING_LABELS },
    { t: "h3", text: "A NOTE ON GROWTH", u: true },
    { t: "p", html: "Lower scores do not indicate weakness or failure. They simply highlight where learning, support, and intentional practice may be most impactful for you at this moment.<br>Leadership is not static — it is a living practice." }
  ];

  var SCORING = [
    { t: "h3", text: "SCORING & INTERPRETING YOUR RESULTS", u: true },
    { t: "p", html: "How to Score Your Assessment" },
    { t: "ul", items: ["Each ATHENA Leadership Principle includes 5 statements.", "Each statement is scored from 1 to 4."] },
    { t: "p", html: "Minimum score per principle: 5<br>Maximum score per principle: 20" },
    { t: "p", html: "To calculate your score for each principle:" },
    { t: "ul", items: ["Add the numbers you selected for the five statements within that principle.", "Record the total score for that principle.", "Repeat for all eight ATHENA Principles."] },
    { t: "h3", text: "PARTICIPANT SCORE SUMMARY", u: true },
    { t: "p", html: "This summary is designed to help you reflect on your results with curiosity. Your scores are a snapshot in time — not a judgment of your worth or potential as a leader." },
    { t: "h3", text: "<u>YOUR SCORES BY PRINCIPLE </u>(RECORD YOUR TOTALS FOR EACH PRINCIPLE BELOW.)" }
  ];

  var INTERP = [
    { t: "h3", text: "SCORE INTERPRETATION", u: true },
    { t: "ul", items: BANDS.map(function (b) { return b.text; }) }
  ];

  /* Modules ---------------------------------------------------------------- */
  var modules = [];

  /* 1. Welcome (pages 2-3) */
  modules.push({ id: "welcome", title: "Welcome & Program Outline", short: "Welcome", group: "Welcome", steps: [
    { id: "welcome-1", title: "Welcome to the ATHENA Community", p: [2], blocks: [
      inst("WELCOME AND PROGRAM OUTLINE"),
      { t: "h2", text: "Welcome to the ATHENA Community", center: true },
      { t: "p", html: "Welcome. We are honored to walk alongside you in this program and grateful for the courage it takes to show up for deep reflection, learning, and growth. This is a space rooted in trust, respect, and shared humanity. Together, we aim to cultivate a supportive, inclusive environment where each person feels safe to be authentic, seen, and heard." },
      { t: "p", html: "We recognize that leadership development—especially conscious and compassionate leadership—often invites personal insight and emotional awareness, sometimes in unexpected ways." },
      { t: "h2", text: "Community Guidelines & Shared Agreements", center: true },
      { t: "p", html: "To support a meaningful and emotionally safe experience for everyone, we ask that all participants honor the following guidelines:" },
      { t: "h3", text: "Sacred Space & Confidentiality", u: true },
      { t: "p", html: "This is a confidential space. To protect trust and psychological safety, no recordings are permitted, and what is shared here stays here. Please approach each person’s story with care, compassion, and respect, honoring the courage it takes to share vulnerably." },
      { t: "h3", text: "Emotional Safety & Scope of Support", u: true },
      { t: "p", html: "This program includes self-reflection and conversations that may touch on sensitive or personal topics. Emotional moments may arise—and that is okay. You are welcome to feel, pause, and tend to yourself as needed." },
      { t: "p", html: "At the same time, it’s important to be clear that ATHENA Certified Facilitators are not therapists, counselors, or social workers. Our role is to guide the program, listen deeply, and hold supportive space—not to provide clinical care, diagnosis, or crisis intervention services. If you find yourself struggling with your mental health, we strongly encourage seeking support from a qualified mental health professional. Your well-being matters." },
      { t: "p", html: "We invite each participant to practice self-responsibility and self-compassion, choosing what feels right for you in each moment." }
    ] },
    { id: "welcome-2", title: "Participation & Program Outline", p: [3], blocks: [
      { t: "h3", text: "Participation & Collective Care", u: true },
      { t: "p", html: "This experience is designed to be participatory and relational. In a world where disconnection and loneliness are common, your presence matters." },
      { t: "p", html: "To support your learning and the collective experience, participants are invited to commit to:" },
      { t: "ul", items: ["Complete all pre- and post-session work", "Review any pre-session videos or readings", "Attend sessions and be on camera whenever possible", "Engage openly and respectfully in dialogue"] },
      { t: "p", html: "These elements are essential for meaningful outcomes and for honoring the shared commitment we are making to one another." },
      { t: "p", html: "Everyone brings wisdom, insight, and lived experience. Your voice contributes to the strength of the whole—and everyone deserves the benefit of our collective presence and care." },
      { t: "h3", text: "Below is the program outline:", u: true },
      { t: "outline", items: ["Welcome<br>& Introduction", "Predictive<br>Index (PI)", "Live<br>Authentically", "Learn<br>Constantly", "Build<br>Relationships", "Foster<br>Collaboration", "Act<br>Courageously", "Advocate<br>Fiercely", "Give Back", "Celebrate"] },
      { t: "h3", text: "Certificate of Completion", u: true },
      { t: "p", html: "Participants who attend at least 8 sessions and complete the post-program survey will receive a Certificate of Completion, recognizing their commitment to the learning journey." },
      { t: "note", html: "Reclaim your voice—at your own pace.<br>Honor your authentic self.<br>Inner work shapes outer impact.<br>Together, we rise." },
      { t: "p", html: "<b>WE ARE GRATEFUL YOU ARE HERE. MAY THIS SPACE SUPPORT YOUR GROWTH, NOURISH YOUR LEADERSHIP, AND REMIND YOU THAT YOU DO NOT WALK THIS PATH ALONE.</b>", center: true }
    ] }
  ] });

  /* 2. Pre-course assessment (pages 4-9) */
  modules.push({ id: "pre", title: "Pre-Course ATHENA Principles Assessment", short: "Pre-Course Assessment", group: "Pre-program assessments", steps: [
    { id: "pre-1", title: "Purpose & How to Respond", p: [4], blocks: [
      inst("PRE-COURSE ATHENA PRINCIPLES ASSESSMENT"),
      { t: "h2", text: "Aligned to ATHENA’s Principles of Leadership", center: true },
      { t: "h3", text: "PURPOSE", u: true },
      { t: "p", html: "This self-assessment is an invitation to pause, reflect, and take an honest snapshot of how you currently embody ATHENA’s Eight Principles of Leadership. It is not a test, and it is not about performance or perfection. It is about awareness." },
      { t: "p", html: "Your responses will help you:" },
      { t: "ul", items: ["Clarify your current leadership strengths", "Identify areas where growth and integration are calling", "Establish a meaningful baseline to reflect on your journey through the program"] },
      { t: "p", html: "There are no right or wrong answers. The most valuable responses are the most honest ones.<br>As you complete this assessment, consider how you generally show up in your leadership — not only on your best days, and not only in moments of challenge, but across the full range of your lived experience." },
      { t: "p", html: "This assessment will be repeated at the end of the program so you can reflect on how your leadership has evolved, deepened, or shifted throughout the program. Take your time. Answer with self-compassion. Let this be a moment of presence." }
    ].concat(ASSESS_HOW) },
    { id: "pre-2", title: "Assessment", p: [5, 6, 7, 8], blocks: [{ t: "assess", phase: "pre" }] },
    { id: "pre-3", title: "Scoring & Reflection", p: [9], blocks: SCORING.concat([{ t: "scores", phase: "pre" }], INTERP, [
      { t: "h3", text: "REFLECTION:", u: true },
      { t: "qs", items: ["Which two principles feel most alive for me right now?", "Which principles feel most ready for growth or deeper integration?", "What leadership practices do I want to strengthen during this program?"] },
      { t: "p", html: "You may wish to revisit this summary throughout the program as your awareness and practice evolve." }
    ]) }
  ] });

  /* 3. People Skills & Emotional IQ (pages 10-15) */
  modules.push({ id: "eiq", title: "People Skills & Emotional IQ", short: "People Skills & EIQ", group: "Pre-program assessments", steps: [
    { id: "eiq-1", title: "Purpose & Rating Scale", p: [10], blocks: [
      inst("PEOPLE SKILLS & EMOTIONAL IQ"),
      { t: "h3", text: "Purpose & Intent", u: true },
      { t: "p", html: "This assessment is a reflective growth tool designed to support your development as a conscious, compassionate, and effective leader. It is not a test, nor a measure of your worth or potential. There are no right or wrong answers. Your honest self-reflection—especially in areas where growth is still emerging—will deepen your learning experience and help you recognize meaningful progress over time." },
      { t: "p", html: "People Skills and Emotional Agility are foundational to conscious leadership. Together, they shape how you relate to yourself, how others experience you, and how effectively you lead in complexity and change." },
      { t: "h3", text: "Definitions", u: true },
      { t: "p", html: "People Skills are the observable behaviors and relational capacities you learn and practice to be the best human you can be—for yourself and others. They reflect how you communicate, collaborate, and contribute in ways that positively impact individuals, teams, and communities. Emotional Agility is the ability to recognize, understand, and skillfully work with your emotions—especially during stress, uncertainty, or change—so that your responses align with your values rather than automatic reactions." },
      { t: "p", html: "People skills reflect what others experience from us. Emotional agility reflects how we relate to ourselves first. Sustainable leadership requires both." },
      { t: "h3", text: "Proficiency Rating Scale", u: true },
      { t: "p", html: "Use the scale below for both the Pre-Program and Post-Program assessments:" },
      { t: "lines", items: EIQ_LABELS },
      { t: "h3", text: "How to Complete This Assessment", u: true },
      { t: "ul", items: ["At the beginning of the program, rate your current level for each skill.", "At the end of the program, return and reassess your original scores.", "Use the Progress Reflection column to note insights, awareness shifts, and real-world application."] }
    ] },
    { id: "eiq-2", title: "Skills: Pre-Program Rating", p: [11, 12, 13, 14], blocks: [{ t: "eiq", phase: "pre" }] }

  ] });

  /* 4. Predictive Index (pages 16-39) */
  function needs(title, head, rows) { return { t: "needs", title: title, head: head, rows: rows }; }
  var MID = ["Left of Mid-point", "Right of Mid-point"];
  function picard(o) { return Object.assign({ t: "picard" }, o); }
  function combo(o) { return Object.assign({ t: "combo" }, o); }

  modules.push({ id: "pi", title: "Predictive Index", short: "Predictive Index", group: "Predictive Index", steps: [
    { id: "pi-1", title: "Predictive Index Overview", p: [16], blocks: [
      Object.assign(inst("PREDICTIVE INDEX"), { partners: true }),
      { t: "h2", text: "Predictive Index Overview", center: true },
      { t: "p", html: "ATHENA International is proud to partner with MindWire® to offer you access to the Predictive Index® (PI) behavioral assessment." },
      { t: "p", html: "On a personal level, PI provides insight into how you naturally think, communicate, and respond to your environment. It helps you better understand your authentic strengths, potential challenges, and motivating needs—supporting stronger self-awareness and more effective relationships." },
      { t: "p", html: "From a leadership perspective, PI is a powerful tool for enhancing effectiveness and performance. It helps you recognize how to measure and leverage your natural talents, adapt across different situations, and lead in ways that are aligned with who you truly are—rather than who you think you should be." },
      { t: "p", html: "There is no “right” or “wrong” profile. The value of PI lies in understanding yourself more clearly and using that insight with intention and compassion." },
      { t: "p", html: "Once you receive your results, please be sure to:" },
      { t: "ul", items: ["Watch the accompanying resource video", "Review the Motivating Needs Cheat Sheet"] },
      { t: "p", html: "These resources will help you interpret your results and apply them meaningfully throughout the program." },
      { t: "p", html: "The Predictive Index supports the lived practice of ATHENA’s Eight Principles of Leadership by deepening self-awareness and intentional choice. By understanding your natural drives, needs, and behavioral patterns, you are better equipped to Live Authentically and Learn Constantly, recognizing both your strengths and growth edges without judgment. This awareness becomes a foundation for leading with clarity, integrity, and self-trust." },
      { t: "p", html: "As you apply these insights in relationship with others, PI also strengthens your ability to Build Relationships and Foster Collaboration, helping you appreciate different styles, perspectives, and motivations. When leaders understand themselves and others more clearly, they are better able to Act Courageously, Advocate Fiercely, and Give Back in ways that are aligned, sustainable, and impactful." },
      { t: "p", html: "Ultimately, this work supports a leadership culture where growth is celebrated—not through comparison or perfection, but through conscious, compassionate practice." },
      { t: "mindwire" }
    ] },
    { id: "pi-2", title: "Profile Categories", p: [17, 18], blocks: [
      { t: "p", html: "There are only 17 Predictive Index profile names so don’t put too much into a NAME because there are a thousand different variances of each. Also, there are no good and bad profiles for leadership positions, each has its own set of strengths and challenges. Below will give you a general guide to what they represent at a very high level but your unique attributes are the most important aspects to become familiar with and how to lean into your authentic strengths. These categories help to clarify how individuals approach their work and interact with others." },
      { t: "profiles", title: "Analytical Profiles", sub: "These profiles are typically detail-oriented, data-driven, and focus on problem-solving", items: [
        ["Analyzer:", "Systematic, precise, and thorough. Focuses on deep analysis and accuracy."],
        ["Controller:", "Methodical, structured, and prefers a high degree of control. Focused on executing tasks with efficiency."],
        ["Specialist:", "Expert in their field with a focus on depth of knowledge and expertise. Prefers individual work."],
        ["Strategist:", "Thinks long-term with a focus on creating efficient and scalable solutions. Highly analytical and visionary."],
        ["Venturer:", "Innovative, risk-taking, and bold. Enjoys exploring new opportunities and challenging the status quo."]
      ] },
      { t: "profiles", title: "Social Profiles", sub: "These profiles are people-oriented, communicative, and enjoy influencing others", items: [
        ["Altruist:", "Supportive, empathetic, and focused on helping others. Enjoys building relationships based on trust."],
        ["Captain:", "Driven, bold, and commanding. Takes charge and leads others confidently."],
        ["Maverick:", "Independent, unconventional, and adaptable. Enjoys autonomy and tends to break away from norms."],
        ["Persuader:", "Charismatic, influential, and enthusiastic. Excels at motivating others and gaining buy-in."],
        ["Promoter:", "Energetic, sociable, and outgoing. Thrives in environments where they can connect and engage people."],
        ["Collaborator:", "Team-oriented, cooperative, and supportive. Focuses on building harmony and working closely with others."]
      ] },
      { t: "profiles", title: "Stabilizing Profiles", sub: "These profiles are dependable, steady, and maintain order in their environments", items: [
        ["Adapter:", "Versatile, flexible, and able to adjust to varying environments. Prefers stability but can shift when needed."],
        ["Guardian:", "Loyal, reliable, and protective of the team's well-being. Provides stability and consistency."],
        ["Artisan:", "Practical, focused on quality, and detail-oriented. Enjoys creating with precision and craftsmanship."],
        ["Operator:", "Dependable, consistent, and efficient. Enjoys routine work and follows procedures carefully."]
      ] },
      { t: "profiles", title: "Persistent Profiles", sub: "These profiles are independent, resilient, and intellectually curious", items: [
        ["Scholar:", "Inquisitive, thoughtful, and enjoys continuous learning. Driven by knowledge and intellectual pursuits."],
        ["Individualist:", "Independent, unconventional, and introspective. Follows their own path and prefers autonomy."]
      ] },
      { t: "h3", text: "Key Differences:", u: true },
      { t: "ul", items: ["Analytical profiles tend to focus on logic, data, and strategy.", "Social profiles tend to prioritize relationships, influence, and people dynamics.", "Stabilizing profiles tend to value consistency, dependability, and order.", "Persistent profiles tend to be driven by curiosity, self-direction, and intellectual independence."] },
      { t: "science", title: "The Science Behind PI", sub: "Behavioral Assessment", lead: "Measures drives and behaviors, or, how someone gets work done.", items: ["Developed for business", "Bias-free", "No adverse impact", "Predicts Job performance"] },
      { t: "mindwire" }
    ] },
    { id: "pi-3", title: "Primary Factors & Factor Intensity", p: [19, 20, 21], blocks: [
      { t: "h2", text: "Primary Factors", center: true },
      { t: "p", html: "The four Primary Factors measured by PI are" },
      { t: "ul", items: ["Factor A (Dominance),", "Factor B (Extraversion),", "Factor C (Patience) and", "Factor D (Formality)."] },
      { t: "p", html: "Each of the four Primary Factors is a drive to behave in a particular way, and each is different from the others. Every individual has all four Factors in their total pattern of behavior." },
      { t: "scales" },
      { t: "p", html: "<b>Dominance:</b> The drive to exert one’s influence on people or events<br><b>Extraversion:</b> The drive for social interaction with other people<br><b>Patience:</b> The drive for consistency and stability<br><b>Formality:</b> The drive to conform to rules and structure" },
      { t: "drives", title: "Why Do People Behave as They Do?", steps: [["People have", "DRIVES"], ["Drive creates", "NEEDS"], ["Response to needs", "BEHAVIORS"]] },
      { t: "h3", text: "Understanding Factor Intensity", center: true },
      { t: "p", html: "Predictive Index measures the intensity of your behavioral drives, not whether you have or lack it. Intensity increases from left to right on the graph above and the graphs below—the further to the right a factor appears, the more strongly that drive tends to show up in your behavior. Additionally, when a factor is closer to the midpoint (the center triangle below), the more those needs and behaviors are expressed in a moderate way. When they are further out from mid-point the more intense those needs and behaviors are, the more consistent they are, and the more challenging they are to adjust." },
      { t: "p", html: "There are no right or wrong placements. More or less intensity does not mean something is “better” or “worse,” or that you do or do not possess a particular drive or behavior. It simply reflects how strongly that need or behavior tends to be in you." },
      { t: "p", html: "Additionally, when looking at factor combinations, which you will learn more about (for example, A > B or B > A), the first factor is more intense than the second. Furthermore, the greater the distance between two factors in a combination, the more distinct or pronounced that difference may feel in day-to-day behavior." },
      { t: "p", html: "Increase in the intensity from left to right, equals increased drive to exert influence on people or events. Therefore, increasing intensity from mid-point left in need to collaborate and to the right more need to make an impact." },
      { t: "intensity", f: "a" },
      { t: "p", html: "Increase in the intensity from left to right, equals increased drive to have social interaction when it comes to doing the work. Therefore, increased intensity from mid-point left to think alone and to the right more need to talk it through." },
      { t: "intensity", f: "b" },
      { t: "p", html: "Increase in intensity from left to right, equals increased drive for consistency and stability. Therefore, increased intensity from mid-point left to have variety and lots to do, while right has more need for stability and familiarity." },
      { t: "intensity", f: "c" },
      { t: "p", html: "Increase in intensity from left to right, equals increased drive to conform to rules and structure. Therefore, increased intensity from mid-point left to have flexibility, while right has more need for structure and precision." },
      { t: "intensity", f: "d" },
      { t: "mindwire" }
    ] },
    { id: "pi-4", title: "Understanding Your Chart", p: [22, 23], blocks: [
      { t: "h2", text: "UNDERSTANDING YOUR CHART", center: true },
      { t: "pichart", series: ["self"], label: "Self", title: "The real me: Your basic motivations and needs" },
      { t: "pichart", series: ["concept"], label: "Self-Concept", title: "How you are trying to be: How you think you need to adapt or adjust in response to the current environment" },
      { t: "pichart", series: ["self", "concept"], intro: "The PI Behavioral Assessment is designed to develop two distinct types of behavioral awareness:", cards: [["Self:", "How a person describes their own workplace drives and needs."], ["Self-Concept:", "How a person perceives the external demands of their work environment."]] },
      { t: "h3", text: "How to interpret:" },
      { t: "p", html: "Ideally, your internal drives and external demands would be perfectly aligned. But workplaces are rarely that simple, and people sometimes feel expected to work in ways that run counter to their natural strengths. This chart shows how their <b>Self</b> compares to their <b>Self-Concept</b>. The closer the <b>Self</b> is to the <b>Self-Concept</b>, the easier it generally feels to perform one’s job." },
      { t: "p", html: "While the <b>Self</b> does not typically change outside of major life events, the <b>Self-Concept</b> likely will change as a person progresses in their career. Remember to interpret the <b>Self-Concept</b> in relation to the role you are in when you took the PI Behavioral Assessment." },
      { t: "p", html: "When the <b>Self</b> and <b>Self-Concept</b> are misaligned, it means you may be experiencing some difficulty or discomfort within your day-to-day role." },
      { t: "p", html: "Here are some ways you and your boss can work together to alleviate this discomfort:" },
      { t: "ul", items: [
        "Look at your <b>Self</b> and <b>Self-Concept</b>. Are they aligned, or misaligned? Take note of which behavioral drive(s) displays the widest difference(s).",
        "Discuss how your <b>Self-Concept</b> compares to your boss’s perceptions of the role and its demands. Are these two perspectives similar, or different?",
        "Explore ideas to bridge the gap between <b>Self</b> and <b>Self-Concept</b>. How can you modify responsibilities or expectations to create a more comfortable work environment?",
        "Revisit the <b>Self</b>. Can you stretch certain behaviors to be more successful in your role? How can your boss help you flex in these areas?"
      ] },
      { t: "p", html: "Next several pages demonstrate what Motivating Needs and Behaviors are likely to look like." },
      { t: "mindwire" }
    ] },
    { id: "pi-5", title: "Motivating Needs & Resulting Behaviors", p: [24, 25], blocks: [
      needs("MOTIVATING NEEDS", MID, [["Factor A<br>Dominance", ["Encouragement", "Reassurance", "Harmony", "Understanding", "Team recognition", "Freedom from individual competition", "Opportunities to collaborate"], ["Independence", "Control of own activities", "To be challenged", "Understanding of the big picture", "Autonomy in problem solving", "Individual recognition", "Opportunities to compete"]]]),
      needs("RESULTING BEHAVIORS", MID, [["Factor A<br>Dominance", ["Cooperative", "Accepting of company policies", "Accommodating", "Supportive", "Harmony-seeking", "Collaborative"], ["Independent", "Assertive", "Venturesome", "Challenging", "Comfortable with conflict", "Authoritarian"]]]),
      needs("MOTIVATING NEEDS", MID, [["Factor B<br>Extraversion", ["Opportunities to reflect", "Room for introspection", "Freedom from office politics", "Private recognition", "Privacy", "Time to trust others", "Opportunities to work with facts"], ["Opportunities to interact", "Social acceptance", "Opportunities to influence", "Public recognition", "Connection with others", "Visible signs of accomplishments", "Opportunities to work with others"]]]),
      needs("RESULTING BEHAVIORS", MID, [["Factor B<br>Extraversion", ["Introspective", "Matter-of-fact", "Analytical", "Imaginative", "Reflective", "Pensive"], ["Outgoing", "Personable", "Convincing", "Animated", "Enthusiastic", "Expressive", "Sociable"]]]),
      needs("MOTIVATING NEEDS", MID, [["Factor C<br>Patience", ["Variety", "Opportunities to work at a faster than average pace", "Mobility", "Freedom from repetition", "Opportunities to handle multiple priorities", "Freedom from routine", "Change"], ["Long-term affiliation", "Ability to work at a steady pace", "Familiar surroundings", "Stable work environment", "Freedom from changing priorities", "Supportive work team", "Recognition for loyalty"]]]),
      needs("RESULTING BEHAVIORS", MID, [["Factor C<br>Patience", ["Intense", "Restless", "Driving", "Impatient", "Rushed", "Brisk"], ["Peaceful", "Patient", "Stable", "Calm", "Serene", "Comfortable with the familiar", "Steady"]]]),
      needs("MOTIVATING NEEDS", MID, [["Factor D<br>Formality", ["Freedom from rigid structure", "Freedom of expression", "Opportunities to delegate details", "Freedom from rules and controls", "Flexibility", "Informality", "Opportunities to be spontaneous"], ["Understanding of rules and regulations", "Specific knowledge of the job", "Freedom from risk of error", "Time to gain expertise", "Recognition for depth of knowledge", "Clarity of expectations", "Certainty"]]]),
      needs("RESULTING BEHAVIORS", MID, [["Factor D<br>Formality", ["Informal", "Tolerant of uncertainty", "Flexible", "Spontaneous", "Non-conforming", "Casual", "Adaptable"], ["Serious", "Meticulous", "Conservative", "Thorough", "Deliberate", "Conventional", "Disciplined"]]]),
      { t: "mindwire" }
    ] },
    { id: "pi-6", title: "Self-Concept / Second Grid", p: [26], blocks: [
      needs("SELF-CONCEPT/SECOND GRID", ["If <b>LOWER</b> in self concept<br>You perceive, trying, or feeling a need to...", "If <b>HIGHER</b> in self concept<br>You perceive, trying, or feeling a need to..."], [
        ["Factor A<br>Dominance", ["Less independent and individualistic", "More agreeable and cooperative", "Less dominant and assertive", "More cautious", "Less venturesome", "More of a team player"], ["More independent", "More of a self-starter", "More risk-tolerant", "More assertive", "More conceptual in thinking", "Less focused on the needs of others", "Less cautious"]],
        ["Factor B<br>Extraversion", ["More concerned with technical aspects of the job", "More factual in expression", "More reserved and introspective", "More thoughtful and analytical", "Less talkative", "Less outgoing"], ["More outgoing", "More persuasive", "More inclusive with others", "More stimulating", "More open in communication", "Less reserved", "Less introspective"]],
        ["Factor C<br>Patience", ["More intense, driving", "More urgent", "More fast-paced for self and others", "More involved with variety", "More adaptive to change", "Faster when producing results", "More demanding on self and others", "Faster than preferred or comfortable"], ["More patient", "More accepting of repetitive work", "More methodical", "More tolerant of others taking the initiative", "More patient with the pace of group activities", "Less intense", "More steady and relaxed"]],
        ["Factor D<br>Formality", ["More flexible", "Less formal in dealing with work and other people", "More venturesome", "More risk-tolerant", "Less reliant on rules and structure", "More comfortable with fewer guidelines"], ["More thorough", "More detailed and stronger in follow-up", "More accepting of rules and structure", "More cautious in decision-making", "Less tolerant of mistakes", "More attentive to accuracy and detail"]]
      ]),
      { t: "mindwire" }
    ] },
    { id: "pi-7", title: "Strengths, Cautions & Self-Coaching Tips", p: [27, 28, 29, 30], blocks: [
      picard({ factor: "Dominance", letter: "A", arrow: "More intense need to collaborate", side: "Left", tabs: ["EXTREMELY", "VERY", "MODERATELY"], sel: 2,
        strengths: ["Collaborative approach when working with direct reports", "Accepting of decisions that impact the team", "Supportive management style", "Interested in team welfare and development"],
        cautions: ["May shy away from tough conversations when needed", "May have difficulty making unpopular decisions", "May be seen as too cautious or not strategic enough"],
        tips: ["Shift your mindset from “I want harmony” to “I want the best results from my team”", "Stand your ground with other managers and leaders when you know you’re correct", "Capitalize on opportunities to be assertive in meetings"] }),
      picard({ factor: "Extraversion", letter: "B", arrow: "More intense need to think it through alone", side: "Left", tabs: ["EXTREMELY", "VERY", "MODERATELY"], sel: 2,
        strengths: ["Data driven, analytical decision-making style", "Thoughtful approach to communicating information to team members", "Reflective and introspective", "Anticipates problems"],
        cautions: ["May be slow to demonstrate trust until comfortable with new team members", "Communication may be too pointed for socially-driven team members", "May appear overly task-focused or remote"],
        tips: ["Give presentations in your area of expertise", "Initiate conversations or schedule time to speak with team members", "Create processes that encourage communication among team members"] }),
      picard({ factor: "Dominance", letter: "A", arrow: "More intense need to make an impact", side: "Right", tabs: ["MODERATELY", "VERY", "EXTREMELY"], sel: 2,
        strengths: ["Drives change and challenges status quo", "Natural leader seeking to make an impact", "Self-motivated, achievement-oriented style", "Assertive and willing to take charge"],
        cautions: ["May be seen as overly aggressive by direct reports", "May intimidate rather than motivate", "May have difficulty delegating authority", "May appear to be tough-minded and directive"],
        tips: ["Actively seek input from direct reports", "Practice active listening and encourage your team to express their opinions or ideas", "Think before you speak; think of how your message will be received"] }),
      picard({ factor: "Extraversion", letter: "B", arrow: "More intense need to talk it through w/others", side: "Right", tabs: ["MODERATELY", "VERY", "EXTREMELY"], sel: 1,
        strengths: ["Motivating, stimulating leadership style", "People-oriented, sociable", "Builds team cohesion and collaboration", "Thoughtful delegator"],
        cautions: ["May be too optimistic or trusting of low performers", "May prioritize being liked or being the focus of attention over results", "May appear overly talkative", "May avoid conflict in order to keep interactions positive"],
        tips: ["Give people the opportunity to contribute and influence outcomes", "Consider how much detail or tangible information is really needed", "Ask about potential problems or risks", "Practice saying “no”"] }),
      picard({ factor: "Patience", letter: "C", arrow: "More intense need for variety", side: "Left", tabs: ["EXTREMELY", "VERY", "MODERATELY"], sel: 0,
        strengths: ["Proactive and results-oriented leadership style", "Able to deal with time pressure", "Able to deal with variety and change", "Multitasker, able to juggle priorities"],
        cautions: ["May appear to be terse to more steady team members", "May tend to be intolerant of delays especially when impacting results", "May become frustrated at the team’s pace and ability to be flexible"],
        tips: ["Reflect on situational urgency - does everything need to be done right now?", "Recognize that people have different paces and manage expectations", "Honor priorities and see initiatives through to completion"] }),
      picard({ factor: "Formality", letter: "D", arrow: "More intense need to have flexibility", side: "Left", tabs: ["EXTREMELY", "VERY", "MODERATELY"], sel: 0,
        strengths: ["Flexible approach to most management situations and direct reports", "Able to delegate details easily", "Adept at changing organizational needs", "Deals well with ambiguous management situations"],
        cautions: ["May not provide as much attention to detail as direct reports need", "May not provide enough structure or direction for the team", "May appear too casual or not serious enough"],
        tips: ["Seek data to support your management decisions", "Evaluate decisions from the perspectives of multiple team members", "Respect questions others have about “how” things will be done", "Pay attention to when your serious side is needed"] }),
      picard({ factor: "Patience", letter: "C", arrow: "More intense need for familiarity", side: "Right", tabs: ["MODERATELY", "VERY", "EXTREMELY"], sel: 1,
        strengths: ["Calm and stable leadership style", "Thoughtful listener to direct reports", "Builds solid group processes", "Gives team time to process"],
        cautions: ["May appear uncomfortable with change", "May appear to over-analyze situations or be too cautious", "May struggle under time pressure", "May be too comfortable with the familiar and slow to adopt new ideas"],
        tips: ["Clarify timelines and focus on creating a sense of urgency among team members", "Manage team’s time wisely - start early and leave time for the unexpected", "Keep others informed when progress is made"] }),
      picard({ factor: "Formality", letter: "D", arrow: "More intense need to have structure", side: "Right", tabs: ["MODERATELY", "VERY", "EXTREMELY"], sel: 0,
        strengths: ["Strong discipline and execution; emphasis on quality", "Builds team structure and respect for the plan", "Focuses team on how to get things done right", "Organized and thorough follow-up with direct reports"],
        cautions: ["May be uncomfortable in ambiguous management situations", "May struggle with situations that call for team and personal flexibility", "May be seen as a perfectionist rather than a producer"],
        tips: ["Learn how to move forward when “enough” information is available", "Ask yourself: Is it worth this much time and process?", "Recognize and respect flexibility shown by direct reports"] }),
      { t: "mindwire" }
    ] },
    { id: "pi-8", title: "Motivating Needs Cheatsheet", p: [31, 32], blocks: [
      { t: "table", cls: "cheat", head: ["", "Strengths to Focus On", "Likes/Dislikes:", "Motivated By:"], rows: [
        ["High A", "Confident, competitive, resilient, outcome oriented, decisive, bold, loves a challenge.", "Winning/ Losing", "Independence, <b>CONTROL</b>, competition, <b>OUTCOMES</b>, individual recognition."],
        ["Low A", "Cooperative, harmonious, helpful, accommodating, supportive, unselfish.", "Cooperation/ Forceful, Blunt Interactions", "Encouragement, reassurance, <b>HARMONY</b>, team environment."],
        ["High B", "Enthusiastic, positive verbal comm, builds strong relationships, persuasive, motivating, coaches, teaches, shares information.", "Being Noticed/ Being Ignored", "Positive, personal, public praise.  <b>INCLUSION, SIGNS OF STATUS, ACCOMPLISHMENT</b>."],
        ["Low B", "Specific, clear, well thought out communication, analytical, good problem solver.", "Privacy/ Small Talk", "Recognition for technical accomplishments/expertise, time to think, <b>FREEDOM FROM POLITICS.</b>"],
        ["High C", "Listening. Steady, consistent, dependable, tolerant, persistent, sequential taskmaster, can be deep specialist.", "Familiarity/ Unfamiliarity", "Paying attention to them. <b>SECURITY, STABILITY</b>, family-like work team, recognition for LOYALTY."],
        ["Low C", "Likes pressure, action oriented, high sense of urgency, change-oriented, fine with managing interruptions, multi-tasker.", "Action/Not Enough To Do", "<b>VARIETY, CHANGE OF PACE,</b> mobility, lots to do."],
        ["High D", "Accuracy, attention to detail, does things according to process, structure, gets things “right”.  Follows up and through rigorously.", "Perfection/ Mistakes", "<b>OPPORTUNITY TO GET THINGS RIGHT,</b> structure, plan, <b>SPECIFIC JOB KNOWLEDGE,</b> freedom from risk, <b>RECOGNITION FOR ACCURACY.</b>"],
        ["Low D", "Innovative, unconventional, creative, tolerant of risk; focused on big picture, not easily knocked off-center by mistakes, unplanned circumstances, finds a way.", "Cross That Bridge When I Get There/ Too Much Structure", "<b>FREEDOM FROM STRUCTURE,</b> delegate details, room to decide how, <b>BIG PICTURE FOCUS.</b>"],
        ["Logical<small>E to Right</small>", "High quality, consistency of decisions; well thought-out logic; data-driven vs. emotional approach, risk mitigation.", "Data, Methodical/Gut Feel, Emotion", "Being correct, ensuring the right decision, driven by data."],
        ["Intuitive<small>E to Left</small>", "Speed.  Can and will decide, even when they don’t have enough time, data, information to know it’s correct.", "Gut Feel/All Data & No Gut", "Deciding, using emotion, gut, experience and going for it."]
      ] },
      { t: "p", html: "<b class=\"gold-caps\">THIS MOTIVATING NEEDS CHEATSHEET CAN HELP YOU TO IDENTIFY YOUR STRENGTHS AND CHALLENGES WITHIN YOUR WORKBOOK PI ROADMAP SECTIONS</b>", center: true },
      { t: "table", cls: "cheat", head: ["", "How to Connect:", "Challenges:"], rows: [
        ["High A", "Bottom line, direct to the point.  Outcomes, outcomes, outcomes.", "They will argue with you. (Everything is a chance to win.)"],
        ["Low A", "Ask for their help, based on their expertise, attitude.  Considerate, supportive, encouraging dialogue.", "Will say things are fine, when they aren’t.  (Especially when feeling confronted, responding to harsh approach.)"],
        ["High B", "Inclusion—share info, ask their opinion.  Never criticize in public, build relationship, recognition for how they do things with people.", "Will get defensive, make excuses. (Desire to protect their image.)"],
        ["Low B", "Allow time to think, clear, factual communication, freedom from too much small talk, straightforward, analytical approach.", "May not say much, engage in discussion, tell you how they are feeling, avoid focusing on the “people part”."],
        ["High C", "Scheduled:  meetings, conversations, everything.  Time to consider and reflect before deciding, lessen pressure, give full attention, be very specific on time frames, deadlines.", "May be uncomfortable/resistant to changes in routine, schedule, comfort zone.  (Needs time to think, consider, get used to change.)"],
        ["Low C", "Brief, bulleted communication about the action/point, immediate feedback, load them up with a variety of challenges, pressure is productive.", "Will interrupt, may not listen well, can be tense and frustrated when change isn’t fast enough for them."],
        ["High D", "Written, precise expectations.  Very specific and frequent feedback with examples; opportunities to develop subject-matter expertise, specialized training.", "Very sensitive to criticism (they work hard to make NO mistakes.) Very hard on themselves for anything not done exactly “right”."],
        ["Low D", "Flexible, informal, casual interactions.  Focused on big picture, with strong clarity around “guard rails”.  Freedom from structure.", "Thick skinned, stubborn about their way.  May not care very much about your rules, policies, procedures."],
        ["Logical<small>E to Right</small>", "Logic, data, analysis, facts, evidence of why something will work and succeed.", "Will slow down or stop when they don’t have enough time, data, info to decide."],
        ["Intuitive<small>E to Left</small>", "Flexibility, use estimates, get 80% of what you need and go, consider their emotions.", "Will decide, but sometimes wrong. Emotion can drive rash decisions."]
      ] },
      { t: "p", html: "<b class=\"gold-caps\">THIS MOTIVATING NEEDS CHEATSHEET CAN HELP YOU TO IDENTIFY YOUR STRENGTHS AND CHALLENGES WITHIN YOUR WORKBOOK PI ROADMAP SECTIONS</b>", center: true },
      { t: "mindwire" }
    ] },
    { id: "pi-9", title: "Factor Combinations", p: [33, 34, 35, 36], blocks: [
      combo({ label: "ORIENTATION", title: "TASK ORIENTED", formula: "Dominance | A > B | Extraversion",
        split: ["Critical, creative thinker", "Technical orientation", "Inquiring mind", "Problem solver", "Limited delegation of authority"],
        left: ["Analytical", "Less venturesome", "More cautious, practical way of doing things", "Ingenious problem solving", "Management style authoritative, w/ less talk & more discipline.", "Very little delegation of authority."],
        right: ["Also analytical, but with less introspection", "Analyzes & solves problems w/more input from others", "With the High A, more venturesome & highly inquisitive", "Interests are less abstract & more practical", "Some delegation of authority."] }),
      combo({ label: "ORIENTATION", title: "PEOPLE ORIENTED", formula: "Extraversion | B > A | Dominance",
        split: ["Empathetic", "Persuasive", "Sociable", "Service-oriented", "Delegates authority", "Comfortable on a team", "Unselfish"],
        left: ["Some social orientation, but less interactive & empathetic than High B", "Friendly, in a quiet & unassuming way", "Seeks harmonious involvement with the team."],
        right: ["Same social orientation along with enthusiasm & persuasiveness", "More assertive & demanding, operating with greater self-interest & goal orientation", "Will delegate authority, but will demand results", "Assertive, more likely to be a team leader than a team member."] }),
      combo({ label: "ACTION", title: "PROACTIVE", formula: "Dominance | A > C | Patience",
        split: ["Takes initiative", "Competitive", "Driven to get things done", "Positive response to pressure", "Fast-paced", "Achievement-oriented", "Impatient with routine"],
        left: ["Initiative & proactive action when it’s clear that actions will help team efforts", "Sense of urgency & drive to get things done quickly & supportively", "Contributes to company/team agenda by multitasking & avoiding routines"],
        right: ["Assertive & proactive in a steady, methodical way", "Pursues own goals & agenda, at own pace", "Demanding & openly challenging with a persistent, even-tempered approach"] }),
      combo({ label: "ACTION", title: "RESPONSIVE", formula: "Patience | C > A | Dominance",
        split: ["Consistent w/ repetitive work", "Cooperative w/others", "Tolerant", "Patient", "Dependable", "Steady", "Easygoing"],
        left: ["Responsive & quick to act to contribute to agreed agenda", "Generally ready to spring into action to lend a hand or respond to the needs of the job or others"],
        right: ["Composed, unruffled & systematic in pursuing own goals", "Persistent & self-confident", "Steadily & calmly keeps own agenda moving forward, one step at a time"] }),
      combo({ label: "RISK", title: "COMFORTABLE WITH RISK", formula: "Dominance | A > D | Formality",
        split: ["Independent", "Individualistic", "Self-confident", "Firm", "Decisive", "Venturesome", "Resistant to authority"],
        left: ["Free delegation of details & freewheeling approach to “the book,” with less emphasis on independence, individualism, self-confidence"],
        right: ["Retains emphasis on independence, individualism & self-confidence", "Seeks control not only of results/outcomes but also of the specifics/details of the process", "More demanding about how things are done, less risk-tolerant", "Needs more information in order to take action"] }),
      combo({ label: "RISK", title: "CAUTIOUS WITH RISK", formula: "Formality | D > A | Dominance",
        split: ["Cooperative", "Supportive", "Willing & helpful", "Need for rules & structure", "Accurate & careful", "Concerned about criticism", "Conservative"],
        left: ["Emphasis on cooperation & supportiveness", "A willing & helpful worker", "Less need for adhering to the rules, more casual about details"],
        right: ["Strong need to go “by the book,” do it right", "Concern for independence & autonomy within their defined area of responsibility", "Demand for results based on a conservative interpretation of the rules; accuracy, thoroughness"] }),
      combo({ label: "CONNECTION", title: "QUICK TO CONNECT", formula: "Extraversion | B > C | Patience",
        split: ["Fluent & fast-talking", "Lively & enthusiastic", "Optimistic style of expression", "Persuasive", "Motivates others", "Stimulating", "Positive communication"],
        left: ["Sense of urgency & drive to get things done, mostly focusing on tasks rather than people", "Impatient with routines", "Organizes thoughts mentally & once ready, takes action quickly", "Somewhat reserved in initial contact with others", "Less reserved as familiarity increases"],
        right: ["Warm, open and very talkative", "Proactive in building relationships in a steady & calm way through conversation, focused listening & willingness to share", "Generally upbeat manner", "Focused on social matters rather than things & tasks"] }),
      combo({ label: "CONNECTION", title: "TAKES TIME TO CONNECT", formula: "Patience | C > B | Extraversion",
        split: ["Reserved & quiet", "Serious with unfamiliar people", "Comfortable with the familiar", "Introspective", "Takes time to think", "Organizes thinking before expressing self"],
        left: ["Focused on tasks rather than social matters, with a drive to get things done quickly", "Reserved & serious, especially around new people", "Quiet & thoughtful, thinks before speaking, generally discusses work topics, not personal ones"],
        right: ["Patient, calm & easygoing with others", "Unhurried in forming new relationships", "Listens well, is open & responsive", "Comfortable & talkative with others, particularly familiar colleagues, family & friends"] }),
      combo({ label: "INTERACTION", title: "INFORMAL", formula: "Extraversion | B > D | Formality",
        split: ["Extraverted & outgoing", "Uninhibited expression of friendliness", "Poised", "Informal in social situations", "Enthusiastic, persuasive talker", "Engaging conversationalist"],
        left: ["Informal & independent", "Imaginative, focused on technical matters of his/her own choosing", "Speaks about concepts & other intangibles", "Relatively comfortable delegating data"],
        right: ["Warm, lively, social & very talkative", "Builds relationships easily, while generally staying within what he or she considers to be the proper bounds of social interaction", "Some delegation of detail, with strong, friendly follow-up"] }),
      combo({ label: "INTERACTION", title: "FORMAL", formula: "Formality | D > B | Extraversion",
        split: ["Serious & disciplined", "Sincere", "Reserved, formal & quiet", "Factual conversationalist", "Sensitive to criticism", "Cautious with new people"],
        left: ["Reserved & private", "Uses few words to get the point across", "Generally speaks about ideas & concepts that interest them", "Unencumbered by social rules"],
        right: ["Formal, social & proper", "Stays within their idea of acceptable social boundaries while collaborating & advancing relationships", "Prefers to work together rather than delegating details", "Detailed & talkative in communication"] }),
      combo({ label: "RULES", title: "CASUAL WITH RULES", formula: "Patience | C > D | Formality",
        split: ["Persistent", "Casual", "Stable", "Limited concern about rules or details", "Comfortable with ambiguity", "Easygoing", "Relaxed"],
        left: ["Very informal, uninhibited, freewheeling, unconcerned about “the book” & details, delegates details very freely with little follow-up", "Focused on the overall idea or “big picture” rather than the details", "A casual risk-taker, not interested in advance planning, takes things as they come & adapts", "Comfortable with ambiguity & persistent, won’t take no for an answer"],
        right: ["Patient, stable & easygoing", "Aptitude for detail somewhat better than average", "Moderately concerned about “the book” but adaptable to change", "Doesn’t rock the boat", "Tolerant with people & routines"] }),
      combo({ label: "RULES", title: "CAREFUL WITH RULES", formula: "Formality | D > C | Patience",
        split: ["Conscientious", "Thorough", "Precise", "Concerned with rules & accuracy", "Strong follow-up", "Strict about punctuality & correctness", "Comfortable with clarity"],
        left: ["While they prefer not to handle details & will delegate them when possible, they will handle some details if the job requires it & will follow up on delegated assignments", "Although very independent (Low D in combination with the High A in this case), they are able to adjust to corporate standards, values & adhere to rules to a degree sufficient for most organizations"],
        right: ["Accurate, thorough, methodical, stable, careful & conscientious", "Concerned with the quality of work & correctness in terms of rules and standards", "Depends on proven methods & accepted principles, respects authority", "Conservative, cautious, prudent. Very reluctant to delegate details. Detailed & talkative in communication"] })
    ] },
    { id: "pi-10", title: "Behaviors for Factor Combinations", p: [37, 38, 39], blocks: [
      { t: "h2", text: "BEHAVIORS FOR FACTOR COMBINATIONS", center: true },
      { t: "behav", items: [
        { title: "A>B Task Oriented", rows: [["Communicating:", "Direct to the point, blunt under pressure"], ["Delegating Authority:", "Tightly held, find it hard"], ["Problem Solving:", "Creative solutions, “heads down” analytical"], ["Decision Making:", "Individual, “decide and announce”"]] },
        { title: "B>A People Oriented", rows: [["Communicating:", "Empathetic, social"], ["Delegating Authority:", "Sharing, delegates easily"], ["Problem Solving:", "Collaborative, talks it through with others"], ["Decision Making:", "Consensus, people focused"]] }
      ] },
      { t: "behav", items: [
        { title: "A>C Proactive", rows: [["Responding to Pressure:", "Thrive under pressure, positive response"], ["Adjusting/Adapting to Change:", "Adapt easily, a change agent"], ["Taking Action:", "Decisive, proactive"], ["Listening:", "Sparingly, finds it difficult"]] },
        { title: "C>A Responsive", rows: [["Responding to Pressure:", "Tentative, with caution"], ["Adjusting/Adapting to Change:", "Takes time, needs to understand why"], ["Taking Action:", "Carefully, responsively"], ["Listening:", "Listens well, thoroughly"]] }
      ] },
      { t: "behav", items: [
        { title: "A>D Comfortable with Risk", rows: [["Perception of Risk:", "Risk = Opportunity, bring it on, it’s fun!"], ["Decision Making:", "Quickly, easily"], ["Need for Rules and Processes:", "Minimal, rules are just “suggestions”"], ["Generalist vs. Specialist:", "Generalist"]] },
        { title: "D>A Cautious with Risk", rows: [["Perception of Risk:", "Wants to mitigate/protect, worrisome"], ["Decision Making:", "Carefully, cautiously"], ["Need for Rules and Processes:", "Strong need, needs clarity around rules"], ["Generalist vs. Specialist:", "Specialist"]] }
      ] },
      { t: "behav", items: [
        { title: "B>C Quick to Connect", rows: [["Connecting with Others:", "Builds relationships quickly, wants to persuade people to see their view"], ["Communicating:", "Enthusiastic communicator, listens to preserve the relationship, but… get to the point"], ["Working in Groups:", "Consensus builders, motivates other group members"]] },
        { title: "C>B Takes Time to Connect", rows: [["Connecting with Others:", "Reserved, relationships build over time"], ["Communicating:", "Thoughtful, needs time to process before speaking"], ["Working in Groups:", "Reserved, may not surface their ideas openly, time to analyze"]] }
      ] },
      { t: "behav", items: [
        { title: "B>D Informal", rows: [["Providing Direction:", "Big picture, talks at a high level in general terms"], ["Sharing Ideas:", "No filter – shares everything that comes to mind, processes out loud, ideas not fully baked"], ["Delegating:", "Delegates details easily, quick to trust"]] },
        { title: "D>B Formal", rows: [["Providing Direction:", "Very detailed instructions, does it the “correct” way (their interpretation of correct)"], ["Sharing Ideas:", "Selective in what they share, analytical, factual"], ["Delegating:", "Provides a lot of structure, takes time to trust"]] }
      ] },
      { t: "behav", items: [
        { title: "C>D Casual with Rules", rows: [["Following or Enforcing Rules:", "Rules are general guidelines; patient, relaxed approach"], ["Working with Structure:", "Structure is a guide, comfortable with ambiguity"], ["Dealing with Deadlines:", "Deadlines are negotiable; persistent, may not hit deadline – sticks with it until result is achieved"]] },
        { title: "D>C Careful with Rules", rows: [["Following or Enforcing Rules:", "Rules are here to be followed, literal interpretation of information"], ["Working with Structure:", "Comfortable with clarity, will work within a structure"], ["Dealing with Deadlines:", "Deadlines are rigid; strict with punctuality and will be accurate"]] }
      ] },
      { t: "mindwire" }
    ] }
  ] });

  /* 5-12. The eight principles ------------------------------------------- */
  function divider(o) { return Object.assign({ t: "divider" }, o); }
  function pi(title, sub, blocks) { return { t: "panel", tone: "pi", title: title, sub: sub, blocks: blocks }; }
  function integ(title, blocks) { return { t: "panel", tone: "orange", title: title, blocks: blocks }; }
  function map(title, blocks) { return { t: "panel", tone: "map", title: title, blocks: blocks }; }
  function qs(items, o) { return Object.assign({ t: "qs", items: items }, o || {}); }
  function lead(title, html) { return { t: "lead", title: title, html: html }; }

  var VALUE_GROUPS = [
    { title: "Character & Inner Integrity", words: ["Acceptance", "Alignment", "Authentic Expression", "Bravery", "Candor", "Clarity", "Courage", "Decency", "Dependability", "Devotion", "Dignity", "Discernment", "Discipline", "Emotional Intelligence", "Ethical Leadership", "Excellence", "Faithfulness", "Fortitude", "Grace", "Gratitude", "Honor", "Humility", "Impartiality", "Independence", "Inner Strength", "Justice-Oriented", "Mindfulness", "Moral Courage", "Nobility", "Patience", "Perseverance"] },
    { title: "Personal Responsibility", words: ["Principled Living", "Reliability", "Resilience", "Self-Awareness", "Self-Compassion", "Self-Discipline", "Self-Determination", "Self-Mastery", "Sincerity", "Steadfastness", "Temperance", "Transparency", "Truth", "Virtue"] },
    { title: "Leadership & Influence", words: ["Advocacy", "Bold Leadership", "Change-Making", "Clarity of Vision", "Conviction", "Diplomacy", "Empowerment of Others", "Ethical Influence", "Guidance", "Inspiration", "Legacy", "Mobilization", "Role Modeling", "Service Leadership", "Steward Leadership", "Transformational Leadership", "Voice"] },
    { title: "Relationships & Community", words: ["Belonging", "Care", "Collaboration", "Connection", "Cooperation", "Encouragement", "Engagement", "Equality", "Fellowship", "Generosity", "Goodwill", "Harmony", "Hospitality", "Human Dignity", "Interdependence", "Justice for All", "Kindredness", "Listening", "Mentorship", "Mutuality", "Partnership", "Presence", "Reconciliation", "Relational Trust", "Solidarity", "Stewardship", "Support", "Togetherness", "Unity"] },
    { title: "Growth & Achievement", words: ["Advancement", "Ambition", "Capability", "Competitiveness", "Confidence", "Continuous Improvement", "Courageous Action", "Dedication", "Drive", "Effectiveness", "Empowerment", "Endurance", "Entrepreneurship", "Excellence in Service", "Expansion", "Focus", "Forward-Thinking", "Impact", "Initiative", "Mastery", "Merit", "Motivation", "Performance", "Persistence", "Productivity", "Progress", "Purpose", "Results", "Self-Improvement", "Strategic Thinking", "Vision"] },
    { title: "Well-Being & Wholeness", words: ["Calm", "Centeredness", "Emotional Safety", "Energetic Alignment", "Flourishing", "Freedom", "Health", "Inner Peace", "Life Balance", "Presence", "Rest", "Self-Care", "Simplicity", "Sustainability", "Vitality", "Wholeness"] },
    { title: "Lifestyle & Experience", words: ["Adventure-Seeking", "Celebration", "Curated Living", "Elegance", "Excellence of Craft", "Exploration", "Flexibility", "Freedom of Expression", "Playfulness", "Refinement", "Spontaneity", "Wonder"] },
    { title: "Creativity & Innovation", words: ["Artistry", "Breakthrough Thinking", "Co-Creation", "Exploration", "Expressiveness", "Imagination", "Ingenuity", "Inventiveness", "Originality", "Resourcefulness", "Visionary Thinking"] },
    { title: "Contribution & Impact", words: ["Advancement of Others", "Collective Good", "Equitable Opportunity", "Ethical Stewardship", "Global Citizenship", "Human Rights", "Impactful Work", "Justice-Seeking", "Philanthropy", "Public Service", "Regeneration", "Social Responsibility", "Sustainability", "Systemic Change"] },
    { title: "Spiritual & Existential Values", words: ["Awakening", "Consciousness", "Divine Connection", "Enlightenment", "Faith in Humanity", "Higher Purpose", "Reverence", "Sacredness", "Soulful Living", "Transcendence"] }
  ];

  /* Live Authentically (40-48) */
  modules.push({ id: "la", principle: "la", title: "Live Authentically", short: "Live Authentically", group: "The Eight Principles", steps: [
    { id: "la-0", title: "Live Authentically", p: [40], blocks: [divider({ tone: "navy", icon: "la", title: "Live Authentically", sub: "Know your values & remain true to them", items: ["Being true to yourself.", "Having an inner clarity centered in core beliefs, grounded in ethics and honed through reflection.", "A sense of purpose pursued with integrity.", "The single most important quality of leadership."], foot: "Focuses on how you continually seek to understand and develop yourself" })] },
    { id: "la-1", title: "Pre-Live Session", p: [41, 42], blocks: [
      inst("PRE - LIVE AUTHENTICALLY"),
      { t: "p", html: "ATHENA’s first and foundational principle is Live Authentically. Live Authentically is the foundation of ATHENA leadership. It asks us to lead from alignment between our values, our behavior, and our impact—especially under pressure. This principle is not about perfection or performance. It is about awareness, responsibility, and the capacity for repair when misalignment occurs." },
      { t: "p", html: "The reflections in this section are designed to support you before and after the live session. Move through them at your own pace. There are no right answers—only honest ones." },
      lead("PRE-LIVE SESSION PREPARATION", "Complete this section after watching the Live Authentically video and before the live session. The purpose of this pre-work is to help you arrive at the live session grounded, aware, and open—not resolved or perfected. This work is for you and will not be collected."),
      lead("REFLECTION: UNDERSTANDING YOUR CORE VALUES", "Core values are the fundamental beliefs that guide your decisions, priorities, and sense of integrity. They often form through upbringing, life experiences, relationships, and pivotal moments. When your actions align with your values, leadership feels grounded and sustainable. When they do not, tension and disengagement often arise."),
      { t: "values5", title: "BELOW IDENTIFY YOUR TOP FIVE CORE VALUES:" },
      { t: "h3", text: "REFLECT BRIEFLY:" },
      qs(["Which of these values feels most alive or affirmed in your life right now?", "Which value feels most tested, constrained, or compromised in your current role, organization, or life context?"]),
      pi("Predictive Index Awareness", null, [
        { t: "p", html: "<b>You have recently explored your Predictive Index (PI) results. PI does not define who you are; it offers insight into your natural behavioral wiring—how you are most likely to think, respond, and act, particularly under pressure.<br>Reflect on the following:</b>" },
        qs(["In what ways does your natural PI profile support you in living and leading authentically?", "In what situations might your wiring pull you out of alignment, especially when you feel stress, urgency, expectation, or the need to perform?", "When I feel pressure to meet expectations or move quickly, I tend to..."], { bold: true })
      ]),
      { t: "mindwire" },
      { t: "h3", text: "Readiness for the Live Session", u: true },
      { t: "p", html: "Living authentically often requires noticing where alignment is being challenged. As you reflect on the questions posed at the end of the video, consider the following:" },
      qs(["Where in your leadership or life right now are you being asked—explicitly or subtly—to compromise alignment or integrity?", "What might it look like to respond authentically in that situation?", "What might it look like to respond in misalignment?"]),
      { t: "p", html: "You do not need to have clear answers or a polished response. Simply notice what arises and bring that awareness with you into the live session, where you will have space to explore these questions together." }
    ] },
    { id: "la-2", title: "Core Values Exercise Resource", p: [43, 44, 45], blocks: [
      { t: "banner", title: "Core Values Exercise Resource", serif: true },
      { t: "h2", text: "DEFINE YOUR TOP 5 CORE VALUES", center: true },
      { t: "h3", text: "What Core Values Are:", u: true },
      { t: "p", html: "Non-negotiable principles that guide your decisions — especially when it costs you something.<br>Not preferences. Not trends. Not “shoulds.”" },
      { t: "h3", text: "Step 1:", u: true },
      { t: "p", html: "Choose 10–15 Words from the below list and feel free to choose others that resonate with you more. The list below is a starting point." },
      { t: "p", html: "Pick what genuinely resonates. If it feels like you should pick it, don’t." },
      { t: "h3", text: "Step 2:", u: true },
      { t: "p", html: "Narrow to 5" },
      { t: "p", html: "Use these filters:<br>The Loss Test<br>Would you rather:" },
      { t: "ul", items: ["Always have A and never have B?", "The one you cannot live without is closer to core."] },
      { t: "h3", text: "The Cost Test", u: true },
      { t: "p", html: "Would you sacrifice comfort, approval, or opportunity to protect this?" },
      { t: "h3", text: "The Identity Test", u: true },
      { t: "p", html: "If you lost everything but kept this, would you still feel like yourself?" },
      { t: "h3", text: "Step 3:", u: true },
      { t: "p", html: "Define Them" },
      { t: "h3", text: "Step 4:" },
      { t: "p", html: "Complete Core Values exercise in the pre-live session work." },
      { t: "chips", groups: VALUE_GROUPS, min: 10, max: 15, core: 5 }
    ] },
    { id: "la-3", title: "Post-Live Session", p: [46, 47, 48], blocks: [
      inst("POST - LIVE AUTHENTICALLY"),
      { t: "h3", text: "COMPLETE THIS INTEGRATION POST LIVE SESSION", center: true },
      { t: "metaphor", title: "A Compass, Not a Map", html: "Living authentically is not about following a fixed path. It is about carrying a compass. When conditions change, the compass helps you reorient—without needing to know every step in advance." },
      { t: "p", html: "The purpose of this post-session reflection is integration and application. Authentic leadership is not a one-time insight—it is a practice that unfolds over time through awareness, choice, and responsibility." },
      integ("INTEGRATION — WHAT SHIFTED", [qs(["What concepts or insights about living and leading authentically felt new, clarifying, or affirming for you?", "Identify one discovery about yourself that you now appreciate more deeply.", "What pattern of thought, behavior, or self-expectation are you ready to let go of?"], { bold: true, plain: true })]),
      pi("APPLICATION", "Living Authentically in Practice (PI Integrated)", [
        { t: "p", html: "<b>Consider how your unique makeup shows up in everyday leadership. Reflect on how your Predictive Index profile influences:</b>" },
        { t: "ul", bold: true, items: ["How you speak up or hold back", "How you set boundaries", "How you navigate discomfort, conflict, or uncertainty", "How you repair misalignment when it occurs"] },
        qs(["Where do you experience strong alignment between who you are and what is expected of you?", "Where do you experience friction—and what might that friction be teaching you?"], { bold: true, plain: true })
      ]),
      { t: "h3", text: "AUTHENTICITY IN REAL MOMENTS" },
      { t: "p", html: "Consider a real situation from your life: You are in a meeting or conversation where a decision is moving forward quickly. Something about it feels misaligned with your values, but speaking up may slow progress, create discomfort, or challenge expectations." },
      { t: "p", html: "<b>Reflect:</b>" },
      qs(["What does your body notice first in this moment?", "How might your Predictive Index wiring influence your default response?", "What would it look like to respond in a way that preserves both alignment and relationship?"]),
      { t: "mindwire" },
      { t: "h3", text: "Commitment — A 30-Day Authentic Leadership Practice" },
      { t: "p", html: "Living authentically is a daily practice, not a destination. Over the next 30 days, identify:" },
      qs(["One behavior you will practice to live more authentically", "One context where this practice matters most (work, team, relationship, community)", "One indicator that will help you know this practice is strengthening alignment", "What support, boundary, reminder, or accountability will help you sustain this practice?"], { commit: true }),
      map("THE LIVE AUTHENTICALLY ALIGNMENT MAP", [
        { t: "p", html: "This is a living reflection tool designed to help you revisit and strengthen alignment over time. It is not a checklist or an evaluation—it is a mirror. Use the space below to capture what feels most important to carry forward." },
        qs(["Core values most at risk right now:", "PI strengths you can leverage under pressure:", "One recurring misalignment pattern you are becoming aware of:", "One 30-day experiment or practice you are committing to:", "One support or resource that will help you stay aligned:"], { plain: true, commit: true }),
        { t: "p", html: "<b><i>Return to this map periodically. Alignment is not static—it evolves as you do.</i></b>", center: true }
      ])
    ] }
  ] });

  /* Learn Constantly (49-54) */
  modules.push({ id: "lc", principle: "lc", title: "Learn Constantly", short: "Learn Constantly", group: "The Eight Principles", steps: [
    { id: "lc-0", title: "Learn Constantly", p: [49], blocks: [divider({ tone: "cream", icon: "lc", title: "Learn Constantly", sub: "Seek Knowledge", items: ["Continuous development of skills and competencies, regardless of level of achievement.", "Understanding built on experience, intuition and self-directed learning; the ability to learn from role models - negative as well as positive"], foot: "Focuses on how you continually seek to understand and develop yourself" })] },
    { id: "lc-1", title: "Pre-Live Session", p: [50, 51], blocks: [
      inst("PRE - LEARN CONSTANTLY"),
      lead("LEARN CONSTANTLY", "Learn Constantly is the second ATHENA Leadership Principle and the natural companion to Live Authentically. Authenticity without learning can harden into certainty. Learning keeps alignment alive. To learn constantly is to remain curious, humble, and responsive in a world that is continuously changing. Leadership is not a fixed state of expertise; it is a lifelong practice of listening, questioning, and evolving. Leaders who learn constantly understand that their perspective is always partial and that wisdom emerges through reflection, experience, and ethical discernment—not information alone."),
      { t: "p", html: "The reflections in this section are designed to support you before and after the live session. Move through them at your own pace. This work is meant to deepen awareness, not create pressure." },
      lead("PRE-LIVE SESSION PREPARATION", "Complete this section after watching the Learn Constantly video and before the live session. The purpose of this pre-work is to help you arrive at the live session open, curious, and grounded—not prepared with answers. This work is for you and will not be collected."),
      lead("REFLECTION: YOUR RELATIONSHIP WITH LEARNING", "Learning happens constantly—both intentionally and unintentionally. As leaders, the question is not whether we are learning, but how we are learning and what we are open to learning from."),
      { t: "h3", text: "REFLECT BRIEFLY:" },
      qs(["When you think about learning in your life right now, what emotions arise? (curiosity, resistance, excitement, fatigue, confidence, uncertainty)", "Where do you feel most open to learning?", "Where do you notice defensiveness, certainty, or hesitation?"]),
      lead("REFLECTION: FIXED AND GROWTH MINDSETS IN PRACTICE", "We all hold a mix of fixed and growth mindsets depending on the context.<br><b>Consider:</b>"),
      qs(["In what situations do you notice yourself becoming more fixed in your thinking?", "In what areas of your leadership do you naturally approach challenges as opportunities to learn?", "When I feel uncertain or challenged, my default response tends to be…"]),
      pi("Predictive Index Awareness", null, [
        { t: "p", html: "Your Predictive Index (PI) profile influences how you approach learning, feedback, and uncertainty." },
        { t: "p", html: "<b>Reflect on the following:</b>" },
        qs(["How does your PI wiring support curiosity, adaptability, or skill development? (e.g., A leader may show curiosity by asking questions and seeking feedback. Under pressure, that same wiring might limit learning if it leads to defensiveness or moving too quickly). This is only one possible expression. Notice what feels true for you.", "In what situations might your wiring make learning more challenging (e.g., discomfort with feedback, impatience, over-analysis)?"])
      ]),
      { t: "mindwire" },
      { t: "h3", text: "READINESS FOR THE LIVE SESSION" },
      { t: "p", html: "As you reflect on the questions posed at the end of the video, consider the following:" },
      qs(["What feedback have you resisted in the past?", "If you were to treat that feedback as information rather than judgment, what might it teach you?", "What wisdom might be available there—about yourself, your leadership, or your impact?"]),
      { t: "p", html: "You may also notice where certainty, habit, or past success have shaped how you respond to feedback or new perspectives. You do not need clear answers or a polished response. Simply notice what arises and bring that awareness with you into the live session, where we will have space to explore these questions together." }
    ] },
    { id: "lc-2", title: "Post-Live Session", p: [52, 53, 54], blocks: [
      inst("POST - LEARN CONSTANTLY"),
      { t: "h3", text: "COMPLETE THIS INTEGRATION POST LIVE SESSION", center: true },
      { t: "metaphor", title: "The Open Hand", html: "Learning constantly is like holding your leadership in an open hand rather than a closed fist. When the hand is closed, nothing new can enter. When the hand is open, learning, feedback, and perspective can move freely—without requiring you to drop what already matters." },
      { t: "p", html: "The purpose of this post-session reflection is integration and application. Learning is not something we complete—it is something we return to, again and again, through curiosity, awareness, and intentional choice." },
      integ("INTEGRATION — WHAT SHIFTED", [qs(["What insights about learning, curiosity, or wisdom felt most meaningful or clarifying for you?", "What did you notice about your own habits, assumptions, or learning edges through this session?", "Where do you feel invited to remain more teachable—in your leadership or your life?"], { bold: true })]),
      pi("APPLICATION", "Learn Constantly in Practice (PI Integrated)", [
        { t: "p", html: "<b>Learning constantly requires translating insight into everyday leadership behavior.<br>Reflect on how your Predictive Index profile influences:</b>" },
        { t: "ul", bold: true, items: ["How you receive feedback", "How you respond to uncertainty or change", "How you seek out new perspectives", "How you approach skill development or growth opportunities"] },
        qs(["Where does learning feel natural and energizing for you?", "Where does it feel uncomfortable or effortful—and what might that discomfort be teaching you?"], { bold: true, plain: true })
      ]),
      { t: "h3", text: "LEARNING IN REAL MOMENTS" },
      { t: "p", html: "Consider a real situation from your life: You receive feedback, information, or a perspective that challenges how you see yourself, your work, or your impact. Your instinct may be to defend, explain, dismiss, or move quickly past it." },
      { t: "p", html: "<b>Reflect:</b>" },
      qs(["What do you notice in your body when this happens?", "How might your PI wiring shape your immediate reaction?", "What would it look like to pause and treat this moment as information rather than judgment?"]),
      { t: "mindwire" },
      { t: "h3", text: "Commitment — A 30-Day Learning Practice" },
      { t: "p", html: "Learning constantly is sustained through small, intentional practices. Over the next 30 days, identify:" },
      qs(["One learning edge you want to intentionally explore", "One practice or behavior you will use to support that learning (e.g., listening differently, seeking feedback, reading, asking questions)", "One context where this practice matters most", "One indicator that will help you know this learning is shaping your leadership"], { commit: true }),
      map("THE LEARN CONSTANTLY ALIGNMENT MAP", [
        { t: "p", html: "This Alignment Map is a living reflection tool designed to help you revisit and strengthen your relationship with learning over time. It is not a checklist—it is a compass. Use the space below to capture what feels most important to carry forward." },
        qs(["Where curiosity feels alive right now:", "Where certainty may be limiting growth:", "PI strengths you can leverage to support learning:", "One recurring learning edge you are becoming aware of:", "One 30-day learning you are committing to:"], { plain: true, commit: true }),
        { t: "p", html: "<b><i>Return to this map periodically. Learning is not linear—it deepens as awareness grows.</i></b>", center: true }
      ])
    ] }
  ] });

  /* Build Relationships (55-64) */
  modules.push({ id: "br", principle: "br", title: "Build Relationships", short: "Build Relationships", group: "The Eight Principles", steps: [
    { id: "br-0", title: "Build Relationships", p: [55], blocks: [divider({ tone: "navy", icon: "br", title: "Build Relationships", sub: "Engage, empower, & entrust", items: ["Connecting genuinely with yourself and those around you.", "A willingness to bond with others, profoundly and productively, with trust and respect; to reach beyond status and self-interest in search of meaningful connections"], foot: "Focuses on how you embrace and encourage others" })] },
    { id: "br-1", title: "Pre-Live Session", p: [56, 57, 58], blocks: [
      inst("PRE - BUILD RELATIONSHIPS"),
      lead("BUILD RELATIONSHIPS", "Build Relationships is the third ATHENA Leadership Principle and the natural expression of living authentically and learning constantly. Leadership does not happen in isolation. It happens in relationship—with ourselves, with others, and with the systems we are part of. Building relationships is not about proximity or politeness. It is about presence, trust, and intention. Strong relationships create the conditions for learning, collaboration, repair, and shared power. When leaders prioritize outcomes over connection, trust erodes. When leaders choose connection first, outcomes become more sustainable and humane."),
      { t: "p", html: "The reflections in this section are designed to support you before and after the live session. Move through them at your own pace. This work is meant to deepen awareness, not create pressure." },
      lead("PRE-LIVE SESSION PREPARATION", "Complete this section after watching the Build Relationships video and before the live session. The purpose of this pre-work is to help you arrive at the live session aware of how you currently relate—to yourself and to others—not prepared with solutions. This work is for you and will not be collected."),
      { t: "p", html: "In addition to watching the video, please read the Eight Dimensions of Wellness and the Self-Care overview prior to the live session. These will be referenced during the session." },
      lead("REFLECTION: READINESS FOR THE LIVE SESSION", "As you reflect on the questions posed at the end of the video, consider the following:"),
      qs(["Where in your leadership are you prioritizing outcomes over relationships?", "Where have you noticed this dynamic in another leader or system?", "What might shift if you slowed down and chose connection first?", "How might that choice impact you—and the people around you?"]),
      { t: "p", html: "You do not need answers. Simply notice what arises and bring that awareness with you into the live session, where these questions will be explored together." },
      { t: "h2", text: "Expanding the Lens: Relationships, Identity, and Awareness", center: true },
      { t: "p", html: "Building relationships begins with intention. But intention alone does not determine impact. Every relationship is shaped by identity, lived experience, and the broader systems we operate within. Dimensions such as race, gender, age, disability, culture, faith, sexual orientation, socioeconomic background, and professional status influence how leadership spaces are experienced. Some individuals and communities have historically been marginalized or underrepresented in positions of influence and decision-making." },
      { t: "p", html: "To be marginalized means to be pushed to the edges of social, economic, or political power, not because of personal deficiency, but because of systemic patterns, exclusionary norms, or structural barriers. Underrepresentation refers to the limited presence or visibility of certain groups in leadership spaces relative to their presence in the broader population." },
      { t: "p", html: "Acknowledging these realities is not about assigning blame. It is about recognizing that leadership spaces have not always been equally accessible, and that relationship-building requires awareness of how history and systems shape present experience." },
      { t: "h2", text: "Cross-Difference Leadership", center: true },
      { t: "p", html: "Cross-difference refers to building relationships across meaningful differences in identity, background, or lived experience." },
      { t: "p", html: "Leadership across difference asks us to:" },
      { t: "ul", items: ["Stay curious when perspectives diverge", "Notice our assumptions", "Recognize that others may experience the same space differently", "Remain present even when discomfort arises"] },
      { t: "p", html: "When leaders build relationships only with those who feel familiar, we unintentionally reinforce existing patterns of inclusion and exclusion. When we build across difference, we expand perspective, deepen empathy, and strengthen collective capacity." },
      { t: "h2", text: "Unconscious Bias and Self-Awareness", center: true },
      { t: "p", html: "Unconscious bias refers to the automatic assumptions and associations we carry, shaped by culture, upbringing, media, and personal experience. These patterns influence who we trust, who we perceive as competent, who we feel comfortable approaching, and who we may overlook, often without realizing it. Bias does not make us bad leaders. Lack of awareness limits leadership." },
      { t: "p", html: "Self-awareness is the bridge between intention and impact. Research by organizational psychologist Dr. Tasha Eurich found that while 95% of people believe they are self-aware, only about 10–15% actually demonstrate high levels of self-awareness. Her research shows that leaders who develop both internal self-awareness (understanding their own values, reactions, and patterns) and external self-awareness (understanding how others experience them) are more effective, trusted, and inclusive." },
      { t: "p", html: "As you prepare for your live session, reflect gently:" },
      qs(["Who do you naturally gravitate toward in unfamiliar spaces?", "Who might you unintentionally overlook?", "When discomfort arises in cross-difference interactions, how do you typically respond?", "When have you personally felt unseen or underestimated? How did that affect your engagement?"]),
      { t: "p", html: "This reflection is not about self-criticism. It is about expanding capacity. Building relationships that are authentic, equitable, and sustaining requires awareness of both our internal patterns and the systemic dynamics shaping the room." },
      { t: "h2", text: "Preparing for the Live Session: Awareness in Action", center: true },
      { t: "p", html: "In our live session, we will explore how everyday leadership decisions, including small, seemingly neutral choices, can reflect deeper relational patterns." },
      { t: "p", html: "To prepare, take a few minutes to reflect on the following.<br>When you enter a new environment (meeting, conference, classroom, networking space):" },
      qs(["What factors influence where you sit or who you approach first?", "Do you prioritize familiarity, efficiency, perceived expertise, similarity, or comfort?", "How quickly do you make those decisions?"]),
      { t: "p", html: "Additionally, consider how your Predictive Index wiring may influence this." },
      { t: "ul", items: ["If you prefer structure and predictability, you may gravitate toward environments or people that feel steady and familiar.", "If you prefer variety and spontaneity, you may seek novelty or visible energy.", "If you value depth, you may scan for one meaningful connection rather than many interactions."] },
      { t: "p", html: "None of these patterns are right or wrong. They are simply starting points. Now expand your reflection:" },
      qs(["How might someone with a different identity or lived experience experience the same space differently?", "How might historical patterns of inclusion or exclusion influence how safe someone feels when entering a room?", "How might your seating choice, initial conversation, or body language signal openness — or distance?"]),
      { t: "p", html: "This reflection is not about judgment. It is about preparation. The live session will invite you to observe your patterns in real time. Arriving with awareness will allow you to contribute thoughtfully and engage with clarity." }
    ] },
    { id: "br-2", title: "Practicing Self-Care", p: [59, 60], blocks: [
      inst("PRACTICING SELF - CARE"),
      { t: "h2", text: "A Leadership Practice, Not a Luxury", center: true },
      { t: "p", html: "Self-care is not a luxury or a reward; it is a responsibility. Like the airplane oxygen mask analogy, we must care for ourselves before we can sustainably support others. When we tend to our inner well-being, we strengthen our capacity to lead with clarity, compassion, courage, and integrity—especially in times of stress, complexity, and change." },
      { t: "p", html: "Cultivating a healthy relationship with ourselves allows our life force to flow more freely, enabling us to serve our families, communities, work, passions, and the world from a place of wholeness rather than depletion." },
      { t: "h3", text: "SELF-AWARENESS & AUTHENTIC IDENTITY: Living from truth, not conditioning" },
      { t: "ul", items: ["Getting to know yourself wholly and loving yourself unconditionally is one of the most meaningful journeys you will ever take. This self-knowledge creates the freedom to live and lead authentically.", "Stop judging yourself through comparison to others. Your authenticity is your superpower. There is no one else like you on the planet—own it.", "Be aware of how you feel, mindful of what you think, and deliberate with what you want. You deserve to be, do, and have what aligns with your values and purpose.", "Forgive yourself. Fear, shame, guilt, and anger grow in silence and denial. Bring what you’ve been through into the light—reveal it, feel it, heal it. Each moment offers a clean slate."] },
      { t: "h3", text: "INNER DIALOGUE, EMOTIONAL HEALTH & HEALING: Creating safety within" },
      { t: "ul", items: ["Be aware of the chatter from the inner coaches and critics in your mind. Learn when to soothe them, question them, or gently quiet them.", "Be kind to yourself. When you speak to yourself, remember you are speaking to your inner child. Let your inner voice be rooted in compassion and unconditional love.", "Allow yourself to feel. The full spectrum of human emotion is part of being alive. Rather than judging yourself for not being happy all the time, honor each feeling as a meaningful note in the symphony of your life.", "Pay attention when something or someone “presses your buttons.” Triggers are not failures—they are signals pointing toward areas still seeking care and healing.", "Remember: hurt people hurt people; healed people heal people; whole people help people. Commit to healing your whole self—not to be perfect, but to be present."] },
      { t: "h3", text: "BODY, ENERGY & REST: Sustainability over burnout" },
      { t: "ul", items: ["Nourish your body with food and drink that supports vitality and well-being. Let food be a form of care, not control or punishment.", "Move your body regularly in ways that feel supportive and life-giving to you. You cannot shame yourself into wholeness—you can only love yourself there.", "Honor rest as essential, not optional. Your worth is not measured by productivity. Sustainable leadership requires cycles of action and restoration.", "Take time each day to calm your mind. Breathe, allow thoughts to pass without attachment, and give yourself permission to simply be."] },
      { t: "h3", text: "RELATIONSHIPS, BOUNDARIES & SUPPORT: Leading in healthy connection" },
      { t: "ul", items: ["Open yourself to giving and receiving love—from yourself and others. Strong, healthy relationships are built on peace, trust, respect, and spaciousness.", "Surround yourself with people who encourage, support, and uplift you—and be that person for others. When possible, create distance from relationships that consistently diminish your well-being.", "Learn to say “no.” Your time and energy are valuable. Choose commitments that align with your values and current capacity.", "Reach out and ask for help. You are not meant to do life alone. People often want to support you—they simply need to know how."] },
      { t: "h3", text: "GROWTH, CURIOSITY & RESILIENCE: Learning through life" },
      { t: "ul", items: ["Get curious. Try new things. Growth often begins just outside your comfort zone—and confidence grows through action.", "Perceived failure is simply feedback. Be persistently committed to your vision and compassionately patient with yourself and others.", "Remind yourself how adept you are at navigating change. You have already adapted to more change than you realize—and you can handle what comes next.", "Let go of limiting beliefs. Even when you cannot yet see results, growth may already be happening beneath the surface."] },
      { t: "h3", text: "PURPOSE, CREATIVITY & JOY: Living and leading from aliveness" },
      { t: "ul", items: ["Follow your passion. Pay attention to what lights you up and gives you energy—this is where fulfillment and impact intersect.", "Answer the call of creativity in whatever form it appears. Expression is a powerful tool for healing, insight, and innovation.", "Follow the fun. Life is not meant to be an endless struggle. Joy is not frivolous—it is a compass.", "Celebrate your wins, both big and small. Acknowledging progress builds confidence, momentum, and self-trust.", "End each day by reflecting on the top five moments you appreciated most. Gratitude strengthens resilience and perspective.", "No one can take your joy. Happiness is an inside job—apply daily."] },
      { t: "h3", text: "INTEGRATION PRACTICE", u: true, center: true },
      { t: "p", html: "<b>Reflection Exercise:</b> Review these self-care practices with curiosity rather than judgment." },
      qs(["Which ones are already supporting you well?", "Which ones feel challenging or out of reach right now—and why?", "Identify one small, compassionate step you can take this week to care for yourself more intentionally."]),
      { t: "foot", text: "<i>Predominantly written by and inspired by the work of Polo REO Tate, author, actor and artist.</i>" }
    ] },
    { id: "br-3", title: "The Eight Dimensions of Wellness", p: [61], blocks: [
      { t: "banner", title: "The Eight Dimensions of Wellness", sub: "INSPIRED BY AND ORIGINALLY CREATED BY THE INTERNATIONALLY RECOGNIZED PIONEER IN  PEER-DRIVEN WELLNESS DR. PEGGY SWARBRICK, PHD FAOTA", small: true },
      { t: "p", html: "The concept of wellness is often multidimensional, encompassing various aspects of an individual's life. While different models may define wellness dimensions in slightly different ways, a commonly accepted framework includes the following eight dimensions of wellness:" },
      { t: "defs", items: [
        ["Environmental", "Living Space", "Maintaining a healthy living space and promoting harmony with the surrounding environment. This includes sustainable practices, being mindful of one's impact on the planet, and creating surroundings that contribute to and support well-being."],
        ["Emotional", "Understanding", "Understanding and managing one’s emotions effectively. It involves self-awareness, emotional regulation, resilience, and the ability to respond rather than react—especially in moments of stress or tension. It supports healthy communication, empathy, and the capacity to remain present and grounded in relationship with others. It is essential for creating trust, repairing conflict, and sustaining meaningful, respectful connections over time."],
        ["Intellectual", "Mental", "Engaging in continuous learning and stimulating mental activities. Intellectual wellness encourages creativity, critical thinking, and a lifelong pursuit of knowledge."],
        ["Financial", "Management", "The ability to manage financial resources effectively. Financial wellness involves budgeting, saving, investing, and making informed decisions to achieve financial goals and reduce stress related to money."],
        ["Social", "Relationships", "The quality of relationships and social interactions. This includes building and maintaining healthy, intentional connections rooted in trust, respect, and emotional safety. It involves feeling seen, valued, and able to show up authentically in relationship with others. It fosters a sense of belonging, mutual accountability, and shared responsibility, while also contributing to the well-being of teams, organizations, and the broader community."],
        ["Spiritual", "Life Purpose", "Seeking to expand meaning and purpose in life. It can include exploring beliefs, values, and practices that contribute to a sense of inner peace, purpose, and connection to something greater than oneself."],
        ["Physical", "Healthy Body", "Regular exercise, proper nutrition, and adequate sleep. Physical wellness also includes avoiding harmful habits."],
        ["Occupational", "Career", "Finding satisfaction and fulfillment in one's work or chosen career. This dimension involves pursuing personal goals, balancing work and leisure, and striving for a positive work-life harmony."]
      ] },
      { t: "note", light: true, html: "Relationships are strengthened or strained by every dimension of wellness; when individuals attend to their physical, emotional, and inner well-being, they are better able to show up with presence, patience, and integrity in relationship with others. These dimensions are interconnected, and improvements in one area often positively impact others. Achieving balance across these dimensions is considered essential for overall well-being and a higher quality of life. Keep in mind that individual perspectives on wellness may vary, and people may prioritize different dimensions based on their unique needs and values." }
    ] },
    { id: "br-4", title: "Post-Live Session", p: [62, 63, 64], blocks: [
      inst("POST - BUILD RELATIONSHIPS"),
      { t: "h3", text: "COMPLETE THIS INTEGRATION POST LIVE SESSION", center: true },
      { t: "metaphor", title: "Relationship as Soil", html: "Outcomes are what we harvest. Relationships are the soil. When soil is depleted, even the strongest seeds struggle. When soil is tended, growth becomes sustainable." },
      { t: "p", html: "The purpose of this post-session reflection is integration and application. Relationships are not built through intention alone—they are shaped through presence, choice, and care over time." },
      integ("INTEGRATION — WHAT SHIFTED", [qs(["What stood out to you about how you build, maintain, or avoid relationships?", "Where did you notice yourself prioritizing outcomes, efficiency, or certainty over connection?", "What felt affirming in this session? What felt uncomfortable or challenging?"], { bold: true })]),
      pi("APPLICATION", "Relationships in Practice (PI & Wellness Integrated)", [
        { t: "p", html: "<b>Building relationships requires awareness of both our internal wiring and our capacity to be present.</b>" },
        { t: "h4", text: "Predictive Index and Relationships", u: true },
        { t: "p", html: "<b>Your Predictive Index (PI) profile influences how you initiate connection, respond to difference, and navigate relational tension. Reflect on the following:</b>" },
        qs(["How do you naturally approach building relationships?", "How do you respond when relationships feel uncomfortable, slow, or uncertain?", "How might your wiring support connection—and where might it unintentionally limit it under pressure? (e.g., A natural relational strength can support connection—or limit it when stress or urgency is present. Notice where this shows up for you)."], { bold: true }),
        { t: "h4", text: "Wellness, Self-Care, and Relationship Capacity", u: true },
        { t: "p", html: "<b>Relationships are strengthened or strained by our overall wellbeing. When we are depleted, rushed, or disconnected from ourselves, our ability to be present with others is compromised.</b>" },
        { t: "p", html: "<b>Consider the Eight Dimensions of Wellness and your self-care practices:</b>" },
        qs(["Which dimension most affects how you show up in relationships right now?", "Where might tending to yourself increase your patience, presence, or openness with others?"], { bold: true })
      ]),
      { t: "mindwire" },
      { t: "p", html: "<b>Application — Building Relationships Intentionally:</b> Relationships deepen through small, consistent choices.<br><b>Reflect</b>:" },
      qs(["Who is one person you want to build or strengthen a relationship with more intentionally?", "Who is someone from a different background, identity, or experience you could reach out to?", "What is one small, relational next step you can take?"]),
      { t: "h3", text: "Commitment — A 30-Day Relationship Practice" },
      { t: "p", html: "Over the next 30 days, identify:" },
      qs(["One relational habit you want to practice (e.g., listening without interruption, following up, slowing down)", "One context where this practice matters most", "One indicator that will help you know this practice is strengthening trust or connection"], { commit: true }),
      map("THE BUILDING RELATIONSHIPS ALIGNMENT MAP", [
        { t: "p", html: "This Alignment Map is a living reflection tool designed to help you revisit how you build and sustain relationships over time. It is not a checklist—it is a compass." },
        { t: "p", html: "Use the space below to capture what feels most important to carry forward." },
        qs(["Relationship with self that needs attention:", "One key relationship you want to tend intentionally:", "One wellness practice that supports your capacity for connection:", "One relational pattern you are becoming aware of:", "One 30-day relational action you are committing to:"], { plain: true, commit: true }),
        { t: "p", html: "<b><i>Return to this map periodically. Relationships grow through presence, not perfection.</i></b>", center: true }
      ])
    ] }
  ] });

  /* Foster Collaboration (65-71) */
  modules.push({ id: "fc", principle: "fc", title: "Foster Collaboration", short: "Foster Collaboration", group: "The Eight Principles", steps: [
    { id: "fc-0", title: "Foster Collaboration", p: [65], blocks: [divider({ tone: "cream", icon: "fc", title: "Foster Collaboration", sub: "Welcome others to the work", items: ["Valuing the gifts each individual brings, with a perspective that is global and a spirit that is inclusive.", "Deepening understanding, awareness and knowledge through diversity.", "Encouraging participation from those who are often overlooked."], foot: "Focuses on how you embrace and encourage others" })] },
    { id: "fc-1", title: "Pre-Live Session", p: [66], blocks: [
      inst("PRE - FOSTER COLLABORATION"),
      lead("FOSTER COLLABORATION", "Foster Collaboration is the natural evolution of building authentic relationships. Once trust, presence, and mutual respect exist, leadership responsibility shifts—from leading for others to leading with others. Collaboration is not consensus-building or efficiency at all costs. It is ethical power-sharing. It asks leaders to intentionally widen the circle of influence, ensuring that those closest to the work—and those historically overlooked—are meaningfully invited into decision-making. When collaboration is practiced with integrity, outcomes strengthen because ownership, accountability, and wisdom are shared. This module builds directly on Build Relationships and invites you to move from connection into co-creation."),
      lead("PRE-LIVE SESSION PREPARATION", "Complete this section after watching the Foster Collaboration video and reading the assigned materials, and before the live session. Required Pre-Reads and Viewing:"),
      { t: "ul", items: ["Foster Collaboration video", "ATHENA’s Seven C’s for Fostering Collaboration"] },
      { t: "p", html: "These materials establish shared language and a relational framework that will be actively used during the live session." },
      lead("REFLECTION: READINESS FOR THE LIVE SESSION", "As you reflect on the questions posed at the end of the video, consider:"),
      qs(["Who is currently missing from your decision-making table?", "Whose perspective is most impacted by the outcomes, yet least represented in the process?", "What would it take—not symbolically, but meaningfully—to invite them into the conversation?", "How might collaboration strengthen outcomes if leadership were shared rather than held?"]),
      { t: "p", html: "You do not need solutions. Simply notice what arises and bring that awareness into the live session, where these questions will be explored together." }
    ] },
    { id: "fc-2", title: "ATHENA’s Seven C’s for Fostering Collaboration", p: [67], blocks: [
      { t: "banner", title: "ATHENA’s Seven C’s for Fostering Collaboration" },
      { t: "p", html: "<b>ATHENA’s Seven C’s for Fostering Collaboration provide a shared relational framework that supports conscious leadership, ethical power-sharing, and collective intelligence. They help leaders prevent projecting unresolved internal conflict onto others, cultivate trust and safety, and create the conditions where collaboration can genuinely thrive—internally and externally.</b>" },
      { t: "defs", items: [
        ["Calm", "Regulate Nervous System", "Calm begins with the body. Collaboration requires leaders to regulate their nervous system, to respond with presence rather than react from stress. Practices such as slow, intentional breathing, pausing before responding, and noticing physical cues support grounded engagement. When leaders are calm, they create psychological safety—allowing others to think clearly, speak honestly, and participate fully."],
        ["Curiosity", "Openness", "Curiosity invites leaders to remain open to perspectives beyond their own. It involves asking thoughtful, open-ended questions, suspending judgment, and listening to understand rather than convince. Curiosity shifts collaboration away from defensiveness and toward exploration. When leaders question their assumptions and remain receptive to multiple viewpoints, collective insight and innovation emerge."],
        ["Compassion", "Empathy", "Compassion is the intentional practice of empathy in action. It asks leaders to listen deeply, acknowledge lived experience, and respond with care and respect. Compassion does not mean avoiding accountability—it means holding others with humanity while navigating challenge. When compassion guides communication, trust strengthens, conflict becomes constructive, and collaboration becomes sustainable."],
        ["Creativity", "Explore", "Creativity invites adaptability and openness to new pathways. Collaborative creativity moves teams beyond blame and rigid thinking toward shared problem-solving. Leaders foster creativity by encouraging exploration, welcoming feedback, and refining ideas iteratively. When creativity is supported, innovation becomes a collective process rather than an individual burden."],
        ["Courage", "Face your Shadows", "Courage requires leaders to look inward before responding outward. This includes acknowledging self-limiting beliefs, unconscious patterns, and projections that can distort collaboration. Courage shows up in honest conversations, accountability, and the willingness to be vulnerable—even when outcomes feel uncertain. Facing one’s shadows is essential for building trust and preventing the misuse of power in collaborative spaces."],
        ["Consciousness", "Fully Present", "Conscious leadership means being fully present and self-aware in the moment. This includes noticing emotions, intentions, motives, and triggers without allowing them to unconsciously drive behavior. Conscious leaders remain grounded, reflective, and responsive—rather than reactive. Presence interrupts destructive cycles and creates space for intentional, inclusive collaboration to unfold."],
        ["Coherence", "Mind & Heart", "Coherence is the integration of intellect and emotional intelligence. When the mind (analysis, logic, planning) and heart (values, intuition, empathy) are aligned, leaders act with clarity and integrity. This alignment supports ethical decision-making, relational trust, and consistency between intention and action. Practices such as reflection, mindfulness, and emotional regulation help cultivate mind–heart coherence in collaborative leadership.", true]
      ] },
      { t: "note", light: true, html: "<b>When practiced together, the Seven C’s create the conditions for collaboration to move from performative inclusion to shared ownership. They support ethical power-sharing, invite all voices into decision-making, and allow leadership to circulate rather than consolidate. Through calm presence, courageous self-awareness, and relational integrity, collaboration becomes not just a strategy—but a lived leadership practice.</b>" }
    ] },
    { id: "fc-3", title: "Post-Live Session", p: [68, 69, 70, 71], blocks: [
      inst("POST - FOSTER COLLABORATION"),
      { t: "h3", text: "COMPLETE THIS INTEGRATION POST LIVE SESSION", center: true },
      { t: "metaphor", title: "Collaboration as an Open Circle", html: "Leadership is not a closed circle with a single voice at the center. It is an open circle that expands as wisdom is invited in. The strength of the circle depends on who is included—and who is not." },
      { t: "p", html: "The purpose of this post-session reflection is integration and application. Collaboration is not a moment of inclusion; it is an ongoing practice of awareness, invitation, and shared responsibility." },
      integ("INTEGRATION — WHAT SHIFTED", [qs(["What shifted in your understanding of collaboration during the live session?", "Where did you notice tendencies to hold control, move quickly, or prioritize efficiency over inclusion?", "What perspectives or voices stood out as essential but often missing in collaborative spaces?"], { bold: true })]),
      pi("APPLICATION", "Collaboration in Practice (PI & Seven C’s)", [
        { t: "p", html: "<b>Effective collaboration requires both self-awareness and relational skill.</b>" },
        { t: "h4", text: "Predictive Index and Collaboration", u: true },
        { t: "p", html: "<b>Your Predictive Index (PI) profile influences how you approach teamwork, decision-making, and conflict within collaborative settings.<br>Reflect:</b>" },
        qs(["Where does your wiring naturally support collaboration?", "Where might it unintentionally create blind spots or imbalance?", "In what ways can you serve as a balance rather than a block in group dynamics? (e.g., A natural leadership strength may stabilize a team—or dominate it if left unchecked. Awareness allows you to flex intentionally)."], { bold: true }),
        { t: "h4", text: "ATHENA’s Seven C’s in Action", u: true },
        { t: "p", html: "<b>Review the Seven C’s for Fostering Collaboration and reflect:</b>" },
        qs(["Which C feels most accessible to you right now?", "Which C feels most challenging?", "How might practicing this C change the quality of collaboration you are part of?"], { bold: true })
      ]),
      { t: "mindwire" },
      lead("APPLICATION: FROM RELATIONSHIPS TO NETWORKS", "Collaboration builds on relationships but moves beyond one-to-one connection into intentional network building.<br>Reflect:"),
      qs(["Who are the people you regularly collaborate with?", "Who is rarely included but could meaningfully strengthen outcomes?", "Who might benefit from being connected within your existing network?", "Identify one intentional connection or introduction you are willing to facilitate over the next 30 days."]),
      lead("NAVIGATING COLLABORATION AND CONFLICT", "Diverse collaboration often includes tension. Healthy collaboration does not avoid conflict—it navigates it skillfully.<br>Reflect:"),
      qs(["What is your default approach to conflict in collaborative settings?", "How do you typically respond when perspectives differ sharply from your own?", "What would it look like to flex your approach in service of the collective outcome?"]),
      { t: "h3", text: "Commitment — A 30-Day Collaboration Practice" },
      { t: "p", html: "Over the next 30 days, identify:" },
      qs(["One way you will share leadership (inviting input, distributing ownership, elevating others)", "One group or context where this practice matters most", "One signal that collaboration is strengthening trust and outcomes"], { commit: true }),
      map("THE FOSTER COLLABORATION ALIGNMENT MAP", [
        { t: "p", html: "Use this Alignment Map to capture what you are carrying forward." },
        qs(["A decision-making space that needs broader inclusion:", "A voice or perspective you commit to inviting in:", "A Seven C you will practice intentionally:", "A collaboration habit you are ready to release:", "One concrete action you will take in the next 30 days:"], { plain: true, commit: true }),
        { t: "p", html: "<b><i>Return to this map as a living reflection. Collaboration deepens<br>when leadership is shared with intention.</i></b>", center: true }
      ])
    ] }
  ] });

  /* Act Courageously (72-82) */
  var COURAGE_FORMS = ["Intellectual Courage (challenging beliefs, learning and unlearning)", "Social Courage (advocating for fairness, inclusion, and justice)", "Interpersonal Courage (honest communication, boundaries, difficult conversations)", "Moral Courage (acting ethically, standing by your values)", "Emotional Courage (vulnerability, emotional honesty, self-awareness)", "Physical Courage (endurance, resilience, facing physical challenge)", "Spiritual Courage (living with purpose, trusting the unknown)", "Creative Courage (risk-taking, innovation, embracing failure)", "Adaptive Courage (responding to change, uncertainty, adversity)", "Leadership Courage (responsibility, decision-making, vision)"];

  modules.push({ id: "ac", principle: "ac", title: "Act Courageously", short: "Act Courageously", group: "The Eight Principles", steps: [
    { id: "ac-0", title: "Act Courageously", p: [72], blocks: [divider({ tone: "navy", icon: "ac", title: "Act Courageously", sub: "Dare", items: ["The willingness to stand alone, speak the truth, question assumptions or challenge the status quo.", "The determination to act honorably, consistent with your values, even in the face of fear or loss."], foot: "Aligns with how you live out your convictions" })] },
    { id: "ac-1", title: "Pre-Live Session", p: [73], blocks: [
      inst("PRE - ACT COURAGEOUSLY"),
      lead("ACT COURAGEOUSLY", "Act Courageously is where insight becomes action. After living authentically, learning constantly, building relationships, and fostering collaboration, leaders inevitably arrive at moments that require choice. Courage is not the absence of fear—it is integrity in motion. It is the willingness to move forward with clarity, values, and responsibility, even when discomfort, uncertainty, or risk is present."),
      { t: "p", html: "This principle invites you to acknowledge fear honestly, regulate your response to it, and choose aligned action anyway. Courageous leadership steadies others—not because fear disappears, but because responsibility is honored." },
      lead("PRE-LIVE SESSION PREPARATION", "Complete this section after watching the Act Courageously video and reading the supplemental Courage resource, and before the live session."),
      { t: "p", html: "Required Pre-Reads and Viewing" },
      { t: "ul", items: ["Act Courageously video", "Courage: A Supplemental Resource for Reflection, Growth, and Application"] },
      { t: "p", html: "These materials establish a shared understanding of courage as a multidimensional, lived practice that will be actively referenced during the live session." },
      lead("REFLECTION: READINESS FOR THE LIVE SESSION", "As you reflect on the questions posed at the end of the video, consider:"),
      qs(["What fear might currently be influencing your hesitation?", "How does that fear show up—in your body, thoughts, or behavior?", "If fear did not need to disappear, what might courage look like with it present?"]),
      { t: "p", html: "You do not need to resolve this fear. Simply notice it and bring that awareness into the live session, where courage will be explored as a regulated, values-based choice rather than a performance." }
    ] },
    { id: "ac-2", title: "10 Types of Courage", p: [74, 75, 76], blocks: [
      { t: "banner", title: "10 Types of Courage" },
      { t: "h2", text: "A Supplemental Resource for Reflection, Growth, and Application", center: true },
      { t: "p", html: "Courage is not a single trait or dramatic act. It is a dynamic, lived practice that shows up differently depending on the context, the stakes, and the inner work required. Courage often asks us to stretch beyond comfort, confront fear with honesty, and act in alignment with our values—even when the outcome is uncertain." },
      { t: "p", html: "Below are distinct yet interconnected expressions of courage. Together, they offer a holistic framework for understanding how courage can be cultivated, embodied, and applied across personal, relational, and leadership contexts." },
      { t: "defs", items: [
        ["Physical", "Bravery & Endurance", "Physical courage is expressed when individuals face physical risk, hardship, or sustained challenge. It is often associated with bravery, perseverance, and resilience—the capacity to keep going even when the body is tired or the path is demanding."],
        ["Emotional", "Feelings & Vulnerability", "Emotional courage involves facing one’s inner world with honesty. It includes acknowledging fear, grief, anger, or uncertainty; expressing feelings appropriately; and allowing oneself to be seen authentically. Emotional courage is essential for healing, resilience, and meaningful connection."],
        ["Moral", "Ethical Action", "Moral courage is the ability to stand firm in one’s values and ethics, even when doing so is unpopular or costly. It requires integrity, accountability, and a commitment to doing what is right rather than what is easy. Moral courage anchors leadership in principle rather than convenience."],
        ["Leadership", "Responsibility & Vision", "Leadership courage is demonstrated when individuals take responsibility, make difficult decisions, and lead with conviction. It involves holding complexity, navigating risk, and inspiring others through integrity, presence, and alignment with a clear vision."],
        ["Spiritual", "Purpose & Meaning", "Spiritual courage involves confronting existential questions, uncertainty, and the unknown while remaining aligned with one’s deeper sense of purpose or values. It asks us to trust life, remain grounded in meaning, and live in integrity with what we believe—even when clarity is incomplete."],
        ["Intellectual", "Mindset", "Intellectual courage is the willingness to challenge one’s own beliefs, question assumptions, and remain open to new information. It requires humility, curiosity, and a growth mindset—the capacity to learn, unlearn, and relearn. This form of courage invites us to sit with discomfort, examine bias, and expand our thinking without defensiveness."],
        ["Interpersonal", "Communication", "Interpersonal courage involves navigating challenging relationships and engaging in honest, respectful dialogue. It includes having difficult conversations, setting boundaries, addressing conflict directly, and communicating with clarity and compassion. This form of courage strengthens trust and fosters healthier, more authentic connections."],
        ["Creative", "Innovation & Risk", "Creative courage is the willingness to experiment, innovate, and venture into uncharted territory. It involves taking risks, embracing failure as part of learning, and pushing beyond familiar patterns. This form of courage fuels growth, imagination, and transformation."],
        ["Adaptive", "Resilience & Change", "Adaptive courage is the ability to respond constructively to change, uncertainty, and adversity. It requires flexibility, emotional regulation, and resilience—the capacity to meet disruption with learning rather than resistance, and to see challenge as an invitation to grow."],
        ["Social", "Advocating", "Social courage is demonstrated when individuals confront injustice, discrimination, or exclusion. It involves speaking up for equity, fairness, and inclusion, even when doing so may carry personal or professional risk. Social courage calls us to move beyond silence and into principled action in service of the collective."]
      ] },
      { t: "h2", text: "Overcoming Fear with Courage", center: true },
      { t: "p", html: "Fear is a natural human response. It often arises from uncertainty, past experiences, or perceived threat. Courage does not eliminate fear; rather, it allows us to move forward with awareness, agency, and intention despite it." },
      { t: "p", html: "<b>Reflection prompts:</b>" },
      qs(["Where does fear currently show up in your life or leadership?", "What form of courage is being called for in this situation?", "What knowledge, tools, thought patterns, or inner strengths can you cultivate to support braver choices?"]),
      { t: "h2", text: "Courage as Emotional Freedom", center: true },
      { t: "p", html: "Inspired by the work of Dr. Judith Orloff, M.D.", center: true },
      { t: "p", html: "Dr. Judith Orloff emphasizes courage as a vital force in emotional healing and personal empowerment. In her work, fear is understood not as a failure, but as a signal—often pointing toward growth, healing, or transformation." },
      { t: "h3", text: "Key insights drawn from Dr. Orloff’s teachings include:", u: true },
      { t: "ul", items: ["Fear is a natural block to growth, often rooted in uncertainty, trauma, or the unknown.", "Courage helps neutralize fear by allowing us to meet it with openness and take small, intentional steps forward.", "Courage is not the absence of fear, but the willingness to act with presence and self-trust despite it.", "Mindfulness, grounding practices, and intuitive self-trust strengthen our capacity for courageous action.", "Courage can be consciously cultivated as a tool for healing, emotional freedom, and self-empowerment."] },
      { t: "h3", text: "Courage Through the Four Dimensions of Emotional Empowerment" },
      { t: "p", html: "Dr. Orloff’s four secrets to empowering your emotional life offer a multidimensional lens for understanding how courage supports resilience and inner strength." },
      { t: "h3", text: "Biology of Emotions", u: true },
      { t: "p", html: "Understanding how fear manifests in the body—through stress responses, anxiety, or tension—allows us to regulate our nervous system. Courage supports this awareness by helping us pause, breathe, and respond rather than react." },
      { t: "h3", text: "Spiritual Meaning of Emotions", u: true },
      { t: "p", html: "Courage invites us to explore the deeper meaning behind fear. When fear is reframed as information rather than obstruction, it can become a catalyst for growth, alignment, and purpose." },
      { t: "h3", text: "Energetic Power of Emotions", u: true },
      { t: "p", html: "Fear can deplete energy, while courage can restore it. By consciously choosing courageous responses, we shift from constriction to expansion. Energy is contagious—meeting fear with courage elevates not only our own state, but the emotional field around us." },
      { t: "h3", text: "Psychology of Emotions", u: true },
      { t: "p", html: "Courage allows us to confront the stories and mental patterns that keep us stuck. By identifying and reshaping fear-based narratives, we transform fear into motivation and reclaim agency over our choices." },
      { t: "h3", text: "Integration", u: true },
      { t: "p", html: "When courage is engaged across biological, psychological, energetic, and spiritual dimensions, it becomes a powerful, integrated practice. Courage then serves not only as a response to fear, but as a pathway to emotional empowerment, authentic leadership, and holistic growth.<br>Courage, practiced consistently and compassionately, becomes a way of living." }
    ] },
    { id: "ac-3", title: "Participant Reflection Worksheet", p: [77, 78], blocks: [
      { t: "h2", text: "Act Courageously<br>Participant Reflection Worksheet", center: true },
      { t: "p", html: "This worksheet is designed to support reflection, integration, and practical application of courage in your life and leadership. It may be completed either before or after the Act Courageously session, depending on how you wish to engage with the material. There are no right or wrong answers. Move at your own pace, and engage with honesty, compassion, and curiosity." },
      { t: "h3", text: "Part I: Understanding Courage in Context" },
      { t: "p", html: "Courage takes many forms, and we each express it differently depending on circumstances, relationships, and life stages.<br>Reflection:" },
      qs(["When you hear the word courage, what does it mean to you right now?"], { plain: true }),
      { t: "h3", text: "Part II: Forms of Courage" },
      { t: "p", html: "Review the different forms of courage below. Circle or highlight the ones that feel most relevant to your current season of life." },
      { t: "checks", items: COURAGE_FORMS, highlight: true },
      { t: "p", html: "Reflection:" },
      qs(["Which one or two forms of courage are you currently being invited to strengthen?", "Why do these stand out for you?"], { plain: true }),
      { t: "h3", text: "Part III: Fear Awareness" },
      { t: "p", html: "Fear is a natural response, often signaling uncertainty, vulnerability, or growth.<br>Reflection:" },
      qs(["What fear is most present for you right now—in your life, work, or leadership?", "Where do you notice this fear showing up in your body, thoughts, or emotions?"], { plain: true }),
      { t: "h3", text: "Part IV: Courage in Action" },
      { t: "p", html: "Courage does not require big, dramatic moves. Often, it begins with small, intentional steps.<br>Reflection:" },
      qs(["What would it look like to meet this fear with courage rather than avoidance?", "What is one small, realistic action you could take that reflects courageous alignment?", "What internal resources could support you? (e.g., self-trust, support people, practices, skills, mindset)"], { plain: true }),
      { t: "h3", text: "Part V: Emotional Empowerment" },
      { t: "p", html: "Inspired by the work of Dr. Judith Orloff, courage can be engaged across multiple dimensions.<br>Reflection:" },
      { t: "p", html: "Which dimension feels most relevant to your current experience?" },
      { t: "checks", items: ["Body (biology, nervous system regulation)", "Mind (thought patterns, beliefs, narratives)", "Energy (emotional tone, presence, vitality)", "Spirit (meaning, purpose, values)"] },
      qs(["How might courage support you now?"], { plain: true }),
      { t: "h3", text: "Part VI: Integration" },
      { t: "p", html: "Completion Prompt: Finish the sentence below:" },
      qs(["Right now, acting courageously in my life looks like…"], { plain: true, commit: true }),
      { t: "p", html: "Optional Commitment:" },
      qs(["One courageous intention I am willing to carry forward is:"], { plain: true, opt: true, commit: true }),
      { t: "p", html: "Take a moment to acknowledge yourself for engaging in this reflection. Courage grows through awareness, compassion, and practice." }
    ] },
    { id: "ac-4", title: "Post-Live Session", p: [79, 80, 81, 82], blocks: [
      inst("POST - ACT COURAGEOUSLY"),
      { t: "h3", text: "COMPLETE THIS INTEGRATION POST LIVE SESSION", center: true },
      { t: "metaphor", title: "Crossing with Fear", html: "Courage is not waiting for the waters to calm. It is learning how to cross while the current is still moving. Fear often signals importance, growth, or responsibility—not failure." },
      { t: "p", html: "The purpose of this post-session reflection is integration and application. Courage is not a single act; it is a practiced relationship with fear, clarity, and choice over time." },
      integ("UNDERSTANDING YOUR COURAGE LANDSCAPE", [qs(["What insights about courage stood out for you during the live session?", "Which forms of courage feel most relevant to your current leadership context? (e.g., moral, interpersonal, intellectual, emotional, adaptive, social)", "Where have you already been acting courageously, even if you did not previously name it as such?"])]),
      lead("REFLECTION: FEAR AWARENESS AND REGULATION", "Fear is a natural human response. Leadership courage begins with awareness rather than avoidance.<br><b>Reflect</b>:"),
      qs(["What specific fear is most present for you right now?", "What story does this fear tell you about risk, loss, or safety?", "What happens when you meet this fear with curiosity instead of judgment?"]),
      pi("APPLICATION", "Predictive Index (PI) and Risk Orientation", [
        { t: "p", html: "<b>Your Predictive Index (PI) wiring influences how you relate to risk, uncertainty, and decision-making. Some leaders are naturally comfortable with risk, moving quickly toward action. Others are more cautious with risk, preferring certainty, preparation, or stability before acting. Neither orientation is right or wrong. Courage is not about overriding your wiring—it is about acting with awareness.</b>" },
        { t: "p", html: "<b>Reflect:</b>" },
        qs(["How does your PI wiring influence your relationship with risk?", "Where might comfort with risk support courageous action?", "Where might caution with risk require intentional stretching?", "What does aligned courage look like for you, given your natural tendencies?"], { bold: true })
      ]),
      { t: "mindwire" },
      lead("INTENTION: COURAGE IN ACTION — SMALL, ALIGNED STEPS", "Courage does not require dramatic gestures. Often, it begins with small, intentional actions.<br>Identify:"),
      qs(["One situation where courage is being asked of you", "One small but meaningful action you could take that aligns with your values", "One internal or external support that could help you follow through"]),
      { t: "p", html: "<b>Reflection: Courage and Responsibility for Others:</b> Courageous leadership also creates safety for others." },
      { t: "p", html: "<b>Reflect:</b>" },
      qs(["How does your willingness to act courageously impact those around you?", "Where might your courage create space for marginalized or quieter voices?", "How can you model regulated courage rather than urgency or force?"]),
      { t: "h3", text: "Commitment: A 30-Day Courage Practice" },
      { t: "p", html: "Over the next 30 days, commit to:" },
      qs(["One fear you will consciously acknowledge rather than avoid", "One courageous action you are willing to take with that fear present", "One way you will regulate yourself before, during, or after acting"], { commit: true }),
      map("THE ACT COURAGEOUSLY ALIGNMENT MAP", [
        { t: "p", html: "This Alignment Map is a living reflection tool designed to help you revisit how you relate to fear, risk, and courageous action over time. It is not a checklist—it is a compass for acting with integrity when fear is present." },
        { t: "p", html: "Use this Alignment Map to capture what you are carrying forward." },
        qs(["A fear you are learning to work with:", "A value you are committed to honoring:", "A courageous action you are willing to take:", "A support or practice that will help sustain you:", "One signal you will use to measure aligned courage:"], { plain: true, commit: true }),
        { t: "p", html: "<b><i>Return to this map as a living reflection.  Courage deepens through awareness, compassion, and practice—not perfection.</i></b>", center: true }
      ])
    ] }
  ] });

  /* Advocate Fiercely (83-89) */
  modules.push({ id: "af", principle: "af", title: "Advocate Fiercely", short: "Advocate Fiercely", group: "The Eight Principles", steps: [
    { id: "af-0", title: "Advocate Fiercely", p: [83], blocks: [divider({ tone: "cream", icon: "af", title: "Advocate Fiercely", sub: "Champion what you believe is right", items: ["Passionate, personal devotion to something that deeply matters.", "Tempered by respect and compassion, advocates strive to be a powerful force for good."], foot: "Aligns with how you live out your convictions" })] },
    { id: "af-1", title: "Pre-Live Session", p: [84], blocks: [
      inst("PRE - ADVOCATE FIERCELY"),
      lead("ADVOCATE FIERCELY", "Advocate Fiercely is where courage becomes legacy. Advocacy is the bridge between values and impact, between personal integrity and collective change. It is not only about speaking for others—it is also about speaking for yourself, understanding that silence and voice both communicate, teach, and shape the future."),
      { t: "p", html: "ATHENA leaders understand that advocacy is inherited. The rights, opportunities, and protections many of us experience today exist because someone before us chose to act rather than remain silent. In the same way, the choices we make now—especially when it is uncomfortable—create conditions for those who will come in the future." },
      { t: "p", html: "The reflections in this section are designed to support you before and after the live session. Move through them at your own pace. This work is meant to inspire responsibility, not perfection." },
      lead("PRE-LIVE SESSION PREPARATION", "Complete this section after watching the Advocate Fiercely video and before the live session. The purpose of this pre-work is to help you arrive at the live session aware of how silence, voice, and advocacy currently show up in your leadership and life. This work is for you and will not be collected."),
      lead("REFLECTION: READINESS FOR THE LIVE SESSION", "As you reflect on the question posed at the end of the video, consider the following:"),
      qs(["When have you stayed silent to protect comfort, belonging, or image?", "What did that silence communicate—to you or to others?", "Have you witnessed someone else remain silent in a moment that mattered? What message did that silence send?"]),
      { t: "p", html: "You are encouraged not to judge yourself or others. Simply notice and observe what arises and bring that awareness with you into the live session, where silence, voice, and advocacy will be explored together." }
    ] },
    { id: "af-2", title: "Post-Live Session", p: [85, 86, 87, 88, 89], blocks: [
      inst("POST - ADVOCATE FIERCELY"),
      { t: "h3", text: "COMPLETE THIS INTEGRATION POST LIVE SESSION", center: true },
      { t: "metaphor", title: "Advocacy as a Relay", html: "Advocacy is not a solo sprint—it is a relay. Each generation carries the work forward, running its portion of the race before passing responsibility on. Progress happens because someone chose not to drop the baton." },
      { t: "p", html: "The purpose of this post-session reflection is integration and application. Advocacy is not a single act; it is a practiced relationship with voice, responsibility, and the future." },
      integ("INTEGRATION — WHAT SHIFTED FOR YOU", [qs(["What insights about advocacy stood out for you during the live session?", "Where did you recognize moments in your life where silence communicated more than words?", "How has your understanding of advocacy—for yourself and for others—shifted through this work?"])]),
      lead("REFLECTION: ADVOCACY, COURAGE, AND RESPONSIBILITY", "Advocacy builds on courage. It asks us to act with integrity even when fear, discomfort, or potential loss is present."),
      { t: "p", html: "<b>Reflect</b>:" },
      qs(["What fears most commonly influence your hesitation to speak or act?", "How do those fears show up in your behavior?", "What might courageous advocacy look like with those fears acknowledged rather than denied?"]),
      lead("REFLECTION: SELF-ADVOCACY AS COLLECTIVE ADVOCACY", "Advocating for yourself is not separate from advocating for others. When leaders don’t name their needs, boundaries, or values, they unintentionally reinforce systems that silence others."),
      { t: "p", html: "<b>Reflect:</b>" },
      qs(["How do you advocate differently for yourself compared to how you advocate for others?", "Where might strengthening self-advocacy support greater equity and leadership for those who follow?"]),
      lead("REFLECTION: HONORING THE LINEAGE OF ADVOCATES", "Advocacy does not begin with us—and it does not end with us. The opportunities, protections, and progress many of us experience today exist because others chose to act when silence or non-action would have been easier or safer."),
      { t: "p", html: "Advocates are often remembered for the outcomes they helped create, but what is less visible are the moments of decision that came before recognition: the choice to speak when credibility was at risk, to act when support was uncertain, or to advocate for oneself knowing that doing so would open doors for others who would follow. History is shaped not only by bold public acts, but by everyday leadership—people stepping into gaps, holding the line when it mattered, and choosing responsibility over comfort." },
      { t: "h3", text: "Examples of Advocacy in Action: <span class=\"accent\">All are Global ATHENA Leadership Award Recipients</span>" },
      { t: "ul", items: [
        "Ruth Bader Ginsburg advanced gender equity through deliberate, values-driven advocacy. Her courage was not loud or rushed; it was steady, strategic, and deeply principled. She demonstrated that lasting change often requires patience, persistence, and an unwavering commitment to justice—even when progress feels slow.",
        "Dolores Huerta organized and mobilized communities by centering dignity, voice, and collective power. Her advocacy reminds us that meaningful change is rarely achieved alone and that leadership often looks like sustained presence rather than singular moments.",
        "Billie Jean King understood that advocating for herself was inseparable from advocating for others. By demanding equity in her own professional life, she reshaped opportunities for generations of athletes. Her legacy demonstrates that self-advocacy can be a catalyst for systemic change.",
        "Ann Playter exemplifies everyday advocacy that safeguards the future. During the uncertainty of the COVID-19 pandemic, Ann stepped into a critical leadership gap, providing structure, stability, and unwavering support when ATHENA International’s future was at risk. Her advocacy was not performative—it was relational, operational, and courageous. Because she chose to act, ATHENA not only survived but continues to thrive, creating opportunities for women and girls around the world. Ann’s leadership reminds us that advocacy is often quiet, deeply responsible, and profoundly consequential.",
        "Ruthie Bolton, a two-time Olympic gold medalist and WNBA pioneer, demonstrates advocacy that extends far beyond athletic achievement. While her competitive success is remarkable, her most enduring leadership has been in the service of others — using sport, mentorship, and storytelling as platforms to elevate women and girls. Born and raised in rural Mississippi, Ruthie’s leadership journey includes confronting adversity with integrity, transforming personal challenges into opportunities for connection and empowerment, and championing survivors of trauma with courage and compassion. Her work as an envoy for the U.S. Department of State and as a mentor in classrooms and communities reflects a form of advocacy that meets people where they are and builds confidence through shared experience. Ruthie’s example shows that fierce advocacy is relational, steadfast, and rooted in lifting up others across generations and geographies."
      ] },
      { t: "p", html: "<b>Reflection:</b>" },
      qs(["Because these or other individuals chose to advocate, what opportunities exist in your life today that may not have otherwise?", "Where are you being asked to advocate—for yourself, for others, or for the future—right now?", "If you chose action instead of silence, whose path might be made easier because of it?"]),
      { t: "h3", text: "ADVOCACY IS NOT ABOUT RECOGNITION. IT IS ABOUT RESPONSIBILITY.<br>THE FUTURE IS SHAPED BY THOSE WILLING TO CARRY THE WORK FORWARD." },
      lead("EVERYDAY ADVOCACY IN PRACTICE", "Fierce advocacy does not require a title, spotlight, or platform. It happens through everyday decisions.<br>Identify:"),
      qs(["One situation where advocacy is being asked of you", "One small but meaningful action you could take", "One person or group who may benefit from that action"]),
      { t: "h3", text: "Commitment: A 30-Day Advocacy Practice" },
      { t: "p", html: "Over the next 30 days, commit to:" },
      qs(["One issue or cause you are willing to advocate for", "One way you will advocate for yourself with clarity and integrity", "One way you will advocate for others without taking up their space"], { commit: true }),
      map("THE ADVOCACY ALIGNMENT MAP", [
        { t: "p", html: "This Alignment Map is a living reflection tool designed to help you align voice, values, and responsibility over time. It is not a checklist—it is a compass for acting in service of the greater good." },
        { t: "p", html: "Use the space below to capture what you are carrying forward." },
        qs(["A moment where silence is no longer aligned:", "A value or cause you are committed to advocating for:", "A way you will advocate for yourself with integrity:", "A way you will advocate for others responsibly:", "One action you will take in the next 30 days:"], { plain: true, commit: true }),
        { t: "p", html: "<b><i>Return to this map periodically. Advocacy strengthens when responsibility is claimed, not deferred.</i></b>", center: true }
      ])
    ] }
  ] });

  /* Give Back (90-95) */
  modules.push({ id: "gb", principle: "gb", title: "Give Back", short: "Give Back", group: "The Eight Principles", steps: [
    { id: "gb-0", title: "Give Back", p: [90], blocks: [divider({ tone: "navy", icon: "gb", title: "Give Back", sub: "Serve", items: ["Leaving a worthy impact on your community and the world.", "Recognizing that with success comes a responsibility to enrich the lives of others.", "Generously devoting voice, position and resources to advance the greater good."], foot: "Demonstrates how you contribute to your community and memorialize shared experiences" })] },
    { id: "gb-1", title: "Pre-Live Session", p: [91], blocks: [
      inst("PRE - GIVE BACK"),
      lead("GIVE BACK", "Give Back is the expression of leadership that looks beyond the self and toward the future. It is how values become visible through service, contribution, and stewardship. Giving back is not limited to financial donation—it includes sharing access, knowledge, influence, time, and care in ways that expand opportunity and strengthen communities."),
      { t: "p", html: "ATHENA leaders understand that with growth and success comes responsibility. Giving back is not an act of self-sacrifice, but an intentional choice to serve in ways that are sustainable, equitable, and rooted in relationship. When leaders give back with awareness and integrity, they help shape a future where others can thrive." },
      lead("PRE-LIVE SESSION PREPARATION", "Complete this section after watching the Give Back video and before the live session. The purpose of this pre-work is to help you arrive at the live session aware of what you currently hold—access, influence, knowledge, or resources—and how those gifts might be shared more intentionally for the greater good."),
      lead("REFLECTION: READINESS FOR THE LIVE SESSION", "As you reflect on the question posed at the end of the video, consider:"),
      qs(["What access, knowledge, or influence do you currently hold?", "Where might these resources be underutilized or held too tightly?", "How could sharing them more intentionally support others at work or in your community?"]),
      { t: "p", html: "You do not need to create a plan yet. Simply notice what arises and bring that awareness with you into the live session, where giving back will be explored as a leadership practice." }
    ] },
    { id: "gb-2", title: "Post-Live Session", p: [92, 93, 94, 95], blocks: [
      inst("POST - GIVE BACK"),
      { t: "h3", text: "COMPLETE THIS INTEGRATION POST LIVE SESSION", center: true },
      { t: "metaphor", title: "Giving Back as Stewardship", html: "Giving back is not a single act—it is stewardship over time.<br>Just as a steward tends land so it can continue to nourish future generations, leaders steward their gifts, influence, and energy so that their contribution remains life-giving rather than depleting." },
      { t: "p", html: "The purpose of this post-session reflection is integration and application. Giving back is most powerful when it can be sustained." },
      integ("INTEGRATION — WHAT SHIFTED FOR YOU", [qs(["What insights about giving back stood out for you during the live session?", "How has your understanding of service, contribution, or responsibility shifted?", "Where did you recognize ways you already give back that you may not have previously named?"])]),
      lead("REFLECTION: IDENTIFYING YOUR GIFTS AND INFLUENCE", "Giving back begins with awareness."),
      { t: "p", html: "<b>Reflect</b>:" },
      qs(["What skills, knowledge, relationships, or influence do you have access to?", "In what spaces do people listen to you or look to you for guidance?", "Where could your presence or voice make a meaningful difference?"]),
      lead("REFLECTION: SUSTAINABLE GIVING — SERVING WITHOUT SELF-ERASURE", "Leadership that gives back must be sustainable. When giving is not designed with care, even generous intentions can lead to burnout or resentment, ultimately limiting impact."),
      { t: "p", html: "Sustainable giving asks: How can I contribute in ways that strengthen others while allowing me to remain present, resourced, and engaged over time?" },
      { t: "p", html: "<b>Reflect</b>:" },
      qs(["Where might you be over-giving in ways that are not sustainable?", "What boundaries would allow your giving to be more consistent and impactful?", "How can the Eight Dimensions of Wellness support your ability to give back without depletion?"]),
      lead("REFLECTION: GIVING BACK WITH INTEGRITY AND EQUITY", "Giving back is most effective when it is rooted in listening, relationship, and respect."),
      { t: "p", html: "<b>Reflect</b>:" },
      qs(["How can you ensure your giving back supports marginalized individuals or communities without becoming performative?", "How will you listen to those you aim to support rather than assume their needs?", "How can your actions amplify voices rather than replace them?"]),
      { t: "h3", text: "Commitment: A 30-Day Give Back Practice" },
      { t: "p", html: "Over the next 30 days, commit to:" },
      qs(["One way you will give back using your time, talent, or influence", "One boundary or practice that will help keep this giving sustainable", "One person or group who may benefit from this contribution"], { commit: true }),
      map("THE GIVE BACK ALIGNMENT MAP", [
        { t: "p", html: "This Alignment Map is a living reflection tool designed to help you revisit how you give back over time. It is not a checklist—it is a compass for stewarding your gifts in service of the greater good." },
        { t: "p", html: "Use the space below to capture what you are carrying forward." },
        qs(["A gift, skill, or influence you are ready to share:", "A cause or community you feel called to support:", "A boundary that will protect sustainability:", "One action you will take in the next 30 days:", "One way you will know your giving back is aligned and renewing:"], { plain: true, commit: true }),
        { t: "p", html: "<b><i>Return to this map periodically.<br>Giving back becomes legacy when it is practiced with care, intention, and continuity.</i></b>", center: true }
      ])
    ] }
  ] });

  /* Celebrate (96-101) */
  modules.push({ id: "ce", principle: "ce", title: "Celebrate", short: "Celebrate", group: "The Eight Principles", steps: [
    { id: "ce-0", title: "Celebrate", p: [96], blocks: [divider({ tone: "cream", icon: "ce", title: "Celebrate", sub: "Remember & rejoice", items: ["The practice of gathering to mark important times.", "Strengthening bonds of unity through creative expression, rituals and traditions.", "Memorializing moments, triumphant or tragic; sharing joyful or solemn reflections."], foot: "Demonstrates how you contribute to your community and memorialize shared experiences" })] },
    { id: "ce-1", title: "Pre-Live Session", p: [97, 98], blocks: [
      inst("PRE - CELEBRATE"),
      lead("CELEBRATE", "Celebration is not an afterthought of leadership—it is an essential practice. To celebrate is to pause, to notice, and to honor growth, effort, resilience, and meaning along the way. ATHENA leaders understand that celebration is not reserved only for outcomes, milestones, or victories, but for progress, learning, courage, and shared humanity. When leaders celebrate intentionally, they build cultures of belonging, motivation, and hope."),
      { t: "p", html: "Celebrating others in the way they wish to be celebrated affirms dignity and honors difference. Celebrating ourselves strengthens self-worth and sustainability. Leaders remember and rejoice." },
      { t: "h3", text: "Pre-Session Preparation<br>Before the live session, please:" },
      { t: "ul", items: ["Watch the Celebrate video provided by your facilitator.", "Complete the reflections below."] },
      lead("PRE-LIVE SESSION | PREPARATION & REFLECTION", "As you prepare for our Celebrate Leadership Circle, reflect on how celebration currently shows up in your life and leadership—and where it may feel missing, uncomfortable, or overlooked. Celebration in this space is not only about achievements. It is about honoring growth, courage, resilience, awareness, and truth."),
      { t: "p", html: "Reflect on your ATHENA Leadership journey and be prepared to claim something out loud in your circle. You will be invited to claim your growth—not as performance, but as integration. What are you willing to be witnessed in?<br>Consider:" },
      qs(["What growth do you see when you revisit your pre-program assessment?", "What are you ready to acknowledge or own?", "What strength did you lean into?", "What challenge did you move through or become more conscious of?", "If your journey included hardship, loss, or a difficult realization, what deserves to be honored?"]),
      lead("Reflection: Your Relationship with Celebration", "Take a few moments to reflect honestly. There are no right or wrong answers."),
      qs(["How do you currently celebrate small wins or progress (your own or others’)?", "How do you typically celebrate major milestones or accomplishments?", "Where do you tend to delay celebration until the “end result” is achieved?", "How were celebration, recognition, or acknowledgment modeled for you growing up? How has that shaped your leadership today?"]),
      lead("REFLECTION: PREFERENCES & AWARENESS", "At the end of the video, you were invited to reflect on the following question:<br>How do you prefer to be celebrated, and how might that inform how you honor others moving forward? Write a few thoughts below. Notice what feels true for you."),
      { t: "q", text: "How do you prefer to be celebrated, and how might that inform how you honor others moving forward?", hideLabel: true },
      lead("READINESS FOR THE LIVE SESSION", "As you come into the live session, simply bring awareness—not solutions—to the following:"),
      qs(["Where might celebration support resilience, motivation, or belonging in your leadership right now?", "Where might celebration feel uncomfortable, unfamiliar, or even undeserved?", "Do you know how the people around you want to be celebrated in success and supported in hardship?"]),
      { t: "p", html: "Hold these reflections gently and bring them with you into the live session conversation." }
    ] },
    { id: "ce-2", title: "Post-Live Session", p: [99, 100, 101], blocks: [
      inst("POST - CELEBRATE"),
      { t: "h3", text: "COMPLETE THIS INTEGRATION POST LIVE SESSION", center: true },
      { t: "metaphor", title: "Celebrate as Harvest", html: "<i>When leaders take time to harvest—naming progress, honoring resilience, and recognizing contribution—they create nourishment for the journey ahead. Celebration replenishes energy, strengthens connection, and reminds us why the work matters.</i>" },
      { t: "p", html: "The purpose of this post-session reflection is integration and embodiment. Celebration is not a reward or an endpoint—it is a leadership practice that sustains momentum, honors effort, and carries meaning forward." },
      integ("INTEGRATION — WHAT SHIFTED FOR YOU", [qs(["What did you notice or realize about celebration during the live session?", "How has your understanding of celebration as a leadership responsibility changed, if at all?", "Where have you overlooked opportunities to celebrate progress, learning, or resilience—your own or others’?"])]),
      lead("REFLECTION: HONORING GROWTH AND CONTRIBUTION", "Celebrate invites us to pause long enough to acknowledge what has grown."),
      { t: "p", html: "<b>Reflect:</b>" },
      qs(["What personal growth are you most proud of from this program?", "What effort or courage do you want to honor in yourself?", "Who else’s growth or contribution do you feel called to acknowledge?"]),
      lead("REFLECTION: INCLUSIVE CELEBRATION & CULTURAL AWARENESS", "Celebration looks different across cultures, identities, and lived experiences."),
      { t: "p", html: "Reflect:" },
      qs(["How do you prefer to be celebrated?", "How might others prefer to be honored differently?", "What will you do to ensure your celebrations are inclusive, respectful, and invitational?"]),
      { t: "h3", text: "Commitment: A 30-Day Celebration Practice" },
      { t: "p", html: "Over the next 30 days, choose one intentional celebration practice you will implement. Examples include:" },
      { t: "ul", items: ["Creating a weekly micro-celebration for progress or learning", "Offering personalized recognition to someone you work with", "Pausing to acknowledge completion before moving to the next goal"] },
      { t: "q", text: "My 30-day celebration practice: (What will you do? When? With whom?)", commit: true },
      map("THE CELEBRATE ALIGNMENT MAP", [
        { t: "p", html: "This Alignment Map is a living reflection tool designed to help you revisit how you honor progress and people over time. It is not a checklist—it is a compass." },
        qs(["What I will intentionally celebrate more often:", "How I will acknowledge others in ways that feel meaningful to them:", "What I need to let go of to allow celebration (perfectionism, urgency, deflection):", "How I will know celebration is strengthening connection and sustainability:"], { plain: true, commit: true }),
        { t: "p", html: "<b>Celebration is how leaders remember, renew, and rejoice. By honoring progress and people along the way, you create the conditions for hope, belonging, and continued growth—<br>for yourself and for those you lead.</b>", center: true }
      ])
    ] }
  ] });

  /* 13. Post-course assessment (102-108) */
  modules.push({ id: "post", title: "Post-Course ATHENA Principles Assessment", short: "Post-Course Assessment", group: "Closing assessment", late: true, steps: [
    { id: "post-1", title: "Purpose & How to Respond", p: [102, 103], blocks: [
      inst("POST-COURSE ATHENA PRINCIPLES ASSESSMENT"),
      { t: "big", text: "Congratulations!" },
      { t: "h2", text: "Aligned to ATHENA’s Principles of Leadership", center: true },
      { t: "h3", text: "PURPOSE", u: true },
      { t: "p", html: "This self-assessment is an invitation to pause, reflect, and take an honest snapshot of how you now embody ATHENA’s Eight Principles of Leadership. It is not a test, and it is not about performance or perfection. It is about awareness and integration." },
      { t: "p", html: "Your responses will help you:" },
      { t: "ul", items: ["Clarify your current leadership strengths", "Notice where growth has deepened or shifted during the program", "Identify which principles and practices you want to carry forward beyond the program"] },
      { t: "p", html: "There are no right or wrong answers. The most valuable responses are the most honest ones. As you complete this assessment, consider how you are generally showing up in your leadership today — across the full range of your lived experience, not only on your best days and not only in moments of challenge." },
      { t: "p", html: "You may notice changes in your scores. Growth may show up as increased confidence, new behaviors, or deeper self-awareness. All of these count. Take your time. Answer with self-compassion. Let this be a moment of presence." }
    ].concat(ASSESS_HOW) },
    { id: "post-2", title: "Assessment", p: [104, 105, 106, 107], blocks: [{ t: "assess", phase: "post" }] },
    { id: "post-3", title: "Scoring & Post-Program Reflection", p: [108], blocks: SCORING.concat([{ t: "scores", phase: "post" }], INTERP, [
      { t: "h3", text: "POST-PROGRAM REFLECTION", u: true },
      { t: "p", html: "After completing the post-program assessment, consider:" },
      qs(["Which ATHENA Principle shows the greatest growth for you?", "What shifts do you notice in how you lead, decide, or relate to others?", "Which practices do you want to carry forward beyond the program?"]),
      { t: "p", html: "Leadership development is ongoing. This moment is a pause to notice how far you’ve come." }
    ]) },
    { id: "post-eiq", title: "People Skills & Emotional IQ: Post-Program", p: [11, 12, 13, 14], blocks: [
      { t: "h2", text: "People Skills & Emotional IQ" },
      { t: "p", html: "At the end of the program, return and reassess your original scores." },
      { t: "p", html: "Use the Progress Reflection column to note insights, awareness shifts, and real-world application." },
      { t: "eiq", phase: "post" }
    ] },
    { id: "eiq-3", title: "Closing Reflection", p: [15], blocks: [
      { t: "h3", text: "Closing Reflection", u: true },
      { t: "p", html: "Looking across your Pre- and Post-Program assessments:" },
      { t: "qs", items: ["What patterns of growth stand out most clearly?", "Which ATHENA Principles feel more embodied now?", "How will you continue practicing these skills beyond the program?"] },
      { t: "quote", html: "Leadership is not a destination—it is a lived, evolving practice.<br>This reflection marks a meaningful moment in that journey." },
      { t: "h3", text: "Guiding reflection questions:", u: true },
      { t: "qs", items: ["What shifted in your awareness, not just your behavior?", "Where did this growth show up in conversations, decisions, or relationships?", "What practices, support, or experiences contributed to this growth?"] }
    ] }
  ] });

  return {
    title: "Leadership Circle Workbook",
    ratingLabels: RATING_LABELS,
    eiqLabels: EIQ_LABELS,
    bands: BANDS,
    principles: PRINCIPLES,
    piFactors: PI_FACTORS,
    piExample: PI_EXAMPLE,
    eiq: EIQ,
    modules: modules
  };
})();
