import { NextResponse } from 'next/server';

// Simulate artificial delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start') || 'Unknown';
  const end = searchParams.get('end') || 'Unknown';

  // Add fake delay to simulate network request (1-2s)
  await delay(Math.floor(Math.random() * 1000) + 500);

  // Generate mock data based on input
  // In a real scenario, this would call your friend's API
  const mockRiskScore = Math.floor(Math.random() * 100);
  
  let riskLevel = 'Low';
  let color = 'emerald';
  let message = 'Route is well-lit and generally safe.';

  if (mockRiskScore > 70) {
    riskLevel = 'High';
    color = 'red';
    message = 'Proceed with caution. Isolated areas detected.';
  } else if (mockRiskScore > 40) {
    riskLevel = 'Medium';
    color = 'amber';
    message = 'Moderate activity. Stay alert.';
  }

  const mockResponse = {
    route: {
      from: start,
      to: end,
      distance: '3.2 km',
      estimatedTime: '15 mins',
    },
    riskAssessment: {
      score: mockRiskScore,
      level: riskLevel,
      color: color,
      message: message,
      factors: [
        { name: 'Lighting', status: mockRiskScore > 50 ? 'Poor' : 'Good' },
        { name: 'Crowd Density', status: 'Moderate' },
        { name: 'Recent Reports', count: Math.floor(mockRiskScore / 20) },
      ]
    }
  };

  return NextResponse.json(mockResponse);
}
