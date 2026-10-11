(function () {
  "use strict";

  /* ---------- Skills data (from resume) ---------- */
  var D = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";
  // [label, devicon path or null, invert-in-dark]
  var skills = [
    { title: "Cloud Platform", items: [
      ["AWS EC2", "amazonwebservices/amazonwebservices-original-wordmark.svg", true],
      ["S3"],
      ["VPC"], ["IAM"], ["Route 53"], ["CloudFront"], ["WAF & Shield"], ["Lambda"], ["EKS"], ["ECS"], ["RDS"]
    ]},
    { title: "Infrastructure as Code", items: [
      ["Terraform", "terraform/terraform-original.svg"], ["OpenTofu"]
    ]},
    { title: "CI/CD Tools", items: [
      ["Jenkins", "jenkins/jenkins-original.svg"], ["Argo CD", "argocd/argocd-original.svg"]
    ]},
    { title: "Containers & Orchestration", items: [
      ["Docker", "docker/docker-original.svg"], ["Kubernetes", "kubernetes/kubernetes-original.svg"],
      ["OpenShift", "openshift/openshift-original.svg"], ["Helm", "helm/helm-original.svg"]
    ]},
    { title: "Version Control", items: [
      ["Git", "git/git-original.svg"], ["GitHub", "github/github-original.svg", true],
      ["GitLab", "gitlab/gitlab-original.svg"], ["SVN"]
    ]},
    { title: "Monitoring & Observability", items: [
      ["Prometheus", "prometheus/prometheus-original.svg"], ["Grafana", "grafana/grafana-original.svg"],
      ["CloudWatch"], ["Dynatrace"]
    ]},
    { title: "Alerting", items: [["Alertmanager"], ["CloudWatch Alarms"]] },
    { title: "Code Quality & Security", items: [["SonarQube", "sonarqube/sonarqube-original.svg"]] },
    { title: "Build & Dependency Tools", items: [
      ["Maven", "maven/maven-original.svg"], ["npm", "npm/npm-original-wordmark.svg"]
    ]},
    { title: "Operating System & Scripting", items: [
      ["Linux", "linux/linux-original.svg"], ["Ubuntu", "ubuntu/ubuntu-plain.svg"],
      ["Amazon Linux"], ["Shell Scripting", "bash/bash-original.svg", true]
    ]},
    { title: "Configuration Management", items: [["Ansible", "ansible/ansible-original.svg"]] },
    { title: "Other Tools", items: [
      ["Cloudflare", "cloudflare/cloudflare-original.svg"], ["ZeroSSL"], ["Vercel", "vercel/vercel-original.svg", true],
      ["Nginx", "nginx/nginx-original.svg"], ["Apache", "apache/apache-original.svg"], ["PM2"], ["Slack", "slack/slack-original.svg"]
    ]}
  ];

  var grid = document.getElementById("skillsGrid");
  skills.forEach(function (g) {
    var card = document.createElement("div");
    card.className = "skill-group reveal";
    var h = document.createElement("h3");
    h.textContent = "" + g.title.toLowerCase().replace(/ & /g, "_and_").replace(/ /g, "_");
    h.title = g.title;
    var label = document.createElement("div");
    label.style.cssText = "font-weight:700;font-size:1rem;margin:-6px 0 14px;";
    label.textContent = g.title;
    var list = document.createElement("div");
    list.className = "skill-list";
    g.items.forEach(function (it) {
      var s = document.createElement("span");
      s.className = "skill";
      var made = false;
      function fallback() {
        var f = document.createElement("span");
        f.className = "fallback";
        f.textContent = it[0].replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();
        return f;
      }
      if (it[1]) {
        var img = document.createElement("img");
        img.src = D + it[1];
        img.alt = "";
        img.loading = "lazy";
        if (it[2]) img.className = "inv";
        img.onerror = function () { img.replaceWith(fallback()); };
        s.appendChild(img);
        made = true;
      }
      if (!made) s.appendChild(fallback());
      s.appendChild(document.createTextNode(it[0]));
      list.appendChild(s);
    });
    card.appendChild(h);
    card.appendChild(label);
    card.appendChild(list);
    grid.appendChild(card);
  });

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  document.getElementById("themeToggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = next === "light" ? "#f6f8fc" : "#0b1220";
  });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  burger.addEventListener("click", function () {
    burger.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { burger.classList.remove("open"); links.classList.remove("open"); });
  });

  /* ---------- Nav state + progress bar + active link ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress");
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navAnchors = Array.prototype.slice.call(links.querySelectorAll("a"));
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle("scrolled", y > 20);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    var cur = "";
    sections.forEach(function (s) { if (y + 140 >= s.offsetTop) cur = s.id; });
    navAnchors.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + cur); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Typing effect ---------- */
  var roles = ["Jr. DevOps Engineer", "Multi-Cloud Enthusiast", "CI/CD Pipeline Builder", "Linux Automation Fan", "Future DevSecOps Engineer"];
  var typed = document.getElementById("typed");
  var ri = 0, ci = 0, del = false;
  function type() {
    var word = roles[ri];
    typed.textContent = word.slice(0, ci);
    if (!del && ci < word.length) { ci++; setTimeout(type, 75); }
    else if (!del) { del = true; setTimeout(type, 1500); }
    else if (ci > 0) { ci--; setTimeout(type, 35); }
    else { del = false; ri = (ri + 1) % roles.length; setTimeout(type, 350); }
  }
  type();

  /* ---------- Scroll reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 70 + "ms";
    io.observe(el);
  });

  /* ---------- Counters ---------- */
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = null;
      function step(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / 1400, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suf : "");
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".num").forEach(function (n) { cio.observe(n); });

  /* ---------- Project filter ---------- */
  var chips = document.querySelectorAll("#filters .chip");
  var cards = document.querySelectorAll("#projectsGrid .project");
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      chips.forEach(function (x) { x.classList.remove("active"); });
      c.classList.add("active");
      var f = c.dataset.filter;
      cards.forEach(function (p) {
        p.classList.toggle("hide", f !== "all" && p.dataset.cat !== f);
        p.classList.add("in");
      });
    });
  });

  /* ---------- Contact form ---------- */
  // On Netlify the form is captured automatically. On other hosts (e.g. GitHub Pages)
  // the form falls back to opening the visitor's email app with the message filled in.
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  var MY_EMAIL = "ruturajkumbhar261202@gmail.com";
  function mailtoFallback(data) {
    var subject = encodeURIComponent("Portfolio contact from " + data.get("name"));
    var body = encodeURIComponent(data.get("message") + "\n\n— " + data.get("name") + " (" + data.get("email") + ")");
    window.location.href = "mailto:" + MY_EMAIL + "?subject=" + subject + "&body=" + body;
    note.className = "form-note ok";
    note.textContent = "Opening your email app to send the message…";
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    if (location.protocol === "file:") { mailtoFallback(data); return; }
    note.className = "form-note"; note.textContent = "Sending…";
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString()
    }).then(function (r) {
      if (!r.ok) throw new Error("bad");
      form.reset();
      note.className = "form-note ok"; note.textContent = "Thanks! Your message has been sent.";
    }).catch(function () { mailtoFallback(data); });
  });

  /* ---------- Animated pipeline terminal ---------- */
  (function () {
    var body = document.getElementById("termBody");
    var steps = document.querySelectorAll("#steps li");
    var fill = document.getElementById("barFill");
    var pct = document.getElementById("flowPct");
    var wrap = document.querySelector(".deploy");
    if (!body || !steps.length || !wrap) return;

    var script = [
      { cmd: "git push origin main", d: 900 },
      { tag: "Git", msg: "webhook received, triggering job", res: "OK", s: 0 },
      { tag: "Jenkins", msg: "npm ci && npm run build", res: "SUCCESS", s: 1 },
      { tag: "SonarQube", msg: "quality gate", res: "PASSED", s: 2 },
      { tag: "Docker", msg: "build & push image app:v1.0.128", res: "PUSHED", s: 3 },
      { tag: "Terraform", msg: "apply: 0 to add, 0 to change", res: "DONE", s: 4 },
      { tag: "Argo CD", msg: "sync app to Kubernetes", res: "HEALTHY", s: 5 },
      { tag: "Grafana", msg: "targets up, dashboards live", res: "OK", s: 6 },
      { final: "Pipeline finished successfully", d: 1100 },
      { cmd: "kubectl get pods -n production", d: 700 },
      { raw: "NAME              READY  STATUS   AGE", d: 350 },
      { raw: "app-7d9c8b-4xk2p  1/1    Running  42s", d: 350 },
      { raw: "app-7d9c8b-9qwlz  1/1    Running  42s", d: 350 }
    ];

    function setPct(n) {
      var v = Math.round((n / steps.length) * 100);
      fill.style.width = v + "%";
      pct.textContent = v + "%";
    }
    function line(l) {
      var div = document.createElement("div");
      div.className = "ln" + (l.final ? " final" : "");
      if (l.cmd) {
        div.innerHTML = '<span class="prompt">$</span> ' + l.cmd;
      } else if (l.raw) {
        div.className = "ln raw";
        div.textContent = l.raw;
      } else if (l.final) {
        div.textContent = "\u2714 " + l.final;
      } else {
        div.innerHTML = '<span class="tag">[' + l.tag + ']</span> ' + l.msg + ' <span class="res">' + l.res + "</span>";
      }
      body.appendChild(div);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      script.forEach(line);
      steps.forEach(function (li) { li.className = "done"; });
      setPct(steps.length);
      return;
    }

    var run = 0;
    function play() {
      var id = ++run, i = 0;
      body.innerHTML = "";
      steps.forEach(function (li) { li.className = ""; });
      setPct(0);
      (function next() {
        if (id !== run) return;
        if (i >= script.length) { setTimeout(function () { if (id === run) play(); }, 4500); return; }
        var l = script[i++];
        line(l);
        if (l.s !== undefined) {
          steps[l.s].classList.add("active");
          setTimeout(function () {
            if (id !== run) return;
            steps[l.s].classList.remove("active");
            steps[l.s].classList.add("done");
            setPct(l.s + 1);
          }, 450);
        }
        setTimeout(next, l.d || 850);
      })();
    }

    var started = false;
    new IntersectionObserver(function (en, ob) {
      if (en[0].isIntersecting && !started) { started = true; play(); ob.disconnect(); }
    }, { threshold: 0.25 }).observe(wrap);
  })();

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Subtle network background ---------- */
  var cv = document.getElementById("bg");
  var ctx = cv.getContext("2d");
  var pts = [], W, H;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function size() {
    W = cv.width = window.innerWidth; H = cv.height = window.innerHeight;
    var n = Math.min(70, Math.floor(W * H / 22000));
    pts = [];
    for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    var light = root.getAttribute("data-theme") === "light";
    var rgb = light ? "3,105,161" : "56,189,248";
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 6.283); ctx.fillStyle = "rgba(" + rgb + ",.55)"; ctx.fill();
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
        if (d < 14000) {
          ctx.strokeStyle = "rgba(" + rgb + "," + (0.18 * (1 - d / 14000)) + ")";
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    if (!reduce) requestAnimationFrame(draw);
  }
  size(); draw();
  window.addEventListener("resize", size);
})();