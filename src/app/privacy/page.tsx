export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
      <div className="flex flex-col gap-6 text-muted-foreground">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="font-medium text-foreground"><strong>Last Updated:</strong> May 25, 2026</p>

        <p>At Closer Intellect AI (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our lead generation, campaign management, and AI orchestration platform.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>

        <h3 className="text-xl font-semibold text-foreground mt-4">a. Personal Data</h3>
        <p>When you register for an account, subscribe to our services via Stripe, or communicate with us, we collect personal information such as:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Billing and payment information (processed securely through Stripe)</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mt-4">b. Platform Data</h3>
        <p>As part of your use of our services (e.g., campaign management, AI Coach, Lead Marketplace), we collect and store:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Leads and contact information you import or generate.</li>
          <li>Communication records (e.g., transcripts, voice recordings from AI calls via Vapi).</li>
          <li>Contracts and generated PDFs (stored securely on AWS S3).</li>
          <li>Team performance and gamification metrics.</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mt-4">c. Usage Data</h3>
        <p>We automatically collect information about how you interact with our Platform, including your IP address, browser type, pages visited, and usage patterns to optimize our AI infrastructure (e.g., context window management).</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Service Delivery:</strong> To provide, maintain, and improve our Platform, including our AI models, lead enrichment (via Apollo), and live translation features.</li>
          <li><strong>Account Management:</strong> To manage your account, subscription, and billing.</li>
          <li><strong>Personalization:</strong> To tailor the &quot;Second Brain Engine&quot; and AI coaching to provide better battle plans and memory triggers.</li>
          <li><strong>Communication:</strong> To send administrative notices, updates, and customer support messages.</li>
          <li><strong>Security:</strong> To monitor for suspicious activities and enforce our Terms and Conditions.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8">3. How We Share Your Information</h2>
        <p>We do not sell your personal data. We may share your information in the following situations:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Third-Party Service Providers:</strong> We share data with trusted partners necessary to provide our services. This includes:
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li><strong>OpenAI:</strong> For processing AI interactions and translations.</li>
              <li><strong>Vapi:</strong> For facilitating AI voice calls.</li>
              <li><strong>Apollo:</strong> For lead data enrichment.</li>
              <li><strong>AWS (Amazon Web Services):</strong> For secure data and asset storage.</li>
              <li><strong>Stripe:</strong> For payment processing.</li>
            </ul>
          </li>
          <li><strong>Legal Compliance:</strong> We may disclose your information if required by law, court order, or to protect the rights, property, or safety of Closer Intellect AI, our users, or others.</li>
          <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8">4. Data Security and Retention</h2>
        <p>We implement industry-standard security measures (including secure AWS S3 storage) to protect your data from unauthorized access, disclosure, or destruction. We retain your personal data and platform data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by law.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">5. Your Rights and Choices</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access, update, or delete your personal information.</li>
          <li>Object to or restrict the processing of your data.</li>
          <li>Withdraw consent where we rely on it to process your information.</li>
        </ul>
        <p>To exercise these rights, please contact us.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">6. Telecommunications and Call Recordings</h2>
        <p>Our AI voice features involve calling and recording conversations. By using these features, you represent and warrant that you have obtained all necessary consents from call recipients as required by applicable laws (such as two-party consent laws) before initiating or recording any communications.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">7. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on the Platform and updating the &quot;Last Updated&quot; date.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">8. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us.</p>
      </div>
    </main>
  )
}
