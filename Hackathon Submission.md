# OpenPath — career choices beyond familiar job titles

## Short description

OpenPath helps students explore careers they may not know to search for yet. In about two minutes, a student picks a few interests, answers short "Would you enjoy this?" questions, and gets a top match plus five other strong matches. Each match comes with a step-by-step path: what to do now in high school, what to study, how to get a first role, how to grow, and how to lead or specialize, with pay at each stage. The app points students to current U.S. occupation, wage, credential and job-search sources so they can verify details before investing time or tuition.

## The problem

Students often have to choose classes, training or a college major before they understand the range of jobs connected to their interests. They may know a few familiar titles, such as teacher, doctor, software developer or HR, but not the specialties and less-visible roles within those fields. A broad preference like "I like helping people" can connect to many different kinds of work, but a list of job titles alone doesn't explain what the work is like or how to try it safely.

OpenPath addresses the gap between having an interest and making an informed education or career decision. It helps students explore and verify options before making a costly commitment. It cannot guarantee a perfect career choice or prevent every wrong turn.

## Who has this problem

The first audience is high school and college students exploring majors, electives, internships or early jobs. School counselors, career advisers and families can use the app as a conversation starter. The first release is U.S.-focused; job requirements, pay, licensing and education routes differ by location.

## How OpenPath helps

**Quick match.** The student picks any of ten interest tiles (fewer gives a sharper match) (people and culture, analysis and problem-solving, creative work, community, operations, science, communication, leadership, environment and technology) and, optionally, any work styles (hands-on work, teamwork, clear structure, fast-changing work, outdoors or fieldwork, independent focus). The app then asks one realistic scenario at a time, such as "Troubleshooting a robot that stopped working" or "Restoring a damaged habitat," with three answers: Yes, Maybe or Not for me. Each question is chosen to best separate the careers still in the running, so most students finish in 6–12 taps. Back, Skip, "Change my picks" and "Show my match now" are always available.

**Transparent results.** The student sees a top match, then five other strong matches. Every match says which "yes" answers connected it. Scoring is simple and documented: +3 for each "yes" scenario a career fits, +1 for "maybe", −3 for "not for me", plus small points for chosen interests and work styles. The top match is described as the best fit for the student's answers, a starting point to explore, not a prediction.

**A step-by-step path for every match.**
1. **Now, in high school:** classes, student organizations and low-cost ways to try the field.
2. **What to study:** the most common education level, majors and programs, useful courses, and a reminder to check cost, accreditation and credit transfer before paying for a program.
3. **First 0–2 years:** the first role, credentials to look into, and starting pay.
4. **Years 2–7:** skills to build, networking ideas, mid-career credentials and typical pay.
5. **Years 8+:** leadership, specialization or pivot options, advanced credentials and senior pay.

**Full career pages** add the work environment, related titles, skills and tools, education reported by workers, majors linked through the official crosswalk, credentials to verify, networking, pay percentiles and pay by state, and links to current sources and job searches. Students can save careers, compare up to three side by side, and print or download a clean one-page plan.

A more detailed multi-step quiz is built in but hidden in this version to keep the experience simple.

## What is in the current demo

- **319 career titles across 19 families**, including people, HR and workplace culture; community and public service; visual art and design; film, TV and animation; games and digital content; music and audio; writing and communication; technology, data, AI and cybersecurity; robotics, automation and manufacturing; engineering and skilled trades; healthcare, physicians and medical specialties; science, research and space; education; law and public safety; hospitality, events and tourism; agriculture and animal care; transportation and aviation; sales, business and operations; and environment, climate, conservation and energy.
- **97 careers with role-specific research** (for example Employee Engagement Specialist, Child Life Specialist, Perfusionist, Foley Artist, Wind Turbine Technician and Astronaut): a typical day, environment, credentials, networking, a five-stage path, specialize/lead/pivot options and a researched pay range linked to its source.
- **222 careers that use shared career-family guidance plus official occupation data.** Their pages say so clearly; they are not individually researched reports about that exact title.
- **256 official occupations linked** for tasks, related titles, skills, tools, education levels, majors and pay.

The library is a useful starting set, not every title used by every employer or a complete job catalog.

## How it was built

OpenPath is a responsive, single-page application built with HTML, CSS and JavaScript. It runs in a browser with no server or account. Saved careers, quiz answers and the compare list use the browser's local storage.

The content is maintained in the repository's `tools` folder: `catalog.py` holds the quiz questions, career families and career cards (each card is tagged with the scenarios it fits); `validate.py` checks that every occupation code exists, every tag is a real quiz scenario and every scenario leads to at least two careers; and `build.py` combines the catalog with processed official data in the `data` folder to produce `index.html`. Adding a career is one line in the catalog followed by a rebuild.

Matching is transparent rule-based scoring on hand-tagged scenarios. It is not a predictive model, a psychological assessment or a validated measure of who will thrive in a job. Role-specific profiles were researched with AI assistance and their pay figures were checked against Bureau of Labor Statistics pages.

## Market data and source links

- **Occupation data:** O*NET Database (U.S. Department of Labor, CC BY 4.0). Tasks, related titles and tools come from O*NET 30; skills, education levels, interests and job zones from earlier O*NET releases. Where a newer occupation has no published survey data yet, the app uses the most similar occupation and labels it as an estimate.
- **Pay:** Bureau of Labor Statistics Occupational Employment and Wage Statistics: national 10th, 25th, median, 75th and 90th percentile pay (May 2025 where published, otherwise May 2024) and state medians (May 2024). Each pay section shows its date and states that it describes the broad occupation, not a guaranteed salary for a specialty title.
- **Majors:** National Center for Education Statistics CIP 2020 to SOC 2018 crosswalk.
- **Links out:** each career page links to O*NET OnLine, BLS wage data and the Occupational Outlook Handbook, CareerOneStop (certifications, state licenses and local training), Apprenticeship.gov and job searches on Indeed, LinkedIn and USAJOBS.

The app does not contain a live wage feed or show live job postings. National pay is not a promise of an individual salary; location, employer, industry, experience, credentials and title all matter.

## Similar tools and the opportunity

There are already useful career-exploration services. My Next Move offers interest-based discovery and profiles for more than 900 careers. BigFuture connects career quizzes, career profiles and majors. CareerOneStop provides occupation profiles, wage and outlook information, job searches and training resources. School platforms such as Naviance and Xello require a school or district license, and newer AI career coaches accept plain language but don't always show where their facts come from.

OpenPath is a complementary, student-facing guide, not the first career quiz or the largest career database. Its contribution is to combine a short adaptive quiz, less-familiar job titles, one clear top match with alternatives, a readable step-by-step path for each, and a "check this before paying" habit, while handing students off to established sources for current facts. Whether that experience is easier or more useful for students is a question for testing, not a proven result.

## Testing completed

Automated tests in a headless Chromium browser (October 25, 2026):

- **Quick match with simulated students** who answered "yes" only to scenarios fitting one interest:
  - Robotics, one area picked: 9 questions → Controls Engineer, then Drone Pilot, Industrial Machinery Mechanic and Robotics Engineer.
  - Robotics, all 10 areas picked: 12 questions → Robotics Engineer, then Drone Pilot, Automation Engineer and Controls Engineer.
  - Animals, six areas and three work styles picked: 8 questions → Veterinarian, then Veterinary Technician, Animal Enrichment Specialist and Wildlife Rehabilitator.
  - People and leadership: 5 questions → Employee Engagement Specialist, then Inclusion Program Specialist and Human Resources Manager.
  - Film, no areas picked: 14 questions → Film and Video Editor, then Colorist, Foley Artist and Narrative Designer.
  - A student who says "not for me" to everything sees "No clear match yet" after 20 questions, with options to keep going or browse.
- Back, Skip, Change my picks, the five-step path for the top match and other matches, opening a full profile and returning to results.
- Print my plan opens a clean plan view; Print calls the browser's print, and Download produces a standalone plan page.
- Career library search and family filters, save, compare, About page, state pay picker, and the Astronaut profile's NASA source link.
- Phone width (390 px) with no horizontal scrolling; no JavaScript errors on any screen.
- The catalog validator reports no problems, and rebuilding from the repository reproduces the published `index.html` exactly.

These checks confirm that core interactions work. They do not measure recommendation quality, user satisfaction, employment outcomes or whether a student made a better education decision. No student study, screen-reader test or professional content review has been completed yet.

## Accuracy, privacy and limits

OpenPath does not know where a student will thrive. It surfaces careers that share the student's answers and explains why. The rules can miss relevant careers or rank a loosely related one too high, and the scenario tags reflect editorial judgment.

Role-specific and family-level content needs review by students, school counselors, workers in each field and subject-matter experts. Credentials are listed as things to look into, not legal requirements; licensing rules vary by state and change. Pay and outlook should be refreshed from the original sources.

Everything a student does stays in their browser. When a student opens an outside link, only the career title is included in that link.

## How we would test the next version

1. Ask students to complete Quick match, then record whether they can explain why their top match appeared.
2. Have students and career advisers rate the top match and five alternatives for relevance, variety and discoverability; do not call those ratings "prediction accuracy."
3. Check a sample of profiles in each career family with practitioners and advisers for accurate duties, entry routes, majors, licenses, credentials, pay sources and leadership paths.
4. Test whether students can follow a step-by-step path, identify a low-cost way to explore, and find what to verify before paying for a program.
5. Track the share of students who find at least one previously unknown role they want to investigate, while checking for misleading matches.
6. Repeat the content check whenever O*NET, BLS, licensing boards or education programs update their requirements.

## Next steps

- Refresh all occupation data to the current O*NET release (31.0) and the newest BLS estimates.
- Add a location and constraints step (state, budget, time to train, accessibility needs) so pay and training options reflect where the student lives.
- Have counselors and practitioners review the role-specific profiles and family guidance.
- Test Quick match with students and advisers before making stronger claims about fit or outcomes.
- If an AI assistant is added later, use it to explain sourced role information and suggest questions to ask, not to make a career decision for a student. Keep citations and let students inspect the assumptions.

## Demo URL

- **Live demo:** https://hackathonvanguard.vercel.app
- **Repository:** https://github.com/ble-fortinet/OCI-Hackathon
- The app also runs offline: download `index.html` and open it in any browser.

## Sources

- O*NET Database and release information: https://www.onetcenter.org/database.html and https://www.onetcenter.org/whatsnew.html
- O*NET database license: https://www.onetcenter.org/license_db.html
- O*NET OnLine: https://www.onetonline.org/
- BLS Occupational Employment and Wage Statistics: https://www.bls.gov/oes/
- BLS Occupational Outlook Handbook: https://www.bls.gov/ooh/
- NCES CIP to SOC crosswalk: https://nces.ed.gov/ipeds/cipcode/resources.aspx?y=56
- CareerOneStop: https://www.careeronestop.org/
- My Next Move overview: https://www.mynextmove.org/help/about/
- BigFuture careers and majors: https://bigfuture.collegeboard.org/community/careers-majors
- NASA astronaut requirements: https://www.nasa.gov/humans-in-space/astronauts/become-an-astronaut/

---

© 2026 [Your Name]. All rights reserved.
