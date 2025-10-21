import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { day, month, language } = await req.json();
    
    if (!day || !month || !language) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: day, month, language' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const categories = [
      { id: 'tech', keywords: language === 'es' ? 'tecnología, computación, software, hardware, internet, programación' : 'technology, computing, software, hardware, internet, programming' },
      { id: 'science', keywords: language === 'es' ? 'ciencia de datos, inteligencia artificial, machine learning, big data' : 'data science, artificial intelligence, machine learning, big data' },
      { id: 'statistics', keywords: language === 'es' ? 'estadística, matemáticas, probabilidad, análisis de datos' : 'statistics, mathematics, probability, data analysis' },
      { id: 'people', keywords: language === 'es' ? 'científicos de datos, programadores, matemáticos, pioneros de la tecnología' : 'data scientists, programmers, mathematicians, technology pioneers' }
    ];

    const allEvents = [];

    // Fetch events for each category
    for (const category of categories) {
      const prompt = language === 'es' 
        ? `Necesito 2 eventos históricos REALES Y VERIFICABLES que ocurrieron específicamente el ${day} de ${month} (cualquier año) relacionados con ${category.keywords}.

IMPORTANTE:
- Solo eventos que realmente ocurrieron en esa fecha exacta
- Relacionados con ciencia de datos, tecnología, computación o matemáticas
- Eventos históricos significativos y documentados
- Máximo 150 caracteres por descripción
- Responde en español`
        : `I need 2 REAL AND VERIFIABLE historical events that occurred specifically on ${month} ${day} (any year) related to ${category.keywords}.

IMPORTANT:
- Only events that actually occurred on that exact date
- Related to data science, technology, computing, or mathematics
- Significant and documented historical events
- Maximum 150 characters per description
- Respond in English`;

      try {
        const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'user', content: prompt }
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "return_historical_events",
                  description: "Return historical events for a specific date",
                  parameters: {
                    type: "object",
                    properties: {
                      events: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            year: { 
                              type: "number",
                              description: "The year the event occurred"
                            },
                            event: { 
                              type: "string",
                              description: "Brief description of the event (max 150 characters)"
                            },
                            category: { 
                              type: "string",
                              enum: ["tech", "science", "statistics", "people"]
                            },
                            icon: { 
                              type: "string",
                              enum: ["Cpu", "Database", "BookOpen", "Users"]
                            }
                          },
                          required: ["year", "event", "category", "icon"]
                        }
                      }
                    },
                    required: ["events"]
                  }
                }
              }
            ],
            tool_choice: { type: "function", function: { name: "return_historical_events" } }
          }),
        });

        if (response.status === 429) {
          console.error('Rate limit exceeded');
          continue;
        }

        if (response.status === 402) {
          console.error('Payment required - out of credits');
          continue;
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`AI API error for category ${category.id}:`, response.status, errorText);
          continue;
        }

        const data = await response.json();
        
        if (data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments) {
          const args = JSON.parse(data.choices[0].message.tool_calls[0].function.arguments);
          if (args.events && Array.isArray(args.events)) {
            allEvents.push(...args.events);
          }
        }
      } catch (categoryError) {
        console.error(`Error fetching events for category ${category.id}:`, categoryError);
        // Continue with other categories even if one fails
      }
    }

    // If no events were fetched, return fallback data
    if (allEvents.length === 0) {
      const fallbackEvents = [
        {
          year: 1981,
          event: language === 'es' 
            ? "IBM lanzó su primera computadora personal, democratizando el acceso a la tecnología."
            : "IBM launched its first personal computer, democratizing access to technology.",
          category: 'tech',
          icon: 'Cpu'
        },
        {
          year: 1936,
          event: language === 'es'
            ? "Alan Turing publicó su trabajo sobre máquinas computables, base de la informática moderna."
            : "Alan Turing published his work on computable machines, foundation of modern computing.",
          category: 'science',
          icon: 'Database'
        }
      ];
      
      return new Response(
        JSON.stringify({ events: fallbackEvents, isFallback: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ events: allEvents }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fetch-history-events function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
