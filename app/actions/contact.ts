'use server'

import { z } from 'zod'

const ContactSchema = z.object({
  from_name: z
    .string({ message: 'Name is required.' })
    .min(2, 'Name must be at least 2 characters.'),
  reply_to: z
    .string({ message: 'Email is required.' })
    .email('Please enter a valid email address.'),
  message: z
    .string({ message: 'Message is required.' })
    .min(10, 'Message must be at least 10 characters.'),
})

export type ContactState = {
  status: 'idle' | 'success' | 'error' | 'validation_error'
  message?: string
  errors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string[]>>
  fields?: Partial<Record<keyof z.infer<typeof ContactSchema>, string>> // add this
}

export async function sendContactAction(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    from_name: formData.get('from_name'),
    reply_to: formData.get('reply_to'),
    message: formData.get('message'),
  }

  const parsed = ContactSchema.safeParse(raw)

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error)
    const errors = Object.fromEntries(
      Object.entries(tree.properties ?? {}).map(([k, v]) => [
        k,
        (v as { errors?: string[] }).errors ?? [],
      ])
    ) as Partial<Record<keyof z.infer<typeof ContactSchema>, string[]>>

    return {
      status: 'validation_error',
      errors,
      fields: raw as Partial<
        Record<keyof z.infer<typeof ContactSchema>, string>
      >,
    }
  }

  const { from_name, reply_to, message } = parsed.data

  try {
    const res = await fetch(
      `${process.env.EMAILJS_BASE_URL}/api/v1.0/email/send`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          accessToken: process.env.EMAILJS_PRIVATE_KEY,
          template_params: { from_name, reply_to, message },
        }),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error('[contact] EmailJS error:', text)
      return { status: 'error', message: 'Failed to send. Please try again.' }
    }

    return { status: 'success', message: 'Message sent successfully!' }
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return { status: 'error', message: 'An unexpected error occurred.' }
  }
}
