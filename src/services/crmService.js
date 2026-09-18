
export const submitLeadToCRM = async (formData, estimateResult, contactDetails = {}) => {
  const payload = {
    leadReference: estimateResult.refNumber,
    serviceType: formData.serviceType,
    propertyType: formData.propertyType,
    bedrooms: formData.bedrooms,
    currentFuel: formData.currentFuel,
    serviceOption: formData.serviceOption,
    urgency: formData.urgency,
    estimatedRange: estimateResult.formattedRange,
    estimatedMin: estimateResult.minPrice,
    estimatedMax: estimateResult.maxPrice,
    summary: estimateResult.summary,
    timeframe: estimateResult.timeframe,
    contactName: contactDetails.name || "Essex Customer",
    contactEmail: contactDetails.email || "",
    contactPhone: contactDetails.phone || "",
    postcode: contactDetails.postcode || "SS14",
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Lead submission failed: HTTP ${response.status}`);
      return {
        success: false,
        leadReference: estimateResult.refNumber,
        error: `Server returned ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      leadId: data.leadId || estimateResult.refNumber,
      hubspotDealId: data.hubspotDealId,
      hubspotContactId: data.hubspotContactId,
    };
  } catch (error) {
    // Network failure, endpoint doesn't exist, etc. — this is a REAL failure.
    // Do not tell the user it succeeded.
    console.error('HubSpot submission error:', error);
    return {
      success: false,
      leadReference: estimateResult.refNumber,
      error: error.message || 'Network error',
    };
  }
};
