# Meta naming module
variable "meta" {
  type = object({
    owner    = string
    basename = string
    prefix   = string
  })
}

# Cloudfront module
variable "domain_alias" {
  description = "FQDN alias for Cloudfront access"
  type        = string
  default     = null
}

variable "price_class" {
  description = "The price class for this distribution. One of PriceClass_All, PriceClass_200, PriceClass_100"
  type        = string
  default     = "PriceClass_All"
  validation {
    condition     = contains(["PriceClass_All", "PriceClass_200", "PriceClass_100"], var.price_class)
    error_message = "Must be one of PriceClass_All, PriceClass_200, PriceClass_100"
  }
}

variable "retain_on_delete" {
  description = "Disables the distribution instead of deleting it when destroying the resource through Terraform. If this is set, the distribution needs to be deleted manually afterwards."
  type        = bool
  default     = false
}

variable "wait_for_deployment" {
  description = "If enabled, the resource will wait for the distribution status to change from InProgress to Deployed. Setting this to false will skip the process."
  type        = bool
  default     = true
}

variable "logging_config" {
  description = "Logging configuration"
  type        = any
  default     = null
}

# Origins
variable "origin_type" {
  description = "Type of origin for Cloudfront. One of S3, LB"
  type        = string
  validation {
    condition     = contains(["S3", "LB"], var.origin_type)
    error_message = "Must be one of S3, LB"
  }
}

variable "s3" {
  description = "S3 bucket config used if origin_type is S3"
  type = object({
    bucket_name = string
  })
  default = null
}

variable "lb" {
  description = "ALB/ELB bucket config used if origin_type is LB"
  type = object({
    domain_name = string
  })
  default = null
}

# Options
variable "restrictions" {
  description = "Restriction options"
  type = list(object({
    geo_restriction = object({
      restriction_type = string
      locations        = list(string)
    })
  }))
  default = [{
    geo_restriction = {
      restriction_type = "none"
      locations        = []
    }
  }]
}

variable "custom_error_responses" {
  description = "Custom error responses"
  type = set(object({
    error_code            = number
    response_code         = number
    error_caching_min_ttl = number
    response_page_path    = string
  }))
  default = []
}

variable "viewer_certificate" {
  description = "Should Cloudfront use default certificate"
  type = object({
    acm_certificate_arn            = optional(string)
    cloudfront_default_certificate = optional(bool, false)
    iam_certificate_id             = optional(string)
    minimum_protocol_version       = optional(string, "TLSv1")
    ssl_support_method             = optional(string, "sni-only")
  })
  default = {
    cloudfront_default_certificate = true
  }
}