export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
      <div className="flex flex-col gap-6 text-muted-foreground">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms and Conditions</h1>
        <p className="font-medium text-foreground"><strong>Last Updated:</strong> May 25, 2026</p>

        <p>Welcome to Closer Intellect AI (&quot;Platform&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using our platform, which provides lead generation, campaign management, and sales team orchestration utilizing AI models and data providers, you agree to be bound by these Terms and Conditions (&quot;Terms&quot;).</p>

        <p>If you do not agree to all the terms and conditions of this agreement, you may not access the Platform or use any of its services.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">1. Services Provided</h2>
        <p>Closer Intellect AI provides tools and services for:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Lead generation and enrichment via third-party providers (e.g., Apollo).</li>
          <li>AI-powered voice solutions for lead engagement (e.g., Vapi).</li>
          <li>Campaign management and follow-up sequence automation.</li>
          <li>AI coaching and real-time live translation.</li>
          <li>Contract generation and storage (via AWS S3).</li>
          <li>Team performance tracking and gamification.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8">2. User Accounts</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must create an account to use the Platform. You agree to provide accurate, complete, and updated information.</li>
          <li>You are responsible for safeguarding your password and any activities or actions under your password.</li>
          <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8">3. Subscription and Billing</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Certain features are protected by Upgrade Gates and require a paid subscription.</li>
          <li>Subscriptions are billed through our integrated payment processor, Stripe.</li>
          <li>By selecting a paid plan, you agree to pay Closer Intellect AI the recurring or one-time fees indicated.</li>
          <li>We reserve the right to modify pricing at our discretion. Notice of any pricing changes will be provided to active users.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8">4. Use of Third-Party Integrations</h2>
        <p>Our Platform integrates with third-party providers such as OpenAI, Apollo, and Vapi. Your use of these integrated services is subject to their respective terms of service and acceptable use policies. We are not responsible for the availability, accuracy, or reliability of these third-party services.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">5. User Conduct and Compliance</h2>
        <p>You agree to use the Platform only for lawful purposes. You shall not:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Platform to send unsolicited communications, spam, or telemarketing that violates the Telephone Consumer Protection Act (TCPA) or similar regulations.</li>
          <li>Scrape or harvest data inappropriately.</li>
          <li>Transmit any material that is offensive, harmful, or violates intellectual property rights.</li>
        </ul>
        <p><strong>Compliance with Laws:</strong> You are solely responsible for ensuring your use of our lead generation and automated outreach services complies with all applicable local, state, national, and international laws, including privacy and telecommunications laws.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">6. Intellectual Property</h2>
        <p>The Platform and its original content (including the Red UI Premium aesthetic, designs, text, graphics, and features), features, and functionality are and will remain the exclusive property of Closer Intellect AI and its licensors.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">7. Data and Storage</h2>
        <p>We use AWS S3 for secure storage of assets such as contracts and recordings. While we employ industry-standard security measures, we do not guarantee absolute security. You retain all rights to the data you upload or generate within the Platform, but grant us a license to use this data to provide and improve our services.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">8. Termination</h2>
        <p>We may terminate or suspend your account and access to the Platform immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">9. Limitation of Liability</h2>
        <p>In no event shall Closer Intellect AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Platform.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">10. Changes to Terms</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of significant changes. By continuing to access or use our Platform after those revisions become effective, you agree to be bound by the revised terms.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">11. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us.</p>
      </div>
    </main>
  )
}
