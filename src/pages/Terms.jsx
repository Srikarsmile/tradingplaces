import React from "react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="pt-24 pb-16 px-6 bg-[var(--surface-900)] min-h-screen mesh-gradient-bg">
      <div className="max-w-4xl mx-auto glass-card-elevated p-8 animate-fade-in">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              Legal
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] mt-2">
              Terms and Conditions – Trading Places
            </h1>
            <p className="font-semibold mt-2 text-[var(--text-secondary)] text-sm">
              Last updated: 27 November 2025
            </p>
          </div>
          <Link
            to="/auth"
            className="btn-primary text-sm px-5 py-2.5"
          >
            Back to Sign Up
          </Link>
        </div>

        <div className="p-2 text-[var(--text-secondary)] leading-relaxed text-sm space-y-6">
          <section className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">1. Purpose of the System</h2>
              <p>
                Trading Places is an initiative used to foster learning and development in the workplace
                in terms of empathy, inclusion, and cultural intelligence. The system offers interactive
                engagement and thought-provoking remarks to promote positive interpretation of varying thoughts.
              </p>
              <p className="mt-2">
                Trading Places is not a psychological diagnosis or personal profiling and does not provide
                performance evaluation.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">2. Appropriate Use</h2>
              <p>The system may be used for:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Learning in inclusion and empathy.</li>
                <li>Professional development.</li>
                <li>Personal or group reflection and discussion.</li>
              </ul>

              <p className="mt-3">The system should not be used to:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Appraise employee performance.</li>
                <li>Influence HR decisions regarding careers or disciplinary actions.</li>
                <li>Assess individual ability, demeanour, or character.</li>
              </ul>

              <p className="mt-2">
                Individual inclusion scores and insights are educational tools only and not assessments
                of employee aptitude or appropriateness.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">3. Data and Privacy</h2>
              <p>No personally identifiable data (e.g., names, emails, employee IDs) are gathered or stored.</p>
              <p className="mt-1">Dashboard metrics are generated from anonymous simulated datasets.</p>
              <p className="mt-1">Reflections typed during use are analysed only in the active session and are not stored
                or associated with any data.
              </p>
              <p className="mt-1">Users may leave the system at any time by closing the page or browser.</p>
              <p className="mt-1">
                The system complies with UK GDPR principles such as data minimisation, transparency,
                and user autonomy.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">4. Delicate Content and Wellbeing</h2>
              <p>
                Some learning scenarios may include themes of prejudice, disagreement, or marginalisation
                as part of reflective learning.
              </p>
              <p className="mt-1">Users may terminate the experience at any time.</p>
              <p className="mt-1">
                Trading Places is not a counselling, medical, or crisis management service. If any content
                causes discomfort, users are advised to seek wellbeing or HR support from their organisation.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">5. Interpretation of Results</h2>
              <p>The insights provided through dashboards, charts, and downloadable reports are:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>For learning purposes only</li>
                <li>Based on simulated data</li>
                <li>Designed to provoke thought and discussion</li>
              </ul>
              <p className="mt-2">The insights should not be used to:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Designate people or categories.</li>
                <li>Rank, grade, or rate people.</li>
                <li>Influence employment decisions of any kind.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">6. Accessibility and Inclusion</h2>
              <p>The system includes accessibility features such as:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Monochromatic colour palette.</li>
                <li>Dyslexia-friendly typography.</li>
                <li>Keyboard-only navigation.</li>
                <li>Alternative text for non-textual content.</li>
                <li>Slow-motion display options.</li>
              </ul>
              <p className="mt-1">Users are encouraged to report accessibility issues for improvement.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">7. Acceptable Use Requirements</h2>
              <p>Users agree NOT to:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Attempt to harm, reverse-engineer, or overload the system.</li>
                <li>Post violent, illegal, or prejudicial material.</li>
                <li>Input or paste personal data of real individuals.</li>
                <li>Monitor, appraise, or punish employees using the system.</li>
              </ul>
              <p className="mt-1">Violation may result in loss of access.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">8. Intellectual Property</h2>
              <p>
                All materials (interface design, scenarios, graphics, text, and system logic) are protected
                by intellectual property law.
              </p>
              <p className="mt-1">
                Users may not redistribute, copy, or use materials commercially without authorisation.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">9. Consent to Continue</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Understand the purpose and limitations of the system.</li>
                <li>Know what happens to their session information.</li>
                <li>May exit at any time.</li>
                <li>Agree to abide by these Terms and Conditions.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
