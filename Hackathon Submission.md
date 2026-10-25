# OpenPath — career choices beyond familiar job titles

## Short description

OpenPath helps students explore careers they may not know to search for yet. Students can describe what they enjoy in their own words or ask for guided choices. The app connects those signals to a broad set of career titles, then shows possible entry routes, majors and classes to investigate, work settings, skills, credentials, networking ideas, and longer-term specialist or leadership options. It also points students to current U.S. occupation, wage, and job-search resources so they can check the details before investing time or tuition.

## The problem

Students often have to choose classes, training, or a college major before they understand the range of jobs connected to their interests. They may know a few familiar titles—such as teacher, doctor, software developer, or HR—but not the specialties and less-visible roles within those fields. A broad preference like “I like helping people” can connect to many different kinds of work, but a list of job titles alone does not explain what the work is like or how to try it safely.

The problem OpenPath is designed to address is the gap between having an interest and making an informed education or career decision. The app is intended to help students explore and verify options before making a costly commitment; it cannot guarantee a perfect career choice or prevent every wrong turn.

## Who has this problem

The first audience is high-school and college students who are exploring majors, electives, internships, or early jobs. School counselors, career advisers, and families may also use the app as a conversation starter. The first release is U.S.-focused; job requirements, pay, licensing, and education routes differ by location.

## How OpenPath helps

A student can write about what they enjoy, care about, or want more of in a workday. If they are unsure how to begin, they can instead select interests and work preferences such as hands-on work, teamwork, structure, pace, fieldwork, or independent focus. OpenPath uses those choices to order career suggestions and shows the signals that helped a role appear.

Each career profile offers a starting route from early experience to more advanced work, plus work-environment notes, ways to get first experience, relevant majors and classes to investigate, skills and credentials to check, networking ideas, and longer-term specialization or leadership options. A “before spending on a major or program” checklist asks students to verify prerequisites, cost, accreditation, transfer rules, licensing outcomes, and lower-cost ways to try the field.

Students can save paths and return to them in the same browser. They can also search an exact title in O*NET, review Bureau of Labor Statistics occupation information, or search current U.S. job postings by title and location through CareerOneStop.

## What is in the current demo

The local demo contains 129 unique career-title cards across people and culture, community, creative work, information technology, software and data, engineering and robotics, healthcare, physician specialties, science and space, sales and business, operations, and environment-related work. Examples include cybersecurity analyst, robotics technician, robotics engineer, registered nurse, cardiologist, radiologist, genetic counselor, astronomer, planetary scientist, astronaut, sales engineer, talent acquisition specialist, people analytics analyst, and supply-chain analyst.

The 18 original profiles have more role-specific descriptions and details. The additional titles broaden discovery, but many use shared career-family summaries and pathways. They are not individually researched occupational reports. Students are directed to the linked official occupation profiles for the exact tasks, requirements, and alternate titles. The library is a useful starting set, not every title used by every employer or a complete worldwide job catalog.

## How it was built

The demo is a responsive, single-page application built with HTML, CSS, and JavaScript. It runs in a browser without a server or account. The career list, interest choices, role-detail views, search, filters, saved paths, education guidance, and result ordering are implemented in the page. Saved roles use the browser’s local storage.

The current matching is transparent keyword and category matching. It is not a predictive model, a clinical or psychological assessment, or a validated measure of who will thrive in a job. The student’s free-text note stays in the browser. When a student opens an external search, the career title and optional location are sent to the linked occupation or job-search site.

## Market data and source links

The app links to O*NET’s current U.S. occupation catalog, which lists 1,016 occupation records in its current release and includes titles, tasks, skills, interests, education, and related information. It links to the Bureau of Labor Statistics’ Occupational Outlook Handbook and wage resources for education, duties, pay, and outlook. Current job postings are opened through CareerOneStop using the selected title and location.

A small subset of the demo profiles displays a sourced national median-pay benchmark for a related occupation. The rest direct students to external wage information because specialty titles do not always have a separate national estimate. The demo does not contain a live wage feed or display current job postings inside the app. National median pay is not a promise of an individual salary; local wages, employer, industry, experience, credentials, and job title matter.

## Similar tools and the opportunity

There are already useful career-exploration services. My Next Move offers interest-based discovery and profiles for more than 900 careers. BigFuture connects career quizzes, career profiles, and majors. CareerOneStop provides occupation profiles, wage and outlook information, local job searches, and training resources.

OpenPath should be presented as a complementary student-facing guide, not as the first career quiz or the largest career database. Its proposed contribution is to put self-description, less-familiar titles, a readable path, and a practical “check this before paying” sequence into one flow, while handing students off to established sources for current facts. Whether that joined-up experience is easier or more useful for students is a question for testing, not a proven result.

## Testing completed

A local functional smoke check exercised the app’s JavaScript and browser-page structure. It confirmed that all 129 unique career details can open, story-based and guided choices return roles, exact-title search can find Astronaut while interest filters are active, the astronaut profile shows its NASA-specific requirements link, and the current-job search link includes the entered location. The page’s script parses, the HTML structure balances, role controls have unique IDs, and the data placeholder count is zero.

These checks confirm that core interactions work. They do not measure recommendation accuracy, user satisfaction, employment outcomes, or whether a student made a better education decision. No student study or professional review has been completed yet.

## Accuracy, privacy, and limits

OpenPath does not know where a student will thrive. It can only surface roles that share selected interest or work-style signals and explain those signals. The current rules can miss relevant careers, return too many broad matches, or misunderstand nuanced writing. The work-style labels describe broad environments, not every employer or team.

The featured library and family-level descriptions need review by students, school counselors, workers in each field, and subject-matter experts. Education and licensing rules should be checked against current program and jurisdiction requirements. Salary and job-outlook facts should be refreshed from their original sources, and live openings should always be treated as time-sensitive.

The app does not send the student’s free-text note to the linked sites. The title and location are included only when the student chooses to open an external search. Saved paths remain in the same browser unless the student clears that browser data.

## How we would test the next version

1. Ask students to describe an interest or use guided choices, then record whether they can explain why the suggested roles appeared.
2. Have students and career advisers rate the top five suggestions for relevance, variety, and discoverability; do not call those ratings “prediction accuracy.”
3. Check a sample of profiles in each career family with practitioners and advisers for accurate duties, entry routes, majors, licenses, credentials, pay sources, and leadership paths.
4. Test whether students can find an exact title, understand its education route, find local postings, save a path, and identify a low-cost way to explore before choosing a major.
5. Track the share of students who find at least one previously unknown role they want to investigate, while also checking for misleading matches and inaccessible paths.
6. Repeat the content check when O*NET, BLS, licensing boards, or education programs update their requirements.

## Next steps

- Publish a shareable demo and replace the local preview address with its public URL.
- Build a source-mapped role catalog from current occupation data, with visible source, date, alternate titles, and a clear distinction between verified facts and student-facing summaries.
- Add a preference and constraints profile for location, education budget, time to train, accessibility needs, preferred work setting, and willingness to relocate.
- Add side-by-side pathway comparison, including time, tuition, prerequisites, licenses, paid entry routes, and transfer options, using current sources.
- Test recommendations with students and advisers before making stronger claims about fit or outcomes.
- If an AI assistant is added later, use it to explain sourced role information and suggest questions to ask—not to make a career decision for a student. Keep citations and allow students to inspect and correct the assumptions.

## Demo URL

Public demo URL: **not published yet**. The working demo is the local `index.html` file in the Career Discovery folder and is only accessible on this computer. Add the public GitHub Pages or other hosting URL here before submitting the application.

## Sources

- O*NET 31.0 occupation database and current release information: https://www.onetcenter.org/database.html and https://www.onetcenter.org/whatsnew.html
- O*NET occupation keyword search: https://www.onetonline.org/find/quick
- Bureau of Labor Statistics Occupation Finder: https://www.bls.gov/ooh/occupation-finder.htm
- CareerOneStop occupation, wage, interest, and job-search tools: https://www.careeronestop.org/Toolkit/Careers/careers.aspx
- My Next Move overview: https://www.mynextmove.org/help/about/
- BigFuture careers and majors: https://bigfuture.collegeboard.org/community/careers-majors
- NASA astronaut requirements: https://www.nasa.gov/humans-in-space/astronauts/become-an-astronaut/
- O*NET 31.0 database licensing: https://www.onetcenter.org/license_db.html
