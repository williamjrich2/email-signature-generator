const MODEL = 'claude-sonnet-4-5-20250929'

const SCANNER_PROMPT = `Analyze this email signature image and extract all information into the following JSON structure. Be precise with phone number formatting. Identify any brand colors (as hex codes) visible in the signature. Suggest which layout style it most closely matches from: classic, modern_minimal, side_by_side, bold_brand, executive, social_forward, creative, enterprise.

{
  "firstName": "",
  "lastName": "",
  "title": "",
  "department": "",
  "company": "",
  "accreditations": "",
  "email": "",
  "phoneCell": "",
  "phoneOffice": "",
  "officeExt": "",
  "website": "",
  "address": {
    "street": "",
    "city": "",
    "state": "",
    "postalCode": "",
    "country": ""
  },
  "socialLinks": {
    "linkedin": "",
    "instagram": "",
    "twitter": "",
    "facebook": "",
    "youtube": "",
    "tiktok": ""
  },
  "brandColors": {
    "primary": "",
    "accent": ""
  },
  "suggestedTemplate": "",
  "logoDescription": "",
  "notes": ""
}

Only return valid JSON, no markdown formatting or backticks.`

function extractJsonBlock(text = '') {
  const trimmed = text.trim().replace(/^```(?:json)?/i, '').replace(/```$/i, '')
  const firstBrace = trimmed.indexOf('{')
  const lastBrace = trimmed.lastIndexOf('}')

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error('Claude returned a response without valid JSON.')
  }

  return trimmed.slice(firstBrace, lastBrace + 1)
}

export async function analyzeSignatureScreenshot({ apiKey, mediaType, base64Image }) {
  if (!apiKey) {
    throw new Error('Enter an Anthropic API key in Settings before using the scanner.')
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1400,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: SCANNER_PROMPT,
            },
          ],
        },
      ],
    }),
  })

  if (!response.ok) {
    const errorPayload = await response.text()
    throw new Error(errorPayload || 'Anthropic request failed.')
  }

  const payload = await response.json()
  const textContent =
    payload.content?.find((item) => item.type === 'text')?.text || ''

  return JSON.parse(extractJsonBlock(textContent))
}

export { MODEL, SCANNER_PROMPT }
