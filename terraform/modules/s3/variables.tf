# Meta naming module
variable "meta" {
  type = object({
    owner    = string
    basename = string
    prefix   = string
  })
}

# S3 module
variable "acl" {
  type    = string
  default = "private"
}

variable "control_object_ownership" {
  type    = bool
  default = true
}

variable "object_ownership" {
  type    = string
  default = "BucketOwnerPreferred"
}

variable "versioning" {
  type    = bool
  default = false
}

variable "cloudfront_id" {
  description = "Cloudfront ID for bucket policy"
  type        = string
  default     = null
}