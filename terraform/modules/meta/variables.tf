variable "meta" {
  type = object({
    owner    = optional(string, "")
    basename = string
    prefix   = optional(string, "")
  })

  validation {
    condition     = var.meta.basename != null && var.meta.basename != ""
    error_message = "Basename must be specified."
  }
}