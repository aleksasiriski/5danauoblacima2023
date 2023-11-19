# Meta naming module
variable "meta" {
  type = object({
    owner    = string
    basename = string
    prefix   = string
  })
}

# IAM Role module
variable "name" {
  description = "Friendly name of the role. If omitted, Terraform will assign a random, unique name. See IAM Identifiers for more information."
  type        = string
  default     = null
}

variable "path" {
  description = "Path to the role. See IAM Identifiers for more information."
  type        = string
  default     = null
}

variable "assume_statements" {
  description = "Configuration block for a policy statement."
  type = set(object({
    sid     = optional(string)
    effect  = optional(string, "Allow")
    actions = list(string)
    principals = set(object({
      type        = string
      identifiers = list(string)
    }))
    conditions = set(object({
      test     = string
      variable = string
      values   = list(string)
    }))
  }))
  default = null
}

variable "statements" {
  description = "Configuration block for a policy statement."
  type = set(object({
    sid       = optional(string)
    effect    = optional(string, "Allow")
    actions   = list(string)
    resources = list(string)
  }))
  default = null
}