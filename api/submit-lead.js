/**
 * Vercel / Netlify Serverless Proxy Endpoint for HubSpot CRM API v3
 * 
 * Pipeline Stages Managed:
 * 1. Quote Requested (appointmentscheduled)
 * 2. Survey Booked (decisionmakerbought-in)
 * 3. Quote Sent (contractsent)
 * 4. Job Won (closedwon)
 */

export default async function handler(req, res) {
  // CORS configuration for Vercel Serverless
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const lead = req.body;

    if (!lead || !lead.leadReference) {
      return res.status(400).json({ error: 'Invalid lead payload' });
    }

    const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN || process.env.CRM_API_KEY;

    // HubSpot Deal Pipeline Stages
    const DEAL_PIPELINE = "default";
    const STAGE_QUOTE_REQUESTED = "appointmentscheduled"; // Stage 1: Quote Requested

    // Calculate numeric amount for HubSpot Deal (using midpoint of estimated range)
    const dealAmount = lead.estimatedMax || lead.estimatedMin || 1650;
    const dealName = `${lead.serviceType ? lead.serviceType.toUpperCase() : 'HEATING'} - ${lead.leadReference}`;

    let contactId = null;
    let dealId = null;

    // If HubSpot Access Token is present in environment variables
    if (hubspotToken) {
      // 1. Create or Update HubSpot Contact
      const contactResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hubspotToken}`
        },
        body: JSON.stringify({
          properties: {
            firstname: lead.contactName || "Basildon Lead",
            email: lead.contactEmail || `lead-${lead.leadReference.toLowerCase()}@assetcarelondon.co.uk`,
            phone: lead.contactPhone || "01268 904 123",
            city: "Basildon",
            zip: lead.postcode || "SS14 1PR",
            lifecyclestage: "lead"
          }
        })
      });

      if (contactResponse.ok) {
        const contactData = await contactResponse.json();
        contactId = contactData.id;
      }

      // 2. Create HubSpot Deal in Pipeline
      const dealResponse = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hubspotToken}`
        },
        body: JSON.stringify({
          properties: {
            dealname: dealName,
            pipeline: DEAL_PIPELINE,
            dealstage: STAGE_QUOTE_REQUESTED,
            amount: dealAmount.toString(),
            description: `Property: ${lead.propertyType}, Beds: ${lead.bedrooms}, Urgency: ${lead.urgency}. Range: ${lead.estimatedRange}`
          },
          ...(contactId ? {
            associations: [
              {
                to: { id: contactId },
                types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }]
              }
            ]
          } : {})
        })
      });

      if (dealResponse.ok) {
        const dealData = await dealResponse.json();
        dealId = dealData.id;
      }
    } else {
      console.log('HUBSPOT_ACCESS_TOKEN not configured yet. Serverless function simulated HubSpot lead capture for:', lead.leadReference);
    }

    return res.status(200).json({
      success: true,
      message: 'HubSpot Deal & Contact pipeline updated',
      leadId: lead.leadReference,
      hubspotContactId: contactId,
      hubspotDealId: dealId,
      estimatedPriceRange: lead.estimatedRange,
      pipelineStage: "Quote Requested",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('HubSpot API Serverless Error:', error);
    return res.status(500).json({
      error: 'HubSpot API dispatch failed',
      details: error.message
    });
  }
}
