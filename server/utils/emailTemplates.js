function wrapEmail(title, bodyHtml) {
  return `
  <div style="background-color:#0b0122;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background-color:#151022;border-radius:12px;overflow:hidden;border:1px solid #2a2340;">
      <div style="padding:24px 28px;border-bottom:1px solid #2a2340;">
        <span style="color:#ffcf25;font-size:22px;font-weight:800;">PrepYatra</span>
      </div>
      <div style="padding:28px;color:#f4f4f5;">
        <h1 style="margin:0 0 16px;font-size:20px;color:#ffffff;">${title}</h1>
        <div style="font-size:15px;line-height:1.6;color:#d1d5db;">
          ${bodyHtml}
        </div>
      </div>
      <div style="padding:20px 28px;border-top:1px solid #2a2340;">
        <p style="margin:0;font-size:12px;color:#9ca3af;">Built with ❤️ by Aryan Kumar — PrepYatra</p>
      </div>
    </div>
  </div>`;
}

function pill(text) {
  return `<span style="display:inline-block;background-color:#ffcf25;color:#151022;font-weight:700;padding:4px 12px;border-radius:999px;font-size:13px;">${text}</span>`;
}

export function requestReceivedEmail({ studentName, courseTitle }) {
  return {
    subject: "We've received your Hire a Tutor request",
    html: wrapEmail("Your tutor request has been received!", `
      <p>Hi ${studentName},</p>
      <p>Thanks for requesting a tutor for ${pill(courseTitle)}. We're now looking for a tutor to match you with.</p>
      <p>We'll email you the moment a tutor is found.</p>
    `),
  };
}

export function tutorFoundEmail({ studentName, courseTitle, price, tutorName }) {
  return {
    subject: `A tutor is ready for your ${courseTitle} request`,
    html: wrapEmail("We found you a tutor! 🎉", `
      <p>Hi ${studentName},</p>
      <p><strong>${tutorName}</strong> is interested in tutoring you for ${pill(courseTitle)} at ${pill("₹" + price)}.</p>
      <p>Log in to PrepYatra to accept or reject this offer.</p>
    `),
  };
}

export function requestOutcomeEmail({ toName, courseTitle, price, otherPartyName, accepted, isStudent }) {
  const title = accepted ? "Tuition request accepted ✅" : "Tuition request declined";
  const body = accepted
    ? (isStudent
        ? `<p>Hi ${toName},</p><p>You accepted <strong>${otherPartyName}</strong>'s offer for ${pill(courseTitle)} at ${pill("₹" + price)}. They'll be in touch soon!</p>`
        : `<p>Hi ${toName},</p><p>Great news — <strong>${otherPartyName}</strong> accepted your offer for ${pill(courseTitle)} at ${pill("₹" + price)}. Reach out to get started!</p>`)
    : (isStudent
        ? `<p>Hi ${toName},</p><p>You declined the offer from <strong>${otherPartyName}</strong> for ${pill(courseTitle)}. Your request is open again for other tutors.</p>`
        : `<p>Hi ${toName},</p><p><strong>${otherPartyName}</strong> declined your offer for ${pill(courseTitle)}. The request is back on the open market for other tutors.</p>`);

  return { subject: title, html: wrapEmail(title, body) };
}

export function accountBlockedEmail({ userName }) {
  return {
    subject: "Your PrepYatra account has been blocked",
    html: wrapEmail("Your account has been blocked", `
      <p>Hi ${userName},</p>
      <p>Your PrepYatra account has been blocked by an admin.</p>
      <p>If you believe this is a mistake, you can apply for a review from the login page and an admin will take a look.</p>
    `),
  };
}

export function unblockRequestReceivedEmail({ userName, userEmail, message }) {
  return {
    subject: `Unblock request from ${userName}`,
    html: wrapEmail("New unblock request", `
      <p><strong>${userName}</strong> (${userEmail}) has requested a review of their blocked account.</p>
      <p>Their message:</p>
      <p style="padding:12px 16px;background-color:#1a1530;border-radius:8px;border:1px solid #2a2340;">${message}</p>
      <p>Log in to the Admin Dashboard to approve or deny this request.</p>
    `),
  };
}

export function unblockRequestResolvedEmail({ userName, approved }) {
  const title = approved ? "Your account has been unblocked ✅" : "Unblock request denied";
  const body = approved
    ? `<p>Hi ${userName},</p><p>Good news — your PrepYatra account has been unblocked. You can log in again now.</p>`
    : `<p>Hi ${userName},</p><p>Your request to unblock your account was reviewed and denied by an admin.</p>`;

  return { subject: title, html: wrapEmail(title, body) };
}
