// Radar contacts shown in the hero console. Add/remove/reorder freely —
// each one gets a scattered position on the ring, derived from its own
// text, so it lands in the same spot every time instead of jumping around.
const radarSkills = ["CybOps", "root ~#", "M365"," ", "_0x01","</ >", "SEC", "WEB pTest", "Net" ,""];

function hashSeed(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 43758.5453123;
  return x - Math.floor(x);
}

// Places each skill at a randomized spot on the ring, but rejects
// candidates that land too close to an already-placed node — so the
// result stays scattered instead of clustering or overlapping.
function placeRadarNodes(items: string[]) {
  const RADIUS_MIN = 78;
  const RADIUS_MAX = 165;
  const MIN_GAP = 60;
  const ATTEMPTS = 30;
  const placed: { x: number; y: number }[] = [];

  items.forEach((item, i) => {
    let best = { x: 0, y: 0 };
    let bestGap = -Infinity;

    for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
      const seed = hashSeed(`${item}#${i}#${attempt}`);
      const angle = pseudoRandom(seed) * 360;
      const rad = (angle * Math.PI) / 180;
      const radius = RADIUS_MIN + pseudoRandom(seed + 1) * (RADIUS_MAX - RADIUS_MIN);
      const x = Math.cos(rad) * radius;
      const y = Math.sin(rad) * radius;

      const gap = placed.length
        ? Math.min(...placed.map((p) => Math.hypot(p.x - x, p.y - y)))
        : Infinity;

      if (gap > bestGap) {
        bestGap = gap;
        best = { x, y };
      }
      if (bestGap >= MIN_GAP) break;
    }

    placed.push(best);
  });

  return placed;
}

const projects = [
  {
    n: "01", type: "Infrastructure", title: "Microsoft 365 backup architecture",
    text: "Implemented and tested SharePoint backups with Veeam and Wasabi S3, including restore validation and a practical operating schedule.",
    stack: "Veeam · Wasabi S3 · SharePoint", outcome: "190 GB largest site protected", href: null,
  },
  {
    n: "02", type: "Systems administration", title: "Windows Server 2019 infrastructure lab",
    text: "Designed an enterprise-style Windows Server environment with Active Directory Domain Services, DNS, DHCP, Group Policy, and PowerShell-based bulk user creation.",
    stack: "Windows Server · Active Directory · PowerShell", outcome: "Enterprise lab architecture", href: "https://github.com/Abhaykushwah/Windows-Server-2019-Infrastructure-Project",
  },
  {
    n: "03", type: "Vulnerability management", title: "Nessus vulnerability assessment lab",
    text: "Performed credentialed and non-credentialed Windows scans, identified system misconfigurations, applied remediation, and validated the fixes with follow-up scans.",
    stack: "Nessus · Windows · Vulnerability assessment", outcome: "Remediation verified", href: "https://github.com/Abhaykushwah/Nessus-Home-Lab",
  },
  {
    n: "04", type: "Security software", title: "Secure data hiding with steganography",
    text: "Developed a Python desktop tool that encrypts and embeds secret messages inside images, then extracts them through a key-based workflow.",
    stack: "Python · Tkinter · OpenCV", outcome: "Working security utility", href: "https://github.com/Abhaykushwah/Secure-Data-Hiding-in-Image-Using-Steganography",
  },
  {
    n: "05", type: "Security engineering", title: "0xCyberSecCapsule",
    text: "Built a practical security knowledge base covering Linux hardening, Windows hardening, detection engineering, SIEM labs, and hands-on security experiments.",
    stack: "Linux · Windows · SIEM · Bash", outcome: "Reusable security playbooks", href: "https://github.com/Abhaykushwah/0xCyberSecCapsule",
  },
];

const skills = [
  ["Cloud Security", "Microsoft Defender for Cloud, Microsoft Entra ID, Identity & Access Management (IAM)"],
  ["Cloud & Identity", "Microsoft 365, Microsoft Entra ID, SharePoint, OneDrive"],
  ["System Administration", "Windows Server, Active Directory, Group Policy (GPO), Windows, MacOS, Linux"],
  ["IT Operations", "User Provisioning, Device Management, M365 Office Admin, Troubleshooting, Asset Management, Vendor Coordination"],
  ["Security Tools &  Technique", "Burp Suite,Nessus, Wireshark, Nmap, CVE, CVSS,MITRE ATT&CK, OWASP Top 10"],
  ["Networking", "TCP/IP, DNS, DHCP, VPN, Routing, Switching, Subnetting"],
  ["Virtualization", "VMware Workstation, FortiGate, pfSense, TrueNAS"],
  ["Email Security", "SPF, DKIM, DMARC, Microsoft Exchange Online"],
  ["Backup & Recovery", "Veeam Backup , Wasabi, SharePoint Backup & Restore"],
  ["Programming & Scripting", "Python, C++, Bash, PowerShell, SQL"],
  ["Version Control", "Git, GitHub"],
];

const credentials = [
  ["CyberOps", "Cybersecurity Operations Associate", "Cisco"],
  ["FCA", "Certified Associate Cybersecurity", "Fortinet"],
  ["NSE", "Network Security Expert 1 & 2", "Fortinet"],
  ["APIsec", "API Security Fundamentals", "APIsec University"],
  ["SRWE", "Switching, Routing & Wireless Essentials", "Cisco"],
];

const links = [
  ["LinkedIn", "https://www.linkedin.com/in/abhaykushwah/"],
  ["GitHub", "https://github.com/abhaykushwah/"],
  ["Credly", "https://www.credly.com/users/abhay-kushwah/badges/credly"],
  ["YouTube", "https://www.youtube.com/channel/UCWltKK1HQ_2Ohdkd-zTro-g"],
];

const services = [
  {
    code: "SYS",
    title: "Systems administration",
    text: "Reliable day-to-day operations across Microsoft 365, Windows, Linux, identity, networking, and user support.",
    tags: ["M365", "Windows", "Linux", "MacOS"],
  },
  {
    code: "SEC",
    title: "Security & resilience",
    text: "Practical hardening, vulnerability management, backup validation, phishing awareness, and recovery readiness.",
    tags: ["Nessus", "FortiGate", "Veeam"],
  },
  {
    code: "AUT",
    title: "Automation & tooling",
    text: "Repeatable PowerShell workflows and focused software tools that remove friction from technical operations.",
    tags: ["PowerShell", "Python", "React"],
  },
];

const hireMail = "mailto:k.abhaykushwah@outlook.com?subject=Opportunity%20for%20Abhay%20Kushwah";

function Arrow() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 14 14 4M6 4h8v8" /></svg>;
}

export default function Home() {
  const radarPositions = placeRadarNodes(radarSkills);

  return (
    <main>
      <div className="header-shell">
        <header>
          <a className="brand" href="#top"><b>AK</b><span><strong>Abhay Kushwah</strong><small>Systems × Security × Software</small></span></a>
          <nav aria-label="Primary navigation"><a href="#expertise">Expertise</a><a href="#work">Work</a><a href="#profile">Credentials</a></nav>
          <div className="header-actions"><span className="available"><i /> Available</span><a className="hire-button compact" href={hireMail}>Want to hire me? <Arrow /></a></div>
        </header>
      </div>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-badges"><span>Based in India</span><span>Supporting New Zealand</span><span>Open to relocate</span></div>
          <p className="eyebrow"><span>01</span> System administrator · Security-minded builder</p>
          <h1>I keep critical systems <em>steady</em>—secure, recoverable, and ready to scale.</h1>
          <p className="intro">I’m Abhay, a system administrator supporting a New Zealand legal team from India. I combine Microsoft 365 operations, infrastructure, security, backup, and software development to solve problems end to end.</p>
          <div className="actions"><a className="hire-button" href="https://github.com/abhaykushwah/">GITHUB <Arrow /></a><a className="button" href="#work">Explore selected work</a></div>
          <div className="metrics"><div><strong>30+</strong><span>users supported</span></div><div><strong>190 GB</strong><span>largest site protected</span></div><div><strong>1st</strong><span>IBM cyber hackathon 2024</span></div></div>
        </div>

        <div className="console" aria-label="Current system focus">
          <div className="console-bar"><span>abhay@operations</span><i>● ● ●</i></div>
          <p className="command"><b>$</b> systemctl status career ~#<br/><span>● active (running)</span></p>
          <div className="map">
            <div className="orbit outer"/><div className="orbit inner"/>
            <div className="radar-sweep"/>
            <span className="radar-ping"/><span className="radar-ping delay"/>
            <div className="core"><strong>AK</strong><small>CYB3R</small></div>
            {radarSkills.map((skill, i) => {
              const { x, y } = radarPositions[i];
              return (
                <i
                  key={`${skill}-${i}`}
                  className="node"
                  style={{ left: `calc(50% + ${x.toFixed(2)}px)`, top: `calc(50% + ${y.toFixed(2)}px)` }}
                >
                  {skill}
                </i>
              );
            })}
          </div>
          <div className="console-foot"><span>Uptime mindset</span><span>H4CKER</span></div>
        </div>
      </section>

      <section className="expertise" id="expertise">
        <div className="section-intro">
          <p className="eyebrow"><span>02</span> What I bring</p>
          <div><h2>Useful across the full operational stack.</h2><p>I’m most effective where infrastructure, security, and automation overlap—turning technical depth into dependable business outcomes.</p></div>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.code}>
              <div className="service-top"><span>{service.code}</span><i>↗</i></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div>{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="work" id="work">
        <div className="heading"><div><p className="eyebrow"><span>03</span> Selected work</p><h2>Evidence over buzzwords.</h2></div><p>Practical work with a clear outcome: reduce risk, simplify operations, or make complex information easier to use.</p></div>

        <article className="experience">
          <div className="meta"><span>May 2025 — Present</span><span>Auckland, NZ · Remote from India</span></div>
          <div className="experience-main"><div><p className="label">Current role</p><h3>System Administrator</h3><p>One Legal Limited</p></div><ul><li>Support 30+ users across Windows, macOS, Microsoft 365, networking, and endpoint devices.</li><li>Administer Microsoft 365, including Entra ID, Exchange Online, SharePoint, OneDrive, Intune, and user lifecycle management.</li><li>Standardize onboarding and offboarding through PowerShell automation, improving consistency and reducing manual effort.</li><li>Configure identity, email security (SPF, DKIM, DMARC), and endpoint security controls to strengthen the organization's security posture.</li><li>Manage Microsoft 365 backups and recovery using Veeam Backup for Microsoft 365.</li><li>Deliver phishing awareness training and provide day-to-day IT support, troubleshooting, and vendor coordination.</li></ul></div>
          <div className="chips">{["Microsoft 365","Exchange Online","SharePoint","Email Security","Veeam","Wasabi S3"].map(x=><span key={x}>{x}</span>)}</div>
        </article>

        <div className="project-list">{projects.map(p=><article className="project" key={p.n}><span className="number">{p.n}</span><div><p className="label">{p.type}</p><h3>{p.href ? <a href={p.href} target="_blank" rel="noreferrer">{p.title} <Arrow /></a> : p.title}</h3><p>{p.text}</p><small>{p.stack}</small></div><aside><span>Outcome</span><strong>{p.outcome}</strong>{p.href && <a href={p.href} target="_blank" rel="noreferrer">View project ↗</a>}</aside></article>)}</div>
      </section>

      <section className="profile" id="profile">
        <div className="heading solo"><div><p className="eyebrow"><span>04</span> Technical profile</p><h2>A broad toolkit, grounded in reliable operations.</h2></div></div>
        <div className="profile-grid">
          <div className="panel"><p className="label">Core capabilities</p>{skills.map(([name,list])=><div className="skill" key={name}><h3>{name}</h3><p>{list}</p></div>)}</div>
          <div className="panel credentials"><div className="credential-head"><div><p className="label">Credentials</p><h3>Always learning.</h3></div><b>05</b></div>
            {credentials.map(([code,name,issuer])=><a className="credential" href="https://www.credly.com/users/abhay-kushwah/badges/credly" target="_blank" rel="noreferrer" key={code}><span>{code}</span><div><strong>{name}</strong><small>{issuer} · View credential profile ↗</small></div></a>)}
      
          </div>
        </div>

        <div className="principles" aria-label="Working principles"><div><span>01</span><strong>Reliable by default</strong><p>Build for the routine day and the recovery day.</p></div><div><span>02</span><strong>Security in the decision</strong><p>Treat protection as part of operations, not an afterthought.</p></div><div><span>03</span><strong>Automate repeat work</strong><p>Turn recurring tasks into clear, reusable workflows.</p></div></div>

        <div className="contact" id="contact"><div><p className="eyebrow"><span>05</span> Let’s work together</p><h2>Need someone who can own systems and still think like a builder?</h2></div><div><p>Open for system engineer, network, and cloud-security opportunities. Building a Career Without Borders.</p><a className="hire-button large" href={hireMail}>Want to hire me? <Arrow /></a><small className="response-note"><i /> Usually responds within two working day</small><div className="placeholders">{links.map(([name,url])=><a href={url} target="_blank" rel="noreferrer" key={name}>{name} ↗</a>)}</div></div></div>
        <footer><span>© 2026 Abhay Kushwah</span><span>Designed for clarity · Built for change</span></footer>
      </section>
    </main>
  );
}
