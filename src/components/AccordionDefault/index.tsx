import * as React from "react"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { MdExpandMore } from "react-icons/md"

export interface IAccordionDefaultProps {
  children: React.ReactNode
  expanded: boolean
  toggleExpanded: () => void
  title: string
  description?: string
}

function AccordionDefault(props: IAccordionDefaultProps) {
  const { children, expanded, toggleExpanded, title, description = "" } = props

  return (
    <Accordion expanded={expanded} onChange={toggleExpanded}>
      <AccordionSummary expandIcon={<MdExpandMore />}>
        <Typography sx={{ width: "33%", flexShrink: 0 }}>{title}</Typography>
        <Typography sx={{ color: "text.secondary" }}>{description}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

export { AccordionDefault }
