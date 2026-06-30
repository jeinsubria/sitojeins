import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const CONTACT_RECIPIENT = process.env.CONTACT_EMAIL || 'jeinsubria@gmail.com'

const contactSchema = z.object({
  name: z.string().min(1, 'Nome richiesto'),
  email: z.string().email('Email non valida'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(1, 'Messaggio richiesto'),
  consent: z.literal(true, { message: 'Consenso privacy richiesto' }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    const senderToken = process.env.SENDER_TOKEN
    if (!senderToken) {
      console.error('SENDER_TOKEN non configurato')
      return NextResponse.json(
        { error: 'Servizio di invio temporaneamente non disponibile' },
        { status: 503 }
      )
    }

    const html = `
      <h2>Nuova richiesta di contatto dal sito JEIns</h2>
      <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${data.company ? `<p><strong>Azienda:</strong> ${escapeHtml(data.company)}</p>` : ''}
      ${data.phone ? `<p><strong>Telefono:</strong> ${escapeHtml(data.phone)}</p>` : ''}
      <p><strong>Messaggio:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
    `

    const senderResponse = await fetch('https://api.sender.net/v2/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${senderToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        subject: `[JEIns] Nuova richiesta da ${data.name}`,
        html,
        recipients: [{ email: CONTACT_RECIPIENT }],
        from: {
          email: process.env.SENDER_FROM_EMAIL || 'noreply@jeins.it',
          name: process.env.SENDER_FROM_NAME || 'JEIns Sito Web',
        },
        reply_to: {
          email: data.email,
          name: data.name,
        },
      }),
    })

    if (!senderResponse.ok) {
      const errorData = await senderResponse.json().catch(() => ({}))
      console.error('Errore Sender.net:', errorData)
      return NextResponse.json(
        { error: 'Errore nell\'invio del messaggio' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Dati non validi' },
        { status: 400 }
      )
    }
    console.error('Errore invio contatto:', error)
    return NextResponse.json(
      { error: 'Errore nell\'invio del messaggio' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
