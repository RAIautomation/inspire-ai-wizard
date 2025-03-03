
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing generate-prompt request');
    const { topic } = await req.json();

    if (!topic) {
      throw new Error('Topic is required');
    }

    console.log('Calling OpenAI API with topic:', topic);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an Expert AI prompt engineer. You will generate an AI prompt based on the user input. Structure the prompt with proper paragraphs and numbering where appropriate. Do not use markdown formatting characters like * or # in your response. Make sure the text is well-formatted with clear paragraphs and proper numbering for any lists.'
          },
          { 
            role: 'user', 
            content: `Create a detailed and effective AI prompt based on this topic or idea: ${topic}`
          }
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI API response received');

    if (data.error) {
      throw new Error(data.error.message || 'Error from OpenAI API');
    }

    const generatedPrompt = data.choices[0].message.content;
    console.log('Successfully generated prompt');

    return new Response(JSON.stringify({ generatedPrompt }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-prompt function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
