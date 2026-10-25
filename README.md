# OCI-hackathon: OpenPath

**A career-discovery tool for students who aren't sure what they want to do.**

OpenPath helps students uncover a wide range of career options, including specialized and less familiar job titles, before they spend money or time on a major, classes or training. It is a practical exploration tool: it suggests paths to look into and points to current sources to verify them. It does not predict where anyone will thrive, and it is not a complete catalog of every job.

**Live demo:** https://rtrtssn4cn-hue.github.io/OCI-hackathon/ (once GitHub Pages is turned on for this repository)

## Who it's for

- High school and college students choosing classes, majors or training
- Career changers exploring adjacent fields
- Counselors, teachers and parents who want a starting point for career conversations

## How to run it

OpenPath is one self-contained file. No account, server or install is needed.

- **Open it directly:** double-click `index.html`, or open it in any modern browser.
- **Publish it on GitHub Pages:** in this repository, go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save. After a minute or two it's live at https://rtrtssn4cn-hue.github.io/OCI-hackathon/. Free GitHub accounts need a public repository for Pages.

## Quick match (the default)

Interests and work styles are shown as icon tiles (version 3); each question card shows the icon of the area it comes from.


For students who want a fast answer, Quick match narrows to one top match in a few taps:

1. **Pick up to 3 things that sound like you** from the 10 interests, and optionally up to 2 work styles.
2. **Answer short "Would you enjoy this?" questions** with Yes, Maybe or Not for me, one at a time. Each question is a realistic scenario chosen to best split the careers still in the running, so most students finish in 6–12 taps. Back, Skip, "Change my picks" and "Show my match now" are always available.
3. **See your top match first**, with a full step-by-step path, then **5 other strong matches**. Tap any of them to open its own path.

**Scoring.** Each career gets +3 for every scenario answered "Yes" that it fits, +1 for "Maybe" and −3 for "Not for me". It also gets +1 for each chosen interest and +0.5 for each chosen work style it connects to. Careers with role-specific research get a tiny tie-breaker. Questions stop when there's a clear leader (at least 5 answers and a 3-point lead, or a single contender), after 8 answers with any lead, or at 12 answers. Students can always answer 4 more to sharpen the result.

**The step-by-step path** appears for every match and at the top of every career page:
1. **Now, in high school:** classes, student organizations and low-cost ways to try it.
2. **What to study:** the most common education level, majors and programs, useful courses, and what to check before paying for a program.
3. **First 0–2 years:** the first role, credentials to look into, and starting pay.
4. **Years 2–7:** skills to build, networking, mid-career credentials and typical pay.
5. **Years 8+:** leadership, specialization or pivot options, advanced credentials and senior pay.

**Print or save the plan.** "Print my plan" (on the top match, each other match and every career page) opens a clean plan view with **Print** and **Download plan** buttons. The download is a standalone page that opens in any browser and prints well, which helps where printing is blocked (some embedded previews block it).

The top match is the best fit for the student's answers, a starting point to explore, not a guarantee or a prediction.

## Detailed quiz (hidden for now)

The detailed quiz from version 1 is hidden in this version. Its code is still included: to show it again, open `tools/template.html`, change `const SHOW_DETAILED_QUIZ = false;` to `true`, and run `python tools/build.py`. When shown, it works like this:

The quiz is the main way in. Students can pick **more than one answer at every step** and go back to change anything without restarting. Answers are saved in the browser.

1. **Interests** – 10 broad areas: people and culture, analysis and problem-solving, creative work, community, operations, science, communication, leadership, environment and technology.
2. **Kinds of work** – for each selected interest, 4–7 more specific kinds of work (for example, under analysis: finding patterns in data, troubleshooting machines, investigating why something happened, solving a customer's problem, working through a scientific question, puzzles with money and risk).
3. **Scenarios** – for each selected kind of work, realistic tasks from real jobs (for example "Diagnosing why a robot or machine keeps stopping" or "Spotting an unusual pattern in a dataset that nobody noticed").
4. **Work style (optional)** – hands-on work, teamwork, clear structure, fast-changing work, outdoors or fieldwork and independent focus. Each has its own specific choices and scenarios.
5. **Your note (optional)** – a free-text box. It only does basic word matching against career titles and descriptions, so guided answers give clearer matches. The note stays in the browser.

**Matching rules.** Each career card is tagged with the scenarios it fits. A career appears when it connects to at least one of the student's *most specific* choices: a selected scenario, a selected kind of work with no scenarios picked under it, or a selected interest with no kinds picked under it. Picking several things widens the results so students can explore combinations rather than being locked into one family.

**Ranking.** Each connection adds points: interest 1, kind of work 3, scenario 6; work style 1, specific 2, scenario 4; each matched note word 2 (up to 3 words). Every result card lists the scenarios, kinds of work, interests, work styles and note words that connected it. Results can be filtered by career family ("All paths" or one family) and sorted by strongest connection or A to Z.

## Career coverage

319 unique career-title cards across 19 families:

- People, HR and workplace culture: 20
- Community and public service: 14
- Visual art and design: 16
- Film, TV and animation: 16
- Games and digital content: 11
- Music and audio: 9
- Writing and communication: 15
- Technology, data, AI and cybersecurity: 26
- Robotics, automation and manufacturing: 11
- Engineering and skilled trades: 20
- Healthcare, physicians and medical specialties: 39
- Science, research and space: 18
- Education and learning: 16
- Law and public safety: 13
- Hospitality, events and tourism: 9
- Agriculture and animal care: 12
- Transportation and aviation: 12
- Sales, business and operations: 25
- Environment, climate, conservation and energy: 17

This is a starting set, not every job. Titles vary by employer, region and time. Each card links to an official occupation where one exists, and the About page points to O*NET OnLine for anything not here.

## Role-specific profiles vs shared family guidance

**97 careers have role-specific research:** a typical day, work environment, skills, credentials to verify (with when they usually fit), courses, high school classes, majors, networking actions, ways to get experience as a student, a five-stage path and specialize/lead/pivot moves, plus a researched pay range with a source link. These pages are labeled **"Role-specific details."**

- **People, HR and workplace culture:** Benefits Specialist, Career Coach, Compensation Analyst, Corporate Trainer, Employee Engagement Specialist, HRIS Analyst, Inclusion Program Specialist, Onboarding Specialist, Organizational Development Consultant, People Analytics Analyst, Talent Acquisition Coordinator, Workforce Planning Analyst
- **Community and public service:** Development Officer, Peer Support Specialist, Policy Advocate, Victim Advocate
- **Visual art and design:** Exhibit Designer, Food Stylist, Medical Illustrator, Type Designer
- **Film, TV and animation:** Colorist, Foley Artist, Motion Designer, Set Dresser
- **Games and digital content:** Community Manager, Narrative Designer
- **Music and audio:** Luthier, Music Therapist, Podcast Producer
- **Writing and communication:** Captioner, Conversation Designer, Copywriter, Court Interpreter, Grant Writer, Localization Specialist, Public Affairs Specialist, Technical Writer, UX Writer
- **Technology, data, AI and cybersecurity:** Accessibility Specialist, Cybersecurity Analyst, Data Visualization Specialist, Digital Forensics Examiner, GIS Analyst, QA Tester, Scrum Master, Solutions Engineer, Trust & Safety Specialist, UX Researcher
- **Robotics, automation and manufacturing:** Drone Pilot
- **Engineering and skilled trades:** Biomedical Equipment Technician, Elevator Mechanic, Model Maker, Theatrical Rigger
- **Healthcare, physicians and medical specialties:** Audiologist, Child Life Specialist, Clinical Research Coordinator, Genetic Counselor, Health Educator, Medical Scribe, Patient Navigator, Perfusionist, Prosthetist / Orthotist, Sleep Technologist, Speech-Language Pathology Assistant
- **Science, research and space:** Astronaut, Food Scientist, Hydrologist
- **Education and learning:** Academic Advisor, Archivist, Instructional Designer, Museum Educator, Museum Registrar
- **Law and public safety:** Compliance Analyst, Fraud Analyst, Mediator, Paralegal
- **Hospitality, events and tourism:** Event Producer, Tour Manager
- **Agriculture and animal care:** Animal Enrichment Specialist, Wildlife Rehabilitator
- **Transportation and aviation:** Avionics Technician
- **Sales, business and operations:** Actuary, Brand Strategist, Customer Success Manager, E-commerce Specialist, Medical Sales Representative, Procurement Specialist, Real Estate Appraiser, Revenue Operations Analyst, Sponsorship Coordinator, Sports Agent, Supply Chain Analyst
- **Environment, climate, conservation and energy:** Arborist, Environmental Inspector, Park Ranger, Sustainability Coordinator, Wind Turbine Technician

**The other 222 careers use shared family guidance plus official occupation data.** Their pages are labeled **"Shared family guidance + official occupation data"** and say clearly that they are not detailed research about that exact title. They combine:

- general guidance written for the career family (environment, low-cost ways to explore, networking, ways to practice, long-term growth), and
- data for the linked official occupation: O*NET tasks, related titles, skills, tools, education levels and suggested classes; NCES-linked majors; BLS pay; and possible next moves computed from O*NET skill and task similarity.

- **People, HR and workplace culture** (20 careers): Executive Coach, HR Business Partner, HR Generalist, Human Resources Manager, Labor Relations Specialist, Payroll Specialist, Recruiter, Training and Development Manager
- **Community and public service** (14 careers): Child, Family and School Social Worker, Community Health Worker, Eligibility Interviewer, Emergency Management Director, Nonprofit Program Manager, Probation Officer, Recreation Coordinator, Rehabilitation Counselor, Substance Abuse Counselor, Urban Planner
- **Visual art and design** (16 careers): Architect, Art Director, Fashion Designer, Floral Designer, Graphic Designer, Industrial Designer, Interior Designer, Landscape Architect, Museum Curator, Photographer, UX/UI Designer, Visual Merchandiser
- **Film, TV and animation** (16 careers): Actor, Animator, Broadcast Technician, Camera Operator, Film Director, Film Producer, Film and Video Editor, Lighting Technician, Makeup Artist, Screenwriter, Storyboard Artist, Visual Effects Artist
- **Games and digital content** (11 careers): Esports Event Coordinator, Game Artist, Game Programmer, Game Tester, Level Designer, Social Media Specialist, Video Content Producer, Video Game Designer, Web Designer
- **Music and audio** (9 careers): Composer, Live Sound Engineer, Music Teacher, Musician, Sound Engineer, Talent Agent
- **Writing and communication** (15 careers): Author, Editor, Journalist, Proofreader, Public Relations Specialist, Sign Language Interpreter
- **Technology, data, AI and cybersecurity** (26 careers): Blockchain Engineer, Business Intelligence Analyst, Cloud Engineer, Computer Hardware Engineer, Computer Systems Analyst, Computer and Information Research Scientist, Data Scientist, Database Administrator, DevOps Engineer, IT Support Specialist, Information Security Engineer, Machine Learning Engineer, Network Administrator, Penetration Tester, Software Developer, Web Developer
- **Robotics, automation and manufacturing** (11 careers): Automation Engineer, CNC Programmer, Controls Engineer, Electro-Mechanical Technician, Industrial Machinery Mechanic, Manufacturing Engineer, Mechatronics Engineer, RPA Developer, Robotics Engineer, Robotics Technician
- **Engineering and skilled trades** (20 careers): Automotive Technician, Building Inspector, Carpenter, Civil Engineer, Construction Manager, Diesel Mechanic, Electrical Engineer, Electrical Lineworker, Electrician, HVAC Technician, Heavy Equipment Operator, Land Surveyor, Machinist, Mechanical Engineer, Plumber, Welder
- **Healthcare, physicians and medical specialties** (39 careers): Anesthesiologist, Art Therapist, Dental Hygienist, Dentist, Dermatologist, Diagnostic Medical Sonographer, Dietitian, Emergency Medicine Physician, Family Medicine Physician, Marriage and Family Therapist, Medical Laboratory Scientist, Medical and Health Services Manager, Nurse Practitioner, Nursing Director, Occupational Therapist, Optometrist, Orthopedic Surgeon, Paramedic, Pediatrician, Pharmacist, Physical Therapist, Physician Assistant, Psychiatrist, Radiologic Technologist, Radiologist, Registered Nurse, Respiratory Therapist, Surgical Technologist
- **Science, research and space** (18 careers): Aerospace Engineer, Aerospace Engineering Technician, Astronomer, Biochemist, Biological Technician, Chemist, Epidemiologist, Forensic Science Technician, Geneticist, Geoscientist, Materials Scientist, Meteorologist, Microbiologist, Physicist, Remote Sensing Scientist
- **Education and learning** (16 careers): College Biology Professor, College Dean, ESL Teacher, Elementary School Teacher, High School Teacher, Librarian, Preschool Teacher, School Counselor, School Principal, Special Education Teacher, Tutor
- **Law and public safety** (13 careers): Detective, Emergency Dispatcher, Firefighter, Intelligence Analyst, Judge, Lawyer, Police Officer, Private Investigator, Security Manager
- **Hospitality, events and tourism** (9 careers): Chef, Concierge, Hotel Manager, Meeting and Convention Planner, Restaurant Manager, Tour Guide, Travel Agent
- **Agriculture and animal care** (12 careers): Agricultural Engineer, Agricultural Inspector, Animal Scientist, Animal Trainer, Farm Manager, Precision Agriculture Technician, Soil and Plant Scientist, Veterinarian, Veterinary Technician, Zoologist
- **Transportation and aviation** (12 careers): Air Traffic Controller, Aircraft Mechanic, Airfield Operations Specialist, Airline Pilot, Commercial Pilot, Dispatcher, Flight Attendant, Locomotive Engineer, Ship Captain, Transportation Planner, Truck Driver
- **Sales, business and operations** (25 careers): Accountant, Financial Analyst, Insurance Underwriter, Logistician, Management Consultant, Market Research Analyst, Marketing Manager, Operations Manager, Product Manager, Project Manager, Purchasing Manager, Real Estate Agent, Sales Representative, Warehouse Operations Manager
- **Environment, climate, conservation and energy** (17 careers): Climate Change Policy Analyst, Conservation Scientist, Energy Auditor, Environmental Engineer, Environmental Scientist, Fish and Game Warden, Forester, Geothermal Technician, Recycling Coordinator, Solar Energy Systems Engineer, Solar Installer, Water Treatment Plant Operator

## Sources

- **O*NET Database**, U.S. Department of Labor, Employment and Training Administration (USDOL/ETA), used under CC BY 4.0. Tasks, related titles and tools come from O*NET 30; skills, education levels, interests and job zones come from earlier O*NET releases. See `DATA-SOURCES.md` for the required attribution.
- **U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics (OEWS)**: national pay percentiles (May 2025 where published, otherwise May 2024) and state medians (May 2024). Each pay section shows its date.
- **National Center for Education Statistics**: CIP 2020 to SOC 2018 crosswalk, linking college programs to occupations.
- **Role-specific profiles**: researched in October 2026 from BLS, professional associations and credential bodies. Salary figures link to their sources and were spot-checked against BLS pages. The Astronaut profile uses NASA's published requirements.
- **Links to current information**: every career page links to O*NET OnLine, BLS wage data, the BLS Occupational Outlook Handbook, CareerOneStop (certifications, state licenses, local training), Apprenticeship.gov and job searches (Indeed, LinkedIn, USAJOBS).

## What has been tested

Tested in a headless Chromium browser on October 25, 2026:

- **Quick match:** three simulated students answered "yes" only to scenarios fitting their interest. Robotics: 11 questions → Controls Engineer, then Mechatronics Engineer, Drone Pilot, Robotics Engineer, Astronaut. Animals: 8 questions → Zoologist, then Animal Enrichment Specialist, Animal Trainer, Veterinary Technician. People and leadership: 11 questions → Executive Coach, then Organizational Development Consultant and Academic Advisor. Back, Skip, Change my picks, the step-by-step path for the top match and other matches, opening a full profile, and returning to results all worked.

- No JavaScript errors while loading or using any screen.
- The quiz: multi-select on every step, going back to earlier steps keeps selections, unselecting a parent clears its children, the live match count updates, and selections and the note persist after reloading.
- Results: "why it showed up" explanations, family filter, sorting, removing a selection from the results page.
- Career library search and family filter (all 19 families plus "All paths"), the role-specific filter, save, compare (up to three), and the About page.
- Career pages for both profile types, including the state pay picker and the Astronaut NASA source link.
- Phone width (390 px): no horizontal scrolling. All quiz options are real buttons with `aria-pressed`, so they work with a keyboard and screen readers announce their state.
- `tools/validate.py` checks that every O*NET code exists, every tag is a real quiz scenario, there are no duplicate titles, and every scenario leads to at least two careers.

**Regression examples.** These recreate the five checks from the original prototype. Counts differ because this version has a different catalog (319 cards instead of 228) and its own tags:

| Path | Prototype | OpenPath | Why it differs |
|---|---|---|---|
| Technology → Robotics → "Troubleshooting a robot that stopped working" | 14 | 10 | Only careers whose day-to-day work includes fixing robots or automated machines are tagged (for example Robotics Technician, Controls Engineer, Industrial Machinery Mechanic, Astronaut). Broader engineering roles are reached through other robotics scenarios. |
| Creative → Film and TV → "Writing a screen story and seeing it filmed" | 7 | 9 | Includes storytelling roles beyond film crews, such as Narrative Designer (games) and Author. |
| Analysis → Finding patterns in data → "Spotting an unusual pattern in a dataset" | 7 | 14 | Many careers across families analyze data (for example Epidemiologist, Fraud Analyst, Radiologist, Climate Change Policy Analyst), so this scenario intentionally spans families. |
| Hands-on work → Using tools → "Repairing equipment that broke down" | 10 | 13 | The larger trades, aviation and robotics catalog adds more repair roles. |
| Technology robot-troubleshooting scenario + Teamwork "Building a product with a team of specialists" | 26 | 24 | Union of the two scenarios. Careers matching both (for example Robotics Engineer) rank first. |

**Not tested:** real screen readers (only the structure was checked), every browser (only Chromium), performance on very old phones, printing on every printer, and outcomes with real students. The matching has not been validated as a career assessment.

## Known limitations

- **Coverage:** 319 curated titles, not every job. Many specialty titles share one official occupation.
- **Salary:** BLS pay describes broad occupations. A specialty title's real pay may differ, and pages say so. Pay varies by location, employer, experience and time.
- **Licensing and credentials:** listed as things to look into, not legal requirements. Rules vary by state and change. Students should confirm with the credential body or their state licensing board (each page links to CareerOneStop's license finder).
- **Estimates:** a few newer O*NET occupations have no published survey data yet. Their skills, interests or education come from the most similar occupation, and the page says so.
- **Shared guidance:** family-level advice is general and may not fit every title in that family.
- **Matching:** hand-tagged scenarios plus simple word matching; not a validated assessment.
- **Data dates:** O*NET and BLS data were current as of October 2026; refresh them periodically (see below).

## How to add careers or update data

All content lives in `tools/catalog.py` and `data/`.

**Add a career**
1. Find its official O*NET-SOC code at [O*NET OnLine](https://www.onetonline.org/) (for example `15-1252.00`).
2. Add a line to `CAREERS` in `tools/catalog.py`:
   ```python
   ("Game Audio Designer", "music", "27-4014.00", "Creates sound effects and music systems for video games.", "mus_sfx anim_level ind_create"),
   ```
   Fields: title, family id (one of the keys in `FAMILIES`), O*NET code (or `""` if none), a one-sentence description, and space-separated scenario ids from `INTERESTS`/`STYLES` that this career fits.
3. Run `python tools/validate.py` and fix anything it reports.
4. Run `python tools/build.py` to rebuild `index.html`.

**Add role-specific research for a career:** add an entry with the same title to `data/researched-profiles.json` (copy an existing entry's structure: description, also called, and a profile with day, environment, pay with source, skills, certifications, learning, high school classes, majors, networking, ways in, path and branches). Rebuild. The page switches from shared guidance to role-specific details automatically.

**Add or edit quiz questions:** edit `INTERESTS` or `STYLES` in `tools/catalog.py`. Keep ids unique, tag careers with any new scenario ids, then validate and rebuild.

**Update family guidance:** edit `FAMILIES` in `tools/catalog.py`.

**Refresh official data:** `data/official-occupations.json` holds the processed O*NET, BLS and NCES data (occupations, titles, tasks, skills, education, pay and majors). Regenerate it from new O*NET and BLS releases, keep the same structure, then validate and rebuild.

## Files

| Path | What it is |
|---|---|
| `index.html` | The app (open this) |
| `openpath-prototype.html` | The earlier OpenPath prototype, kept for reference |
| `Hackathon Submission.md` | Hackathon submission write-up |
| `tools/catalog.py` | Quiz questions, career families and career cards |
| `tools/validate.py` | Catalog checks |
| `tools/build.py` | Builds `index.html` |
| `tools/template.html` | App design and code (Quick match, detailed quiz, results, library, career pages) |
| `data/official-occupations.json` | Processed O*NET, BLS and NCES data |
| `data/researched-profiles.json` | Role-specific research |

---

© 2026 [Your Name]. All rights reserved. See `LICENSE.md`. Third-party data is credited in `DATA-SOURCES.md`.
