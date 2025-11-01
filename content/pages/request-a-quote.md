---
title: Request a Quote
slug: request-a-quote
sections:
  - type: RequestAQuoteSection
    headline: Get Your Tailored Quote
    description: |
      What you get:
    features:
      - CTI workflows built around your compliance frameworks (PCI, SOC 2, NIST)
      - Direct integration with your GRC tools, SIEM, alerting pipelines & logs
      - Continuous, audit-ready evidence, not a one-time snapshot
      - A scalable service that evolves with your business.
    form:
      title: Quote Request Form
      description: 
      fields:
        - name: name
          label: Your Name
          type: TextFormControl
          isRequired: true
        - name: email
          label: Email Address
          type: EmailFormControl
          isRequired: true
        - name: organization
          label: Organization / Industry
          type: TextFormControl
          isRequired: true
        - name: frameworks
          label: Compliance Framework(s) Required (e.g., “PCI DSS, SOC 2, NIST”)
          type: TextFormControl
          isRequired: true
        - name: systems
          label: Systems & Environments to Monitor (e.g., “Cloud, On-Prem, OT”)
          type: TextFormControl
          isRequired: true
        - name: budget
          label: Estimated Budget or Timeline (Optional)
          type: TextFormControl
          isRequired: false
        - name: notes
          label: Additional Notes or Questions
          type: TextareaFormControl
          isRequired: false
      submitButton:
        label: Request a Quote
        type: SubmitButtonFormControl
        style: primary
        showIcon: false
seo:
  metaTitle: Request a quote - Demo site
  metaDescription: This is the Request a quote page built with Netlify Create.
  socialImage: /images/main-hero.jpg
  type: Seo
type: PageLayout
---
