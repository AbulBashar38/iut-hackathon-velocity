import { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ROOMS, type RoomName } from '@/types/device.types'

/** Discord alias for each room, matching the backend's !room command. */
const ROOM_ALIASES: Record<RoomName, string> = {
  'Drawing Room': 'drawing',
  'Work Room 1': 'work1',
  'Work Room 2': 'work2',
}

/** A command chip that copies its text to the clipboard on click. */
function CopyableCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard may be unavailable (non-secure context); ignore silently.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `Copied ${command}` : `Copy ${command}`}
      className="inline-flex items-center gap-1.5 rounded bg-muted px-1.5 py-0.5 font-mono text-xs transition-colors hover:bg-muted-foreground/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {command}
      {copied ? (
        <CheckIcon className="size-3 text-emerald-500" />
      ) : (
        <CopyIcon className="size-3 text-muted-foreground" />
      )}
    </button>
  )
}

export function BotCommandsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Discord Bot</CardTitle>
        <CardDescription>Click a command to copy it</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <CopyableCommand command="!status" />
          <span className="text-muted-foreground">full office status</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CopyableCommand command="!usage" />
          <span className="text-muted-foreground">power &amp; today&apos;s usage</span>
        </div>

        <div className="grid gap-2 border-t pt-3">
          <p className="text-xs font-medium text-muted-foreground">
            Per-room status
          </p>
          {ROOMS.map((room) => (
            <div key={room} className="flex items-center justify-between gap-2">
              <span>{room}</span>
              <CopyableCommand command={`!room ${ROOM_ALIASES[room]}`} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
