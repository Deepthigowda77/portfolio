/* Portfolio app. React + htm (JSX-like templates without a build step). */
(function () {
  "use strict";

  const { useState, useEffect, useRef } = React;
  const html = htm.bind(React.createElement);

  /* ---------------- content (taken from the resume) ---------------- */
  const DATA = {
    name: "Deepthi P S",
    first: "Deepthi",
    role: "Full Stack Web Developer",
    company: "Excelr Pvt Ltd",
    email: "im.deepthips@gmail.com",
    phone: "8088413427",
    phoneShown: "80884 13427",
    location: "Bengaluru, Karnataka",
    linkedin: { href: "https://www.linkedin.com/in/im-deepthips/", label: "linkedin.com/in/im-deepthips" },
    github: { href: "https://github.com/Deepthigowda77", label: "github.com/Deepthigowda77" },
  };

  const NAV = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "project", label: "Project" },
    { id: "contact", label: "Contact" },
  ];

  const SKILLS = [
    {
      group: "Frontend",
      items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "React Router", "Redux Toolkit", "Context API", "Axios", "Vite", "Responsive UI", "Lazy Loading", "Code Splitting"],
    },
    {
      group: "Backend",
      items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "JWT Authorization", "bcryptjs", "Middleware", "CORS", "dotenv"],
    },
    { group: "Database", items: ["MySQL"] },
    {
      group: "Cloud & DevOps",
      items: ["AWS EC2", "AWS S3", "AWS VPC", "AWS CloudWatch", "AWS Lambda", "Docker", "Docker Compose", "Nginx", "Docker Networking", "Persistent Volumes", "Health Checks", "CI/CD concepts"],
    },
    { group: "Tools", items: ["Git", "GitHub", "Postman", "VS Code", "Docker Desktop", "MySQL Workbench"] },
  ];

  const WORK = [
    "Develop responsive web applications and reusable UI components using React.js, JavaScript, HTML5 and CSS3.",
    "Integrate REST APIs into front-end applications to support business workflows and application data.",
    "Build and maintain backend APIs using Node.js and Express.js, with MySQL for persistent data storage.",
    "Implement authentication and authorization using JWT, bcrypt password hashing and protected routes.",
    "Containerize applications with Docker and Docker Compose, configuring networking, environment variables, volumes and Nginx.",
    "Work with AWS services (EC2, S3, VPC, CloudWatch, Lambda) for cloud hosting and deployment.",
    "Manage source code with Git and GitHub, and collaborate with QA and UX teams in an Agile environment.",
  ];

  const PROJECT_TECH = ["React.js", "Node.js", "Express.js", "MySQL", "JWT", "Redux Toolkit", "Docker", "Nginx"];

  const NODES = [
    {
      id: "web",
      tag: "Container 1",
      name: "Frontend",
      sub: "React.js served by Nginx",
      points: [
        "React.js app with React Router, Redux Toolkit and Context API.",
        "Axios service layer with request and response interceptors.",
        "React.memo, useMemo, useCallback, lazy loading and code splitting for performance.",
        "Multi-stage Docker build served through Nginx, with an SPA routing fallback.",
        "Vite build-time environment variables.",
      ],
    },
    {
      id: "api",
      tag: "Container 2",
      name: "Backend",
      sub: "Node.js + Express.js",
      points: [
        "REST APIs for employee and user data.",
        "JWT authentication with bcrypt password hashing.",
        "Express middleware and Bearer-token authorization protect the API.",
        "Runtime environment variables configured for the backend.",
      ],
    },
    {
      id: "db",
      tag: "Container 3",
      name: "Database",
      sub: "MySQL",
      points: [
        "Stores employee and user data persistently.",
        "Named Docker volume for the database files.",
        "Health check that reports whether MySQL is up.",
      ],
    },
  ];

  const LINKS = ["REST calls with a Bearer token", "Reads and writes data"];

  const HIGHLIGHTS = [
    { h: "What it does", p: "Employee details with add, edit and delete workflows, full CRUD operations and protected routes." },
    { h: "Login and access", p: "JWT authentication, bcrypt password hashing, Express middleware and Bearer-token authorization." },
    { h: "Speed", p: "React.memo, useMemo, useCallback, lazy loading and code splitting to improve front-end performance." },
    { h: "How I checked it", p: "A clean no-cache Docker rebuild, then end-to-end login and CRUD testing." },
  ];

  const TRAINING = [
    "Web Development training completed.",
    "AWS course completed at Excelr Institute.",
    "Hands-on learning in Docker, Docker Compose, Git/GitHub, Linux basics and cloud deployment concepts.",
  ];

  /* ---------------- helpers ---------------- */
  function reducedMotion() {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  }

  function go(e, id) {
    e.preventDefault();
    scrollToId(id);
  }

  function initialTheme() {
    try {
      const saved = localStorage.getItem("dps-theme");
      if (saved === "light" || saved === "dark") {
        document.documentElement.dataset.theme = saved;
        return saved;
      }
    } catch (e) {
      /* storage can be blocked; fall through to the system setting */
    }
    const attr = document.documentElement.dataset.theme;
    if (attr === "light" || attr === "dark") return attr;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function useActiveSection(ids) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
      if (!("IntersectionObserver" in window)) return undefined;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) setActive(en.target.id);
          });
        },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) obs.observe(el);
      });
      return () => obs.disconnect();
    }, []);
    return active;
  }

  /* ---------------- small components ---------------- */
  const Sun = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>`;

  const Moon = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>`;

  const Arrow = html`<svg viewBox="0 0 34 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 5h31M27 1l5 4-5 4" />
  </svg>`;

  function Header({ active, theme, onToggle }) {
    return html`
      <header className="top">
        <div className="wrap top-row">
          <a className="wordmark" href="#top" onClick=${(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" }); }}>
            ${DATA.name}<span className="dot" aria-hidden="true"></span>
          </a>
          <nav className="nav" aria-label="Sections">
            ${NAV.map(
              (n) => html`<a key=${n.id} href=${"#" + n.id} className=${active === n.id ? "is-active" : ""} aria-current=${active === n.id ? "true" : undefined} onClick=${(e) => go(e, n.id)}>${n.label}</a>`
            )}
          </nav>
          <button type="button" className="theme-btn" onClick=${onToggle} aria-label=${theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
            ${theme === "dark" ? Sun : Moon}
          </button>
        </div>
      </header>
    `;
  }

  /* the code card in the hero: each line is [indent, [[class, text], ...]] */
  const q = (t) => ["c-str", '"' + t + '"'];
  const list = (arr) => {
    const out = [["c-p", "["]];
    arr.forEach((t, i) => {
      out.push(q(t));
      if (i < arr.length - 1) out.push(["c-p", ", "]);
    });
    out.push(["c-p", "],"]);
    return out;
  };
  const CODE = [
    [0, [["c-kw", "const "], ["c-key", "deepthi"], ["c-p", " = {"]]],
    [2, [["c-key", "role"], ["c-p", ": "], q(DATA.role), ["c-p", ","]]],
    [2, [["c-key", "company"], ["c-p", ": "], q(DATA.company), ["c-p", ","]]],
    [2, [["c-key", "experience"], ["c-p", ": "], q("3 years"), ["c-p", ","]]],
    [2, [["c-key", "frontend"], ["c-p", ": "], ...list(["React.js", "Redux Toolkit"])]],
    [2, [["c-key", "backend"], ["c-p", ": "], ...list(["Node.js", "Express.js", "MySQL"])]],
    [2, [["c-key", "deploy"], ["c-p", ": "], ...list(["Docker", "Nginx", "AWS"])]],
    [2, [["c-key", "base"], ["c-p", ": "], q("Bengaluru"), ["c-p", ","]]],
    [0, [["c-p", "};"]]],
  ];

  function CodeCard() {
    return html`
      <div className="codecard" aria-label="Quick summary written as code">
        <div className="codecard-bar">deepthi.js</div>
        <div className="codecard-body">
          ${CODE.map(
            ([indent, segs], i) => html`<div key=${i} className="ln" style=${{ paddingLeft: indent + "ch" }}>
              ${segs.map(([cls, text], j) => html`<span key=${j} className=${cls}>${text}</span>`)}
            </div>`
          )}
        </div>
      </div>
    `;
  }

  function Hero() {
    return html`
      <section className="hero" id="top">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">${DATA.role} · Bengaluru</p>
            <h1>
              Hi, I'm ${DATA.first}. I build web apps <span className="mark">from the browser to the database</span>.
            </h1>
            <p className="lede">
              I'm a software engineer with three years of experience in React.js, Node.js, Express.js and MySQL. I also package what I build with Docker and deploy it on AWS.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#project" onClick=${(e) => go(e, "project")}>See my project</a>
              <a className="btn btn-ghost" href="#contact" onClick=${(e) => go(e, "contact")}>Get in touch</a>
            </div>
            <p className="hero-links">
              <a href=${DATA.github.href} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href=${DATA.linkedin.href} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </p>
          </div>
          <${CodeCard} />
        </div>
      </section>
    `;
  }

  function Section({ id, title, note, children }) {
    return html`
      <section id=${id} className="sec">
        <div className="wrap sec-grid">
          <div className="sec-head">
            <h2>${title}</h2>
            ${note ? html`<p>${note}</p>` : null}
          </div>
          <div className="sec-body">${children}</div>
        </div>
      </section>
    `;
  }

  function About() {
    return html`
      <${Section} id="about" title="About" note="A short version of me.">
        <div className="prose">
          <p>
            I'm a software engineer with three years of professional experience in full stack web development. Most of my work is in React.js, JavaScript, Node.js, Express.js and MySQL.
          </p>
          <p>
            I build responsive user interfaces, REST APIs, JWT authentication flows, CRUD applications and reusable components. I also containerize applications with Docker, Docker Compose and Nginx, and I've worked with AWS services for cloud deployment.
          </p>
        </div>
        <dl className="facts">
          <dt>Based in</dt>
          <dd>${DATA.location}</dd>
          <dt>Working at</dt>
          <dd>${DATA.company}, as a Software Engineer</dd>
          <dt>Studied</dt>
          <dd>Computer Science, University of Mysore</dd>
        </dl>
      <//>
    `;
  }

  function Skills() {
    return html`
      <${Section} id="skills" title="Skills" note="The tools I use day to day.">
        ${SKILLS.map(
          (g) => html`<div className="skill-group" key=${g.group}>
            <h3>${g.group}</h3>
            <ul className="chips">
              ${g.items.map((s) => html`<li className="chip" key=${s}>${s}</li>`)}
            </ul>
          </div>`
        )}
      <//>
    `;
  }

  function Experience() {
    return html`
      <${Section} id="experience" title="Experience" note="Where I work.">
        <article className="role">
          <div className="role-head">
            <div>
              <h3>Software Engineer</h3>
              <p className="org">${DATA.company}, Bengaluru, Karnataka</p>
            </div>
            <p className="when">Oct 2023 – Present</p>
          </div>
          <ul className="dolist">
            ${WORK.map((w) => html`<li key=${w}>${w}</li>`)}
          </ul>
        </article>
      <//>
    `;
  }

  function Project() {
    const [sel, setSel] = useState("web");
    const node = NODES.find((n) => n.id === sel);
    return html`
      <${Section} id="project" title="Project" note="Something I built end to end.">
        <div className="proj-head">
          <p className="when">Jun 2025</p>
          <h3>Employee Management System</h3>
          <ul className="chips">
            ${PROJECT_TECH.map((t) => html`<li className="chip" key=${t}>${t}</li>`)}
          </ul>
        </div>
        <p className="prose" style=${{ marginTop: "20px" }}>
          A full-stack application for managing employees. It runs as three Docker containers, so the whole thing starts with one command. Select a container to see what lives in it.
        </p>

        <div className="arch">
          <p className="arch-label">Docker Compose</p>
          <div className="arch-row">
            ${NODES.map(
              (n, i) => html`<${React.Fragment} key=${n.id}>
                <button type="button" className="node" aria-pressed=${sel === n.id} onClick=${() => setSel(n.id)}>
                  <small>${n.tag}</small>
                  <strong>${n.name}</strong>
                  <span className="sub">${n.sub}</span>
                </button>
                ${i < NODES.length - 1
                  ? html`<div className="link" aria-hidden="true"><span>${LINKS[i]}</span>${Arrow}</div>`
                  : null}
              <//>`
            )}
          </div>
          <div className="node-detail" aria-live="polite">
            <h4>${node.name}: ${node.sub}</h4>
            <ul className="dolist">
              ${node.points.map((p) => html`<li key=${p}>${p}</li>`)}
            </ul>
          </div>
        </div>

        <div className="hl">
          ${HIGHLIGHTS.map((h) => html`<div key=${h.h}><h4>${h.h}</h4><p>${h.p}</p></div>`)}
        </div>
      <//>
    `;
  }

  function Education() {
    return html`
      <${Section} id="education" title="Education" note="Studies and training.">
        <div className="edu-block">
          <h3>Bachelor's Degree, Computer Science</h3>
          <p className="org">University of Mysore</p>
          <p className="when">Oct 2022</p>
        </div>
        <div className="edu-block">
          <h3>Additional training</h3>
          <ul className="dolist">
            ${TRAINING.map((t) => html`<li key=${t}>${t}</li>`)}
          </ul>
        </div>
      <//>
    `;
  }

  function CopyButton({ value, targetRef, label }) {
    const [state, setState] = useState("idle");
    const timer = useRef(null);
    async function copy() {
      let ok = false;
      try {
        await navigator.clipboard.writeText(value);
        ok = true;
      } catch (e) {
        try {
          const el = targetRef && targetRef.current;
          if (el) {
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            ok = document.execCommand("copy");
          }
        } catch (e2) {
          ok = false;
        }
      }
      setState(ok ? "copied" : "selected");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setState("idle"), 2200);
    }
    const text = state === "copied" ? "Copied" : state === "selected" ? "Press Ctrl+C" : "Copy";
    return html`<button type="button" className="copy" onClick=${copy} aria-label=${"Copy " + label}>${text}</button>`;
  }

  function ContactRow({ label, children, copy }) {
    const ref = useRef(null);
    return html`
      <div className="contact-row">
        <span className="lbl">${label}</span>
        <span className="val" ref=${ref}>${children}</span>
        ${copy ? html`<${CopyButton} value=${copy} targetRef=${ref} label=${label.toLowerCase()} />` : html`<span></span>`}
      </div>
    `;
  }

  function Contact() {
    return html`
      <${Section} id="contact" title="Contact" note="Say hello.">
        <p className="contact-intro">The quickest way to reach me is email or phone. My LinkedIn and GitHub are below too.</p>
        <div className="contact-list">
          <${ContactRow} label="Email" copy=${DATA.email}>${DATA.email}<//>
          <${ContactRow} label="Phone" copy=${DATA.phone}>${DATA.phoneShown}<//>
          <${ContactRow} label="LinkedIn"><a href=${DATA.linkedin.href} target="_blank" rel="noopener noreferrer">${DATA.linkedin.label}</a><//>
          <${ContactRow} label="GitHub"><a href=${DATA.github.href} target="_blank" rel="noopener noreferrer">${DATA.github.label}</a><//>
          <${ContactRow} label="Location">${DATA.location}<//>
        </div>
      <//>
    `;
  }

  function Footer() {
    return html`
      <footer className="foot">
        <div className="wrap">
          <span>© ${new Date().getFullYear()} ${DATA.name}</span>
          <span>Built with React, HTML and CSS</span>
        </div>
      </footer>
    `;
  }

  function App() {
    const [theme, setTheme] = useState(initialTheme);
    const active = useActiveSection(["about", "skills", "experience", "project", "contact"]);

    function toggle() {
      const next = theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      setTheme(next);
      try {
        localStorage.setItem("dps-theme", next);
      } catch (e) {
        /* not saved; the choice still applies for this visit */
      }
    }

    return html`
      <${Header} active=${active} theme=${theme} onToggle=${toggle} />
      <main>
        <${Hero} />
        <${About} />
        <${Skills} />
        <${Experience} />
        <${Project} />
        <${Education} />
        <${Contact} />
      </main>
      <${Footer} />
    `;
  }

  globalThis.PortfolioApp = App;
  const rootEl = document.getElementById("root");
  if (rootEl) ReactDOM.createRoot(rootEl).render(html`<${App} />`);
})();