export const toneAtTillDialogue = {
  id: "tone-at-till",
  title: "Tone at the Till: Live Dialogue",
  setup:
    "Roleplay a short exchange at the checkout. Swap roles between customer and manager to see how tone and word choice change the outcome.",
  lines: [
    {
      role: "customer",
      persona: "Aisha",
      text: "Hi, I'm back about the headphones. I was told they'd be exchanged, but service said they'd only repair them.",
      cue: "Name the emotion you hear before explaining process.",
      options: [
        {
          label: "Lead with apology and invite details",
          effect: {
            Understanding: 0.5,
            "Empathy signaled": 1,
            "Clarity of next steps": 0.5,
          },
        },
        {
          label: "Ask for receipt immediately",
          effect: {
            Understanding: -0.5,
            "Empathy signaled": -1,
            "Clarity of next steps": 0,
          },
        },
        {
          label: "Say 'policy is policy'",
          effect: {
            Understanding: -1,
            "Empathy signaled": -1,
            "Clarity of next steps": -0.5,
          },
        },
      ],
    },
    {
      role: "manager",
      persona: "Marcus",
      text: "I'm sorry you've had to come back and wait in the line. I want to understand what was promised so we can make it right.",
      cue: "Validate and invite clarity without defensiveness.",
      options: [
        {
          label: "Mirror back frustration and ask what was promised",
          effect: {
            Understanding: 0.5,
            "Empathy signaled": 1,
            "Clarity of next steps": 0.5,
          },
        },
        {
          label: "Jump to explaining store policy",
          effect: {
            Understanding: -0.5,
            "Empathy signaled": -0.5,
            "Clarity of next steps": 0.5,
          },
        },
        {
          label: "Offer to bring another staffer",
          effect: {
            Understanding: 0,
            "Empathy signaled": 0.5,
            "Clarity of next steps": 0,
          },
        },
      ],
    },
    {
      role: "customer",
      persona: "Aisha",
      text: "I just don't want to be stuck waiting weeks. The store said I could swap today.",
      cue: "Listen for the need (time) not just the policy conflict.",
      options: [
        {
          label: "Name the need for speed and restate promise",
          effect: {
            Understanding: 1,
            "Empathy signaled": 0.5,
            "Clarity of next steps": 0.5,
          },
        },
        {
          label: "Offer a coupon but keep repair",
          effect: {
            Understanding: -0.5,
            "Empathy signaled": 0,
            "Clarity of next steps": 0.5,
          },
        },
        {
          label: "Say 'waiting is standard'",
          effect: {
            Understanding: -1,
            "Empathy signaled": -0.5,
            "Clarity of next steps": -0.5,
          },
        },
      ],
    },
    {
      role: "manager",
      persona: "Marcus",
      text: "Got it. Speed matters to you. We can either swap today for the same model, or repair and give you a charger on loan while you wait. Which feels better?",
      cue: "Offer choices and invite them to choose.",
      options: [
        {
          label: "Offer two options and ask which feels better",
          effect: {
            Understanding: 0.5,
            "Empathy signaled": 0.5,
            "Clarity of next steps": 1,
          },
        },
        {
          label: "Offer one option you prefer",
          effect: {
            Understanding: -0.5,
            "Empathy signaled": -0.5,
            "Clarity of next steps": 0.5,
          },
        },
        {
          label: "Delay decision and check with back office",
          effect: {
            Understanding: 0,
            "Empathy signaled": -0.5,
            "Clarity of next steps": -1,
          },
        },
      ],
    },
    {
      role: "customer",
      persona: "Aisha",
      text: "Let's swap today. I can't be without them this week.",
      cue: "Reflect back the choice to ensure alignment.",
      options: [
        {
          label: "Confirm swap and timeline out loud",
          effect: {
            Understanding: 0.5,
            "Empathy signaled": 0.5,
            "Clarity of next steps": 1,
          },
        },
        {
          label: "Nod and start typing without saying next steps",
          effect: {
            Understanding: -0.5,
            "Empathy signaled": -0.5,
            "Clarity of next steps": -1,
          },
        },
        {
          label: "Offer upsell while processing",
          effect: {
            Understanding: -0.5,
            "Empathy signaled": -0.5,
            "Clarity of next steps": 0,
          },
        },
      ],
    },
    {
      role: "manager",
      persona: "Marcus",
      text: "Great, I'll process the exchange now. It will take about five minutes. I'll also email a confirmation so you have it in writing.",
      cue: "Narrate next steps and timelines so trust stays high.",
      options: [
        {
          label: "Narrate steps with time and documentation",
          effect: {
            Understanding: 0.5,
            "Empathy signaled": 0.5,
            "Clarity of next steps": 1,
          },
        },
        {
          label: "Just say 'one sec' and walk away",
          effect: {
            Understanding: -1,
            "Empathy signaled": -1,
            "Clarity of next steps": -1,
          },
        },
        {
          label: "Ask another associate to handle without context",
          effect: {
            Understanding: -0.5,
            "Empathy signaled": -0.5,
            "Clarity of next steps": -0.5,
          },
        },
      ],
    },
  ],
  metrics: ["Understanding", "Empathy signaled", "Clarity of next steps"],
};

export const immigrationPolicyDialogue = {
  id: "immigration-policy-dialogue",
  title: "Trading Places – Immigration Policy",
  setup:
    "Walk the loop as policymaker, citizen, and case worker. Notice how efficiency goals land on people, and how tone plus clarity shift moral tension.",
  lines: [
    {
      role: "policymaker",
      persona: "Senior Official",
      text: "We need to tighten eligibility and documentation to cut the backlog. Compliance is priority one.",
      cue: "Balance efficiency with lived impact before locking rules.",
      options: [
        {
          label: "Name the efficiency goal AND the need to avoid unintended harm",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Lead with quotas and targets only",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": 0 },
        },
        {
          label: "Delay decision to 'see data later'",
          effect: { Understanding: -0.2, "Empathy signaled": -0.2, "Clarity of next steps": -0.5 },
        },
      ],
    },
    {
      role: "citizen",
      persona: "Long-term Resident",
      text: "My work permit renewal stalled. I've sent documents twice and can't pay rent without confirmation.",
      cue: "Signal you hear the risk to livelihood before quoting policy.",
      options: [
        {
          label: "Acknowledge housing risk, summarize what was sent, and set a response time",
          effect: { Understanding: 0.5, "Empathy signaled": 1, "Clarity of next steps": 0.5 },
        },
        {
          label: "Repeat the documentation list verbatim",
          effect: { Understanding: -0.3, "Empathy signaled": -0.5, "Clarity of next steps": 0 },
        },
        {
          label: "Say 'system is busy, please wait'",
          effect: { Understanding: -0.5, "Empathy signaled": -0.7, "Clarity of next steps": -0.5 },
        },
      ],
    },
    {
      role: "case-worker",
      persona: "Frontline Officer",
      text: "We're under pressure to clear cases. Your file flags a missing letter—rules say deny without it.",
      cue: "Navigate moral tension: uphold rules while protecting dignity.",
      options: [
        {
          label: "Offer a guided checklist and a grace period before denial",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Deny immediately and move to the next case",
          effect: { Understanding: -0.7, "Empathy signaled": -0.8, "Clarity of next steps": -0.3 },
        },
        {
          label: "Ask a supervisor for discretion but give no timeline",
          effect: { Understanding: -0.2, "Empathy signaled": 0, "Clarity of next steps": -0.4 },
        },
      ],
    },
    {
      role: "citizen",
      persona: "Long-term Resident",
      text: "If I lose this job, I lose housing. Is there any appeal or temporary approval?",
      cue: "Make the appeal path explicit and time-bound.",
      options: [
        {
          label: "Explain the appeal path, offer a dated check-in, and share a contact",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 1 },
        },
        {
          label: "Say 'appeals take months' without details",
          effect: { Understanding: -0.4, "Empathy signaled": -0.5, "Clarity of next steps": -0.5 },
        },
        {
          label: "Redirect to the website FAQ",
          effect: { Understanding: -0.3, "Empathy signaled": -0.4, "Clarity of next steps": 0 },
        },
      ],
    },
    {
      role: "policymaker",
      persona: "Senior Official",
      text: "I'm seeing citizen distress and case worker burnout alongside efficiency gains.",
      cue: "Integrate empathy metrics into policy adjustments.",
      options: [
        {
          label: "Add humane exceptions, track empathy deltas, and publish appeal timelines",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Stay the course—efficiency is proof of success",
          effect: { Understanding: -0.6, "Empathy signaled": -0.6, "Clarity of next steps": -0.3 },
        },
        {
          label: "Lower targets but keep opaque criteria",
          effect: { Understanding: -0.2, "Empathy signaled": -0.1, "Clarity of next steps": -0.4 },
        },
      ],
    },
    {
      role: "case-worker",
      persona: "Frontline Officer",
      text: "With the new guidance, I can grant provisional approvals while documents are chased.",
      cue: "Close the loop with clarity and dignity.",
      options: [
        {
          label: "State the provisional approval, next steps, and when you'll confirm",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 1 },
        },
        {
          label: "Announce approval without explaining conditions",
          effect: { Understanding: 0, "Empathy signaled": 0.1, "Clarity of next steps": -0.3 },
        },
        {
          label: "Send a template email with no personal touch",
          effect: { Understanding: -0.2, "Empathy signaled": -0.3, "Clarity of next steps": -0.2 },
        },
      ],
    },
  ],
  metrics: ["Understanding", "Empathy signaled", "Clarity of next steps"],
};

/* ─────────────────────────────────────────────
   3. Border Control — "Checkpoint Echo"
   ───────────────────────────────────────────── */
export const checkpointEchoDialogue = {
  id: "checkpoint-echo",
  title: "Checkpoint Echo — Border Control",
  setup:
    "Step into a high-volume passport control booth at an international airport. Process passengers, coordinate with colleagues, and handle escalating tensions — all while maintaining composure, empathy, and cultural sensitivity.",
  lines: [
    {
      role: "officer",
      persona: "Officer Rowe",
      text: "Good afternoon. Could you tell me the purpose of your visit and how long you plan to stay?",
      cue: "The passenger is visibly anxious. Recognise your own micro-reaction before continuing.",
      options: [
        {
          label: "Soften tone, make eye contact, and invite them to take their time",
          effect: { Understanding: 0.5, "Empathy signaled": 1, "Clarity of next steps": 0.5 },
        },
        {
          label: "Repeat the question louder and slower",
          effect: { Understanding: -0.5, "Empathy signaled": -1, "Clarity of next steps": 0 },
        },
        {
          label: "Sigh and gesture impatiently at the queue behind",
          effect: { Understanding: -1, "Empathy signaled": -1, "Clarity of next steps": -0.5 },
        },
      ],
    },
    {
      role: "passenger",
      persona: "Amara",
      text: "I'm sorry — I have my documents, it's just… the visa says one date and the letter says another. I don't know which is right.",
      cue: "Self-regulate: apply a grounding breath before responding. Public attention is growing.",
      options: [
        {
          label: "Acknowledge the discrepancy calmly and say you'll help sort it out",
          effect: { Understanding: 1, "Empathy signaled": 0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Flag the discrepancy as a violation and call a supervisor immediately",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Say 'This isn't my problem — you should have checked before travelling'",
          effect: { Understanding: -1, "Empathy signaled": -1, "Clarity of next steps": -0.5 },
        },
      ],
    },
    {
      role: "passenger",
      persona: "Amara",
      text: "I've been travelling for 22 hours. In my culture we don't look authority figures in the eye — it's a sign of respect, not evasion.",
      cue: "Perspective shift: see the interaction through the passenger's lens — fatigue, cultural norms, limited language.",
      options: [
        {
          label: "Thank them for explaining and adjust your body language to match",
          effect: { Understanding: 0.5, "Empathy signaled": 1, "Clarity of next steps": 0.5 },
        },
        {
          label: "Note it internally but continue standard procedure without acknowledging",
          effect: { Understanding: -0.3, "Empathy signaled": -0.5, "Clarity of next steps": 0 },
        },
        {
          label: "Say 'In this country we expect eye contact during questioning'",
          effect: { Understanding: -1, "Empathy signaled": -1, "Clarity of next steps": -0.5 },
        },
      ],
    },
    {
      role: "officer",
      persona: "Colleague — Officer Keane",
      text: "Hey Rowe, I just ran the name — our system shows the visa was renewed last week. The letter might be outdated.",
      cue: "A colleague arrives with contradictory information. Communicate clearly without undermining them in front of the passenger.",
      options: [
        {
          label: "Thank the colleague, share the update with the passenger, and confirm the new date together",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 1 },
        },
        {
          label: "Dismiss the colleague's input and say you'll check yourself",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": -0.5 },
        },
        {
          label: "Argue with the colleague about whose data is correct in front of the passenger",
          effect: { Understanding: -0.5, "Empathy signaled": -1, "Clarity of next steps": -1 },
        },
      ],
    },
    {
      role: "officer",
      persona: "Officer Rowe",
      text: "The dates now align. I can clear you here or refer to my supervisor for a secondary check. What feels right given the long journey?",
      cue: "Critical decision: balance procedural compliance with human factors. Each path affects security, passenger flow, and team morale.",
      options: [
        {
          label: "Clear at the desk with a note on file, explain next steps, and wish them well",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 1 },
        },
        {
          label: "Refer to supervisor 'just to be safe' without explaining why",
          effect: { Understanding: -0.3, "Empathy signaled": -0.5, "Clarity of next steps": -0.5 },
        },
        {
          label: "Clear without documentation or follow-up",
          effect: { Understanding: 0, "Empathy signaled": 0.2, "Clarity of next steps": -1 },
        },
      ],
    },
    {
      role: "officer",
      persona: "Officer Rowe",
      text: "A family from a conflict zone is next. Their documents are incomplete and the children are distressed. Cultural norms affect how the parents communicate.",
      cue: "Adapt communication to avoid bias, create psychological safety while maintaining security protocols.",
      options: [
        {
          label: "Lower to eye level with the children, speak slowly, offer water, and use a cultural liaison",
          effect: { Understanding: 0.5, "Empathy signaled": 1, "Clarity of next steps": 0.5 },
        },
        {
          label: "Process the family in the standard lane without accommodation",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": 0 },
        },
        {
          label: "Separate the family members for individual questioning immediately",
          effect: { Understanding: -1, "Empathy signaled": -1, "Clarity of next steps": -0.5 },
        },
      ],
    },
  ],
  metrics: ["Understanding", "Empathy signaled", "Clarity of next steps"],
};

/* ─────────────────────────────────────────────
   4. Probation / Criminal Justice — "Signal Yard"
   ───────────────────────────────────────────── */
export const signalYardDialogue = {
  id: "signal-yard",
  title: "Signal Yard — Probation & Criminal Justice",
  setup:
    "You're a probation officer meeting a recently released offender for a mandatory check-in. The session unfolds from compliance check through crisis disclosure, team risk assessment, and a breach decision — testing trauma-informed practice and moral courage throughout.",
  lines: [
    {
      role: "probation-officer",
      persona: "Officer Daniels",
      text: "Thanks for coming in, Jordan. Before we start — how are things going since your release? Anything keeping you up at night?",
      cue: "The offender is guarded and monosyllabic. Recognise resistance as a protective response, not defiance.",
      options: [
        {
          label: "Name the discomfort in the room and normalise it — 'These check-ins can feel heavy'",
          effect: { Understanding: 0.5, "Empathy signaled": 1, "Clarity of next steps": 0.5 },
        },
        {
          label: "Jump straight to compliance questions — curfew, reporting, employment",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Warn that non-cooperation will be logged as a concern",
          effect: { Understanding: -1, "Empathy signaled": -1, "Clarity of next steps": -0.5 },
        },
      ],
    },
    {
      role: "offender",
      persona: "Jordan",
      text: "I lost the hostel place. I've been sofa-surfing. If I tell housing I'm on licence they won't take me. I don't know what to do.",
      cue: "A housing crisis surfaces. Listen for the shame behind the disclosure before problem-solving.",
      options: [
        {
          label: "Acknowledge the courage it took to share, then map out housing options together",
          effect: { Understanding: 1, "Empathy signaled": 0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Log the change of address and remind them of reporting requirements",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": 0 },
        },
        {
          label: "Say 'That's a breach condition — I have to escalate'",
          effect: { Understanding: -1, "Empathy signaled": -1, "Clarity of next steps": -0.5 },
        },
      ],
    },
    {
      role: "probation-officer",
      persona: "Manager — Senior Officer Blake",
      text: "Daniels, Jordan's risk score just jumped. The algorithm flags housing instability as high. Policy says we escalate to recall panel.",
      cue: "Navigate the tension between algorithmic risk scoring and human context. Your colleague is watching.",
      options: [
        {
          label: "Present the human context alongside the algorithm and recommend a supported plan before recall",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Accept the algorithm's recommendation without challenge",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Override the algorithm without documenting your reasoning",
          effect: { Understanding: 0, "Empathy signaled": 0.2, "Clarity of next steps": -1 },
        },
      ],
    },
    {
      role: "probation-officer",
      persona: "Officer Daniels",
      text: "Jordan, I hear you. I need to be straight — the system flagged the housing change. But I want to work with you to keep things on track rather than trigger a recall.",
      cue: "Use motivational interviewing: affirm, reflect, summarise. Keep the person in the conversation.",
      options: [
        {
          label: "Ask 'What would stable housing look like for you?' and build the plan from their answer",
          effect: { Understanding: 0.5, "Empathy signaled": 1, "Clarity of next steps": 0.5 },
        },
        {
          label: "List the conditions they must meet and set a 48-hour deadline",
          effect: { Understanding: -0.3, "Empathy signaled": -0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Say 'I've done what I can — it's up to you now'",
          effect: { Understanding: -0.5, "Empathy signaled": -1, "Clarity of next steps": -0.5 },
        },
      ],
    },
    {
      role: "offender",
      persona: "Jordan",
      text: "I missed curfew twice because the sofa I'm on is across town. I know that looks bad. But I'm not reoffending — I'm just trying to survive.",
      cue: "Breach decision: weigh procedural compliance against reintegration. Each path has consequences for trust and public safety.",
      options: [
        {
          label: "Acknowledge survival mode, document context, and propose a revised curfew with a review date",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 1 },
        },
        {
          label: "Log the breaches and initiate formal warning without discussion",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Ignore the breaches to avoid paperwork",
          effect: { Understanding: -0.2, "Empathy signaled": 0, "Clarity of next steps": -1 },
        },
      ],
    },
    {
      role: "probation-officer",
      persona: "Officer Daniels",
      text: "Here's the plan: emergency housing referral today, revised curfew pending accommodation, and we meet again Thursday. I'll confirm everything in writing.",
      cue: "Close the loop with clarity and dignity. Narrate next steps so trust stays intact.",
      options: [
        {
          label: "Confirm the plan, hand over written steps, and ask Jordan what support they need between now and Thursday",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 1 },
        },
        {
          label: "Email the plan later without checking Jordan understood",
          effect: { Understanding: -0.3, "Empathy signaled": -0.3, "Clarity of next steps": -0.5 },
        },
        {
          label: "Say 'You know the drill' and end the session",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": -1 },
        },
      ],
    },
  ],
  metrics: ["Understanding", "Empathy signaled", "Clarity of next steps"],
};

/* ─────────────────────────────────────────────
   5. IT / Tech — "Mirror Sprint"
   ───────────────────────────────────────────── */
export const mirrorSprintDialogue = {
  id: "mirror-sprint",
  title: "Mirror Sprint — IT & Tech",
  setup:
    "It's the end-of-sprint retrospective for a distributed engineering team. Tension is brewing between delivery pressure and developer wellbeing. Navigate imposter syndrome, conflicting priorities, remote inclusion, and performance conversations — all while building psychological safety.",
  lines: [
    {
      role: "tech-lead",
      persona: "Priya (Tech Lead)",
      text: "Before we look at velocity, I want to check in. This sprint felt heavier than the numbers show. How's everyone doing — honestly?",
      cue: "The junior developer is silent while others say 'fine.' Spot the unspoken signal.",
      options: [
        {
          label: "Name the silence gently — 'I notice not everyone has spoken. No pressure, but the door is open'",
          effect: { Understanding: 0.5, "Empathy signaled": 1, "Clarity of next steps": 0.5 },
        },
        {
          label: "Move on to the burndown chart since nobody raised concerns",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": 0 },
        },
        {
          label: "Single out the quiet person directly — 'You haven't said anything, what's wrong?'",
          effect: { Understanding: -0.5, "Empathy signaled": -1, "Clarity of next steps": -0.5 },
        },
      ],
    },
    {
      role: "junior-dev",
      persona: "Kai (Junior Developer)",
      text: "I spent two days on something that turned out to be a one-line fix. I feel like I'm slowing the team down and everyone can see it.",
      cue: "Imposter syndrome disclosure. Normalise the learning curve without minimising the feeling.",
      options: [
        {
          label: "Share a similar experience of your own, then reframe the two days as deep learning",
          effect: { Understanding: 1, "Empathy signaled": 0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Say 'Don't worry, it happens' and move to the next topic",
          effect: { Understanding: -0.3, "Empathy signaled": -0.5, "Clarity of next steps": 0 },
        },
        {
          label: "Suggest pair programming 'so this doesn't happen again'",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": 0.5 },
        },
      ],
    },
    {
      role: "product-owner",
      persona: "Alex (Product Owner)",
      text: "We're three features behind roadmap. Stakeholders are asking why we spent cycles on tech debt instead of shipping. Can we reprioritise?",
      cue: "Conflicting priorities: tech debt vs. features. Advocate without dismissing business pressure.",
      options: [
        {
          label: "Acknowledge the pressure, then show how tech debt reduction prevented two outages this quarter",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Agree to drop all tech debt and commit to feature-only sprints",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": 0.5 },
        },
        {
          label: "Say 'You don't understand engineering' and shut the conversation down",
          effect: { Understanding: -1, "Empathy signaled": -1, "Clarity of next steps": -1 },
        },
      ],
    },
    {
      role: "tech-lead",
      persona: "Priya (Tech Lead)",
      text: "I've noticed our remote team members drop off calls early and rarely speak in retros. I want to make sure everyone feels included, not just the in-office crew.",
      cue: "Remote inclusion challenge: create equitable participation without calling people out.",
      options: [
        {
          label: "Propose async retro input before the call and rotate who speaks first each session",
          effect: { Understanding: 0.5, "Empathy signaled": 1, "Clarity of next steps": 0.5 },
        },
        {
          label: "Ask remote members to turn cameras on so you can 'read the room'",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": 0 },
        },
        {
          label: "Accept it as a remote-work trade-off and move on",
          effect: { Understanding: -0.5, "Empathy signaled": -1, "Clarity of next steps": -0.5 },
        },
      ],
    },
    {
      role: "tech-lead",
      persona: "Priya (Tech Lead)",
      text: "Kai, I want to talk about your growth. You've made real progress but there are areas to stretch. How do you want to receive feedback — written, live, or paired review?",
      cue: "Performance conversation: lead with autonomy and choice. Feedback should build, not break.",
      options: [
        {
          label: "Let Kai choose the format, set a follow-up date, and highlight one specific strength first",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 1 },
        },
        {
          label: "Send a written review without discussion and mark it as 'FYI'",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": -0.5 },
        },
        {
          label: "Give feedback in the public retro channel for transparency",
          effect: { Understanding: -1, "Empathy signaled": -1, "Clarity of next steps": -0.5 },
        },
      ],
    },
    {
      role: "tech-lead",
      persona: "Priya (Tech Lead)",
      text: "Team, I want to close this retro differently. Let's each name one thing that recharged us this sprint and one thing that drained us. I'll go first.",
      cue: "Psychological safety: model vulnerability as the leader. Close with energy, not just action items.",
      options: [
        {
          label: "Share your own 'recharge' and 'drain' honestly, then thank each person who contributes",
          effect: { Understanding: 0.5, "Empathy signaled": 0.5, "Clarity of next steps": 1 },
        },
        {
          label: "Skip the exercise because the meeting is over time",
          effect: { Understanding: -0.5, "Empathy signaled": -0.5, "Clarity of next steps": -0.5 },
        },
        {
          label: "Assign the exercise as homework and review answers next sprint",
          effect: { Understanding: -0.3, "Empathy signaled": -0.3, "Clarity of next steps": 0 },
        },
      ],
    },
  ],
  metrics: ["Understanding", "Empathy signaled", "Clarity of next steps"],
};

export const dialogueScenarios = [
  toneAtTillDialogue,
  immigrationPolicyDialogue,
  checkpointEchoDialogue,
  signalYardDialogue,
  mirrorSprintDialogue,
];

export const scenarioLibrary = [
  {
    id: "return-line",
    title: "Weekend Rush: Return Dispute",
    context:
      "Crowded store on a Saturday afternoon. You're juggling a line of customers while a return dispute escalates.",
    empathyFocus: ["Active listening", "Validating emotions", "De-escalation"],
    customer: {
      name: "Aisha (customer)",
      beats: [
        "Arrives frustrated: 'I was told these would be exchanged, not repaired.'",
        "Feels ignored as the line grows and staff whisper.",
        "Needs reassurance that policy won't override her situation.",
      ],
    },
    manager: {
      name: "Marcus (manager on duty)",
      beats: [
        "Balancing policy with flexibility under pressure.",
        "Signals understanding before explaining options.",
        "Offers a path that keeps dignity intact for everyone in line.",
      ],
    },
    agreement: [
      "Acknowledge the wait and frustration before talking policy.",
      "Offer two options that respect the customer's time.",
      "Narrate next steps so the line hears calm, not conflict.",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility Request: Meeting Setup",
    context:
      "Customer needs a quiet space for a consultation call; the only available room is booked for an internal huddle.",
    empathyFocus: ["Assume positive intent", "Shared problem-solving", "Transparency"],
    customer: {
      name: "Dev (customer)",
      beats: [
        "States noise triggers migraines and asks for a private spot.",
        "Feels brushed off when told everything is booked.",
        "Wants to know you're trying rather than being redirected.",
      ],
    },
    manager: {
      name: "Sam (floor lead)",
      beats: [
        "Explains constraints without defensiveness.",
        "Invites compromise: short-term alternative plus a timed swap.",
        "Checks comfort level and follows up after the call.",
      ],
    },
    agreement: [
      "Use 'let's solve this together' language.",
      "Offer a near-term fix and a concrete time for the better option.",
      "Follow up to confirm the accommodation met the need.",
    ],
  },
  {
    id: "immigration-policy",
    title: "Trading Places – Immigration Policy",
    context:
      "Step through policy maker, citizen, and case worker lenses to see how efficiency pushes ripple into lived experience and frontline ethics.",
    empathyFocus: [
      "Empathy delta",
      "Moral tension",
      "Clarity under pressure",
      "Action readiness",
    ],
    customer: {
      name: "Policy maker → citizen",
      beats: [
        "Design tighter eligibility checks and documentation to cut backlog; success is measured in numbers.",
        "Trade places with a long-term resident blocked by new rules; income and housing stability are at risk.",
        "Loop through helpline calls and document uploads while weeks pass without clarity.",
      ],
    },
    manager: {
      name: "Case worker → reflection",
      beats: [
        "Enforce the policy under target pressure while facing confused applicants and a flood of cases.",
        "Choose between strict compliance and humane exceptions; feel moral tension and burnout risk.",
        "Return to policymaker view seeing efficiency gains alongside citizen distress and staff strain.",
      ],
    },
    agreement: [
      "Track the empathy delta every time you swap roles before finalizing rules.",
      "Narrate human impact alongside metrics in every policy update.",
      "Build humane exceptions and clear appeal paths into the system by design.",
    ],
  },
  /* ── New: Border Control ────────────────── */
  {
    id: "checkpoint-echo",
    title: "Checkpoint Echo – Border Control",
    context:
      "High-volume passport control at an international airport. Process anxious travellers, handle visa discrepancies, coordinate with colleagues, and navigate cross-cultural encounters — all under public scrutiny.",
    empathyFocus: [
      "Cultural intelligence",
      "Self-regulation",
      "Perspective-taking",
      "Decision under pressure",
    ],
    customer: {
      name: "Officer → passenger perspective",
      beats: [
        "Begin at the booth as an officer facing an anxious passenger with a visa date mismatch; notice your own frustration signals.",
        "Trade places: experience the scene as the passenger — 22-hour journey, cultural norms misread as evasion, limited language.",
        "Feel the weight of incomplete documents as a family from a conflict zone waits for your decision.",
      ],
    },
    manager: {
      name: "Team coordination → decision",
      beats: [
        "A colleague arrives with contradictory system data; communicate without undermining them publicly.",
        "Choose: resolve at the desk or escalate to supervisor — each path affects security, flow, and morale.",
        "Debrief with the PIM® heat map to see how your micro-decisions shaped team energy and traveller trust.",
      ],
    },
    agreement: [
      "Recognise micro-reactions (frustration, impatience) before they reach the passenger.",
      "Adapt communication to cultural norms without compromising security.",
      "Narrate next steps clearly so the passenger and colleagues stay informed.",
    ],
  },
  /* ── New: Probation / Criminal Justice ──── */
  {
    id: "signal-yard",
    title: "Signal Yard – Probation & Justice",
    context:
      "Mandatory check-in with a recently released offender. Navigate resistance, a housing crisis disclosure, algorithmic risk scoring, and a breach decision — balancing public safety with trauma-informed reintegration.",
    empathyFocus: [
      "Motivational interviewing",
      "Trauma-informed practice",
      "Moral courage",
      "Restorative thinking",
    ],
    customer: {
      name: "Officer → offender lens",
      beats: [
        "Open the session with a guarded individual; recognise resistance as protective, not defiant.",
        "Hear a housing crisis disclosure — sofa-surfing, licence stigma, missed curfews driven by survival.",
        "Trade places: feel the shame of asking for help from the system that detained you.",
      ],
    },
    manager: {
      name: "Risk panel → resolution",
      beats: [
        "An algorithm flags housing instability as high risk; navigate the tension between score and human story.",
        "Use motivational interviewing to co-create a plan rather than impose conditions.",
        "Close with a written plan, a review date, and a question: 'What support do you need between now and Thursday?'",
      ],
    },
    agreement: [
      "Name the discomfort in the room before jumping to compliance checklists.",
      "Present human context alongside algorithmic risk scores in every escalation.",
      "Co-create reintegration plans with the person, not just for them.",
    ],
  },
  /* ── New: IT / Tech ─────────────────────── */
  {
    id: "mirror-sprint",
    title: "Mirror Sprint – IT & Tech",
    context:
      "End-of-sprint retrospective for a distributed engineering team. Delivery pressure meets developer wellbeing as you handle imposter syndrome, tech debt debates, remote inclusion, and a performance conversation.",
    empathyFocus: [
      "Psychological safety",
      "Inclusive leadership",
      "Feedback without judgment",
      "Burnout prevention",
    ],
    customer: {
      name: "Tech lead → junior developer lens",
      beats: [
        "Open the retro asking how people really feel — notice who stays silent.",
        "Hear a junior developer confess imposter syndrome after spending two days on a one-line fix.",
        "Trade places: feel the weight of being the least experienced person in a room of experts.",
      ],
    },
    manager: {
      name: "Product owner → team dynamics",
      beats: [
        "Navigate conflicting priorities: stakeholders want features, engineers need tech debt time.",
        "Address remote members dropping off calls — create equitable participation without surveillance.",
        "Close the retro with vulnerability: share your own 'recharge' and 'drain' to model safety.",
      ],
    },
    agreement: [
      "Spot unspoken signals (silence, camera-off, early drop-off) as data, not laziness.",
      "Frame feedback as a choice for the receiver — format, timing, and setting.",
      "Model vulnerability as the leader before asking the team to open up.",
    ],
  },
];
