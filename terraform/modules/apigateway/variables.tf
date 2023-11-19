# Meta naming module
variable "meta" {
  type = object({
    owner    = string
    basename = string
    prefix   = string
  })
}

# API Gateway module
variable "protocol_type" {
  type    = string
  default = "HTTP"
}

variable "integrations" {
  type = map(object({
    lambda_arn             = string
    payload_format_version = optional(string, "2.0")
    timeout_milliseconds   = optional(number, 12000)
  }))
}

variable "domain_name" {
  type = string
}

variable "domain_name_certificate_arn" {
  type = string
}
