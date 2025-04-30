import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { question } = body;
    
    // For testing purposes, return canned responses
    // This will be replaced with actual backend calls later
    const responses: Record<string, string> = {
      // Budget and spending related questions
      "how much did i spend": "Based on your current month's data, you've spent a total of $1,245.30 so far.",
      "what's my top expense category": "Your highest spending category this month is 'Groceries' at $350.25, which is approximately 28% of your total spending.",
      "how can i save money": "Looking at your spending patterns, you might save money by reducing your 'Dining Out' expenses, which increased by 15% compared to last month. Consider meal planning to reduce food costs.",
      
      // Technical assistance
      "how do i add a new expense": "Click the 'Add Expense' button on the Monthly Expenses card. You can also use the receipt scanner button in the top toolbar to scan receipts automatically.",
      "how do i scan receipts": "Click the scanner button in the top toolbar, then take a photo of your receipt. I'll extract the information and create an expense entry for you.",
      "how do i filter expenses": "Use the month selector at the top of the dashboard to view expenses for different months. You can also filter expenses by category in the Monthly Expenses section.",
      
      // General information
      "what can you do": "I can help answer questions about your spending, provide insights on your expenses, explain how to use the expense tracker, and offer money-saving tips based on your spending patterns.",
      "who are you": "I'm Max, your AI expense assistant. I help you understand your spending patterns and get the most out of your expense tracker."
    };
    
    // Default responses for questions not in our canned list
    const defaultResponses = [
      "I can help with that! Based on your recent spending patterns, let me analyze this for you...",
      "That's a great question about your finances. Let me check your expense data...",
      "I'd be happy to help with your expenses. Looking at your dashboard data...",
      "I notice from your expense history that there might be insights I can share about this...",
      "Let me analyze your spending patterns to answer that question properly..."
    ];
    
    // Look for keyword matches in the question
    let answer = "";
    const lowerQuestion = question.toLowerCase();
    
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(keyword)) {
        answer = response;
        break;
      }
    }
    
    // If no keyword matches, use a random default response
    if (!answer) {
      const randomIndex = Math.floor(Math.random() * defaultResponses.length);
      answer = defaultResponses[randomIndex];
    }
    
    // Add a small random delay to simulate processing time (200-1200ms)
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 1000));
    
    return NextResponse.json({
      success: true,
      data: {
        answer
      }
    });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing your request',
        error: (error as Error).message
      },
      { status: 500 }
    );
  }
}