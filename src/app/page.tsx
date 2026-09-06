const kpis = [
  { label: "تحقيق خطة الإنتاج", value: "—", meta: "لم يتم إعداد الخطة بعد", icon: "▦" },
  { label: "الإنتاج الفعلي", value: "—", meta: "لا توجد بيانات تشغيلية", icon: "◈" },
  { label: "معدل العيوب", value: "—", meta: "غير مهيأ", icon: "◆" },
  { label: "التوقفات", value: "—", meta: "لا توجد أحداث مسجلة", icon: "◷" },
];

const modules = [
  ["الإنتاج", "الخطة، الإنتاج بالساعات، تحقيق الخطة"],
  ["الجودة والعيوب", "العيوب، الهالك، إعادة التشغيل، Pareto"],
  ["العمالة", "الحضور، التوزيع، المهارات، التدريب"],
  ["الخامات", "الصرف، المعياري، الفعلي، الانحراف، المرتجعات"],
  ["العمليات الحرجة", "المواصفات، الفحوصات، reaction plans"],
  ["SPC", "Xbar-R، I-MR، p/np/c/u، الإنذارات"],
  ["Checklists", "LPA والفحوصات التشغيلية والمتابعة"],
  ["CAPA", "5 Why، Fishbone، الإجراءات التصحيحية"],
];

export default function HomePage() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">REF-A</div>
          <div>
            <strong>Operations Hub</strong>
            <span>Final Assembly & Packaging</span>
          </div>
        </div>
        <nav className="nav">
          <a className="active" href="#overview">نظرة عامة</a>
          <a href="#production">الإنتاج</a>
          <a href="#quality">الجودة والعيوب</a>
          <a href="#manpower">العمالة والحضور</a>
          <a href="#materials">الخامات</a>
          <a href="#critical">العمليات الحرجة</a>
          <a href="#spc">SPC</a>
          <a href="#checklists">Checklists</a>
          <a href="#capa">CAPA</a>
          <a href="#reports">التقارير</a>
          <a href="#settings">الإعدادات</a>
        </nav>
        <div className="sidebar-note">
          <span>●</span>
          <div>
            <strong>وضع التأسيس</strong>
            <small>البيانات الحقيقية لم تُربط بعد</small>
          </div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar" id="overview">
          <div>
            <p className="eyebrow">REF-A / FINAL ASSEMBLY & PACKAGING</p>
            <h1>مركز التحكم التشغيلي</h1>
            <p className="subtitle">رؤية موحدة للإنتاج والجودة والعمالة والخامات والعمليات الحرجة.</p>
          </div>
          <div className="topbar-actions">
            <div className="status-pill"><span /> النظام جاهز للتكوين</div>
            <button className="profile">مدير القسم</button>
          </div>
        </header>

        <div className="filters">
          <div><span>التاريخ</span><b>غير محدد</b></div>
          <div><span>الشيفت</span><b>الكل</b></div>
          <div><span>خط الإنتاج</span><b>غير مهيأ</b></div>
          <div><span>الموديل</span><b>الكل</b></div>
        </div>

        <section className="kpi-grid">
          {kpis.map((kpi) => (
            <article className="kpi-card" key={kpi.label}>
              <div className="kpi-icon">{kpi.icon}</div>
              <div>
                <span>{kpi.label}</span>
                <strong>{kpi.value}</strong>
                <small>{kpi.meta}</small>
              </div>
            </article>
          ))}
        </section>

        <section className="hero-grid">
          <article className="panel primary-panel" id="production">
            <div className="panel-head">
              <div>
                <span className="section-label">OPERATIONS</span>
                <h2>حالة التشغيل اليومي</h2>
              </div>
              <span className="tag">N/A</span>
            </div>
            <div className="empty-state">
              <div className="empty-orbit">◎</div>
              <h3>لا توجد بيانات تشغيلية حتى الآن</h3>
              <p>قم أولًا بإعداد الخطوط والموديلات والشيفتات وخطة الإنتاج، ثم ستظهر المؤشرات والحركة بالساعة هنا.</p>
            </div>
          </article>

          <article className="panel alert-panel" id="quality">
            <div className="panel-head">
              <div>
                <span className="section-label">QUALITY SIGNALS</span>
                <h2>إشارات تحتاج انتباه</h2>
              </div>
              <span className="tag muted">0</span>
            </div>
            <div className="signal-row"><span>SPC خارج السيطرة</span><strong>0</strong></div>
            <div className="signal-row"><span>Checklists متأخرة</span><strong>0</strong></div>
            <div className="signal-row"><span>CAPA مفتوحة</span><strong>0</strong></div>
            <div className="signal-row"><span>توقفات غير معالجة</span><strong>0</strong></div>
          </article>
        </section>

        <section className="panel" id="reports">
          <div className="panel-head">
            <div>
              <span className="section-label">SYSTEM MAP</span>
              <h2>وحدات النظام</h2>
            </div>
            <p>كل وحدة سترتبط بسجل تشغيلي موثّق وقابل للتتبع.</p>
          </div>
          <div className="module-grid">
            {modules.map(([title, desc]) => (
              <a className="module-card" href="#" key={title}>
                <div className="module-accent" />
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                <span className="arrow">←</span>
              </a>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>REF-A Operations Hub</span>
          <span>Standalone build · No legacy dependencies</span>
        </footer>
      </section>
    </main>
  );
}
