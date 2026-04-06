import React from 'react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog"

const App = () => {
  return (
    <div>
      <Button>Click</Button>

      <Card>
        <CardContent>Hello</CardContent>
      </Card>

      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>My Modal</DialogContent>
      </Dialog>
    </div>
  )
}

export default App