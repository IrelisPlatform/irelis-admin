'use client'

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { requestOtp } from "@/lib/api"

export default function OtpRequestPage() {
  const router = useRouter()
  const params = useSearchParams()
  const returnTo = params?.get('returnTo') || '/'
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRequest = async () => {
    setMessage(null)
    setError(null)
    if (!email || !email.includes('@')) {
      setError('Email invalide.')
      return
    }
    setLoading(true)
    try {
      await requestOtp(email, 'CANDIDATE')
      setMessage('Code envoyé. Vérifiez votre boite mail.')
      // redirect to verify page
      router.push(`/auth/otp/verify?email=${encodeURIComponent(email)}&userType=CANDIDATE&returnTo=${encodeURIComponent(returnTo)}`)
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la demande OTP.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Recevoir un code</h2>
          <p className="text-sm text-muted-foreground mb-4">Entrez votre adresse email pour recevoir un code de connexion.</p>

          <Input placeholder="Adresse email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
          {error && <div className="text-sm text-destructive mt-2">{error}</div>}
          {message && <div className="text-sm text-green-600 mt-2">{message}</div>}

          <div className="mt-4">
            <Button onClick={handleRequest} disabled={loading} className="w-full">
              {loading ? 'Envoi...' : 'Envoyer le code'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
